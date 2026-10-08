// ===== طبقة التخزين السحابي المشترك =====
// تحفظ بيانات الموقع في ملف على الخادم (api/data.json) عبر api/save.php
// حتى تظهر تعديلات لوحة التحكم لجميع الزوار، مع الاحتفاظ بنسخة محلية كاحتياط.
// إن لم يتوفر PHP على الاستضافة، يعمل الموقع كما كان (حفظ محلي) دون أي خلل.

(function () {
    'use strict';

    var KEY = 'ahlMhmedData';
    var READ_URL = 'api/save.php?read=1';
    var SAVE_URL = 'api/save.php';

    // الكود السري لحفظ البيانات — يجب أن يطابق SAVE_TOKEN في api/save.php
    var TOKEN = 'AhlMhmed@2026';

    // ===== عداد الزوار =====
    var VISIT_URL = 'api/visits.php';
    var VISIT_KEY = 'ahlMhmedLocalVisits';
    var GEO_KEY = 'ahlMhmedGeoCountry';
    var _visits = null;

    // ===== تحليلات الزوار (بيانات حقيقية) =====
    var ANALYTICS_URL = 'api/analytics.php';
    var GEOLOC_KEY = 'ahlMhmedGeoData';
    var VID_KEY = 'ahlMhmedVisitorId';
    var SID_KEY = 'ahlMhmedSessionId';

    function localVisits() {
        try {
            return parseInt(localStorage.getItem(VISIT_KEY) || '0', 10) || 0;
        } catch (e) {
            return 0;
        }
    }

    // تحديد بلد الزائر من المتصفح (يُخزَّن لكل جلسة لتفادي تكرار الطلب).
    // يعيد Promise<رمز ISO من حرفين أو ''>
    function detectCountry() {
        try {
            var cached = sessionStorage.getItem(GEO_KEY);
            if (cached) return Promise.resolve(cached);
        } catch (e) {}

        var apis = [
            { url: 'https://ipwho.is/', pick: function (j) { return j && j.country_code; } },
            { url: 'https://ipapi.co/json/', pick: function (j) { return j && j.country_code; } },
            { url: 'https://get.geojs.io/v1/ip/country.json', pick: function (j) { return j && j.country; } }
        ];

        function tryAt(i) {
            if (i >= apis.length) return Promise.resolve('');
            return fetch(apis[i].url, { cache: 'no-store' })
                .then(function (r) { return r.json(); })
                .then(function (j) {
                    var cc = apis[i].pick(j);
                    if (cc && /^[A-Za-z]{2}$/.test(cc)) {
                        cc = cc.toUpperCase();
                        try { sessionStorage.setItem(GEO_KEY, cc); } catch (e) {}
                        return cc;
                    }
                    return tryAt(i + 1);
                })
                .catch(function () { return tryAt(i + 1); });
        }
        return tryAt(0);
    }

    // مهلة قصوى حتى لا يتعطّل العدّ إن تأخّرت خدمة تحديد الموقع
    function withTimeout(promise, ms) {
        return new Promise(function (resolve) {
            var done = false;
            var timer = setTimeout(function () {
                if (!done) { done = true; resolve(''); }
            }, ms);
            promise.then(function (v) {
                if (!done) { done = true; clearTimeout(timer); resolve(v); }
            }, function () {
                if (!done) { done = true; clearTimeout(timer); resolve(''); }
            });
        });
    }

    // تحديد بلد + ولاية + مدينة الزائر (يُخزَّن لكل جلسة)
    // يعيد Promise<{cc, region, city}>
    function detectGeo() {
        try {
            var cached = sessionStorage.getItem(GEOLOC_KEY);
            if (cached) {
                return Promise.resolve(JSON.parse(cached));
            }
        } catch (e) {}

        var apis = [
            { url: 'https://ipwho.is/', pick: function (j) { return j && j.country_code ? { cc: j.country_code, region: j.region || '', city: j.city || '' } : null; } },
            { url: 'https://ipapi.co/json/', pick: function (j) { return j && j.country_code ? { cc: j.country_code, region: j.region || '', city: j.city || '' } : null; } }
        ];

        function tryAt(i) {
            if (i >= apis.length) return Promise.resolve({ cc: '', region: '', city: '' });
            return fetch(apis[i].url, { cache: 'no-store' })
                .then(function (r) { return r.json(); })
                .then(function (j) {
                    var g = apis[i].pick(j);
                    if (g && g.cc && /^[A-Za-z]{2}$/.test(g.cc)) {
                        g.cc = g.cc.toUpperCase();
                        try {
                            sessionStorage.setItem(GEOLOC_KEY, JSON.stringify(g));
                            sessionStorage.setItem(GEO_KEY, g.cc);
                        } catch (e3) {}
                        return g;
                    }
                    return tryAt(i + 1);
                })
                .catch(function () { return tryAt(i + 1); });
        }
        return withTimeout(tryAt(0), 4000);
    }

    // ===== كشف جهاز / متصفح / نظام التشغيل =====
    function detectDevice() {
        var ua = navigator.userAgent;
        var touch = (('ontouchstart' in window)) || (navigator.maxTouchPoints > 0);
        if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return 'tablet';
        if (/Mobi|iPhone|iPod|Android/i.test(ua) || (touch && window.innerWidth < 768)) return 'phone';
        return 'desktop';
    }

    function detectBrowser() {
        var ua = navigator.userAgent;
        if (/Edg\/|Edge\//i.test(ua)) return 'Edge';
        if (/SamsungBrowser/i.test(ua)) return 'Samsung Internet';
        if (/OPR\/|Opera/i.test(ua)) return 'Opera';
        if (/Chrome\/|CriOS/i.test(ua)) return 'Chrome';
        if (/Firefox\/|FxiOS/i.test(ua)) return 'Firefox';
        if (/Safari\//i.test(ua)) return 'Safari';
        if (/MSIE|Trident/i.test(ua)) return 'Internet Explorer';
        return 'متصفح آخر';
    }

    function detectOS() {
        var ua = navigator.userAgent;
        if (/Android/i.test(ua)) return 'Android';
        if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
        if (/Windows|Win32|Win64/i.test(ua)) return 'Windows';
        if (/Mac OS X|Macintosh/i.test(ua)) return 'macOS';
        if (/CrOS/i.test(ua)) return 'ChromeOS';
        if (/Linux/i.test(ua)) return 'Linux';
        return 'أخرى';
    }

    function visitorId() {
        try {
            var v = localStorage.getItem(VID_KEY);
            if (!v) { v = 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); localStorage.setItem(VID_KEY, v); }
            return v;
        } catch (e) {
            return 'v' + Math.random().toString(36).slice(2, 10);
        }
    }

    function sessionId() {
        try {
            var s = sessionStorage.getItem(SID_KEY);
            if (!s) { s = 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); sessionStorage.setItem(SID_KEY, s); }
            return s;
        } catch (e) {
            return 's' + Math.random().toString(36).slice(2, 8);
        }
    }

    var AhlStorage = {
        _reachable: false,
        _lastError: '',

        // زيادة عداد الزوار وعرض العدد.
        // على صفحات الموقع العامة يزيد العداد (مع تمرير بلد الزائر)،
        // وفي لوحة التحكم يقرأ فقط (?read=1) ويجلب تفصيل الدول.
        // يعيد Promise<{total, today, countries, server}> — server=false عند غياب PHP.
        visit: function () {
            var isDashboard = document.body && document.body.classList.contains('dashboard-body');
            var isAuth = document.body && document.body.classList.contains('auth-body');
            var base = VISIT_URL + (isDashboard || isAuth ? '?read=1' : '');
            var countryPromise = (isDashboard || isAuth) ? Promise.resolve('') : withTimeout(detectCountry(), 4000);
            return countryPromise
                .then(function (cc) {
                    var url = base + (cc ? (base.indexOf('?') >= 0 ? '&' : '?') + 'country=' + encodeURIComponent(cc) : '');
                    return fetch(url, { cache: 'no-store' });
                })
                .then(function (res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.json();
                })
                .then(function (j) {
                    if (j && typeof j.total === 'number') {
                        AhlStorage._reachable = true;
                        AhlStorage._lastError = '';
                        _visits = { total: j.total, today: j.today || 0, countries: j.countries || {}, server: true };
                        return _visits;
                    }
                    throw new Error('bad data');
                })
                .catch(function () {
                    AhlStorage._reachable = false;
                    if (!isDashboard && !isAuth) {
                        try { localStorage.setItem(VISIT_KEY, String(localVisits() + 1)); } catch (e) {}
                    }
                    _visits = { total: localVisits(), today: localVisits(), countries: {}, server: false };
                    return _visits;
                });
        },

        // قراءة العداد بدون زيادة
        visits: function () {
            return AhlStorage.visit();
        },

        // ===== تحليلات الزوار (بيانات حقيقية) =====
        // تسجيل حدث زيارة مفصل (صفحة، مصدر، جهاز، متصفح، نظام، بلد/ولاية/مدينة)
        // يعيد Promise<boolean>
        track: function () {
            var p = (location.pathname + location.search) || '/';
            var payload = {
                uid: visitorId(),
                sid: sessionId(),
                p: p,
                ref: document.referrer || '',
                d: detectDevice(),
                b: detectBrowser(),
                o: detectOS()
            };
            return detectGeo().then(function (g) {
                if (g) {
                    payload.c = g.cc || '';
                    payload.r = g.region || '';
                    payload.ci = g.city || '';
                }
                var parts = [];
                for (var k in payload) {
                    if (payload.hasOwnProperty(k)) parts.push(k + '=' + encodeURIComponent(payload[k]));
                }
                return fetch(ANALYTICS_URL + '?track=1&' + parts.join('&'), { cache: 'no-store' })
                    .then(function (res) { return res.ok; })
                    .catch(function () { return false; });
            });
        },

        // تسجيل مدة البقاء على الصفحة (عبر sendBeacon)
        stay: function (seconds) {
            var path = (location.pathname + location.search) || '/';
            var body = 'track=1&stay=' + Math.round(seconds) +
                '&p=' + encodeURIComponent(path) + '&uid=' + encodeURIComponent(visitorId());
            try {
                if (navigator.sendBeacon) {
                    navigator.sendBeacon(ANALYTICS_URL, body);
                    return Promise.resolve(true);
                }
            } catch (e) {}
            return fetch(ANALYTICS_URL + '?' + body, { cache: 'no-store' })
                .then(function (res) { return res.ok; })
                .catch(function () { return false; });
        },

        // جلب أحدث البيانات من الخادم وتخزين نسخة محلية منها
        // يعيد Promise<object|null> (null إذا لم تتوفر بيانات سحابية)
        load: function () {
            // تحويل نص JSON صالح إلى كائن بيانات الموقع (يملك contentVersion)
            function parseRemote(text) {
                var t = (text || '').trim();
                if (!t) return null;
                var parsed;
                try {
                    parsed = JSON.parse(t);
                } catch (e) {
                    return null;
                }
                if (!parsed || typeof parsed.contentVersion === 'undefined') return null;
                return parsed;
            }

            // قبول البيانات إن لم تكن هناك نسخة محلية أحدث منها
            function accept(parsed) {
                if (!parsed) return null;
                var newerLocal = false;
                try {
                    var rawLocal = localStorage.getItem(KEY);
                    if (rawLocal) {
                        var localD = JSON.parse(rawLocal);
                        if (localD && localD.updatedAt && parsed.updatedAt &&
                            String(localD.updatedAt) > String(parsed.updatedAt)) {
                            newerLocal = true;
                        }
                    }
                } catch (e2) {}
                if (!newerLocal) {
                    try { localStorage.setItem(KEY, JSON.stringify(parsed)); } catch (e) {}
                    return parsed;
                }
                return null;
            }

            return fetch(READ_URL, { cache: 'no-store' })
                .then(function (res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.text();
                })
                .then(function (text) {
                    var parsed = parseRemote(text);
                    AhlStorage._reachable = !!parsed;
                    AhlStorage._lastError = parsed ? '' : 'no valid data';
                    if (parsed) return accept(parsed);
                    // البيانات غير سليمة (مثلاً save.php لا ينفَّذ على استضافة ثابتة):
                    // ننتقل قراءة api/data.json مباشرة.
                    return fetch('api/data.json', { cache: 'no-store' })
                        .then(function (res2) {
                            if (!res2.ok) throw new Error('HTTP ' + res2.status);
                            return res2.text();
                        })
                        .then(function (t2) {
                            return accept(parseRemote(t2));
                        })
                        .catch(function () {
                            return null;
                        });
                })
                .catch(function () {
                    // الشبكة/السيرفر غير متاح: نقرأ الملف api/data.json مباشرة
                    // (يعمل على أي استضافة تخدم الملفات الثابتة) حتى تظهر بيانات
                    // لوحة التحكم لجميع الزوار حتى لو نُقل الملف يدوياً إلى الاستضافة.
                    AhlStorage._reachable = false;
                    return fetch('api/data.json', { cache: 'no-store' })
                        .then(function (res) {
                            if (!res.ok) throw new Error('HTTP ' + res.status);
                            return res.text();
                        })
                        .then(function (text) {
                            return accept(parseRemote(text));
                        })
                        .catch(function () {
                            return null;
                        });
                });
        },

        // حفظ البيانات في الخادم ثم محلياً
        // يعيد Promise<boolean> — هل نجح الحفظ في الخادم؟
        save: function (dataObj) {
            if (!dataObj) dataObj = {};
            if (typeof dataObj.updatedAt !== 'string') dataObj.updatedAt = new Date().toISOString();
            try { localStorage.setItem(KEY, JSON.stringify(dataObj)); } catch (e) {}
            return fetch(SAVE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: TOKEN, data: dataObj })
            })
                .then(function (res) {
                    if (!res.ok) {
                        AhlStorage._lastError = 'HTTP ' + res.status;
                        throw new Error('HTTP ' + res.status);
                    }
                    return res.json();
                })
                .then(function (j) {
                    if (j && j.ok === true) {
                        AhlStorage._reachable = true;
                        AhlStorage._lastError = '';
                        return true;
                    }
                    AhlStorage._lastError = (j && (j.hint || j.error)) || 'save refused';
                    throw new Error('save refused');
                })
                .catch(function () {
                    AhlStorage._reachable = false;
                    return false;
                });
        },

        // هل وصلنا للخادم (يعني أن PHP يعمل)؟
        connected: function () {
            return AhlStorage._reachable;
        },

        // آخر خطأ من الخادم (للإفادة في لوحة التحكم)
        lastError: function () {
            return AhlStorage._lastError;
        }
    };

    window.AhlStorage = AhlStorage;

    // احتساب زيارة تلقائياً على صفحات الموقع العامة فقط
    // (لا تُحتسب زيارات لوحة التحكم أو صفحة الدخول).
    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', function () {
            var body = document.body;
            if (body && (body.classList.contains('dashboard-body') || body.classList.contains('auth-body'))) return;
            AhlStorage.visit();
            AhlStorage.track();
            // تسجيل مدة البقاء عند مغادرة الصفحة أو الانتقال لعلامة تبويب أخرى
            (function attachStay() {
                var start = Date.now();
                var sent = false;
                function leave() {
                    if (sent) return;
                    var sec = (Date.now() - start) / 1000;
                    if (sec >= 5) {
                        sent = true;
                        AhlStorage.stay(Math.round(sec));
                    }
                }
                window.addEventListener('pagehide', leave);
                document.addEventListener('visibilitychange', function () {
                    if (document.visibilityState === 'hidden') leave();
                });
            })();
        });
    }
})();