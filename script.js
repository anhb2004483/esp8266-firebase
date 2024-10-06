import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDXPAZ7Wejg29HJWlGk4HVYCSb-tQC_uOs",
    authDomain: "espp-d81e2.firebaseapp.com",
    databaseURL: "https://espp-d81e2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "espp-d81e2",
    storageBucket: "espp-d81e2.appspot.com",
    messagingSenderId: "1031596671832",
    appId: "1:1031596671832:web:827366acdcf47222ae1b2d",
    measurementId: "G-L7ZYC7TE7W"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Tham chiếu các phần tử trong bảng
const snRefs = {
    SN1: {
        object: document.getElementById('sn1-object-data'),
        gas: document.getElementById('sn1-gas-data'),
        gasThreshold: document.getElementById('sn1-gas-threshold-data'),
        tempThreshold: document.getElementById('sn1-temp-threshold-data'),
        khancap: document.getElementById('sn1-khancap-data')
    },
    SN2: {
        object: document.getElementById('sn2-object-data'),
        gas: document.getElementById('sn2-gas-data'),
        gasThreshold: document.getElementById('sn2-gas-threshold-data'),
        tempThreshold: document.getElementById('sn2-temp-threshold-data'),
        khancap: document.getElementById('sn2-khancap-data')
    },
    SN3: {
        object: document.getElementById('sn3-object-data'),
        gas: document.getElementById('sn3-gas-data'),
        gasThreshold: document.getElementById('sn3-gas-threshold-data'),
        tempThreshold: document.getElementById('sn3-temp-threshold-data'),
        khancap: document.getElementById('sn3-khancap-data')
    },
    SN4: {
        object: document.getElementById('sn4-object-data'),
        gas: document.getElementById('sn4-gas-data'),
        gasThreshold: document.getElementById('sn4-gas-threshold-data'),
        tempThreshold: document.getElementById('sn4-temp-threshold-data'),
        khancap: document.getElementById('sn4-khancap-data')
    }
};

// Hàm để đọc và hiển thị dữ liệu
const fetchDataForSensor = (sensorRef, refs) => {
    onValue(ref(database, `${sensorRef}/object`), (snapshot) => {
        refs.object.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/gas`), (snapshot) => {
        refs.gas.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/Gas_threshold`), (snapshot) => {
        refs.gasThreshold.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/Temp_threshold`), (snapshot) => {
        refs.tempThreshold.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/khancap`), (snapshot) => {
        refs.khancap.textContent = snapshot.val() || 'N/A';
    });
};

// Gọi hàm để lấy dữ liệu cho từng sensor
fetchDataForSensor('SN1', snRefs.SN1);
fetchDataForSensor('SN2', snRefs.SN2);
fetchDataForSensor('SN3', snRefs.SN3);
fetchDataForSensor('SN4', snRefs.SN4);

// Xử lý sự kiện cho nút chỉnh sửa
const editButtons = document.querySelectorAll('.edit-button');
let currentSensor = null;

editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        currentSensor = event.target.getAttribute('data-sensor');
        // Hiển thị modal chỉnh sửa
        document.getElementById('edit-modal').style.display = 'block';

        // Lấy giá trị hiện tại từ Firebase
        const sensorData = snRefs[currentSensor];
        document.getElementById('gas-threshold').value = sensorData.gasThreshold.textContent;
        document.getElementById('temp-threshold').value = sensorData.tempThreshold.textContent;
        document.getElementById('khancap').value = sensorData.khancap.textContent === 'true' ? 'true' : 'false';
    });
});

// Lưu thay đổi
document.getElementById('save-button').addEventListener('click', () => {
    const gasThreshold = document.getElementById('gas-threshold').value;
    const tempThreshold = document.getElementById('temp-threshold').value;
    const khancap = document.getElementById('khancap').value === 'true';

    // Cập nhật dữ liệu lên Firebase
    set(ref(database, `${currentSensor}/Gas_threshold`), gasThreshold);
    set(ref(database, `${currentSensor}/Temp_threshold`), tempThreshold);
    set(ref(database, `${currentSensor}/khancap`), khancap);

    // Đóng modal
    document.getElementById('edit-modal').style.display = 'none';
});

// Đóng modal
document.getElementById('close-button').addEventListener('click', () => {
    document.getElementById('edit-modal').style.display = 'none';
});
