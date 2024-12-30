const addressListContainer = document.getElementById('address-list');

async function fetchAndRenderAddressList() {
    const messageDiv = document.getElementById('message');
    addressListContainer.innerHTML = '';

    try {
        const response = await fetch('http://localhost:8080/shippingAddresses', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const shippingAddresses = result.result;
            if (shippingAddresses.length === 0) {
                messageDiv.textContent = 'Bạn không có địa chỉ nhận hàng nào!';
                return;
            }
            renderAddressList(shippingAddresses);
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

function renderAddressList(shippingAddresses) {
    shippingAddresses.forEach(shippingAddress => {
        const addressRow = createAddressRow(shippingAddress);
        addressListContainer.appendChild(addressRow);
    });
}

function createAddressRow(shippingAddress) {
    const row = document.createElement('div');
    const addressDiv = document.createElement('div');
    const nameP = document.createElement('p');
    const phoneP = document.createElement('p');
    const addressP = document.createElement('p');
    const op = document.createElement('div');
    const updateButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'justify-content-between', 'align-items-center', 'border-top', 'border-secondary');

    addressDiv.appendChild(nameP);
    addressDiv.appendChild(phoneP);
    addressDiv.appendChild(addressP);
    addressDiv.classList.add('col-6');

    nameP.textContent = shippingAddress.recipientName;
    nameP.classList.add('fw-bold');

    phoneP.textContent = shippingAddress.recipientPhone;

    addressP.textContent = shippingAddress.recipientAddress;

    op.appendChild(updateButton);
    op.appendChild(deleteButton);
    op.classList.add('col-2');

    updateButton.textContent = 'Cập nhật';
    updateButton.onclick = () => redirectToUpdatePage(shippingAddress.shippingAddressId);
    updateButton.classList.add('btn', 'btn-primary', 'me-3');

    deleteButton.textContent = 'Xoá';
    deleteButton.onclick = () => deleteAddress(shippingAddress.shippingAddressId);
    deleteButton.classList.add('btn', 'btn-danger');

    row.appendChild(addressDiv);
    row.appendChild(op);

    return row;
}

function redirectToUpdatePage(shippingAddressId) {
    window.location.href = `address-update.html?shippingAddressId=${shippingAddressId}`;
}

function redirectToAddPage() {
    window.location.href = 'address-add.html';
}

async function deleteAddress(shippingAddressId) {
    const messageDiv = document.getElementById('message');
    const confirmDelete = await Swal.fire({
        title: 'Xác nhận xoá',
        text: `Bạn có chắc muốn xoá địa chỉ nhận hàng có ID: ${shippingAddressId}?`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
    });
    if (confirmDelete.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:8080/shippingAddresses/${shippingAddressId}`, {
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
                    text: 'Xoá địa chỉ nhận hàng thành công!',
                });
                fetchAndRenderAddressList();
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

window.addEventListener('load', fetchAndRenderAddressList);