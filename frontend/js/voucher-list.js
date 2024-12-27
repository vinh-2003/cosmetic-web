const voucherListContainer = document.getElementById('voucher-list');

async function fetchAndRenderVoucherList() {
    const messageDiv = document.getElementById('message');
    voucherListContainer.innerHTML = '';
    try {
        const response = await fetch('http://localhost:8080/vouchers', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const vouchers = result.result;
            if (vouchers.length === 0) {
                messageDiv.textContent = 'Không có voucher nào!';
                return;
            }
            renderVoucherList(vouchers); // Gọi hàm hiển thị danh sách
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
    window.location.href = 'voucher-add.html';
}

function redirectToUpdatePage(voucherId) {
    window.location.href = `voucher-update.html?voucherId=${voucherId}`;
}


async function deleteVoucher(voucherId) {
    const messageDiv = document.getElementById('message');
    const confirmDelete = await Swal.fire({
        title: 'Xác nhận xoá',
        text: `Bạn có chắc muốn xoá mã giảm giá có ID: ${voucherId}?`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
    });
    if (confirmDelete.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:8080/vouchers/${voucherId}`, {
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
                    text: 'Xoá mã giảm giá thành công!',
                });
                fetchAndRenderVoucherList();
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

function createVoucherRow(voucher) {
    const row = document.createElement('div');
    const codeP = document.createElement('p');
    const discountP = document.createElement('p');
    const startDateP = document.createElement('p');
    const endDateP = document.createElement('p');
    const minPurchaseP = document.createElement('p');
    const usageLimitP = document.createElement('p');
    const op = document.createElement('div');
    const updateButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'align-items-center', 'border-bottom', 'border-secondary');

    codeP.textContent = voucher.code;
    codeP.classList.add('col-2', 'text-truncate', 'text-center');

    discountP.textContent = voucher.discount;
    discountP.classList.add('col-2', 'text-truncate', 'text-center');

    startDateP.textContent = voucher.startDate;
    startDateP.classList.add('col-2', 'text-truncate', 'text-center');

    endDateP.textContent = voucher.endDate;
    endDateP.classList.add('col-2', 'text-truncate', 'text-center');

    minPurchaseP.textContent = voucher.minPurchase;
    minPurchaseP.classList.add('col-1', 'text-truncate', 'text-center');

    usageLimitP.textContent = voucher.usageLimit;
    usageLimitP.classList.add('col-1', 'text-truncate', 'text-center');

    op.classList.add('col-2');
    op.appendChild(updateButton);
    op.appendChild(deleteButton);

    updateButton.textContent = 'Cập nhật';
    updateButton.onclick = () => redirectToUpdatePage(voucher.voucherId);
    updateButton.classList.add('btn', 'btn-primary', 'me-3');

    deleteButton.textContent = 'Xoá';
    deleteButton.onclick = () => deleteVoucher(voucher.voucherId);
    deleteButton.classList.add('btn', 'btn-danger');

    row.appendChild(codeP);
    row.appendChild(discountP);
    row.appendChild(startDateP);
    row.appendChild(endDateP);
    row.appendChild(minPurchaseP);
    row.appendChild(usageLimitP);
    row.appendChild(op);

    return row;
}

function renderVoucherList(vouchers) {
    vouchers.forEach(voucher => {
        const voucherRow = createVoucherRow(voucher);
        voucherListContainer.appendChild(voucherRow);
    });
}

async function searchVoucher(event) {
    const messageDiv = document.getElementById('message');
    const code = document.getElementById('code').value;
    if (event.key == 'Enter') {
        voucherListContainer.innerHTML = '';
        try {
            const response = await fetch(`http://localhost:8080/vouchers?code=${code}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                const vouchers = result.result;
                if (vouchers.length === 0) {
                    messageDiv.textContent = 'Không có voucher nào!';
                    return;
                }
                renderVoucherList(vouchers);
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

window.addEventListener('load', fetchAndRenderVoucherList);