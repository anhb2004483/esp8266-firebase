// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI8Dfptxa5q3G6_GB1KfJZjWgU0lWEiDI",
    authDomain: "espgas-d6120.firebaseapp.com",
    databaseURL: "https://espgas-d6120-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "espgas-d6120",
    storageBucket: "espgas-d6120.appspot.com",
    messagingSenderId: "577421708651",
    appId: "1:577421708651:web:cfc074f1ffb4761c45902e",
    measurementId: "G-ZRRBCE50GS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Lấy dữ liệu từ Firebase
const sensorDataContainer = document.getElementById('sensorDataContainer');
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
