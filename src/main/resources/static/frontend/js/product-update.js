const productId = new URLSearchParams(window.location.search).get('productId');
const imageFileInput = document.getElementById('imageFile');
const imagePreview = document.getElementById('image-preview');

// Hiển thị hình ảnh khi người dùng chọn file
imageFileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result; // Gán URL của hình ảnh vào thẻ <img>
        };
        reader.readAsDataURL(file); // Đọc file dưới dạng URL
    } else {
        imagePreview.src = ''; // Xóa URL nếu không có hình ảnh nào được chọn
    }
});

// Lấy dữ liệu product và gán vào các trường
async function loadProduct() {
    const messageDiv = document.getElementById('message');
    try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const product = result.result;
            document.getElementById('name').value = product.name;
            document.getElementById('description').value = product.description;
            document.getElementById('price').value = product.price;
            document.getElementById('stockQuantity').value = product.stockQuantity;
            imagePreview.src = product.imageUrl; // Hiển thị ảnh hiện tại của product
            document.getElementById('category').value = product.category.categoryId;
            document.getElementById('brand').value = product.brand;
            document.getElementById('discountPercentage').value = product.discountPercentage;
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

// Cập nhật product
async function updateProduct() {
    const messageDiv = document.getElementById('message');
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stockQuantity = document.getElementById('stockQuantity').value;
    const imageFile = document.getElementById('imageFile').files[0];
    const categoryId = document.getElementById('category').value;
    const brand = document.getElementById('brand').value;
    const discountPercentage = document.getElementById('discountPercentage').value;

    // Kiểm tra xem người dùng đã điền đầy đủ thông tin chưa
    if (!name || !description || !price || !stockQuantity || !categoryId || !brand || !discountPercentage) {
        messageDiv.textContent = 'Vui lòng điền đầy đủ thông tin!';
        return;
    }

    const formData = new FormData();
    formData.append('productData', new Blob([JSON.stringify({ name, description, price, stockQuantity, categoryId, brand, discountPercentage })], { type: 'application/json' }));
    if (imageFile) {
        formData.append('imageFile', imageFile);
    }

    try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        const result = await response.json();
        const messageDiv = document.getElementById('message');

        if (result.code === 1000) {
            await Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Cập nhật sản phẩm thành công!',
            });
            window.location.href = 'product-list.html';
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

async function loadCategory() {
    const messageDiv = document.getElementById('message');
    const categorySelect = document.getElementById("category");
    try {
        const response = await fetch('http://localhost:8080/categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const categories = result.result;
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.categoryId;
                option.textContent = category.name;
                categorySelect.appendChild(option);
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

// Gọi hàm loadProduct khi trang được tải
window.addEventListener('DOMContentLoaded', loadCategory);
window.addEventListener('load', loadProduct);