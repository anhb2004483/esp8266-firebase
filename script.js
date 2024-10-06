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

// Đọc dữ liệu từ Firebase cho tên và mật khẩu
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const loginStatus = document.getElementById('login-status');
const loginContainer = document.getElementById('login-container');
const mainContent = document.getElementById('main-content');

// Xử lý đăng nhập
loginBtn.addEventListener('click', () => {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // Tham chiếu đến biến `name` và `password` trong Firebase
    const nameRef = ref(database, 'name');
    const passwordRef = ref(database, 'password');

    // Đọc giá trị `name` và `password` từ Firebase
    onValue(nameRef, (snapshot) => {
        const storedUsername = snapshot.val();
        if (storedUsername === enteredUsername) {
            onValue(passwordRef, (snapshot) => {
                const storedPassword = snapshot.val();
                if (storedPassword === enteredPassword) {
                    // Đăng nhập thành công
                    loginStatus.textContent = "Đăng nhập thành công!";
                    loginStatus.style.color = "green";
                    loginContainer.style.display = "none"; // Ẩn form đăng nhập
                    mainContent.style.display = "block";   // Hiển thị nội dung chính
                } else {
                    loginStatus.textContent = "Sai mật khẩu!";
                    loginStatus.style.color = "red";
                }
            });
        } else {
            loginStatus.textContent = "Tên người dùng không đúng!";
            loginStatus.style.color = "red";
        }
    });
});

// Đọc và hiển thị dữ liệu 'aaa' khi đăng nhập thành công
const dataContainer = document.getElementById('data-container');
const dataRef = ref(database, 'aaa');

onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
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

sendDataBtn.addEventListener('click', () => {
    const newData = inputData.value;
    if (newData) {
        const bbbRef = ref(database, 'bbb');
        set(bbbRef, newData)
            .then(() => {
                statusMessage.textContent = "Dữ liệu đã được gửi thành công!";
                statusMessage.style.color = "green";
                inputData.value = "";
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
