// ===== نظام الدخول وحماية لوحة التحكم =====
const AUTH_KEY = 'ahlMhmedAuth';
const USERS_KEY = 'ahlMhmedUsers';
const SESSION_KEY = 'ahlMhmedSession';

// دالة تجزئة بسيطة لكلمة المرور (SHA-256 عبر Web Crypto)
async function hashPass(pass, salt) {
    const data = new TextEncoder().encode(salt + '|' + pass);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function getSession() {
    return localStorage.getItem(SESSION_KEY);
}

// تحقق من وجود جلسة صالحة
function isLoggedIn() {
    const session = getSession();
    if (!session) return false;
    const users = getUsers();
    return users.some(u => u.email === session);
}

// استخدم مع صفحة اللوحة: إن لم يكن مسجلاً، أعد توجيهه
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginMsg = document.getElementById('loginMsg');
const registerMsg = document.getElementById('registerMsg');

function showMsg(el, text, type) {
    el.textContent = text;
    el.className = 'auth-msg ' + (type || '');
}

// التبديل بين النموذجين
document.getElementById('gotoRegister').addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});
document.getElementById('gotoLogin').addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// ===== تسجيل الدخول =====
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const pass = document.getElementById('loginPass').value;

    if (!email || !pass) {
        showMsg(loginMsg, 'يرجى إدخال البريد وكلمة المرور.', 'error');
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
        showMsg(loginMsg, 'لا يوجد حساب بهذا البريد.', 'error');
        return;
    }

    const hash = await hashPass(pass, user.salt);
    if (hash !== user.hash) {
        showMsg(loginMsg, 'كلمة المرور غير صحيحة.', 'error');
        return;
    }

    localStorage.setItem(SESSION_KEY, email);
    showMsg(loginMsg, '✔ تم تسجيل الدخول، جارِ الانتقال...', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
});

// ===== إنشاء الحساب الأول =====
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const pass = document.getElementById('regPass').value;
    const pass2 = document.getElementById('regPass2').value;

    if (!name || !email || !pass || !pass2) {
        showMsg(registerMsg, 'يرجى ملء جميع الحقول.', 'error');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg(registerMsg, 'صيغة البريد الإلكتروني غير صحيحة.', 'error');
        return;
    }
    if (pass.length < 6) {
        showMsg(registerMsg, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.', 'error');
        return;
    }
    if (pass !== pass2) {
        showMsg(registerMsg, 'كلمتا المرور غير متطابقتين.', 'error');
        return;
    }

    const users = getUsers();
    if (users.length > 0 && !users.some(u => u.email === email)) {
        // يوجد حسابات بالفعل لكن بنفس البريد
    }
    if (users.some(u => u.email === email)) {
        showMsg(registerMsg, 'هذا البريد مسجّـل مسبقاً.', 'error');
        return;
    }

    // توليد ملح عشوائي
    const salt = Math.random().toString(36).slice(2, 12);
    const hash = await hashPass(pass, salt);

    const newUser = { name, email, salt, hash, role: users.length === 0 ? 'admin' : 'editor', createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    localStorage.setItem(SESSION_KEY, email);
    showMsg(registerMsg, '✔ تم إنشاء الحساب وتسجيل الدخول.', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
});

// إذا كان مسجلاً بالفعل، انتقل مباشرة
if (window.location.pathname.endsWith('login.html') && isLoggedIn()) {
    window.location.href = 'dashboard.html';
}
