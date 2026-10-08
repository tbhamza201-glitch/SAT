// ===== إدارة البيانات المحفوظة =====
const STORAGE_KEY = 'ahlMhmedData';

// ===== حماية الدخول =====
const USERS_KEY = 'ahlMhmedUsers';
const SESSION_KEY = 'ahlMhmedSession';
const CODE_SESSION_KEY = 'ahlMhmedCodeSession';

function currentUser() {
    // الدخول بالكود السري فقط
    if (localStorage.getItem(CODE_SESSION_KEY)) {
        return { name: 'المسؤول', username: 'code', email: '', role: 'admin' };
    }
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    try {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        return users.find(u => u.username === id || u.email === id) || null;
    } catch (e) {
        return null;
    }
}

(function requireAuth() {
    const user = currentUser();
    if (!user || user.role !== 'admin') {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(CODE_SESSION_KEY);
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
        localStorage.removeItem(CODE_SESSION_KEY);
        window.location.href = 'login.html';
    });
}

const defaultData = {
    siteName: 'أهل محمد',
    siteTagline: 'قرية أهل محمد — رأس عين عميروش، معسكر، الجزائر',
    contactPhone: '',
    contactEmail: 'info@ahlmhmed.example',
    aboutP1: 'أهل محمد قرية جزائرية تتبع إدارياً لبلدية رأس عين عميروش، دائرة عقاز، ولاية معسكر. أراضي القرية بين منبسطة وشبه جبلية، بالإضافة إلى الطريق البلدي المتجه نحو قرية عقاز وأهل العيد.',
    aboutP2: 'تضم القرية مدرسة لتعليم القرآن الكريم، ومصلحة صحية، ومدرسة ابتدائية، وملحقة بلدية، وملعب جواري، وبيت للشباب مع مقهى. قرية تجمع بين الأصالة والعراقة، يحفظ أهلها تراثهم الجميل ويجتهدون في بناء مستقبل مشرق.',
    aboutP3: 'تنتشر به حرفتا الرعي وتربية الحيوانات من أغنام وأبقار وغيرها، كما توجد به وحدات تربية دجاج اللحوم ودجاج إنتاج البيض. تنتشر حول هذا الدوار أشجار الزيتون، كما توجد أشجار الرمان والتين، ويزرع فيه الفول والقرنون والفلفل الحار خاصة في المنطقة الشرقية منه، وفي المنطقة الغربية منه أراضٍ وسهوب لزراعة القمح والشعير.',
    aboutP4: 'ويوجد بالقرية عدة مؤسسات صغيرة مثل تصبير الزيتون ومطاحن الحبوب وغير ذلك.',
    aboutSections: [],
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
        { title: 'مدرسة القرآن الكريم', content: 'مدرسة لتعليم القرآن الكريم تساهم في الحفاظ على الهوية الدينية والتعليمية للقرية.' }
    ],
    residents: {
        origin: 'سكان القرية من نوع السكان العرب البيض، أغلب أصلهم ينحدر إلى قبيلة الغرابة التي سكنت المنطقة في الفترة العثمانية وخلال الاستعمار الفرنسي. من العائلات التي تسكن هذا الدوار: عائلة هاشمي، تعالبي، بوعلام، مراح، سالم، نهار، بومعزة، وغيرها.',
        migration: 'هاجر بعض من سكان القرية إلى مدينة سيق، وأرزيو، ومدينة ونواحي وهران، بفعل عدة عوامل منها اقتصادية وأمنية وغير ذلك. وغالبية سكان القرية من الشباب.'
    },
    shop: [
        { name: 'غلاف حماية للهاتف', price: '1200 دج', image: 'images/phone.jpg', desc: 'غلاف سيليكون متين يحمي هاتفك من الصدمات والخدوش.' },
        { name: 'سماعات بلوتوث', price: '4500 دج', image: 'images/headphones.jpg', desc: 'سماعات لاسلكية عالية الجودة بصوت نقي وبطارية تدوم طويلاً.' },
        { name: 'شاحن سريع', price: '2200 دج', image: 'images/charger.jpg', desc: 'شاحن سريع 33 واط متوافق مع معظم الهواتف الحديثة.' },
        { name: 'عسل حر طبيعي', price: '3500 دج/كلغ', image: 'images/honey.jpg', desc: 'عسل حر طبيعي نقي مستخرج من أزهار البرية، غني بالفوائد ومذاق أصيل.' },
        { name: 'زيت زيتون بكر ممتاز', price: '1500 دج/لتر', image: 'images/oliveoil.jpg', desc: 'زيت زيتون بكر ممتاز معصور من زيتون البلاد بجودة عالية.' },
        { name: 'تمر بلدي', price: '900 دج/كلغ', image: 'images/dates.jpg', desc: 'تمر بلدي طبيعي فاخر، مصدر طاقة وغني بالألياف والحديد.' },
        { name: 'بيض بلدي', price: '450 دج/علبة', image: 'images/eggs.jpg', desc: 'بيض بلدي طازج من مزارع القرية، غني بالفوائد ومذاق أفضل.' },
        { name: 'لوز بلدي', price: '2500 دج/كلغ', image: 'images/almonds.jpg', desc: 'لوز بلدي مقرمش غني بالبروتينات والدهون الصحية.' }
    ],
    deceased: [],
    messages: [],
    newsSections: [
        { name: 'تعليم', icon: '📖', color: 'primary' },
        { name: 'إعلان', icon: '📢', color: 'gold' },
        { name: 'مناسبة', icon: '🎉', color: 'gold' },
        { name: 'صحة', icon: '🏥', color: 'teal' },
        { name: 'رياضة', icon: '⚽', color: 'primary' },
        { name: 'أشغال', icon: '🚧', color: 'gold' }
    ],
    news: [
        {
            icon: '📖',
            title: 'فتح تسجيلات مدرسة حفظ القرآن الكريم',
            date: '06 سبتمبر 2026',
            tag: 'تعليم',
            text: 'تم فتح باب التسجيلات في مدرسة القرآن الكريم لقرية أهل محمد للموسم الجديد. تُعقد الحصص مساءً بعد صلاة العصر طوال أيام الأسبوع، والتسجيل مجاني لجميع أبناء القرية.',
            tagColor: 'primary'
        },
        {
            icon: '🌿',
            title: 'موسم جني الزيتون يفتح أبوابه',
            date: 'وضع خبر 2026',
            tag: 'إعلان',
            text: 'انطلق موسم جني الزيتون في ضياع القرية. تتوفر معاصر محلية لاستخراج زيت الزيتون البكر الممتاز، مع إمكانية الحجز المسبق عبر صفحة المتجر.',
            tagColor: 'teal'
        },
        {
            icon: '🍯',
            title: 'مهرجان العسل والمنتجات المحلية',
            date: 'وضع خبر 2026',
            tag: 'مناسبة',
            text: 'تنظم القرية مهرجان العسل والمنتجات المحلية بمشاركة النحّالين والفلاحين، لعرض أصناف العسل الحر وزيت الزيتون والتمر البلدي أمام أهالي الجوار.',
            tagColor: 'gold'
        },
        {
            icon: '🏥',
            title: 'حملة التلقيح والفحص الصحي',
            date: 'وضع خبر 2026',
            tag: 'صحة',
            text: 'تنظم المصلحة الصحية بالقرية حملة تلقيح وفحوصات مجانية لسكان القرية بالتنسيق مع البلدية، مع مواعيد مخصصة للعائلات وكبار السن.',
            tagColor: 'teal'
        },
        {
            icon: '⚽',
            title: 'دوري رمضان لكرة القدم',
            date: 'وضع خبر 2026',
            tag: 'رياضة',
            text: 'يُقام دوري رمضان السنوي لكرة القدم في الملعب الجواري بالقرية، بمشاركة فرق من القرى المجاورة. باب المشاركة مفتوح للشباب.',
            tagColor: 'primary'
        },
        {
            icon: '🚧',
            title: 'أشغال صيانة الطريق البلدي',
            date: 'وضع خبر 2026',
            tag: 'أشغال',
            text: 'انطلقت أشغال صيانة وتعبيد الطريق البلدي الرابط بين القرية وبلدية رأس عين عميروش، مرفقاً ذلك بإعادة تهيئة الإنارة العمومية.',
            tagColor: 'gold'
        }
    ],
    nav: {
        top: ['home', 'about', 'services', 'shop', 'religion', 'contact'],
        branches: {
            about: ['news'],
            religion: []
        }
    },
    customNav: {},
    customSections: [],
    newsAbout: {
        heading: 'أخبار القرية',
        lead: [
            'مرحبًا بكم في قسم أخبار القرية، المساحة المخصصة لمتابعة كل ما يحدث في قريتنا من أخبار ومستجدات وفعاليات ومبادرات تهم السكان والزوار.',
            'نسعى من خلال هذا القسم إلى نقل الأخبار المحلية بشكل واضح ومنظم، وتسليط الضوء على مختلف الأنشطة التي تساهم في تطوير القرية وتعزيز التواصل بين أفراد المجتمع.'
        ],
        items: [
            { icon: '🏘️', title: 'أخبار ومستجدات محلية', text: 'يتابع الموقع أهم المستجدات المتعلقة بالقرية، بما في ذلك مشاريع التنمية، أشغال الطرق والمرافق، الخدمات المحلية، والقرارات والإعلانات التي تهم السكان.' },
            { icon: '🎉', title: 'الفعاليات والمناسبات', text: 'نشارك أيضًا أخبار المناسبات والفعاليات التي تقام في القرية، مثل الاحتفالات، الأنشطة الثقافية والرياضية، المبادرات الاجتماعية، والأنشطة التي تجمع أبناء القرية.' },
            { icon: '🤝', title: 'مبادرات أهل القرية', text: 'نسلط الضوء على المبادرات التي يقوم بها سكان القرية، سواء كانت حملات تطوعية، أعمالًا اجتماعية، أنشطة شبابية أو مشاريع تهدف إلى تحسين الحياة اليومية والحفاظ على روح التعاون بين أبناء القرية.' },
            { icon: '📸', title: 'صور وتغطيات', text: 'يمكن للزوار متابعة الصور والتغطيات الخاصة بأبرز الأحداث والأنشطة التي تشهدها القرية، لتوثيق اللحظات المهمة والحفاظ على ذاكرة القرية للأجيال القادمة.' },
            { icon: '📢', title: 'تابعوا كل جديد', text: 'سيتم تحديث هذا القسم باستمرار لإضافة آخر الأخبار والمستجدات، حتى يبقى سكان القرية على اطلاع دائم بما يحدث في محيطهم.' }
        ],
        foot: 'أخبار القرية... من أهل القرية وإلى أهل القرية.'
    },
    seo: {
        title: 'قرية أهل محمد — رأس عين عميروش، معسكر، الجزائر',
        description: 'الموقع الرسمي لقرية أهل محمد، بلدية رأس عين عميروش، دائرة عقاز، ولاية معسكر. تعرّف على تاريخ القرية، معالمها، خدماتها، أنشطتها وأخبارها.',
        keywords: 'أهل محمد, قرية أهل محمد, رأس عين عميروش, معسكر, الجزائر, أخبار القرية, معالم القرية, خدمات, مواقيت الصلاة',
        url: '',
        ogImage: '',
        twitterSite: '',
        author: 'أهل محمد',
        robots: 'index, follow'
    },
    contentVersion: '29',
    theme: 'green'
};

// ===== ثيمات الألوان المتاحة (متطابقة مع themes.js) =====
const THEME_OPTIONS = {
    green:  { name: 'أخضر',  c1: '#2d6a4f', c2: '#c9a227' },
    blue:   { name: 'أزرق',   c1: '#2b6cb0', c2: '#f2b64a' },
    teal:   { name: 'تركواز', c1: '#0f766e', c2: '#e9b21c' },
    purple: { name: 'بنفسجي', c1: '#5b3b8e', c2: '#e6b54a' },
    gold:   { name: 'ذهبي',   c1: '#9c7416', c2: '#d4a53f' },
    rose:   { name: 'وردي',   c1: '#b03a48', c2: '#e5b54a' }
};

function currentThemeName() {
    return (THEME_OPTIONS[data.theme] ? data.theme : 'green');
}

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
let visitsInfo = { total: 0, today: 0, countries: {} };

// دمج أي حقول جديدة مع البيانات القديمة المحفوظة
const defaults = JSON.parse(JSON.stringify(defaultData));

function applyDefaults() {
    if (data.contentVersion !== defaultData.contentVersion) {
        data = JSON.parse(JSON.stringify(defaultData));
    }
    data = Object.assign({}, defaults, data);
    // تنظيف العبارات المحذوفة من البيانات المحفوظة القديمة
    if (data.aboutP1 && data.aboutP1.indexOf('الطريق الوطني') !== -1) {
        data.aboutP1 = data.aboutP1.replace('، ويمرّ عبر القرية الطريق الوطني رقم 97 الذي يمنحها موقعاً استراتيجياً،', '،');
    }
    if (data.aboutP2 && data.aboutP2.indexOf('مسجد') !== -1) {
        data.aboutP2 = data.aboutP2.replace('تضم القرية مسجدين، أقدمهما يعود إلى بداية القرن العشرين ليبقى شاهداً على تاريخ المنطقة، إضافة إلى ', 'تضم القرية ');
    }
    if (Array.isArray(data.history)) {
        data.history = data.history.filter(h => !(h && h.title && h.title.indexOf('مسجد') !== -1));
    }
    if (!Array.isArray(data.deceased)) data.deceased = defaults.deceased;
    if (!Array.isArray(data.services)) data.services = defaults.services;
    if (!Array.isArray(data.aboutSections)) data.aboutSections = [];
    if (!data.seo || typeof data.seo !== 'object') data.seo = defaults.seo;
    ['title', 'description', 'keywords', 'url', 'ogImage', 'twitterSite', 'author', 'robots'].forEach(function (k) {
        if (typeof data.seo[k] !== 'string') data.seo[k] = defaults.seo[k];
    });
    if (!THEME_OPTIONS[data.theme]) {
        data.theme = typeof defaults.theme === 'string' && THEME_OPTIONS[defaults.theme]
            ? defaults.theme
            : 'green';
    }
    if (!Array.isArray(data.history)) data.history = defaults.history;
    if (!Array.isArray(data.shop)) data.shop = defaults.shop;
    if (!Array.isArray(data.prayer)) data.prayer = defaults.prayer;
    if (!data.residents) data.residents = defaults.residents;
    if (!data.messages) data.messages = [];
    if (!Array.isArray(data.news)) data.news = defaults.news;
    if (Array.isArray(data.news)) {
        data.news.forEach((n, i) => {
            if (!n.id) n.id = 'a' + Date.now() + '_' + i;
            if (n && n.image === undefined) n.image = '';
            if (n && n.fontSize === undefined) n.fontSize = 'normal';
            if (n && n.textColor === undefined) n.textColor = 'auto';
        });
    }
    if (!Array.isArray(data.newsSections)) data.newsSections = defaults.newsSections;
    // أقسام الأخبار: تُحفظ حذفها وتعديلاتها كما هي دون إعادة دمج أي أقسام افتراضية محذوفة.
    // (تُعاد الأقسام الافتراضية الجديدة فقط عند تغيّر رقم الإصدار — السطر أعلاه.)
    if (!data.stats) data.stats = defaults.stats;
    if (!data.nav || typeof data.nav !== 'object') data.nav = defaults.nav;
    if (!Array.isArray(data.nav.top)) data.nav.top = defaults.nav.top;
    if (data.nav.top.join(',') === 'home,about,services,religion,shop,contact') data.nav.top = defaults.nav.top;
    if (!data.nav.branches || typeof data.nav.branches !== 'object') data.nav.branches = defaults.nav.branches;
    if (!Array.isArray(data.nav.branches.about)) data.nav.branches.about = defaults.nav.branches.about;
    if (!Array.isArray(data.nav.branches.religion)) data.nav.branches.religion = defaults.nav.branches.religion;
    if (!Array.isArray(data.customSections)) data.customSections = [];
}

applyDefaults();
// ===== ملء النماذج من البيانات =====
function populateForms() {
    document.getElementById('siteName').value = data.siteName;
    document.getElementById('siteTagline').value = data.siteTagline;
    document.getElementById('contactEmail').value = data.contactEmail;
    const locField = document.getElementById('locationText');
    if (locField) locField.value = (data.location && data.location.text) || '';

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
    populateLayout();
    populateCustomSections();
    populateNewsAbout();
    populateAboutSections();
    populateDeceased();
    populateArticleSections();
    populateArticles();
    populateArticleTagSelect();
    renderAppearance();
    updateOverview();
}

function renderAppearance() {
    const box = document.getElementById('dashThemeSwatches');
    if (!box) return;
    const current = currentThemeName();
    box.innerHTML = '';
    Object.keys(THEME_OPTIONS).forEach(id => {
        const t = THEME_OPTIONS[id];
        const sw = document.createElement('button');
        sw.type = 'button';
        sw.className = 'theme-swatch dash-theme-swatch' + (id === current ? ' active' : '');
        sw.style.background = 'linear-gradient(135deg, ' + t.c1 + ', ' + t.c2 + ')';
        sw.title = t.name;
        sw.setAttribute('aria-label', 'اللون ' + t.name);
        sw.setAttribute('data-theme-opt', id);
        sw.addEventListener('click', () => {
            data.theme = id;
            if (window.setAhlColorTheme) {
                window.setAhlColorTheme(id);
            } else {
                renderAppearance();
            }
        });
        box.appendChild(sw);
    });
    const nameEl = document.getElementById('dashThemeName');
    if (nameEl) nameEl.textContent = 'اللون الحالي: ' + THEME_OPTIONS[current].name;
}

// تحديث قسم المظهر فور تغيير اللون من زر 🎨 في الشريط العلوي
window.addEventListener('ahlThemeChange', function (e) {
    const name = e.detail && e.detail.name;
    if (name && THEME_OPTIONS[name]) data.theme = name;
    renderAppearance();
});

// ===== الدروس الخصوصية =====
function populateServices() {
    const container = document.getElementById('servicesEditor');
    if (!container) return;
    container.innerHTML = '';
    data.services.forEach((s, i) => {
        const item = document.createElement('div');
        item.className = 'service-item';
        item.setAttribute('data-index', i);
        item.innerHTML = `
            <input type="text" class="dash-input icon-input" data-service-icon data-index="${i}" value="${escapeHtml(s.icon)}">
            <select class="dash-input cat-select" data-service-cat data-index="${i}">
                <option value="register" ${s.type === 'register' ? 'selected' : ''}>درس خصوصي</option>
                <option value="sweets" ${s.type === 'sweets' ? 'selected' : ''}>حلويات</option>
            </select>
            <input type="text" class="dash-input title-input" data-service-title data-index="${i}" value="${escapeHtml(s.title)}">
            <input type="text" class="dash-input text-input" data-service-text data-index="${i}" value="${escapeHtml(s.text)}">
            <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
            <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
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
        item.setAttribute('data-index', i);
        item.innerHTML = `
            <span style="min-width:40px;text-align:center;font-size:1.3rem">📜</span>
            <input type="text" class="dash-input title-input" data-history-title data-index="${i}" value="${escapeHtml(h.title)}" placeholder="العنوان">
            <input type="text" class="dash-input text-input" data-history-content data-index="${i}" value="${escapeHtml(h.content)}" placeholder="الوصف">
            <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
            <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
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
        item.setAttribute('data-index', i);
        item.innerHTML = `
            <input type="text" class="dash-input icon-input" data-prayer-icon data-index="${i}" value="${escapeHtml(p.icon)}">
            <input type="text" class="dash-input title-input" data-prayer-name data-index="${i}" value="${escapeHtml(p.name)}" placeholder="اسم الصلاة">
            <input type="text" class="dash-input" data-prayer-time data-index="${i}" value="${escapeHtml(p.time)}" placeholder="05:30">
            <label class="prayer-main-toggle">
                <input type="checkbox" data-prayer-main data-index="${i}" ${p.main ? 'checked' : ''}>
                <span>بارز</span>
            </label>
            <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
            <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
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
        item.setAttribute('data-index', i);
        item.innerHTML = `
            <div class="shop-head">
                <span style="font-size:1.3rem">🛍️</span>
                <input type="text" class="dash-input title-input" data-shop-name data-index="${i}" value="${escapeHtml(p.name)}" placeholder="الاسم">
                <input type="text" class="dash-input" data-shop-price data-index="${i}" value="${escapeHtml(p.price)}" placeholder="السعر">
                <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
                <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
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

// ===== المقالات =====
const ARTICLE_COLORS = [
    { name: 'أخضر داكن', value: '#1c4d37' },
    { name: 'ذهبي', value: '#8a6a10' },
    { name: 'أزرق', value: '#1d63a8' },
    { name: 'سماوي', value: '#0f766e' },
    { name: 'بني', value: '#7b4a12' },
    { name: 'بنفسجي', value: '#6d28a0' },
    { name: 'أحمر', value: '#a93226' },
    { name: 'رمادي', value: '#5b6d62' }
];

function articleColorOptions(selected) {
    let opts = '<option value="auto">تلقائي (حسب الموقع)</option>';
    opts += ARTICLE_COLORS.map(c =>
        `<option value="${c.value}" ${selected === c.value ? 'selected' : ''}>${c.name}</option>`
    ).join('');
    opts += `<option value="custom" ${selected === 'custom' ? 'selected' : ''}>🎨 لون مخصص</option>`;
    return opts;
}

function colorForTag(tagName) {
    const sec = data.newsSections.find(s => s.name === tagName);
    return sec ? sec.color : 'primary';
}

function populateArticleSections() {
    const container = document.getElementById('sectionsEditor');
    if (!container) return;
    container.innerHTML = '';
    data.newsSections.forEach((s, i) => {
        const item = document.createElement('div');
        item.className = 'service-item';
        item.setAttribute('data-index', i);
        item.innerHTML = `
            <input type="text" class="dash-input icon-input" data-sec-icon data-index="${i}" value="${escapeHtml(s.icon)}">
            <input type="text" class="dash-input title-input" data-sec-name data-index="${i}" value="${escapeHtml(s.name)}" placeholder="اسم القسم">
            <select class="dash-input cat-select" data-sec-color data-index="${i}">
                <option value="primary" ${s.color === 'primary' ? 'selected' : ''}>أخضر</option>
                <option value="teal" ${s.color === 'teal' ? 'selected' : ''}>سماوي</option>
                <option value="gold" ${s.color === 'gold' ? 'selected' : ''}>ذهبي</option>
            </select>
            <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
            <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
            <button class="btn-del" data-sec-del="${i}">حذف</button>
        `;
        container.appendChild(item);
    });
}

function populateArticleTagSelect() {
    const sel = document.getElementById('artTag');
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML = data.newsSections.map(s =>
        `<option value="${escapeHtml(s.name)}">${escapeHtml(s.icon)} ${escapeHtml(s.name)}</option>`
    ).join('');
    if (current && data.newsSections.some(s => s.name === current)) {
        sel.value = current;
    }
}

function populateArticles() {
    const container = document.getElementById('articlesEditor');
    const emptyMsg = document.getElementById('noArticlesMsg');
    if (!container) return;
    container.innerHTML = '';
    if (!data.news || data.news.length === 0) {
        if (emptyMsg) emptyMsg.style.display = '';
        return;
    }
    if (emptyMsg) emptyMsg.style.display = 'none';
    data.news.forEach((n, i) => {
        const item = document.createElement('div');
        item.className = 'service-item article-item';
        item.setAttribute('data-index', i);
        const fontOpts = ['small', 'normal', 'large', 'xlarge'].map(f =>
            `<option value="${f}" ${(n.fontSize || 'normal') === f ? 'selected' : ''}>${{ small: 'صغير', normal: 'عادي', large: 'كبير', xlarge: 'كبير جداً' }[f]}</option>`
        ).join('');
        item.innerHTML = `
            <div class="article-row-main">
                <input type="text" class="dash-input icon-input" data-art-icon data-index="${i}" value="${escapeHtml(n.icon || '📰')}">
                <input type="text" class="dash-input title-input" data-art-title data-index="${i}" value="${escapeHtml(n.title)}" placeholder="عنوان المقال">
                <select class="dash-input cat-select" data-art-tag data-index="${i}">
                    ${data.newsSections.map(s => `<option value="${escapeHtml(s.name)}" ${n.tag === s.name ? 'selected' : ''}>${escapeHtml(s.icon)} ${escapeHtml(s.name)}</option>`).join('')}
                </select>
                <input type="text" class="dash-input date-input" data-art-date data-index="${i}" value="${escapeHtml(n.date || '')}" placeholder="التاريخ">
                <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
                <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
                <button class="btn-edit" data-art-edit="${i}" title="تعديل في النموذج">✏️</button>
                <button class="btn-del" data-art-del="${i}">حذف</button>
            </div>
            <div class="article-format-row">
                <div class="shop-thumb art-thumb">
                    ${n.image ? `<img src="${escapeHtml(n.image)}" alt="معاينة" onerror="this.style.display='none'">` : '<span class="shop-thumb-empty">لا صورة</span>'}
                </div>
                <label class="btn-upload">
                    📁 رفع صورة
                    <input type="file" accept="image/*" data-art-upload="${i}" hidden>
                </label>
                <select class="dash-input" data-art-font data-index="${i}" title="حجم الخط">
                    ${fontOpts}
                </select>
                <select class="dash-input" data-art-color data-index="${i}" title="لون النص">
                    ${articleColorOptions(n.textColor === 'auto' ? 'auto' : (ARTICLE_COLORS.some(c => c.value === n.textColor) ? n.textColor : 'custom'))}
                </select>
                <input type="color" class="art-color-custom" data-art-color-custom data-index="${i}" value="${escapeHtml((n.textColor && n.textColor.indexOf('#') === 0) ? n.textColor : '#1c4d37')}" title="اختر لوناً مخصصاً">
            </div>
            <textarea class="dash-input text-input" data-art-text data-index="${i}" placeholder="نص المقال" style="${n.textColor && n.textColor !== 'auto' ? 'color:' + escapeHtml(n.textColor) : ''}">${escapeHtml(n.text || '')}</textarea>
        `;
        container.appendChild(item);
    });
}

// ===== التنقل والترتيب =====
const NAV_TOP_META = {
    home: { icon: '🏠', label: 'الرئيسية' },
    about: { icon: '📖', label: 'عن القرية' },
    services: { icon: '🛠️', label: 'الخدمات' },
    religion: { icon: '🕌', label: 'الدين' },
    shop: { icon: '🛍️', label: 'المتجر' },
    contact: { icon: '✉️', label: 'تواصل معنا' }
};

const NAV_ABOUT_META = {
    about: { icon: 'ℹ️', label: 'نبذة عن القرية' },
    history: { icon: '📜', label: 'تاريخ القرية' },
    landmarks: { icon: '🗺️', label: 'معالم القرية' },
    news: { icon: '📰', label: 'أخبار القرية' }
};

const NAV_RELIGION_META = {
    prayer: { icon: '🕐', label: 'توقيت الصلاة' }
};

function renderLayoutRows(containerId, list, meta) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    const supportsCustom = containerId === 'navTopEditor' || containerId === 'navAboutEditor';
    if (list && list.length) {
        list.forEach((key, i) => {
            const isCustom = supportsCustom && data.customNav && data.customNav[key];
            const item = document.createElement('div');
            item.className = 'service-item nav-layout-item';
            item.setAttribute('data-index', i);
            item.setAttribute('data-nav-item', key);
            if (isCustom) {
                const c = data.customNav[key];
                item.innerHTML = `
                    <input type="text" class="dash-input icon-input" data-customnav-icon data-key="${escapeHtml(key)}" value="${escapeHtml(c.icon || '🗂')}" title="أيقونة القسم">
                    <input type="text" class="dash-input title-input" data-customnav-label data-key="${escapeHtml(key)}" value="${escapeHtml(c.label || '')}" placeholder="اسم القسم">
                    <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
                    <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
                    <span class="btn-del-nav" data-del="${escapeHtml(key)}" title="حذف القسم نهائياً" data-container="${containerId}">🗑</span>
                `;
            } else {
                const m = meta[key] || { icon: '•', label: key };
                item.innerHTML = `
                    <span style="min-width:40px;text-align:center;font-size:1.3rem">${m.icon}</span>
                    <span class="nav-layout-label">${escapeHtml(m.label)}</span>
                    <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
                    <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
                    <span class="btn-del-nav" data-del="${escapeHtml(key)}" title="حذف من التنقل" data-container="${containerId}">🗑</span>
                `;
            }
            container.appendChild(item);
        });
    }

    const availKeys = Object.keys(meta).filter(k => (list || []).indexOf(k) === -1);

    const addBar = document.createElement('div');
    addBar.className = 'nav-add-bar';
    let selectHtml;
    if (supportsCustom && data.customNav) {
        selectHtml = '<select class="nav-add-select" data-nav-add-select>' +
            '<option value="__new__">➕ إضافة فرع جديد (مخصص)</option>' +
            (availKeys.length ? '<option value="__sep__" disabled>────────────</option>' + availKeys.map(k =>
                `<option value="${escapeHtml(k)}">${meta[k] ? (meta[k].icon + ' ' + escapeHtml(meta[k].label)) : escapeHtml(k)}</option>`
            ).join('') : '') +
            '</select>';
    } else {
        selectHtml = '<select class="nav-add-select" data-nav-add-select>' +
            (availKeys.length ? availKeys.map(k =>
                `<option value="${escapeHtml(k)}">${meta[k] ? (meta[k].icon + ' ' + escapeHtml(meta[k].label)) : escapeHtml(k)}</option>`
            ).join('') : `<option value="">لا توجد عناصر إضافية متاحة</option>`) +
            '</select>';
    }
    addBar.innerHTML = selectHtml + '<button type="button" class="btn-add-nav" data-nav-add data-container="' + containerId + '" ' + ((availKeys.length || (supportsCustom && data.customNav)) ? '' : 'disabled') + '>➕ إضافة</button>';
    container.appendChild(addBar);
}

function populateLayout() {
    renderLayoutRows('navTopEditor', data.nav.top, NAV_TOP_META);
    renderLayoutRows('navAboutEditor', data.nav.branches.about, NAV_ABOUT_META);
    renderLayoutRows('navReligionEditor', data.nav.branches.religion, NAV_RELIGION_META);
}

// ===== الأقسام والعناوين الفرعية المخصصة =====
function populateCustomSections() {
    const container = document.getElementById('customSectionsEditor');
    if (!container) return;
    container.innerHTML = '';
    if (!data.customSections || data.customSections.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty-msg';
        empty.textContent = 'لا توجد أقسام مخصصة بعد. اضغط "إضافة قسم جديد" للبدء.';
        container.appendChild(empty);
        return;
    }
    data.customSections.forEach((sec, i) => {
        const subs = sec.subs || [];
        const wrap = document.createElement('div');
        wrap.className = 'service-item csec-item';
        wrap.setAttribute('data-index', i);
        let subsHtml = '';
        if (subs.length) {
            subsHtml = subs.map((sub, j) => `
                <div class="csec-sub" data-csec-sub-i="${i}" data-csec-sub-j="${j}">
                    <span class="csec-sub-dot">▪</span>
                    <input type="text" class="dash-input csec-sub-input" data-csec-sub-input="${i}_${j}" value="${escapeHtml(sub)}" placeholder="عنوان فرعي">
                    <span class="btn-move" data-csec-sub-move="${i}_${j}" data-csec-sub-dir="-1" title="تحريك لأعلى">↑</span>
                    <span class="btn-move" data-csec-sub-move="${i}_${j}" data-csec-sub-dir="1" title="تحريك لأسفل">↓</span>
                    <button class="btn-del" data-csec-sub-del="${i}_${j}">حذف</button>
                </div>`).join('');
        } else {
            subsHtml = '<p class="csec-sub-empty">لا توجد عناوين فرعية بعد.</p>';
        }
        wrap.innerHTML = `
            <div class="csec-head">
                <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
                <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
                <input type="text" class="dash-input icon-input" data-csec-icon data-index="${i}" value="${escapeHtml(sec.icon || '🗂')}">
                <input type="text" class="dash-input title-input" data-csec-title data-index="${i}" value="${escapeHtml(sec.title || '')}" placeholder="اسم القسم">
                <button class="btn-del" data-csec-del="${i}">حذف القسم</button>
            </div>
            <div class="csec-subs">
                ${subsHtml}
            </div>
            <button type="button" class="btn-add-sub" data-csec-addsub="${i}">+ إضافة عنوان فرعي</button>
        `;
        container.appendChild(wrap);
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

// ===== إعدادات قسم "حول أخبار القرية" =====
function populateNewsAbout() {
    const nb = data.newsAbout || {};
    const heading = document.getElementById('nbHeading');
    if (heading) heading.value = nb.heading || '';
    const ld1 = document.getElementById('nbLead1');
    if (ld1) ld1.value = (nb.lead && nb.lead[0]) || '';
    const ld2 = document.getElementById('nbLead2');
    if (ld2) ld2.value = (nb.lead && nb.lead[1]) || '';
    const foot = document.getElementById('nbFoot');
    if (foot) foot.value = nb.foot || '';

    const container = document.getElementById('newsAboutEditor');
    if (!container) return;
    container.innerHTML = '';
    if (!data.newsAbout || !data.newsAbout.items || data.newsAbout.items.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty-msg';
        empty.textContent = 'لا توجد عناصر بعد. اضغط "إضافة عنصر" للبدء.';
        container.appendChild(empty);
        return;
    }
    data.newsAbout.items.forEach((it, i) => {
        const item = document.createElement('div');
        item.className = 'service-item news-about-dash-item';
        item.setAttribute('data-index', i);
        item.innerHTML = `
            <div class="newsabout-row">
                <input type="text" class="dash-input icon-input" data-nb-icon data-index="${i}" value="${escapeHtml(it.icon)}">
                <input type="text" class="dash-input title-input" data-nb-title data-index="${i}" value="${escapeHtml(it.title)}" placeholder="عنوان فرعي">
                <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
                <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
                <button class="btn-del" data-nb-del="${i}">حذف</button>
            </div>
            <textarea class="dash-input text-input" data-nb-text data-index="${i}" placeholder="نص العنصر">${escapeHtml(it.text || '')}</textarea>
        `;
        container.appendChild(item);
    });
}

// ===== أقسام إضافية في "عن القرية" =====
function populateAboutSections() {
    const container = document.getElementById('aboutSectionsEditor');
    if (!container) return;
    container.innerHTML = '';
    if (!Array.isArray(data.aboutSections) || data.aboutSections.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty-msg';
        empty.textContent = 'لا توجد أقسام إضافية بعد. اضغط "إضافة قسم" لإنشاء قسم داخل قسم "عن القرية".';
        container.appendChild(empty);
        return;
    }
    data.aboutSections.forEach((s, i) => {
        const item = document.createElement('div');
        item.className = 'service-item news-about-dash-item';
        item.setAttribute('data-index', i);
        item.innerHTML = `
            <div class="newsabout-row">
                <input type="text" class="dash-input icon-input" data-as-icon data-index="${i}" value="${escapeHtml(s.icon)}">
                <input type="text" class="dash-input title-input" data-as-title data-index="${i}" value="${escapeHtml(s.title)}" placeholder="عنوان القسم">
                <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
                <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
                <button class="btn-del" data-as-del="${i}">حذف</button>
            </div>
            <textarea class="dash-input text-input" data-as-text data-index="${i}" placeholder="نص القسم">${escapeHtml(s.text || '')}</textarea>
        `;
        container.appendChild(item);
    });
}

function populateSeo() {
    const s = data.seo || {};
    const id = (n) => { const el = document.getElementById(n); if (el) el.value = s[n] || ''; };
    id('seoTitle');
    id('seoDesc');
    id('seoKeywords');
    id('seoUrl');
    id('seoOgImage');
    id('seoTwitter');
    id('seoAuthor');
    id('seoRobots');
    updateSeoDashboardCounters();
}

function updateSeoDashboardCounters() {
    const desc = document.getElementById('seoDesc');
    const cnt = document.getElementById('seoDescCount');
    if (desc && cnt) {
        const len = desc.value.length;
        cnt.textContent = len + ' / 160';
        cnt.className = 'seo-count ' + (len > 160 ? 'warn' : 'ok');
    }
}

function populateDeceased() {
    const container = document.getElementById('deceasedEditor');
    if (!container) return;
    container.innerHTML = '';
    if (!Array.isArray(data.deceased) || data.deceased.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty-msg';
        empty.textContent = 'لا توجد أسماء بعد. اضغط "إضافة متوفى" للبدء.';
        container.appendChild(empty);
        return;
    }
    data.deceased.forEach((entry, i) => {
        const name = (typeof entry === 'string') ? entry : ((entry && entry.name) || '');
        const date = (typeof entry === 'string') ? '' : ((entry && entry.date) || '');
        const item = document.createElement('div');
        item.className = 'service-item';
        item.setAttribute('data-index', i);
        item.innerHTML = `
            <div class="newsabout-row">
                <input type="text" class="dash-input title-input" data-dead-name data-index="${i}" value="${escapeHtml(name)}" placeholder="اسم المتوفى">
                <input type="text" class="dash-input" data-dead-date data-index="${i}" value="${escapeHtml(date)}" placeholder="تاريخ الصلاة (مثال: 2025/06/15)" style="max-width:180px">
                <span class="btn-move" data-dir="-1" title="تحريك لأعلى">↑</span>
                <span class="btn-move" data-dir="1" title="تحريك لأسفل">↓</span>
                <button class="btn-del" data-dead-del="${i}">حذف</button>
            </div>`;
        container.appendChild(item);
    });
}

function updateOverview() {
    document.getElementById('ovPopulation').textContent = data.stats.population;
    document.getElementById('ovFamilies').textContent = data.stats.families;
    document.getElementById('ovServices').textContent = data.services.length;
    const ovMsg = document.getElementById('ovMessages');
    if (ovMsg) ovMsg.textContent = (data.messages || []).length;
    const ovArt = document.getElementById('ovArticles');
    if (ovArt) ovArt.textContent = (data.news || []).length;
    const ovVis = document.getElementById('ovVisits');
    if (ovVis) ovVis.textContent = visitsInfo.total || 0;
    const ovVisToday = document.getElementById('ovVisitsToday');
    if (ovVisToday) ovVisToday.textContent = visitsInfo.today || 0;
    renderCountries(visitsInfo.countries || {});
}

// ===== زوار حسب البلد =====
// رمز الدولة (ISO حرفان) -> علم إيموجي
function countryFlag(code) {
    if (!code || !/^[A-Za-z]{2}$/.test(code)) return '🏳️';
    const cc = code.toUpperCase();
    if (cc === 'XX') return '🏳️';
    return cc.replace(/./g, ch => String.fromCodePoint(127397 + ch.charCodeAt(0)));
}

// أسماء عربية لأشهر الدول (وما عداها يُعرض برمزه)
const COUNTRY_NAMES = {
    DZ: 'الجزائر', FR: 'فرنسا', MA: 'المغرب', TN: 'تونس', EG: 'مصر', LY: 'ليبيا',
    SA: 'السعودية', AE: 'الإمارات', QA: 'قطر', KW: 'الكويت', BH: 'البحرين', OM: 'عُمان',
    JO: 'الأردن', LB: 'لبنان', SY: 'سوريا', IQ: 'العراق', PS: 'فلسطين', YE: 'اليمن',
    SD: 'السودان', MR: 'موريتانيا', SO: 'الصومال', DJ: 'جيبوتي', KM: 'جزر القمر',
    TR: 'تركيا', ES: 'إسبانيا', IT: 'إيطاليا', DE: 'ألمانيا', GB: 'بريطانيا',
    US: 'أمريكا', CA: 'كندا', BE: 'بلجيكا', NL: 'هولندا', CH: 'سويسرا',
    SE: 'السويد', PT: 'البرتغال', RU: 'روسيا', CN: 'الصين', IN: 'الهند',
    PK: 'باكستان', ID: 'إندونيسيا', MY: 'ماليزيا', AU: 'أستراليا', BR: 'البرازيل',
    XX: 'غير معروف'
};

function countryName(code) {
    if (!code) return 'غير معروف';
    const cc = code.toUpperCase();
    return COUNTRY_NAMES[cc] || cc;
}

function renderCountries(map) {
    const box = document.getElementById('ovCountries');
    if (!box) return;
    const entries = Object.keys(map)
        .map(k => [k, parseInt(map[k], 10) || 0])
        .filter(e => e[1] > 0)
        .sort((a, b) => b[1] - a[1]);

    if (!entries.length) {
        box.innerHTML = '<p class="ov-countries-empty">لا توجد بيانات دول بعد — تظهر بعد زيارات الموقع على الاستضافة.</p>';
        return;
    }

    const total = entries.reduce((s, e) => s + e[1], 0) || 1;
    const max = entries[0][1] || 1;
    box.innerHTML = entries.map(([code, count]) => {
        const pct = Math.round((count / total) * 100);
        const width = Math.round((count / max) * 100);
        return '<div class="ov-country">' +
            '<span class="ov-country-flag">' + countryFlag(code) + '</span>' +
            '<span class="ov-country-name">' + countryName(code) + '</span>' +
            '<span class="ov-country-bar"><i style="width:' + width + '%"></i></span>' +
            '<span class="ov-country-count">' + count + ' <em>(' + pct + '%)</em></span>' +
        '</div>';
    }).join('');
}
// ===== قراءة من النماذج =====
function readFromForms() {
    data.siteName = document.getElementById('siteName').value;
    data.siteTagline = document.getElementById('siteTagline').value;
    data.contactEmail = document.getElementById('contactEmail').value;
    const locField = document.getElementById('locationText');
    if (locField) {
        if (!data.location) data.location = {};
        data.location.text = locField.value;
    }

    data.aboutP1 = document.getElementById('aboutP1').value;
    data.aboutP2 = document.getElementById('aboutP2').value;
    data.aboutP3 = document.getElementById('aboutP3').value;
    data.aboutP4 = document.getElementById('aboutP4').value;
    data.stats.population = document.getElementById('statPop').value;
    data.stats.families = document.getElementById('statFam').value;
    data.stats.years = document.getElementById('statYears').value;

    // أقسام إضافية في "عن القرية"
    const asEditor = document.getElementById('aboutSectionsEditor');
    if (asEditor) {
        const titleEls = asEditor.querySelectorAll('[data-as-title]');
        if (titleEls.length) {
            data.aboutSections = Array.from(titleEls).map(inp => {
                const i = Number(inp.dataset.index);
                return {
                    icon: asEditor.querySelector(`[data-as-icon][data-index="${i}"]`).value,
                    title: inp.value,
                    text: asEditor.querySelector(`[data-as-text][data-index="${i}"]`).value
                };
            });
        } else {
            data.aboutSections = [];
        }
    }

    // أسماء المتوفين
    const deadEditor = document.getElementById('deceasedEditor');
    if (deadEditor) {
        const nameEls = deadEditor.querySelectorAll('[data-dead-name]');
        const dateEls = deadEditor.querySelectorAll('[data-dead-date]');
        data.deceased = Array.from(nameEls).map((inp, idx) => ({
            name: inp.value,
            date: dateEls[idx] ? dateEls[idx].value : ''
        })).filter(o => o.name.trim() !== '');
    }

    // إعدادات SEO للموقع
    if (data.seo) {
        const read = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
        data.seo.title = read('seoTitle');
        data.seo.description = read('seoDesc');
        data.seo.keywords = read('seoKeywords');
        data.seo.url = read('seoUrl').trim().replace(/\/+$/, '');
        data.seo.ogImage = read('seoOgImage').trim();
        data.seo.twitterSite = read('seoTwitter').trim();
        data.seo.author = read('seoAuthor');
        data.seo.robots = read('seoRobots');
    }

    // لون الموقع الافتراضي
    const activeTheme = document.querySelector('#dashThemeSwatches .theme-swatch.active');
    if (activeTheme && activeTheme.dataset.themeOpt && THEME_OPTIONS[activeTheme.dataset.themeOpt]) {
        data.theme = activeTheme.dataset.themeOpt;
    }

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
        const items = Array.from(shopEditor.querySelectorAll('[data-shop-name]'));
        data.shop = items.map(inp => {
            const i = Number(inp.dataset.index);
            return {
                name: inp.value,
                price: shopEditor.querySelector(`[data-shop-price][data-index="${i}"]`).value,
                image: (data.shop[i] && data.shop[i].image) || '',
                desc: shopEditor.querySelector(`[data-shop-desc][data-index="${i}"]`).value
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

    // ترتيب التنقل والفروع
    const navTopEditor = document.getElementById('navTopEditor');
    if (navTopEditor) {
        data.nav.top = Array.from(navTopEditor.querySelectorAll('[data-nav-item]')).map(el => el.getAttribute('data-nav-item'));
        navTopEditor.querySelectorAll('[data-customnav-icon]').forEach(inp => {
            const key = inp.getAttribute('data-key');
            if (data.customNav && data.customNav[key]) data.customNav[key].icon = inp.value;
        });
        navTopEditor.querySelectorAll('[data-customnav-label]').forEach(inp => {
            const key = inp.getAttribute('data-key');
            if (data.customNav && data.customNav[key]) data.customNav[key].label = inp.value;
        });
    }
    const navAboutEditor = document.getElementById('navAboutEditor');
    if (navAboutEditor) {
        data.nav.branches.about = Array.from(navAboutEditor.querySelectorAll('[data-nav-item]')).map(el => el.getAttribute('data-nav-item'));
        navAboutEditor.querySelectorAll('[data-customnav-icon]').forEach(inp => {
            const key = inp.getAttribute('data-key');
            if (data.customNav && data.customNav[key]) data.customNav[key].icon = inp.value;
        });
        navAboutEditor.querySelectorAll('[data-customnav-label]').forEach(inp => {
            const key = inp.getAttribute('data-key');
            if (data.customNav && data.customNav[key]) data.customNav[key].label = inp.value;
        });
    }
    const navReligionEditor = document.getElementById('navReligionEditor');
    if (navReligionEditor) {
        data.nav.branches.religion = Array.from(navReligionEditor.querySelectorAll('[data-nav-item]')).map(el => el.getAttribute('data-nav-item'));
    }

    // الأقسام والعناوين الفرعية المخصصة
    const csecEditor = document.getElementById('customSectionsEditor');
    if (csecEditor) {
        const secEls = csecEditor.querySelectorAll('[data-csec-title]');
        if (secEls.length) {
            data.customSections = Array.from(secEls).map(inp => {
                const i = Number(inp.dataset.index);
                const wrapper = inp.closest('.csec-item');
                const icon = csecEditor.querySelector(`[data-csec-icon][data-index="${i}"]`);
                const prev = data.customSections[i];
                return {
                    id: (prev && prev.id) || ('sec' + Date.now() + i),
                    icon: icon ? icon.value : '🗂',
                    title: inp.value,
                    subs: wrapper ? Array.from(wrapper.querySelectorAll('[data-csec-sub-input]')).map(s => s.value) : []
                };
            });
        } else {
            data.customSections = [];
        }
    }

    // إعدادات قسم "حول أخبار القرية"
    if (data.newsAbout) {
        const hd = document.getElementById('nbHeading');
        const l1 = document.getElementById('nbLead1');
        const l2 = document.getElementById('nbLead2');
        const ft = document.getElementById('nbFoot');
        data.newsAbout.heading = hd ? hd.value : '';
        data.newsAbout.lead = [l1 ? l1.value : '', l2 ? l2.value : ''].filter(t => t.trim() !== '');
        data.newsAbout.foot = ft ? ft.value : '';
        const nbEditor = document.getElementById('newsAboutEditor');
        if (nbEditor) {
            const titleEls = nbEditor.querySelectorAll('[data-nb-title]');
            if (titleEls.length) {
                data.newsAbout.items = Array.from(titleEls).map(inp => {
                    const i = Number(inp.dataset.index);
                    return {
                        icon: nbEditor.querySelector(`[data-nb-icon][data-index="${i}"]`).value,
                        title: inp.value,
                        text: nbEditor.querySelector(`[data-nb-text][data-index="${i}"]`).value
                    };
                });
            } else {
                data.newsAbout.items = [];
            }
        }
    }

    // أقسام النشر
    const sectionsEditor = document.getElementById('sectionsEditor');
    if (sectionsEditor) {
        const secNames = Array.from(sectionsEditor.querySelectorAll('[data-sec-name]'));
        if (secNames.length) {
            data.newsSections = secNames.map(inp => {
                const i = Number(inp.dataset.index);
                return {
                    icon: sectionsEditor.querySelector(`[data-sec-icon][data-index="${i}"]`).value,
                    name: inp.value,
                    color: sectionsEditor.querySelector(`[data-sec-color][data-index="${i}"]`).value
                };
            });
        }
    }

    // المقالات
    const articlesEditor = document.getElementById('articlesEditor');
    if (articlesEditor && articlesEditor.querySelectorAll('[data-art-title]').length) {
        const titleInputs = Array.from(articlesEditor.querySelectorAll('[data-art-title]'));
        data.news = titleInputs.map(inp => {
            const i = Number(inp.dataset.index);
            const tagEl = articlesEditor.querySelector(`[data-art-tag][data-index="${i}"]`);
            const tag = tagEl ? tagEl.value : 'إعلان';
            const fontEl = articlesEditor.querySelector(`[data-art-font][data-index="${i}"]`);
            const colorEl = articlesEditor.querySelector(`[data-art-color][data-index="${i}"]`);
            const colorCustomEl = articlesEditor.querySelector(`[data-art-color-custom][data-index="${i}"]`);
            let textColor = colorEl ? colorEl.value : 'auto';
            if (textColor === 'custom' && colorCustomEl) textColor = colorCustomEl.value;
            const prev = data.news[i] || {};
            return Object.assign({}, prev, {
                icon: articlesEditor.querySelector(`[data-art-icon][data-index="${i}"]`).value,
                title: inp.value,
                date: articlesEditor.querySelector(`[data-art-date][data-index="${i}"]`).value,
                tag: tag,
                text: articlesEditor.querySelector(`[data-art-text][data-index="${i}"]`).value,
                tagColor: colorForTag(tag),
                image: prev.image || '',
                fontSize: fontEl ? fontEl.value : 'normal',
                textColor: textColor
            });
        });
    }
}

// ===== حفظ =====
function save() {
    readFromForms();
    if (typeof data.updatedAt !== 'string') data.updatedAt = new Date().toISOString();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    updateOverview();
    const msg = document.getElementById('saveMsg');
    const saveBtn = document.getElementById('saveBtn');

    const flashButton = (txt) => {
        if (!saveBtn) return;
        const orig = saveBtn.innerHTML;
        saveBtn.innerHTML = txt;
        setTimeout(() => { saveBtn.innerHTML = orig; }, 1500);
    };

    if (window.AhlStorage) {
        AhlStorage.save(data).then((ok) => {
            if (ok) {
                msg.textContent = '✔ تم الحفظ على الخادم — التعديلات متاحة لجميع الزوار.';
                msg.className = 'save-msg success';
                flashButton('✔ تم الحفظ');
                setCloudStatus();
            } else {
                const hint = (window.AhlStorage && AhlStorage.lastError) ? AhlStorage.lastError() : '';
                msg.textContent = '⚠ حُفظ محلياً فقط — تعذّر الحفظ على الخادم'
                    + (hint ? ' (' + hint + ')' : '')
                    + '. تأكد من رفع مجلد api/ إلى الاستضافة وأنها تدعم PHP.';
                msg.className = 'save-msg';
                flashButton('⚠ حُفظ محلياً');
                setCloudStatus();
            }
            setTimeout(() => { msg.textContent = ''; }, 4500);
        });
    } else {
        msg.textContent = '✔ تم حفظ التغييرات بنجاح.';
        msg.className = 'save-msg success';
        flashButton('✔ تم الحفظ');
        setTimeout(() => { msg.textContent = ''; }, 3200);
    }
}

// ===== استعادة الافتراضي =====
function reset() {
    if (!confirm('هل أنت متأكد؟ سيتم استعادة جميع البيانات الافتراضية وفقدان تغييراتك.')) return;
    localStorage.removeItem(STORAGE_KEY);
    data = JSON.parse(JSON.stringify(defaultData));
    if (typeof data.updatedAt !== 'string') data.updatedAt = new Date().toISOString();
    populateForms();
    const msg = document.getElementById('saveMsg');
    if (window.AhlStorage) {
        AhlStorage.save(data).then((ok) => {
            msg.textContent = ok ? '✔ تم استعادة البيانات الافتراضية ونشرها على الخادم.' : '✔ تم استعادة البيانات الافتراضية محلياً فقط.';
            msg.className = 'save-msg success';
            setCloudStatus();
            setTimeout(() => { msg.textContent = ''; }, 4000);
        });
    } else {
        msg.textContent = '✔ تم استعادة البيانات الافتراضية.';
        msg.className = 'save-msg success';
        setTimeout(() => { msg.textContent = ''; }, 3000);
    }
}

// ===== التنقل بين الأقسام =====
function setPageMeta(title, icon) {
    const t = document.getElementById('dashPageTitle');
    const i = document.getElementById('dashPageIcon');
    if (t) t.textContent = title;
    if (i) i.textContent = icon || '•';
}

document.querySelectorAll('.dash-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.dash-nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;
        document.querySelectorAll('.dash-view').forEach(v => v.classList.remove('active'));
        document.querySelector(`[data-view-panel="${view}"]`).classList.add('active');
        setPageMeta(btn.dataset.title || view, btn.dataset.icon);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// الوصول السريع من نظرة عامة
document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => {
        const nav = document.querySelector(`.dash-nav-item[data-view="${el.dataset.goto}"]`);
        if (nav) nav.click();
    });
});

// اختصار الحفظ Ctrl+S
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        save();
    }
});

// ===== ترتيب عناصر القوائم (تحريك لأعلى / لأسفل) =====
const listGroups = {
    servicesEditor: { list: () => data.services, render: populateServices },
    historyEditor: { list: () => data.history, render: populateHistory },
    prayerEditor: { list: () => data.prayer, render: populatePrayer },
    shopEditor: { list: () => data.shop, render: populateShop },
    navTopEditor: { list: () => data.nav.top, render: populateLayout },
    navAboutEditor: { list: () => data.nav.branches.about, render: populateLayout },
    navReligionEditor: { list: () => data.nav.branches.religion, render: populateLayout },
    customSectionsEditor: { list: () => data.customSections, render: populateCustomSections },
    newsAboutEditor: { list: () => data.newsAbout.items, render: populateNewsAbout },
    aboutSectionsEditor: { list: () => data.aboutSections, render: populateAboutSections },
    deceasedEditor: { list: () => data.deceased, render: populateDeceased },
    sectionsEditor: { list: () => data.newsSections, render: () => { populateArticleSections(); populateArticleTagSelect(); } },
    articlesEditor: { list: () => data.news, render: populateArticles }
};

Object.entries(listGroups).forEach(([id, cfg]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.btn-del-nav');
        if (delBtn) {
            const key = delBtn.getAttribute('data-del');
            const list = cfg.list();
            const idx = list.indexOf(key);
            if (idx !== -1) {
                list.splice(idx, 1);
                if (data.customNav && data.customNav[key]) delete data.customNav[key];
                cfg.render();
            }
            return;
        }
        const addBtn = e.target.closest('.btn-add-nav[data-nav-add]');
        if (addBtn) {
            const sel = el.querySelector('.nav-add-select');
            if (!sel || !sel.value) return;
            if (sel.value === '__new__') {
                if (!data.customNav || typeof data.customNav !== 'object') data.customNav = {};
                const key = 'custom' + Date.now();
                data.customNav[key] = { icon: '🗂', label: 'قسم جديد' };
                const list = cfg.list();
                list.push(key);
                cfg.render();
                return;
            }
            const list = cfg.list();
            if (list.indexOf(sel.value) === -1) {
                list.push(sel.value);
                cfg.render();
            }
            return;
        }
        if (e.target.dataset.dir === undefined) return;
        const item = e.target.closest('.service-item');
        if (!item) return;
        const idx = Number(item.dataset.index);
        const list = cfg.list();
        const target = idx + Number(e.target.dataset.dir);
        if (target < 0 || target >= list.length) return;
        const [moved] = list.splice(idx, 1);
        list.splice(target, 0, moved);
        cfg.render();
    });
});

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

// ===== إضافة قسم نشر =====
const addArticleSection = document.getElementById('addArticleSection');
if (addArticleSection) {
    addArticleSection.addEventListener('click', () => {
        data.newsSections.push({ name: 'قسم جديد', icon: '📁', color: 'teal' });
        populateArticleSections();
        populateArticleTagSelect();
    });
}

// ===== إضافة قسم مخصص جديد =====
const addCustomSection = document.getElementById('addCustomSection');
if (addCustomSection) {
    addCustomSection.addEventListener('click', () => {
if (!Array.isArray(data.customSections)) data.customSections = [];
if (!data.customNav || typeof data.customNav !== 'object') data.customNav = {};
if (!data.newsAbout || typeof data.newsAbout !== 'object') data.newsAbout = defaults.newsAbout;
if (!Array.isArray(data.newsAbout.lead)) data.newsAbout.lead = defaults.newsAbout.lead;
if (!Array.isArray(data.newsAbout.items)) data.newsAbout.items = defaults.newsAbout.items;
        data.customSections.push({ id: 'sec' + Date.now(), icon: '🗂', title: 'قسم جديد', subs: ['عنوان فرعي أول'] });
        populateCustomSections();
    });
}

// ===== أحداث الأقسام المخصصة (إضافة/حذف/تحريك العناوين الفرعية) =====
const customSectionsEditor = document.getElementById('customSectionsEditor');
if (customSectionsEditor) {
    customSectionsEditor.addEventListener('click', (e) => {
        const addSub = e.target.closest('[data-csec-addsub]');
        if (addSub) {
            const i = Number(addSub.getAttribute('data-csec-addsub'));
            const sec = data.customSections[i];
            if (!sec) return;
            if (!Array.isArray(sec.subs)) sec.subs = [];
            sec.subs.push('عنوان فرعي جديد');
            populateCustomSections();
            return;
        }

        const delSub = e.target.closest('[data-csec-sub-del]');
        if (delSub) {
            const parts = delSub.getAttribute('data-csec-sub-del').split('_').map(Number);
            const sec = data.customSections[parts[0]];
            if (sec && Array.isArray(sec.subs)) sec.subs.splice(parts[1], 1);
            populateCustomSections();
            return;
        }

        if (e.target.dataset.csecDel !== undefined) {
            data.customSections.splice(Number(e.target.dataset.csecDel), 1);
            populateCustomSections();
            return;
        }

        const subMove = e.target.closest('[data-csec-sub-move]');
        if (subMove) {
            const parts = subMove.getAttribute('data-csec-sub-move').split('_').map(Number);
            const sec = data.customSections[parts[0]];
            if (!sec || !Array.isArray(sec.subs)) return;
            const j = parts[1];
            const target = j + Number(subMove.getAttribute('data-csec-sub-dir'));
            if (target < 0 || target >= sec.subs.length) return;
            const [moved] = sec.subs.splice(j, 1);
            sec.subs.splice(target, 0, moved);
            populateCustomSections();
            return;
        }
    });
}

// ===== إضافة عنصر / حذف عنصر في "حول أخبار القرية" =====
const addNewsAboutItem = document.getElementById('addNewsAboutItem');
if (addNewsAboutItem) {
    addNewsAboutItem.addEventListener('click', () => {
        if (!data.newsAbout || !Array.isArray(data.newsAbout.items)) {
            if (!data.newsAbout) data.newsAbout = {};
            data.newsAbout.items = [];
        }
        data.newsAbout.items.push({ icon: '📌', title: 'عنوان جديد', text: 'نص العنصر هنا.' });
        populateNewsAbout();
    });
}

const newsAboutEditorEl = document.getElementById('newsAboutEditor');
if (newsAboutEditorEl) {
    newsAboutEditorEl.addEventListener('click', (e) => {
        if (e.target.dataset.nbDel !== undefined) {
            data.newsAbout.items.splice(Number(e.target.dataset.nbDel), 1);
            populateNewsAbout();
        }
    });
}

// ===== إضافة قسم / حذف قسم في "عن القرية" =====
const addAboutSection = document.getElementById('addAboutSection');
if (addAboutSection) {
    addAboutSection.addEventListener('click', () => {
        if (!Array.isArray(data.aboutSections)) data.aboutSections = [];
        data.aboutSections.push({ icon: '📌', title: 'عنوان القسم', text: 'نص القسم هنا.' });
        populateAboutSections();
    });
}

const aboutSectionsEditorEl = document.getElementById('aboutSectionsEditor');
if (aboutSectionsEditorEl) {
    aboutSectionsEditorEl.addEventListener('click', (e) => {
        if (e.target.dataset.asDel !== undefined) {
            data.aboutSections.splice(Number(e.target.dataset.asDel), 1);
            populateAboutSections();
        }
    });
}

// ===== إضافة اسم متوفى / حذفه =====
const addDeceased = document.getElementById('addDeceased');
if (addDeceased) {
    addDeceased.addEventListener('click', () => {
        if (!Array.isArray(data.deceased)) data.deceased = [];
        data.deceased.push({ name: 'اسم المتوفى', date: '' });
        populateDeceased();
    });
}

const deceasedEditorEl = document.getElementById('deceasedEditor');
if (deceasedEditorEl) {
    deceasedEditorEl.addEventListener('click', (e) => {
        if (e.target.dataset.deadDel !== undefined) {
            data.deceased.splice(Number(e.target.dataset.deadDel), 1);
populateDeceased();
    populateSeo();
        }
    });
}

// ===== حذف قسم نشر / تعديل المقال في النموذج =====
const sectionsEditor = document.getElementById('sectionsEditor');
if (sectionsEditor) {
    sectionsEditor.addEventListener('click', (e) => {
        if (e.target.dataset.secDel !== undefined) {
            const idx = Number(e.target.dataset.secDel);
            const removed = data.newsSections[idx];
            data.newsSections.splice(idx, 1);
            if (removed) {
                const fallback = data.newsSections.length ? data.newsSections[0].name : 'خبر';
                data.news.forEach(n => { if (n.tag === removed.name) n.tag = fallback; });
            }
            populateArticleSections();
            populateArticleTagSelect();
            populateArticles();
        }
    });
}

// ===== حذف / تعديل مقال =====
const articlesEditor = document.getElementById('articlesEditor');
if (articlesEditor) {
    articlesEditor.addEventListener('click', (e) => {
        if (e.target.dataset.artDel !== undefined) {
            data.news.splice(Number(e.target.dataset.artDel), 1);
            cancelArticleEdit();
            populateArticles();
            updateOverview();
            save();
        } else if (e.target.dataset.artEdit !== undefined) {
            loadArticleToForm(Number(e.target.dataset.artEdit));
        }
    });
}

// ===== كتابة المقال (إضافة / حفظ التعديل) =====
function cancelArticleEdit() {
    document.getElementById('articleEditIndex').value = '';
    document.getElementById('artIcon').value = '📰';
    document.getElementById('artTitle').value = '';
    document.getElementById('artDate').value = '';
    document.getElementById('artText').value = '';
    const imgData = document.getElementById('artImageData');
    const imgUrl = document.getElementById('artImageUrl');
    if (imgData) imgData.value = '';
    if (imgUrl) imgUrl.value = '';
    const fontSel = document.getElementById('artFontSize');
    if (fontSel) fontSel.value = 'normal';
    const colorHidden = document.getElementById('artTextColor');
    if (colorHidden) colorHidden.value = 'auto';
    const colorCustom = document.getElementById('artTextColorCustom');
    if (colorCustom) colorCustom.value = '#1c4d37';
    if (typeof initArticleColorSwatches === 'function') initArticleColorSwatches();
    updateArtPreview();
    const sel = document.getElementById('artTag');
    if (sel && sel.options.length) sel.selectedIndex = 0;
    const btn = document.getElementById('addArticleBtn');
    if (btn) btn.innerHTML = '➕ إضافة المقال';
    const title = document.getElementById('articleFormTitle');
    if (title) title.textContent = '✍️ كتابة مقال';
    const cancel = document.getElementById('cancelArticleEdit');
    if (cancel) cancel.style.display = 'none';
}

function loadArticleToForm(idx) {
    const art = data.news[idx];
    if (!art) return;
    document.getElementById('articleEditIndex').value = idx;
    document.getElementById('artIcon').value = art.icon || '📰';
    document.getElementById('artTitle').value = art.title || '';
    document.getElementById('artDate').value = art.date || '';
    document.getElementById('artText').value = art.text || '';
    const img = art.image || '';
    const imgData = document.getElementById('artImageData');
    const imgUrl = document.getElementById('artImageUrl');
    if (imgData) imgData.value = (img.indexOf('data:') === 0) ? img : '';
    if (imgUrl) imgUrl.value = (img.indexOf('data:') === 0) ? '' : img;
    updateArtPreview();
    const fontSel = document.getElementById('artFontSize');
    if (fontSel) fontSel.value = art.fontSize || 'normal';
    const tc = art.textColor || 'auto';
    const colorHidden = document.getElementById('artTextColor');
    const colorCustom = document.getElementById('artTextColorCustom');
    if (colorHidden && colorCustom) {
        if (tc === 'auto' || ARTICLE_COLORS.some(c => c.value === tc)) {
            colorHidden.value = tc;
        } else if (tc.indexOf('#') === 0) {
            colorHidden.value = 'custom';
            colorCustom.value = tc;
        } else {
            colorHidden.value = 'auto';
        }
        initArticleColorSwatches();
    }
    const sel = document.getElementById('artTag');
    if (sel) sel.value = art.tag || '';
    const btn = document.getElementById('addArticleBtn');
    if (btn) btn.innerHTML = '💾 حفظ التعديلات';
    const title = document.getElementById('articleFormTitle');
    if (title) title.textContent = '✏️ تعديل مقال';
    const cancel = document.getElementById('cancelArticleEdit');
    if (cancel) cancel.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function readArticleForm() {
    const tag = document.getElementById('artTag').value;
    let textColor = document.getElementById('artTextColor').value;
    if (textColor === 'custom') {
        textColor = document.getElementById('artTextColorCustom').value;
    }
    const imgData = document.getElementById('artImageData');
    const imgUrl = document.getElementById('artImageUrl');
    const image = (imgData && imgData.value) ? imgData.value : ((imgUrl && imgUrl.value.trim()) ? imgUrl.value.trim() : '');
    return {
        id: 'a' + Date.now(),
        icon: document.getElementById('artIcon').value || '📰',
        title: document.getElementById('artTitle').value,
        date: document.getElementById('artDate').value,
        tag: tag,
        category: tag,
        text: document.getElementById('artText').value,
        excerpt: document.getElementById('artText').value,
        tagColor: colorForTag(tag),
        image: image,
        coverImage: image,
        content: '',
        status: 'published',
        tags: [],
        author: '',
        seo: {
            seoTitle: document.getElementById('artTitle').value,
            metaDescription: document.getElementById('artText').value.slice(0, 160),
            focusKeyword: '',
            slug: '',
            keywords: '',
            ogImage: image
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fontSize: document.getElementById('artFontSize').value || 'normal',
        textColor: textColor
    };
}

const addArticleBtn = document.getElementById('addArticleBtn');
if (addArticleBtn) {
    addArticleBtn.addEventListener('click', () => {
        const art = readArticleForm();
        if (!art.title.trim()) {
            showDashToast('أدخل عنوان المقال أولاً.', true);
            return;
        }
        const editIdx = document.getElementById('articleEditIndex').value;
        if (editIdx !== '') {
            data.news[Number(editIdx)] = art;
            showDashToast('تم حفظ التعديلات ✓');
        } else {
            data.news.push(art);
            showDashToast('تم نشر المقال ✓');
        }
        cancelArticleEdit();
        populateArticles();
        updateOverview();
        save();
    });
}

const cancelArticleEditBtn = document.getElementById('cancelArticleEdit');
if (cancelArticleEditBtn) {
    cancelArticleEditBtn.addEventListener('click', () => {
        cancelArticleEdit();
    });
}

// ===== صورة المقال (معاينة + رفع + إزالة) =====
function updateArtPreview() {
    const preview = document.getElementById('artImgPreview');
    const removeBtn = document.getElementById('artImageRemove');
    if (!preview) return;
    const imgData = document.getElementById('artImageData');
    const imgUrl = document.getElementById('artImageUrl');
    const src = (imgData && imgData.value) ? imgData.value : ((imgUrl && imgUrl.value.trim()) ? imgUrl.value.trim() : '');
    if (src) {
        preview.innerHTML = `<img src="${escapeHtml(src)}" alt="معاينة" onerror="this.innerHTML='<span class=&quot;shop-thumb-empty&quot;>رابط غير صالح</span>'">`;
        if (removeBtn) removeBtn.style.display = '';
    } else {
        preview.innerHTML = '<span class="shop-thumb-empty">لا صورة</span>';
        if (removeBtn) removeBtn.style.display = 'none';
    }
}

const artImageUpload = document.getElementById('artImageUpload');
if (artImageUpload) {
    artImageUpload.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.size > 1024 * 1024 * 4) {
            showDashToast('الصورة كبيرة جداً — اختر صورة أقل من 4MB.', true);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            compressImage(reader.result, (compressed) => {
                const imgUrl = document.getElementById('artImageUrl');
                const imgData = document.getElementById('artImageData');
                if (imgUrl) imgUrl.value = '';
                if (imgData) imgData.value = compressed;
                updateArtPreview();
                showDashToast('تم رفع صورة المقال بنجاح ✓');
            });
        };
        reader.readAsDataURL(file);
    });
}

const artImageUrl = document.getElementById('artImageUrl');
if (artImageUrl) {
    artImageUrl.addEventListener('input', () => {
        updateArtPreview();
    });
}

const artImageRemove = document.getElementById('artImageRemove');
if (artImageRemove) {
    artImageRemove.addEventListener('click', () => {
        const imgUrl = document.getElementById('artImageUrl');
        const imgData = document.getElementById('artImageData');
        if (imgUrl) imgUrl.value = '';
        if (imgData) imgData.value = '';
        updateArtPreview();
    });
}

// ===== رفع صورة مباشرة داخل قائمة المقالات =====
const articlesEditorEl = document.getElementById('articlesEditor');
if (articlesEditorEl) {
    articlesEditorEl.addEventListener('change', (e) => {
        const uploadInput = e.target.closest('[data-art-upload]');
        if (!uploadInput) return;
        const file = uploadInput.files && uploadInput.files[0];
        if (!file) return;
        if (file.size > 1024 * 1024 * 4) {
            showDashToast('الصورة كبيرة جداً — اختر صورة أقل من 4MB.', true);
            return;
        }
        const idx = Number(uploadInput.getAttribute('data-art-upload'));
        const reader = new FileReader();
        reader.onload = () => {
            compressImage(reader.result, (compressed) => {
                data.news[idx].image = compressed;
                save();
                populateArticles();
                showDashToast('تم رفع صورة المقال بنجاح ✓');
            });
        };
        reader.readAsDataURL(file);
    });
}

// ===== ألوان نص المقال في نموذج الكتابة =====
function initArticleColorSwatches() {
    const wrap = document.getElementById('artColorSwatches');
    const hidden = document.getElementById('artTextColor');
    if (!wrap || !hidden) return;
    const customInput = document.getElementById('artTextColorCustom');
    const v = hidden.value;
    wrap.querySelectorAll('.swatch').forEach(s => {
        s.classList.toggle('active', s.dataset.color === v);
    });
    if (customInput) {
        customInput.classList.toggle('active', v === 'custom');
        if (v !== 'auto' && v.indexOf('#') === 0) customInput.value = v;
    }
}

(function initArticleColorEvents() {
    const wrap = document.getElementById('artColorSwatches');
    const hidden = document.getElementById('artTextColor');
    const customInput = document.getElementById('artTextColorCustom');
    if (!wrap || !hidden) return;
    wrap.querySelectorAll('.swatch').forEach(s => {
        s.addEventListener('click', () => {
            hidden.value = s.dataset.color;
            initArticleColorSwatches();
        });
    });
    if (customInput) {
        customInput.addEventListener('input', () => {
            hidden.value = customInput.value;
            initArticleColorSwatches();
        });
    }
})();

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
    const btn = e.target.closest ? e.target.closest('[data-shop-del]') : null;
    if (!btn) return;
    data.shop.splice(Number(btn.getAttribute('data-shop-del')), 1);
    populateShop();
    save();
});

// ===== مسح الرسائل =====
document.getElementById('clearMessages').addEventListener('click', () => {
    if (!confirm('سيتم مسح جميع الرسائل. هل أنت متأكد؟')) return;
    data.messages = [];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    populateMessages();
    if (window.AhlStorage) AhlStorage.save(data);
});

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

// ===== تصدير واستيراد البيانات =====
function exportData() {
    const d = loadData();
    d.contentVersion = defaultData.contentVersion;
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ahl-mhmed-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    showDashToast('تم تصدير البيانات بنجاح ✓');
}

function importDataFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const imported = JSON.parse(reader.result);
            if (!imported || typeof imported !== 'object' || typeof imported.siteName !== 'string') {
                showDashToast('الملف غير صالح — تأكد أنه ملف تصدير من اللوحة.', true);
                return;
            }
            imported.contentVersion = defaultData.contentVersion;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
            if (window.AhlStorage) AhlStorage.save(imported);
            showDashToast('تم استيراد البيانات بنجاح ✓');
            setTimeout(() => window.location.reload(), 1200);
        } catch (err) {
            showDashToast('تعذّر قراءة الملف.', true);
        }
    };
    reader.readAsText(file);
}

const exportBtn = document.getElementById('exportBtn');
if (exportBtn) exportBtn.addEventListener('click', exportData);

const importFile = document.getElementById('importFile');
if (importFile) {
    importFile.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!window.confirm('سيتم استبدال بيانات هذا المتصفح ببيانات الملف. متابعة؟')) {
            e.target.value = '';
            return;
        }
        importDataFile(file);
        e.target.value = '';
    });
}

// ===== بدء التشغيل =====
const seoDescEl = document.getElementById('seoDesc');
if (seoDescEl) seoDescEl.addEventListener('input', updateSeoDashboardCounters);

function setCloudStatus() {
    const el = document.getElementById('cloudStatus');
    if (!el) return;
    const ok = window.AhlStorage && AhlStorage.connected();
    if (ok) {
        el.textContent = '🟢 التخزين السحابي مفعّل — التعديلات تُحفظ وتظهر لجميع الزوار.';
        el.className = 'cloud-status cloud-ok';
    } else {
        el.textContent = '🔴 التخزين السحابي غير متاح — الحفظ محلي فقط في هذا المتصفح. بعد رفع الموقع للاستضافة افتح api/save.php?status=1 في المتصفح لفحص الصلاحيات.';
        el.className = 'cloud-status cloud-off';
    }
}

function bootDashboard() {
    populateForms();
    if (window.AhlStorage) {
        AhlStorage.visits().then(function (v) {
            if (v) {
                visitsInfo.total = v.total || 0;
                visitsInfo.today = v.today || 0;
                visitsInfo.countries = v.countries || {};
                updateOverview();
            }
        });
        AhlStorage.load().then(function (remote) {
            if (remote && typeof remote.contentVersion !== 'undefined') {
                data = remote;
                applyDefaults();
                populateForms();
            }
            setCloudStatus();
        });
    } else {
        setCloudStatus();
    }
}

bootDashboard();

// ===== تحليلات الزوار (iframe مدمج) =====
(function analyticsIntegration() {
    const ANALYTICS_URL = 'analytics/index.html';
    const frame = document.getElementById('analyticsFrame');
    if (!frame) return;

    const currentTheme = () => document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    function postToAnalytics(msg) {
        try {
            if (frame.contentWindow) frame.contentWindow.postMessage(msg, '*');
        } catch (e) {
            /* تجاهل */
        }
    }

    function loadAnalytics() {
        frame.src = ANALYTICS_URL + '?theme=' + currentTheme() + '&t=' + Date.now();
    }

    // إعادة التحميل عند فتح قسم التحليلات لكي تُرسم الرسوم البيانية بشكل صحيح
    const analyticsNav = document.querySelector('.dash-nav-item[data-view="analytics"]');
    if (analyticsNav) analyticsNav.addEventListener('click', loadAnalytics);

    // مزامنة الوضع الليلي مع لوحة التحليلات مباشرة دون إعادة تحميل
    function syncAnalyticsTheme() {
        postToAnalytics({ type: 'ahl-theme', theme: currentTheme() });
    }
    if ('MutationObserver' in window) {
        new MutationObserver(syncAnalyticsTheme)
            .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    window.addEventListener('load', syncAnalyticsTheme);

    // استقبال ارتفاع محتوى التحليلات لضبط حجم الإطار تلقائيًا
    window.addEventListener('message', (e) => {
        const d = e.data;
        if (!d || typeof d !== 'object') return;
        if (d.type === 'ahl-height' && Number(d.height) > 0) {
            frame.style.height = Math.min(Math.max(420, Math.ceil(d.height)), 22000) + 'px';
        }
    });

    // التحميل المبدئي عند فتح اللوحة
    loadAnalytics();
})();
