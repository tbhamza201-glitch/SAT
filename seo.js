(function () {
    'use strict';
    const STORAGE_KEY = 'ahlMhmedData';
    const DEF_SEO = {
        title: 'قرية أهل محمد — رأس عين عميروش، معسكر، الجزائر',
        description: 'الموقع الرسمي لقرية أهل محمد، بلدية رأس عين عميروش، دائرة عقاز، ولاية معسكر. تعرّف على تاريخ القرية، معالمها، خدماتها، أنشطتها وأخبارها.',
        keywords: 'أهل محمد, قرية أهل محمد, رأس عين عميروش, معسكر, الجزائر, أخبار القرية, معالم القرية, خدمات, مواقيت الصلاة',
        url: '',
        ogImage: '',
        twitterSite: '',
        author: 'أهل محمد',
        robots: 'index, follow'
    };

    function getData() {
        let d = {};
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) d = JSON.parse(raw);
        } catch (e) { /* ignore */ }
        const seo = Object.assign({}, DEF_SEO, (d && d.seo && typeof d.seo === 'object') ? d.seo : {});
        ['title', 'description', 'keywords', 'url', 'ogImage', 'twitterSite', 'author', 'robots'].forEach(function (k) {
            if (typeof seo[k] !== 'string') seo[k] = DEF_SEO[k];
        });
        return { siteName: (d && d.siteName) || 'أهل محمد', seo: seo };
    }

    function setMeta(name, content) {
        if (!content) return;
        let el = document.querySelector('meta[name="' + CSS.escape(name) + '"]');
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute('name', name);
            document.head.appendChild(el);
        }
        el.setAttribute('content', content);
    }

    function setProp(property, content) {
        if (!content) return;
        let el = document.querySelector('meta[property="' + CSS.escape(property) + '"]');
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute('property', property);
            document.head.appendChild(el);
        }
        el.setAttribute('content', content);
    }

    function setRel(rel, href) {
        if (!href) return;
        let el = document.querySelector('link[rel="' + CSS.escape(rel) + '"]');
        if (!el) {
            el = document.createElement('link');
            el.setAttribute('rel', rel);
            document.head.appendChild(el);
        }
        el.setAttribute('href', href);
    }

    function init() {
        const p = window.SEO_PAGE || {};
        const d = getData();
        const s = d.seo;
        const brand = d.siteName;

        const suffix = p.suffix ? (p.suffix + ' — ') : '';
        const title = p.title ? p.title : (suffix ? suffix + brand : (s.title || brand));
        if (!p.keepTitle) document.title = title;

        const desc = (p.desc !== undefined && p.desc !== '') ? p.desc : s.description;
        const kw = (p.keywords !== undefined && p.keywords !== '') ? p.keywords : s.keywords;
        const img = p.image || s.ogImage || '';
        const base = (s.url || '').replace(/\/+$/, '');
        const pageUrl = base + (p.path || '');

        setMeta('description', desc);
        setMeta('keywords', kw);
        setMeta('author', s.author);
        setMeta('robots', s.robots);

        setRel('canonical', pageUrl);
        setProp('og:url', pageUrl || location.href);

        setProp('og:title', p.ogTitle || title);
        setProp('og:description', desc);
        setProp('og:type', p.type || 'website');
        setProp('og:site_name', brand);
        setProp('og:locale', p.locale || 'ar_DZ');

        if (img) {
            setProp('og:image', img);
            setProp('og:image:alt', p.imageAlt || title);
            setMeta('twitter:image', img);
        }

        setMeta('twitter:card', p.card || 'summary_large_image');
        setMeta('twitter:title', p.ogTitle || title);
        setMeta('twitter:description', desc);
        if (s.twitterSite) setMeta('twitter:site', s.twitterSite);
        if (s.twitterSite) setMeta('twitter:creator', s.twitterSite);
    }

    init();
})();