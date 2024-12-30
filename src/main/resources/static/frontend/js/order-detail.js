const orderId = new URLSearchParams(window.location.search).get('orderId');
const orderItemListContainer = document.getElementById('orderItemList');
const orderTotal = document.getElementById('orderTotal');
const discount = document.getElementById('discount');
const orderTotalKm = document.getElementById('orderTotalKm');
const orderStatus = document.getElementById('orderStatus');

async function fetchAndRenderResource() {
    const messageDiv = document.getElementById('message');
    orderItemListContainer.innerHTML = '';
    try {
        const response =
            await fetch(`http://localhost:8080/orders/${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

        const result = await response.json();

        if (result.code === 1000) {
            const order = result.result;

            const shippingAddress = order.shippingAddress;
            renderShippingAddress(shippingAddress);

            const orderItems = order.orderItems;
            if (orderItems.length === 0) {
                messageDiv.textContent = 'Không có gì trong đơn hàng!';
                return;
            }
            renderOrderItemList(orderItems); // Gọi hàm hiển thị danh sách
            if (!order.voucher) {
                orderTotal.textContent = formatCurrencyVND(order.total);
                discount.textContent = formatCurrencyVND(0);
            } else {
                orderTotal.textContent = formatCurrencyVND(parseInt(order.total) + parseInt(order.voucher.discount));
                discount.textContent = formatCurrencyVND(order.voucher.discount);
            }
            orderTotalKm.textContent = formatCurrencyVND(order.total);
            orderStatus.textContent = order.currentStatus.status;

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

function renderShippingAddress(shippingAddress) {
    const recipientName = document.getElementById('recipientName');
    const recipientPhone = document.getElementById('recipientPhone');
    const recipientAddress = document.getElementById('recipientAddress');

    recipientName.textContent = shippingAddress.recipientName;
    recipientPhone.textContent = shippingAddress.recipientPhone;
    recipientAddress.textContent = shippingAddress.recipientAddress;
}

function renderOrderItemList(orderItems) {
    orderItems.forEach(orderItem => {
        const orderItemRow = createOrderItemRow(orderItem);
        orderItemListContainer.appendChild(orderItemRow);
    });
}

function createOrderItemRow(orderItem) {
    const row = document.createElement('div');
    const img = document.createElement('img');
    const productNameP = document.createElement('p');
    const productPriceP = document.createElement('p');
    const quantityP = document.createElement('p')
    const totalP = document.createElement('p');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'align-items-center', 'border-bottom', 'border-secondary');

    img.src = orderItem.product.imageUrl;
    img.alt = orderItem.product.name;
    img.classList.add('img-fluid', 'col-1');

    productNameP.textContent = orderItem.product.name;
    productNameP.classList.add('col-6', 'text-truncate');

    productPriceP.textContent = formatCurrencyVND(orderItem.price);
    productPriceP.classList.add('col-2', 'text-truncate', 'text-center');

    quantityP.textContent = orderItem.quantity;
    quantityP.classList.add('col-1', 'text-truncate', 'text-center');

    totalP.textContent = formatCurrencyVND(orderItem.price * orderItem.quantity);
    totalP.classList.add('col-2', 'text-truncate', 'text-center');

    row.appendChild(img);
    row.appendChild(productNameP);
    row.appendChild(productPriceP);
    row.appendChild(quantityP);
    row.appendChild(totalP);

    return row;
}

function loadPage() {
    fetchAndRenderResource();
}

window.addEventListener('load', loadPage);