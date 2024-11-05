// Import các hàm cần thiết từ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

// Tham chiếu các phần tử trong bảng
const snRefs = {
  SN1: {
    object: document.getElementById('sn1-object-data'),
    gas: document.getElementById('sn1-gas-data'),
    gasThreshold: document.getElementById('sn1-gas-threshold-data'),
    tempThreshold: document.getElementById('sn1-temp-threshold-data'),
    khancap: document.getElementById('sn1-khancap-data')
  },
  SN2: {
    object: document.getElementById('sn2-object-data'),
    gas: document.getElementById('sn2-gas-data'),
    gasThreshold: document.getElementById('sn2-gas-threshold-data'),
    tempThreshold: document.getElementById('sn2-temp-threshold-data'),
    khancap: document.getElementById('sn2-khancap-data')
  },
  SN3: {
    object: document.getElementById('sn3-object-data'),
    gas: document.getElementById('sn3-gas-data'),
    gasThreshold: document.getElementById('sn3-gas-threshold-data'),
    tempThreshold: document.getElementById('sn3-temp-threshold-data'),
    khancap: document.getElementById('sn3-khancap-data')
  },
  SN4: {
    object: document.getElementById('sn4-object-data'),
    gas: document.getElementById('sn4-gas-data'),
    gasThreshold: document.getElementById('sn4-gas-threshold-data'),
    tempThreshold: document.getElementById('sn4-temp-threshold-data'),
    khancap: document.getElementById('sn4-khancap-data')
  }
};

// Hàm lấy và hiển thị dữ liệu cho từng sensor
const fetchDataForSensor = (sensorKey, refs) => {
  onValue(ref(database, `${sensorKey}/object`), (snapshot) => {
    refs.object.textContent = snapshot.val() || 'N/A';
  });
  onValue(ref(database, `${sensorKey}/gas`), (snapshot) => {
    refs.gas.textContent = snapshot.val() || 'N/A';
  });
  onValue(ref(database, `${sensorKey}/Gas_threshold`), (snapshot) => {
    refs.gasThreshold.textContent = snapshot.val() || 'N/A';
  });
  onValue(ref(database, `${sensorKey}/Temp_threshold`), (snapshot) => {
    refs.tempThreshold.textContent = snapshot.val() || 'N/A';
  });
  onValue(ref(database, `${sensorKey}/khancap`), (snapshot) => {
    if (snapshot.exists()) {
      const khancapValue = snapshot.val();
      if (khancapValue === -1) {
        refs.khancap.textContent = 'OFF';
      } else if (khancapValue === -2) {
        refs.khancap.textContent = 'ON';
      } else {
        refs.khancap.textContent = khancapValue; 
      }
    } else {
      refs.khancap.textContent = 'N/A';
    }
  });
};

// Gọi hàm lấy dữ liệu cho từng sensor
Object.keys(snRefs).forEach(sensorKey => fetchDataForSensor(sensorKey, snRefs[sensorKey]));

// Gửi giá trị vào Firebase
const sendButton = document.getElementById('send-button');
const inputMessage = document.getElementById('input-message');

sendButton.addEventListener('click', () => {
  const valueInput = document.getElementById('value-input').value;
  
  // Cập nhật giá trị a vào Firebase
  const valueRef = ref(database, 'variable/a'); // Thay đổi đường dẫn nếu cần thiết
  set(valueRef, valueInput)
    .then(() => {
      inputMessage.textContent = 'Giá trị đã được gửi thành công!';
      inputMessage.classList.add('success');
    })
    .catch((error) => {
      console.error("Lỗi khi gửi dữ liệu:", error);
      inputMessage.textContent = 'Đã xảy ra lỗi khi gửi dữ liệu: ' + error.message;
      inputMessage.classList.add('error');
    });
});
