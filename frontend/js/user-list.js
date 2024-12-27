const userListContainer = document.getElementById('user-list');

async function fetchAndRenderUserList() {
    const messageDiv = document.getElementById('message');
    userListContainer.innerHTML = '';
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (result.code === 1000) {
            const users = result.result;
            if (users.length === 0) {
                messageDiv.textContent = 'Không có user nào!';
                return;
            }
            renderUserList(users); // Gọi hàm hiển thị danh sách
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

function createUserRow(user) {
    const row = document.createElement('div');
    const usernameP = document.createElement('p');
    const firstNameP = document.createElement('p');
    const lastNameP = document.createElement('p');
    const emailP = document.createElement('p');
    const phoneP = document.createElement('p');
    const enabledP = document.createElement('p');
    const op = document.createElement('div');
    const disableButton = document.createElement('button');

    row.classList.add('row', 'mb-3', 'p-3', 'd-flex', 'align-items-center', 'border-bottom', 'border-secondary', 'text-center');

    usernameP.textContent = user.username;
    usernameP.classList.add('col-2');

    firstNameP.textContent = user.firstName;
    firstNameP.classList.add('col-2');

    lastNameP.textContent = user.lastName;
    lastNameP.classList.add('col-2');

    emailP.textContent = user.email;
    emailP.classList.add('col-2');

    phoneP.textContent = user.phone;
    phoneP.classList.add('col-2');

    enabledP.textContent = user.enabled;
    enabledP.classList.add('col-1');

    op.classList.add('col-1');
    op.appendChild(disableButton);

    disableButton.textContent = 'Vô hiệu hoá';
    disableButton.onclick = () => disableUser(user.userId);
    disableButton.classList.add('btn', 'btn-danger');

    row.appendChild(usernameP);
    row.appendChild(firstNameP);
    row.appendChild(lastNameP);
    row.appendChild(emailP);
    row.appendChild(phoneP);
    row.appendChild(enabledP);
    row.appendChild(op);

    return row;
}

function renderUserList(users) {
    users.forEach(user => {
        const userRow = createUserRow(user);
        userListContainer.appendChild(userRow);
    });
}

async function searchUser(event) {
    const messageDiv = document.getElementById('message');
    const username = document.getElementById('username').value;
    if (event.key == 'Enter') {
        userListContainer.innerHTML = '';
        try {
            const response = await fetch(`http://localhost:8080/users?username=${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                const users = result.result;
                if (users.length === 0) {
                    messageDiv.textContent = 'Không có user nào!';
                    return;
                }
                renderUserList(users);
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

async function disableUser(userId) {
    const messageDiv = document.getElementById('message');
    const confirmDelete = await Swal.fire({
        title: 'Xác nhận xoá',
        text: `Bạn có chắc muốn vô hiệu hoá người dùng có ID: ${userId}?`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
    });
    if (confirmDelete.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.code === 1000) {
                Swal.fire({
                    title: 'Thông báo',
                    text: `Vô hiệu hoá người dùng thành công!`,
                    icon: 'success',
                    showConfirmButton: true,
                });
                fetchAndRenderUserList();
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

window.addEventListener('load', fetchAndRenderUserList);