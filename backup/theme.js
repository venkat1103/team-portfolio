// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    // Create and append theme toggle switch
    const themeSwitch = document.createElement('div');
    themeSwitch.className = 'theme-switch-wrapper';
    themeSwitch.innerHTML = `
        <label class="theme-switch">
            <input type="checkbox" id="theme-toggle">
            <span class="slider"></span>
        </label>
    `;
    document.body.appendChild(themeSwitch);

    // Set initial state of toggle
    const toggle = document.getElementById('theme-toggle');
    toggle.checked = document.documentElement.getAttribute('data-theme') === 'dark';

    // Handle theme toggle
    toggle.addEventListener('change', () => {
        const theme = toggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}); 