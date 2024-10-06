// Import các hàm cần thiết từ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

// Hàm để cập nhật dữ liệu cho sensor
const updateSensorData = (sensor) => {
    const gasThreshold = document.getElementById(`${sensor.toLowerCase()}-gas-threshold`).value;
    const tempThreshold = document.getElementById(`${sensor.toLowerCase()}-temp-threshold`).value;
    const khancap = document.getElementById(`${sensor.toLowerCase()}-khancap`).checked;

    if (gasThreshold && tempThreshold) {
        // Cập nhật Gas Threshold và Temp Threshold cho sensor tương ứng
        set(ref(database, `${sensor}/Gas_threshold`), parseInt(gasThreshold));
        set(ref(database, `${sensor}/Temp_threshold`), parseInt(tempThreshold));
        set(ref(database, `${sensor}/khancap`), khancap);
        alert(`Đã cập nhật dữ liệu cho ${sensor}`);
    } else {
        alert('Vui lòng điền đủ thông tin!');
    }
};

// Hàm để tải dữ liệu từ Firebase và hiển thị lên form
const loadSensorData = (sensor) => {
    const gasRef = ref(database, `${sensor}/Gas_threshold`);
    const tempRef = ref(database, `${sensor}/Temp_threshold`);
    const khancapRef = ref(database, `${sensor}/khancap`);

    // Hiển thị dữ liệu lên các input
    onValue(gasRef, (snapshot) => {
        document.getElementById(`${sensor.toLowerCase()}-gas-threshold`).value = snapshot.val() || '';
    });

    onValue(tempRef, (snapshot) => {
        document.getElementById(`${sensor.toLowerCase()}-temp-threshold`).value = snapshot.val() || '';
    });

    onValue(khancapRef, (snapshot) => {
        document.getElementById(`${sensor.toLowerCase()}-khancap`).checked = snapshot.val() || false;
    });
};

// Tải dữ liệu ban đầu khi trang được load
document.addEventListener('DOMContentLoaded', () => {
    loadSensorData('SN1');
    loadSensorData('SN2');
    // Load các sensor khác tương tự
});
