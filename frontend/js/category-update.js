const categoryId = new URLSearchParams(window.location.search).get('categoryId');
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

// Lấy dữ liệu category và gán vào các trường
async function loadCategory() {
    const messageDiv = document.getElementById('message');
    try {
        const response = await fetch(`http://localhost:8080/categories/${categoryId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const category = result.result;
            document.getElementById('name').value = category.name;
            document.getElementById('description').value = category.description;
            imagePreview.src = category.imageUrl; // Hiển thị ảnh hiện tại của category
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

// Cập nhật category
async function updateCategory() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const imageFile = imageFileInput.files[0];
    const messageDiv = document.getElementById('message');

    if (!name || !description) {
        messageDiv.textContent = 'Vui lòng điền đầy đủ thông tin!';
        return;
    }

    const formData = new FormData();
    formData.append('categoryData', new Blob([JSON.stringify({ name, description })], { type: 'application/json' }));
    if (imageFile) {
        formData.append('imageFile', imageFile);
    }

    try {
        const response = await fetch(`http://localhost:8080/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        const result = await response.json();

        if (result.code === 1000) {
            await Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Cập nhật danh mục thành công!',
            });
            window.location.href = 'category-list.html';
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

// Gọi hàm loadCategory khi trang được tải
window.addEventListener('load', loadCategory);