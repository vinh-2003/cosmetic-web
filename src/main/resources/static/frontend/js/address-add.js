async function submitAddress() {
    const messageDiv = document.getElementById('message');
    const recipientName = document.getElementById('recipientName').value;
    const recipientPhone = document.getElementById('recipientPhone').value;
    const recipientAddress = document.getElementById('recipientAddress').value;

    if (!recipientName || !recipientPhone || !recipientAddress) {
        messageDiv.textContent = 'Vui lòng điền đầy đủ thông tin!';
        return;
    }

    const data = { recipientName, recipientPhone, recipientAddress };

    try {
        const response = await fetch('http://localhost:8080/shippingAddresses', {
            method: 'POST',
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
                text: 'Thêm địa chỉ nhận hàng thành công!',
            });
            window.location.href = "address-list.html";
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