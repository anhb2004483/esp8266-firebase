// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2bRIDe_WmC4PrqNw0Pc3NmpB8RN49GlA",
    authDomain: "lvtn-1daf8.firebaseapp.com",
    databaseURL: "https://lvtn-1daf8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lvtn-1daf8",
    storageBucket: "lvtn-1daf8.firebasestorage.app",
    messagingSenderId: "714911677725",
    appId: "1:714911677725:web:077d406bd928413b3475f4",
    measurementId: "G-4QZ1WRMGW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Handle form submission
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const bbbValue = document.getElementById('bbb').value;

    // Gửi dữ liệu vào Firebase
    set(ref(database, 'SN1/bbb'), {
        value: bbbValue
    }).then(() => {
        document.getElementById('message').textContent = 'Dữ liệu đã được gửi thành công!';
        document.getElementById('dataForm').reset();
    }).catch((error) => {
        document.getElementById('message').textContent = 'Có lỗi xảy ra: ' + error.message;
    });
});
