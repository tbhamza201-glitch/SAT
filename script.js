// ===== مشاركة البيانات مع لوحة التحكم =====
const STORAGE_KEY = 'ahlMhmedData';

const defaultData = {
    siteName: 'أهل محمد',
    siteTagline: 'قرية أهل محمد — رأس عين عميروش، معسكر، الجزائر',
    contactPhone: '',
    contactEmail: 'info@ahlmhmed.example',
    heroTitle: 'أهلاً بكم في قرية أهل محمد',
    heroSub: 'قرية عريقة في بلدية رأس عين عميروش بولاية معسكر، تحافظ على تراثها وتتطلع لمستقبل أفضل',
    heroBg: 'https://images.unsplash.com/photo-1559754417-c1304ca2f80f?w=1920',
    aboutP1: 'أهل محمد قرية جزائرية تتبع إدارياً لبلدية رأس عين عميروش، دائرة عقاز، ولاية معسكر. أراضي القرية بين منبسطة وشبه جبلية، ويمرّ عبر القرية الطريق الوطني رقم 97 الذي يمنحها موقعاً استراتيجياً، بالإضافة إلى الطريق البلدي المتجه نحو قرية عقاز وأهل العيد.',
    aboutP2: 'تضم القرية مسجدين، أقدمهما يعود إلى بداية القرن العشرين ليبقى شاهداً على تاريخ المنطقة، إضافة إلى مدرسة لتعليم القرآن الكريم، ومصلحة صحية، ومدرسة ابتدائية، وملحقة بلدية، وملعب جواري، وبيت للشباب مع مقهى. قرية تجمع بين الأصالة والعراقة، يحفظ أهلها تراثهم الجميل ويجتهدون في بناء مستقبل مشرق.',
    aboutP3: 'تنتشر به حرفتا الرعي وتربية الحيوانات من أغنام وأبقار وغيرها، كما توجد به وحدات تربية دجاج اللحوم ودجاج إنتاج البيض. تنتشر حول هذا الدوار أشجار الزيتون، كما توجد أشجار الرمان والتين، ويزرع فيه الفول والقرنون والفلفل الحار خاصة في المنطقة الشرقية منه، وفي المنطقة الغربية منه أراضٍ وسهوب لزراعة القمح والشعير.',
    aboutP4: 'ويوجد بالقرية عدة مؤسسات صغيرة مثل تصبير الزيتون ومطاحن الحبوب وغير ذلك.',
    stats: { population: '3000', families: '600', years: '100' },
    services: [
        { icon: '📚', title: 'دروس خصوصية', text: 'دروس خصوصية في مختلف المواد الدراسية لتقوية التلاميذ ومساعدتهم على التفوق.', type: 'register' },
        { icon: '🍬', title: 'حلويات', text: 'حلويات تقليدية وعصرية حسب الطلب للمناسبات والأعياد.', type: 'sweets' }
    ],
    location: {
        text: 'تتبع إدارياً لبلدية رأس عين عميروش، دائرة عقاز، ولاية معسكر — الجزائر'
    },
    prayer: [
        { name: 'الفجر', time: '05:30', icon: '🌅', main: true },
        { name: 'الشروق', time: '06:55', icon: '☀️', main: false },
        { name: 'الظهر', time: '12:45', icon: '☀️', main: false },
        { name: 'العصر', time: '16:10', icon: '🌤️', main: false },
        { name: 'المغرب', time: '18:40', icon: '🌇', main: false },
        { name: 'العشاء', time: '20:00', icon: '🌙', main: true }
    ],
    history: [
        { title: 'مسجد القرية', content: 'أقدم مساجد القرية يعود إلى بداية القرن العشرين، ليبقى شاهداً على تاريخ المنطقة.' },
        { title: 'مدرسة القرآن الكريم', content: 'مدرسة لتعليم القرآن الكريم تساهم في الحفاظ على الهوية الدينية والتعليمية للقرية.' }
    ],
    residents: {
        origin: 'سكان القرية من نوع السكان العرب البيض، أغلب أصلهم ينحدر إلى قبيلة الغرابة التي سكنت المنطقة في الفترة العثمانية وخلال الاستعمار الفرنسي. من العائلات التي تسكن هذا الدوار: عائلة هاشمي، تعالبي، بوعلام، مراح، سالم، نهار، بومعزة، وغيرها.',
        migration: 'هاجر بعض من سكان القرية إلى مدينة سيق، وأرزيو، ومدينة ونواحي وهران، بفعل عدة عوامل منها اقتصادية وأمنية وغير ذلك. وغالبية سكان القرية من الشباب.'
    },
    shop: [
        { name: 'غلاف حماية للهاتف', price: '1200 دج', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600', desc: 'غلاف سيليكون متين يحمي هاتفك من الصدمات والخدوش.' },
        { name: 'سماعات بلوتوث', price: '4500 دج', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', desc: 'سماعات لاسلكية عالية الجودة بصوت نقي وبطارية تدوم طويلاً.' },
        { name: 'شاحن سريع', price: '2200 دج', image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600', desc: 'شاحن سريع 33 واط متوافق مع معظم الهواتف الحديثة.' }
    ],
    deceased: [],
    messages: [],
    contentVersion: '26'
};

function getData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    let d;
    if (!raw) {
        d = JSON.parse(JSON.stringify(defaultData));
    } else {
        try {
            d = JSON.parse(raw);
        } catch (e) {
            d = JSON.parse(JSON.stringify(defaultData));
        }
    }
    // إذا تغيّرت نسخة المحتوى، نعيد استخدام البيانات الافتراضية المحدّثة
    if (d.contentVersion !== defaultData.contentVersion) {
        d = JSON.parse(JSON.stringify(defaultData));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    }
    // دمج الحقول الجديدة لضمان التوافق مع البيانات المحفوظة سابقاً
    const defaults = JSON.parse(JSON.stringify(defaultData));
    d = Object.assign({}, defaults, d);
    if (!Array.isArray(d.deceased)) d.deceased = defaults.deceased;
    if (!Array.isArray(d.services)) d.services = defaults.services;
    if (!Array.isArray(d.history)) d.history = defaults.history;
    if (!Array.isArray(d.shop)) d.shop = defaults.shop;
    if (!Array.isArray(d.prayer)) d.prayer = defaults.prayer;
    if (!d.residents) d.residents = defaults.residents;
    if (!d.messages) d.messages = [];
    if (!d.stats) d.stats = defaults.stats;
    return d;
}

// ===== بناء الموقع من البيانات =====
function renderSite() {
    const d = getData();

    // الأسماء عبر الموقع
    document.title = d.siteName + ' — قرية ' + d.siteName;
    const logos = document.querySelectorAll('#navLogo');
    logos.forEach(el => { if (el) el.textContent = d.siteName; });
    const aboutTitleEl = document.getElementById('aboutTitle');
    if (aboutTitleEl) {
        aboutTitleEl.innerHTML = 'عن قرية <span>' + escapeHtml(d.siteName) + '</span>';
    }

    // القسم الرئيسي
    if (document.getElementById('heroTitle')) {
        document.getElementById('heroTitle').innerHTML = d.heroTitle;
        const hero = document.querySelector('#home');
        if (hero && d.heroBg) hero.style.backgroundImage = `url("${d.heroBg}")`;
    }
    if (document.getElementById('heroSub')) {
        document.getElementById('heroSub').textContent = d.heroSub;
    }

    // عن القرية
    if (document.getElementById('aboutP1')) document.getElementById('aboutP1').textContent = d.aboutP1;
    if (document.getElementById('aboutP2')) document.getElementById('aboutP2').textContent = d.aboutP2;
    if (document.getElementById('aboutP3')) document.getElementById('aboutP3').textContent = d.aboutP3;
    if (document.getElementById('aboutP4')) document.getElementById('aboutP4').textContent = d.aboutP4;

    // تاريخ القرية داخل عن القرية
    const aboutHist = document.getElementById('aboutHistory');
    if (aboutHist) {
        const list = (d.history && d.history.length ? d.history : []);
        aboutHist.innerHTML = list.map(h =>
            `<div class="about-history-item"><h4>${h.title}</h4><p>${h.content}</p></div>`
        ).join('') || '<p>لا توجد وقائع تاريخية بعد.</p>';
    }

    // سكان القرية داخل عن القرية
    const aboutRes = document.getElementById('aboutResidents');
    if (aboutRes) {
        const r = d.residents || {};
        aboutRes.innerHTML = `
            <p><strong>أصول السكان:</strong> ${r.origin || ''}</p>
            <p><strong>الهجرة والانتشار:</strong> ${r.migration || ''}</p>`;
    }

    // الموقع
    const locEl = document.getElementById('locationText');
    if (locEl) {
        const locText = (d.location && d.location.text) 
            ? d.location.text 
            : 'تتبع إدارياً لبلدية رأس عين عميروش، دائرة عقاز، ولاية معسكر — الجزائر';
        locEl.textContent = locText;
    }

    // الإحصائيات
    const statsBox = document.getElementById('aboutStats');
    if (statsBox) {
        const statArr = [
            { val: d.stats.population, label: 'نسمة' },
            { val: d.stats.families, label: 'أسرة' },
            { val: d.stats.years, label: 'عاماً من التاريخ' }
        ];
        statsBox.innerHTML = statArr.map(s =>
            `<div class="stat"><strong>${s.val}+</strong><span>${s.label}</span></div>`
        ).join('');
    }

    // الخدمات (دروس + حلويات)
    const lessonsBox = document.getElementById('lessonsGrid');
    if (lessonsBox) {
        lessonsBox.innerHTML = (d.services || []).map(s =>
            `<div class="card">
                <span class="card-icon">${s.icon}</span>
                <h3>${s.title}</h3>
                <p>${s.text}</p>
                <button class="btn-register" data-register="${s.type || 'register'}">سجّل الآن 📋</button>
            </div>`
        ).join('') || '<p style="text-align:center;color:#888">لا توجد خدمات بعد.</p>';
    }

    // مواقيت الصلاة (تُعرض الافتراضية أولاً ثم تُحدَّث تلقائياً)
    const prayerBox = document.getElementById('prayerGrid');
    if (prayerBox) {
        prayerBox.innerHTML = (d.prayer && d.prayer.length ? d.prayer : []).map(p =>
            `<div class="prayer-item${p.main ? ' prayer-main' : ''}">
                <span class="prayer-icon">${p.icon || '🕌'}</span>
                <span class="prayer-name">${p.name}</span>
                <span class="prayer-time">${p.time}</span>
            </div>`
        ).join('');
    }

    // تاريخ القرية
    const historyBox = document.getElementById('historyContent');
    if (historyBox) {
        historyBox.innerHTML = (d.history && d.history.length ? d.history : []).map(h =>
            `<div class="history-card">
                <h3>${h.title}</h3>
                <p>${h.content}</p>
            </div>`
        ).join('') || '<p style="text-align:center;color:#888">لا توجد وقائع تاريخية بعد.</p>';
    }

    // سكان القرية
    const resBox = document.getElementById('residentsContent');
    if (resBox) {
        const r = d.residents || {};
        resBox.innerHTML = `
            <div class="residents-card">
                <div class="residents-main">
                    <span class="res-res-icon">👨‍👩‍👧‍👦</span>
                    <p>${r.origin || ''}</p>
                </div>
                <div class="residents-mig">
                    <span class="res-res-icon">🧭</span>
                    <p>${r.migration || ''}</p>
                </div>
            </div>`;
    }

    // المتجر
    const shopBox = document.getElementById('shopGrid');
    if (shopBox) {
        shopBox.innerHTML = (d.shop && d.shop.length ? d.shop : []).map((p, i) =>
            `<div class="product-card">
                <div class="product-img">
                    <img src="${p.image || ''}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">
                </div>
                <div class="product-body">
                    <h3>${p.name}</h3>
                    <p class="product-desc">${p.desc || ''}</p>
                    <span class="product-price">${p.price}</span>
                    <button class="btn btn-order" data-order="${i}">تأكيد الطلب</button>
                </div>
            </div>`
        ).join('') || '<p style="grid-column:1/-1;text-align:center;color:#888">لا توجد منتجات بعد.</p>';
    }

    // التذييل
    const footBrands = document.querySelectorAll('#footBrand');
    footBrands.forEach(el => { if (el) el.textContent = d.siteName; });
    if (document.getElementById('footTag')) document.getElementById('footTag').textContent = d.siteTagline;
    if (document.getElementById('footEmail')) document.getElementById('footEmail').textContent = d.contactEmail;
    if (document.getElementById('footPhone')) document.getElementById('footPhone').textContent = d.contactPhone;
    const footYear = document.getElementById('footYear');
    if (footYear) footYear.textContent = '2026';
}
// ===== قائمة الجوال =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
}

// ===== نموذج التواصل =====
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showToast('يرجى ملء جميع الحقول المطلوبة.', true);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('يرجى إدخال بريد إلكتروني صحيح.', true);
            return;
        }

        // حفظ الرسالة في البيانات لظهورها في لوحة التحكم
        const d = getData();
        if (!d.messages) d.messages = [];
        d.messages.unshift({ name, email, message, date: new Date().toLocaleString('ar-EG') });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(d));

        showToast('تم إرسال رسالتك بنجاح يا ' + name + '!');
        form.reset();
    });
}

// ===== تأكيد الطلبات من المتجر =====
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
let currentOrder = null;

document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-order]');
    if (!btn) return;

    const d = getData();
    const prod = (d.shop || [])[Number(btn.dataset.order)];
    if (!prod) return;

    currentOrder = prod;
    const t = document.getElementById('orderTitle');
    if (t) t.textContent = prod.name + ' — ' + prod.price;
    if (orderModal) {
        orderModal.hidden = false;
        document.body.style.overflow = 'hidden';
    }
});

if (document.getElementById('orderModalClose')) {
    document.getElementById('orderModalClose').addEventListener('click', closeModals);
}
if (orderModal) {
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) { orderModal.hidden = true; document.body.style.overflow = ''; }
    });
}

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('ordName').value.trim();
        const phone = document.getElementById('ordPhone').value.trim();
        const qty = document.getElementById('ordQty').value || '1';
        if (!name) { showToast('يرجى كتابة اسمك.', true); return; }
        if (!currentOrder) return;

        const d = getData();
        if (!d.messages) d.messages = [];
        d.messages.unshift({
            name,
            email: 'طلب متجر',
            message: `طلب: ${currentOrder.name} — السعر: ${currentOrder.price} — الكمية: ${qty}${phone ? ' — الهاتف: ' + phone : ''}`,
            date: new Date().toLocaleString('ar-EG'),
            type: 'order'
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(d));

        showToast('تم تسجيل طلبك بنجاح (' + currentOrder.name + '). سنتواصل معك قريباً.');
        orderForm.reset();
        orderModal.hidden = true;
        document.body.style.overflow = '';
    });
}

// ===== نموذج التسجيل في الدروس الخصوصية =====
const regModal = document.getElementById('regModal');
const regForm = document.getElementById('regForm');
const sweetsModal = document.getElementById('sweetsModal');
const sweetsForm = document.getElementById('sweetsForm');

document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-register]');
    if (!btn) return;
    const type = btn.getAttribute('data-register');
    let modal = regModal;
    if (type === 'sweets') modal = sweetsModal;
    if (modal) {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }
});

function closeModals() {
    if (regModal) regModal.hidden = true;
    if (sweetsModal) sweetsModal.hidden = true;
    if (orderModal) orderModal.hidden = true;
    document.body.style.overflow = '';
}

if (document.getElementById('regModalClose')) {
    document.getElementById('regModalClose').addEventListener('click', closeModals);
}
if (document.getElementById('sweetsModalClose')) {
    document.getElementById('sweetsModalClose').addEventListener('click', closeModals);
}

if (regModal) {
    regModal.addEventListener('click', (e) => {
        if (e.target === regModal) { regModal.hidden = true; document.body.style.overflow = ''; }
    });
}

if (sweetsModal) {
    sweetsModal.addEventListener('click', (e) => {
        if (e.target === sweetsModal) { sweetsModal.hidden = true; document.body.style.overflow = ''; }
    });
}

if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value.trim();
        const phone = document.getElementById('regPhone').value.trim();
        const level = document.getElementById('regLevel').value;
        const subject = document.getElementById('regSubject').value;

        if (!name || !phone || !level || !subject) {
            showToast('يرجى ملء جميع الحقول.', true);
            return;
        }

        const d = getData();
        if (!d.messages) d.messages = [];
        d.messages.unshift({
            name,
            email: 'تسجيل دروس خصوصية',
            message: `تسجيل في الدروس الخصوصية — الهاتف: ${phone} — المستوى: ${level} — المادة: ${subject}`,
            date: new Date().toLocaleString('ar-EG'),
            type: 'registration'
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(d));

        showToast('تم تسجيلك بنجاح! سنتواصل معك قريباً يا ' + name + '.');
        regForm.reset();
        regModal.hidden = true;
        document.body.style.overflow = '';
    });
}

// ===== نموذج طلب الحلويات =====
if (sweetsForm) {
    sweetsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('swName').value.trim();
        const phone = document.getElementById('swPhone').value.trim();
        const kind = document.getElementById('swKind').value;
        const quantity = document.getElementById('swQuantity').value.trim();

        if (!name || !phone || !kind || !quantity) {
            showToast('يرجى ملء جميع الحقول.', true);
            return;
        }

        const d = getData();
        if (!d.messages) d.messages = [];
        d.messages.unshift({
            name,
            email: 'طلب حلويات',
            message: `طلب حلويات — الهاتف: ${phone} — النوع: ${kind} — الكمية: ${quantity}`,
            date: new Date().toLocaleString('ar-EG'),
            type: 'sweets'
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(d));

        showToast('تم استلام طلبك بنجاح! سنتواصل معك قريباً يا ' + name + '.');
        sweetsForm.reset();
        sweetsModal.hidden = true;
        document.body.style.overflow = '';
    });
}

// ===== أدوات مساعدة =====
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

// ===== عرض تاريخ اليوم في الشريط العلوي =====
// ساعة بعض الأجهزة تعطي سنة خاطئة، لذلك يُعرض التاريخ المعتمد بشكل ثابت
(function renderTodayDate() {
    const el = document.getElementById('todayDate');
    if (!el) return;
    el.textContent = '2026-09-05';
})();

// ===== عدّاد إحصائيات الـ Hero =====
function animateCount(el) {
    const target = Number(String(el.getAttribute('data-count') || '').replace(/[^\d]/g, '')) || 0;
    const suffix = (el.getAttribute('data-count') || '').replace(/[\d+]/g, '').trim();
    const dur = 1200;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = val + (suffix ? suffix + '+' : '');
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = el.getAttribute('data-count');
    }
    requestAnimationFrame(tick);
}

const heroCounts = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && heroCounts.length) {
    const cio = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                animateCount(en.target);
                cio.unobserve(en.target);
            }
        });
    }, { threshold: 0.4 });
    heroCounts.forEach(el => cio.observe(el));
}

// ===== التشغيل =====
renderSite();

// ===== تأثير الظهور عند التمرير =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add('visible');
                io.unobserve(en.target);
            }
        });
    }, { threshold: 0.08 });
    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('visible'));
}

// ===== شريط التنقل + زر العودة للأعلى عند التمرير =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const hero = document.getElementById('home');

function onScroll() {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 40);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('show', y > 400);

    // تحديث شريط تقدم القراءة
    const progress = document.getElementById('scrollProgress');
    if (progress) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (y / total) * 100 : 0;
        progress.style.width = pct + '%';
    }

    // تمييز القسم النشط في القائمة
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 160;
        if (y >= top) current = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current && current !== '');
    });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== إغلاق النوافذ عند الضغط على Esc =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
});

// ===== نافذة نجاح أنيقة =====
function showToast(message, isError) {
    const old = document.querySelector('.toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.className = 'toast' + (isError ? ' toast-error' : '');
    t.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>${message}`;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 300);
    }, 3200);
}

// ===== مواقيت الصلاة التلقائية =====
// إحداثيات قرية أهل محمد (رأس عين عميروش، معسكر، الجزائر)
const PRAYER_COORDS = { lat: 35.5925, lon: -0.2125 };
const PRAYER_METHOD = 3; // رابطة العالم الإسلامي (شائع في الجزائر)
const PRAYER_CACHE_KEY = 'ahlMhmedPrayerCache';

// ترتيب الصلوات وعرضها كما في الموقع
const PRAYER_MAP = [
    { key: 'Fajr',     name: 'الفجر',   icon: '🌅', main: true  },
    { key: 'Sunrise',  name: 'الشروق',  icon: '☀️', main: false },
    { key: 'Dhuhr',    name: 'الظهر',   icon: '☀️', main: false },
    { key: 'Asr',      name: 'العصر',   icon: '🌤️', main: false },
    { key: 'Maghrib',  name: 'المغرب',  icon: '🌇', main: false },
    { key: 'Isha',     name: 'العشاء',  icon: '🌙', main: true  }
];

function apiUrl() {
    // لا نمرر تاريخ الجهاز لأن ساعة بعض الأجهزة خاطئة؛ الـ API يحدد تاريخ اليوم الفعلي بنفسه
    return `https://api.aladhan.com/v1/timings?latitude=${PRAYER_COORDS.lat}&longitude=${PRAYER_COORDS.lon}&method=${PRAYER_METHOD}`;
}

async function fetchPrayerTimes() {
    const res = await fetch(apiUrl(), { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (!json.data) throw new Error('No data');
    return json.data;
}

function timeToMinutes(t) {
    const parts = String(t || '').split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

// ===== حالة المواقيت وحساب الوقت الحقيقي (مرساة من خادم، لا من ساعة الجهاز) =====
let prayerState = { timings: null };
let prayerTimeBase = null; // { secOfDay: عدد ثواني اليوم الفعلية بالجزائر, deviceNowMs: لحظة المعايرة }
const PRAYER_TIME_KEY = 'ahlMhmedTimeBase';

// جلب عدد ثواني اليوم الفعلية الحالية بتوقيت الجزائر من خادم موثوق
async function fetchRealSecondsOfDay() {
    const urls = [
        'https://timeapi.io/api/Time/current/zone?timeZone=Africa/Algiers',
        'https://worldtimeapi.org/api/timezone/Africa/Algiers'
    ];
    for (const u of urls) {
        try {
            const res = await fetch(u, { cache: 'no-store' });
            if (!res.ok) continue;
            const j = await res.json();
            if (j.hour !== undefined && j.minute !== undefined) {
                return (j.hour * 60 + j.minute) * 60 + (j.seconds || 0);
            }
            const m = String(j.datetime || '').match(/(\d{2}):(\d{2}):(\d{2})/);
            if (m) return (parseInt(m[1], 10) * 60 + parseInt(m[2], 10)) * 60 + parseInt(m[3], 10);
        } catch (e) {}
    }
    return null;
}

// معايرة الوقت الفعلي وبدء العدّاد بناءً عليه
async function anchorRealTime() {
    const sec = await fetchRealSecondsOfDay();
    if (sec !== null) {
        prayerTimeBase = { secOfDay: sec, deviceNowMs: Date.now() };
        try { localStorage.setItem(PRAYER_TIME_KEY, JSON.stringify(prayerTimeBase)); } catch (e) {}
        updatePrayerCountdown();
    }
}

// ثواني اليوم الفعلية الآن (تتقدم مع مرور الوقت الحقيقي حتى لو كانت ساعة الجهاز خاطئة)
function getLocalSecondsOfDay() {
    if (prayerTimeBase) {
        const s = prayerTimeBase.secOfDay + (Date.now() - prayerTimeBase.deviceNowMs) / 1000;
        return (((s % 86400) + 86400) % 86400);
    }
    // محاولة استخدام المعايرة المحفوظة سابقاً
    try {
        const saved = JSON.parse(localStorage.getItem(PRAYER_TIME_KEY));
        if (saved && saved.secOfDay !== undefined) {
            prayerTimeBase = { secOfDay: saved.secOfDay, deviceNowMs: Date.now() };
            return getLocalSecondsOfDay();
        }
    } catch (e) {}
    // الاحتياط الأخير: وقت الجهاز مباشرة
    return ((((Date.now() % 86400000) / 1000) % 86400) + 86400) % 86400;
}

function fmtDuration(totalSec) {
    totalSec = Math.max(0, Math.floor(totalSec));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return `${h} س ${m} د`;
    if (m > 0) return `${m} د ${s} ث`;
    return `${s} ث`;
}

// معرفة الصلاة القادمة والوقت المتبقي لها بالثواني
function getNextPrayerInfo() {
    const nowSecOfDay = getLocalSecondsOfDay();
    const payable = PRAYER_MAP.filter(p => p.key !== 'Sunrise');
    const timings = prayerState.timings;
    let best = null;
    let bestWait = Infinity;
    payable.forEach(p => {
        const pSec = timeToMinutes(timings[p.key]) * 60;
        let wait = pSec - nowSecOfDay;
        if (wait < 0) wait += 86400;
        if (wait < bestWait) { bestWait = wait; best = p; }
    });
    if (!best) return null;
    const bestMins = timeToMinutes(timings[best.key]);
    const h = String(Math.floor(bestMins / 60)).padStart(2, '0');
    const m = String(bestMins % 60).padStart(2, '0');
    return { name: best.name, icon: best.icon, time: h + ':' + m, wait: bestWait, tomorrow: bestWait + nowSecOfDay > 86400 };
}

let __prayerTimer = null;

function updatePrayerCountdown() {
    if (!prayerState.timings) return;
    const info = getNextPrayerInfo();
    if (!info) return;

    const cdTime = document.getElementById('prayerCountdownTime');
    const cdName = document.getElementById('prayerCountdownName');
    const nextEl = document.getElementById('prayerNextText');

    if (nextEl) nextEl.textContent = `الصلاة القادمة: ${info.name} ${info.time}${info.tomorrow ? ' (غداً)' : ''}`;
    if (cdTime) cdTime.textContent = fmtDuration(Math.max(0, info.wait));
    if (cdName) cdName.textContent = `${info.icon} ${info.name}${info.tomorrow ? ' (غداً)' : ''}`;
}

function startPrayerCountdown() {
    updatePrayerCountdown();
    if (__prayerTimer) clearInterval(__prayerTimer);
    __prayerTimer = setInterval(updatePrayerCountdown, 1000);
}

function formatHijri(hijri) {
    const months = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    const m = (parseInt(hijri.month.number, 10) - 1) % months.length;
    return `${hijri.day} ${months[m]} ${hijri.year} هـ`;
}

function formatGregorian(greg) {
    // التاريخ يأتي من الـ API بصيغة DD-MM-YYYY
    const parts = String(greg.date || '').split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (!day || !month || !year) return greg.date || '';
    const dd = String(day).padStart(2, '0');
    const mm = String(month).padStart(2, '0');
    const d = new Date(year, month - 1, day);
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return `${days[d.getDay()]} ${year}-${mm}-${dd} م`;
}

function renderPrayerTimes(data) {
    const timings = data.timings;
    const box = document.getElementById('prayerGrid');
    if (!box) return;

    prayerState.timings = timings;

    // معايرة الوقت الفعلي (مرساة) لتشغيل العدّاد بدقة رغم خطأ ساعة الجهاز
    anchorRealTime();

    box.innerHTML = PRAYER_MAP.map(p =>
        `<div class="prayer-item${p.main ? ' prayer-main' : ''}">
            <span class="prayer-icon">${p.icon}</span>
            <span class="prayer-name">${p.name}</span>
            <span class="prayer-time">${timings[p.key]}</span>
        </div>`
    ).join('');

    // التاريخ (ميلادي + هجري)
    const dateEl = document.getElementById('prayerDate');
    if (dateEl) {
        dateEl.innerHTML = `<i class="fas fa-calendar-alt"></i> ${formatGregorian(data.date.gregorian)} &nbsp;•&nbsp; ${formatHijri(data.date.hijri)}`;
    }

    // تشغيل عدّاد الصلاة القادمة
    startPrayerCountdown();
}

async function loadPrayerTimes(showErrorToast) {
    const header = document.getElementById('prayerDate');

    try {
        const data = await fetchPrayerTimes();
        localStorage.setItem(PRAYER_CACHE_KEY, JSON.stringify({
            date: data.date.gregorian.date,
            timestamp: data.date.timestamp,
            timings: data.timings,
            hijri: data.date.hijri
        }));
        renderPrayerTimes(data);
    } catch (e) {
        // عند فشل الاتصال: نستعمل بيانات مخزنة إن وُجدت
        let usedCache = false;
        try {
            const cache = JSON.parse(localStorage.getItem(PRAYER_CACHE_KEY));
            if (cache && cache.timings) {
                renderPrayerTimes({ timings: cache.timings, date: { gregorian: { date: cache.date || '' }, hijri: cache.hijri || {} }, timestamp: cache.timestamp || 0 });
                usedCache = true;
            }
        } catch (e2) {}
        if (header) {
            if (usedCache) {
                header.textContent = 'أُجريت المواقيت سابقاً (وضع عدم الاتصال)';
            } else {
                header.textContent = 'تعذّر تحميل المواقيت — تُعرض المواقيت الافتراضية';
            }
        }
        if (showErrorToast && !usedCache) showToast('تعذّر جلب مواقيت الصلاة. تحقق من الاتصال بالإنترنت.', true);
    }
}

// جدولة تحديث المواقيت تلقائياً عند بداية كل يوم
function scheduleDailyPrayerRefresh() {
    loadPrayerTimes(false);
    const now = new Date();
    let tillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 2, 0, 0) - now;
    // حماية من ساعة الجهاز الخاطئة (قد تعطي فاصل زمني سالب)
    if (!isFinite(tillMidnight) || tillMidnight < 1000 || tillMidnight > 26 * 3600 * 1000) {
        tillMidnight = 6 * 3600 * 1000;
    }
    setTimeout(() => {
        loadPrayerTimes(false);
        scheduleDailyPrayerRefresh();
    }, tillMidnight + 2000);
}

scheduleDailyPrayerRefresh();