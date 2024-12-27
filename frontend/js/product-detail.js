const productId = new URLSearchParams(window.location.search).get('productId');
const productImageUrl = document.getElementById('productImageUrl');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productPriceKm = document.getElementById('productPriceKm');
const productBrand = document.getElementById('productBrand');
const productStockQuantity = document.getElementById('productStockQuantity');
const productDescription = document.getElementById('productDescription');

const subButton = document.getElementById('subButton');
const addButton = document.getElementById('addButton');
const quantityInput = document.getElementById('quantity');
const addToCartBtn = document.getElementById('addToCartBtn');


async function renderProduct() {
    const messageDiv = document.getElementById('message');
    try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
            method: 'GET',
        });

        const result = await response.json();

        if (result.code === 1000) {
            const product = result.result;

            let price = parseInt(product.price);
            let discountPercentage = parseInt(product.discountPercentage);
            let priceKm = price * (100 - discountPercentage) / 100;

            productImageUrl.src = product.imageUrl;
            productImageUrl.alt = product.name;
            productName.textContent = product.name;
            productPrice.textContent = product.price + ' VNĐ';
            productPriceKm.textContent = priceKm + ' VNĐ';
            productBrand.textContent = product.brand;
            productStockQuantity.textContent = product.stockQuantity;
            productDescription.textContent = product.description;
            maxQuantity = parseInt(product.stockQuantity);
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

// Thiết lập giá trị tối đa
let maxQuantity;

// Đảm bảo giá trị trong input luôn là số hợp lệ trong khoảng [1, maxQuantity]
const validateQuantity = () => {
    let value = parseInt(quantityInput.value, 10);
    if (isNaN(value) || value < 1) {
        quantityInput.value = 1; // Đặt lại giá trị mặc định nếu nhỏ hơn 1
    } else if (value > maxQuantity) {
        quantityInput.value = maxQuantity; // Giới hạn giá trị tối đa
    }
};

// Giảm số lượng
subButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value, 10);
    if (!isNaN(currentValue) && currentValue > 1) {
        quantityInput.value = currentValue - 1;
    } else {
        quantityInput.value = 1; // Đặt lại nếu giá trị không hợp lệ
    }
});

// Tăng số lượng
addButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value, 10);
    if (!isNaN(currentValue) && currentValue < maxQuantity) {
        quantityInput.value = currentValue + 1;
    } else {
        quantityInput.value = maxQuantity; // Giới hạn giá trị tối đa
    }
});

// Xử lý nhập liệu
quantityInput.addEventListener('input', () => {
    let value = quantityInput.value.trim();
    if (!/^\d+$/.test(value)) {
        quantityInput.value = 1; // Nếu không phải số, đặt thành 1
    } else {
        validateQuantity(); // Kiểm tra giá trị hợp lệ
    }
});

// Khôi phục giá trị hợp lệ khi mất focus
quantityInput.addEventListener('blur', validateQuantity);

// Xử lý khi nhấn Enter
quantityInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        validateQuantity(); // Kiểm tra và điều chỉnh giá trị hợp lệ
    }
});

async function addProductToCart(productId) {
    const messageDiv = document.getElementById('message');
    const quantity = quantityInput.value;

    const data = { productId, quantity };

    try {
        const response = await fetch('http://localhost:8080/cartItems', {
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
                text: `Đã thêm ${quantity} sản phẩm vào giỏ hàng!`,
            });
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

addToCartBtn.addEventListener('click', () => addProductToCart(productId));

window.addEventListener('load', renderProduct);