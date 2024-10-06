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
const sn1Refs = {
    object: document.getElementById('sn1-object-data'),
    gas: document.getElementById('sn1-gas-data'),
    gasThreshold: document.getElementById('sn1-gas-threshold-data'),
    khancap: document.getElementById('sn1-khancap-data')
};
const sn2Refs = {
    object: document.getElementById('sn2-object-data'),
    gas: document.getElementById('sn2-gas-data'),
    gasThreshold: document.getElementById('sn2-gas-threshold-data'),
    khancap: document.getElementById('sn2-khancap-data')
};
const sn3Refs = {
    object: document.getElementById('sn3-object-data'),
    gas: document.getElementById('sn3-gas-data'),
    gasThreshold: document.getElementById('sn3-gas-threshold-data'),
    khancap: document.getElementById('sn3-khancap-data')
};
const sn4Refs = {
    object: document.getElementById('sn4-object-data'),
    gas: document.getElementById('sn4-gas-data'),
    gasThreshold: document.getElementById('sn4-gas-threshold-data'),
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
        refs.gasThreshold.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/khancap`), (snapshot) => {
        refs.khancap.textContent = snapshot.val() || 'N/A';
    });
};

// Gọi hàm để lấy dữ liệu cho từng sensor
fetchDataForSensor('SN1', sn1Refs);
fetchDataForSensor('SN2', sn2Refs);
fetchDataForSensor('SN3', sn3Refs);
fetchDataForSensor('SN4', sn4Refs);
