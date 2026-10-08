// ===== إدارة الوضع الليلي الموحد لجميع صفحات الموقع =====
(function() {
    const savedTheme = localStorage.getItem('ahl_theme') || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);

    function updateIcons(isDark) {
        document.querySelectorAll('#themeToggle, #topThemeToggle, .theme-toggle-btn').forEach(btn => {
            if (btn.id === 'topThemeToggle') {
                btn.innerHTML = isDark 
                    ? '<i class="fas fa-sun"></i> <span>الوضع النهاري</span>' 
                    : '<i class="fas fa-moon"></i> <span>الوضع الليلي</span>';
            } else {
                btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            }
            btn.title = isDark ? 'الوضع النهاري' : 'الوضع الليلي';
            btn.setAttribute('aria-label', isDark ? 'الوضع النهاري' : 'الوضع الليلي');
        });
    }

    window.toggleAhlTheme = function() {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        if (document.body) document.body.setAttribute('data-theme', next);
        localStorage.setItem('ahl_theme', next);
        updateIcons(next === 'dark');
    };

    function init() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (document.body) document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        updateIcons(isDark);

        document.querySelectorAll('#themeToggle, #topThemeToggle, .theme-toggle-btn').forEach(btn => {
            btn.removeEventListener('click', window.toggleAhlTheme);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.toggleAhlTheme();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
