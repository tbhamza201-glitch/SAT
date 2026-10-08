// ===== صفحة معالم القرية — مشاركة البيانات مع الموقع =====
const STORAGE_KEY = 'ahlMhmedData';

const defaultData = {
    siteName: 'أهل محمد',
    contactPhone: '',
    contactEmail: 'info@ahlmhmed.example',
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
    let d = JSON.parse(JSON.stringify(defaultData));
    if (raw) {
        try {
            const saved = JSON.parse(raw);
            d = Object.assign({}, d, saved);
        } catch (e) {}
    }
    if (!d.nav || typeof d.nav !== 'object') d.nav = defaultData.nav;
    if (!Array.isArray(d.nav.top)) d.nav.top = defaultData.nav.top;
    if (d.nav.top.join(',') === 'home,about,services,religion,shop,contact') d.nav.top = defaultData.nav.top;
    if (!d.nav.branches || typeof d.nav.branches !== 'object') d.nav.branches = defaultData.nav.branches;
    if (!Array.isArray(d.nav.branches.about)) d.nav.branches.about = defaultData.nav.branches.about;
    if (!Array.isArray(d.nav.branches.religion)) d.nav.branches.religion = defaultData.nav.branches.religion;
    return d;
}

function applyBrand() {
    const d = getData();
    document.title = 'معالم القرية — ' + d.siteName;
    const logos = document.querySelectorAll('.logo-text');
    logos.forEach(el => { if (el) el.textContent = d.siteName; });
    const footBrands = document.querySelectorAll('#footBrand');
    footBrands.forEach(el => { if (el) el.textContent = d.siteName; });
    if (document.getElementById('footEmail')) document.getElementById('footEmail').textContent = d.contactEmail || 'info@ahlmhmed.example';
    const footYear = document.getElementById('footYear');
    if (footYear) footYear.textContent = '2026';
}
function bootLandmarks() {
    applyBrand();
    if (window.AhlStorage) {
        AhlStorage.load().then(function (remote) {
            if (remote && typeof remote.contentVersion !== 'undefined') {
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify(remote)); } catch (e) {}
                applyBrand();
            }
        });
    }
}
bootLandmarks();

function initMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    function isMobileNav() {
        return window.matchMedia('(max-width: 900px)').matches;
    }

    toggle.addEventListener('click', () => {
        const opening = !links.classList.contains('show');
        links.classList.toggle('show');
        if (!opening) {
            links.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
        }
        toggle.textContent = opening ? '✕' : '☰';
        toggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
        toggle.setAttribute('aria-label', opening ? 'إغلاق القائمة' : 'فتح القائمة');
    });

    links.querySelectorAll('.nav-drop-toggle').forEach(tgl => {
        tgl.addEventListener('click', (e) => {
            if (!isMobileNav()) return;
            e.preventDefault();
            e.stopPropagation();
            const dd = tgl.closest('.dropdown');
            if (dd) {
                const wasOpen = dd.classList.contains('open');
                links.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
                if (!wasOpen) dd.classList.add('open');
            }
        });
    });

    links.querySelectorAll('a').forEach(link => {
        if (!link.closest('.nav-drop-toggle')) {
            link.addEventListener('click', () => {
                links.classList.remove('show');
                toggle.textContent = '☰';
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'فتح القائمة');
                links.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!links.classList.contains('show')) return;
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
            links.classList.remove('show');
            toggle.textContent = '☰';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'فتح القائمة');
            links.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
        }
    });
}

initMenu();

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