async function submitAddress() {
    const messageDiv = document.getElementById('message');
    const recipientName = document.getElementById('recipientName').value;
    const recipientPhone = document.getElementById('recipientPhone').value;
    const recipientAddress = document.getElementById('recipientAddress').value;

    if (!recipientName || !recipientPhone || !recipientAddress) {
        messageDiv.textContent = 'Vui lòng điền đầy đủ thông tin!';
        return;
    }

    const data = { recipientName, recipientPhone, recipientAddress };

    try {
        const response = await fetch('http://localhost:8080/shippingAddresses', {
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
                text: 'Thêm địa chỉ nhận hàng thành công!',
            });
            window.location.href = "address-list.html";
      wqe