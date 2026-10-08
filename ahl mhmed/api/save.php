<?php
/**
 * نقطة الحفظ والقراءة لبيانات موقع أهل محمد.
 * يعمل على أي استضافة تدعم PHP بدون قاعدة بيانات:
 *   - GET  api/save.php?read=1  يعيد محتوى data.json (لقراءة الزوار)
 *   - POST api/save.php         يحفظ البيانات في data.json (من لوحة التحكم)
 *
 * الكود السري: غيّره هنا وفي ملف storage.js معاً، ولا تشاركه مع أحد.
 */

define('SAVE_TOKEN', 'AhlMhmed@2026');

$file = __DIR__ . '/data.json';

// إعداد الرؤوس العامة
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// فحص جاهزية الاستضافة بعد الرفع — افتحه في المتصفح:
//   api/save.php?status=1
if (isset($_GET['status'])) {
    $exists = file_exists($file);
    $writable = $exists ? is_writable($file) : is_writable(dirname($file));
    echo json_encode([
        'ok' => true,
        'php' => phpversion(),
        'fileExists' => $exists,
        'writable' => $writable,
        'bytes' => $exists ? filesize($file) : 0,
        'hint' => $writable
            ? 'الخادم جاهز للحفظ ✔'
            : 'مجلد api غير قابل للكتابة — امنحه الصلاحية 775 أو 777 من مدير ملفات الاستضافة'
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// إنشاء الملف إن لم يكن موجوداً (مع منح صلاحية الكتابة تلقائياً)
if (!file_exists($file)) {
    @file_put_contents($file, '{}', LOCK_EX);
    @chmod($file, 0666);
}

// ===== الحفظ =====
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);

    if (!is_array($body) || !isset($body['token']) || !isset($body['data'])) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'invalid_request']);
        exit;
    }

    if (!is_string($body['token']) || !hash_equals(SAVE_TOKEN, $body['token'])) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'forbidden']);
        exit;
    }

    $json = json_encode($body['data'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($json === false) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'bad_data']);
        exit;
    }

    clearstatcache(true, $file);
    if (@file_put_contents($file, $json, LOCK_EX) === false) {
        // محاولة ثانية بعد محاولة إصلاح الصلاحيات (شائع عند الرفع عبر cPanel بصلاحيات قراءة فقط)
        @chmod($file, 0666);
        clearstatcache(true, $file);
        if (@file_put_contents($file, $json, LOCK_EX) === false) {
            http_response_code(500);
            echo json_encode([
                'ok' => false,
                'error' => 'write_failed',
                'hint' => 'تعذّرت الكتابة على: ' . $file . ' — من مدير الملفات في الاستضافة امنح مجلد api الصلاحية 775 أو 777'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    echo json_encode(['ok' => true]);
    exit;
}

// ===== القراءة =====
$content = @file_get_contents($file);
if ($content === false || trim($content) === '') {
    echo '{}';
} else {
    echo $content;
}