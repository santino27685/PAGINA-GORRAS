document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');
    const adminLink = document.querySelector('.admin-link');
    const userGreeting = document.getElementById('user-greeting');
    const logoutButton = document.getElementById('logout-button');
    const loginIcon = document.querySelector('.icon-button[href="login.html"]');

    if (userRole && userGreeting) {
        const greetingText = userRole === 'admin' ? 'Bienvenido Administrador' : 'Bienvenido Usuario';
        userGreeting.textContent = greetingText;
        logoutButton.style.display = 'inline-block';
        if (loginIcon) {
            loginIcon.style.display = 'none';
        }
    }

    if (userRole === 'admin' && adminLink) {
        adminLink.style.display = 'inline-block';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('userRole');
            window.top.location.href = '/index.html';
        });
    }
});