document.addEventListener("DOMContentLoaded", () => {
    const drawer = document.getElementById('drawer');
    const openBtn = document.querySelector('#openDrawer');
    const closeDrawer = drawer.querySelector('#closeDrawer') || drawer.querySelector('.close-drawer');

    if (!document.querySelector('style#drawerStyle')) {
        const style = document.createElement('style');
        style.id = 'drawerStyle';
        style.textContent = `
            .drawer { position: fixed; top: 0; left: -250px; width: 250px; height: 100%; background: #fff; transition: left 0.3s; z-index: 1000; box-shadow: 2px 0 5px rgba(0,0,0,0.2); }
            .drawer.open { left: 0; }
            .drawer-header { display: flex; justify-content: space-between; padding: 10px; background: #00a884; color: white; }
            .drawer ul { list-style: none; padding: 0; }
            .drawer ul li { padding: 10px; }
            .drawer ul li a { text-decoration: none; color: #2E2E2E; font-size: 16px; }
            #openDrawer { background: none; border: none; cursor: pointer; }
        `;
        document.head.appendChild(style);
    }

    openBtn.onclick = () => drawer.classList.add('open');

    if (closeDrawer) {
        closeDrawer.onclick = () => drawer.classList.remove('open');
    }

    document.addEventListener('click', (event) => {
        if (drawer.classList.contains('open') && !drawer.contains(event.target) && event.target !== openBtn) {
            drawer.classList.remove('open');
        }
    });
});
