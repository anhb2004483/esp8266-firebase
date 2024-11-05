// Import các hàm cần thiết từ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

// Cấu hình Firebase
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

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Gửi giá trị vào Firebase
const sendButton = document.getElementById('send-button');
const inputMessage = document.getElementById('input-message');

sendButton.addEventListener('click', () => {
  const valueInput = document.getElementById('value-input').value;
  const numericValue = Number(valueInput); // Chuyển đổi giá trị nhập thành số

  // Kiểm tra xem giá trị có phải là số không
  if (isNaN(numericValue)) {
    inputMessage.textContent = 'Vui lòng nhập một giá trị số hợp lệ!';
    inputMessage.classList.add('error');
    inputMessage.classList.remove('success'); // Bỏ lớp thành công nếu có
    return; // Dừng thực hiện nếu không phải số
  }

  // Cập nhật giá trị a vào Firebase
  const valueRef = ref(database, 'SN1/khancap'); // Thay đổi đường dẫn nếu cần thiết
  set(valueRef, numericValue)
    .then(() => {
      inputMessage.textContent = 'Giá trị đã được gửi thành công!';
      inputMessage.classList.add('success');
      inputMessage.classList.remove('error'); // Bỏ lớp lỗi nếu có
    })
    .catch((error) => {
      console.error("Lỗi khi gửi dữ liệu:", error);
      inputMessage.textContent = 'Đã xảy ra lỗi khi gửi dữ liệu: ' + error.message;
      inputMessage.classList.add('error');
      inputMessage.classList.remove('success'); // Bỏ lớp thành công nếu có
    });
});
