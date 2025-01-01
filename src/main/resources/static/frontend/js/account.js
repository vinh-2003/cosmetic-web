const messageDiv = document.getElementById('message');
let userId;

async function renderUserInfo() {
    const messageDiv = document.getElementById('message'); // Sử dụng messageDiv cho các thông báo khác
    try {
        const response = await fetch('http://localhost:8080/users/my-info', {
            method: 'GET',
            headers: {
  

        if (result.code === 1000) {
            await Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Cập nhật thông tin thành công!',
            });
            window.location.href = "account.html";
        } else {

            switch (response.status) {
                case 400:
                    messageDiv.textContent = result.message;
                    break;
                case 401:
                    Swal.fire({
                        icon: 'warning',
                        title: 'Phiên đăng nhập đã hết hạn',
                        text: 'Vui lòng đăng nhập lại.',
                    }).then(() => {
                        localStorage.removeItem('token'); // Xóa token cũ
                        window.location.href = "login.html"; // Điều hướng đến trang đăng nhập
                    });
                    break;
                case 403:
                    window.location.href = "403.html";
                    break;
                case 404:
                    window.location.href = "404.html";
                    break;
                case 500:
                    window.location.href = "500.html";
                    break;
                default:
                    messageDiv.textContent = `${response.status} - ${response.statusText}`;
                    break;
            }
        }


    } catch (error) {
        messageDiv.textContent = 'Có lỗi xảy ra khi kết nối đến server.';
    }
}

function redirectToPasswordPage() {
    window.location.href = 'password-change.html';
}


window.addEventListener('load', renderUserInfo);