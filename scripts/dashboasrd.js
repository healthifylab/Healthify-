<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Healthify Lab - Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="/styles/style.css">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-R0R3RYERZW"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-R0R3RYERZW');
    </script>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <img src="/public/logo.png" alt="Healthify Lab Logo" class="logo-img">
            <nav>
                <div class="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="booking.html">Book Test</a></li>
                    <li><a href="app.html">Download App</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="ai-tools.html">AI Tools</a></li>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="#" onclick="logout()">Logout</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Left Drawer -->
    <div class="left-drawer" id="leftDrawer">
        <div class="drawer-content">
            <div class="drawer-header">
                <h2>_Healthify</h2>
                <span class="close-drawer">×</span>
            </div>
            <ul class="nav-menu">
                <li><a href="/index.html"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="/booking.html"><i class="fas fa-calendar-check"></i> Book Test</a></li>
                <li><a href="/app.html"><i class="fas fa-mobile-alt"></i> Download App</a></li>
                <li><a href="/contact.html"><i class="fas fa-envelope"></i> Get In Touch</a></li>
                <li><a href="/dashboard.html"><i class="fas fa-user"></i> Dashboard</a></li>
                <li><a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </div>
    </div>

    <!-- Dashboard Section -->
    <section class="dashboard-section">
        <div class="container">
            <h2 class="section-title">Your Dashboard <i class="fas fa-user"></i></h2>
            <div id="userInfo"></div>
            <div class="dashboard-content">
                <h3>Your Bookings</h3>
                <div id="bookingList"></div>
                <h3>Your Reports</h3>
                <div id="reportList"></div>
                <h3>Recommended Tests</h3>
                <div id="recommendedTests"></div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <p>Healthify Lab © 2025 | <a href="/contact.html">Contact Us</a> | <a href="/privacy.html">Privacy Policy</a></p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"></script>
    <script src="/scripts/dashboard.js"></script>
    <script type="module">
        import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
        import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

        const firebaseConfig = {
            apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
            authDomain: "healthify-lab.firebaseapp.com",
            projectId: "healthify-lab",
            storageBucket: "healthify-lab.firebasestorage.app",
            messagingSenderId: "297003315332",
            appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1"
        };

        const app = initializeApp(firebaseConfig);
        const auth = g6etAuth(app);

        window.logout = function() {
            signOut(auth).then(() => {
                window.location.href = '/index.html';
            }).catch((error) => {
                console.error('Logout error:', error);
            });
        };

        document.querySelector('.menu-toggle').addEventListener('click', () => {
            document.getElementById('leftDrawer').classList.toggle('active');
        });

        document.querySelector('.close-drawer').addEventListener('click', () => {
            document.getElementById('leftDrawer').classList.remove('active');
        });
    </script>
</body>
</html>
