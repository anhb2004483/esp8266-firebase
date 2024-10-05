// Cấu hình Firebase - thay đổi các giá trị dưới đây bằng thông tin Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyDXPAZ7Wejg29HJWlGk4HVYCSb-tQC_uOs",
    authDomain: "espp-d81e2.firebaseapp.com",
    databaseURL: "https://espp-d81e2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "espp-d81e2",
    storageBucket: "espp-d81e2.appspot.com",
    messagingSenderId: "1031596671832",
    appId: "1:1031596671832:web:827366acdcf47222ae1b2d"
};

// Khởi tạo Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Đọc dữ liệu từ Firebase
const dataContainer = document.getElementById('aaa');

// Thay đổi đường dẫn 'exampleData' để phù hợp với dữ liệu của bạn
firebase.database().ref('https://espp-d81e2-default-rtdb.asia-southeast1.firebasedatabase.app/quan1').on('value', (snapshot) => {
    const data = snapshot.val();

    // Hiển thị dữ liệu lên trang web
    dataContainer.innerHTML = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            dataContainer.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
    }
}, (error) => {
    console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
});
