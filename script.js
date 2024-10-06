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
const snRefs = {
    SN1: {
        gasThreshold: document.getElementById('sn1-gas-threshold-data'),
        tempThreshold: document.getElementById('sn1-temp-threshold-data'),
        khancap: document.getElementById('sn1-khancap-data'),
        gasInput: document.getElementById('sn1-gas-threshold-input'),
        tempInput: document.getElementById('sn1-temp-threshold-input'),
        khancapInput: document.getElementById('sn1-khancap-input'),
        updateButton: document.querySelector('button[data-sensor="SN1"]')
    },
    SN2: {
        gasThreshold: document.getElementById('sn2-gas-threshold-data'),
        tempThreshold: document.getElementById('sn2-temp-threshold-data'),
        khancap: document.getElementById('sn2-khancap-data'),
        gasInput: document.getElementById('sn2-gas-threshold-input'),
        tempInput: document.getElementById('sn2-temp-threshold-input'),
        khancapInput: document.getElementById('sn2-khancap-input'),
        updateButton: document.querySelector('button[data-sensor="SN2"]')
    },
    SN3: {
        gasThreshold: document.getElementById('sn3-gas-threshold-data'),
        tempThreshold: document.getElementById('sn3-temp-threshold-data'),
        khancap: document.getElementById('sn3-khancap-data'),
        gasInput: document.getElementById('sn3-gas-threshold-input'),
        tempInput: document.getElementById('sn3-temp-threshold-input'),
        khancapInput: document.getElementById('sn3-khancap-input'),
        updateButton: document.querySelector('button[data-sensor="SN3"]')
    },
    SN4: {
        gasThreshold: document.getElementById('sn4-gas-threshold-data'),
        tempThreshold: document.getElementById('sn4-temp-threshold-data'),
        khancap: document.getElementById('sn4-khancap-data'),
        gasInput: document.getElementById('sn4-gas-threshold-input'),
        tempInput: document.getElementById('sn4-temp-threshold-input'),
        khancapInput: document.getElementById('sn4-khancap-input'),
        updateButton: document.querySelector('button[data-sensor="SN4"]')
    }
};

// Hàm cập nhật dữ liệu
function updateSensorData(sensor) {
    const gasThresholdValue = snRefs[sensor].gasInput.value;
    const tempThresholdValue = snRefs[sensor].tempInput.value;
    const khancapValue = snRefs[sensor].khancapInput.value;

    set(ref(database, sensor), {
        gasThreshold: gasThresholdValue,
        tempThreshold: tempThresholdValue,
        khancap: khancapValue
    }).then(() => {
        alert(`${sensor} đã được cập nhật thành công.`);
    }).catch((error) => {
        alert(`Lỗi: ${error}`);
    });
}

// Thêm sự kiện cho nút cập nhật
for (const sensor in snRefs) {
    snRefs[sensor].updateButton.addEventListener('click', () => {
        updateSensorData(sensor);
    });
}

// Lấy dữ liệu từ Firebase
onValue(ref(database), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        for (const sensor in snRefs) {
            if (data[sensor]) {
                snRefs[sensor].gasThreshold.innerText = data[sensor].gasThreshold || 'Chưa có';
                snRefs[sensor].tempThreshold.innerText = data[sensor].tempThreshold || 'Chưa có';
                snRefs[sensor].khancap.innerText = data[sensor].khancap !== undefined ? data[sensor].khancap : 'Chưa có';
                snRefs[sensor].tempInput.value = data[sensor].tempThreshold || '';
                snRefs[sensor].gasInput.value = data[sensor].gasThreshold || '';
                snRefs[sensor].khancapInput.value = data[sensor].khancap !== undefined ? data[sensor].khancap : 'true';
            }
        }
        document.getElementById('data-table').style.display = 'block';
    }
});
