// ===== نظام الألوان المتعددة للموقع ولوحة التحكم =====
// - الزائر: اختياره المحلي (ahl_theme_color) يُحفظ في متصفحه.
// - الموقع: اللون الافتراضي saved من لوحة التحكم (data.theme داخل ahlMhmedData)
//   يُطبق على جميع الزوار ما لم يختر زائر لونًا محليًا.
(function () {
    'use strict';

    var KEY = 'ahl_theme_color';
    var SITE_KEY = 'ahlMhmedData';

    var THEMES = {
        green:  { name: 'أخضر',  c1: '#2d6a4f', c2: '#c9a227' },
        blue:   { name: 'أزرق',   c1: '#2b6cb0', c2: '#f2b64a' },
        teal:   { name: 'تركواز', c1: '#0f766e', c2: '#e9b21c' },
        purple: { name: 'بنفسجي', c1: '#5b3b8e', c2: '#e6b54a' },
        gold:   { name: 'ذهبي',   c1: '#9c7416', c2: '#d4a53f' },
        rose:   { name: 'وردي',   c1: '#b03a48', c2: '#e5b54a' }
    };

    var DEFAULT_THEME = 'green';

    function valid(name) {
        return THEMES[name] ? name : DEFAULT_THEME;
    }

    function getSaved() {
        try {
            var t = localStorage.getItem(KEY);
            return valid(t);
        } catch (e) {
            return DEFAULT_THEME;
        }
    }

    function saveTheme(name) {
        try { localStorage.setItem(KEY, name); } catch (e) { /* تجاهل */ }
    }

    // اللون الافتراضي للموقع كما حُفظ من لوحة التحكم
    function readSiteTheme() {
        try {
            var raw = localStorage.getItem(SITE_KEY);
            if (!raw) return DEFAULT_THEME;
            var d = JSON.parse(raw);
            return d && d.theme ? valid(d.theme) : DEFAULT_THEME;
        } catch (e) {
            return DEFAULT_THEME;
        }
    }

    function themeColor(name) {
        return THEMES[name].c1;
    }

    function updateMetaThemeColor(name) {
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', themeColor(name));
    }

    function applyTheme(name) {
        name = valid(name);
        document.documentElement.setAttribute('data-color-theme', name);
        updateMetaThemeColor(name);

        document.querySelectorAll('.theme-picker[data-theme-picker]').forEach(function (picker) {
            var btn = picker.querySelector('.theme-picker-btn');
            if (btn) {
                var t = THEMES[name];
                btn.style.background = 'linear-gradient(135deg, ' + t.c1 + ', ' + t.c2 + ')';
                btn.setAttribute('title', 'ألوان الواجهة — ' + t.name);
            }
            var swatches = picker.querySelectorAll('.theme-swatch');
            swatches.forEach(function (sw) {
                sw.classList.toggle('active', sw.getAttribute('data-theme-color') === name);
            });
        });
    }

    // تغيير اللون بواسطة المستخدم/المسؤول — يُحفظ محليًا ويُعلن للوحة التحكم
    function setAhlColorTheme(name) {
        name = valid(name);
        applyTheme(name);
        saveTheme(name);
        try {
            window.dispatchEvent(new CustomEvent('ahlThemeChange', { detail: { name: name } }));
        } catch (e) { /* تجاهل */ }
    }

    function buildMenu(picker) {
        var menu = picker.querySelector('.theme-picker-menu');
        if (!menu) {
            menu = document.createElement('div');
            menu.className = 'theme-picker-menu';
            picker.appendChild(menu);
        }
        menu.innerHTML = '';

        var title = document.createElement('p');
        title.className = 'theme-picker-title';
        title.innerHTML = '🎨 ألوان الواجهة';
        menu.appendChild(title);

        var swatches = document.createElement('div');
        swatches.className = 'theme-swatches';

        Object.keys(THEMES).forEach(function (id) {
            var t = THEMES[id];
            var sw = document.createElement('button');
            sw.type = 'button';
            sw.className = 'theme-swatch';
            sw.setAttribute('data-theme-color', id);
            sw.style.background = 'linear-gradient(135deg, ' + t.c1 + ', ' + t.c2 + ')';
            sw.title = t.name;
            sw.setAttribute('aria-label', 'اللون ' + t.name);
            sw.addEventListener('click', function (e) {
                e.stopPropagation();
                setAhlColorTheme(id);
                closeAll();
            });
            swatches.appendChild(sw);
        });

        menu.appendChild(swatches);
        picker.appendChild(menu);
    }

    function closeAll() {
        document.querySelectorAll('.theme-picker[data-theme-picker]').forEach(function (p) {
            p.classList.remove('open');
        });
    }

    function init() {
        document.querySelectorAll('.theme-picker[data-theme-picker]').forEach(function (picker) {
            buildMenu(picker);

            var btn = picker.querySelector('.theme-picker-btn');
            if (btn) {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    picker.classList.toggle('open');
                });
            }
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.theme-picker[data-theme-picker]')) {
                closeAll();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAll();
        });

        // اختيار الزائر المحلي له الأولوية على اللون الافتراضي للموقع
        var effective = getSaved();
        var hasLocal = false;
        try { hasLocal = !!localStorage.getItem(KEY); } catch (e) {}
        if (!hasLocal) effective = readSiteTheme();
        applyTheme(effective);

        // بيانات الموقع قد تصل من الخادم بعد قليل — يُعاد التحقق ليطبق اللون الافتراضي المحفوظ
        [400, 1500, 3000].forEach(function (ms) {
            setTimeout(function () {
                try {
                    if (!localStorage.getItem(KEY)) applyTheme(readSiteTheme());
                } catch (e) {}
            }, ms);
        });

        window.setAhlColorTheme = setAhlColorTheme;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();