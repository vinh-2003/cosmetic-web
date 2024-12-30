const logContainer = document.getElementById('logContainer');
const usernameContainer = document.getElementById('usernameContainer');
const usernameA = document.getElementById('usernameA');
const token = localStorage.getItem('token');
const logoutA = document.getElementById('logoutA');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

function getUsername() {
    if (token) {
        try {
            // Giải mã token
            const decodedToken = jwt_decode(token);

            // Lấy giá trị subject
            const username = decodedToken.sub;
            return username;
        } catch (error) {
            console.error('Lỗi khi giải mã token:', error);
        }
    } else {
        console.log('Token không tồn tại trong localStorage');
    }
    return "";
}

function renderUsername() {
    const username = getUsername();
    if (username) {
        usernameA.innerHTML = `Xin chào, <b>${username}</b>`;
        usernameContainer.classList.add('d-flex');
        usernameContainer.classList.remove('d-none');
        logContainer.classList.remove('d-flex');
        logContainer.classList.add('d-none');
    }
    return;
}

async function logout() {
    const confirmLogout = await Swal.fire({
        title: 'Đăng xuất',
        text: 'Bạn có chắc muốn đăng xuất',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
    });

    if (confirmLogout.isConfirmed) {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token
                }),
            });

            const result = await response.json();

            if (result.code === 1000) {
                localStorage.clear();
                window.location.href = 'login.html';
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

}

function formatCurrencyVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

logoutA.addEventListener('click', function (event) {
    event.preventDefault();
    logout();
});

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const searchName = searchInput.value;
    window.location.href = `product-search.html?name=${searchName}`;
});

window.addEventListener('load', renderUsername);