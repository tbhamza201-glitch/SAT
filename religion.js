// ===== صفحة الدين — مشاركة البيانات مع الموقع =====
const STORAGE_KEY = 'ahlMhmedData';

const defaultData = {
    siteName: 'أهل محمد',
    hadith: [
        { text: 'مَن سَلَكَ طريقاً يَلتَمِسُ فيه عِلماً، سَهَّلَ اللهُ له به طريقاً إلى الجَنَّةِ.', source: 'رواه مسلم', topic: 'طلب العلم' },
        { text: 'لا يؤمِنُ أحدُكم حتى يُحِبَّ لأخيه ما يُحِبُّ لنفسِه.', source: 'متفق عليه', topic: 'الإيمان' },
        { text: 'إنما الأعمالُ بالنِّيَّاتِ، وإنما لكلِّ امرئٍ ما نوى.', source: 'متفق عليه', topic: 'النية' },
        { text: 'مَن لا يَرحَمِ الناسَ لا يَرحَمْهُ اللهُ.', source: 'متفق عليه', topic: 'الرحمة' },
        { text: 'الكلمةُ الطيِّبةُ صدقةٌ.', source: 'متفق عليه', topic: 'الكلام الطيب' },
        { text: 'الطُّهورُ شطرُ الإيمانِ، والحمدُ للهِ تملأُ الميزانَ.', source: 'رواه مسلم', topic: 'الطهارة' },
        { text: 'المسلِمُ مَن سَلِمَ المسلمونَ من لِسانِه ويدِه.', source: 'متفق عليه', topic: 'أخلاق المسلم' },
        { text: 'مَن كان يؤمِنُ باللهِ واليومِ الآخرِ فليقُلْ خيراً أو ليصمُتْ.', source: 'متفق عليه', topic: 'حفظ اللسان' },
        { text: 'اتَّقِ اللهَ حيثُما كنتَ، وأتبِعِ السيِّئةَ الحسنةَ تَمحُها، وخالِقِ الناسَ بخُلُقٍ حَسَنٍ.', source: 'رواه الترمذي', topic: 'التقوى' },
        { text: 'خيرُكم من تعلَّمَ القرآنَ وعلَّمَه.', source: 'رواه البخاري', topic: 'فضل القرآن' },
        { text: 'مَن قرأ حرفاً من كتابِ اللهِ فله به حسنةٌ، والحسنةُ بعشرِ أمثالِها، لا أقولُ (ألم) حرفٌ، ولكن ألفٌ حرفٌ ولامٌ حرفٌ وميمٌ حرفٌ.', source: 'رواه الترمذي', topic: 'فضل القرآن' },
        { text: 'أحبُّ الأعمالِ إلى اللهِ تعالى أدومُها وإن قَلَّ.', source: 'متفق عليه', topic: 'الاستمرارية' },
        { text: 'الدعاءُ هو العبادةُ.', source: 'رواه الترمذي', topic: 'الدعاء' },
        { text: 'الجنةُ تحتَ أقدامِ الأمهاتِ.', source: 'رواه النسائي', topic: 'بر الوالدين' },
        { text: 'عليكم بالصِّدقِ؛ فإنَّ الصِّدقَ يهدي إلى البِرِّ، وإنَّ البِرَّ يهدي إلى الجنةِ، وما يزالُ الرجلُ يصدُقُ ويَتحرَّى الصِّدقَ حتى يُكتَبَ عندَ اللهِ صِدِّيقاً.', source: 'متفق عليه', topic: 'الصدق' },
        { text: 'تبسُّمُك في وجهِ أخيك لك صدقةٌ.', source: 'رواه الترمذي', topic: 'الإحسان' },
        { text: 'المؤمنُ القويُّ خيرٌ وأحبُّ إلى اللهِ من المؤمنِ الضعيفِ، وفي كلٍّ خيرٌ.', source: 'رواه مسلم', topic: 'القوة' },
        { text: 'ما نقصتْ صدقةٌ من مالٍ، وما زادَ اللهُ عبداً بعفوٍ إلا عزّاً.', source: 'رواه مسلم', topic: 'الصدقة' },
        { text: 'يسِّروا ولا تُعسِّروا، وبشِّروا ولا تُنفِّروا.', source: 'متفق عليه', topic: 'التيسير' },
        { text: 'مَن كان في حاجةِ أخيه كان اللهُ في حاجتِه.', source: 'متفق عليه', topic: 'قضاء الحوائج' },
        { text: 'انظُروا إلى من هو أسفلُ منكم ولا تنظُروا إلى من هو فوقَكم؛ فإنَّه أجدرُ ألَّا تزدروا نعمةَ اللهِ عليكم.', source: 'رواه مسلم', topic: 'القناعة' },
        { text: 'أفضلُ الأعمالِ الصلاةُ على وقتِها، وبرُّ الوالدينِ، والجهادُ في سبيلِ اللهِ.', source: 'متفق عليه', topic: 'الصلاة' },
        { text: 'الحياءُ لا يأتي إلا بخيرٍ.', source: 'متفق عليه', topic: 'الحياء' }
    ],
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
    const defaults = JSON.parse(JSON.stringify(defaultData));
    d = Object.assign({}, defaults, d);
    if (!d.nav || typeof d.nav !== 'object') d.nav = defaults.nav;
    if (!Array.isArray(d.nav.top)) d.nav.top = defaults.nav.top;
    if (d.nav.top.join(',') === 'home,about,services,religion,shop,contact') d.nav.top = defaults.nav.top;
    if (!d.nav.branches || typeof d.nav.branches !== 'object') d.nav.branches = defaults.nav.branches;
    if (!Array.isArray(d.nav.branches.about)) d.nav.branches.about = defaults.nav.branches.about;
    if (!Array.isArray(d.nav.branches.religion)) d.nav.branches.religion = defaults.nav.branches.religion;
    if (Array.isArray(d.hadith)) {
        const seen = new Set(d.hadith.map(h => h.text));
        defaults.hadith.forEach(h => {
            if (!seen.has(h.text)) d.hadith.push(JSON.parse(JSON.stringify(h)));
        });
    } else {
        d.hadith = defaults.hadith;
    }
    return d;
}

function renderHadith() {
    const d = getData();
    document.title = 'الدين — ' + d.siteName;
    const logos = document.querySelectorAll('.logo-text');
    logos.forEach(el => { if (el) el.textContent = d.siteName; });
    const footBrands = document.querySelectorAll('#footBrand');
    footBrands.forEach(el => { if (el) el.textContent = d.siteName; });
    if (document.getElementById('footEmail')) document.getElementById('footEmail').textContent = d.contactEmail || 'info@ahlmhmed.example';
    const footYear = document.getElementById('footYear');
    if (footYear) footYear.textContent = '2026';

    const box = document.getElementById('hadithGrid');
    if (box) {
        const list = (d.hadith && d.hadith.length ? d.hadith : []);
        box.innerHTML = list.map(h =>
            `<div class="hadith-card">
                <div class="hadith-topic">${escapeHtml(h.topic || '')}</div>
                <p class="hadith-text">${escapeHtml(h.text || '')}</p>
                <span class="hadith-source">${escapeHtml(h.source || '')}</span>
            </div>`
        ).join('') || '<p style="grid-column:1/-1;text-align:center;color:#888">لا توجد أحاديث بعد.</p>';
    }
}

renderHadith();
function bootReligion() {
    renderHadith();
    if (window.AhlStorage) {
        AhlStorage.load().then(function (remote) {
            if (remote && typeof remote.contentVersion !== 'undefined') {
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify(remote)); } catch (e) {}
                renderHadith();
            }
        });
    }
}
bootReligion();

// ===== فهرس سور القرآن الكريم (اقرأ واستمع) =====
const SURAH_LIST_URL = 'https://api.alquran.cloud/v1/surah';
const SURAH_TEXT_BASE = 'https://api.alquran.cloud/v1/surah/{N}/quran-uthmani';
const RECITERS_URL = 'https://api.alquran.cloud/v1/edition?format=audio';
const QURAN_BARS = '<span class="q-eq" aria-hidden="true"><span></span><span></span><span></span></span>';
const surahGridEl = document.getElementById('surahGrid');
const surahSearchEl = document.getElementById('surahSearch');
const surahCountEl = document.getElementById('surahCount');
const surahReaderEl = document.getElementById('surahReader');
const surahReaderBody = document.getElementById('surahReaderBody');
const surahReaderNum = document.getElementById('surahReaderNum');

let cachedSurahs = null;
let cachedTexts = {};
let surahOffsets = {};
let currentSurahNumber = 0;
let currentSurahAudio = null;
let currentSurahPlayBtn = null;
let currentReciterId = 'ar.alafasy';
let surahFilter = 'all';
let reciterNames = { 'ar.alafasy': 'مشاري راشد العفاسي', 'ar.saadghamdi': 'سعد الغامدي', 'ar.islamsabh': 'إسلام صبحي' };
let currentSurahMeta = null;
const surahEmptyEl = document.getElementById('surahEmpty');

const reciterPickers = [];
[{ pid: 'surahReciterPicker', nid: 'surahReciterName' }, { pid: 'surahReaderReciterPicker', nid: 'surahReaderReciterName' }].forEach(cfg => {
    const box = document.getElementById(cfg.pid);
    if (box) reciterPickers.push({ box, nameEl: document.getElementById(cfg.nid) });
});
let reciterList = [];

const SURAH_MODE_RECITERS = {
    'ar.saadghamdi': {
        base: 'https://server7.mp3quran.net/s_gmd/',
        missing: {},
        weird: {}
    },
    'ar.islamsabh': {
        base: 'https://archive.org/download/002_20221103_202211/',
        missing: { 9: 1, 16: 1, 22: 1, 28: 1, 33: 1, 37: 1, 40: 1, 45: 1, 65: 1, 69: 1, 112: 1 },
        weird: { 105: 1, 113: 1 }
    }
};

function surahReciterInfo(id) {
    return (id && SURAH_MODE_RECITERS[id]) ? SURAH_MODE_RECITERS[id] : null;
}

function surahFileUrl(number) {
    const info = surahReciterInfo(currentReciterId);
    if (!info) return '';
    let name = String(number).padStart(3, '0');
    if (info.weird && info.weird[number]) name += '?';
    return info.base + encodeURIComponent(name + '.mp3');
}

function flashReaderNote(text) {
    const metaEl = document.getElementById('surahReaderMeta');
    if (!metaEl) return;
    metaEl.textContent = text;
    clearTimeout(flashReaderNote._t);
    flashReaderNote._t = setTimeout(refreshReaderMeta, 3200);
}

function ayahAudioUrl(key, lowBitrate) {
    return 'https://cdn.islamic.network/quran/audio/' + (lowBitrate ? '64' : '128') + '/' + currentReciterId + '/' + key + '.mp3';
}

function stopSurahAudio() {
    if (currentSurahAudio) {
        currentSurahAudio.pause();
        currentSurahAudio = null;
    }
    if (currentSurahPlayBtn) {
        currentSurahPlayBtn.classList.remove('playing');
        currentSurahPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        currentSurahPlayBtn = null;
    }
}

function playSurah(btn, number, ayahs) {
    stopSurahAudio();

    if (surahReciterInfo(currentReciterId)) {
        const info = surahReciterInfo(currentReciterId);
        if (info.missing && info.missing[number]) {
            flashReaderNote('لم يُسجّل القارئ ' + reciterDisplayName(currentReciterId) + ' سورة ' + number + ' كاملة. جرّب قارئًا آخر.');
            return;
        }
        const audio = new Audio();
        currentSurahAudio = audio;
        currentSurahPlayBtn = btn;
        btn.classList.add('playing');
        btn.innerHTML = QURAN_BARS;
        audio.src = surahFileUrl(number);
        audio.play().catch(() => {
            if (currentSurahAudio !== audio) return;
            stopSurahAudio();
            flashReaderNote('تعذّر تشغيل التلاوة. تحقق من الاتصال وأعد المحاولة.');
        });
        audio.addEventListener('ended', () => { if (currentSurahAudio === audio) stopSurahAudio(); });
        audio.addEventListener('error', () => {
            if (currentSurahAudio !== audio) return;
            stopSurahAudio();
            flashReaderNote('تعذّر تحميل التلاوة. تحقق من الاتصال.');
        });
        return;
    }

    const first = (surahOffsets[number] != null ? surahOffsets[number] : 0) + 1;
    const keys = [];
    for (let k = 0; k < ayahs; k++) keys.push(first + k);
    if (!keys.length) return;

    const audio = new Audio();
    currentSurahAudio = audio;
    currentSurahPlayBtn = btn;
    btn.classList.add('playing');
    btn.innerHTML = QURAN_BARS;
    let i = 0;
    let tryLow = false;
    let busy = false;

    function next() {
        if (currentSurahAudio !== audio) return;
        if (i >= keys.length) { stopSurahAudio(); return; }
        busy = false;
        audio.src = ayahAudioUrl(keys[i], tryLow);
        audio.play().catch(() => { if (!busy) fail(); });
    }

    function fail() {
        if (currentSurahAudio !== audio || busy) return;
        busy = true;
        if (!tryLow) { tryLow = true; next(); }
        else { tryLow = false; i++; next(); }
    }

    audio.addEventListener('ended', () => { busy = true; tryLow = false; i++; next(); });
    audio.addEventListener('error', fail);
    next();
}

function applySurahFilter(list) {
    if (!list) return list;
    if (surahFilter === 'all') return list;
    return list.filter(s => s.type === surahFilter);
}

function setActiveSurah(number) {
    if (!surahGridEl) return;
    surahGridEl.querySelectorAll('.surah-chip.active').forEach(el => el.classList.remove('active'));
    if (!number) return;
    const row = surahGridEl.querySelector('.surah-chip[data-number="' + number + '"]');
    if (row) row.classList.add('active');
}

function renderSurahList(list) {
    if (!surahGridEl) return;
    if (!list) list = [];
    const shown = applySurahFilter(list);
    if (!shown.length) {
        surahGridEl.innerHTML = '<p class="surahs-loading">لا توجد نتائج مطابقة.</p>';
        return;
    }
    surahGridEl.innerHTML = shown.map(s =>
        `<button type="button" class="surah-chip surah-row" data-number="${s.number}" data-name="${escapeHtml(s.name)}">
            <span class="surah-num">${s.number}</span>
            <span class="surah-name-ar">${escapeHtml(s.name)}</span>
            <span class="surah-ayahs">${s.ayahs} آية · ${s.type === 'Meccan' ? 'مكية' : 'مدنية'}</span>
        </button>`
    ).join('');
    setActiveSurah(currentSurahNumber);
}

function loadSurahList() {
    if (!surahGridEl) return;
    if (cachedSurahs) {
        renderSurahList(cachedSurahs);
        if (surahCountEl) surahCountEl.textContent = 'عدد السور: ' + cachedSurahs.length;
        return;
    }
    surahGridEl.innerHTML = '<p class="surahs-loading"><i class="fas fa-spinner fa-spin"></i> جارٍ تحميل سور القرآن الكريم…</p>';
    fetch(SURAH_LIST_URL)
        .then(r => { if (!r.ok) throw new Error('bad request'); return r.json(); })
        .then(json => {
            if (!json || !json.data || !Array.isArray(json.data)) throw new Error('bad data');
            cachedSurahs = json.data.map(s => ({
                number: s.number,
                name: s.name,
                translation: s.englishNameTranslation,
                ayahs: s.numberOfAyahs,
                type: s.revelationType
            }));
            surahOffsets = {};
            let acc = 0;
            json.data.forEach(s => { surahOffsets[s.number] = acc; acc += s.numberOfAyahs; });
            renderSurahList(cachedSurahs);
            if (surahCountEl) surahCountEl.textContent = 'عدد السور: ' + cachedSurahs.length;
        })
        .catch(() => {
            surahGridEl.innerHTML = '<p class="surahs-loading">تعذّر تحميل السور. تأكد من اتصال الإنترنت ثم أعد المحاولة.</p>';
        });
}

if (surahSearchEl) {
    surahSearchEl.addEventListener('input', () => {
        if (!cachedSurahs) return;
        const q = surahSearchEl.value.trim();
        const n = parseInt(q, 10);
        const filtered = cachedSurahs.filter(s =>
            (!isNaN(n) && s.number === n) ||
            s.name.indexOf(q) !== -1 ||
            (s.translation && s.translation.indexOf(q) !== -1)
        );
        renderSurahList(filtered);
    });
}

function reciterDisplayName(id) {
    return reciterNames[id] || (id === 'ar.alafasy' ? 'مشاري راشد العفاسي' : id);
}

function refreshReaderMeta() {
    const metaEl = document.getElementById('surahReaderMeta');
    if (!metaEl || !currentSurahMeta) return;
    const m = currentSurahMeta;
    metaEl.innerHTML = (m.type === 'Meccan' ? 'مكية' : 'مدنية') + ' — ' + m.ayahs + ' آية · القارئ: ' + escapeHtml(reciterDisplayName(currentReciterId));
}

function refreshReciterUI() {
    const curEl = document.getElementById('currentReciterName');
    if (curEl) curEl.textContent = 'القارئ: ' + reciterDisplayName(currentReciterId);
    reciterPickers.forEach(p => {
        if (p.nameEl) p.nameEl.textContent = reciterDisplayName(currentReciterId);
        const menu = p.box ? p.box.querySelector('.quran-reciter-menu') : null;
        if (menu) menu.querySelectorAll('.quran-reciter-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.id === currentReciterId);
        });
    });
    refreshReaderMeta();
}

function applyReciterChange() {
    refreshReciterUI();
    if (currentSurahAudio) {
        const playBtn = document.getElementById('surahReaderPlay');
        const n = parseInt(playBtn.dataset.surah, 10);
        const s = cachedSurahs ? cachedSurahs.find(x => x.number === n) : null;
        playSurah(playBtn, n, s ? s.ayahs : 0);
    }
}

function loadReciters() {
    if (!reciterPickers.length) return;
    fetch(RECITERS_URL)
        .then(r => { if (!r.ok) throw new Error('bad request'); return r.json(); })
        .then(json => {
            const raw = (Array.isArray(json.data) ? json.data : []).filter(e =>
                e && e.type === 'audio' && typeof e.identifier === 'string' && e.identifier.indexOf('ar.') === 0
            );
            const seen = new Set();
            const clean = [];
            raw.forEach(e => {
                const key = e.identifier.replace(/-2$/, '');
                if (!seen.has(key)) { seen.add(key); clean.push(e); }
            });
            clean.unshift(
                { identifier: 'ar.saadghamdi', name: 'سعد الغامدي', englishName: 'Saad Al-Ghamdi' },
                { identifier: 'ar.islamsabh', name: 'إسلام صبحي', englishName: 'Islam Sobhi' }
            );

            const sorted = clean.slice().sort((a, b) => {
                if (a.identifier === 'ar.alafasy') return -1;
                if (b.identifier === 'ar.alafasy') return 1;
                return (a.englishName || '').localeCompare(b.englishName || '');
            });
            sorted.forEach(e => {
                reciterNames[e.identifier] = e.name || e.englishName || e.identifier;
            });
            reciterList = sorted.map(e => ({
                identifier: e.identifier,
                name: e.name || e.englishName || e.identifier
            }));
            populatePickMenus();
            refreshReciterUI();
        })
        .catch(() => {});
}

function populatePickMenus() {
    reciterPickers.forEach(p => {
        if (!p.box) return;
        const menu = p.box.querySelector('.quran-reciter-menu');
        if (!menu) return;
        menu.innerHTML = reciterList.map(r =>
            '<li role="option" aria-selected="' + (r.identifier === currentReciterId ? 'true' : 'false') + '"' +
            ' class="quran-reciter-option' + (r.identifier === currentReciterId ? ' active' : '') + '" data-id="' + escapeHtml(r.identifier) + '">' +
            '<span class="quran-reciter-option-name">' + escapeHtml(r.name) + '</span>' +
            '<i class="fas fa-check" aria-hidden="true"></i>' +
            '</li>'
        ).join('');
    });
}

function closeAllPickers() {
    document.querySelectorAll('.quran-reciter.open').forEach(b => {
        b.classList.remove('open');
        const t = b.querySelector('.quran-reciter-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
    });
}

document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.quran-reciter-trigger');
    if (trigger) {
        const box = trigger.closest('.quran-reciter');
        const wasOpen = box.classList.contains('open');
        closeAllPickers();
        if (!wasOpen) {
            box.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
        }
        return;
    }
    const opt = e.target.closest('.quran-reciter-option');
    if (opt) {
        currentReciterId = opt.dataset.id || 'ar.alafasy';
        closeAllPickers();
        applyReciterChange();
        return;
    }
    closeAllPickers();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllPickers();
});

const surahFiltersWrap = document.getElementById('surahFilters');
if (surahFiltersWrap) {
    surahFiltersWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.quran-filter');
        if (!btn) return;
        surahFiltersWrap.querySelectorAll('.quran-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        surahFilter = btn.dataset.filter || 'all';
        renderSurahList(cachedSurahs || []);
    });
}

function openSurahReader(number, name, ayahs, type) {
    stopSurahAudio();
    if (!surahReaderEl || !surahReaderBody) return;
    currentSurahNumber = number;
    setActiveSurah(number);
    surahReaderEl.hidden = false;
    if (surahEmptyEl) surahEmptyEl.hidden = true;
    surahReaderEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('surahReaderName').textContent = 'سورة ' + name;
    currentSurahMeta = { type, ayahs };
    refreshReaderMeta();
    if (surahReaderNum) surahReaderNum.textContent = String(number);
    const playBtn = document.getElementById('surahReaderPlay');
    playBtn.dataset.surah = String(number);
    playBtn.classList.remove('playing');
    playBtn.innerHTML = '<i class="fas fa-play"></i>';

    if (cachedTexts[number]) {
        surahReaderBody.innerHTML = cachedTexts[number];
        return;
    }
    surahReaderBody.innerHTML = '<p class="surahs-loading"><i class="fas fa-spinner fa-spin"></i> جارٍ تحميل النصّ…</p>';
    fetch(SURAH_TEXT_BASE.replace('{N}', number))
        .then(r => { if (!r.ok) throw new Error('bad request'); return r.json(); })
        .then(json => {
            if (!json || !json.data || !Array.isArray(json.data.ayahs)) throw new Error('bad data');
            const html = json.data.ayahs.map((a, i) =>
                `<p class="quran-ayah">${escapeHtml(a.text || '')}<span class="quran-ayah-marker">﴿${i + 1}﴾</span></p>`
            ).join('');
            cachedTexts[number] = html;
            if (currentSurahNumber === number) surahReaderBody.innerHTML = html;
        })
        .catch(() => {
            if (currentSurahNumber === number) {
                surahReaderBody.innerHTML = '<p class="surahs-loading">تعذّر تحميل نص السورة. أعد المحاولة لاحقًا.</p>';
            }
        });
}

if (surahGridEl) {
    surahGridEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.surah-chip');
        if (!chip) return;
        const n = parseInt(chip.dataset.number, 10);
        const s = cachedSurahs ? cachedSurahs.find(x => x.number === n) : null;
        openSurahReader(n, chip.dataset.name || (s && s.name) || '', s ? s.ayahs : 0, s ? s.type : '');
    });
}

const surahReaderPlay = document.getElementById('surahReaderPlay');
if (surahReaderPlay) {
    surahReaderPlay.addEventListener('click', () => {
        if (surahReaderPlay.classList.contains('playing')) { stopSurahAudio(); return; }
        const n = parseInt(surahReaderPlay.dataset.surah, 10);
        if (!n) return;
        const s = cachedSurahs ? cachedSurahs.find(x => x.number === n) : null;
        playSurah(surahReaderPlay, n, s ? s.ayahs : 0);
    });
}

const surahReaderClose = document.getElementById('surahReaderClose');
if (surahReaderClose && surahReaderEl) {
    surahReaderClose.addEventListener('click', () => {
        stopSurahAudio();
        surahReaderEl.hidden = true;
        setActiveSurah(0);
        if (surahEmptyEl) surahEmptyEl.hidden = false;
    });
}

// إيقاف التلاوة عند إغلاق القارئ

loadSurahList();
loadReciters();

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
