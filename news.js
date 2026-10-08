// ===== صفحة أخبار القرية — مشاركة البيانات مع الموقع =====
const STORAGE_KEY = 'ahlMhmedData';

const defaultData = {
    siteName: 'أهل محمد',
    contactPhone: '',
    contactEmail: 'info@ahlmhmed.example',
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
    const defaults = JSON.parse(JSON.stringify(defaultData));
    d = Object.assign({}, defaults, d);
    if (!d.nav || typeof d.nav !== 'object') d.nav = defaults.nav;
    if (!Array.isArray(d.nav.top)) d.nav.top = defaults.nav.top;
    if (d.nav.top.join(',') === 'home,about,services,religion,shop,contact') d.nav.top = defaults.nav.top;
    if (!d.nav.branches || typeof d.nav.branches !== 'object') d.nav.branches = defaults.nav.branches;
    if (!Array.isArray(d.nav.branches.about)) d.nav.branches.about = defaults.nav.branches.about;
    if (!Array.isArray(d.nav.branches.religion)) d.nav.branches.religion = defaults.nav.branches.religion;
    if (!Array.isArray(d.news)) d.news = defaults.news;
    if (!d.newsAbout || typeof d.newsAbout !== 'object') d.newsAbout = defaults.newsAbout;
    if (!Array.isArray(d.newsAbout.lead)) d.newsAbout.lead = defaults.newsAbout.lead;
    if (!Array.isArray(d.newsAbout.items)) d.newsAbout.items = defaults.newsAbout.items;
    return d;
}

const TAG_CLASS = {
    primary: 'n-primary',
    teal: 'n-teal',
    gold: 'n-gold',
    primary_dark: 'n-primary'
};

function applyBrand() {
    const d = getData();
    document.title = 'أخبار القرية — ' + d.siteName;
    const logos = document.querySelectorAll('.logo-text');
    logos.forEach(el => { if (el) el.textContent = d.siteName; });
    const footBrands = document.querySelectorAll('#footBrand');
    footBrands.forEach(el => { if (el) el.textContent = d.siteName; });
    if (document.getElementById('footEmail')) document.getElementById('footEmail').textContent = d.contactEmail || 'info@ahlmhmed.example';
    const footYear = document.getElementById('footYear');
    if (footYear) footYear.textContent = '2026';
}

function renderNews() {
    const d = getData();
    const box = document.getElementById('newsGrid');
    if (!box) return;
    const all = (d.news && d.news.length ? d.news : []).filter(n => (n.status || 'published') !== 'draft');
    const limit = box.closest('.news-section') ? 3 : all.length;
    const list = all.slice(0, limit);
    box.innerHTML = list.map(n => {
        const fs = (n.fontSize && ['small', 'normal', 'large', 'xlarge'].indexOf(n.fontSize) !== -1) ? n.fontSize : 'normal';
        const tc = (n.textColor && n.textColor !== 'auto') ? ` style="color:${escapeHtml(n.textColor)}"` : '';
        const cover = n.coverImage || n.image;
        const excerpt = n.excerpt || n.text || '';
        const hasFull = !!n.content;
        return `<article class="news-card ${TAG_CLASS[n.tagColor] || TAG_CLASS.primary}">
            <div class="news-head">
                <span class="news-icon">${escapeHtml(n.icon || '📰')}</span>
                <span class="news-tag">${escapeHtml(n.tag || 'خبر')}</span>
            </div>
            ${cover ? `<div class="news-img"><img src="${escapeHtml(cover)}" alt="${escapeHtml(n.title || 'صورة مقال')}" loading="lazy"></div>` : ''}
            <div class="news-body">
                <time class="news-date"><i class="fas fa-calendar-alt"></i> ${escapeHtml(n.date || '')}</time>
                <h3>${escapeHtml(n.title || '')}</h3>
                <p class="news-text news-text-${fs}"${tc}>${escapeHtml(excerpt)}</p>
                ${hasFull ? `<button type="button" class="news-more" data-open-article="${escapeHtml(n.id || '')}">اقرأ المزيد ⟵</button>` : ''}
            </div>
        </article>`;
    }).join('') || '<p style="grid-column:1/-1;text-align:center;color:#888">لا توجد أخبار بعد.</p>';

    const modal = document.getElementById('articleModal');
    if (modal) {
        modal.querySelectorAll('[data-open-article]').forEach(btn => {
            btn.addEventListener('click', () => openArticle(btn.dataset.openArticle));
        });
    }
}

function renderNewsAbout() {
    const d = getData();
    const a = d.newsAbout || {};
    const head = document.getElementById('newsAboutHead');
    if (head) head.textContent = a.heading || 'أخبار القرية';
    const lead = document.getElementById('newsAboutLead');
    if (lead) {
        lead.innerHTML = (a.lead || []).map(p => `<p>${escapeHtml(p)}</p>`).join('') ||
            '<p>مرحبًا بكم في قسم أخبار القرية.</p>';
    }
    const items = document.getElementById('newsAboutItems');
    if (items) {
        items.innerHTML = (a.items || []).map(it =>
            `<div class="news-about-item">
                <span class="news-about-icon">${escapeHtml(it.icon || '📌')}</span>
                <h4>${escapeHtml(it.title || '')}</h4>
                <p>${escapeHtml(it.text || '')}</p>
            </div>`
        ).join('') || '';
    }
    const foot = document.getElementById('newsAboutFoot');
    if (foot) foot.textContent = a.foot || '';
}

// ===== قراءة مقال كامل داخل نافذة منبثقة =====
function openArticle(id) {
    const d = getData();
    const art = (d.news || []).find(n => n.id === id && (n.status || 'published') !== 'draft');
    const modal = document.getElementById('articleModal');
    if (!art || !modal) return;
    const body = sanitizeHtml(art.content) || `<p>${escapeHtml(art.excerpt || art.text || '')}</p>`;
    document.getElementById('articleModalBody').innerHTML =
        (art.coverImage ? `<div class="article-hero"><img src="${escapeHtml(art.coverImage)}" alt="${escapeHtml(art.title || '')}" loading="lazy" decoding="async"></div>` : '') +
        `<div class="article-meta"><span class="article-badge">${escapeHtml(art.category || art.tag || 'خبر')}</span>` +
        `<span>📅 ${escapeHtml(art.date || '')}</span>` +
        (art.author ? `<span>✍️ ${escapeHtml(art.author)}</span>` : '') +
        (art.wordCount ? `<span>⏱ ${Math.max(1, Math.round(art.wordCount / 180))} د قراءة</span>` : '') +
        `</div><h1 class="article-title">${escapeHtml(art.title || '')}</h1>` +
        `<div class="article-body">${body}</div>`;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeArticle() {
    const modal = document.getElementById('articleModal');
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
}

function initArticleModal() {
    const modal = document.getElementById('articleModal');
    if (!modal) return;
    const closeBtn = document.getElementById('articleModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeArticle);
    modal.addEventListener('click', e => { if (e.target === modal) closeArticle(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeArticle(); });
}

applyBrand();
function bootNews() {
    renderNews();
    renderNewsAbout();
    if (window.AhlStorage) {
        AhlStorage.load().then(function (remote) {
            if (remote && typeof remote.contentVersion !== 'undefined') {
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify(remote)); } catch (e) {}
                renderNews();
                renderNewsAbout();
            }
        });
    }
}
bootNews();
initArticleModal();

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