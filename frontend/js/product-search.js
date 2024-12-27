// Lấy các tham số từ URL
const searchParams = new URLSearchParams(window.location.search);

// Giải mã tham số 'name'
const encodedProductName = searchParams.get('name');
const productName = encodedProductName ? decodeURIComponent(encodedProductName) : null;

// Giải mã tham số 'categoryId'
const encodedCategoryId = searchParams.get('categoryId');
const categoryId = encodedCategoryId ? decodeURIComponent(encodedCategoryId) : null;

console.log('Product Name:', productName);
console.log('Category ID:', categoryId);

const productListContainer = document.getElementById('product-section');
const categoryNameList = document.getElementById('categoryName-list');

async function fetchAndRenderCategoryNameList() {
    const messageDiv = document.getElementById('message');
    categoryNameList.innerHTML = '';
    try {
        const response = await fetch('http://localhost:8080/categories', {
            method: 'GET',
        });

        const result = await response.json();

        if (result.code === 1000) {
            const categories = result.result;
            if (categories.length === 0) {
                messageDiv.textContent = 'Không có danh mục nào!';
                return;
            }
            renderCategoryNameList(categories); // Gọi hàm hiển thị danh sách
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

function renderCategoryNameList(categories) {
    categories.forEach(category => {
        const categoryNameItem = createCategoryNameItem(category);
        categoryNameList.appendChild(categoryNameItem);
    });
}

function createCategoryNameItem(category) {
    const item = document.createElement('li');
    const nameA = document.createElement('a');

    nameA.textContent = category.name;
    nameA.href = `product-search.html?categoryId=${category.categoryId}`;
    nameA.classList.add('text-decoration-none');

    item.classList.add('list-group-item');
    item.appendChild(nameA);

    return item;
}

async function fetchAndRenderProductList() {
    const messageDiv = document.getElementById('message');
    productListContainer.innerHTML = '';
    try {
        const response = (productName != null) ?
            await fetch(`http://localhost:8080/products?name=${productName}`, {
                method: 'GET',
            }) : await fetch(`http://localhost:8080/products?categoryId=${categoryId}`, {
                method: 'GET',
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

function renderProductList(products) {
    products.forEach(product => {
        const productItem = createProductItem(product);
        productListContainer.appendChild(productItem);
    });
}

function createProductItem(product) {
    const item = document.createElement('div');
    const img = document.createElement('img');
    const body = document.createElement('div');
    const name = document.createElement('p');
    const price = document.createElement('p');
    const priceKm = document.createElement('p');
    const addButton = document.createElement('button');

    item.classList.add('card', 'col-2', 'mx-2');
    console.log('here');

    img.src = product.imageUrl;
    img.alt = product.name;
    img.classList.add('card-img-top')

    body.classList.add('card-body');
    body.appendChild(name);
    body.appendChild(price);
    body.appendChild(priceKm);
    body.appendChild(addButton);

    name.textContent = product.name;
    name.classList.add('card-title', 'text-center', 'product-name');
    name.onclick = () => window.location.href = `product-detail.html?productId=${product.productId}`;

    price.textContent = product.price + 'VNĐ';
    price.classList.add('card-text', 'text-decoration-line-through', 'text-center');

    let productPrice = parseInt(product.price);
    let productDiscountPercentage = parseInt(product.discountPercentage);
    let productPriceKm = productPrice * (100 - productDiscountPercentage) / 100;

    priceKm.textContent = productPriceKm.toString() + 'VNĐ';
    priceKm.classList.add('card-text', 'text-center');

    addButton.textContent = 'Thêm vào giỏ hàng';
    addButton.classList.add('btn', 'btn-primary', 'mx-auto');
    addButton.onclick = () => ``;

    item.appendChild(img);
    item.appendChild(body);

    return item;
}


function loadContent() {

    fetchAndRenderCategoryNameList();
    fetchAndRenderProductList();
}

window.addEventListener('load', loadContent);