const vnp_TransactionStatus = new URLSearchParams(window.location.search).get('vnp_TransactionStatus');
const successDiv = document.getElementById('successDiv');
const faildDiv = document.getElementById('faildDiv');
const orderIdSuccessSpan = document.getElementById('orderIdSuccessSpan');
const orderIdFaildSpan = document.getElementById('orderIdFaildSpan');

async function loadPage() {
    const messageDiv = document.getElementById('message');
    let orderId = localStorage.getItem('orderId');
    if (vnp_TransactionStatus == '00') {
        try {
            const response = await fetch(`http://localhost:8080/orders?orderId=${orderId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                orderIdSuccessSpan.textContent = orderId;
                successDiv.classList.remove('d-none');
                successDiv.classList.add('d-block');

                localStorage.removeItem('orderId');
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

    } else {
        try {
            const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                orderIdFaildSpan.textContent = orderId;
                faildDiv.classList.remove('d-none');
                faildDiv.classList.add('d-block');

                localStorage.removeItem('orderId');
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

window.addEventListener('load', loadPage);