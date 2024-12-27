const voucherId = new URLSearchParams(window.location.search).get('voucherId');

// Lấy dữ liệu voucher và gán vào các trường
async function loadVoucher() {
    const messageDiv = document.getElementById('message');
    try {
        const response = await fetch(`http://localhost:8080/vouchers/${voucherId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const voucher = result.result;
            document.getElementById('code').value = voucher.code;
            document.getElementById('discount').value = voucher.discount;
            document.getElementById('startDate').value = voucher.startDate;
            document.getElementById('endDate').value = voucher.endDate;
            document.getElementById('minPurchase').value = voucher.minPurchase;
            document.getElementById('usageLimit').value = voucher.usageLimit;
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

// Cập nhật voucher
async function updateVoucher() {
    const messageDiv = document.getElementById('message');
    const code = document.getElementById('code').value;
    const discount = document.getElementById('discount').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const minPurchase = document.getElementById('minPurchase').value;
    const usageLimit = document.getElementById('usageLimit').value;

    // Kiểm tra xem người dùng đã điền đầy đủ thông tin chưa
    if (!code || !discount || !startDate || !endDate || !minPurchase || !usageLimit) {
        messageDiv.textContent = 'Vui lòng điền đầy đủ thông tin!';
        return;
    }

    const data = { code, discount, startDate, endDate, minPurchase, usageLimit };

    try {
        const response = await fetch(`http://localhost:8080/vouchers/${voucherId}`, {
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
                text: 'Cập nhật mã giảm giá thành công!',
            });
            window.location.href = "voucher-list.html";
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

// Gọi hàm loadVoucher khi trang được tải
window.addEventListener('load', loadVoucher);