<?php
/**
 * نظام تحليلات زوار موقع أهل محمد — بيانات حقيقية
 * ------------------------------------------------------------
 *   - تتبع زيارة:   GET/POST api/analytics.php?track=1&p=/&uid=..&sid=..&ref=..&d=..&b=..&o=..&c=DZ&r=..&ci=..
 *                   بالإضافة إلى مدة البقاء: track=1&stay=42&p=/&uid=..
 *   - قراءة:        GET api/analytics.php?read=1&period=day|7d|30d|90d|year
 *                                                   (تي تناسب لوحة التحليلات)
 * البيانات محفوظة في api/analytics.json (سجل أحداث JSON).
 * لا يستخدم MySQL — يعمل على أي استضافة تدعم PHP (نفس أسلوب visits.php).
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$FILE = __DIR__ . '/analytics.json';
$NOW = time();

/* ================== أدوات مساعدة ================== */

function ahl_load($file)
{
    $data = array('events' => array());
    if (file_exists($file)) {
        $raw = @file_get_contents($file);
        $parsed = json_decode($raw, true);
        if (is_array($parsed) && isset($parsed['events']) && is_array($parsed['events'])) {
            $data = $parsed;
        }
    }
    if (!isset($data['events'])) $data['events'] = array();
    return $data;
}

function ahl_save($file, $data)
{
    @file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE), LOCK_EX);
    @chmod($file, 0666);
}

/* قراءة جسم الطلب (JSON أو application/x-www-form-urlencoded من sendBeacon) */
function ahl_post_body()
{
    $raw = file_get_contents('php://input');
    if (!$raw) return null;
    $j = json_decode($raw, true);
    if (is_array($j)) return $j;
    $q = array();
    parse_str($raw, $q);
    if (is_array($q) && count($q)) return $q;
    return null;
}

$postBody = ahl_post_body();

function ahl_param($key, $postBody)
{
    if ($postBody && isset($postBody[$key])) return $postBody[$key];
    if (isset($_GET[$key])) return $_GET[$key];
    return '';
}

/* توحيد اسم مصدر الزيارة من رابط المُحيل */
function ahl_ref($ref)
{
    $ref = trim((string) $ref);
    if ($ref === '' || $ref === 'Direct') return 'Direct';
    $h = parse_url($ref, PHP_URL_HOST);
    if (!$h) $h = $ref;
    $h = strtolower(preg_replace('/^www\./', '', trim($h)));
    $pairs = array(
        'google.' => 'Google', 'duckduckgo' => 'DuckDuckGo', 'bing.' => 'Bing', 'yahoo.' => 'Yahoo',
        'facebook.' => 'Facebook', 'fb.' => 'Facebook', 'instagram.' => 'Instagram',
        'youtube.' => 'YouTube', 'telegram.' => 'Telegram', 't.me' => 'Telegram', 'wa.me' => 'WhatsApp',
        'whatsapp.' => 'WhatsApp', 'twitter.' => 'Twitter', 'x.com' => 'X', 'linkedin.' => 'LinkedIn'
    );
    foreach ($pairs as $needle => $name) {
        if (strpos($h, $needle) !== false) return $name;
    }
    return $h;
}

/* ================== التتبع (تخزين حدث) ================== */

$wantTrack = (isset($_GET['track']) || !is_null($postBody));

if ($wantTrack) {
    $rows = ahl_load($FILE);
    $p = trim(strip_tags((string) ahl_param('p', $postBody)));
    if ($p === '') $p = '/';
    if (strlen($p) > 200) $p = substr($p, 0, 200);
    $uid = substr((string) ahl_param('uid', $postBody), 0, 64);
    $stay = (int) ahl_param('stay', $postBody);

    if ($stay > 0) {
        $rows['events'][] = array(
            't' => $NOW, 'k' => 'stay', 'p' => $p, 'uid' => $uid, 's' => min(10800, max(1, $stay))
        );
    } else {
        $rows['events'][] = array(
            't' => $NOW, 'k' => 'pv',
            'p' => $p,
            'uid' => $uid,
            'sid' => substr((string) ahl_param('sid', $postBody), 0, 64),
            'ref' => ahl_ref(ahl_param('ref', $postBody)),
            'd' => substr((string) ahl_param('d', $postBody), 0, 16),
            'b' => substr((string) ahl_param('b', $postBody), 0, 32),
            'o' => substr((string) ahl_param('o', $postBody), 0, 24),
            'c' => strtoupper(substr((string) ahl_param('c', $postBody), 0, 2)),
            'r' => substr((string) ahl_param('r', $postBody), 0, 80),
            'ci' => substr((string) ahl_param('ci', $postBody), 0, 80)
        );
    }

    /* تقليم الأحداث الأقدم من ~400 يومًا */
    $cut = $NOW - 34560000;
    $keep = array();
    foreach ($rows['events'] as $ev) {
        if (is_array($ev) && isset($ev['t']) && $ev['t'] >= $cut) $keep[] = $ev;
    }
    $rows['events'] = $keep;

    ahl_save($FILE, $rows);
    echo json_encode(array('ok' => true), JSON_UNESCAPED_UNICODE);
    exit;
}

/* ================== القراءة والتجميع ================== */

$period = isset($_GET['period']) ? $_GET['period'] : '30d';
if (!in_array($period, array('day', '7d', '30d', '90d', 'year'))) $period = '30d';

$rows = ahl_load($FILE);
$events = $rows['events'];

$DAY_START = mktime(0, 0, 0);
$SEC_PER_DAY = 86400;

function ahl_is_pv($e)
{
    return is_array($e) && isset($e['k']) && $e['k'] === 'pv';
}

function ahl_in($e, $from, $to)
{
    return isset($e['t']) && $e['t'] >= $from && $e['t'] < $to;
}

/* نافذة الفترة + النافذة السابقة المساوية (لحساب نسبة التغيّر) */
function ahl_windows($period)
{
    $now = time();
    $lens = array('day' => 0, '7d' => 7, '30d' => 30, '90d' => 90, 'year' => 365);
    $days = isset($lens[$period]) ? $lens[$period] : 30;
    if ($period === 'day') {
        $start = mktime(0, 0, 0);
        $len = $start - ($start - mktime(0, 0, 0, (int) date('n'), (int) date('j'))); // unused
    } else {
        $start = $now - $days * 86400;
    }
    if ($days > 0) {
        $prevStart = $start - $days * 86400;
    } elseif ($period === 'day') {
        $prevStart = $start - 86400;
    } else {
        $prevStart = $start;
    }
    return array($start, $prevStart, ($period === 'day') ? 86400 : $days * 86400);
}

list($winStart, $prevStart, $winLen) = ahl_windows($period);

/* تجميع القوائم (مؤرخ الأحداث، عدد، مجموعها) */
$pvCur = array();
$pvPrev = array();
$pvAll = array();
$uidSeenAll = array();
$todayUid = array();
$yesterdayUid = array();
$yesterdayStart = $DAY_START - 86400;

foreach ($events as $e) {
    if (!is_array($e) || !isset($e['t'])) continue;
    if (ahl_is_pv($e)) {
        $pvAll[] = $e;
        $uidSeenAll[$e['uid']] = 1;
        if ($e['t'] >= $winStart) $pvCur[] = $e;
        if ($e['t'] >= $prevStart && $e['t'] < $winStart) $pvPrev[] = $e;
        if ($e['t'] >= $DAY_START) $todayUid[$e['uid']] = 1;
        if ($e['t'] >= $yesterdayStart && $e['t'] < $DAY_START) $yesterdayUid[$e['uid']] = 1;
    }
}

/* الزوار الآن: زوار فريدون نشطون خلال آخر 5 دقائق */
$nowUid = array();
foreach ($events as $e) {
    if (is_array($e) && isset($e['t']) && $e['t'] >= $NOW - 300 && isset($e['uid'])) {
        $nowUid[$e['uid']] = 1;
    }
}

/* متوسط مدة البقاء */
function ahl_avg_stay($events, $fromSecAgoLeft, $fromSecAgoRight)
{
    $sum = 0;
    $cnt = 0;
    foreach ($events as $e) {
        if (is_array($e) && isset($e['k']) && $e['k'] === 'stay' && isset($e['s']) && isset($e['t'])
            && $e['t'] >= $fromSecAgoLeft && $e['t'] < $fromSecAgoRight) {
            $sum += (int) $e['s'];
            $cnt++;
        }
    }
    return $cnt ? round($sum / $cnt) : 0;
}

$avgCur = ahl_avg_stay($events, $winStart, $NOW + 1);
$avgPrev = ahl_avg_stay($events, $prevStart, $winStart);

function ahl_mmss($sec)
{
    if (!$sec) return '--:--';
    return sprintf('%02d:%02d', floor($sec / 60), $sec % 60);
}

/* جمع عدّاد حسب مفتاح */
function ahl_counts($events, $key, $mapFn = null)
{
    $out = array();
    foreach ($events as $e) {
        $v = $mapFn ? $mapFn($e) : (isset($e[$key]) ? $e[$key] : '');
        $out[$v] = (isset($out[$v]) ? $out[$v] : 0) + 1;
    }
    arsort($out);
    return $out;
}

function ahl_pct($v, $total)
{
    return $total > 0 ? round(($v / $total) * 1000) / 10 : 0;
}

function ahl_uniq_count($events, $field)
{
    $seen = array();
    foreach ($events as $e) {
        if (is_array($e) && isset($e[$field])) $seen[$e[$field]] = 1;
    }
    return count($seen);
}

/* نسبة التغيّر بين قيمتين */
function ahl_change($cur, $prev)
{
    if ($prev > 0) return round((($cur - $prev) / $prev) * 1000) / 10;
    return 0;
}

function ahl_clean_region($r)
{
    $r = trim((string) $r);
    if ($r === '') return '–';
    $r = preg_replace('/[ _]+(Province|Wilaya|Governorate|Region|State|District)$/i', '', $r);
    return $r;
}

function ahl_country_name($cc)
{
    $map = array(
        'DZ' => 'الجزائر', 'FR' => 'فرنسا', 'CA' => 'كندا', 'ES' => 'إسبانيا', 'DE' => 'ألمانيا',
        'US' => 'الولايات المتحدة', 'IT' => 'إيطاليا', 'GB' => 'المملكة المتحدة', 'NL' => 'هولندا',
        'BE' => 'بلجيكا', 'CH' => 'سويسرا', 'TN' => 'تونس', 'MA' => 'المغرب', 'EG' => 'مصر',
        'SA' => 'السعودية', 'AE' => 'الإمارات', 'QA' => 'قطر', 'KW' => 'الكويت', 'JO' => 'الأردن',
        'LB' => 'لبنان', 'SY' => 'سوريا', 'TR' => 'تركيا', 'CN' => 'الصين', 'RU' => 'روسيا',
        'SE' => 'السويد', 'NO' => 'النرويج', 'DK' => 'الدنمارك', 'AT' => 'النمسا', 'PT' => 'البرتغال'
    );
    return isset($map[$cc]) ? $map[$cc] : $cc;
}

function ahl_device_name($d)
{
    $map = array('phone' => 'الهاتف', 'tablet' => 'الجهاز اللوحي', 'desktop' => 'الكمبيوتر');
    return isset($map[$d]) ? $map[$d] : $d;
}

function ahl_page_title($p)
{
    $map = array('/' => 'الصفحة الرئيسية', '/index.html' => 'الصفحة الرئيسية');
    if (isset($map[$p])) return $map[$p];
    $b = basename($p);
    if ($b === '') return $p;
    $b = preg_replace('/\.[^.]+$/', '', $b);
    return $b !== '' ? $b : $p;
}

/* ===== تحديد البلدية (أفضل جهد من بيانات المدينة/الولاية) ===== */
function ahl_norm($s)
{
    $s = function_exists('mb_strtolower') ? mb_strtolower($s, 'UTF-8') : strtolower($s);
    $s = strtr($s, array(
        'أ' => 'ا', 'إ' => 'ا', 'آ' => 'ا', 'ة' => 'ه', 'ى' => 'ي',
        'ؤ' => 'و', 'ئ' => 'ي', 'é' => 'e', 'è' => 'e', 'ê' => 'e',
        'ô' => 'o', 'î' => 'i', 'à' => 'a', 'ç' => 'c', 'ü' => 'u'
    ));
    $s = str_replace(array('ّ', 'ً', 'ٌ', 'ٍ', 'َ', 'ُ', 'ِ', 'ْ'), '', $s);
    $s = preg_replace('/[^a-z0-9\x{0621}-\x{064A}\x{0660}-\x{0669} ]/u', ' ', $s);
    $s = preg_replace('/\s+/', ' ', $s);
    return trim($s);
}

function ahl_communes_table()
{
    return array(
        // — بلديات ولاية معسكر —
        array('name' => 'رأس عين عميروش', 'wilaya' => 'معسكر', 'aliases' => array('ras el ain amirouche', 'ras el ain', 'ras l ain', 'ras el aen', 'amirouche')),
        array('name' => 'عقاز', 'wilaya' => 'معسكر', 'aliases' => array('akaz', 'akkaz', 'ak laz')),
        array('name' => 'معسكر', 'wilaya' => 'معسكر', 'aliases' => array('mascara', 'masscara', 'moscara')),
        array('name' => 'غريس', 'wilaya' => 'معسكر', 'aliases' => array('ghriss', 'ghrissi', 'gres')),
        array('name' => 'المحمدية', 'wilaya' => 'معسكر', 'aliases' => array('mohammadia', 'mohamadia', 'mohamedia', 'muhammadia')),
        array('name' => 'تيغنيف', 'wilaya' => 'معسكر', 'aliases' => array('tighennif', 'tighenif')),
        array('name' => 'سيق', 'wilaya' => 'معسكر', 'aliases' => array('sig', 'seg')),
        array('name' => 'سيدي قادة', 'wilaya' => 'معسكر', 'aliases' => array('sidi kada', 'si kada', 'sidi qada')),
        array('name' => 'وادي الأبطال', 'wilaya' => 'معسكر', 'aliases' => array('oued el abtal', 'oued abtal', 'el abtal')),
        array('name' => 'يسر', 'wilaya' => 'معسكر', 'aliases' => array('ysseur', 'yassir', 'yesser')),
        array('name' => 'بوهني', 'wilaya' => 'معسكر', 'aliases' => array('bou henni', 'bouhenni', 'bou hani')),
        array('name' => 'ماتمور', 'wilaya' => 'معسكر', 'aliases' => array('mattemore', 'matmor', 'matemore')),
        array('name' => 'ماوسة', 'wilaya' => 'معسكر', 'aliases' => array('maoussa', 'maussa')),
        array('name' => 'زهانة', 'wilaya' => 'معسكر', 'aliases' => array('zahana')),
        array('name' => 'عين فارس', 'wilaya' => 'معسكر', 'aliases' => array('ain fares', 'ainfares', 'aen fares')),
        array('name' => 'عين فكان', 'wilaya' => 'معسكر', 'aliases' => array('ain fekan', 'ainfekan', 'ain fekann')),
        array('name' => 'زلافة', 'wilaya' => 'معسكر', 'aliases' => array('zelafa', 'zalafa')),
        array('name' => 'السواني', 'wilaya' => 'معسكر', 'aliases' => array('saouani', 'soani', 'souani')),
        array('name' => 'الحشم', 'wilaya' => 'معسكر', 'aliases' => array('el hachem', 'hachem')),
        array('name' => 'بنيان', 'wilaya' => 'معسكر', 'aliases' => array('benian', 'beniane')),
        array('name' => 'عين الأقصاب', 'wilaya' => 'معسكر', 'aliases' => array('ain el aaoud', 'ain el aoud', 'ain aacab')),
        array('name' => 'الهامل', 'wilaya' => 'معسكر', 'aliases' => array('el hanel', 'hanel')),
        // — مدن/بلديّات كبرى في الولايات الأخرى —
        array('name' => 'وهران', 'wilaya' => 'وهران', 'aliases' => array('oran', 'wahran')),
        array('name' => 'الجزائر الوسطى', 'wilaya' => 'الجزائر', 'aliases' => array('alger', 'algiers', 'algier')),
        array('name' => 'قسنطينة', 'wilaya' => 'قسنطينة', 'aliases' => array('constantine', 'kasantina')),
        array('name' => 'عنابة', 'wilaya' => 'عنابة', 'aliases' => array('annaba', 'bone')),
        array('name' => 'سطيف', 'wilaya' => 'سطيف', 'aliases' => array('setif', 'settef')),
        array('name' => 'البليدة', 'wilaya' => 'البليدة', 'aliases' => array('blida', 'bougara', 'ouled yaich')),
        array('name' => 'بجاية', 'wilaya' => 'بجاية', 'aliases' => array('bejaia', 'bejaia cedre', 'bougie')),
        array('name' => 'باتنة', 'wilaya' => 'باتنة', 'aliases' => array('batna')),
        array('name' => 'تلمسان', 'wilaya' => 'تلمسان', 'aliases' => array('tlemcen')),
        array('name' => 'سيدي بلعباس', 'wilaya' => 'سيدي بلعباس', 'aliases' => array('sidi bel abbes', 'sidi belabbas')),
        array('name' => 'مستغانم', 'wilaya' => 'مستغانم', 'aliases' => array('mostaganem', 'mostaganame')),
        array('name' => 'الشلف', 'wilaya' => 'الشلف', 'aliases' => array('chlef', 'ech cheliff')),
        array('name' => 'تيزي وزو', 'wilaya' => 'تيزي وزو', 'aliases' => array('tizi ouzou', 'tiziouzou')),
        array('name' => 'الجلفة', 'wilaya' => 'الجلفة', 'aliases' => array('djelfa')),
        array('name' => 'الأغواط', 'wilaya' => 'الأغواط', 'aliases' => array('laghouat')),
        array('name' => 'ورقلة', 'wilaya' => 'ورقلة', 'aliases' => array('ouargla')),
        array('name' => 'بسكرة', 'wilaya' => 'بسكرة', 'aliases' => array('biskra')),
        array('name' => 'سكيكدة', 'wilaya' => 'سكيكدة', 'aliases' => array('skikda', 'philippeville')),
        array('name' => 'برج بوعريريج', 'wilaya' => 'برج بوعريريج', 'aliases' => array('bordj bou arreridj', 'bordj bouarerridj')),
        array('name' => 'بومرداس', 'wilaya' => 'بومرداس', 'aliases' => array('boumerdes')),
        array('name' => 'تبسة', 'wilaya' => 'تبسة', 'aliases' => array('tebessa', 'theveste')),
        array('name' => 'تيارت', 'wilaya' => 'تيارت', 'aliases' => array('tiaret')),
        array('name' => 'المدية', 'wilaya' => 'المدية', 'aliases' => array('medea')),
        array('name' => 'سعيدة', 'wilaya' => 'سعيدة', 'aliases' => array('saida')),
        array('name' => 'غيليزان', 'wilaya' => 'غيليزان', 'aliases' => array('relizane', 'ghilizane')),
        array('name' => 'جيجل', 'wilaya' => 'جيجل', 'aliases' => array('jijel')),
        array('name' => 'ميلة', 'wilaya' => 'ميلة', 'aliases' => array('mila')),
        array('name' => 'غرداية', 'wilaya' => 'غرداية', 'aliases' => array('ghardaia')),
        array('name' => 'الوادي', 'wilaya' => 'الوادي', 'aliases' => array('el oued', 'oued souf')),
        array('name' => 'أم البواقي', 'wilaya' => 'أم البواقي', 'aliases' => array('oum el bouaghi')),
        array('name' => 'خنشلة', 'wilaya' => 'خنشلة', 'aliases' => array('khenchela')),
        array('name' => 'عين الدفلى', 'wilaya' => 'عين الدفلى', 'aliases' => array('ain defla')),
        array('name' => 'تيسمسيلت', 'wilaya' => 'تيسمسيلت', 'aliases' => array('tissemsilt')),
        array('name' => 'بشار', 'wilaya' => 'بشار', 'aliases' => array('bechar')),
        array('name' => 'أدرار', 'wilaya' => 'أدرار', 'aliases' => array('adrar')),
    );
}

function ahl_commune($region, $city)
{
    if ($region !== '' || $city !== '') {
        $hay = ahl_norm($region . ' ' . $city);
    } else {
        $hay = '';
    }
    $communes = ahl_communes_table();
    foreach ($communes as $c) {
        foreach ($c['aliases'] as $a) {
            $na = ahl_norm($a);
            if ($na !== '' && $hay !== '' && strpos($hay, $na) !== false) {
                return array('name' => $c['name'], 'wilaya' => $c['wilaya']);
            }
        }
        $nc = ahl_norm($c['name']);
        if ($nc !== '' && $hay !== '' && strpos($hay, $nc) !== false) {
            return array('name' => $c['name'], 'wilaya' => $c['wilaya']);
        }
    }
    return array('name' => 'غير محددة', 'wilaya' => '');
}

$pvCount = count($pvCur);
$pvPrevCount = count($pvPrev);
$totalUidCur = ahl_uniq_count($pvCur, 'uid');
$totalUidPrev = ahl_uniq_count($pvPrev, 'uid');
$sidCur = ahl_uniq_count($pvCur, 'sid');
$sidPrev = ahl_uniq_count($pvPrev, 'sid');
$viewsToday = count($pvAll) ? count(array_filter($pvAll, function ($e) use ($DAY_START) { return $e['t'] >= $DAY_START; })) : 0;

/* ===== البلدان ===== */
$countryCounts = ahl_counts($pvCur, 'c');
$countryTotal = array_sum($countryCounts);
$countries = array();
$i = 0;
foreach ($countryCounts as $cc => $c) {
    if ($i++ >= 8) break;
    $countries[] = array(
        'code' => strtolower($cc),
        'name' => ahl_country_name($cc),
        'count' => $c,
        'pct' => ahl_pct($c, $countryTotal)
    );
}

/* ===== الولايات ===== */
$wilayaCounts = ahl_counts($pvCur, 'r', function ($e) {
    return ahl_clean_region(isset($e['r']) ? $e['r'] : '');
});
$wilayaTotal = array_sum($wilayaCounts);
$wilayas = array();
$i = 0;
foreach ($wilayaCounts as $w => $c) {
    if ($i++ >= 8) break;
    $wilayas[] = array('name' => $w, 'count' => $c, 'pct' => ahl_pct($c, $wilayaTotal));
}

/* ===== المدن ===== */
$cityCounts = array();
foreach ($pvCur as $e) {
    $ci = isset($e['ci']) && $e['ci'] !== '' ? $e['ci'] : 'غير محددة';
    if (!isset($cityCounts[$ci])) $cityCounts[$ci] = array('c' => 0, 'w' => isset($e['r']) ? ahl_clean_region($e['r']) : '–');
    $cityCounts[$ci]['c']++;
}
uasort($cityCounts, function ($a, $b) { return $b['c'] - $a['c']; });
$cityTotal = array_sum(array_map(function ($v) { return $v['c']; }, $cityCounts));
$cities = array();
$i = 0;
foreach ($cityCounts as $ci => $info) {
    if ($i++ >= 8) break;
    $cities[] = array('city' => $ci, 'wilaya' => $info['w'], 'count' => $info['c'], 'pct' => ahl_pct($info['c'], $cityTotal));
}

/* ===== البلديات ===== */
$communeCounts = array();
foreach ($pvCur as $e) {
    $cm = ahl_commune(isset($e['r']) ? $e['r'] : '', isset($e['ci']) ? $e['ci'] : '');
    if (!isset($communeCounts[$cm['name']])) $communeCounts[$cm['name']] = array('c' => 0, 'w' => $cm['wilaya']);
    $communeCounts[$cm['name']]['c']++;
}
uasort($communeCounts, function ($a, $b) { return $b['c'] - $a['c']; });
$communeTotal = array_sum(array_map(function ($v) { return $v['c']; }, $communeCounts));
$communes = array();
$i = 0;
foreach ($communeCounts as $cmn => $info) {
    if ($i++ >= 8) break;
    $communes[] = array('name' => $cmn, 'wilaya' => $info['w'], 'count' => $info['c'], 'pct' => ahl_pct($info['c'], $communeTotal));
}

/* ===== الأجهزة ===== */
$DEVICE_COLORS = array('الهاتف' => '#6366f1', 'الكمبيوتر' => '#0ea5e9', 'الجهاز اللوحي' => '#f59e0b');
$deviceCounts = ahl_counts($pvCur, 'd', function ($e) {
    return ahl_device_name(isset($e['d']) ? $e['d'] : '');
});
$deviceTotal = array_sum($deviceCounts);
$devices = array();
$i = 0;
foreach ($deviceCounts as $dn => $c) {
    if ($i++ >= 3) break;
    $devices[] = array('name' => $dn, 'count' => $c, 'pct' => ahl_pct($c, $deviceTotal), 'color' => isset($DEVICE_COLORS[$dn]) ? $DEVICE_COLORS[$dn] : '#94a3b8');
}

/* ===== المتصفحات ===== */
$browserCounts = ahl_counts($pvCur, 'b');
$browserTotal = array_sum($browserCounts);
$browsers = array();
$i = 0;
foreach ($browserCounts as $bn => $c) {
    if ($i++ >= 6) break;
    $browsers[] = array('name' => $bn !== '' ? $bn : 'غير معروف', 'count' => $c, 'pct' => ahl_pct($c, $browserTotal));
}

/* ===== أنظمة التشغيل ===== */
$osCounts = ahl_counts($pvCur, 'o');
$osTotal = array_sum($osCounts);
$operatingSystems = array();
$i = 0;
foreach ($osCounts as $on => $c) {
    if ($i++ >= 6) break;
    $operatingSystems[] = array('name' => $on !== '' ? $on : 'غير معروف', 'count' => $c, 'pct' => ahl_pct($c, $osTotal));
}

/* ===== مصادر الزيارات ===== */
$SOURCE_COLORS = array('#6366f1', '#0ea5e9', '#22d3ee', '#10b981', '#f59e0b', '#a855f7', '#94a3b8');
$sourceCounts = ahl_counts($pvCur, 'ref');
$sourceTotal = array_sum($sourceCounts);
$trafficSources = array();
$i = 0;
foreach ($sourceCounts as $sn => $c) {
    if ($i++ >= 7) break;
    $trafficSources[] = array('name' => $sn !== '' ? $sn : 'Direct', 'count' => $c, 'pct' => ahl_pct($c, $sourceTotal), 'color' => $SOURCE_COLORS[($i - 1) % count($SOURCE_COLORS)]);
}

/* ===== الصفحات الأكثر زيارة ===== */
$pageViews = array();       // p => count
$pageVisitors = array();    // p => uid set
$pageStay = array();        // p => sum seconds
$sessionPages = array();    // sid => pages set
foreach ($pvCur as $e) {
    $p = $e['p'];
    $pageViews[$p] = (isset($pageViews[$p]) ? $pageViews[$p] : 0) + 1;
    if (!isset($pageVisitors[$p])) $pageVisitors[$p] = array();
    $pageVisitors[$p][$e['uid']] = 1;
    if (!isset($sessionPages[$e['sid']])) $sessionPages[$e['sid']] = array();
    $sessionPages[$e['sid']][$p] = 1;
}
foreach ($events as $e) {
    if (is_array($e) && isset($e['k']) && $e['k'] === 'stay' && isset($e['p']) && isset($e['s'])) {
        $pageStay[$e['p']] = (isset($pageStay[$e['p']]) ? $pageStay[$e['p']] : 0) + (int) $e['s'];
    }
}
arsort($pageViews);
$pages = array();
$i = 0;
foreach ($pageViews as $p => $c) {
    if ($i++ >= 6) break;
    $sessionCount = 0;
    $bounceCount = 0;
    foreach ($sessionPages as $sPages) {
        if (isset($sPages[$p])) {
            $sessionCount++;
            if (count($sPages) === 1) $bounceCount++;
        }
    }
    $staySum = isset($pageStay[$p]) ? $pageStay[$p] : 0;
    // عدد أحداث البقاء لهذه الصفحة:
    $sc = 0;
    foreach ($events as $e) {
        if (is_array($e) && isset($e['k']) && $e['k'] === 'stay' && $e['p'] === $p && isset($e['t']) && $e['t'] >= $winStart) {
            $sc++;
        }
    }
    $pages[] = array(
        'title' => ahl_page_title($p),
        'url' => $p,
        'views' => $c,
        'visitors' => count($pageVisitors[$p]),
        'avg' => $sc > 0 ? ahl_mmss(round($staySum / $sc)) : '--:--',
        'bounce' => $sessionCount > 0 ? round(($bounceCount / $sessionCount) * 100) : 0
    );
}

/* ===== الوقت الحقيقي ===== */
$realtime = array();
for ($i = count($pvAll) - 1; $i >= 0 && count($realtime) < 8; $i--) {
    $e = $pvAll[$i];
    $cm = ahl_commune(isset($e['r']) ? $e['r'] : '', isset($e['ci']) ? $e['ci'] : '');
    $realtime[] = array(
        'flag' => strtolower(isset($e['c']) && $e['c'] !== '' ? $e['c'] : 'xx'),
        'country' => ahl_country_name(isset($e['c']) ? $e['c'] : 'XX'),
        'wilaya' => ahl_clean_region(isset($e['r']) ? $e['r'] : ''),
        'city' => (isset($e['ci']) && $e['ci'] !== '') ? $e['ci'] : 'غير محددة',
        'commune' => $cm['name'],
        'page' => ahl_page_title(isset($e['p']) ? $e['p'] : '/'),
        'device' => ahl_device_name(isset($e['d']) ? $e['d'] : ''),
        'browser' => isset($e['b']) && $e['b'] !== '' ? $e['b'] : 'غير معروف',
        'since' => max(0, $NOW - $e['t'])
    );
}

/* ===== الخط الزمني ===== */
$labels = array();
$values = array();
if ($period === 'day') {
    for ($i = 0; $i < 24; $i++) {
        $f = $DAY_START + $i * 3600;
        $labels[] = sprintf('%02d:00', $i);
        $values[] = ahl_count_range($pvAll, $f, $f + 3600);
    }
} elseif ($period === 'year') {
    $monthsAr = array('يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر');
    $curY = (int) date('Y');
    $curM = (int) date('n');
    for ($i = 11; $i >= 0; $i--) {
        $m = $curM - $i;
        $y = $curY;
        if ($m <= 0) { $m += 12; $y--; }
        $f = mktime(0, 0, 0, $m, 1, $y);
        $t = mktime(0, 0, 0, $m + 1, 1, $y);
        $labels[] = $monthsAr[$m - 1];
        $values[] = ahl_count_range($pvAll, $f, $t);
    }
} else {
    $pts = $period === '7d' ? 7 : ($period === '30d' ? 30 : 30);
    $start = $NOW - ($period === '90d' ? 90 : $pts) * 86400;
    for ($i = 0; $i < $pts; $i++) {
        if ($period === '90d') {
            $f = $start + $i * 3 * 86400;
            $labels[] = 'يوم ' . ($i * 3 + 1);
        } else {
            $f = $start + $i * 86400;
            $labels[] = $period === '7d' ? ahl_day_name($NOW - ($pts - 1 - $i) * 86400) : 'يوم ' . ($i + 1);
        }
        $values[] = ahl_count_range($pvAll, $f, $f + ($period === '90d' ? 3 * 86400 : 86400));
    }
}

/* ===== نظرة عامة ===== */
$totalVisitors = count($uidSeenAll);
$overview = array(
    'total' => (int) $totalVisitors,
    'today' => count($todayUid),
    'views' => $pvCount,
    'now' => count($nowUid),
    'avgTime' => ahl_mmss($avgCur),
    'sessions' => $sidCur,
    'changes' => array(
        'total' => ahl_change($totalUidCur, $totalUidPrev),
        'today' => ahl_change(count($todayUid), count($yesterdayUid)),
        'views' => ahl_change($pvCount, $pvPrevCount),
        'now' => 0,
        'avgTime' => $avgPrev > 0 ? ahl_change($avgCur, $avgPrev) : 0,
        'sessions' => ahl_change($sidCur, $sidPrev)
    )
);

function ahl_count_range($events, $from, $to)
{
    $c = 0;
    foreach ($events as $e) {
        if (isset($e['t']) && $e['t'] >= $from && $e['t'] < $to) $c++;
    }
    return $c;
}

function ahl_day_name($ts)
{
    $ar = array('السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة');
    return $ar[(int) date('w', $ts)];
}

$response = array(
    'period' => $period,
    'server' => true,
    'overview' => $overview,
    'countries' => $countries,
    'wilayas' => $wilayas,
    'communes' => $communes,
    'cities' => $cities,
    'devices' => $devices,
    'browsers' => $browsers,
    'operatingSystems' => $operatingSystems,
    'trafficSources' => $trafficSources,
    'pages' => $pages,
    'realtime' => $realtime,
    'timeline' => array('labels' => $labels, 'values' => $values)
);

echo json_encode($response, JSON_UNESCAPED_UNICODE);