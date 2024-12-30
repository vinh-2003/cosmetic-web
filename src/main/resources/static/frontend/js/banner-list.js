const bannerListContainer = document.getElementById('banner-list');

async function fetchAndRenderBannerList() {
    const messageDiv = document.getElementById('message'); // Sử dụng messageDiv để thông báo lỗi
    bannerListContainer.innerHTML = ''; // Clear the banner list container

    try {
        const response = await fetch('http://localhost:8080/banners', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const banners = result.result;
            if (banners.length === 0) {
                messageDiv.textContent = 'Không có banner nào!';
                return;
            }
            renderBannerList(banners); // Gọi hàm hiển thị danh sách banner
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
    window.location.href = 'banner-add.html';
}

function redirectToUpdatePage(bannerId) {
    window.location.href = `banner-update.html?bannerId=${bannerId}`;
}


async function deleteBanner(bannerId) {
    const messageDiv = document.getElementById('message'); // Sử dụng messageDiv cho các thông báo khác
    const confirmDelete = await Swal.fire({
        title: 'Xác nhận xoá',
        text: `Bạn có chắc muốn xoá banner có ID: ${bannerId}?`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
    });
    if (confirmDelete.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:8080/banners/${bannerId}`, {
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
                    text: 'Xoá banner thành công!',
                });
                fetchAndRenderBannerList();
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

function createBannerRow(banner) {
    const row = document.createElement('div');
    const img = document.createElement('img');
    const linkP = document.createElement('p');
    const startDateP = document.createElement('p');
    const endDateP = document.createElement('p');
    const op = document.createElement('div');
    const updateButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'align-items-center', 'border-bottom', 'border-secondary');

    img.src = banner.imageUrl;
    img.alt = banner.link;
    img.classList.add('img-fluid');
    img.classList.add('col-2');

    linkP.textContent = banner.link;
    linkP.classList.add('col-4', 'text-truncate');

    startDateP.textContent = banner.startDate;
    startDateP.classList.add('col-2', 'text-truncate', 'text-center');

    endDateP.textContent = banner.endDate;
    endDateP.classList.add('col-2', 'text-truncate', 'text-center');

    op.classList.add('col-2');
    op.appendChild(updateButton);
    op.appendChild(deleteButton);

    updateButton.textContent = 'Cập nhật';
    updateButton.onclick = () => redirectToUpdatePage(banner.bannerId);
    updateButton.classList.add('btn', 'btn-primary', 'me-3');

    deleteButton.textContent = 'Xoá';
    deleteButton.onclick = () => deleteBanner(banner.bannerId);
    deleteButton.classList.add('btn', 'btn-danger');

    row.appendChild(img);
    row.appendChild(linkP);
    row.appendChild(startDateP);
    row.appendChild(endDateP);
    row.appendChild(op);

    return row;
}

function renderBannerList(banners) {
    banners.forEach(banner => {
        const bannerRow = createBannerRow(banner);
        bannerListContainer.appendChild(bannerRow);
    });
}

async function searchBanner(event) {
    const messageDiv = document.getElementById('message'); // Sử dụng messageDiv cho các thông báo khác
    const link = document.getElementById('link').value;
    if (event.key == 'Enter') {
        bannerListContainer.innerHTML = '';
        try {
            const response = await fetch(`http://localhost:8080/banners?link=${link}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                const banners = result.result;
                if (banners.length === 0) {
                    messageDiv.textContent = 'Không có banner nào!';
                    return;
                }
                renderBannerList(banners);
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

window.addEventListener('load', fetchAndRenderBannerList);