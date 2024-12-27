const bannerListContainer = document.getElementById('banner-section');
const categoryListContainer = document.getElementById('category-section');
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

async function fetchAndRenderBannerList() {
    const messageDiv = document.getElementById('message');
    bannerListContainer.innerHTML = '';
    try {
        const response = await fetch('http://localhost:8080/banners', {
            method: 'GET',
        });

        const result = await response.json();

        if (result.code === 1000) {
            const banners = result.result;
            if (banners.length === 0) {
                messageDiv.textContent = 'Không có banner nào!';
                return;
            }
            renderBannerList(banners); // Gọi hàm hiển thị danh sách
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

function renderBannerList(banners) {
    banners.forEach((banner, index) => {
        const bannerItem = createBannerItem(banner, index === 0);
        bannerListContainer.appendChild(bannerItem);
    });
}

function createBannerItem(banner, isFirst) {
    const item = document.createElement('div');
    const img = document.createElement('img');

    item.onclick = () => window.location.href = `${banner.link}`;
    item.classList.add('carousel-item');

    // Thêm lớp cho phần tử đầu tiên
    if (isFirst) {
        item.classList.add('active');
    }

    img.src = banner.imageUrl;
    img.alt = banner.link;
    img.classList.add('img-fluid');
    img.classList.add('rounded');

    item.appendChild(img);

    return item;
}





async function fetchAndRenderCategoryList() {
    const messageDiv = document.getElementById('message');
    categoryListContainer.innerHTML = '';
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

function renderCategoryList(categories) {
    categories.forEach(category => {
        const categoryItem = createCategoryItem(category);
        categoryListContainer.appendChild(categoryItem);
    });
}

function createCategoryItem(category) {
    const item = document.createElement('div');
    const img = document.createElement('img');
    const body = document.createElement('div');
    const name = document.createElement('h5');

    item.classList.add('card');
    item.classList.add('col-2');
    item.classList.add('mx-2');
    item.onclick = () => window.location.href = `product-search.html?categoryId=${category.categoryId}`;

    img.src = category.imageUrl;
    img.alt = category.name;
    img.classList.add('card-img-top');

    body.classList.add('card-body');
    body.appendChild(name);

    name.textContent = category.name;
    name.classList.add('card-title');
    name.classList.add('text-center');

    item.appendChild(img);
    item.appendChild(body);

    return item;
}

async function fetchAndRenderProductList() {
    const messageDiv = document.getElementById('message');
    productListContainer.innerHTML = '';
    try {
        const response = await fetch('http://localhost:8080/products', {
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
    const priceContainer = document.createElement('div');
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
    body.appendChild(priceContainer);
    body.appendChild(addButton);

    name.textContent = product.name;
    name.classList.add('card-title', 'text-center', 'product-name');
    name.onclick = () => window.location.href = `product-detail.html?productId=${product.productId}`;

    priceContainer.appendChild(price);
    priceContainer.appendChild(priceKm);
    priceContainer.classList.add('d-flex', 'justify-content-around')

    price.textContent = product.price + 'VNĐ';
    price.classList.add('card-text', 'text-decoration-line-through');

    let productPrice = parseInt(product.price);
    let productDiscountPercentage = parseInt(product.discountPercentage);
    let productPriceKm = productPrice * (100 - productDiscountPercentage) / 100;

    priceKm.textContent = productPriceKm.toString() + 'VNĐ';
    priceKm.classList.add('card-text');

    addButton.textContent = 'Thêm vào giỏ hàng';
    addButton.classList.add('btn', 'btn-primary');
    addButton.onclick = () => addOneProductToCart(product.productId);

    item.appendChild(img);
    item.appendChild(body);

    return item;
}

async function addOneProductToCart(productId) {
    const messageDiv = document.getElementById('message');
    const quantity = 1;

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


function loadContent() {

    fetchAndRenderCategoryNameList();
    fetchAndRenderBannerList();
    fetchAndRenderCategoryList();
    fetchAndRenderProductList();
}

window.addEventListener('load', loadContent);