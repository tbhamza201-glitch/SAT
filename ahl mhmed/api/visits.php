<?php
/**
 * عداد زوار موقع أهل محمد (يعمل على أي استضافة تدعم PHP).
 *   - GET api/visits.php?read=1  يقرأ العداد دون زيادة (تستخدمه لوحة التحكم)
 *   - GET api/visits.php         يزيد العداد ويعيد النتيجة (تستخدمه صفحات الموقع العامة)
 *   - GET api/visits.php?country=DZ  تمرير بلد الزائر من المتصفح (رمز ISO من حرفين)
 * البيانات محفوظة في api/visits.json
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * تحديد بلد الزائر:
 *   1) الرمز المرسل من متصفح الزائر (أدق وأسرع).
 *   2) رؤوس الخادم (Cloudflare أو إضافات GeoIP).
 *   3) "XX" عند تعذّر التحديد.
 */
function ahl_country_code() {
    // (1) رمز من العميل
    if (isset($_GET['country'])) {
        $c = strtoupper(trim((string) $_GET['country']));
        if (preg_match('/^[A-Z]{2}$/', $c)) {
            return $c;
        }
    }
    // (2) رؤوس الخادم
    $headers = array(
        'HTTP_CF_IPCOUNTRY',
        'HTTP_X_COUNTRY_CODE',
        'HTTP_X_GEOIP_COUNTRY_CODE',
        'HTTP_GEOIP_COUNTRY_CODE',
    );
    foreach ($headers as $h) {
        if (!empty($_SERVER[$h])) {
            $c = strtoupper(trim((string) $_SERVER[$h]));
            if (preg_match('/^[A-Z]{2}$/', $c)) {
                return $c;
            }
        }
    }
    // (3) غير معروف
    return 'XX';
}

$file = __DIR__ . '/visits.json';
$todayNow = date('Y-m-d');

$data = array('total' => 0, 'today' => 0, 'date' => $todayNow, 'countries' => array());
if (file_exists($file)) {
    $raw = @file_get_contents($file);
    $parsed = json_decode($raw, true);
    if (is_array($parsed) && isset($parsed['total'])) {
        $data = $parsed;
    }
}

if (!isset($data['countries']) || !is_array($data['countries'])) {
    $data['countries'] = array();
}

// تبديل اليوم: إعادة تصفير عداد اليوم
if (!isset($data['date']) || $data['date'] !== $todayNow) {
    $data['date'] = $todayNow;
    $data['today'] = 0;
}

// رمز بلد الزائر الحالي
$cc = ahl_country_code();

// زيادة العداد فقط عند الطلب العادي (بدون ?read=1)
if (!isset($_GET['read'])) {
    $data['total'] = intval($data['total']) + 1;
    $data['today'] = intval($data['today']) + 1;
    $data['countries'][$cc] = intval(isset($data['countries'][$cc]) ? $data['countries'][$cc] : 0) + 1;
    @file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
    @chmod($file, 0666);
}

$response = array(
    'total' => intval($data['total']),
    'today' => intval($data['today']),
    'date' => $data['date'],
    'country' => $cc,
);

// نرسل تفصيل الدول للوحة التحكم فقط (تستخدم ?read=1) لتخفيف حجم الطلبات العامة
if (isset($_GET['read'])) {
    $response['countries'] = $data['countries'];
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);
