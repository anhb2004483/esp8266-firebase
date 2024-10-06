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

// Hàm để đọc và hiển thị dữ liệu từ Firebase
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

// Hàm để cập nhật dữ liệu lên Firebase
const updateThreshold = (sensorRef) => {
    const gasThreshold = document.getElementById(`${sensorRef.toLowerCase()}-edit-gas-threshold`).value;
    const tempThreshold = document.getElementById(`${sensorRef.toLowerCase()}-edit-temp-threshold`).value;
    const khancap = document.getElementById(`${sensorRef.toLowerCase()}-edit-khancap`).checked;

    if (gasThreshold && tempThreshold) {
        set(ref(database, `${sensorRef}/Gas_threshold`), parseInt(gasThreshold));
        set(ref(database, `${sensorRef}/Temp_threshold`), parseInt(tempThreshold));
        set(ref(database, `${sensorRef}/khancap`), khancap);
        alert(`Đã cập nhật dữ liệu cho ${sensorRef}`);
    } else {
        alert('Vui lòng điền đủ thông tin!');
    }
};

// Đăng nhập
const loginButton = document.getElementById('login-button');
const loginMessage = document.getElementById('login-message');

loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Tham chiếu đến tên người dùng và mật khẩu trong Firebase
    const userRef = ref(database, 'user');

    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();

        if (userData) {
            const dbUsername = userData.name;
            const dbPassword = userData.password;

            if (username === dbUsername && password === dbPassword) {
                loginMessage.textContent = 'Đăng nhập thành công!';
                document.getElementById('login-container').style.display = 'none';
                document.getElementById('data-table').style.display = 'table';
            } else {
                loginMessage.textContent = 'Tên người dùng hoặc mật khẩu sai!';
            }
        }
    });
});

// Cập nhật dữ liệu từng sensor
document.addEventListener('DOMContentLoaded', () => {
    fetchDataForSensor('SN1', {
        object: document.getElementById('sn1-object-data'),
        gas: document.getElementById('sn1-gas-data'),
        gasThreshold: document.getElementById('sn1-gas-threshold-data'),
        tempThreshold: document.getElementById('sn1-temp-threshold-data'),
        khancap: document.getElementById('sn1-khancap-data')
    });
    fetchDataForSensor('SN2', {
        object: document.getElementById('sn2-object-data'),
        gas: document.getElementById('sn2-gas-data'),
        gasThreshold: document.getElementById('sn2-gas-threshold-data'),
        tempThreshold: document.getElementById('sn2-temp-threshold-data'),
        khancap: document.getElementById('sn2-khancap-data')
    });
    fetchDataForSensor('SN3', {
        object: document.getElementById('sn3-object-data'),
        gas: document.getElementById('sn3-gas-data'),
        gasThreshold: document.getElementById('sn3-gas-threshold-data'),
        tempThreshold: document.getElementById('sn3-temp-threshold-data'),
        khancap: document.getElementById('sn3-khancap-data')
    });
    fetchDataForSensor('SN4', {
        object: document.getElementById('sn4-object-data'),
        gas: document.getElementById('sn4-gas-data'),
        gasThreshold: document.getElementById('sn4-gas-threshold-data'),
        tempThreshold: document.getElementById('sn4-temp-threshold-data'),
        khancap: document.getElementById('sn4-khancap-data')
    });
});
