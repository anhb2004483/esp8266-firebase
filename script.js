// Import các hàm cần thiết từ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
const objectData = document.getElementById('object-data');
const gasData = document.getElementById('gas-data');
const gasThresholdData = document.getElementById('gas-threshold-data');
const khancapData = document.getElementById('khancap-data');

// Tham chiếu đến các biến trong Firebase
const objectRef = ref(database, 'SN1/object');
const gasRef = ref(database, 'SN1/gas');
const gasThresholdRef = ref(database, 'SN1/Gas_threshold');
const khancapRef = ref(database, 'SN1/khancap');

// Hàm để lấy và hiển thị dữ liệu từ Firebase
const fetchTableData = () => {
    // Đọc dữ liệu từ SN1/object
    onValue(objectRef, (snapshot) => {
        objectData.textContent = snapshot.val() || 'N/A';
    });

    // Đọc dữ liệu từ SN1/gas
    onValue(gasRef, (snapshot) => {
        gasData.textContent = snapshot.val() || 'N/A';
    });

    // Đọc dữ liệu từ SN1/Gas_threshold
    onValue(gasThresholdRef, (snapshot) => {
        gasThresholdData.textContent = snapshot.val() || 'N/A';
    });

    // Đọc dữ liệu từ SN1/khancap
    onValue(khancapRef, (snapshot) => {
        khancapData.textContent = snapshot.val() || 'N/A';
    });
};

// Gọi hàm để lấy dữ liệu và cập nhật bảng
fetchTableData();
