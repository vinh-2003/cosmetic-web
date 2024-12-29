const orderListContainer = document.getElementById('orderList');

async function fetchAndRenderOrderList() {
    const messageDiv = document.getElementById('message');
    orderListContainer.innerHTML = '';
    try {
        const response = await fetch('http://localhost:8080/admin/orders', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const orders = result.result;
            console.log(orders);
            if (orders.length === 0) {
                messageDiv.textContent = 'Không có đơn hàng nào!';
                return;
            }
            renderOrderList(orders); // Gọi hàm hiển thị danh sách
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

function renderOrderList(orders) {
    orders.forEach(order => {
        const orderRow = createOrderRow(order);
        orderListContainer.appendChild(orderRow);
    });
}

function createOrderRow(order) {
    const row = document.createElement('div');
    const orderIdP = document.createElement('p');
    const totalP = document.createElement('p');
    const statusP = document.createElement('p');
    const createdAtP = document.createElement('p');
    const op = document.createElement('div');
    const viewButton = document.createElement('button');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'align-items-center', 'border-bottom', 'border-secondary');

    orderIdP.textContent = order.orderId;
    orderIdP.classList.add('col-3', 'text-truncate', 'text-center');

    totalP.textContent = order.total + ' VNĐ';
    totalP.classList.add('col-2', 'text-truncate', 'text-center');

    statusP.textContent = order.currentStatus.status;
    statusP.classList.add('col-2', 'text-truncate', 'text-center');

    createdAtP.textContent = order.createdAt;
    createdAtP.classList.add('col-3', 'text-truncate', 'text-center');

    op.classList.add('col-2', 'text-center');
    op.appendChild(viewButton);

    viewButton.textContent = 'Xem chi tiết';
    viewButton.onclick = () => redirectToViewDetailPage(order.orderId);
    viewButton.classList.add('btn', 'btn-primary');

    row.appendChild(orderIdP);
    row.appendChild(totalP);
    row.appendChild(statusP);
    row.appendChild(createdAtP);
    row.appendChild(op);

    return row;
}
 

function redirectToAddPage() {
    window.location.href = 'order-add.html';
}

function redirectToUpdatePage(orderId) {
    window.location.href = `order-update.html?orderId=${orderId}`;
}




async function searchOrder(event) {
    const messageDiv = document.getElementById('message');
    const orderId = document.getElementById('orderId').value;
    if (event.key == 'Enter') {
        orderListContainer.innerHTML = '';
        try {
            const response = await fetch(`http://localhost:8080/admin/orders?orderId=${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                const orders = result.result;
                if (orders.length === 0) {
                    messageDiv.textContent = 'Không có đơn hàng nào!';
                    return;
                }
                renderOrderList(orders);
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

window.addEventListener('load', fetchAndRenderOrderList);