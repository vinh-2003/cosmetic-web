async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    if (!username || !password) {
        messageDiv.textContent = 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!'
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });

        const result = await response.json();

        if (result.code === 1000) {
            messageDiv.style.color = 'green';
            messageDiv.textContent = "Đăng nhập thành công";

            const auth = result.result;
            localStorage.setItem('token', auth.token);

            if (username == 'admin') {
                window.location.href = 'home-admin.html';
            } else {
                window.location.href = 'home.html';
            }
        } else {
            messageDiv.textContent = "Sai tên đăng nhập hoặc mật khẩu";
        }

    } catch (error) {
        messageDiv.textContent = 'Có lỗi xảy ra khi kết nối đến server.';
    }
}

function showPassword() {
    const passwordField = document.getElementById('password');
    const checkbox = document.getElementById('togglePassword');

    if (checkbox.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}