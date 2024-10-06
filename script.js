// Import các hàm cần thiết từ SDK
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
const sn1Refs = {
    object: document.getElementById('sn1-object-data'),
    gas: document.getElementById('sn1-gas-data'),
    gasThresholdInput: document.getElementById('sn1-gas-threshold-input'),
    tempThresholdInput: document.getElementById('sn1-temp-threshold-input'),
    khancap: document.getElementById('sn1-khancap-data')
};
const sn2Refs = {
    object: document.getElementById('sn2-object-data'),
    gas: document.getElementById('sn2-gas-data'),
    gasThresholdInput: document.getElementById('sn2-gas-threshold-input'),
    tempThresholdInput: document.getElementById('sn2-temp-threshold-input'),
    khancap: document.getElementById('sn2-khancap-data')
};
const sn3Refs = {
    object: document.getElementById('sn3-object-data'),
    gas: document.getElementById('sn3-gas-data'),
    gasThresholdInput: document.getElementById('sn3-gas-threshold-input'),
    tempThresholdInput: document.getElementById('sn3-temp-threshold-input'),
    khancap: document.getElementById('sn3-khancap-data')
};
const sn4Refs = {
    object: document.getElementById('sn4-object-data'),
    gas: document.getElementById('sn4-gas-data'),
    gasThresholdInput: document.getElementById('sn4-gas-threshold-input'),
    tempThresholdInput: document.getElementById('sn4-temp-threshold-input'),
    khancap: document.getElementById('sn4-khancap-data')
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
        refs.gasThresholdInput.value = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/Temp_threshold`), (snapshot) => {
        refs.tempThresholdInput.value = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/khancap`), (snapshot) => {
        refs.khancap.textContent = snapshot.val() ? 'true' : 'false';
    });
};

// Gọi hàm để lấy dữ liệu cho từng cảm biến
fetchDataForSensor('SN1', sn1Refs);
fetchDataForSensor('SN2', sn2Refs);
fetchDataForSensor('SN3', sn3Refs);
fetchDataForSensor('SN4', sn4Refs);

// Đăng nhập
const loginButton = document.getElementById('login-button');
const loginMessage = document.getElementById('login-message');

loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kiểm tra thông tin đăng nhập
    onValue(ref(database, 'user/name'), (snapshot) => {
        const storedUsername = snapshot.val();
        onValue(ref(database, 'user/password'), (snapshot) => {
            const storedPassword = snapshot.val();
            if (username === storedUsername && password === storedPassword) {
                // Ẩn phần đăng nhập
                document.getElementById('login-container').style.display = 'none';
                // Hiện bảng dữ liệu
                document.getElementById('data-table').style.display = 'table';
                loginMessage.textContent = '';
            } else {
                loginMessage.textContent = 'Tên người dùng hoặc mật khẩu không đúng!';
            }
        });
    });
});

// Chỉnh sửa giá trị và gửi lên Firebase
const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sensor = button.dataset.sensor;

        const gasThreshold = document.getElementById(`${sensor.toLowerCase()}-gas-threshold-input`).value;
        const tempThreshold = document.getElementById(`${sensor.toLowerCase()}-temp-threshold-input`).value;
        const khancap = document.getElementById(`${sensor.toLowerCase()}-khancap-data`).textContent === 'true';

        // Gửi giá trị lên Firebase
        set(ref(database, `${sensor}/Gas_threshold`), gasThreshold);
        set(ref(database, `${sensor}/Temp_threshold`), tempThreshold);
        set(ref(database, `${sensor}/khancap`), khancap);
        
        alert(`${sensor} đã được cập nhật!`);
    });
});
