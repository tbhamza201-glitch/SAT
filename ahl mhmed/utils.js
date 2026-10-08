// ===== أدوات مساعدة مشتركة =====
// تُحمَّل في كل الصفحات قبل سكربتاتها لتجنّب تكرار هذه الدوال في كل ملف.

(function () {
    'use strict';

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str == null ? '' : String(str);
        return div.innerHTML;
    }

    var DENIED = new Set(['script', 'style', 'object', 'embed', 'link', 'meta', 'form', 'input', 'button', 'textarea', 'select', 'option', 'template']);
    var ALLOWED = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'span', 'a', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'hr', 'div', 'br', 'figure', 'figcaption', 'img', 'iframe', 'video', 'sub', 'sup']);
    var ATTRS = {
        a: ['href', 'target', 'rel'],
        img: ['src', 'alt', 'width', 'height', 'style', 'title'],
        iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'title', 'loading'],
        video: ['src', 'controls', 'poster', 'width', 'height'],
        td: ['colspan', 'rowspan', 'style'],
        th: ['colspan', 'rowspan', 'style'],
        span: ['style'],
        p: ['style'],
        div: ['style'],
        figure: ['style'],
        table: ['style'],
        ul: ['style'], ol: ['style']
    };
    var SAFE_STYLE = /^(color|background-color|background|font-family|font-size|font-weight|font-style|text-align|text-decoration|width|max-width|height|direction|float|margin|padding|border|border-radius)[^:]*:/i;

    function sanitizeHtml(html) {
        var tpl = document.createElement('template');
        tpl.innerHTML = html || '';
        var root = tpl.content;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
        var toRemove = [];
        while (walker.nextNode()) {
            var node = walker.currentNode;
            var tag = (node.tagName || '').toLowerCase();
            if (DENIED.has(tag)) { toRemove.push(node); continue; }
            if (tag !== 'iframe' && !ALLOWED.has(tag)) { toRemove.push(node); continue; }
            if (tag === 'iframe') {
                var src = node.getAttribute('src') || '';
                src = src.replace(/^\s*\/\//, 'https://');
                if (!/youtube-nocookie\.com\/embed\/|youtube\.com\/embed\//i.test(src)) { toRemove.push(node); }
                else node.setAttribute('src', src);
                continue;
            }
            var allowedAttrs = ATTRS[tag] || [];
            Array.prototype.slice.call(node.attributes).forEach(function (attr) {
                var name = attr.name.toLowerCase();
                if (name.indexOf('on') === 0) { node.removeAttribute(attr.name); return; }
                if (allowedAttrs.indexOf(name) === -1) { node.removeAttribute(attr.name); return; }
                var value = attr.value;
                if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(value)) { node.removeAttribute(attr.name); return; }
                if (name === 'style') {
                    var cleaned = value.split(';')
                        .map(function (s) { return s.trim(); })
                        .filter(function (s) { return SAFE_STYLE.test(s); })
                        .join(';');
                    node.setAttribute('style', cleaned);
                }
            });
        }
        toRemove.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
        return tpl.innerHTML;
    }

    window.escapeHtml = escapeHtml;
    window.sanitizeHtml = sanitizeHtml;
})();