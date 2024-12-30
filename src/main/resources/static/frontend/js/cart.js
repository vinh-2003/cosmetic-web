const cartItemListContainer = document.getElementById('cartItemList');
const cartTotal = document.getElementById('cartTotal');
const cartContainer = document.getElementById('cartContainer');

async function fetchAndRenderCartItemList() {
    const messageDiv = document.getElementById('message');
    cartItemListContainer.innerHTML = '';
    try {
        const response = await fetch('http://localhost:8080/carts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const cart = result.result;
            const cartItems = cart.cartItems;
            if (cartItems.length === 0) {
                messageDiv.textContent = 'Không có gì trong giỏ hàng!';
                cartContainer.innerHTML = '';
                return;
            }
            renderCartItemList(cartItems); // Gọi hàm hiển thị danh sách
            cartTotal.textContent = formatCurrencyVND(cart.total);
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

function renderCartItemList(cartItems) {
    cartItems.forEach(cartItem => {
        const cartItemRow = createCartItemRow(cartItem);
        cartItemListContainer.appendChild(cartItemRow);
    });
}

function createCartItemRow(cartItem) {
    const row = document.createElement('div');
    const img = document.createElement('img');
    const productNameP = document.createElement('p');
    const productPriceP = document.createElement('p');
    const quantityDiv = document.createElement('div');
    const subButton = document.createElement('button');
    const quantity = document.createElement('input')
    const addButton = document.createElement('button');
    const totalP = document.createElement('p');
    const op = document.createElement('div');
    const deleteButton = document.createElement('button');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'align-items-center', 'border-bottom', 'border-secondary');

    img.src = cartItem.product.imageUrl;
    img.alt = cartItem.product.name;
    img.classList.add('img-fluid', 'col-1');
    img.onclick = () => redirectToPage(cartItem.product.productId);
    img.style.cursor = 'pointer';

    productNameP.textContent = cartItem.product.name;
    productNameP.classList.add('col-4', 'text-truncate');

    productPriceP.textContent = formatCurrencyVND(cartItem.price);
    productPriceP.classList.add('col-2', 'text-truncate', 'text-center');

    quantityDiv.appendChild(subButton);
    quantityDiv.appendChild(quantity);
    quantityDiv.appendChild(addButton);
    quantityDiv.classList.add('d-flex', 'justify-content-start', 'col-2');

    subButton.textContent = '-';
    subButton.id = `subButton_${cartItem.cartItemId}`;
    subButton.classList.add('btn', 'btn-secondary', 'mx-1');
    subButton.onclick = () => decreaseQuantity(cartItem.cartItemId);

    quantity.value = cartItem.quantity;
    quantity.id = `quantity_${cartItem.cartItemId}`;
    quantity.classList.add('form-control', 'text-center');
    quantity.onchange = () => updateQuantity(cartItem.cartItemId);
    quantity.oninput = () => updateQuantity(cartItem.cartItemId);

    addButton.textContent = '+';
    addButton.id = `addButton_${cartItem.cartItemId}`;
    addButton.classList.add('btn', 'btn-secondary', 'mx-1');
    addButton.onclick = () => increaseQuantity(cartItem.cartItemId, cartItem.product.stockQuantity);

    totalP.textContent = formatCurrencyVND(cartItem.price * cartItem.quantity);
    totalP.id = `totalP_${cartItem.cartItemId}`;
    totalP.classList.add('col-2', 'text-truncate', 'text-center');

    op.classList.add('col-1');
    op.appendChild(deleteButton);

    deleteButton.textContent = 'Xoá';
    deleteButton.onclick = () => deleteCartItem(cartItem.cartItemId);
    deleteButton.classList.add('btn', 'btn-danger');

    row.appendChild(img);
    row.appendChild(productNameP);
    row.appendChild(productPriceP);
    row.appendChild(quantityDiv);
    row.appendChild(totalP);
    row.appendChild(op);

    return row;
}



function decreaseQuantity(cartItemId) {
    let quantityInput = document.getElementById(`quantity_${cartItemId}`);
    let currentValue = parseInt(quantityInput.value, 10);
    if (!isNaN(currentValue) && currentValue > 1) {
        quantityInput.value = currentValue - 1;
    } else {
        quantityInput.value = 1; // Đặt lại nếu giá trị không hợp lệ
    }
    updateQuantity(cartItemId);
}

function increaseQuantity(cartItemId, maxQuantity) {
    let quantityInput = document.getElementById(`quantity_${cartItemId}`);
    let currentValue = parseInt(quantityInput.value, 10);
    if (!isNaN(currentValue) && currentValue < maxQuantity) {
        quantityInput.value = currentValue + 1;
    } else {
        quantityInput.value = maxQuantity; // Giới hạn giá trị tối đa
    }
    updateQuantity(cartItemId);
}

function redirectToPage(productId) {
    window.location.href = `product-detail.html?productId=${productId}`;
}

async function updateQuantity(cartItemId) {
    const messageDiv = document.getElementById('message');
    const quantityInput = document.getElementById(`quantity_${cartItemId}`);
    let quantity = quantityInput.value;

    const data = { cartItemId, quantity };

    try {
        const response = await fetch('http://localhost:8080/cartItems', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.code === 1000) {
            const kq = result.result;
            quantityInput.value = kq.quantity;
            document.getElementById(`totalP_${cartItemId}`).textContent = formatCurrencyVND(kq.quantity * kq.price);
            cartTotal.textContent = formatCurrencyVND(kq.cartTotal);
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

async function deleteCartItem(cartItemId) {
    const messageDiv = document.getElementById('message');
    const confirmDelete = await Swal.fire({
        title: 'Xác nhận xoá',
        text: `Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
    });
    if (confirmDelete.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:8080/cartItems/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Xoá sản phẩm trong giỏ hàng thành công!',
                });
                fetchAndRenderCartItemList();
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

function redirectOrderPage() {
    window.location.href = `order-preview.html`;
}

window.addEventListener('load', fetchAndRenderCartItemList);