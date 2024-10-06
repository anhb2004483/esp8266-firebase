// Lấy dữ liệu từ Firebase sau khi người dùng đăng nhập thành công
const snRef = ref(database, 'SN1'); // Tham chiếu đến 'SN1'

onValue(snRef, (snapshot) => {
    const snData = snapshot.val();

    // Clear previous data
    sensorDataContainer.innerHTML = '';

    if (snData) {
        // Lấy các giá trị từ SN1
        const sensorName = snData.SN || 'N/A';
        const gasValue = snData.gas || 'N/A';
        const objectValue = snData.object || 'N/A'; // Nếu bạn cũng muốn lấy giá trị object

        // Hiển thị dữ liệu cảm biến
        const sensorDataLine = `
            <p>
                <strong>Tên Sensor Node:</strong> ${sensorName} 
                <strong>Gas:</strong> ${gasValue} 
                <strong>Object:</strong> ${objectValue}
            </p>`;
        sensorDataContainer.innerHTML = sensorDataLine;
    } else {
        sensorDataContainer.innerHTML = `<p>Không có dữ liệu Sensor Node trong Firebase.</p>`;
    }
}, (error) => {
    console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
    sensorDataContainer.innerHTML = `<p>Đã xảy ra lỗi khi lấy dữ liệu: ${error.message}</p>`;
});
