function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.username === username)) {
        alert('El usuario ya existe');
        return;
    }

    users.push({ username, password, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario registrado exitosamente');
    window.location.href = '/pages/login.html';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (username === 'santino' && password === 'santino') {
        localStorage.setItem('userRole', 'admin');
        window.location.href = '/index.html';
    } else if (user) {
        localStorage.setItem('userRole', 'user');
        window.location.href = '/index.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.some(user => user.username === 'admin')) {
        users.push({ username: 'admin', password: 'admin', role: 'admin' });
        localStorage.setItem('users', JSON.stringify(users));
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});