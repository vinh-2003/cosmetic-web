const productListContainer = document.getElementById('product-list');

async function fetchAndRenderProductList() {
    const messageDiv = document.getElementById('message');
    productListContainer.innerHTML = '';
    try {
        const response = await fetch('http://localhost:8080/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const products = result.result;
            if (products.length === 0) {
                messageDiv.textContent = 'Không có sản phẩm nào!';
                return;
            }
            renderProductList(products); // Gọi hàm hiển thị danh sách
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
    window.location.href = 'product-add.html';
}

function redirectToUpdatePage(productId) {
    window.location.href = `product-update.html?productId=${productId}`;
}


async function deleteProduct(productId) {
    const messageDiv = document.getElementById('message');
    const confirmDelete = await Swal.fire({
        title: 'Xác nhận xoá',
        text: `Bạn có chắc muốn xoá sản phẩm có ID: ${productId}?`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
    });
    if (confirmDelete.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:8080/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                Swal.fire({
                    title: 'Thông báo',
                    text: `Xoá sản phẩm thành công`,
                    icon: 'success',
                    showConfirmButton: true,
                });
                fetchAndRenderProductList();
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

function createProductRow(product) {
    const row = document.createElement('div');
    const img = document.createElement('img');
    const nameP = document.createElement('p');
    const descriptionP = document.createElement('p');
    const priceP = document.createElement('p');
    const stockQuantityP = document.createElement('p');
    const categoryP = document.createElement('p');
    const brandP = document.createElement('p');
    const discountPercentageP = document.createElement('p');
    const op = document.createElement('div');
    const updateButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'align-items-center', 'border-bottom', 'border-secondary');

    img.src = product.imageUrl;
    img.alt = product.name;
    img.classList.add('col-1', 'img-fluid');

    nameP.textContent = product.name;
    nameP.classList.add('col-2');

    descriptionP.textContent = product.description;
    descriptionP.classList.add('col-2', 'text-truncate');

    priceP.textContent = product.price;
    priceP.classList.add('col-1', 'text-center');

    stockQuantityP.textContent = product.stockQuantity;
    stockQuantityP.classList.add('col-1', 'text-center');

    categoryP.textContent = product.category.name;
    categoryP.classList.add('col-1', 'text-center');

    brandP.textContent = product.brand;
    brandP.classList.add('col-1', 'text-center');

    discountPercentageP.textContent = product.discountPercentage;
    discountPercentageP.classList.add('col-1', 'text-center');

    op.classList.add('col-2');
    op.appendChild(updateButton);
    op.appendChild(deleteButton);

    updateButton.textContent = 'Cập nhật';
    updateButton.onclick = () => redirectToUpdatePage(product.productId);
    updateButton.classList.add('btn', 'btn-primary', 'me-3');

    deleteButton.textContent = 'Xoá';
    deleteButton.onclick = () => deleteProduct(product.productId);
    deleteButton.classList.add('btn', 'btn-danger');

    row.appendChild(img);
    row.appendChild(nameP);
    row.appendChild(descriptionP);
    row.appendChild(priceP);
    row.appendChild(stockQuantityP);
    row.appendChild(categoryP);
    row.appendChild(brandP);
    row.appendChild(discountPercentageP);
    row.appendChild(op);

    return row;
}

function renderProductList(products) {
    products.forEach(product => {
        const productRow = createProductRow(product);
        productListContainer.appendChild(productRow);
    });
}

async function searchProduct(event) {
    const name = document.getElementById('name').value;
    if (event.key == 'Enter') {
        productListContainer.innerHTML = '';
        try {
            const response = await fetch(`http://localhost:8080/products?name=${name}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                const products = result.result;
                if (products.length === 0) {
                    messageDiv.textContent = 'Không có sản phẩm nào!';
                    return;
                }
                renderProductList(products);
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
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = 'Có lỗi xảy ra khi kết nối đến server.';
        }
    }
}

window.addEventListener('load', fetchAndRenderProductList);