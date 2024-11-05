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

// Lấy các phần tử HTML
const submitBtn = document.getElementById('submitBtn');
const valueAInput = document.getElementById('valueA');
const messageDiv = document.getElementById('message');

// Gửi dữ liệu lên Firebase khi nhấn nút
submitBtn.addEventListener('click', () => {
    const valueA = valueAInput.value;
    if (valueA) {
        const dbRef = ref(database, 'values/valueA');
        set(dbRef, {
            value: valueA
        }).then(() => {
            messageDiv.innerText = "Giá trị A đã được gửi thành công!";
            valueAInput.value = ""; // Xóa trường nhập
        }).catch((error) => {
            messageDiv.innerText = "Có lỗi xảy ra: " + error.message;
        });
    } else {
        messageDiv.innerText = "Vui lòng nhập giá trị A.";
    }
});
