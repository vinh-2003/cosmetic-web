const categoryListContainer = document.getElementById('category-list');

async function fetchAndRenderCategoryList() {
    const messageDiv = document.getElementById('message');
    categoryListContainer.innerHTML = '';
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
            if (categories.length === 0) {
                messageDiv.textContent = 'Không có danh mục nào!';
                return;
            }
            renderCategoryList(categories); // Gọi hàm hiển thị danh sách
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

function redirectToAddPage() {
    window.location.href = 'category-add.html';
}

function redirectToUpdatePage(categoryId) {
    window.location.href = `category-update.html?categoryId=${categoryId}`;
}

// Hàm xử lý xoá danh mục
async function deleteCategory(categoryId) {
    const messageDiv = document.getElementById('message');
    const confirmDelete = await Swal.fire({
        title: 'Xác nhận xoá',
        text: `Bạn có chắc muốn xoá danh mục có ID: ${categoryId}?`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
    });
    if (confirmDelete.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:8080/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                Swal.fire({
                    title: 'Thông báo',
                    text: `Xoá danh mục thành công`,
                    icon: 'success',
                    showConfirmButton: true,
                });
                fetchAndRenderCategoryList(); // Render lại danh sách sau khi xoá
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

// Hàm tạo phần tử hiển thị danh mục
function createCategoryRow(category) {
    const row = document.createElement('div');
    const img = document.createElement('img');
    const nameP = document.createElement('p');
    const descriptionP = document.createElement('p');
    const op = document.createElement('div');
    const updateButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'align-items-center', 'border-bottom', 'border-secondary');

    // Cấu hình ảnh
    img.src = category.imageUrl;
    img.alt = category.name;
    img.classList.add('img-fluid');
    img.classList.add('col-1');

    // Cấu hình tên danh mục
    nameP.textContent = category.name;
    nameP.classList.add('col-2');

    descriptionP.textContent = category.description;
    descriptionP.classList.add('col-7', 'text-truncate');

    op.classList.add('col-2');
    op.appendChild(updateButton);
    op.appendChild(deleteButton);

    // Cấu hình nút cập nhật
    updateButton.textContent = 'Cập nhật';
    updateButton.onclick = () => redirectToUpdatePage(category.categoryId);
    updateButton.classList.add('btn', 'btn-primary', 'me-3');

    // Cấu hình nút xóa
    deleteButton.textContent = 'Xoá';
    deleteButton.onclick = () => deleteCategory(category.categoryId);
    deleteButton.classList.add('btn', 'btn-danger');

    // Gắn các phần tử con vào row
    row.appendChild(img);
    row.appendChild(nameP);
    row.appendChild(descriptionP);
    row.appendChild(op);

    return row;
}

// Hàm hiển thị danh sách danh mục
function renderCategoryList(categories) {
    categories.forEach(category => {
        const categoryRow = createCategoryRow(category); // Tạo phần tử từ hàm riêng
        categoryListContainer.appendChild(categoryRow); // Thêm phần tử vào container
    });
}

async function searchCategory(event) {
    const messageDiv = document.getElementById('message');
    const name = document.getElementById('name').value;
    if (event.key == 'Enter') {
        categoryListContainer.innerHTML = '';
        try {
            const response = await fetch(`http://localhost:8080/categories?name=${name}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                const categories = result.result;
                if (categories.length === 0) {
                    messageDiv.textContent = 'Không có danh mục nào!';
                    return;
                }
                renderCategoryList(categories); // Gọi hàm hiển thị danh sách
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

window.addEventListener('load', fetchAndRenderCategoryList);