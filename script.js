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
  const khancapValue = Number(document.getElementById('khancap-input').value);
  const gasThresholdValue = Number(document.getElementById('gas-threshold-input').value);
  const tempThresholdValue = Number(document.getElementById('temp-threshold-input').value);

  // Kiểm tra xem các giá trị có phải là số không
  if (isNaN(khancapValue) || isNaN(gasThresholdValue) || isNaN(tempThresholdValue)) {
    inputMessage.textContent = 'Vui lòng nhập các giá trị số hợp lệ!';
    inputMessage.classList.add('error');
    inputMessage.classList.remove('success'); // Bỏ lớp thành công nếu có
    return; // Dừng thực hiện nếu không phải số
  }

  // Cập nhật giá trị vào Firebase
  const khancapRef = ref(database, 'SN1/khancap');
  const gasThresholdRef = ref(database, 'SN1/Gas_threshold');
  const tempThresholdRef = ref(database, 'SN1/Temp_threshold');

  // Gửi từng giá trị lên Firebase
  Promise.all([
    set(khancapRef, khancapValue),
    set(gasThresholdRef, gasThresholdValue),
    set(tempThresholdRef, tempThresholdValue)
  ])
  .then(() => {
    inputMessage.textContent = 'Giá trị đã được gửi thành công!';
    inputMessage.classList.add('success');
    inputMessage.classList.remove('error'); // Bỏ lớp lỗi nếu có

    // Xóa giá trị đã nhập
    document.getElementById('khancap-input').value = '';
    document.getElementById('gas-threshold-input').value = '';
    document.getElementById('temp-threshold-input').value = '';

    // Làm cho thông báo biến mất sau 2 giây
    setTimeout(() => {
      inputMessage.textContent = '';
      inputMessage.classList.remove('success');
    }, 1000);
  })
  .catch((error) => {
    console.error("Lỗi khi gửi dữ liệu:", error);
    inputMessage.textContent = 'Đã xảy ra lỗi khi gửi dữ liệu: ' + error.message;
    inputMessage.classList.add('error');
    inputMessage.classList.remove('success'); // Bỏ lớp thành công nếu có
  });
});
