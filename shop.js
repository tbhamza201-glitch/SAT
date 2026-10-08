// ===== مشاركة البيانات مع الموقع ولوحة التحكم =====
const STORAGE_KEY = 'ahlMhmedData';

const defaultData = {
    siteName: 'أهل محمد',
    siteTagline: 'قرية أهل محمد — رأس عين عميروش، معسكر، الجزائر',
    contactPhone: '',
    contactEmail: 'info@ahlmhmed.example',
    aboutP1: 'أهل محمد قرية جزائرية تتبع إدارياً لبلدية رأس عين عميروش، دائرة عقاز، ولاية معسكر. أراضي القرية بين منبسطة وشبه جبلية، بالإضافة إلى الطريق البلدي المتجه نحو قرية عقاز وأهل العيد.',
    aboutP2: 'تضم القرية مدرسة لتعليم القرآن الكريم، ومصلحة صحية، ومدرسة ابتدائية، وملحقة بلدية، وملعب جواري، وبيت للشباب مع مقهى. قرية تجمع بين الأصالة والعراقة، يحفظ أهلها تراثهم الجميل ويجتهدون في بناء مستقبل مشرق.',
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
    hadith: [
        { text: 'مَن سَلَكَ طريقاً يَلتَمِسُ فيه عِلماً، سَهَّلَ اللهُ له به طريقاً إلى الجَنَّةِ.', source: 'رواه مسلم', topic: 'طلب العلم' },
        { text: 'لا يؤمِنُ أحدُكم حتى يُحِبَّ لأخيه ما يُحِبُّ لنفسِه.', source: 'متفق عليه', topic: 'الإيمان' },
        { text: 'إنما الأعمالُ بالنِّيَّاتِ، وإنما لكلِّ امرئٍ ما نوى.', source: 'متفق عليه', topic: 'النية' },
        { text: 'مَن لا يَرحَمِ الناسَ لا يَرحَمْهُ اللهُ.', source: 'متفق عليه', topic: 'الرحمة' },
        { text: 'الكلمةُ الطيِّبةُ صدقةٌ.', source: 'متفق عليه', topic: 'الكلام الطيب' },
        { text: 'الطُّهورُ شطرُ الإيمانِ، والحمدُ للهِ تملأُ الميزانَ.', source: 'رواه مسلم', topic: 'الطهارة' }
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
    nav: {
        top: ['home', 'about', 'services', 'shop', 'religion', 'contact'],
        branches: {
            about: ['news'],
            religion: []
        }
    },
    contentVersion: '29'
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
    if (d.contentVersion !== defaultData.contentVersion) {
        d = JSON.parse(JSON.stringify(defaultData));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    }
    const defaults = JSON.parse(JSON.stringify(defaultData));
    d = Object.assign({}, defaults, d);
    if (!d.nav || typeof d.nav !== 'object') d.nav = defaults.nav;
    if (!Array.isArray(d.nav.top)) d.nav.top = defaults.nav.top;
    if (d.nav.top.join(',') === 'home,about,services,religion,shop,contact') d.nav.top = defaults.nav.top;
    if (!d.nav.branches || typeof d.nav.branches !== 'object') d.nav.branches = defaults.nav.branches;
    if (!Array.isArray(d.nav.branches.about)) d.nav.branches.about = defaults.nav.branches.about;
    if (!Array.isArray(d.nav.branches.religion)) d.nav.branches.religion = defaults.nav.branches.religion;
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

// ===== تصنيف وفلترة المنتجات =====
let activeFilter = 'all';

function getProductCategory(product) {
    const text = ((product.name || '') + ' ' + (product.desc || '')).toLowerCase();
    if (text.includes('هاتف') || text.includes('سماع') || text.includes('شاحن') || text.includes('بلوتوث') || text.includes('كابل') || text.includes('إلكترون') || text.includes('غلاف') || text.includes('واط')) {
        return 'tech';
    }
    return 'natural';
}

// ===== بناء صفحة المتجر =====
function renderShop() {
    const d = getData();

    const logos = document.querySelectorAll('.logo-text');
    logos.forEach(el => { if (el) el.textContent = d.siteName; });
    if (document.getElementById('footBrand')) document.getElementById('footBrand').textContent = d.siteName;
    if (document.getElementById('footEmail') && d.contactEmail) document.getElementById('footEmail').textContent = d.contactEmail;
    const footYear = document.getElementById('footYear');
    if (footYear) footYear.textContent = '2026';

    const shopBox = document.getElementById('shopGrid');
    if (shopBox) {
        const allItems = (d.shop && d.shop.length ? d.shop : []);
        const filteredItems = allItems.filter(p => activeFilter === 'all' || getProductCategory(p) === activeFilter);

        if (filteredItems.length === 0) {
            shopBox.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#888;padding:30px">لا توجد منتجات ضمن هذا التصنيف حالياً.</p>';
        } else {
            shopBox.innerHTML = filteredItems.map((p) => {
                // نمرر الفهرس الأصلي في مصفوفة المتجر لدقة الطلب
                const originalIndex = allItems.indexOf(p);
                const cat = getProductCategory(p);
                const badge = cat === 'tech' ? 'تقني 📱' : 'طبيعي 🌿';
                return `<div class="product-card">
                    <div class="product-img">
                        <span class="product-badge">${badge}</span>
                        <img src="${p.image || ''}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none'">
                    </div>
                    <div class="product-body">
                        <h3>${escapeHtml(p.name)}</h3>
                        <p class="product-desc">${escapeHtml(p.desc || '')}</p>
                        <span class="product-price">${escapeHtml(p.price)}</span>
                        <button class="btn btn-order" data-order="${originalIndex}"><i class="fas fa-cart-plus"></i> تأكيد الطلب</button>
                    </div>
                </div>`;
            }).join('');
        }
    }
}

// أزرار فلترة المنتجات
document.querySelectorAll('.shop-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.shop-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter || 'all';
renderShop();

// ===== تطبيق ترتيب التنقل (الأقسام والفروع) =====
function applyNavOrder() {
    const d = getData();
    const nav = d.nav || {};
    const topOrder = (nav.top && nav.top.length) ? nav.top : ['home', 'about', 'services', 'shop', 'religion', 'contact'];

    const wrap = document.querySelector('.nav-links');
    if (wrap) {
        const items = Array.prototype.slice.call(wrap.querySelectorAll(':scope > [data-nav]'));
        const map = {};
        items.forEach(el => { if (el.dataset.nav) map[el.dataset.nav] = el; });
        topOrder.forEach(id => { if (map[id]) wrap.appendChild(map[id]); });
        items.forEach(el => { if (topOrder.indexOf(el.dataset.nav) === -1) wrap.appendChild(el); });
    }

    document.querySelectorAll('[data-nav-branches]').forEach(ul => {
        const key = ul.getAttribute('data-nav-branches');
        const order = (nav.branches && nav.branches[key]) ? nav.branches[key] : [];
        const items = Array.prototype.slice.call(ul.querySelectorAll(':scope > li'));
        const map = {};
        items.forEach(li => {
            const a = li.querySelector('a[data-branch]');
            if (a && a.dataset.branch) map[a.dataset.branch] = li;
        });
        order.forEach(id => { if (map[id]) ul.appendChild(map[id]); });
        items.forEach(li => {
            const a = li.querySelector('a[data-branch]');
            if (a && order.indexOf(a.dataset.branch) === -1) ul.appendChild(li);
        });
    });
}

applyNavOrder();
    });
});

// ===== قائمة الجوال =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function isMobileNav() {
    return window.matchMedia('(max-width: 900px)').matches;
}

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const opening = !navLinks.classList.contains('show');
        navLinks.classList.toggle('show');
        if (!opening) {
            document.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
        }
        menuToggle.textContent = opening ? '✕' : '☰';
        menuToggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', opening ? 'إغلاق القائمة' : 'فتح القائمة');
    });
}

// رؤوس القوائم المنسدلة: على الجوال تفتح القائمة بدل الانتقال
document.querySelectorAll('.nav-drop-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (!isMobileNav()) return;
        e.preventDefault();
        e.stopPropagation();
        const dd = toggle.closest('.dropdown');
        if (dd) {
            const wasOpen = dd.classList.contains('open');
            document.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
            if (!wasOpen) dd.classList.add('open');
        }
    });
});

// إغلاق القائمة عند الضغط على أي رابط عادي
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        if (!link.closest('.nav-drop-toggle')) {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'فتح القائمة');
                document.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
            });
        }
    });
}

// إغلاق القائمة عند الضغط خارجها
document.addEventListener('click', (e) => {
    if (!navLinks || !navLinks.classList.contains('show')) return;
    if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        navLinks.classList.remove('show');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'فتح القائمة');
        document.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
    }
});

// ===== تأكيد الطلبات =====
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
let currentOrder = null;

function parseOrderPrice(price) {
    const m = String(price || '').replace(/[,٬\.]/g, '').match(/\d+/);
    return m ? parseInt(m[0], 10) : 0;
}

function updateOrderTotal() {
    if (!currentOrder) return;
    const wrap = document.getElementById('ordTotalWrap');
    const out = document.getElementById('ordTotalValue');
    const qtyField = document.getElementById('ordQty');
    if (!wrap || !out || !qtyField) return;
    const qty = parseInt(qtyField.value, 10);
    const n = isFinite(qty) && qty > 0 ? qty : 1;
    const total = parseOrderPrice(currentOrder.price) * n;
    out.textContent = total.toLocaleString('ar-EG-u-nu-latn') + ' دج';
    wrap.hidden = false;
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-order]');
    if (!btn) return;

    const d = getData();
    const prod = (d.shop || [])[Number(btn.dataset.order)];
    if (!prod) return;

    currentOrder = prod;
    const t = document.getElementById('orderTitle');
    if (t) t.textContent = prod.name + ' — ' + prod.price;
    const unit = document.getElementById('ordUnit');
    if (unit) unit.value = prod.price;
    const qty = document.getElementById('ordQty');
    if (qty) qty.value = '1';
    updateOrderTotal();
    if (orderModal) {
        orderModal.hidden = false;
        document.body.style.overflow = 'hidden';
    }
});

const ordQtyField = document.getElementById('ordQty');
if (ordQtyField) ordQtyField.addEventListener('input', updateOrderTotal);

function closeModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(m => { m.hidden = true; document.body.style.overflow = ''; });
}

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

        const qtyNum = parseInt(qty, 10);
        const total = (isFinite(qtyNum) && qtyNum > 0) ? parseOrderPrice(currentOrder.price) * qtyNum : 0;

        const d = getData();
        if (!d.messages) d.messages = [];
        d.messages.unshift({
            name,
            email: 'طلب متجر',
            message: `طلب: ${currentOrder.name} — السعر: ${currentOrder.price} — الكمية: ${qty}${total ? ' — المجموع الكلي: ' + total.toLocaleString('ar-EG-u-nu-latn') + ' دج' : ''}${phone ? ' — الهاتف: ' + phone : ''}`,
            date: new Date().toLocaleString('ar-EG-u-nu-latn'),
            type: 'order'
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
        if (window.AhlStorage) AhlStorage.save(d);

        showToast('تم تسجيل طلبك بنجاح (' + currentOrder.name + '). سنتواصل معك قريباً.');
        orderForm.reset();
        orderModal.hidden = true;
        document.body.style.overflow = '';
    });
}

// ===== زر العودة للأعلى =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (scrollTopBtn) scrollTopBtn.classList.toggle('show', y > 400);
}

window.addEventListener('scroll', onScroll, { passive: true });
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== إشعار Toast =====
function showToast(message, isError) {
    const old = document.querySelector('.toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.className = 'toast' + (isError ? ' toast-error' : '');
    t.innerHTML = '<i class="fas ' + (isError ? 'fa-exclamation-circle' : 'fa-check-circle') + '"></i>' + message;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 500);
    }, 3500);
}

function bootShop() {
    renderShop();
    if (window.AhlStorage) {
        AhlStorage.load().then(function (remote) {
            if (remote && typeof remote.contentVersion !== 'undefined') {
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify(remote)); } catch (e) {}
                renderShop();
            }
        });
    }
}
bootShop();