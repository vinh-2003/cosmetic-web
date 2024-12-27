const imageFileInput = document.getElementById('imageFile');
const imagePreview = document.getElementById('image-preview');

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

async function submitBanner() {
    const link = document.getElementById('link').value;
    const imageFile = document.getElementById('imageFile').files[0];
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const messageDiv = document.getElementById('message'); // Sử dụng messageDiv cho các thông báo khác

    // Kiểm tra xem người dùng đã điền đầy đủ thông tin chưa
    if (!link || !imageFile || !startDate || !endDate) {
        messageDiv.textContent = 'Vui lòng điền đầy đủ thông tin và chọn hình ảnh!';
        return;
    }

    const formData = new FormData();
    formData.append('bannerData', new Blob([JSON.stringify({ link, startDate, endDate })], { type: 'application/json' }));
    formData.append('imageFile', imageFile);

    try {
        const response = await fetch('http://localhost:8080/banners', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        const result = await response.json();

        if (result.code === 1000) {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Thêm banner thành công!',
            }).then(() => {
                window.location.href = "banner-list.html"; // Điều hướng đến danh sách banner
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
