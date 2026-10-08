/* ================================================================
   نظام إدارة المقالات الاحترافي — محرر نص غني + SEO + حفظ تلقائي
   يعمل داخل لوحة التحكم dashboard.html مع مشاركة نفس البيانات
   ================================================================ */
(function () {
    'use strict';

    var DRAFT_KEY = 'ahlMhmedArticleDraft';
    var editingId = null;
    var draftTimer = null;
    var firstDraftDone = false;
    var imgBar = null;
    var applyCount = 0;

    function $(id) { return document.getElementById(id); }

    function esc(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : s;
        return d.innerHTML;
    }

    /* ================= محرك المحرر ================= */

    function exec(cmd, val) {
        document.execCommand(cmd, false, val);
        var rte = $('rteEditor');
        if (rte) rte.focus();
        scheduleDraft();
    }

    function applySel(fn) {
        var sel = window.getSelection();
        if (!sel.rangeCount || sel.isCollapsed) return;
        var range = sel.getRangeAt(0);
        var wrap = document.createElement('span');
        fn(wrap);
        var frag = range.extractContents();
        wrap.appendChild(frag);
        range.insertNode(wrap);
        sel.removeAllRanges();
        var r = document.createRange();
        r.setStartAfter(wrap);
        r.collapse(true);
        sel.addRange(r);
        scheduleDraft();
    }

    function currentFontSize() {
        var sel = window.getSelection();
        if (!sel.rangeCount) return 16;
        var node = sel.anchorNode && sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentNode : sel.anchorNode;
        if (!node) return 16;
        var el = node.closest ? node.closest('[style*="font-size"]') : node;
        if (el) {
            var m = (el.style && el.style.fontSize || '').match(/(\d+(?:\.\d+)?)px/);
            if (m) return parseFloat(m[1]);
        }
        return 16;
    }

    function changeFontBy(delta) {
        var size = Math.min(60, Math.max(10, currentFontSize() + delta));
        applySel(function (span) { span.style.fontSize = size + 'px'; });
    }

    function updateToolbarState() {
        var b = $('rteToolbar');
        if (!b) return;
        var s = window.getSelection();
        var um = s && s.rangeCount ? s.getRangeAt(0).commonAncestorContainer : null;
        function q(cmd) {
            try { return document.queryCommandState(cmd); } catch (e) { return false; }
        }
        var map = { bold: 'rteBold', italic: 'rteItalic', underline: 'rteUnderline', strikeThrough: 'rteStrike', insertOrderedList: 'rteOl', insertUnorderedList: 'rteUl' };
        for (var cmd in map) {
            var btn = $(map[cmd]);
            if (btn) btn.classList.toggle('active', q(cmd));
        }
        if (um && um.nodeType === 3) um = um.parentNode;
        var hb = $('rteHeading');
        if (hb && um) {
            var h = um.closest && um.closest('h1,h2,h3,h4,p,blockquote,pre');
            if (h) hb.value = h.tagName.toLowerCase(); else hb.value = 'p';
        }
    }

    document.addEventListener('selectionchange', function () {
        if (applyCount++ % 2) return;
        updateToolbarState();
        loadImgBarForSelection();
    });

    // sanitizeHtml و escapeHtml معرفتان في utils.js المشتركة

    /* ================= معلومات المقال الحية ================= */

    function stripHtml(html) {
        var d = document.createElement('div');
        d.innerHTML = sanitizeHtml(html || '');
        return (d.textContent || '').replace(/\s+/g, ' ').trim();
    }

    function updateEditorInfo() {
        var rte = $('rteEditor');
        var title = ($('aTitle') && $('aTitle').value) || '';
        var bodies = [title, stripHtml(rte.innerHTML)];
        var all = bodies.join(' ').trim();
        var chars = all.replace(/\s/g, '');
        var cChars = all.length;
        var words = (all.split(/\s+/).filter(Boolean)).length;
        var reading = Math.max(1, Math.round(words / 180));
        $('wCount').textContent = words || 0;
        $('cCount').textContent = chars || 0;
        $('rTime').textContent = reading + ' د';
    }

    /* ================= التصنيفات ================= */

    function populateCats() {
        var sel = $('aCategory');
        if (!sel || !data || !data.newsSections) return;
        sel.innerHTML = data.newsSections.map(function (s) {
            return '<option value="' + esc(s.name) + '">' + esc(s.icon || '') + ' ' + esc(s.name) + '</option>';
        }).join('');
        var cf = $('cmFilterCat');
        if (cf) {
            var cur = cf.value;
            cf.innerHTML = '<option value="">كل التصنيفات</option>' + data.newsSections.map(function (s) {
                return '<option value="' + esc(s.name) + '"' + (cur === s.name ? ' selected' : '') + '>' + esc(s.name) + '</option>';
            }).join('');
        }
    }

    function colorForTag(tag) {
        if (data && data.newsSections) {
            var s = data.newsSections.find(function (x) { return x.name === tag; });
            if (s && s.color) return s.color;
        }
        return 'primary';
    }

    /* ================= غطاء الصورة ================= */

    function updateCoverPreview() {
        var prev = $('aCoverPreview');
        if (!prev) return;
        var dataVal = $('aCoverData');
        var urlVal = $('aCoverUrl');
        var src = (dataVal && dataVal.value) ? dataVal.value : ((urlVal && urlVal.value.trim()) ? urlVal.value.trim() : '');
        prev.innerHTML = src
            ? '<img src="' + esc(src) + '" alt="معاينة الغلاف">'
            : '<div class="cm-cover-empty">🖼️</div>';
    }

    /* ================= أدوات المحرر ================= */

    function initToolbar() {
var fontSel = $('rteFont');
    fontSel.addEventListener('change', function () {
            applySel(function (span) { span.style.fontFamily = fontSel.value; });
        });
        $('rteSize').addEventListener('change', function () {
            applySel(function (span) { span.style.fontSize = this.value; }.bind(this));
        });
        $('rteFontUp').addEventListener('click', function () { changeFontBy(2); });
        $('rteFontDown').addEventListener('click', function () { changeFontBy(-2); });

        var cmds = [
            ['rteBold', 'bold'], ['rteItalic', 'italic'], ['rteUnderline', 'underline'], ['rteStrike', 'strikeThrough'],
            ['rteAlignRight', 'justifyRight'], ['rteAlignCenter', 'justifyCenter'], ['rteAlignLeft', 'justifyLeft'], ['rteAlignJustify', 'justifyFull'],
            ['rteOl', 'insertOrderedList'], ['rteUl', 'insertUnorderedList'],
            ['rteIndent', 'indent'], ['rteOutdent', 'outdent'],
            ['rteUndo', 'undo'], ['rteRedo', 'redo']
        ];
        cmds.forEach(function (pair) {
            var el = $(pair[0]);
            if (el) el.addEventListener('click', function () { exec(pair[1]); });
        });

        var hd = $('rteHeading');
        hd.addEventListener('change', function () { exec('formatBlock', hd.value); });

        $('rteQuote').addEventListener('click', function () { exec('formatBlock', 'blockquote'); });
        $('rteHr').addEventListener('click', function () { exec('insertHorizontalRule'); });

        $('rteClear').addEventListener('click', function () { exec('removeFormat'); });

        var fg = $('rteFgColor');
        var bg = $('rteBgColor');
        fg.addEventListener('input', function () { exec('foreColor', fg.value); });
        bg.addEventListener('input', function () { exec('hiliteColor', bg.value); });
        $('rteHexApply').addEventListener('click', function () {
            var hex = $('rteHexColor').value.trim();
            if (/^#?[0-9a-fA-F]{3,8}$/.test(hex)) {
                if (hex.charAt(0) !== '#') hex = '#' + hex;
                exec('foreColor', hex);
            }
        });

        $('rteUnlink').addEventListener('click', function () {
            exec('unlink');
            var sel = window.getSelection();
            if (sel && sel.rangeCount) {
                var range = sel.getRangeAt(0);
                range.deleteContents();
            }
            scheduleDraft();
        });

        $('rteCodeBtn').addEventListener('click', function () {
            applySel(function (outer) {
                var code = document.createElement('code');
                var pre = document.createElement('pre');
                while (outer.firstChild) code.appendChild(outer.firstChild);
                pre.appendChild(code);
                outer.appendChild(pre);
            });
        });

        /* ---- الأزرار النشطة عند الاختيار ---- */
        ['rteBold', 'rteItalic', 'rteUnderline', 'rteStrike', 'rteOl', 'rteUl'].forEach(function (id) {
            var el = $(id);
            el.addEventListener('mousedown', function (e) { e.preventDefault(); });
        });
    }

    /* ================= الروابط ================= */

    function openLinkModal() {
        var sel = window.getSelection();
        var anchor = null;
        if (sel && sel.rangeCount) {
            var node = sel.getRangeAt(0).commonAncestorContainer;
            if (node.nodeType === 3) node = node.parentNode;
            anchor = node.closest ? node.closest('a') : null;
        }
        ctlOpen(
            '<div class="ctl-title">🔗 إدراج / تعديل رابط</div>' +
            '<div class="field"><label>نص الرابط</label><input type="text" id="lnkText" class="dash-input"></div>' +
            '<div class="field"><label>URL</label><input type="url" id="lnkUrl" class="dash-input" placeholder="https://..."></div>' +
            '<div class="ce-status-toggle"><label class="ce-status-btn" style="flex:none"><input type="checkbox" id="lnkBlank" checked style="width:auto"> فتح في تبويب جديد</label>' +
            '<label class="ce-status-btn" style="flex:none"><input type="checkbox" id="lnkNofollow" style="width:auto"> إضافة rel="nofollow"</label></div>' +
            '<div class="ctl-actions">' +
            '<button type="button" id="lnkSave" class="btn btn-primary">حفظ الرابط</button>' +
            '<button type="button" id="lnkCancel" class="btn btn-ghost">إلغاء</button></div>'
        );
        var url = anchor ? anchor.getAttribute('href') : '';
        var text = '';
        if (anchor) {
            text = anchor.textContent;
            $('lnkBlank').checked = (anchor.target === '_blank');
            $('lnkNofollow').checked = ((anchor.rel || '').indexOf('nofollow') !== -1);
        } else {
            text = sel.toString();
        }
        $('lnkText').value = text;
        $('lnkUrl').value = url;

        $('lnkSave').addEventListener('click', function () {
            var urlV = $('lnkUrl').value.trim();
            var txtV = $('lnkText').value.trim() || urlV;
            if (!urlV) { ctlClose(); return; }
            if (!/^https?:\/\//i.test(urlV) && !/^\//.test(urlV)) urlV = 'https://' + urlV;
            var rel = $('lnkNofollow').checked ? 'nofollow' : '';
            var attrs = 'href="' + esc(urlV) + '"' + ($('lnkBlank').checked ? ' target="_blank" rel="noopener' + (rel ? ' ' + rel : '') + '"' : (rel ? ' rel="' + rel + '"' : ''));
            exec('insertHTML', '<a ' + attrs + '>' + esc(txtV) + '</a>');
            ctlClose();
        });
        $('lnkCancel').addEventListener('click', ctlClose);
    }

    /* ================= الصور ================= */

    function addImageToDoc(src, alt) {
        var fig = document.createElement('figure');
        fig.setAttribute('contenteditable', 'false');
        var img = document.createElement('img');
        img.src = src;
        img.alt = alt || '';
        img.addEventListener('load', function () {
            var wRef = $('rteEditor');
            img.style.width = Math.min(100, Math.round((img.naturalWidth / (wRef ? wRef.clientWidth : 800)) * 100)) + '%';
        });
        var cap = document.createElement('figcaption');
        cap.contentEditable = 'true';
        cap.textContent = '';
        fig.appendChild(img);
        fig.appendChild(cap);
        var sel = window.getSelection();
        if (sel && sel.rangeCount) {
            var range = sel.getRangeAt(0);
            range.insertNode(fig);
            range.setStartAfter(fig);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        } else {
            ($('rteEditor')).appendChild(fig);
        }
        scheduleDraft();
    }

    function fileToImage(file) {
        if (!file || file.type.indexOf('image/') !== 0) { showDashToast('يرجى اختيار ملف صورة.', true); return; }
        if (file.size > 1024 * 1024 * 6) { showDashToast('الصورة كبيرة جداً — اختر أقل من 6MB.', true); return; }
        var reader = new FileReader();
        reader.onload = function () {
            if (typeof compressImage === 'function') {
                compressImage(reader.result, function (comp) { addImageToDoc(comp); });
            } else {
                addImageToDoc(reader.result);
            }
        };
        reader.readAsDataURL(file);
    }

    function openImageUrlModal() {
        ctlOpen(
            '<div class="ctl-title">🖼️ إدراج صورة من رابط</div>' +
            '<div class="field"><label>رابط الصورة</label><input type="url" id="imgUrlIpt" class="dash-input" placeholder="https://..."></div>' +
            '<div class="field"><label>Alt Text (اختياري)</label><input type="text" id="imgAltIpt" class="dash-input"></div>' +
            '<div class="ctl-actions"><button type="button" id="imgUrlSave" class="btn btn-primary">إدراج</button>' +
            '<button type="button" id="imgUrlCancel" class="btn btn-ghost">إلغاء</button></div>'
        );
        $('imgUrlSave').addEventListener('click', function () {
            var src = $('imgUrlIpt').value.trim();
            if (src) addImageToDoc(src, $('imgAltIpt').value.trim());
            ctlClose();
        });
        $('imgUrlCancel').addEventListener('click', ctlClose);
    }

    /* --- شريط أدوات الصورة المحددة --- */
    function loadImgBarForSelection() {
        var bar = $('imgBar');
        if (!bar) return;
        var rte = $('rteEditor');
        var sel = window.getSelection();
        if (!sel || !sel.rangeCount) { hideImgBar(); return; }
        var node = sel.getRangeAt(0).commonAncestorContainer;
        if (!rte.contains(node)) { hideImgBar(); return; }
        var img = node.nodeType === 1 && node.tagName === 'IMG' ? node : (node.closest ? node.closest('img') : null);
        if (!img) {
            var figImg = rte.querySelector('img.selected');
            if (figImg) figImg.classList.remove('selected');
            hideImgBar();
            return;
        }
        if (!img.classList.contains('selected')) {
            var old = rte.querySelector('img.selected');
            if (old) old.classList.remove('selected');
            img.classList.add('selected');
        }
        bar.classList.add('show');
        imgBar = img;
        $('imgWidth').value = (img.style.width || '').replace('px', '').replace('%', '');
        $('imgWidthUnit').value = (img.style.width || '').indexOf('%') !== -1 ? '%' : 'px';
        $('imgAlt').value = img.alt || '';
        var fig = img.closest('figure');
        var cap = fig && fig.querySelector('figcaption');
        $('imgCaption').value = cap ? cap.textContent : '';
    }

    function hideImgBar() {
        var bar = $('imgBar');
        if (bar) bar.classList.remove('show');
        imgBar = null;
    }

    function initImgBar() {
        var bar = $('imgBar');
        bar.addEventListener('click', function (e) {
            var t = e.target;
            if (!imgBar) return;
            var fig = imgBar.closest('figure');
            if (t.dataset.align) {
                if (fig) fig.style.textAlign = t.dataset.align;
                imgBar.style.cssText += ';display:block;margin:' + (t.dataset.align === 'center' ? '0 auto' : t.dataset.align === 'left' ? '0 auto 0 0' : '0 0 0 auto');
                if (fig) { fig.style.margin = '0'; }
            }
            if (t.id === 'imgDeleteBtn') {
                var p = fig || imgBar;
                if (p.parentNode) p.parentNode.removeChild(p);
                hideImgBar();
                scheduleDraft();
            }
            if (t.id === 'imgReplaceBtn') { $('imgReplaceFile').click(); }
        });
        $('imgWidth').addEventListener('input', applyImgWidth);
        $('imgWidthUnit').addEventListener('change', applyImgWidth);
        $('imgAlt').addEventListener('change', function () { if (imgBar) imgBar.alt = this.value; });
        $('imgCaption').addEventListener('change', function () {
            var fig = imgBar && imgBar.closest('figure');
            var cap = fig && fig.querySelector('figcaption');
            if (cap) cap.textContent = this.value;
            scheduleDraft();
        });
        $('imgReplaceFile').addEventListener('change', function () {
            var file = this.files && this.files[0];
            var img = imgBar;
            this.value = '';
            if (!file || !img) return;
            if (file.type.indexOf('image/') !== 0) { showDashToast('يرجى اختيار ملف صورة.', true); return; }
            var reader = new FileReader();
            reader.onload = function () {
                if (typeof compressImage === 'function') compressImage(reader.result, function (comp) { if (img) img.src = comp; });
                else if (img) img.src = reader.result;
                scheduleDraft();
            };
            reader.readAsDataURL(file);
        });
    }

    function applyImgWidth() {
        var w = $('imgWidth');
        var u = $('imgWidthUnit');
        var v = parseFloat(w.value);
        if (isNaN(v) || !imgBar) return;
        if (u.value === '%') imgBar.style.width = Math.min(100, Math.max(5, v)) + '%';
        else imgBar.style.width = Math.min(900, Math.max(20, v)) + 'px';
        imgBar.style.height = 'auto';
    }

    /* ================= فيديو / يوتيوب ================= */

    function youtubeId(url) {
        var m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
        return m && m[1] ? m[1] : null;
    }

    function openVideoModal() {
        ctlOpen(
            '<div class="ctl-title">🎬 إدراج فيديو (YouTube)</div>' +
            '<div class="field"><label>رابط الفيديو</label><input type="url" id="vidUrl" class="dash-input" placeholder="https://www.youtube.com/watch?v=..."></div>' +
            '<p class="dash-card-tip">يُدرج الفيديو بشكل متجاوب داخل المقال.</p>' +
            '<div class="ctl-actions"><button type="button" id="vidSave" class="btn btn-primary">إدراج</button>' +
            '<button type="button" id="vidCancel" class="btn btn-ghost">إلغاء</button></div>'
        );
        $('vidSave').addEventListener('click', function () {
            var id = youtubeId($('vidUrl').value.trim());
            if (!id) { showDashToast('رابط يوتيوب غير صالح.', true); return; }
            exec('insertHTML', '<figure class="rte-video" contenteditable="false"><iframe width="100%" height="380" src="https://www.youtube-nocookie.com/embed/' + esc(id) + '" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="فيديو"></iframe></figure>');
            ctlClose();
        });
        $('vidCancel').addEventListener('click', ctlClose);
    }

    /* ================= جدول ================= */

    function openTableModal() {
        ctlOpen(
            '<div class="ctl-title">📊 إدراج جدول</div>' +
            '<div class="stats-row">' +
            '<div class="field"><label>الأعمدة</label><input type="number" id="tblCols" class="dash-input" value="3" min="1" max="10"></div>' +
            '<div class="field"><label>الصفوف</label><input type="number" id="tblRows" class="dash-input" value="3" min="1" max="20"></div>' +
            '</div>' +
            '<div class="ctl-actions"><button type="button" id="tblSave" class="btn btn-primary">إدراج</button>' +
            '<button type="button" id="tblCancel" class="btn btn-ghost">إلغاء</button></div>'
        );
        $('tblSave').addEventListener('click', function () {
            var r = Math.max(1, +$('tblRows').value || 1);
            var c = Math.max(1, +$('tblCols').value || 1);
            var h = '<table><thead><tr>';
            for (var i = 0; i < c; i++) h += '<th>عمود ' + (i + 1) + '</th>';
            h += '</tr></thead><tbody>';
            for (var x = 0; x < r; x++) {
                h += '<tr>';
                for (var y = 0; y < c; y++) h += '<td></td>';
                h += '</tr>';
            }
            h += '</tbody></table>';
            exec('insertHTML', h);
            ctlClose();
        });
        $('tblCancel').addEventListener('click', ctlClose);
    }

    /* ================= النوافذ المنبثقة ================= */

    function ctlOpen(html) {
        ctlClose();
        var ov = document.createElement('div');
        ov.className = 'ctl-overlay';
        ov.id = 'ctlOverlay';
        var box = document.createElement('div');
        box.className = 'ctl-box';
        box.id = 'ctlBox';
        box.innerHTML = html;
        ov.appendChild(box);
        document.body.appendChild(ov);
        ov.addEventListener('click', function (e) { if (e.target === ov) ctlClose(); });
    }

    function ctlClose() {
        var ov = $('ctlOverlay');
        if (ov) ov.remove();
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var ovs = document.querySelectorAll('.ctl-overlay');
            for (var i = 0; i < ovs.length; i++) ovs[i].remove();
        }
    });

    /* ================= جمع / حفظ المقال ================= */

    function collectArticle(status) {
        var rte = $('rteEditor');
        var category = $('aCategory').value;
        var cover = ($('aCoverData').value) ? $('aCoverData').value : ($('aCoverUrl').value.trim() || '');
        var plain = stripHtml(rte.innerHTML);
        var now = new Date().toISOString();
        var base = {};
        if (editingId) {
            var found = data.news.find(function (n) { return n.id === editingId; });
            if (found) base = found;
        }
        return Object.assign({}, base, {
            id: editingId || 'a' + Date.now(),
            icon: base.icon || '📰',
            title: $('aTitle').value.trim(),
            excerpt: $('aExcerpt').value.trim(),
            date: $('aDate').value.trim() || (new Date().toLocaleDateString('ar-DZ', { day: 'numeric', month: 'long', year: 'numeric' })),
            tag: category,
            category: category,
            tags: $('aTags').value.split(',').map(function (t) { return t.trim(); }).filter(Boolean),
            text: plain,
            content: sanitizeHtml(rte.innerHTML),
            coverImage: cover,
            image: cover,
            author: $('aAuthor').value.trim(),
            status: status || ($('aStatus').value || 'published'),
            tagColor: colorForTag(category),
            fontSize: base.fontSize || 'normal',
            textColor: base.textColor || 'auto',
            wordCount: (plain.split(/\s+/).filter(Boolean)).length,
            charCount: plain.replace(/\s/g, '').length,
            seo: {
                seoTitle: $('aSeoTitle').value.trim(),
                metaDescription: $('aSeoDesc').value.trim(),
                focusKeyword: $('aSeoKeyword').value.trim(),
                slug: $('aSlug').value.trim(),
                keywords: $('aSeoKeywords').value.trim(),
                ogImage: $('aOgImage').value.trim() || cover
            },
            createdAt: base.createdAt || now,
            updatedAt: now
        });
    }

    // يزامن قائمة المقالات (DOM) مع الذاكرة قبل الحفظ ثم يحفظ،
    // حتى لا يعيد save() بناء data.news من قائمة قديمة فيضيع المقال.
    function syncThenSave() {
        if (typeof updateOverview === 'function') updateOverview();
        if (typeof populateArticles === 'function') populateArticles();
        if (typeof renderManage === 'function') renderManage();
        if (typeof save === 'function') { save(); } else { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {} }
    }

    function persistArticle(art) {
        if (editingId) {
            var idx = data.news.findIndex(function (n) { return n.id === editingId; });
            if (idx > -1) data.news[idx] = art;
            else data.news.push(art);
        } else {
            data.news.push(art);
        }
        syncThenSave();
    }

    function saveArticle(status) {
        var title = $('aTitle').value.trim();
        if (!title) { showDashToast('اكتب عنوان المقال أولاً.', true); return; }
        ctlClose();
        var art = collectArticle(status);
        persistArticle(art);
        editingId = art.id;
        localStorage.removeItem(DRAFT_KEY);
        firstDraftDone = false;
        setSaveStatus(status === 'draft' ? 'حُفظت كمسودة. يمكنك العودة لاحقاً لإكمالها.' : 'تم نشر المقال بنجاح ✓', 'saved');
        showDashToast(status === 'draft' ? 'تم الحفظ كمسودة ✓' : 'تم نشر المقال ✓');
        renderManage();
    }

    /* ================= الحفظ التلقائي ================= */

    function setSaveStatus(txt, cls) {
        var el = $('ceSaveStatus');
        if (!el) return;
        el.className = 'ce-save-status ' + cls;
        var lbl = el.querySelector('.lbl');
        if (lbl) lbl.textContent = txt || '';
    }

    function scheduleDraft() {
        var el = $('ceSaveStatus');
        if (el) { el.className = 'ce-save-status saving'; el.querySelector('.lbl').textContent = 'جاري الحفظ...'; }
        clearTimeout(draftTimer);
        draftTimer = setTimeout(saveDraftNow, 1200);
        updateEditorInfo();
    }

    function saveDraftNow() {
        var payload = collectArticle(null);
        payload._draftOnly = true;
        try {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
            setSaveStatus('تم الحفظ تلقائياً ✓', 'saved');
        } catch (err) {
            setSaveStatus('تعذر الحفظ — مساحة التخزين ممتلئة.', 'error');
        }
    }

    function tryRestoreDraft() {
        var raw;
        try { raw = localStorage.getItem(DRAFT_KEY); } catch (e) { return; }
        if (!raw) return;
        var d;
        try { d = JSON.parse(raw); } catch (e) { return; }
        if (!d || !d.title) return;
        if (editingId && d.id !== editingId) return;
        loadDraft(d);
        if (editingId) showDashToast('تم استرجاع أحدث نسخة محفوظة تلقائياً.');
    }

    function loadDraft(d) {
        $('aTitle').value = d.title || '';
        $('aExcerpt').value = d.excerpt || '';
        $('aTags').value = (d.tags || []).join(', ');
        $('aDate').value = d.date || '';
        $('aAuthor').value = d.author || '';
        $('aStatus').value = d.status === 'draft' ? 'draft' : 'published';
        if (d.category && $('aCategory').querySelector('option[value="' + d.category.replace(/"/g, '\\"') + '"]')) {
            $('aCategory').value = d.category;
        }
        if (d.coverImage) {
            if (String(d.coverImage).indexOf('data:') === 0) { $('aCoverData').value = d.coverImage; $('aCoverUrl').value = ''; }
            else { $('aCoverUrl').value = d.coverImage; $('aCoverData').value = ''; }
        }
        updateCoverPreview();
        var rte = $('rteEditor');
        if (d.content) {
            rte.innerHTML = sanitizeHtml(d.content);
        } else if (d.text) {
            rte.innerHTML = sanitizeHtml('<p>' + esc(d.text) + '</p>');
        } else {
            rte.innerHTML = '';
        }
        if (d.seo) {
            $('aSeoTitle').value = d.seo.seoTitle || '';
            $('aSeoDesc').value = d.seo.metaDescription || '';
            $('aSeoKeyword').value = d.seo.focusKeyword || '';
            $('aSlug').value = d.seo.slug || '';
            $('aSeoKeywords').value = d.seo.keywords || '';
            $('aOgImage').value = d.seo.ogImage || '';
        }
        refreshSlug();
        updateSeoCounters();
        updateEditorInfo();
    }

    /* ================= SEO ================= */

    function slugify(str) {
        return str.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}\-_]/gu, '').replace(/-{2,}/g, '-');
    }

    function refreshSlug() {
        var t = $('aTitle');
        var s = $('aSlug');
        if (!s.value.trim()) s.value = slugify(t.value);
    }

    function updateSeoCounters() {
        var pairs = [['aSeoTitle', 'seoTitleCount', 60], ['aSeoDesc', 'seoDescCount', 160]];
        pairs.forEach(function (p) {
            var inp = $(p[0]);
            var cnt = $(p[1]);
            if (!inp || !cnt) return;
            var len = inp.value.length;
            cnt.textContent = len + ' / ' + p[2];
            cnt.className = 'seo-count ' + (len > p[2] ? 'warn' : 'ok');
        });
    }

    /* ================= المعاينة ================= */

    var PREVIEW_CSS =
        '*{box-sizing:border-box}body{font-family:Cairo,Tajawal,Arial,sans-serif;color:#26352d;line-height:2;margin:0;padding:22px;background:#fff;direction:rtl;text-align:right;}\n' +
        'h1,h2,h3,h4{color:#1c4d37;font-weight:800;line-height:1.6}h1{font-size:1.7rem;border-bottom:2px solid #1c4d37;padding-bottom:10px;margin:20px 0 12px}\n' +
        'p{margin:0 0 14px}.cover{width:100%;border-radius:14px;margin:0 0 16px;max-height:420px;object-fit:cover}\n' +
        '.meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;color:#7c8b83;font-size:.82rem;margin-bottom:18px}\n' +
        '.badge{background:#e7f3ec;color:#143b2a;border-radius:50px;padding:3px 12px;font-weight:800}\n' +
        'img{max-width:100%;height:auto;border-radius:10px}figure{margin:14px 0;text-align:center}figcaption{font-size:.85rem;color:#7c8b83;margin-top:6px}\n' +
        'blockquote{background:#f2f6f3;border-right:4px solid #1c4d37;padding:14px 18px;border-radius:10px;font-style:italic;margin:14px 0}\n' +
        'pre{background:#0f1f18;color:#d9f7e9;padding:14px;border-radius:10px;overflow-x:auto;direction:ltr;text-align:left}code{background:#eef4f0;color:#1c4d37;border-radius:5px;padding:1px 7px}\n' +
        'table{border-collapse:collapse;width:100%;margin:14px 0}th,td{border:1px solid #cdd9d2;padding:8px 12px;text-align:right}th{background:#eef4f0}\n' +
        'ul,ol{padding-right:26px;margin:0 0 14px}hr{border:none;border-top:2px dashed #cfdbd4;margin:20px 0}\n' +
        'a{color:#1d63a8}.rte-video{position:relative;padding-top:56.25%}.rte-video iframe{position:absolute;inset:0;width:100%;height:100%;border-radius:12px;border:0}\n';

    function openPreview() {
        var art = collectArticle('published');
        var doc = '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8">' +
            '<meta name="viewport" content="width=device-width, initial-scale=1"><title>' + esc(art.title) + '</title>' +
            '<style>' + PREVIEW_CSS + '</style></head><body>' +
            (art.coverImage ? '<img class="cover" src="' + esc(art.coverImage) + '" alt="">' : '') +
            '<div class="meta"><span class="badge">' + esc(art.category) + '</span><span>📅 ' + esc(art.date) + '</span>' +
            (art.author ? '<span>✍️ ' + esc(art.author) + '</span>' : '') +
            '<span>⏱ ' + art.wordCount + ' كلمة</span></div>' +
            '<h1>' + esc(art.title) + '</h1>' +
            '<div class="article-body">' + sanitizeHtml(art.content) + '</div>' +
            '</body></html>';
        var modal = document.createElement('div');
        modal.className = 'ctl-overlay';
        modal.id = 'previewModal';
        modal.innerHTML =
            '<div class="ctl-box" style="max-width:920px;width:100%">' +
            '<div class="ctl-title">👁️ معاينة المقال</div>' +
            '<div class="cv-devices"><button type="button" class="cv-dev active" data-w="100%">🖥️ Desktop</button>' +
            '<button type="button" class="cv-dev" data-w="768px">📱 Tablet</button>' +
            '<button type="button" class="cv-dev" data-w="390px">📲 Mobile</button></div>' +
            '<div class="cv-frame-wrap"><iframe id="cvFrame" class="cv-frame" sandbox="allow-same-origin"></iframe></div>' +
            '<div class="ctl-actions"><button type="button" id="cvClose" class="btn btn-primary">إغلاق</button></div></div>';
        document.body.appendChild(modal);
        var frame = $('cvFrame');
        frame.srcdoc = doc;
        modal.querySelectorAll('.cv-dev').forEach(function (b) {
            b.addEventListener('click', function () {
                modal.querySelectorAll('.cv-dev').forEach(function (x) { x.classList.remove('active'); });
                b.classList.add('active');
                frame.style.width = b.dataset.w;
            });
        });
        $('#cvClose').addEventListener('click', function () { modal.remove(); });
        modal.addEventListener('click', function (e) { if (e.target === modal) modal.remove(); });
        // النقر على أي مواد داخل المعاينة: السماح بفتح الروابط
        frame.onload = function () {
            try {
                if (!frame.contentWindow) return;
                frame.contentWindow.addEventListener('click', function (ev) {
                    var a = ev.target.closest ? ev.target.closest('a') : null;
                    if (a) {
                        ev.preventDefault();
                        if (a.getAttribute('target') === '_blank') { window.open(a.href, '_blank'); }
                    }
                }, true);
            } catch (e) {}
        };
    }

    /* ================= إدارة المقالات ================= */

    var mgState = { q: '', cat: '', status: '', sort: 'new' };

    function renderManage() {
        var grid = $('cmGrid');
        if (!grid) return;
        var list = (data.news || []).filter(function (n) {
            var hay = (n.title || '') + ' ' + (n.excerpt || '') + ' ' + (n.tags || []).join(' ');
            if (mgState.q && hay.toLowerCase().indexOf(mgState.q.toLowerCase()) === -1) return false;
            if (mgState.cat && (n.category || n.tag) !== mgState.cat) return false;
            if (mgState.status && (n.status || 'published') !== mgState.status) return false;
            return true;
        });
        list.sort(function (a, b) {
            var ta = a.createdAt || '';
            var tb = b.createdAt || '';
            if (mgState.sort === 'old') return ta.localeCompare(tb);
            if (mgState.sort === 'title') return (a.title || '').localeCompare(b.title || '');
            return tb.localeCompare(ta);
        });
        var empty = $('cmEmpty');
        if (!list.length) {
            grid.innerHTML = '';
            empty.style.display = '';
            return;
        }
        empty.style.display = 'none';
        grid.innerHTML = list.map(function (n) {
            var st = n.status === 'draft' ? 'مـسـودة' : 'منشور';
            var stCls = n.status === 'draft' ? 'drf' : 'pub';
            var date = n.date || ((n.createdAt || '').slice(0, 10));
            var cover = n.coverImage || n.image;
            var excerpt = n.excerpt || n.text || '';
            var cats = n.category || n.tag || 'خبر';
            var reading = n.wordCount ? Math.max(1, Math.round(n.wordCount / 180)) + ' د' : (stripHtml(n.text || '').split(/\s+/).filter(Boolean).length ? Math.max(1, Math.round(stripHtml(n.text).split(/\s+/).filter(Boolean).length / 180)) + ' د' : '—');
            return '<div class="cm-card" data-id="' + esc(n.id) + '">' +
                (cover ? '<img class="cm-cover" src="' + esc(cover) + '" alt="" loading="lazy">' : '<div class="cm-cover-empty">🖼️</div>') +
                '<div class="cm-card-body">' +
                '<div class="cm-card-title">' + esc(n.title || 'بدون عنوان') + '</div>' +
                '<div class="cm-card-excerpt">' + esc(excerpt) + '</div>' +
                '<div class="cm-card-meta"><span class="cm-badge ' + stCls + '">' + st + '</span>' +
                '<span class="cm-badge cat">' + esc(cats) + '</span>' +
                '<span>📅 ' + esc(date) + '</span><span>⏱ ' + reading + '</span></div>' +
                '</div>' +
                '<div class="cm-card-actions">' +
                '<button type="button" class="cm-act act-edit" data-cm="edit">✏️ تعديل</button>' +
                '<button type="button" class="cm-act act-preview" data-cm="preview">👁️ معاينة</button>' +
                '<button type="button" class="cm-act act-copy" data-cm="copy">📑 نسخ</button>' +
                '<button type="button" class="cm-act act-toggle" data-cm="toggle">' + (n.status === 'draft' ? '🚀 نشر' : '📥 مسودة') + '</button>' +
                '<button type="button" class="cm-act act-del" data-cm="del">🗑️ حذف</button>' +
                '</div></div>';
        }).join('');
        var el = $('cmResultCount');
        if (el) el.textContent = list.length + ' مقال';
    }

    function findArticle(id) {
        return data.news.find(function (n) { return n.id === id; });
    }

    function handleManageClick(e) {
        var btn = e.target.closest('[data-cm]');
        if (!btn) return;
        var card = btn.closest('.cm-card');
        var id = card && card.dataset.id;
        var art = findArticle(id);
        if (!art) return;
        var act = btn.dataset.cm;
        if (act === 'edit') loadArticleIntoEditor(id);
        if (act === 'preview') previewArticle(art);
        if (act === 'copy') {
            var copy = JSON.parse(JSON.stringify(art));
            copy.id = 'a' + Date.now();
            copy.title = (copy.title || '') + ' (نسخة)';
            copy.status = 'draft';
            copy.createdAt = new Date().toISOString();
            copy.updatedAt = copy.createdAt;
            data.news.push(copy);
            syncThenSave();
            showDashToast('تم نسخ المقال ✓');
        }
        if (act === 'toggle') {
            art.status = art.status === 'draft' ? 'published' : 'draft';
            art.updatedAt = new Date().toISOString();
            syncThenSave();
            showDashToast(art.status === 'published' ? 'تم نشر المقال ✓' : 'أُرسل إلى المسودات ✓');
        }
        if (act === 'del') {
            if (!confirm('هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع.')) return;
            data.news = data.news.filter(function (n) { return n.id !== id; });
            syncThenSave();
            showDashToast('تم حذف المقال 🗑️');
        }
    }

    function previewArticle(art) {
        var body = sanitizeHtml(art.content) ||
            sanitizeHtml('<p>' + esc(art.text || art.excerpt || '') + '</p>');
        var doc = '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8">' +
            '<title>' + esc(art.title) + '</title><style>' + PREVIEW_CSS + '</style></head><body>' +
            (art.coverImage ? '<img class="cover" src="' + esc(art.coverImage) + '">' : '') +
            '<div class="meta"><span class="badge">' + esc(art.category || art.tag || 'خبر') + '</span>' +
            '<span>📅 ' + esc(art.date || '') + '</span>' +
            (art.author ? '<span>✍️ ' + esc(art.author) + '</span>' : '') + '</div>' +
            '<h1>' + esc(art.title) + '</h1><div>' + body + '</div></body></html>';
        var modal = document.createElement('div');
        modal.className = 'ctl-overlay';
        modal.innerHTML = '<div class="ctl-box" style="max-width:840px"><div class="ctl-title">👁️ معاينة المقال</div>' +
            '<div class="cv-frame-wrap"><iframe id="pvFrame" class="cv-frame" sandbox="allow-same-origin"></iframe></div>' +
            '<div class="ctl-actions"><button type="button" id="pvClose" class="btn btn-primary">إغلاق</button></div></div>';
        document.body.appendChild(modal);
        $('pvFrame').srcdoc = doc;
        $('#pvClose').addEventListener('click', function () { modal.remove(); });
        modal.addEventListener('click', function (e) { if (e.target === modal) modal.remove(); });
    }

    function loadArticleIntoEditor(id) {
        var art = findArticle(id);
        if (!art) return;
        editingId = id;
        showView('article-write');
        loadDraft(art);
        setSaveStatus('تعديل: ' + (art.title || ''), 'saved');
        var tab = document.querySelector('.dash-nav-item[data-view="article-write"]');
        if (tab) tab.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function resetNewArticle() {
        editingId = null;
        $('aTitle').value = '';
        $('aExcerpt').value = '';
        $('aTags').value = '';
        $('aDate').value = '';
        $('aAuthor').value = '';
        $('aStatus').value = 'published';
        if (data && data.newsSections && data.newsSections.length) $('aCategory').value = data.newsSections[0].name;
        $('aCoverData').value = '';
        $('aCoverUrl').value = '';
        updateCoverPreview();
        $('rteEditor').innerHTML = '';
        $('aSeoTitle').value = '';
        $('aSeoDesc').value = '';
        $('aSeoKeyword').value = '';
        $('aSlug').value = '';
        $('aSeoKeywords').value = '';
        $('aOgImage').value = '';
        $('ceSaveStatus').className = 'ce-save-status';
        firstDraftDone = false;
        try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
        updateSeoCounters();
        updateEditorInfo();
    }

    /* ================= ربط أحداث الربط ================= */

    function showView(id) {
        var nav = document.querySelector('.dash-nav-item[data-view="' + id + '"]');
        if (nav) {
            document.querySelectorAll('.dash-nav-item').forEach(function (b) { b.classList.remove('active'); });
            nav.classList.add('active');
        }
        document.querySelectorAll('.dash-view').forEach(function (s) {
            s.classList.toggle('active', s.dataset.viewPanel === id);
        });
        document.title = 'لوحة التحكم — ' + (nav ? nav.dataset.title : '');
    }

    function init() {
        if (!document.getElementById('rteEditor')) return;
        if (typeof data === 'undefined') return;

        // روابط مخصصة لأدوات المحرر
        FONT_OPTIONS.forEach(function (f) {
            var o = document.createElement('option');
            o.value = f.css;
            o.textContent = f.name;
            $('rteFont').appendChild(o);
        });
        $('rteSize').innerHTML = SIZES.map(function (s) { return '<option value="' + s + 'px">' + s + 'px</option>'; }).join('');

        initToolbar();
        initImgBar();
        populateCats();

        var rte = $('rteEditor');
        rte.addEventListener('input', scheduleDraft);
        rte.addEventListener('drop', function (e) {
            e.preventDefault();
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
                Array.prototype.forEach.call(e.dataTransfer.files, fileToImage);
            }
        });
        rte.addEventListener('dragover', function (e) { e.preventDefault(); });
        rte.addEventListener('paste', function (e) {
            var items = e.clipboardData && e.clipboardData.items;
            if (items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image/') === 0) {
                        e.preventDefault();
                        var f = items[i].getAsFile();
                        if (f) fileToImage(f);
                        return;
                    }
                }
            }
        });

        // حقول المقال
        var inputs = ['aTitle', 'aExcerpt', 'aTags', 'aAuthor', 'aDate', 'aSeoTitle', 'aSeoDesc', 'aSeoKeyword', 'aSeoKeywords', 'aOgImage'];
        inputs.forEach(function (id) {
            var el = $(id);
            if (el) el.addEventListener('input', scheduleDraft);
        });
        $('aCategory').addEventListener('change', function () { refreshSlug(); scheduleDraft(); });
        $('aSeoTitle').addEventListener('input', updateSeoCounters);
        $('aSeoDesc').addEventListener('input', updateSeoCounters);
        $('aTitle').addEventListener('input', function () { refreshSlug(); updateEditorInfo(); });
        $('aSlug').addEventListener('blur', function (e) { e.target.value = slugify(e.target.value); });

        // حالة المقال
        $('aStatus').addEventListener('change', function () {
            scheduleDraft();
            var p = $('aStatus').value === 'published';
            $('cePub').classList.toggle('active-pub', p);
            $('ceDrf').classList.toggle('active-drf', !p);
        });
        $('cePub').addEventListener('click', function () {
            $('aStatus').value = 'published';
            $('aStatus').dispatchEvent(new Event('change'));
        });
        $('ceDrf').addEventListener('click', function () {
            $('aStatus').value = 'draft';
            $('aStatus').dispatchEvent(new Event('change'));
        });

        // غلاف المقال
        $('aCoverFile').addEventListener('change', function (e) {
            var file = e.target.files && e.target.files[0];
            if (!file) return;
            if (file.type.indexOf('image/') !== 0) { showDashToast('يرجى اختيار ملف صورة.', true); return; }
            if (file.size > 1024 * 1024 * 4) { showDashToast('الصورة كبيرة جداً — اختر أقل من 4MB.', true); return; }
            var reader = new FileReader();
            reader.onload = function () {
                if (typeof compressImage === 'function') compressImage(reader.result, function (comp) {
                    $('aCoverData').value = comp;
                    $('aCoverUrl').value = '';
                    updateCoverPreview();
                    scheduleDraft();
                });
                else { $('aCoverData').value = reader.result; updateCoverPreview(); }
            };
            reader.readAsDataURL(file);
        });
        $('aCoverUrl').addEventListener('input', function () {
            if (this.value.trim()) $('aCoverData').value = '';
            updateCoverPreview();
        });
        $('aCoverRemove').addEventListener('click', function () {
            $('aCoverData').value = '';
            $('aCoverUrl').value = '';
            updateCoverPreview();
        });

        // أزرار الصور داخل المحرر
        $('rteImgBtn').addEventListener('click', function () { $('rteImgFile').click(); });
        $('rteImgFile').addEventListener('change', function () {
            fileToImage(this.files && this.files[0]);
            this.value = '';
        });
        $('rteImgUrlBtn').addEventListener('click', openImageUrlModal);
        $('rteLinkBtn').addEventListener('click', openLinkModal);
        $('rteVideoBtn').addEventListener('click', openVideoModal);
        $('rteTableBtn').addEventListener('click', openTableModal);

        // أزرار الحفظ والمعاينة والنشر
        $('btnSaveDraft').addEventListener('click', function () { saveArticle('draft'); });
        $('btnPublish').addEventListener('click', function () { saveArticle('published'); });
        $('btnPreview').addEventListener('click', openPreview);
        $('btnNewArticle').addEventListener('click', function () { resetNewArticle(); });

        // إدارة المقالات
        $('cmSearch').addEventListener('input', function () { mgState.q = this.value; renderManage(); });
        $('cmFilterCat').addEventListener('change', function () { mgState.cat = this.value; renderManage(); });
        $('cmFilterStatus').addEventListener('change', function () { mgState.status = this.value; renderManage(); });
        $('cmSort').addEventListener('change', function () { mgState.sort = this.value; renderManage(); });
        $('cmGrid').addEventListener('click', handleManageClick);

        // ربط أزرار إعادة فتح المحرر
        $('btnGoWrite').addEventListener('click', function () {
            resetNewArticle();
            var tab = document.querySelector('.dash-nav-item[data-view="article-write"]');
            if (tab) tab.click();
        });

        // اختصار Ctrl+S لحفظ المسودة
        document.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                var panel = document.querySelector('.dash-view[data-view-panel="article-write"]');
                if (panel && panel.classList.contains('active')) {
                    e.preventDefault();
                    saveArticle('draft');
                }
            }
        });

        // استرجاع المسودة
        tryRestoreDraft();
        updateSeoCounters();
        updateEditorInfo();
        renderManage();
    }

    /* ثوابت الخطوط والأحجام */
    var FONT_OPTIONS = [
        { name: 'Cairo', css: 'Cairo, sans-serif' },
        { name: 'Tajawal', css: 'Tajawal, sans-serif' },
        { name: 'Almarai', css: 'Almarai, sans-serif' },
        { name: 'Noto Kufi Arabic', css: '"Noto Kufi Arabic", sans-serif' },
        { name: 'IBM Plex Sans Arabic', css: '"IBM Plex Sans Arabic", sans-serif' },
        { name: 'Arial', css: 'Arial, sans-serif' },
        { name: 'Tahoma', css: 'Tahoma, sans-serif' }
    ];
    var SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 36, 44];

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();