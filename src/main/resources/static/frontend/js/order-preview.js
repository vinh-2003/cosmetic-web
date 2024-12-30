const changeAddressBtn = document.getElementById('changeAddressBtn');
const orderItemListContainer = document.getElementById('orderItemList');
const orderTotal = document.getElementById('orderTotal');
const discount = document.getElementById('discount');
const orderTotalKm = document.getElementById('orderTotalKm');
const returnBtn = document.getElementById('returnBtn');
const voucherCode = document.getElementById('voucherCode');
const submitVoucherBtn = document.getElementById('submitVoucherBtn');
const messageCode = document.getElementById('messageCode');
const paymentBtn = document.getElementById('paymentBtn');
let totalPrice;
let orderTotalPrice;

async function fetchAndRenderResource() {
    const messageDiv = document.getElementById('message');
    orderItemListContainer.innerHTML = '';
    let orderId = localStorage.getItem("orderId");
    console.log(orderId);
    try {
        const response = orderId ?
            await fetch(`http://localhost:8080/orders/${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }) : await fetch('http://localhost:8080/orders', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

        const result = await response.json();

        if (result.code === 1000) {
            const order = result.result;
            localStorage.setItem('orderId', order.orderId);

            const shippingAddress = order.shippingAddress;
            renderShippingAddress(shippingAddress);

            const orderItems = order.orderItems;
            if (orderItems.length === 0) {
                messageDiv.textContent = 'Không có gì trong đơn hàng!';
                return;
            }
            renderOrderItemList(orderItems); // Gọi hàm hiển thị danh sách
            orderTotal.textContent = formatCurrencyVND(order.total);
            totalPrice = parseInt(order.total);
            discount.textContent = formatCurrencyVND(0);
            orderTotalKm.textContent = formatCurrencyVND(order.total);
            orderTotalPrice = parseInt(order.total);

            changeAddressBtn.onclick = () => redirectToChangeAddressPage(order.orderId);

        } else if (result.code === 8008) {
            const confirmAddAddress = await Swal.fire({
                title: `Thông báo`,
                text: `Bạn chưa có địa chỉ nhận hàng, thêm địa chỉ?`,
                icon: 'question',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Thêm',
                cancelButtonText: 'Quay lại',
            });
            if (confirmAddAddress.isConfirmed) {
                window.location.href = `address-add.html`;
            } else {
                window.location.href = `cart.html`;
            }
        } else if (result.code === 9002) {
            await Swal.fire({
                title: `Cảnh báo`,
                text: `Hành động không hợp lệ?`,
                icon: 'warning',
            });
            window.location.href = `home.html`;
        }
        else {
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

function redirectToChangeAddressPage(orderId) {
    window.location.href = `order-change-address.html?orderId=${orderId}`;
}

async function disposeOrder() {
    const messageDiv = document.getElementById('message');
    let orderId = localStorage.getItem("orderId");

    try {
        const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            localStorage.removeItem('orderId');
            window.location.href = 'cart.html';
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

async function applyVoucher() {
    const messageDiv = document.getElementById('message');
    const code = voucherCode.value;
    const orderId = localStorage.getItem('orderId');

    if (!code) {
        messageCode.textContent = 'Vui lòng nhập mã giảm giá!';
        return;
    }

    const data = { orderId, code };

    try {
        const response = await fetch(`http://localhost:8080/orders/apply-voucher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();



        if (result.code === 1000) {
            const kq = result.result;
            orderTotalKm.textContent = formatCurrencyVND(kq.totalAmount);
            orderTotalPrice = parseInt(kq.totalAmount);
            discount.textContent = formatCurrencyVND(kq.discount);
            messageCode.textContent = kq.message;

        } else {
            switch (response.status) {
                case 400:
                    messageCode.textContent = result.message;
                    orderTotalPrice = totalPrice;
                    discount.textContent = formatCurrencyVND(0);
                    orderTotalKm.textContent = formatCurrencyVND(totalPrice);
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

async function startPayment() {
    const messageDiv = document.getElementById('message');
    const amount = parseInt(orderTotalPrice);
    console.log(amount);
    try {
        const response = await fetch(`http://localhost:8080/api/payment/create_payment?amount=${amount}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const kq = result.result;

            window.location.href = kq.url;
        } else {
            switch (response.status) {
                case 400:
                    messageCode.textContent = result.message;
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

function loadPage() {
    fetchAndRenderResource();
}

window.addEventListener('load', loadPage);