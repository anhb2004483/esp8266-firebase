// Import các hàm cần thiết từ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
        gasThreshold: document.getElementById('sn1-gas-threshold'),
        tempThreshold: document.getElementById('sn1-temp-threshold'),
        khancap: document.getElementById('sn1-khancap'),
    },
    SN2: {
        object: document.getElementById('sn2-object-data'),
        gas: document.getElementById('sn2-gas-data'),
        gasThreshold: document.getElementById('sn2-gas-threshold'),
        tempThreshold: document.getElementById('sn2-temp-threshold'),
        khancap: document.getElementById('sn2-khancap'),
    },
    SN3: {
        object: document.getElementById('sn3-object-data'),
        gas: document.getElementById('sn3-gas-data'),
        gasThreshold: document.getElementById('sn3-gas-threshold'),
        tempThreshold: document.getElementById('sn3-temp-threshold'),
        khancap: document.getElementById('sn3-khancap'),
    },
    SN4: {
        object: document.getElementById('sn4-object-data'),
        gas: document.getElementById('sn4-gas-data'),
        gasThreshold: document.getElementById('sn4-gas-threshold'),
        tempThreshold: document.getElementById('sn4-temp-threshold'),
        khancap: document.getElementById('sn4-khancap'),
    }
};

// Hàm để đọc và hiển thị dữ liệu
const fetchDataForSensor = (sensorRef) => {
    onValue(ref(database, `${sensorRef}/object`), (snapshot) => {
        snRefs[sensorRef].object.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/gas`), (snapshot) => {
        snRefs[sensorRef].gas.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/Gas_threshold`), (snapshot) => {
        snRefs[sensorRef].gasThreshold.value = snapshot.val() || '';
    });
    onValue(ref(database, `${sensorRef}/Temp_threshold`), (snapshot) => {
        snRefs[sensorRef].tempThreshold.value = snapshot.val() || '';
    });
    onValue(ref(database, `${sensorRef}/khancap`), (snapshot) => {
        snRefs[sensorRef].khancap.checked = snapshot.val() === true;
    });
};

// Gọi hàm để lấy dữ liệu cho từng sensor
['SN1', 'SN2', 'SN3', 'SN4'].forEach(fetchDataForSensor);

// Hàm cập nhật giá trị
const updateSensor = (sensor) => {
    const gasThresholdValue = snRefs[sensor].gasThreshold.value;
    const tempThresholdValue = snRefs[sensor].tempThreshold.value;
    const khancapValue = snRefs[sensor].khancap.checked;

    update(ref(database, sensor), {
        Gas_threshold: gasThresholdValue,
        Temp_threshold: tempThresholdValue,
        khancap: khancapValue
    })
    .then(() => {
        alert(`${sensor} đã được cập nhật thành công!`);
    })
    .catch((error) => {
        alert(`Đã xảy ra lỗi: ${error}`);
    });
};

// Hàm đăng nhập
document.getElementById('login-button').onclick = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kiểm tra thông tin đăng nhập
    const validUsername = "user/name"; // Thay đổi với giá trị từ Firebase
    const validPassword = "user/password"; // Thay đổi với giá trị từ Firebase

    if (username === validUsername && password === validPassword) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('data-table').style.display = 'table';
    } else {
        document.getElementById('login-message').textContent = "Tên đăng nhập hoặc mật khẩu không đúng.";
    }
};
