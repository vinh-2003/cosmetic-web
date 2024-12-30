const orderId = new URLSearchParams(window.location.search).get('orderId');
const addressListContainer = document.getElementById('addressList');
const submitAddress = document.getElementById('submitAddress');

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
    const radioDiv = document.createElement('div');
    const radioInput = document.createElement('input');
    const addressDiv = document.createElement('div');
    const nameP = document.createElement('p');
    const phoneP = document.createElement('p');
    const addressP = document.createElement('p');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'align-items-center', 'border-top', 'border-secondary');

    radioDiv.appendChild(radioInput);
    radioDiv.classList.add('col-1', 'text-center');

    radioInput.type = 'radio';
    radioInput.classList.add('form-check-input');
    radioInput.name = 'shippingAddress';
    radioInput.value = shippingAddress.shippingAddressId;

    addressDiv.appendChild(nameP);
    addressDiv.appendChild(phoneP);
    addressDiv.appendChild(addressP);
    addressDiv.classList.add('col-6');

    nameP.textContent = shippingAddress.recipientName;
    nameP.classList.add('fw-bold');

    phoneP.textContent = shippingAddress.recipientPhone;

    addressP.textContent = shippingAddress.recipientAddress;

    row.appendChild(radioDiv);
    row.appendChild(addressDiv);

    return row;
}

submitAddress.addEventListener('click', confirmAddress);

async function confirmAddress() {
    const messageDiv = document.getElementById('message');
    const selectedRadio = document.querySelector('input[name="shippingAddress"]:checked');

    if (selectedRadio) {
        try {
            const shippingAddressId = selectedRadio.value;
            const response = await fetch(`http://localhost:8080/orders/${orderId}?shippingAddressId=${shippingAddressId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                await Swal.fire({
                    title: "Thông báo",
                    text: "Thay đổi địa chỉ nhận hàng thành công!",
                    icon: 'success',
                });
                window.location.href = 'order-preview.html';
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
    } else {
        window.location.href = 'order-preview.html';
    }
}

window.addEventListener('load', fetchAndRenderAddressList)