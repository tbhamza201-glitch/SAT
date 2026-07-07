// Configuration
const CONFIG = {
  whatsappNumber: '213656577196',
  telegramUsername: 'Hamza_Sat',
  brandName: 'HAMZA SAT'
};

// Translations Dictionary
const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    servers: 'الاشتراكات',
    features: 'مميزاتنا',
    setup: 'طريقة التفعيل',
    faq: 'الأسئلة الشائعة',
    contact: 'اتصل بنا',
    
    // Hero Section
    heroBadge: 'بث مستقر بجودة عالية 4K / Ultra HD',
    heroTitle: 'اشتراكات IPTV فائقة الجودة وبدون تقطيع',
    heroSubtitle: 'استمتع بمشاهدة آلاف القنوات العالمية المباشرة، ومكتبة ضخمة من الأفلام والمسلسلات المحدثة يومياً على جميع أجهزتك الذكية.',
    heroContactWA: 'تواصل عبر واتساب',
    heroContactTG: 'تواصل عبر تليجرام',
    
    // Servers Showcase Section
    showcaseTitle: 'اختر سيرفر IPTV المناسب لك',
    showcaseSubtitle: 'نقدم لك أفضل وأقوى السيرفرات العالمية الأكثر استقراراً في السوق. اختر السيرفر وتواصل معنا لتفعيله فوراً.',
    
    // Server Cards details
    neoDesc: 'سيرفر ذو شعبية جارفة، يتميز بالاستقرار العالي ويحتوي على باقة قنوات عربية وأوروبية منوعة ومكتبة أفلام ضخمة.',
    strongDesc: 'سيرفر قوي جداً يدعم دقة 4K الحقيقية، ممتاز لمتابعة المباريات والأحداث الرياضية المباشرة بجودة عالية وثبات تام.',
    darDesc: 'باقة متميزة مخصصة لتطبيق DAR Player الشهير، تدعم جودة عالية وتصفحاً ذكياً وسريعاً للقنوات والأفلام.',
    familyDesc: 'السيرفر العائلي المثالي، يحتوي على قنوات عائلية منوعة، وأقسام خاصة للأطفال، مع حماية واستقرار رائع.',
    ironDesc: 'سيرفر غني عن التعريف بقوته وجودته، خادم عملاق وثابت جداً خلال المنافسات الرياضية الكبرى.',
    atlasDesc: 'يتميز بمكتبة أفلام ومسلسلات ضخمة جداً مع تحديثات يومية، وقنوات بجودات متعددة لتناسب جميع سرعات الإنترنت.',
    lynxDesc: 'سيرفر خفيف وسريع الاستجابة، ممتاز للأجهزة الضعيفة والمتوسطة ويعمل بكفاءة عالية على شبكات الإنترنت المختلفة.',
    kingDesc: 'السيرفر النخبة الفاخر (King365)، جودة بث أصلية غير مضغوطة وثبات لا مثيل له مع سيرفرات احتياطية.',
    iboDesc: 'تفعيل وتجديد رخصة تطبيق IBO Player Pro الشهير لتشغيل اشتراكات الـ IPTV على شاشات التلفزيون والأجهزة الذكية.',
    
    // Card Features List
    featChannels: 'أكثر من 15,000 قناة مباشرة',
    featVod: 'مكتبة أفلام ومسلسلات متجددة',
    featQuality: 'دقة 4K / UHD / FHD / HD',
    featSupport: 'دعم فني متواصل 24/7',
    featIboLicense: 'تفعيل فوري وآمن للتطبيق',
    featIboNoAds: 'بدون إعلانات ومستقر تماماً',
    featIboMulti: 'دعم تشغيل قوائم تشغيل متعددة',
    
    // Card Buttons
    btnOrderWA: 'طلب عبر واتساب',
    btnOrderTG: 'طلب عبر تليجرام',
    
    // Features Section
    whyTitle: 'لماذا تختار خدماتنا؟',
    whySubtitle: 'نحن نضمن لك أفضل تجربة مشاهدة بفضل خوادمنا القوية والدعم الفني السريع.',
    feat1Title: 'خوادم فائقة السرعة',
    feat1Desc: 'نعتمد على خوادم ذات نطاق ترددي واسع لضمان مشاهدة خالية تماماً من التقطيع والبطء.',
    feat2Title: 'تحديثات مستمرة',
    feat2Desc: 'يتم تحديث مكتبة الأفلام والمسلسلات والقنوات بشكل دوري ومجاني لمواكبة كل جديد.',
    feat3Title: 'توافق كامل',
    feat3Desc: 'اشتراكاتنا تعمل على جميع الأجهزة: الشاشات الذكية، الهواتف، التي في بوكس، والحواسيب.',
    feat4Title: 'دعم فني متميز',
    feat4Desc: 'فريق الدعم الفني متواجد لمساعدتك في تفعيل الاشتراك وحل أي مشكلة قد تواجهك فوراً.',
    
    // Guide Section
    guideTitle: 'خطوات بسيطة لتفعيل اشتراكك',
    guideSubtitle: 'كيف تبدأ في الاستمتاع بالخدمة خلال دقائق معدودة؟',
    step1Title: 'اختر السيرفر المناسب',
    step1Desc: 'تصفح قائمة السيرفرات المتاحة واختر السيرفر الذي يناسب نوع جهازك واهتماماتك.',
    step2Title: 'تواصل معنا للتفعيل',
    step2Desc: 'اضغط على زر الطلب عبر الواتساب أو التليجرام للتواصل الفوري مع خدمة العملاء.',
    step3Title: 'ابدأ المشاهدة',
    step3Desc: 'سنقوم بتزويدك ببيانات الاشتراك وتوجيهك خطوة بخطوة حتى تبدأ في الاستمتاع بالبث.',
    
    // FAQ Section
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'إجابات على أهم الاستفسارات التي تدور في ذهنك حول خدمة الـ IPTV.',
    q1: 'هل أحتاج إلى سرعة إنترنت عالية لتشغيل الخدمة؟',
    a1: 'تتوفر سيرفراتنا بجودات بث متعددة (SD, HD, FHD, 4K) لتتناسب مع جميع سرعات الإنترنت. سرعة 8 ميغابت بالثانية كافية لتشغيل قنوات HD بثبات، بينما نوصي بـ 25 ميغابت للـ 4K.',
    q2: 'ما هي الأجهزة التي تدعمها الاشتراكات؟',
    a2: 'تدعم الاشتراكات جميع الأجهزة الذكية بما في ذلك شاشات Smart TV (سامسونج، إل جي)، أجهزة أندرويد (Xiaomi Mi Box، تلفزيونات أندرويد)، أجهزة Apple TV، الهواتف الذكية (iOS و Android)، أجهزة Firestick، والحواسيب.',
    q3: 'هل يمكنني تشغيل الاشتراك على أكثر من جهاز في نفس الوقت؟',
    a3: 'بشكل افتراضي، يعمل الاشتراك على جهاز واحد في نفس الوقت. تشغيل الاشتراك على أجهزة متعددة في آن واحد قد يؤدي إلى حظر الحساب تلقائياً من السيرفر. تواصل معنا إذا كنت ترغب في اشتراك يدعم أجهزة متعددة.',
    q4: 'كيف أحصل على تجربة مجانية قبل الاشتراك؟',
    a4: 'نعم، نوفر تجارب مجانية لمعظم السيرفرات المتاحة للتحقق من الجودة والاستقرار قبل الشراء. تواصل معنا مباشرة عبر واتساب أو تليجرام لطلب التجربة المجانية.',
    
    // CTA Section
    ctaTitle: 'جاهز لبدء تجربة المشاهدة الفاخرة؟',
    ctaSubtitle: 'تواصل معنا الآن عبر واتساب أو تليجرام للحصول على تجربة مجانية أو تفعيل اشتراكك فوراً. بدون عمولات وبدون أسعار مخفية.',
    
    // Footer
    footerDesc: 'المنصة الرائدة لتقديم اشتراكات وتفعيلات IPTV الأكثر استقراراً في العالم العربي وأوروبا.'
  },
  fr: {
    // Navigation
    home: 'Accueil',
    servers: 'Abonnements',
    features: 'Avantages',
    setup: 'Installation',
    faq: 'FAQ',
    contact: 'Contact',
    
    // Hero Section
    heroBadge: 'Streaming stable en 4K / Ultra HD',
    heroTitle: 'Abonnements IPTV Premium Sans Coupure',
    heroSubtitle: 'Profitez de milliers de chaînes internationales en direct, ainsi que d\'une vaste bibliothèque de films et séries mis à jour quotidiennement sur tous vos appareils.',
    heroContactWA: 'Contactez-nous sur WhatsApp',
    heroContactTG: 'Contactez-nous sur Telegram',
    
    // Servers Showcase Section
    showcaseTitle: 'Sélectionnez votre serveur IPTV',
    showcaseSubtitle: 'Nous proposons les serveurs les plus stables et les plus populaires du marché. Choisissez celui qui vous convient et contactez-nous.',
    
    // Server Cards details
    neoDesc: 'Un serveur très populaire et stable, offrant un large choix de chaînes arabes et européennes ainsi qu\'une grande bibliothèque VOD.',
    strongDesc: 'Serveur ultra performant supportant la vraie 4K, idéal pour suivre les événements sportifs en direct avec une fluidité absolue.',
    darDesc: 'Abonnement optimisé pour la célèbre application DAR Player, garantissant une navigation fluide et un streaming haute définition.',
    familyDesc: 'Le serveur familial par excellence. Propose des chaînes variées, des sections sécurisées pour enfants, et une excellente stabilité.',
    ironDesc: 'Reconnu pour sa puissance et sa qualité. Un serveur géant et très stable, particulièrement lors des grands événements sportifs.',
    atlasDesc: 'Dispose d\'une immense bibliothèque de films et séries mis à jour quotidiennement, avec plusieurs qualités adaptées à votre débit.',
    lynxDesc: 'Serveur léger et réactif, idéal pour les appareils de moyenne configuration et fonctionnant parfaitement sur diverses connexions.',
    kingDesc: 'Le serveur élite haut de gamme (King365). Qualité d\'image brute non compressée et stabilité maximale avec serveurs de secours.',
    iboDesc: 'Activation officielle et licence pour l\'application IBO Player Pro afin de lire vos abonnements IPTV sur Smart TV et mobiles.',
    
    // Card Features List
    featChannels: 'Plus de 15 000 chaînes en direct',
    featVod: 'Films & Séries (VOD) mis à jour',
    featQuality: 'Qualité 4K / UHD / FHD / HD',
    featSupport: 'Support technique 24h/24 & 7j/7',
    featIboLicense: 'Activation immédiate et sécurisée',
    featIboNoAds: 'Sans publicités et ultra fluide',
    featIboMulti: 'Prend en charge plusieurs playlists',
    
    // Card Buttons
    btnOrderWA: 'Commander via WhatsApp',
    btnOrderTG: 'Commander via Telegram',
    
    // Features Section
    whyTitle: 'Pourquoi nous choisir ?',
    whySubtitle: 'Nous vous garantissons la meilleure expérience utilisateur grâce à nos serveurs haute performance.',
    feat1Title: 'Serveurs Ultra Rapides',
    feat1Desc: 'Nous utilisons des serveurs à large bande passante pour garantir un flux fluide sans mise en mémoire tampon.',
    feat2Title: 'Mises à Jour Régulières',
    feat2Desc: 'Notre catalogue de films, séries et chaînes est constamment mis à jour gratuitement.',
    feat3Title: 'Compatibilité Totale',
    feat3Desc: 'Nos abonnements fonctionnent sur Smart TV, Boîtier Android, Apple TV, smartphones et ordinateurs.',
    feat4Title: 'Support Réactif',
    feat4Desc: 'Notre équipe technique est disponible pour vous assister et configurer votre abonnement en quelques minutes.',
    
    // Guide Section
    guideTitle: 'Comment ça marche ?',
    guideSubtitle: 'Commencez à regarder vos programmes préférés en 3 étapes simples.',
    step1Title: 'Choisissez un serveur',
    step1Desc: 'Parcourez nos offres et sélectionnez le serveur qui correspond le mieux à vos besoins et à vos appareils.',
    step2Title: 'Contactez le support',
    step2Desc: 'Cliquez sur le bouton WhatsApp ou Telegram pour entrer en contact avec notre équipe d\'activation.',
    step3Title: 'Profitez du streaming',
    step3Desc: 'Nous vous fournirons vos codes d\'accès et vous guiderons pas à pas pour configurer votre application.',
    
    // FAQ Section
    faqTitle: 'Foire Aux Questions',
    faqSubtitle: 'Retrouvez les réponses aux questions les plus fréquemment posées sur nos services.',
    q1: 'Quelle vitesse de connexion internet est requise ?',
    a1: 'Nos serveurs s\'adaptent à votre débit. Une vitesse de 8 Mbps est suffisante pour la HD, tandis que 25 Mbps ou plus sont recommandés pour profiter pleinement de la 4K sans coupure.',
    q2: 'Sur quels appareils puis-je utiliser l\'abonnement ?',
    a2: 'Nos services sont compatibles avec toutes les Smart TV (Samsung, LG, Sony), les boîtiers Android (Xiaomi Mi Box, Nvidia Shield), Apple TV, smartphones (iOS/Android), Firestick et ordinateurs.',
    q3: 'Puis-je utiliser l\'abonnement sur plusieurs appareils en même temps ?',
    a3: 'Non, chaque abonnement standard autorise une seule connexion simultanée. L\'utilisation sur plusieurs appareils en même temps peut entraîner le blocage automatique de votre code par le serveur.',
    q4: 'Est-il possible de tester le service avant d\'acheter ?',
    a4: 'Oui, nous proposons des tests gratuits pour la majorité de nos serveurs afin que vous puissiez évaluer la qualité et la stabilité du réseau. Contactez-nous par WhatsApp ou Telegram.',
    
    // CTA Section
    ctaTitle: 'Prêt à commencer l\'expérience ?',
    ctaSubtitle: 'Contactez-nous dès maintenant sur WhatsApp ou Telegram pour obtenir un test gratuit ou activer votre abonnement. Pas de frais cachés.',
    
    // Footer
    footerDesc: 'La plateforme de référence pour des abonnements IPTV stables et performants en Europe et dans le monde arabe.'
  }
};

// Global Language State
let currentLang = localStorage.getItem('iptv_lang') || 'ar';

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  // Setup dynamic brand names
  document.querySelectorAll('.brand-placeholder').forEach(el => {
    el.textContent = CONFIG.brandName;
  });
  
  // Set initial language
  setLanguage(currentLang);
  
  // Bind language switch buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.target.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });
  
  // Bind FAQ Accordion
  setupFaqAccordion();
});

// Set Language Function
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('iptv_lang', lang);
  
  // Update HTML tag attributes
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  // Update Switcher Active Button State
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  // Update Dynamic URLs
  updateContactUrls();
}

// Generate Pre-filled Message templates
function getPreFilledMessage(serverName, lang) {
  if (lang === 'ar') {
    if (serverName === 'General') {
      return `مرحباً! أود الاستفسار عن اشتراكات الـ IPTV المتاحة والحصول على تجربة مجانية.`;
    }
    if (serverName === 'IBO Player Pro') {
      return `مرحباً! أود تفعيل تطبيق IBO Player Pro. كيف يمكنني إرسال كود الماك (MAC Address)؟`;
    }
    return `مرحباً! أنا مهتم بالاشتراك في سيرفر (${serverName}) IPTV. هل يمكنني الحصول على تجربة مجانية أو تفعيل الاشتراك؟`;
  } else {
    if (serverName === 'General') {
      return `Bonjour! Je souhaite me renseigner sur vos abonnements IPTV disponibles et obtenir un test gratuit.`;
    }
    if (serverName === 'IBO Player Pro') {
      return `Bonjour! Je souhaite activer l'application IBO Player Pro. Comment puis-je procéder ?`;
    }
    return `Bonjour! Je suis intéressé par l'abonnement au serveur (${serverName}) IPTV. Est-il possible d'obtenir un test ou de l'activer ?`;
  }
}

// Update all links for WhatsApp and Telegram
function updateContactUrls() {
  const waBase = 'https://wa.me/';
  const tgBase = 'https://t.me/';
  
  // 1. Update Hero Buttons
  const heroWa = document.getElementById('hero-wa-btn');
  const heroTg = document.getElementById('hero-tg-btn');
  const generalMsg = encodeURIComponent(getPreFilledMessage('General', currentLang));
  
  if (heroWa) heroWa.href = `${waBase}${CONFIG.whatsappNumber}?text=${generalMsg}`;
  if (heroTg) heroTg.href = `${tgBase}${CONFIG.telegramUsername}`;
  
  // 2. Update Footer CTA Buttons
  const ctaWa = document.getElementById('cta-wa-btn');
  const ctaTg = document.getElementById('cta-tg-btn');
  if (ctaWa) ctaWa.href = `${waBase}${CONFIG.whatsappNumber}?text=${generalMsg}`;
  if (ctaTg) ctaTg.href = `${tgBase}${CONFIG.telegramUsername}`;
  
  // 3. Update Floating Buttons
  const floatWa = document.getElementById('float-wa');
  const floatTg = document.getElementById('float-tg');
  if (floatWa) floatWa.href = `${waBase}${CONFIG.whatsappNumber}?text=${generalMsg}`;
  if (floatTg) floatTg.href = `${tgBase}${CONFIG.telegramUsername}`;
  
  // 4. Update Showcase Cards Buttons
  document.querySelectorAll('.sub-card').forEach(card => {
    const serverName = card.getAttribute('data-server');
    const waBtn = card.querySelector('.card-wa-btn');
    const tgBtn = card.querySelector('.card-tg-btn');
    
    if (waBtn && tgBtn) {
      const cardMsg = encodeURIComponent(getPreFilledMessage(serverName, currentLang));
      waBtn.href = `${waBase}${CONFIG.whatsappNumber}?text=${cardMsg}`;
      tgBtn.href = `${tgBase}${CONFIG.telegramUsername}`;
    }
  });
}

// Setup FAQ Accordion Logic
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other active items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
        }
      });
      
      // Toggle current item
      const answer = item.querySelector('.faq-answer');
      item.classList.toggle('active');
      
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0px';
      }
    });
  });
}
