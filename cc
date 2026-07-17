/* ============================================================
   HAMZA SAT — Premium Design System
   Elite IPTV Landing Page — Full CSS Rewrite
   ============================================================ */

/* ── Google Fonts ── */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap');

/* ── Design Tokens ── */
:root {
  /* Backgrounds */
  --bg-primary:    #060910;
  --bg-secondary:  #0c1220;
  --bg-card:       rgba(12, 18, 32, 0.7);
  --bg-card-hover: rgba(18, 26, 48, 0.85);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.05);
  --border-card:   rgba(255, 255, 255, 0.08);
  --border-glow:   rgba(59, 130, 246, 0.25);

  /* Accent Palette */
  --cyan:    #06b6d4;
  --blue:    #3b82f6;
  --indigo:  #6366f1;
  --purple:  #a855f7;
  --gold:    #f59e0b;
  --green:   #10b981;
  --rose:    #f43f5e;

  /* Text */
  --text-primary:   #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted:     #4b5563;

  /* Fonts */
  --font-ar: 'Cairo', sans-serif;
  --font-en: 'Inter', sans-serif;

  /* Transitions */
  --t-fast:   0.18s ease;
  --t-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --t-slow:   0.5s cubic-bezier(0.4, 0, 0.2, 1);

  /* Shadows */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 30px rgba(59, 130, 246, 0.12);
}

/* ── Reset & Base ── */
*, *::before, *::after {
  margin: 0; padding: 0;
  box-sizing: border-box;
  outline: none;
}

html { scroll-behavior: smooth; }

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-en);
  line-height: 1.65;
  overflow-x: hidden;
}

html[lang="ar"] body { font-family: var(--font-ar); }

p { color: var(--text-secondary); }

h1, h2, h3, h4 {
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

/* ── Animated Background ── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 15% 10%, rgba(59,130,246,0.07) 0%, transparent 50%),
    radial-gradient(ellipse 60% 50% at 85% 90%, rgba(168,85,247,0.06) 0%, transparent 50%),
    radial-gradient(ellipse 40% 40% at 50% 50%, rgba(6,182,212,0.03) 0%, transparent 60%);
  pointer-events: none;
  z-index: -1;
}

/* ── Noise Texture Overlay ── */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: -1;
  opacity: 0.4;
}

/* ── Container ── */
.container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ── Utility Glow Text ── */
.glow-cyan   { text-shadow: 0 0 18px rgba(6,182,212,0.5); }
.glow-blue   { text-shadow: 0 0 18px rgba(59,130,246,0.5); }
.glow-purple { text-shadow: 0 0 18px rgba(168,85,247,0.5); }
.glow-gold   { text-shadow: 0 0 18px rgba(245,158,11,0.5); }

/* ============================================================
   HEADER
   ============================================================ */
header {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 1000;
  transition: var(--t-normal);
}

header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(6, 9, 16, 0.75);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border-subtle);
  z-index: -1;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.4rem;
  background: none;
  -webkit-text-fill-color: initial;
}

.logo img {
  height: 44px;
  border-radius: 8px;
  filter: drop-shadow(0 2px 8px rgba(6,182,212,0.3));
}

.logo-name {
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  letter-spacing: -0.03em;
}

/* Nav */
.header-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  gap: 0.25rem;
  list-style: none;
}

.nav-links a {
  display: block;
  padding: 0.5rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: var(--t-fast);
}

.nav-links a:hover {
  color: var(--text-primary);
  background: rgba(255,255,255,0.06);
}

/* Language Switcher */
.lang-switcher {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-card);
  border-radius: 50px;
  padding: 3px;
}

.lang-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.45rem 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: var(--t-normal);
  font-family: inherit;
}

html[lang="ar"] .lang-btn { font-family: var(--font-ar); }

.lang-btn.active {
  background: linear-gradient(135deg, var(--blue), var(--indigo));
  color: #fff;
  box-shadow: 0 4px 12px rgba(59,130,246,0.35);
}

/* Mobile Menu Toggle */
.menu-toggle {
  display: none;
  background: none;
  border: 1px solid var(--border-card);
  color: var(--text-primary);
  font-size: 1.2rem;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--t-fast);
}

.menu-toggle:hover { background: rgba(255,255,255,0.06); }

/* ============================================================
   HERO
   ============================================================ */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 0 5rem;
  position: relative;
  overflow: hidden;
}

/* Animated glow blobs */
.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: blobFloat 8s ease-in-out infinite alternate;
  pointer-events: none;
}

.hero-blob-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
  top: -100px; left: -100px;
  animation-delay: 0s;
}

.hero-blob-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%);
  bottom: -80px; right: -80px;
  animation-delay: -3s;
}

.hero-blob-3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%);
  top: 40%; left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -6s;
}

@keyframes blobFloat {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, -30px) scale(1.08); }
}

.hero-blob-3 {
  animation: blobFloat3 8s ease-in-out infinite alternate;
}

@keyframes blobFloat3 {
  0%   { transform: translate(-50%, -50%) scale(1); }
  100% { transform: translate(-50%, -50%) scale(1.1); }
}

/* Hero Content */
.hero-content { position: relative; z-index: 2; }

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.25);
  color: var(--cyan);
  padding: 0.5rem 1.3rem;
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 2rem;
  animation: pulseGlow 3s ease-in-out infinite;
}

.hero-eyebrow i { font-size: 0.8rem; }

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.35); }
  50%       { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
}

.hero h1 {
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  line-height: 1.15;
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}

.hero h1 .gradient-text {
  background: linear-gradient(135deg, #fff 0%, var(--cyan) 50%, var(--blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

html[lang="ar"] .hero h1 {
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  line-height: 1.3;
}

.hero-subtitle {
  font-size: 1.15rem;
  max-width: 680px;
  margin: 0 auto 2.5rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
}

/* Stats Strip */
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  border-top: 1px solid var(--border-subtle);
  padding-top: 2.5rem;
  margin-top: 2.5rem;
}

.stat-item {
  text-align: center;
}

.stat-num {
  font-size: 1.9rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.stat-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.3rem;
  font-weight: 500;
}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.9rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: var(--t-normal);
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0);
  transition: background var(--t-fast);
}

.btn:hover::after { background: rgba(255,255,255,0.08); }

.btn:active { transform: translateY(1px); }

/* WhatsApp */
.btn-wa {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #fff;
  box-shadow: 0 8px 20px rgba(37,211,102,0.25);
}
.btn-wa:hover { transform: translateY(-3px); box-shadow: 0 14px 28px rgba(37,211,102,0.4); }

/* Telegram */
.btn-tg {
  background: linear-gradient(135deg, #29b6f6, #0288d1);
  color: #fff;
  box-shadow: 0 8px 20px rgba(0,136,204,0.25);
}
.btn-tg:hover { transform: translateY(-3px); box-shadow: 0 14px 28px rgba(0,136,204,0.4); }

/* Primary (Blue) */
.btn-primary {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #fff;
  box-shadow: 0 8px 20px rgba(37,211,102,0.25);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 28px rgba(37,211,102,0.4); }

/* Secondary (Telegram) */
.btn-secondary {
  background: linear-gradient(135deg, #29b6f6, #0288d1);
  color: #fff;
  box-shadow: 0 8px 20px rgba(0,136,204,0.25);
}
.btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 14px 28px rgba(0,136,204,0.4); }

/* Ghost */
.btn-ghost {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-card);
  color: var(--text-primary);
}
.btn-ghost:hover {
  background: rgba(255,255,255,0.08);
  border-color: var(--text-secondary);
  transform: translateY(-2px);
}

/* ============================================================
   SECTION SHARED
   ============================================================ */
.section { padding: 6rem 0; }

.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 4rem;
}

.section-label {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cyan);
  background: rgba(6,182,212,0.1);
  border: 1px solid rgba(6,182,212,0.2);
  padding: 0.35rem 1rem;
  border-radius: 50px;
  margin-bottom: 1.2rem;
}

.section-header h2 {
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to bottom, #fff 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

html[lang="ar"] .section-header h2 {
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1.35;
}

.section-header p {
  font-size: 1.05rem;
  line-height: 1.75;
}

/* ============================================================
   SHOWCASE / CARDS GRID
   ============================================================ */
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.8rem;
}

/* Sub Card */
.sub-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: var(--t-slow);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow-card);
}

/* Top accent line */
.sub-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--cyan), var(--blue), transparent);
  opacity: 0;
  transition: opacity var(--t-normal);
}

/* Corner glow */
.sub-card::after {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%);
  pointer-events: none;
  transition: opacity var(--t-slow);
  opacity: 0;
}

.sub-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-glow);
  background: var(--bg-card-hover);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), var(--shadow-glow);
}

.sub-card:hover::before { opacity: 1; }
.sub-card:hover::after  { opacity: 1; }

/* Featured */
.sub-card.featured {
  border-color: rgba(59,130,246,0.2);
}
.sub-card.featured::before { opacity: 1; }

/* Card Badge */
.card-badge {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: linear-gradient(135deg, var(--gold), #d97706);
  color: var(--bg-primary);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.28rem 0.75rem;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(245,158,11,0.3);
}

html[lang="ar"] .card-badge { right: auto; left: 1.2rem; }

/* Card Logo */
.card-logo-container {
  height: 72px;
  display: flex;
  align-items: center;
  margin-bottom: 1.4rem;
}

.card-logo-img {
  max-height: 62px;
  max-width: 140px;
  object-fit: contain;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
}

.card-logo-text {
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #fff, var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.card-logo-text i { -webkit-text-fill-color: initial; }

/* Card Title */
.sub-card h3 {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 0.6rem;
}

/* Description */
.sub-card .desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.4rem;
  line-height: 1.7;
  min-height: 3.5rem;
}

/* ── Pricing Table ── */
.price-table {
  margin-bottom: 1.5rem;
  border-radius: 14px;
  border: 1px solid var(--border-subtle);
  background: rgba(255,255,255,0.02);
  overflow: hidden;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background var(--t-fast), transform var(--t-fast);
  cursor: pointer;
  position: relative;
  user-select: none;
}

.price-row:last-child { border-bottom: none; }

/* WhatsApp green hover */
.price-row:hover {
  background: rgba(37, 211, 102, 0.08);
  border-radius: 8px;
}

.price-row:active {
  transform: scale(0.98);
  background: rgba(37, 211, 102, 0.14);
}

/* WhatsApp icon hint that appears on hover */
.price-row::after {
  content: '\f232'; /* fa-whatsapp unicode */
  font-family: 'Font Awesome 6 Brands';
  font-weight: 400;
  font-size: 0.9rem;
  color: #25d366;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity var(--t-fast), transform var(--t-fast);
  pointer-events: none;
  flex-shrink: 0;
}

html[lang="ar"] .price-row::after {
  transform: translateX(6px);
}

.price-row:hover::after {
  opacity: 1;
  transform: translateX(0);
}

/* Clickable indicator on price-label */
.price-row:hover .price-label {
  color: var(--text-primary);
}

.price-row:hover .price-amount {
  color: #25d366;
}

/* Best value row hover */
.price-row.best-value { background: rgba(245,158,11,0.06); }
.price-row.best-value .price-label { color: var(--gold); font-weight: 600; }
.price-row.best-value .price-label i { color: var(--gold); }
.price-row.best-value .price-amount {
  color: var(--gold);
  text-shadow: 0 0 10px rgba(245,158,11,0.5);
}
.price-row.best-value:hover {
  background: rgba(37, 211, 102, 0.1);
}
.price-row.best-value:hover .price-amount {
  color: #25d366;
  text-shadow: none;
}

/* Order tooltip text above the row on hover */
.price-table {
  position: relative;
}

/* Animated border glow on price-table when hovering a row */
.price-row:hover ~ .price-row,
.price-row:focus-visible {
  outline: none;
}

/* ── Price Label / Amount / Currency ── */
.price-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color var(--t-fast);
}

.price-label i {
  color: var(--cyan);
  font-size: 0.75rem;
  transition: color var(--t-fast);
}

.price-amount {
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--blue);
  transition: color var(--t-fast);
}

.price-currency {
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-right: 0.1rem;
}

/* Features List */
.features-list {
  list-style: none;
  margin-bottom: 1.6rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.features-list li i {
  color: var(--green);
  font-size: 0.9rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

/* Card Buttons */
.card-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
  margin-top: auto;
}

.card-buttons .btn {
  padding: 0.7rem 0.9rem;
  font-size: 0.85rem;
  border-radius: 10px;
  justify-content: center;
}

/* ============================================================
   FEATURES SECTION
   ============================================================ */
.features-section {
  position: relative;
  background:
    linear-gradient(to bottom, transparent, rgba(12,18,32,0.5), transparent);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.features-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.5rem;
}

.feature-box {
  padding: 2rem 1.6rem;
  border-radius: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  transition: var(--t-normal);
  position: relative;
  overflow: hidden;
}

.feature-box::before {
  content: '';
  position: absolute;
  top: -30px; left: -30px;
  width: 120px; height: 120px;
  background: radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%);
  pointer-events: none;
}

.feature-box:hover {
  transform: translateY(-5px);
  border-color: rgba(168,85,247,0.2);
  box-shadow: 0 12px 35px rgba(0,0,0,0.4), 0 0 20px rgba(168,85,247,0.08);
}

.feature-icon {
  width: 54px; height: 54px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.4rem;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.1));
  border: 1px solid rgba(168,85,247,0.15);
  color: var(--purple);
  font-size: 1.5rem;
}

.feature-box h3 {
  font-size: 1.1rem;
  margin-bottom: 0.65rem;
  font-weight: 700;
}

.feature-box p { font-size: 0.9rem; line-height: 1.7; }

/* ============================================================
   STATS SECTION (inline)
   ============================================================ */
.stats-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stats-grid .stat-num {
  font-size: 2.4rem;
  font-weight: 900;
  display: block;
  margin-bottom: 0.4rem;
}

.stats-grid .stat-label {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

/* ============================================================
   STEPS / GUIDE
   ============================================================ */
.steps-timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2rem;
  position: relative;
}

.step-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 18px;
  padding: 2.5rem 1.8rem 2rem;
  text-align: center;
  position: relative;
  transition: var(--t-normal);
}

.step-card:hover {
  border-color: var(--border-glow);
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  transform: translateY(-4px);
}

.step-number {
  position: absolute;
  top: -22px;
  left: 50%; transform: translateX(-50%);
  width: 46px; height: 46px;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 1.1rem;
  color: var(--bg-primary);
  box-shadow: 0 6px 18px rgba(59,130,246,0.4);
}

.step-card h3 { font-size: 1.15rem; margin: 0.8rem 0 0.8rem; }
.step-card p  { font-size: 0.9rem; line-height: 1.7; }

/* ============================================================
   FAQ
   ============================================================ */
.faq-list { max-width: 820px; margin: 0 auto; }

.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  margin-bottom: 0.9rem;
  overflow: hidden;
  transition: border-color var(--t-normal), box-shadow var(--t-normal);
}

.faq-item.active {
  border-color: rgba(59,130,246,0.25);
  box-shadow: 0 4px 20px rgba(59,130,246,0.06);
}

.faq-question {
  width: 100%;
  padding: 1.3rem 1.5rem;
  background: none;
  border: none;
  text-align: right;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  gap: 1rem;
  font-family: inherit;
  transition: color var(--t-fast);
}

html[lang="ar"] .faq-question { text-align: right; }
html[lang="fr"] .faq-question { text-align: left; }

.faq-question:hover { color: var(--cyan); }

.faq-question i {
  color: var(--cyan);
  font-size: 0.9rem;
  transition: transform var(--t-normal);
  flex-shrink: 0;
}

.faq-item.active .faq-question i { transform: rotate(180deg); }

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease-out, padding 0.2s;
  padding: 0 1.5rem;
}

.faq-answer p {
  font-size: 0.92rem;
  line-height: 1.8;
  padding-bottom: 1.4rem;
}

/* ============================================================
   CTA SECTION
   ============================================================ */
.cta {
  position: relative;
  padding: 7rem 0;
  text-align: center;
  overflow: hidden;
  border-top: 1px solid var(--border-subtle);
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(59,130,246,0.08), transparent 70%);
  pointer-events: none;
}

.cta-content { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }

.cta h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  margin-bottom: 1.2rem;
  background: linear-gradient(135deg, #fff, var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta p {
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-buttons .btn { padding: 1rem 2.2rem; font-size: 1rem; }

/* ============================================================
   FLOATING BUTTONS
   ============================================================ */
.floating-actions {
  position: fixed;
  bottom: 2rem; right: 2rem;
  display: flex; flex-direction: column;
  gap: 0.7rem;
  z-index: 999;
}

html[lang="ar"] .floating-actions { right: auto; left: 2rem; }

.floating-btn {
  width: 52px; height: 52px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(0,0,0,0.35);
  transition: var(--t-normal);
  position: relative;
}

.floating-btn::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 50%, rgba(255,255,255,0.2) 100%);
  animation: spinRing 3s linear infinite;
  opacity: 0;
  transition: opacity var(--t-fast);
}

.floating-btn:hover::before { opacity: 1; }
.floating-btn:hover { transform: translateY(-4px) scale(1.06); }

@keyframes spinRing { to { transform: rotate(360deg); } }

.floating-wa { background: linear-gradient(135deg, #25d366, #128c7e); box-shadow: 0 6px 20px rgba(37,211,102,0.45); }
.floating-tg { background: linear-gradient(135deg, #29b6f6, #0288d1); box-shadow: 0 6px 20px rgba(0,136,204,0.45); }

/* ============================================================
   FOOTER
   ============================================================ */
footer {
  background: #03050b;
  padding: 4rem 0 2rem;
  border-top: 1px solid var(--border-subtle);
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.footer-brand .footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1rem;
}

.footer-brand .footer-logo img { height: 38px; border-radius: 6px; }

.footer-brand .footer-logo-name {
  font-size: 1.3rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-brand p {
  font-size: 0.88rem;
  color: var(--text-muted);
  max-width: 280px;
  line-height: 1.7;
}

.footer-links h4 {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.footer-links ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-links ul a {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--t-fast);
}

.footer-links ul a:hover { color: var(--cyan); }

.footer-divider {
  height: 1px;
  background: var(--border-subtle);
  margin-bottom: 2rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright { font-size: 0.85rem; color: var(--text-muted); }

.footer-socials { display: flex; gap: 0.7rem; }

.footer-socials a {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-card);
  color: var(--text-secondary);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none;
  font-size: 1rem;
  transition: var(--t-fast);
}

.footer-socials a:hover {
  background: rgba(255,255,255,0.08);
  color: var(--cyan);
  border-color: rgba(6,182,212,0.3);
}

/* ── Legacy footer nav (fallback) ── */
.footer-nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.footer-nav a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color var(--t-fast);
}

.footer-nav a:hover { color: var(--cyan); }

/* ============================================================
   SCROLL REVEAL ANIMATION
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================================
   ANIMATIONS
   ============================================================ */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-eyebrow  { animation: fadeInDown 0.7s ease both; }
.hero h1       { animation: fadeInUp  0.7s ease 0.1s both; }
.hero-subtitle { animation: fadeInUp  0.7s ease 0.2s both; }
.hero-actions  { animation: fadeInUp  0.7s ease 0.3s both; }
.hero-stats    { animation: fadeInUp  0.7s ease 0.4s both; }

/* ============================================================
   MOBILE MENU
   ============================================================ */
@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }

  .nav-links.mobile-open {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 66px;
    left: 0;
    right: 0;
    background: rgba(6, 9, 16, 0.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-subtle);
    padding: 1.2rem;
    gap: 0.3rem;
    animation: slideDown 0.25s ease;
    z-index: 999;
  }

  .nav-links.mobile-open li { width: 100%; }

  .nav-links.mobile-open a {
    display: block;
    padding: 0.85rem 1.2rem;
    font-size: 1rem;
    border-radius: 10px;
    color: var(--text-secondary);
    text-decoration: none;
    transition: var(--t-fast);
  }

  .nav-links.mobile-open a:hover {
    background: rgba(255,255,255,0.06);
    color: var(--text-primary);
  }

  .menu-toggle { display: flex; }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ============================================================
   RESPONSIVE — TABLET
   ============================================================ */
@media (max-width: 768px) {
  .header-container { height: 66px; }

  .hero { padding: 7rem 0 4rem; }
  .hero-stats { gap: 1.5rem; }
  .stat-num { font-size: 1.6rem; }

  .section { padding: 4rem 0; }
  .section-header { margin-bottom: 2.5rem; }

  .showcase-grid { grid-template-columns: 1fr; gap: 1.3rem; }
  .card-buttons  { grid-template-columns: 1fr; }

  .features-row  { grid-template-columns: 1fr; gap: 1.2rem; }
  .steps-timeline{ grid-template-columns: 1fr; }

  .footer-top    { flex-direction: column; gap: 2rem; }
  .footer-bottom { flex-direction: column; text-align: center; }

  .floating-actions { bottom: 1.5rem; right: 1rem; }
  html[lang="ar"] .floating-actions { right: auto; left: 1rem; }

  .cta { padding: 4rem 0; }
  .cta h2 { font-size: 1.9rem; }
}

/* ============================================================
   RESPONSIVE — MOBILE
   ============================================================ */
@media (max-width: 480px) {
  .hero h1 { font-size: 2rem; }
  .hero-actions { flex-direction: column; align-items: center; }
  .hero-actions .btn { width: 100%; max-width: 300px; }
  .hero-stats { flex-wrap: wrap; gap: 1rem; justify-content: center; }
  .stat-item { min-width: 90px; }

  .sub-card { padding: 1.5rem; }
  .price-table { margin-bottom: 1.2rem; }

  .step-card { padding: 2.2rem 1.4rem 1.6rem; }
  .faq-question { font-size: 0.95rem; }
}

/* ============================================================
   CUSTOM SCROLLBAR
   ============================================================ */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, var(--cyan), var(--blue));
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover { background: var(--blue); }

/* ============================================================
   CARD SHINE EFFECT (hover shimmer)
   ============================================================ */
.sub-card .card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255,255,255,0.04) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  background-position: 200% 0;
  pointer-events: none;
  transition: background-position 0.6s ease;
  border-radius: inherit;
}

.sub-card:hover .card-shine {
  background-position: -200% 0;
}

/* ============================================================
   FLOATING BUTTON TOOLTIP
   ============================================================ */
.floating-btn[title] {
  position: relative;
}

.floating-btn[title]::after {
  content: attr(title);
  position: absolute;
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  background: rgba(12, 18, 32, 0.95);
  color: var(--text-primary);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.35rem 0.8rem;
  border-radius: 8px;
  white-space: nowrap;
  border: 1px solid var(--border-card);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--t-fast);
  font-family: var(--font-en);
}

html[lang="ar"] .floating-btn[title]::after {
  right: auto;
  left: calc(100% + 10px);
}

.floating-btn:hover::after { opacity: 1; }

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
#back-to-top {
  position: fixed;
  bottom: 7rem;
  right: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(12, 18, 32, 0.9);
  border: 1px solid var(--border-card);
  color: var(--cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  z-index: 998;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity var(--t-normal), transform var(--t-normal), background var(--t-fast);
  backdrop-filter: blur(10px);
}

html[lang="ar"] #back-to-top { right: auto; left: 2rem; }

#back-to-top.visible {
  opacity: 1;
  transform: translateY(0);
}

#back-to-top:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: var(--border-glow);
}

/* ============================================================
   SECTION DIVIDER GRADIENT
   ============================================================ */
.section-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--border-card), transparent);
  margin: 0;
}

/* ============================================================
   TRUST BADGE STRIP (below hero)
   ============================================================ */
.trust-strip {
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  background: rgba(12, 18, 32, 0.4);
}

.trust-strip-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.trust-item i {
  font-size: 1rem;
  color: var(--cyan);
}

/* ============================================================
   SELECTION COLOR
   ============================================================ */
::selection {
  background: rgba(59, 130, 246, 0.35);
  color: var(--text-primary);
}

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

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="HAMZA SAT — اشتراكات IPTV بجودة فائقة. أكثر من 15,000 قناة مباشرة، أفلام ومسلسلات 4K بدون تقطيع. سيرفرات مستقرة ودعم فني 24/7.">
  <meta name="theme-color" content="#060910">
  <title>HAMZA SAT | اشتراكات IPTV فائقة الجودة</title>

  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Styles -->
  <link rel="stylesheet" href="style.css">

  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

  <!-- ══════════════════════════════════════════════
       HEADER
  ══════════════════════════════════════════════ -->
  <header id="main-header">
    <div class="container header-container">

      <!-- Logo -->
      <a href="#home" class="logo">
        <img src="assets/hamza_sat_logo.png" alt="HAMZA SAT">
        <span class="logo-name">HAMZA SAT</span>
      </a>

      <!-- Navigation -->
      <nav class="header-nav">
        <ul class="nav-links">
          <li><a href="#home"    data-i18n="home">الرئيسية</a></li>
          <li><a href="#servers" data-i18n="servers">الاشتراكات</a></li>
          <li><a href="#why-us" data-i18n="features">مميزاتنا</a></li>
          <li><a href="#setup"  data-i18n="setup">التفعيل</a></li>
          <li><a href="#faq"    data-i18n="faq">الأسئلة</a></li>
        </ul>

        <!-- Language Switcher -->
        <div class="lang-switcher" id="lang-switcher" aria-label="Language selector">
          <button class="lang-btn active" data-lang="ar" aria-pressed="true">العربية</button>
          <button class="lang-btn" data-lang="fr" aria-pressed="false">Français</button>
        </div>
      </nav>

      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
        <i class="fa-solid fa-bars"></i>
      </button>

    </div>
  </header>


  <!-- ══════════════════════════════════════════════
       HERO
  ══════════════════════════════════════════════ -->
  <section class="hero" id="home">
    <!-- Animated blobs -->
    <div class="hero-blob hero-blob-1"></div>
    <div class="hero-blob hero-blob-2"></div>
    <div class="hero-blob hero-blob-3"></div>

    <div class="container">
      <div class="hero-content">

        <!-- Eyebrow -->
        <div class="hero-eyebrow">
          <i class="fa-solid fa-circle" style="color:var(--green); font-size:0.5rem;"></i>
          <span data-i18n="heroBadge">بث مستقر بجودة 4K / Ultra HD</span>
        </div>

        <!-- Title -->
        <h1 data-i18n="heroTitle">
          اشتراكات IPTV<br>
          <span class="gradient-text">فائقة الجودة وبدون تقطيع</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero-subtitle" data-i18n="heroSubtitle">
          استمتع بمشاهدة آلاف القنوات العالمية المباشرة، ومكتبة ضخمة من الأفلام والمسلسلات المحدثة يومياً على جميع أجهزتك الذكية.
        </p>

        <!-- CTA Buttons -->
        <div class="hero-actions">
          <a href="#" id="hero-wa-btn" class="btn btn-wa" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i>
            <span data-i18n="heroContactWA">تواصل عبر واتساب</span>
          </a>
          <a href="#" id="hero-tg-btn" class="btn btn-tg" target="_blank" rel="noopener">
            <i class="fa-brands fa-telegram"></i>
            <span data-i18n="heroContactTG">تواصل عبر تليجرام</span>
          </a>
          <a href="#servers" class="btn btn-ghost">
            <i class="fa-solid fa-arrow-down"></i>
            <span data-i18n="heroExplore">استعرض الباقات</span>
          </a>
        </div>

        <!-- Stats -->
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-num">+15K</div>
            <div class="stat-label" data-i18n="statChannels">قناة مباشرة</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">4K</div>
            <div class="stat-label" data-i18n="statQuality">جودة بث</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">11</div>
            <div class="stat-label" data-i18n="statServers">سيرفرات متاحة</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">24/7</div>
            <div class="stat-label" data-i18n="statSupport">دعم فني</div>
          </div>
        </div>

      </div>
    </div>
  </section>


  <!-- ══════════════════════════════════════════════
       TRUST STRIP
  ══════════════════════════════════════════════ -->
  <div class="trust-strip">
    <div class="container">
      <div class="trust-strip-inner">
        <div class="trust-item"><i class="fa-solid fa-shield-halved"></i> <span data-i18n="trust1">بث آمن ومشفّر</span></div>
        <div class="trust-item"><i class="fa-solid fa-bolt"></i> <span data-i18n="trust2">تفعيل فوري خلال دقائق</span></div>
        <div class="trust-item"><i class="fa-solid fa-headset"></i> <span data-i18n="trust3">دعم فني 24/7</span></div>
        <div class="trust-item"><i class="fa-solid fa-star"></i> <span data-i18n="trust4">جودة 4K Ultra HD</span></div>
        <div class="trust-item"><i class="fa-solid fa-flask"></i> <span data-i18n="trust5">تجربة مجانية متاحة</span></div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════
       SERVERS SHOWCASE
  ══════════════════════════════════════════════ -->
  <section class="section" id="servers">
    <div class="container">

      <div class="section-header reveal">
        <span class="section-label" data-i18n="serversLabel">الباقات المتاحة</span>
        <h2 data-i18n="showcaseTitle">اختر سيرفر IPTV المناسب لك</h2>
        <p data-i18n="showcaseSubtitle">نقدم لك أفضل وأقوى السيرفرات العالمية الأكثر استقراراً في السوق.</p>
      </div>

      <div class="showcase-grid">\n
        <!-- ── NEO 4K ── -->
        <div class="sub-card featured reveal" data-server="NEO 4K">
          <div class="card-shine"></div>
          <div class="card-badge" data-i18n="badgeRecommended">موصى به</div>
          <div class="card-logo-container">
            <img src="assets/neo_logo.png" alt="NEO 4K" class="card-logo-img">
            <div class="card-logo-text glow-cyan" style="margin-inline-start:0.6rem;">NEO 4K</div>
          </div>
          <h3>NEO 4K</h3>
          <p class="desc" data-i18n="neoDesc">سيرفر ذو شعبية جارفة، يتميز بالاستقرار العالي ويحتوي على باقة قنوات عربية وأوروبية منوعة ومكتبة أفلام ضخمة.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="شهر واحد" data-dur-fr="1 Mois" data-price="900">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur1m">شهر واحد</span></span>
              <span class="price-amount">900 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="3 أشهر" data-dur-fr="3 Mois" data-price="2000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur3m">3 أشهر</span></span>
              <span class="price-amount">2000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="2800">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">2800 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="4000">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">4000 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener">
              <i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span>
            </a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener">
              <i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span>
            </a>
          </div>
        </div>

        <!-- ── V12 ── -->
        <div class="sub-card reveal" data-server="V12">
          <div class="card-shine"></div>
          <div class="card-logo-container">
            <div class="card-logo-text glow-purple">
              <i class="fa-solid fa-bolt" style="-webkit-text-fill-color:var(--purple);"></i>
              V12 <span style="font-weight:300; font-size:1rem; -webkit-text-fill-color:var(--text-secondary);">IPTV</span>
            </div>
          </div>
          <h3>V12</h3>
          <p class="desc" data-i18n="v12Desc">سيرفر V12 العملاق، يتميز بالثبات الفائق ومجموعة واسعة من القنوات الرياضية والترفيهية بجودات متعددة.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="شهر واحد" data-dur-fr="1 Mois" data-price="900">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur1m">شهر واحد</span></span>
              <span class="price-amount">900 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="3 أشهر" data-dur-fr="3 Mois" data-price="2000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur3m">3 أشهر</span></span>
              <span class="price-amount">2000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="2800">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">2800 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="4000">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">4000 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

        <!-- ── IRON ── -->
        <div class="sub-card reveal" data-server="IRON">
          <div class="card-shine"></div>
          <div class="card-logo-container">
            <div class="card-logo-text glow-blue">
              <i class="fa-solid fa-dumbbell" style="-webkit-text-fill-color:var(--blue);"></i>
              IRON <span style="font-weight:300; font-size:1rem; -webkit-text-fill-color:var(--text-secondary);">IPTV</span>
            </div>
          </div>
          <h3>IRON</h3>
          <p class="desc" data-i18n="ironDesc">سيرفر غني عن التعريف بقوته وجودته، خادم عملاق وثابت جداً خلال المنافسات الرياضية الكبرى.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="2000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">2000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="2800">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">2800 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

        <!-- ── FAMILY ── -->
        <div class="sub-card reveal" data-server="FAMILY">
          <div class="card-shine"></div>
          <div class="card-logo-container">
            <img src="assets/family.png" alt="FAMILY" class="card-logo-img">
            <div class="card-logo-text glow-gold" style="margin-inline-start:0.6rem;">FAMILY</div>
          </div>
          <h3>FAMILY</h3>
          <p class="desc" data-i18n="familyDesc">السيرفر العائلي المثالي، يحتوي على قنوات عائلية منوعة، وأقسام خاصة للأطفال، مع حماية واستقرار رائع.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="1400">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">1400 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="2200">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">2200 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

        <!-- ── DAR PLAYER ── -->
        <div class="sub-card reveal" data-server="DAR PLAYER">
          <div class="card-shine"></div>
          <div class="card-logo-container">
            <img src="assets/dar_player.png" alt="DAR PLAYER" class="card-logo-img">
            <div class="card-logo-text glow-blue" style="margin-inline-start:0.6rem;">DAR PLAYER</div>
          </div>
          <h3>DAR PLAYER</h3>
          <p class="desc" data-i18n="darDesc">باقة متميزة مخصصة لتطبيق DAR Player الشهير، تدعم جودة عالية وتصفحاً ذكياً وسريعاً للقنوات والأفلام.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="شهر واحد" data-dur-fr="1 Mois" data-price="900">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur1m">شهر واحد</span></span>
              <span class="price-amount">900 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="3 أشهر" data-dur-fr="3 Mois" data-price="1600">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur3m">3 أشهر</span></span>
              <span class="price-amount">1600 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="2500">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">2500 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="3500">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">3500 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

        <!-- ── STRONG ── -->
        <div class="sub-card reveal" data-server="STRONG">
          <div class="card-shine"></div>
          <div class="card-logo-container">
            <img src="assets/quality_8k.png" alt="STRONG 8K" class="card-logo-img">
            <div class="card-logo-text glow-gold" style="margin-inline-start:0.6rem;">STRONG</div>
          </div>
          <h3>STRONG</h3>
          <p class="desc" data-i18n="strongDesc">سيرفر قوي جداً يدعم دقة 4K الحقيقية، ممتاز لمتابعة المباريات والأحداث الرياضية المباشرة بجودة عالية وثبات تام.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="شهر واحد" data-dur-fr="1 Mois" data-price="1500">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur1m">شهر واحد</span></span>
              <span class="price-amount">1500 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="3 أشهر" data-dur-fr="3 Mois" data-price="3000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur3m">3 أشهر</span></span>
              <span class="price-amount">3000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="4500">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">4500 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="8000">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">8000 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

        <!-- ── KING365 ── -->
        <div class="sub-card featured reveal" data-server="KING365">
          <div class="card-shine"></div>
          <div class="card-badge">PREMIUM</div>
          <div class="card-logo-container">
            <img src="assets/king365.png" alt="KING365" class="card-logo-img">
            <div class="card-logo-text glow-gold" style="margin-inline-start:0.6rem;">KING365</div>
          </div>
          <h3>KING365</h3>
          <p class="desc" data-i18n="kingDesc">السيرفر النخبة الفاخر (King365)، جودة بث أصلية غير مضغوطة وثبات لا مثيل له مع سيرفرات احتياطية.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="شهر واحد" data-dur-fr="1 Mois" data-price="1500">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur1m">شهر واحد</span></span>
              <span class="price-amount">1500 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="3 أشهر" data-dur-fr="3 Mois" data-price="3000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur3m">3 أشهر</span></span>
              <span class="price-amount">3000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="4500">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">4500 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="8000">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">8000 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

        <!-- ── ATLAS PRO ── -->
        <div class="sub-card reveal" data-server="ATLAS PRO">
          <div class="card-shine"></div>
          <div class="card-logo-container">
            <div class="card-logo-text glow-cyan">
              <i class="fa-solid fa-globe" style="-webkit-text-fill-color:var(--cyan);"></i>
              ATLAS PRO
            </div>
          </div>
          <h3>ATLAS PRO</h3>
          <p class="desc" data-i18n="atlasDesc">يتميز بمكتبة أفلام ومسلسلات ضخمة جداً مع تحديثات يومية، وقنوات بجودات متعددة لتناسب جميع سرعات الإنترنت.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="3 أشهر" data-dur-fr="3 Mois" data-price="1200">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur3m">3 أشهر</span></span>
              <span class="price-amount">1200 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="2000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">2000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="2800">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">2800 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

        <!-- ── GOLDEN ── -->
        <div class="sub-card reveal" data-server="GOLDEN">
          <div class="card-shine"></div>
          <div class="card-logo-container">
            <div class="card-logo-text glow-gold">
              <i class="fa-solid fa-crown" style="-webkit-text-fill-color:var(--gold);"></i>
              GOLDEN
            </div>
          </div>
          <h3>GOLDEN</h3>
          <p class="desc" data-i18n="goldenDesc">سيرفر Golden TV المميز بمكتبة أفلام ومسلسلات ضخمة جداً ومحدثة يومياً مع استقرار تام أثناء المباريات.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="شهر واحد" data-dur-fr="1 Mois" data-price="1200">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur1m">شهر واحد</span></span>
              <span class="price-amount">1200 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="3 أشهر" data-dur-fr="3 Mois" data-price="3000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur3m">3 أشهر</span></span>
              <span class="price-amount">3000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="4000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">4000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="5000">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">5000 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

        <!-- ── DANA TV ── -->
        <div class="sub-card reveal" data-server="DANA TV">
          <div class="card-shine"></div>
          <div class="card-logo-container">
            <div class="card-logo-text glow-purple">
              <i class="fa-solid fa-satellite-dish" style="-webkit-text-fill-color:var(--purple);"></i>
              DANA TV
            </div>
          </div>
          <h3>DANA TV</h3>
          <p class="desc" data-i18n="danaDesc">سيرفر Dana TV الاقتصادي والمستقر، خيار ممتاز للعائلات لمتابعة القنوات الترفيهية بجودة ممتازة وسعر مميز.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="شهر واحد" data-dur-fr="1 Mois" data-price="700">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur1m">شهر واحد</span></span>
              <span class="price-amount">700 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="3 أشهر" data-dur-fr="3 Mois" data-price="1400">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur3m">3 أشهر</span></span>
              <span class="price-amount">1400 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="2000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">2000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="3000">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">3000 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

        <!-- ── KM ── -->
        <div class="sub-card reveal" data-server="KM">
          <div class="card-shine"></div>
          <div class="card-logo-container">
            <div class="card-logo-text glow-cyan">
              <i class="fa-solid fa-circle-play" style="-webkit-text-fill-color:var(--cyan);"></i>
              KM
            </div>
          </div>
          <h3>KM</h3>
          <p class="desc" data-i18n="kmDesc">سيرفر KM السريع والخفيف، مثالي لجميع الأجهزة والسرعات المختلفة مع جودة بث رائعة وثبات متواصل.</p>
          <div class="price-table">
            <div class="price-row" data-dur-ar="شهر واحد" data-dur-fr="1 Mois" data-price="700">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur1m">شهر واحد</span></span>
              <span class="price-amount">700 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="3 أشهر" data-dur-fr="3 Mois" data-price="1200">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur3m">3 أشهر</span></span>
              <span class="price-amount">1200 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row" data-dur-ar="6 أشهر" data-dur-fr="6 Mois" data-price="2000">
              <span class="price-label"><i class="fa-regular fa-calendar-days"></i> <span data-i18n="dur6m">6 أشهر</span></span>
              <span class="price-amount">2000 <span class="price-currency">د.ج</span></span>
            </div>
            <div class="price-row best-value" data-dur-ar="سنة كاملة" data-dur-fr="1 An" data-price="2500">
              <span class="price-label"><i class="fa-solid fa-star"></i> <span data-i18n="dur1y">سنة كاملة</span></span>
              <span class="price-amount">2500 <span class="price-currency">د.ج</span></span>
            </div>
          </div>
          <ul class="features-list">
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featChannels">أكثر من 15,000 قناة مباشرة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featVod">مكتبة أفلام ومسلسلات متجددة</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featQuality">جودة 4K / UHD / FHD / HD</span></li>
            <li><i class="fa-solid fa-circle-check"></i> <span data-i18n="featSupport">دعم فني متواصل 24/7</span></li>
          </ul>
          <div class="card-buttons">
            <a href="#" class="btn btn-wa card-wa-btn" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnOrderWA">واتساب</span></a>
            <a href="#" class="btn btn-tg card-tg-btn" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> <span data-i18n="btnOrderTG">تليجرام</span></a>
          </div>
        </div>

      </div><!-- /.showcase-grid -->
    </div>
  </section>


  <!-- ══════════════════════════════════════════════
       FEATURES SECTION
  ══════════════════════════════════════════════ -->
  <section class="section features-section" id="why-us">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label" data-i18n="whyLabel">لماذا نحن؟</span>
        <h2 data-i18n="whyTitle">لماذا تختار خدماتنا؟</h2>
        <p data-i18n="whySubtitle">نضمن لك أفضل تجربة مشاهدة بفضل خوادمنا القوية والدعم الفني السريع.</p>
      </div>

      <div class="features-row">
        <div class="feature-box reveal">
          <div class="feature-icon"><i class="fa-solid fa-server"></i></div>
          <h3 data-i18n="feat1Title">خوادم فائقة السرعة</h3>
          <p data-i18n="feat1Desc">نعتمد على خوادم ذات نطاق ترددي واسع لضمان مشاهدة خالية من التقطيع والبطء.</p>
        </div>
        <div class="feature-box reveal">
          <div class="feature-icon"><i class="fa-solid fa-rotate"></i></div>
          <h3 data-i18n="feat2Title">تحديثات مستمرة</h3>
          <p data-i18n="feat2Desc">يتم تحديث مكتبة الأفلام والمسلسلات والقنوات بشكل دوري ومجاني لمواكبة كل جديد.</p>
        </div>
        <div class="feature-box reveal">
          <div class="feature-icon"><i class="fa-solid fa-tv"></i></div>
          <h3 data-i18n="feat3Title">توافق كامل</h3>
          <p data-i18n="feat3Desc">اشتراكاتنا تعمل على جميع الأجهزة: الشاشات الذكية، الهواتف، التي في بوكس، والحواسيب.</p>
        </div>
        <div class="feature-box reveal">
          <div class="feature-icon"><i class="fa-solid fa-headset"></i></div>
          <h3 data-i18n="feat4Title">دعم فني متميز</h3>
          <p data-i18n="feat4Desc">فريق الدعم الفني متواجد لمساعدتك في تفعيل الاشتراك وحل أي مشكلة فوراً.</p>
        </div>
      </div>
    </div>
  </section>


  <!-- ══════════════════════════════════════════════
       STEPS SECTION
  ══════════════════════════════════════════════ -->
  <section class="section" id="setup">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label" data-i18n="setupLabel">خطوات التفعيل</span>
        <h2 data-i18n="guideTitle">خطوات بسيطة لتفعيل اشتراكك</h2>
        <p data-i18n="guideSubtitle">ابدأ الاستمتاع بالخدمة خلال دقائق معدودة.</p>
      </div>

      <div class="steps-timeline">
        <div class="step-card reveal">
          <div class="step-number">1</div>
          <h3 data-i18n="step1Title">اختر السيرفر المناسب</h3>
          <p data-i18n="step1Desc">تصفح قائمة السيرفرات المتاحة واختر الذي يناسب جهازك واهتماماتك.</p>
        </div>
        <div class="step-card reveal">
          <div class="step-number">2</div>
          <h3 data-i18n="step2Title">تواصل معنا للتفعيل</h3>
          <p data-i18n="step2Desc">اضغط على زر الطلب عبر الواتساب أو التليجرام للتواصل الفوري مع خدمة العملاء.</p>
        </div>
        <div class="step-card reveal">
          <div class="step-number">3</div>
          <h3 data-i18n="step3Title">ابدأ المشاهدة</h3>
          <p data-i18n="step3Desc">سنزودك ببيانات الاشتراك ونوجهك خطوة بخطوة حتى تبدأ الاستمتاع بالبث.</p>
        </div>
      </div>
    </div>
  </section>


  <!-- ══════════════════════════════════════════════
       FAQ SECTION
  ══════════════════════════════════════════════ -->
  <section class="section" id="faq">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label" data-i18n="faqLabel">الأسئلة الشائعة</span>
        <h2 data-i18n="faqTitle">الأسئلة الشائعة</h2>
        <p data-i18n="faqSubtitle">إجابات على أهم الاستفسارات حول خدمة الـ IPTV.</p>
      </div>

      <div class="faq-list">
        <div class="faq-item reveal">
          <button class="faq-question">
            <span data-i18n="q1">هل أحتاج إلى سرعة إنترنت عالية لتشغيل الخدمة؟</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          <div class="faq-answer">
            <p data-i18n="a1">تتوفر سيرفراتنا بجودات بث متعددة (SD, HD, FHD, 4K) لتتناسب مع جميع سرعات الإنترنت. سرعة 8 ميغابت كافية لـ HD، وننصح بـ 25 ميغابت للـ 4K.</p>
          </div>
        </div>

        <div class="faq-item reveal">
          <button class="faq-question">
            <span data-i18n="q2">ما هي الأجهزة التي تدعمها الاشتراكات؟</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          <div class="faq-answer">
            <p data-i18n="a2">تدعم الاشتراكات جميع الأجهزة: Smart TV (سامسونج، إل جي)، أجهزة أندرويد، Apple TV، الهواتف (iOS/Android)، Firestick، والحواسيب.</p>
          </div>
        </div>

        <div class="faq-item reveal">
          <button class="faq-question">
            <span data-i18n="q3">هل يمكنني تشغيل الاشتراك على أكثر من جهاز في نفس الوقت؟</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          <div class="faq-answer">
            <p data-i18n="a3">الاشتراك الاعتيادي يعمل على جهاز واحد في نفس الوقت. التشغيل المتزامن على أجهزة متعددة قد يؤدي لحظر الحساب. تواصل معنا لاشتراك متعدد الأجهزة.</p>
          </div>
        </div>

        <div class="faq-item reveal">
          <button class="faq-question">
            <span data-i18n="q4">كيف أحصل على تجربة مجانية قبل الاشتراك؟</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          <div class="faq-answer">
            <p data-i18n="a4">نعم، نوفر تجارب مجانية لمعظم السيرفرات. تواصل معنا مباشرة عبر واتساب أو تليجرام لطلب التجربة المجانية.</p>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ══════════════════════════════════════════════
       CTA SECTION
  ══════════════════════════════════════════════ -->
  <section class="cta" id="contact">
    <div class="cta-content">
      <div class="section-label" data-i18n="ctaLabel" style="margin-bottom:1.5rem;display:inline-block;">تواصل معنا الآن</div>
      <h2 data-i18n="ctaTitle">جاهز لبدء تجربة المشاهدة الفاخرة؟</h2>
      <p data-i18n="ctaSubtitle">تواصل معنا الآن عبر واتساب أو تليجرام للحصول على تجربة مجانية أو تفعيل اشتراكك فوراً. بدون عمولات وبدون أسعار مخفية.</p>
      <div class="cta-buttons">
        <a href="#" id="cta-wa-btn" class="btn btn-wa" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp"></i>
          <span data-i18n="heroContactWA">تواصل عبر واتساب</span>
        </a>
        <a href="#" id="cta-tg-btn" class="btn btn-tg" target="_blank" rel="noopener">
          <i class="fa-brands fa-telegram"></i>
          <span data-i18n="heroContactTG">تواصل عبر تليجرام</span>
        </a>
      </div>
    </div>
  </section>


  <!-- ══════════════════════════════════════════════
       FLOATING BUTTONS
  ══════════════════════════════════════════════ -->
  <div class="floating-actions">
    <a href="#" id="float-wa" class="floating-btn floating-wa" target="_blank" rel="noopener" title="واتساب">
      <i class="fa-brands fa-whatsapp"></i>
    </a>
    <a href="#" id="float-tg" class="floating-btn floating-tg" target="_blank" rel="noopener" title="تليجرام">
      <i class="fa-brands fa-telegram"></i>
    </a>
  </div>

  <!-- Back to Top -->
  <button id="back-to-top" aria-label="Back to top">
    <i class="fa-solid fa-arrow-up"></i>
  </button>


  <!-- ══════════════════════════════════════════════
       FOOTER
  ══════════════════════════════════════════════ -->
  <footer>
    <div class="container">
      <div class="footer-top">

        <div class="footer-brand">
          <div class="footer-logo">
            <img src="assets/hamza_sat_logo.png" alt="HAMZA SAT">
            <span class="footer-logo-name">HAMZA SAT</span>
          </div>
          <p data-i18n="footerDesc">المنصة الرائدة لتقديم اشتراكات وتفعيلات IPTV الأكثر استقراراً في العالم العربي وأوروبا.</p>
        </div>

        <div class="footer-links">
          <h4 data-i18n="footerLinksTitle">روابط سريعة</h4>
          <ul>
            <li><a href="#home"    data-i18n="home">الرئيسية</a></li>
            <li><a href="#servers" data-i18n="servers">الاشتراكات</a></li>
            <li><a href="#why-us"  data-i18n="features">مميزاتنا</a></li>
            <li><a href="#setup"   data-i18n="setup">طريقة التفعيل</a></li>
            <li><a href="#faq"     data-i18n="faq">الأسئلة الشائعة</a></li>
            <li><a href="#contact" data-i18n="contact">اتصل بنا</a></li>
          </ul>
        </div>

        <div class="footer-links">
          <h4 data-i18n="footerContactTitle">التواصل</h4>
          <ul>
            <li><a href="#" id="footer-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a></li>
            <li><a href="#" id="footer-tg" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> Telegram</a></li>
          </ul>
        </div>

      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <div class="copyright">
          &copy; 2026 <span class="brand-placeholder">HAMZA SAT</span>. All rights reserved.
        </div>
        <div class="footer-socials">
          <a href="#" id="fs-wa" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
          <a href="#" id="fs-tg" target="_blank" rel="noopener" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
        </div>
      </div>
    </div>
  </footer>

  <!-- JS -->
  <script src="app.js"></script>

</body>
</html>

