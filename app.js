/* ================================================================
   HAMZA SAT — app.js
   Premium IPTV Landing Page Logic
   ================================================================ */

// ── Configuration ──────────────────────────────────────────────
const CONFIG = {
  whatsappNumber:  '213656577196',
  telegramUsername: 'Hamza_Sat',
  brandName:       'HAMZA SAT'
};

// ── Translations ────────────────────────────────────────────────
const translations = {
  ar: {
    // Nav
    home: 'الرئيسية', servers: 'الاشتراكات', features: 'مميزاتنا',
    setup: 'التفعيل', faq: 'الأسئلة', contact: 'اتصل بنا',

    // Labels
    serversLabel: 'الباقات المتاحة',
    whyLabel:     'لماذا نحن؟',
    setupLabel:   'خطوات التفعيل',
    faqLabel:     'الأسئلة الشائعة',
    ctaLabel:     'تواصل معنا الآن',
    footerLinksTitle:   'روابط سريعة',
    footerContactTitle: 'التواصل',

    // Hero
    heroBadge:     'بث مستقر بجودة 4K / Ultra HD',
    heroTitle:     'اشتراكات IPTV فائقة الجودة وبدون تقطيع',
    heroSubtitle:  'استمتع بمشاهدة آلاف القنوات العالمية المباشرة، ومكتبة ضخمة من الأفلام والمسلسلات المحدثة يومياً على جميع أجهزتك الذكية.',
    heroContactWA: 'تواصل عبر واتساب',
    heroContactTG: 'تواصل عبر تليجرام',
    heroExplore:   'استعرض الباقات',

    // Stats
    statChannels: 'قناة مباشرة',
    statQuality:  'جودة بث',
    statServers:  'سيرفرات متاحة',
    statSupport:  'دعم فني',

    // Showcase
    showcaseTitle:    'اختر سيرفر IPTV المناسب لك',
    showcaseSubtitle: 'نقدم لك أفضل وأقوى السيرفرات العالمية الأكثر استقراراً في السوق.',

    // Badge
    badgeRecommended: 'موصى به',

    // Prices
    dur1m: 'شهر واحد', dur3m: '3 أشهر', dur6m: '6 أشهر', dur1y: 'سنة كاملة',

    // Descriptions
    neoDesc:    'سيرفر ذو شعبية جارفة، يتميز بالاستقرار العالي ويحتوي على باقة قنوات عربية وأوروبية منوعة ومكتبة أفلام ضخمة.',
    strongDesc: 'سيرفر قوي جداً يدعم دقة 4K الحقيقية، ممتاز لمتابعة المباريات والأحداث الرياضية المباشرة بجودة عالية وثبات تام.',
    darDesc:    'باقة متميزة مخصصة لتطبيق DAR Player الشهير، تدعم جودة عالية وتصفحاً ذكياً وسريعاً للقنوات والأفلام.',
    familyDesc: 'السيرفر العائلي المثالي، يحتوي على قنوات عائلية منوعة، وأقسام خاصة للأطفال، مع حماية واستقرار رائع.',
    ironDesc:   'سيرفر غني عن التعريف بقوته وجودته، خادم عملاق وثابت جداً خلال المنافسات الرياضية الكبرى.',
    atlasDesc:  'يتميز بمكتبة أفلام ومسلسلات ضخمة جداً مع تحديثات يومية، وقنوات بجودات متعددة لتناسب جميع سرعات الإنترنت.',
    lynxDesc:   'سيرفر خفيف وسريع الاستجابة، ممتاز للأجهزة الضعيفة والمتوسطة ويعمل بكفاءة عالية على شبكات الإنترنت المختلفة.',
    kingDesc:   'السيرفر النخبة الفاخر (King365)، جودة بث أصلية غير مضغوطة وثبات لا مثيل له مع سيرفرات احتياطية.',
    iboDesc:    'تفعيل وتجديد رخصة تطبيق IBO Player Pro الشهير لتشغيل اشتراكات الـ IPTV على شاشات التلفزيون والأجهزة الذكية.',
    v12Desc:    'سيرفر V12 العملاق، يتميز بالثبات الفائق ومجموعة واسعة من القنوات الرياضية والترفيهية بجودات متعددة.',
    goldenDesc: 'سيرفر Golden TV المميز بمكتبة أفلام ومسلسلات ضخمة جداً ومحدثة يومياً مع استقرار تام أثناء المباريات.',
    danaDesc:    'سيرفر Dana TV الاقتصادي والمستقر، خيار ممتاز للعائلات لمتابعة القنوات الترفيهية بجودة ممتازة وسعر مميز.',
    kmDesc:      'سيرفر KM السريع والخفيف، مثالي لجميع الأجهزة والسرعات المختلفة مع جودة بث رائعة وثبات متواصل.',

    // Features List
    featChannels:   'أكثر من 15,000 قناة مباشرة',
    featVod:        'مكتبة أفلام ومسلسلات متجددة',
    featQuality:    'جودة 4K / UHD / FHD / HD',
    featSupport:    'دعم فني متواصل 24/7',
    featIboLicense: 'تفعيل فوري وآمن للتطبيق',
    featIboNoAds:   'بدون إعلانات ومستقر تماماً',
    featIboMulti:   'دعم تشغيل قوائم تشغيل متعددة',

    // Buttons
    btnOrderWA: 'واتساب',
    btnOrderTG: 'تليجرام',

    // Why Us
    whyTitle:    'لماذا تختار خدماتنا؟',
    whySubtitle: 'نضمن لك أفضل تجربة مشاهدة بفضل خوادمنا القوية والدعم الفني السريع.',
    feat1Title:  'خوادم فائقة السرعة',
    feat1Desc:   'نعتمد على خوادم ذات نطاق ترددي واسع لضمان مشاهدة خالية من التقطيع والبطء.',
    feat2Title:  'تحديثات مستمرة',
    feat2Desc:   'يتم تحديث مكتبة الأفلام والمسلسلات والقنوات بشكل دوري ومجاني لمواكبة كل جديد.',
    feat3Title:  'توافق كامل',
    feat3Desc:   'اشتراكاتنا تعمل على جميع الأجهزة: الشاشات الذكية، الهواتف، التي في بوكس، والحواسيب.',
    feat4Title:  'دعم فني متميز',
    feat4Desc:   'فريق الدعم الفني متواجد لمساعدتك في تفعيل الاشتراك وحل أي مشكلة فوراً.',

    // Guide
    guideTitle:    'خطوات بسيطة لتفعيل اشتراكك',
    guideSubtitle: 'ابدأ الاستمتاع بالخدمة خلال دقائق معدودة.',
    step1Title:    'اختر السيرفر المناسب',
    step1Desc:     'تصفح قائمة السيرفرات المتاحة واختر الذي يناسب جهازك واهتماماتك.',
    step2Title:    'تواصل معنا للتفعيل',
    step2Desc:     'اضغط على زر الطلب عبر الواتساب أو التليجرام للتواصل الفوري مع خدمة العملاء.',
    step3Title:    'ابدأ المشاهدة',
    step3Desc:     'سنزودك ببيانات الاشتراك ونوجهك خطوة بخطوة حتى تبدأ الاستمتاع بالبث.',

    // FAQ
    faqTitle:    'الأسئلة الشائعة',
    faqSubtitle: 'إجابات على أهم الاستفسارات حول خدمة الـ IPTV.',
    q1: 'هل أحتاج إلى سرعة إنترنت عالية لتشغيل الخدمة؟',
    a1: 'تتوفر سيرفراتنا بجودات بث متعددة (SD, HD, FHD, 4K) لتتناسب مع جميع سرعات الإنترنت. سرعة 8 ميغابت كافية لـ HD، وننصح بـ 25 ميغابت للـ 4K.',
    q2: 'ما هي الأجهزة التي تدعمها الاشتراكات؟',
    a2: 'تدعم الاشتراكات جميع الأجهزة: Smart TV (سامسونج، إل جي)، أجهزة أندرويد، Apple TV، الهواتف (iOS/Android)، Firestick، والحواسيب.',
    q3: 'هل يمكنني تشغيل الاشتراك على أكثر من جهاز في نفس الوقت؟',
    a3: 'الاشتراك الاعتيادي يعمل على جهاز واحد في نفس الوقت. التشغيل المتزامن قد يؤدي لحظر الحساب. تواصل معنا لاشتراك متعدد الأجهزة.',
    q4: 'كيف أحصل على تجربة مجانية قبل الاشتراك؟',
    a4: 'نعم، نوفر تجارب مجانية لمعظم السيرفرات. تواصل معنا مباشرة عبر واتساب أو تليجرام.',

    // CTA
    ctaTitle:    'جاهز لبدء تجربة المشاهدة الفاخرة؟',
    ctaSubtitle: 'تواصل معنا الآن عبر واتساب أو تليجرام للحصول على تجربة مجانية أو تفعيل اشتراكك فوراً. بدون عمولات وبدون أسعار مخفية.',

    // Footer
    footerDesc: 'المنصة الرائدة لتقديم اشتراكات وتفعيلات IPTV الأكثر استقراراً في العالم العربي وأوروبا.',

    // Trust Strip
    trust1: 'بث آمن ومشفّر',
    trust2: 'تفعيل فوري خلال دقائق',
    trust3: 'دعم فني 24/7',
    trust4: 'جودة 4K Ultra HD',
    trust5: 'تجربة مجانية متاحة'
  },

  fr: {
    home: 'Accueil', servers: 'Abonnements', features: 'Avantages',
    setup: 'Installation', faq: 'FAQ', contact: 'Contact',

    serversLabel: 'Nos Offres',
    whyLabel:     'Pourquoi Nous?',
    setupLabel:   'Comment ça Marche',
    faqLabel:     'FAQ',
    ctaLabel:     'Contactez-nous',
    footerLinksTitle:   'Liens Rapides',
    footerContactTitle: 'Contact',

    heroBadge:     'Streaming stable 4K / Ultra HD',
    heroTitle:     'Abonnements IPTV Premium Sans Coupure',
    heroSubtitle:  "Profitez de milliers de chaînes internationales en direct et d'une vaste bibliothèque VOD mise à jour quotidiennement sur tous vos appareils.",
    heroContactWA: 'WhatsApp',
    heroContactTG: 'Telegram',
    heroExplore:   'Voir les offres',

    statChannels: 'chaînes en direct',
    statQuality:  'qualité de streaming',
    statServers:  'serveurs disponibles',
    statSupport:  'support technique',

    showcaseTitle:    'Sélectionnez votre serveur IPTV',
    showcaseSubtitle: 'Nous proposons les serveurs les plus stables et populaires du marché. Choisissez et contactez-nous.',

    badgeRecommended: 'Recommandé',

    dur1m: '1 Mois', dur3m: '3 Mois', dur6m: '6 Mois', dur1y: '1 An',

    neoDesc:    "Serveur très populaire et stable, avec un large choix de chaînes arabes et européennes ainsi qu'une grande bibliothèque VOD.",
    strongDesc: "Serveur ultra performant supportant la vraie 4K, idéal pour suivre les événements sportifs avec une fluidité absolue.",
    darDesc:    "Abonnement optimisé pour DAR Player, garantissant une navigation fluide et un streaming haute définition.",
    familyDesc: "Serveur familial par excellence. Chaînes variées, sections enfants sécurisées, et excellente stabilité.",
    ironDesc:   "Reconnu pour sa puissance et qualité. Serveur géant et très stable lors des grands événements sportifs.",
    atlasDesc:  "Grande bibliothèque VOD mise à jour quotidiennement, avec plusieurs qualités adaptées à votre débit.",
    lynxDesc:   "Serveur léger et réactif, idéal pour les appareils de moyenne configuration.",
    kingDesc:   "Serveur élite haut de gamme (King365). Qualité brute non compressée et stabilité maximale.",
    iboDesc:    "Activation officielle d'IBO Player Pro pour lire vos abonnements IPTV sur Smart TV et mobiles.",
    v12Desc:    "Serveur V12 géant, caractérisé par une stabilité extrême et un large choix de chaînes sportives et divertissement.",
    goldenDesc: "Serveur Golden TV avec une immense bibliothèque de films et séries mise à jour quotidiennement et une stabilité totale.",
    danaDesc:    "Serveur Dana TV économique et stable, un excellent choix pour toute la famille avec une superbe qualité.",
    kmDesc:      "Serveur KM rapide et léger, idéal pour tous les appareils et débits avec une superbe qualité d'image.",

    featChannels:   'Plus de 15 000 chaînes en direct',
    featVod:        'Films & Séries (VOD) mis à jour',
    featQuality:    'Qualité 4K / UHD / FHD / HD',
    featSupport:    'Support technique 24h/24 & 7j/7',
    featIboLicense: 'Activation immédiate et sécurisée',
    featIboNoAds:   'Sans publicités et ultra fluide',
    featIboMulti:   'Prend en charge plusieurs playlists',

    btnOrderWA: 'WhatsApp',
    btnOrderTG: 'Telegram',

    whyTitle:    'Pourquoi nous choisir ?',
    whySubtitle: 'Nous vous garantissons la meilleure expérience grâce à nos serveurs haute performance.',
    feat1Title:  'Serveurs Ultra Rapides',
    feat1Desc:   'Serveurs à large bande passante pour un flux fluide sans tampon.',
    feat2Title:  'Mises à Jour Régulières',
    feat2Desc:   'Notre catalogue VOD et chaînes est mis à jour gratuitement en permanence.',
    feat3Title:  'Compatibilité Totale',
    feat3Desc:   'Smart TV, Boîtier Android, Apple TV, smartphones et ordinateurs.',
    feat4Title:  'Support Réactif',
    feat4Desc:   "Notre équipe est disponible pour vous assister et configurer votre abonnement.",

    guideTitle:    'Comment ça marche ?',
    guideSubtitle: 'Commencez à regarder en 3 étapes simples.',
    step1Title:    'Choisissez un serveur',
    step1Desc:     'Parcourez nos offres et sélectionnez le serveur qui correspond à vos besoins.',
    step2Title:    'Contactez le support',
    step2Desc:     "Cliquez sur WhatsApp ou Telegram pour contacter notre équipe d'activation.",
    step3Title:    'Profitez du streaming',
    step3Desc:     "Nous vous fournirons vos codes d'accès et vous guiderons pas à pas.",

    faqTitle:    'Foire Aux Questions',
    faqSubtitle: 'Retrouvez les réponses aux questions les plus fréquentes.',
    q1: 'Quelle vitesse de connexion est requise ?',
    a1: "Nos serveurs s'adaptent à votre débit. 8 Mbps suffisent pour la HD, 25 Mbps sont recommandés pour la 4K.",
    q2: "Sur quels appareils puis-je utiliser l'abonnement ?",
    a2: "Compatibles avec toutes Smart TV (Samsung, LG), boîtiers Android, Apple TV, smartphones (iOS/Android), Firestick et ordinateurs.",
    q3: "Puis-je utiliser l'abonnement sur plusieurs appareils en même temps ?",
    a3: "Chaque abonnement standard autorise une seule connexion simultanée. Contactez-nous pour un abonnement multi-écrans.",
    q4: 'Est-il possible de tester le service avant achat ?',
    a4: 'Oui, nous proposons des tests gratuits. Contactez-nous par WhatsApp ou Telegram.',

    ctaTitle:    "Prêt à commencer l'expérience ?",
    ctaSubtitle: "Contactez-nous sur WhatsApp ou Telegram pour un test gratuit ou activer votre abonnement. Sans frais cachés.",

    footerDesc: "La plateforme de référence pour des abonnements IPTV stables et performants en Europe et dans le monde arabe.",

    // Trust Strip
    trust1: 'Streaming sécurisé',
    trust2: 'Activation en quelques minutes',
    trust3: 'Support 24h/24 & 7j/7',
    trust4: 'Qualité 4K Ultra HD',
    trust5: 'Test gratuit disponible'
  }
};

// ── State ────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('iptv_lang') || 'ar';

// ── DOM Ready ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initFAQ();
  initScrollReveal();
  initHeaderScroll();
  initMobileMenu();
  initBackToTop();
  initCardShine();
  initPriceRowClicks();
  updateContactUrls();
});

// ── Language ─────────────────────────────────────────────────────
function initLanguage() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });
  setLanguage(currentLang);
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('iptv_lang', lang);

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const t   = translations[lang];
    if (t && t[key] !== undefined) el.textContent = t[key];
  });

  updateContactUrls();
}

// ── Pre-filled Messages ──────────────────────────────────────────
function getMessage(serverName, lang) {
  if (lang === 'fr') {
    if (serverName === 'General')
      return "Bonjour! Je souhaite me renseigner sur vos abonnements IPTV et obtenir un test gratuit.";
    if (serverName === 'IBO Player Pro')
      return "Bonjour! Je souhaite activer IBO Player Pro. Comment procéder ?";
    return `Bonjour! Je suis intéressé par l'abonnement au serveur (${serverName}) IPTV. Test gratuit possible ?`;
  }
  if (serverName === 'General')
    return "مرحباً! أود الاستفسار عن اشتراكات الـ IPTV المتاحة والحصول على تجربة مجانية.";
  if (serverName === 'IBO Player Pro')
    return "مرحباً! أود تفعيل تطبيق IBO Player Pro. كيف يمكنني الإجراء؟";
  return `مرحباً! أنا مهتم بالاشتراك في سيرفر (${serverName}) IPTV. هل يمكنني الحصول على تجربة مجانية أو تفعيل الاشتراك؟`;
}

// ── Contact URLs ─────────────────────────────────────────────────
function updateContactUrls() {
  const wa  = `https://wa.me/${CONFIG.whatsappNumber}`;
  const tg  = `https://t.me/${CONFIG.telegramUsername}`;
  const gMsg = encodeURIComponent(getMessage('General', currentLang));

  // Hero
  setHref('hero-wa-btn', `${wa}?text=${gMsg}`);
  setHref('hero-tg-btn', tg);

  // CTA
  setHref('cta-wa-btn', `${wa}?text=${gMsg}`);
  setHref('cta-tg-btn', tg);

  // Floating
  setHref('float-wa', `${wa}?text=${gMsg}`);
  setHref('float-tg', tg);

  // Footer
  setHref('footer-wa', `${wa}?text=${gMsg}`);
  setHref('footer-tg', tg);
  setHref('fs-wa', `${wa}?text=${gMsg}`);
  setHref('fs-tg', tg);

  // Cards
  document.querySelectorAll('.sub-card').forEach(card => {
    const name = card.getAttribute('data-server');
    const msg  = encodeURIComponent(getMessage(name, currentLang));
    const waBtn = card.querySelector('.card-wa-btn');
    const tgBtn = card.querySelector('.card-tg-btn');
    if (waBtn) waBtn.href = `${wa}?text=${msg}`;
    if (tgBtn) tgBtn.href = tg;
  });
}

function setHref(id, url) {
  const el = document.getElementById(id);
  if (el) el.href = url;
}

// ── FAQ Accordion ────────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ── Scroll Reveal ────────────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animation
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Header on Scroll ─────────────────────────────────────────────
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    // Add scrolled shadow
    if (current > 60) {
      header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.4)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Hide on scroll down, show on scroll up (optional UX)
    lastScroll = current;
  }, { passive: true });
}

// ── Mobile Menu ──────────────────────────────────────────────────
function initMobileMenu() {
  const toggle  = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      toggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });
}

// ── Back To Top ───────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Card Shine (mouse follow shimmer) ───────────────────────
function initCardShine() {
  document.querySelectorAll('.sub-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = ((e.clientX - rect.left) / rect.width)  * 100;
      const y      = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}
// ── Price Row Click → WhatsApp ───────────────────────
function initPriceRowClicks() {
  document.querySelectorAll('.sub-card').forEach(card => {
    const serverName = card.getAttribute('data-server') || '';
    const rows = card.querySelectorAll('.price-row');

    rows.forEach(row => {
      // Make keyboard-accessible
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');

      const openWA = () => {
        const price = row.getAttribute('data-price') || '';
        const duration = currentLang === 'fr' ? (row.getAttribute('data-dur-fr') || '') : (row.getAttribute('data-dur-ar') || '');
        const msg   = buildPriceMessage(serverName, duration, price, currentLang);
        const url   = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank', 'noopener');
      };

      row.addEventListener('click', openWA);
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openWA();
        }
      });
    });
  });
}

// Build the WhatsApp message for a specific duration
function buildPriceMessage(server, duration, price, lang) {
  if (lang === 'fr') {
    return `Bonjour! Je souhaite m'abonner au serveur (${server}) pour une durée de (${duration}) au prix de ${price} DZD. Comment procéder pour l'activation ?`;
  }
  return `مرحباً! أريد الاشتراك في سيرفر (${server}) لمدة (${duration}) بسعر ${price} د.ج. هل يمكن التفعيل الآن؟`;
}
