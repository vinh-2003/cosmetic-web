const messageDiv = document.getElementById('message');
const newPasswordInput = document.getElementById('newPassword')
const confirmPasswordInput = document.getElementById('confirmPassword');
const updateBtn = document.getElementById('updateBtn');

function showOldPassword() {
    const passwordField = document.getElementById('oldPassword');
    const checkbox = document.getElementById('toggleOldPassword');

    if (checkbox.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

function showNewPassword() {
    const passwordField = document.getElementById('newPassword');
    const checkbox = document.getElementById('toggleNewPassword');

    if (checkbox.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

function showConfirmPassword() {
    const passwordField = document.getElementById('confirmPassword');
    const checkbox = document.getElementById('toggleConfirmPassword');

    if (checkbox.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

// Đảm bảo nút "Gửi" ban đầu bị vô hiệu hóa
updateBtn.disabled = true;

// Hàm kiểm tra mật khẩu
function validatePasswords() {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!newPassword || !confirmPassword) {
        messageDiv.textContent = 'Vui lòng nhập đầy đủ các trường';
        updateBtn.disabled = true;
        return;
    }

    if (newPassword !== confirmPassword) {
        messageDiv.textContent = "Mật khẩu xác nhận và mật khẩu mới phải trùng khớp";
        updateBtn.disabled = true;
    } else {
        messageDiv.textContent = '';
        updateBtn.disabled = false; // Bật nút khi mật khẩu khớp
    }
}

// Gắn sự kiện `input` để kiểm tra mỗi khi người dùng nhập
newPasswordInput.addEventListener('input', validatePasswords);
confirmPasswordInput.addEventListener('input', validatePasswords);

async function updatePassword() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!oldPassword || !newPassword || !confirmPassword) {
        messageDiv.textContent = 'Vui lòng điền đầy đủ thông tin';
        return;
    }

    const data = { oldPassword, newPassword };

    try {
        const response = await fetch(`http://localhost:8080/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.code === 1000) {
            await Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Đổi mật khẩu thành công!',
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