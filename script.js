import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

const sensorDataContainer = document.getElementById('sensor-data-container');

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

                // Load Sensor Node data from Firebase
                const snRef = ref(database, 'SN');
                onValue(snRef, (snapshot) => {
                    const snData = snapshot.val();

                    // Clear previous data
                    sensorDataContainer.innerHTML = '';

                    if (snData) {
                        Object.keys(snData).forEach((key) => {
                            const sensorNode = snData[key];

                            const sensorName = sensorNode.object || 'N/A';
                            const gasValue = sensorNode.gas || 'N/A';
                            const tempValue = sensorNode.temperature || 'N/A';

                            // Display sensor data
                            const sensorDataLine = `
                                <p>
                                    <strong>Tên Sensor Node:</strong> ${sensorName} 
                                    <strong>Gas:</strong> ${gasValue} 
                                    <strong>Nhiệt độ:</strong> ${tempValue}
                                </p>`;
                            sensorDataContainer.innerHTML += sensorDataLine;
                        });
                    } else {
                        sensorDataContainer.innerHTML = `<p>Không có dữ liệu Sensor Node trong Firebase.</p>`;
                    }
                }, (error) => {
                    console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
                    sensorDataContainer.innerHTML = `<p>Đã xảy ra lỗi khi lấy dữ liệu: ${error.message}</p>`;
                });
            } else {
                // Failed login
                loginStatus.textContent = "Tên hoặc mật khẩu không đúng!";
                loginStatus.style.color = "red";
            }
        });
    });
});
