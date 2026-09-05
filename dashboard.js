// ===== إدارة البيانات المحفوظة =====
const STORAGE_KEY = 'ahlMhmedData';

// ===== حماية الدخول =====
const USERS_KEY = 'ahlMhmedUsers';
const SESSION_KEY = 'ahlMhmedSession';

function currentUser() {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    try {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        return users.find(u => u.email === email) || null;
    } catch (e) {
        return null;
    }
}

(function requireAuth() {
    const user = currentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    const el = document.getElementById('dashUserName');
    if (el) el.textContent = '👤 ' + user.name;
})();

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = 'login.html';
    });
}

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
        { name: 'غلاف حماية للهاتف', price: '1200 دج', image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=600', desc: 'غلاف سيليكون متين يحمي هاتفك من الصدمات والخدوش.' },
        { name: 'سماعات بلوتوث', price: '4500 دج', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', desc: 'سماعات لاسلكية عالية الجودة بصوت نقي وبطارية تدوم طويلاً.' },
        { name: 'شاحن سريع', price: '2200 دج', image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600', desc: 'شاحن سريع 33 واط متوافق مع معظم الهواتف الحديثة.' }
    ],
    deceased: [],
    messages: [],
    contentVersion: '26'
};

function loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(defaultData));
    try {
        return JSON.parse(raw);
    } catch (e) {
        return JSON.parse(JSON.stringify(defaultData));
    }
}

let data = loadData();

// دمج أي حقول جديدة (مثل deceased) مع البيانات القديمة المحفوظة
const defaults = JSON.parse(JSON.stringify(defaultData));
if (data.contentVersion !== defaultData.contentVersion) {
    data = JSON.parse(JSON.stringify(defaultData));
}
data = Object.assign({}, defaults, data);
if (!Array.isArray(data.deceased)) data.deceased = defaults.deceased;
if (!Array.isArray(data.services)) data.services = defaults.services;
if (!Array.isArray(data.history)) data.history = defaults.history;
if (!Array.isArray(data.shop)) data.shop = defaults.shop;
if (!Array.isArray(data.prayer)) data.prayer = defaults.prayer;
if (!data.residents) data.residents = defaults.residents;
if (!data.messages) data.messages = [];
if (!data.stats) data.stats = defaults.stats;

// ===== ملء النماذج من البيانات =====
function populateForms() {
    document.getElementById('siteName').value = data.siteName;
    document.getElementById('siteTagline').value = data.siteTagline;
    document.getElementById('contactPhone').value = data.contactPhone;
    document.getElementById('contactEmail').value = data.contactEmail;
    const locField = document.getElementById('locationText');
    if (locField) locField.value = (data.location && data.location.text) || '';

    document.getElementById('heroTitle').value = data.heroTitle;
    document.getElementById('heroSub').value = data.heroSub;
    document.getElementById('heroBg').value = data.heroBg;

    document.getElementById('aboutP1').value = data.aboutP1;
    document.getElementById('aboutP2').value = data.aboutP2;
    document.getElementById('aboutP3').value = data.aboutP3;
    document.getElementById('aboutP4').value = data.aboutP4;
    document.getElementById('statPop').value = data.stats.population;
    document.getElementById('statFam').value = data.stats.families;
    document.getElementById('statYears').value = data.stats.years;

    // سكان القرية
    const resOrigin = document.getElementById('resOrigin');
    const resMigration = document.getElementById('resMigration');
    if (resOrigin) resOrigin.value = (data.residents && data.residents.origin) || '';
    if (resMigration) resMigration.value = (data.residents && data.residents.migration) || '';

    populateServices();
    populateHistory();
    populatePrayer();
    populateShop();
    populateMessages();
    updateOverview();
}

// ===== الدروس الخصوصية =====
function populateServices() {
    const container = document.getElementById('servicesEditor');
    if (!container) return;
    container.innerHTML = '';
    data.services.forEach((s, i) => {
        const item = document.createElement('div');
        item.className = 'service-item';
        item.innerHTML = `
            <input type="text" class="dash-input icon-input" data-service-icon data-index="${i}" value="${escapeHtml(s.icon)}">
            <select class="dash-input cat-select" data-service-cat data-index="${i}">
                <option value="register" ${s.type === 'register' ? 'selected' : ''}>درس خصوصي</option>
                <option value="sweets" ${s.type === 'sweets' ? 'selected' : ''}>حلويات</option>
            </select>
            <input type="text" class="dash-input title-input" data-service-title data-index="${i}" value="${escapeHtml(s.title)}">
            <input type="text" class="dash-input text-input" data-service-text data-index="${i}" value="${escapeHtml(s.text)}">
            <button class="btn-del" data-service-del="${i}">حذف</button>
        `;
        container.appendChild(item);
    });
}

// ===== تاريخ القرية =====
function populateHistory() {
    const container = document.getElementById('historyEditor');
    if (!container) return;
    container.innerHTML = '';
    data.history.forEach((h, i) => {
        const item = document.createElement('div');
        item.className = 'service-item history-item';
        item.innerHTML = `
            <span style="min-width:40px;text-align:center;font-size:1.3rem">📜</span>
            <input type="text" class="dash-input title-input" data-history-title data-index="${i}" value="${escapeHtml(h.title)}" placeholder="العنوان">
            <input type="text" class="dash-input text-input" data-history-content data-index="${i}" value="${escapeHtml(h.content)}" placeholder="الوصف">
            <button class="btn-del" data-history-del="${i}">حذف</button>
        `;
        container.appendChild(item);
    });
}

// ===== مواقيت الصلاة =====
function populatePrayer() {
    const container = document.getElementById('prayerEditor');
    if (!container) return;
    container.innerHTML = '';
    data.prayer.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = 'service-item prayer-item-dash';
        item.innerHTML = `
            <input type="text" class="dash-input icon-input" data-prayer-icon data-index="${i}" value="${escapeHtml(p.icon)}">
            <input type="text" class="dash-input title-input" data-prayer-name data-index="${i}" value="${escapeHtml(p.name)}" placeholder="اسم الصلاة">
            <input type="text" class="dash-input" data-prayer-time data-index="${i}" value="${escapeHtml(p.time)}" placeholder="05:30">
            <label class="prayer-main-toggle">
                <input type="checkbox" data-prayer-main data-index="${i}" ${p.main ? 'checked' : ''}>
                <span>بارز</span>
            </label>
            <button class="btn-del" data-prayer-del="${i}">حذف</button>
        `;
        container.appendChild(item);
    });
}

// ===== المتجر =====
function populateShop() {
    const container = document.getElementById('shopEditor');
    if (!container) return;
    container.innerHTML = '';
    data.shop.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = 'service-item shop-item';
        item.innerHTML = `
            <div class="shop-head">
                <span style="font-size:1.3rem">🛍️</span>
                <input type="text" class="dash-input title-input" data-shop-name data-index="${i}" value="${escapeHtml(p.name)}" placeholder="الاسم">
                <input type="text" class="dash-input" data-shop-price data-index="${i}" value="${escapeHtml(p.price)}" placeholder="السعر">
                <button class="btn-del" data-shop-del="${i}">حذف</button>
            </div>
            <div class="shop-img-row">
                <div class="shop-thumb">
                    ${p.image ? `<img src="${escapeHtml(p.image)}" alt="معاينة" onerror="this.style.display='none'">` : '<span class="shop-thumb-empty">لا صورة</span>'}
                </div>
                <div class="shop-img-fields">
                    <label class="btn-upload">
                        📁 رفع صورة من الجهاز
                        <input type="file" accept="image/*" data-shop-upload="${i}" hidden>
                    </label>
                    <div class="shop-url-row">
                        <input type="text" class="dash-input" data-shop-image data-index="${i}" value="${escapeHtml(p.image)}" placeholder="أو ألصق رابط الصورة URL">
                    </div>
                </div>
            </div>
            <textarea class="dash-input text-input" data-shop-desc data-index="${i}" placeholder="الوصف">${escapeHtml(p.desc || '')}</textarea>
        `;
        container.appendChild(item);
    });
    container.querySelectorAll('[data-shop-upload]').forEach(inp => {
        inp.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            const idx = Number(inp.getAttribute('data-shop-upload'));
            if (file.size > 1024 * 1024 * 4) {
                showDashToast('الصورة كبيرة جداً — اختر صورة أقل من 4MB.', true);
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                compressImage(reader.result, (compressed) => {
                    data.shop[idx].image = compressed;
                    save();
                    const imgInput = container.querySelector(`[data-shop-image][data-index="${idx}"]`);
                    if (imgInput) imgInput.value = compressed;
                    populateShop();
                    showDashToast('تم رفع الصورة بنجاح ✓');
                });
            };
            reader.readAsDataURL(file);
        });
    });
}

function compressImage(dataUrl, callback) {
    const img = new Image();
    img.onload = () => {
        const MAX = 700;
        let w = img.width;
        let h = img.height;
        if (w > MAX) {
            h = Math.round(h * MAX / w);
            w = MAX;
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        callback(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = () => callback(dataUrl);
    img.src = dataUrl;
}

// ===== الرسائل =====
function populateMessages() {    const list = document.getElementById('messagesList');
    if (!data.messages || data.messages.length === 0) {
        list.innerHTML = '<p class="empty-msg">لا توجد رسائل بعد. الرسائل المرسلة من الموقع ستظهر هنا.</p>';
        return;
    }
    list.innerHTML = '';
    data.messages.forEach(m => {
        const card = document.createElement('div');
        card.className = 'message-card';
        const badge = msgBadge(m.type);
        card.innerHTML = `
            ${badge}
            <strong>${escapeHtml(m.name)}</strong>
            <span class="msg-mail">${escapeHtml(m.email)}${m.date ? ' • ' + escapeHtml(m.date) : ''}</span>
            <p>${escapeHtml(m.message)}</p>
        `;
        list.appendChild(card);
    });
}

function msgBadge(type) {
    const map = {
        registration: '📚 تسجيل دروس',
        sweets: '🍬 طلب حلويات',
        order: '🛍️ طلب متجر'
    };
    if (!map[type]) return '';
    return `<span class="msg-badge msg-badge-${escapeHtml(type)}">${map[type]}</span>`;
}

function updateOverview() {
    document.getElementById('ovPopulation').textContent = data.stats.population;
    document.getElementById('ovFamilies').textContent = data.stats.families;
    document.getElementById('ovServices').textContent = data.services.length;
}
// ===== قراءة من النماذج =====
function readFromForms() {
    data.siteName = document.getElementById('siteName').value;
    data.siteTagline = document.getElementById('siteTagline').value;
    data.contactPhone = document.getElementById('contactPhone').value;
    data.contactEmail = document.getElementById('contactEmail').value;
    const locField = document.getElementById('locationText');
    if (locField) {
        if (!data.location) data.location = {};
        data.location.text = locField.value;
    }

    data.heroTitle = document.getElementById('heroTitle').value;
    data.heroSub = document.getElementById('heroSub').value;
    data.heroBg = document.getElementById('heroBg').value;

    data.aboutP1 = document.getElementById('aboutP1').value;
    data.aboutP2 = document.getElementById('aboutP2').value;
    data.aboutP3 = document.getElementById('aboutP3').value;
    data.aboutP4 = document.getElementById('aboutP4').value;
    data.stats.population = document.getElementById('statPop').value;
    data.stats.families = document.getElementById('statFam').value;
    data.stats.years = document.getElementById('statYears').value;

    // الخدمات (دروس + حلويات)
    data.services = Array.from(document.querySelectorAll('[data-service-title]')).map(inp => {
        const i = Number(inp.dataset.index);
        const catSel = document.querySelector(`[data-service-cat][data-index="${i}"]`);
        return {
            icon: document.querySelector(`[data-service-icon][data-index="${i}"]`).value,
            title: inp.value,
            text: document.querySelector(`[data-service-text][data-index="${i}"]`).value,
            type: catSel ? catSel.value : 'register'
        };
    });

    // سكان القرية
    const resOrigin = document.getElementById('resOrigin');
    const resMigration = document.getElementById('resMigration');
    if (resOrigin && resMigration) {
        if (!data.residents) data.residents = {};
        data.residents.origin = resOrigin.value;
        data.residents.migration = resMigration.value;
    }

    // تاريخ القرية
    const historyEditor = document.getElementById('historyEditor');
    if (historyEditor) {
        data.history = Array.from(historyEditor.querySelectorAll('[data-history-title]')).map(inp => {
            const i = Number(inp.dataset.index);
            return {
                title: inp.value,
                content: document.querySelector(`[data-history-content][data-index="${i}"]`).value
            };
        });
    }

    // المتجر
    const shopEditor = document.getElementById('shopEditor');
    if (shopEditor) {
        data.shop = Array.from(shopEditor.querySelectorAll('[data-shop-name]')).map(inp => {
            const i = Number(inp.dataset.index);
            return {
                name: inp.value,
                price: document.querySelector(`[data-shop-price][data-index="${i}"]`).value,
                image: document.querySelector(`[data-shop-image][data-index="${i}"]`).value,
                desc: document.querySelector(`[data-shop-desc][data-index="${i}"]`).value
            };
        });
    }

    // مواقيت الصلاة
    const prayerEditor = document.getElementById('prayerEditor');
    if (prayerEditor) {
        data.prayer = Array.from(prayerEditor.querySelectorAll('[data-prayer-name]')).map(inp => {
            const i = Number(inp.dataset.index);
            const mainEl = prayerEditor.querySelector(`[data-prayer-main][data-index="${i}"]`);
            return {
                name: inp.value,
                time: prayerEditor.querySelector(`[data-prayer-time][data-index="${i}"]`).value,
                icon: prayerEditor.querySelector(`[data-prayer-icon][data-index="${i}"]`).value,
                main: mainEl ? mainEl.checked : false
            };
        });
    }
}

// ===== حفظ =====
function save() {
    readFromForms();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const msg = document.getElementById('saveMsg');
    msg.textContent = '✔ تم حفظ التغييرات بنجاح.';
    msg.className = 'save-msg success';
    updateOverview();
    setTimeout(() => { msg.textContent = ''; }, 3000);
}

// ===== استعادة الافتراضي =====
function reset() {
    if (!confirm('هل أنت متأكد؟ سيتم استعادة جميع البيانات الافتراضية وفقدان تغييراتك.')) return;
    localStorage.removeItem(STORAGE_KEY);
    data = JSON.parse(JSON.stringify(defaultData));
    populateForms();
    const msg = document.getElementById('saveMsg');
    msg.textContent = '✔ تم استعادة البيانات الافتراضية.';
    msg.className = 'save-msg success';
    setTimeout(() => { msg.textContent = ''; }, 3000);
}

// ===== التنقل بين الأقسام =====
document.querySelectorAll('.dash-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.dash-nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;
        document.querySelectorAll('.dash-view').forEach(v => v.classList.remove('active'));
        document.querySelector(`[data-view-panel="${view}"]`).classList.add('active');
    });
});

// ===== السمة الداكنة =====
const THEME_KEY = 'ahlMhmedTheme';

function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = dark ? '☀️ السمة الفاتحة' : '🌙 السمة الداكنة';
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        applyTheme(!document.body.classList.contains('dark'));
    });
}

(function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const dark = saved === 'dark' || (saved === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyTheme(dark);
})();

// ===== أحداث الحفظ =====
document.getElementById('saveBtn').addEventListener('click', save);
document.getElementById('resetBtn').addEventListener('click', reset);

// ===== إضافة عنصر جديد =====
document.getElementById('addService').addEventListener('click', () => {
    data.services.push({ icon: '🌟', title: 'خدمة جديدة', text: 'وصف الخدمة هنا.', type: 'register' });
    populateServices();
});

// ===== إضافة واقعة تاريخية =====
const addHistory = document.getElementById('addHistory');
if (addHistory) {
    addHistory.addEventListener('click', () => {
        data.history.push({ title: 'عنوان الواقعة', content: 'وصف الواقعة هنا.' });
        populateHistory();
    });
}

// ===== إضافة وقت صلاة =====
const addPrayer = document.getElementById('addPrayer');
if (addPrayer) {
    addPrayer.addEventListener('click', () => {
        data.prayer.push({ name: 'صلاة', time: '00:00', icon: '🕌', main: false });
        populatePrayer();
    });
}

// ===== إضافة منتج =====
const addProduct = document.getElementById('addProduct');
if (addProduct) {
    addProduct.addEventListener('click', () => {
        data.shop.push({ name: 'منتج جديد', price: '0 دج', image: '', desc: 'وصف المنتج' });
        populateShop();
    });
}

// ===== حذف خدمة / منتج (تفويض الأحداث) =====
document.getElementById('servicesEditor').addEventListener('click', (e) => {
    if (e.target.dataset.serviceDel !== undefined) {
        data.services.splice(Number(e.target.dataset.serviceDel), 1);
        populateServices();
    }
});

document.getElementById('historyEditor').addEventListener('click', (e) => {
    if (e.target.dataset.historyDel !== undefined) {
        data.history.splice(Number(e.target.dataset.historyDel), 1);
        populateHistory();
    }
});

document.getElementById('prayerEditor') && document.getElementById('prayerEditor').addEventListener('click', (e) => {
    if (e.target.dataset.prayerDel !== undefined) {
        data.prayer.splice(Number(e.target.dataset.prayerDel), 1);
        populatePrayer();
    }
});

document.getElementById('shopEditor').addEventListener('click', (e) => {
    if (e.target.dataset.shopDel !== undefined) {
        data.shop.splice(Number(e.target.dataset.shopDel), 1);
        populateShop();
    }
});

// ===== مسح الرسائل =====
document.getElementById('clearMessages').addEventListener('click', () => {
    if (!confirm('سيتم مسح جميع الرسائل. هل أنت متأكد؟')) return;
    data.messages = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    populateMessages();
});

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

function showDashToast(message, isError) {
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

// ===== بدء التشغيل =====
populateForms();
