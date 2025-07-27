document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('drawer');
    const menuToggle = document.querySelector('.menu-toggle');
    const closeDrawer = document.getElementById('closeDrawer');

    if (!menuToggle || !drawer || !closeDrawer) {
        console.error('Drawer elements missing:', { menuToggle, drawer, closeDrawer });
        return;
    }

    menuToggle.onclick = () => {
        drawer.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', drawer.classList.contains('open'));
    };

    closeDrawer.onclick = () => {
        drawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    document.addEventListener('click', (event) => {
        if (drawer.classList.contains('open') && !drawer.contains(event.target) && !menuToggle.contains(event.target)) {
            drawer.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

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
