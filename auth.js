// ===== نظام الدخول بالكود فقط — حماية لوحة التحكم =====
const CODE_SESSION_KEY = 'ahlMhmedCodeSession';

// الكود السري المطلوب للدخول إلى لوحة التحكم.
// غيّر القيمة التالية حسب رغبتك، ولا تشاركها مع أحد.
const LOGIN_SECRET = 'AhlMhmed@2026';

// هل توجد جلسة دخول صالحة (بالكود)؟
function isCodeSession() {
    return localStorage.getItem(CODE_SESSION_KEY) === LOGIN_SECRET;
}

function isLoggedIn() {
    return isCodeSession();
}

// تسجيل الدخول بالكود — يعيد true عند النجاح
function loginWithCode(code) {
    if (code !== LOGIN_SECRET) return false;
    localStorage.setItem(CODE_SESSION_KEY, LOGIN_SECRET);
    return true;
}

// الخروج من جلسة الكود
function logoutCode() {
    localStorage.removeItem(CODE_SESSION_KEY);
}

// استخدم مع صفحة اللوحة: إن لم يكن مسجلاً، أعد توجيهه
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function showMsg(el, text, type) {
    el.textContent = text;
    el.className = 'auth-msg ' + (type || '');
}

// ===== نموذج الدخول بالكود (login.html) =====
const codeForm = document.getElementById('codeLoginForm');
const codeMsg = document.getElementById('codeMsg');

if (codeForm) {
    codeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('codeEntry').value.trim();
        if (!code) {
            showMsg(codeMsg, 'يرجى إدخال الكود السري.', 'error');
            return;
        }
        if (loginWithCode(code)) {
            showMsg(codeMsg, '✔ تم التحقق من الكود، جارِ الدخول...', 'success');
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
        } else {
            showMsg(codeMsg, 'الكود السري غير صحيح.', 'error');
        }
    });
    // إذا كان الدخول مفعّلاً بالفعل، انتقل مباشرة
    if (isLoggedIn()) {
        window.location.href = 'dashboard.html';
    }
}