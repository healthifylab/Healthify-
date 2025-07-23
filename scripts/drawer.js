document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('drawer');
    const menuToggle = document.querySelector('.menu-toggle');
    const closeDrawer = drawer.querySelector('.close-drawer');

    if (!menuToggle || !drawer || !closeDrawer) return;

    // Toggle drawer when menu-toggle is clicked
    menuToggle.onclick = () => drawer.classList.toggle('open');

    // Close drawer when close button is clicked
    closeDrawer.onclick = () => drawer.classList.remove('open');

    // Close drawer when clicking outside
    document.addEventListener('click', (event) => {
        if (drawer.classList.contains('open') && !drawer.contains(event.target) && event.target !== menuToggle) {
            drawer.classList.remove('open');
        }
    });

    // Keyboard accessibility
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    closeDrawer.setAttribute('aria-label', 'Close menu');

    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            drawer.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', drawer.classList.contains('open'));
        }
    });

    closeDrawer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            drawer.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
