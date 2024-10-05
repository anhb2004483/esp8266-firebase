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

// Đọc dữ liệu từ Firebase cho biến `aaa`
const dataContainer = document.getElementById('data-container');
const dataRef = ref(database, 'aaa');

onValue(dataRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
        // Hiển thị dữ liệu lên trang web
        dataContainer.innerHTML = `<p><strong>Dữ liệu aaa:</strong> ${data}</p>`;
    } else {
        dataContainer.innerHTML = `<p>Không có dữ liệu tại đường dẫn 'aaa'</p>`;
    }
}, (error) => {
    console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
    dataContainer.innerHTML = `<p>Đã xảy ra lỗi khi lấy dữ liệu: ${error.message}</p>`;
});

// Lưu dữ liệu từ người dùng vào biến `bbb`
const inputData = document.getElementById('input-data');
const sendDataBtn = document.getElementById('send-data-btn');
const statusMessage = document.getElementById('status-message');

// Khi người dùng nhấn nút gửi dữ liệu
sendDataBtn.addEventListener('click', () => {
    const newData = inputData.value; // Lấy dữ liệu người dùng nhập vào

    if (newData) {
        // Tham chiếu đến biến `bbb` trong Firebase
        const bbbRef = ref(database, 'bbb');

        // Lưu dữ liệu mới vào Firebase
        set(bbbRef, newData)
            .then(() => {
                statusMessage.textContent = "Dữ liệu đã được gửi thành công!";
                statusMessage.style.color = "green";
                inputData.value = ""; // Xóa ô nhập liệu sau khi gửi
            })
            .catch((error) => {
                console.error("Lỗi khi gửi dữ liệu:", error);
                statusMessage.textContent = `Đã xảy ra lỗi: ${error.message}`;
                statusMessage.style.color = "red";
            });
    } else {
        statusMessage.textContent = "Vui lòng nhập dữ liệu!";
        statusMessage.style.color = "red";
    }
});
