const box = document.querySelector('.box');
const message = document.querySelector('.message');

async function authenticate() {
    // Kiểm tra URL để lấy mã xác thực
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
        const authCode = isMatch[1];

        try {
            const response = await fetch(`http://localhost:8080/auth/outbound/authentication?code=${authCode}`, {
                method: "POST",
            });

            const result = await response.json();

            if (result.code === 1000) {
                localStorage.setItem("token", result.result.token);

                window.location.href = "home.html";
            } else if (result.code === 1018) {
                await Swal.fire({
                    title: 'Lỗi',
                    text: result.message,
                    icon: 'error'
                });
                window.location.href = "login.html";
            } else {
                message.textContent = "Authentication failed.";
                setTimeout(function () {
                    window.location.href = "login.html";
                }, 5000);
            }
        } catch (error) {
            message.textContent = 'Có lỗi xảy ra khi kết nối tới máy chủ'
        }
    } else {
        message.textContent = 'Không tìm thấy mã xác thực';
    }
}

window.addEventListener('load', authenticate);