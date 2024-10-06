import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration (using your updated Firebase credentials)
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

// Elements
const loginContainer = document.getElementById('login-container');
const mainContainer = document.getElementById('main-container');
const nameInput = document.getElementById('name-input');
const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');
const loginStatus = document.getElementById('login-status');

const dataContainer = document.getElementById('data-container');
const inputData = document.getElementById('input-data');
const sendDataBtn = document.getElementById('send-data-btn');
const statusMessage = document.getElementById('status-message');

// Handle login
loginBtn.addEventListener('click', () => {
    const enteredName = nameInput.value;
    const enteredPassword = passwordInput.value;

    // Reference to Firebase for name and password inside the 'user' node
    const nameRef = ref(database, 'user/name');
    const passwordRef = ref(database, 'user/password');

    // Check the stored values in Firebase
    onValue(nameRef, (nameSnapshot) => {
        onValue(passwordRef, (passwordSnapshot) => {
            const storedName = nameSnapshot.val();
            const storedPassword = passwordSnapshot.val();

            if (enteredName === storedName && enteredPassword === storedPassword) {
                // Successful login
                loginStatus.textContent = "Đăng nhập thành công!";
                loginStatus.style.color = "green";
                loginContainer.style.display = "none";
                mainContainer.style.display = "block";

                // Load data from Firebase
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
            } else {
                // Failed login
                loginStatus.textContent = "Tên hoặc mật khẩu không đúng!";
                loginStatus.style.color = "red";
            }
        });
    });
});

// Save new data to Firebase
sendDataBtn.addEventListener('click', () => {
    const newData = inputData.value;
    if (newData) {
        const bbbRef = ref(database, 'bbb');
        set(bbbRef, newData)
            .then(() => {
                statusMessage.textContent = "Dữ liệu đã được gửi thành công!";
                statusMessage.style.color = "green";
                inputData.value = ""; // Clear input
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
