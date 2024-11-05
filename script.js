// Đăng nhập và gửi giá trị a lên Firebase
loginButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const a = document.getElementById('input-a').value; // Lấy giá trị từ trường mới

  const userRef = ref(database, 'user');

  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();

    if (userData) {
      const dbUsername = userData.name;
      const dbPassword = userData.password;

      if (username === dbUsername && password === dbPassword) {
        // Gửi giá trị a lên Firebase
        const aRef = ref(database, 'values/a'); // Đường dẫn trong Firebase
        set(aRef, a)  // Hàm set để gửi giá trị a lên Firebase
          .then(() => {
            loginMessage.textContent = 'Đăng nhập thành công và giá trị a đã được gửi!';
            loginMessage.classList.add('success');
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('data-table').style.display = 'table';
          })
          .catch((error) => {
            console.error("Lỗi khi gửi giá trị a lên Firebase:", error);
            loginMessage.textContent = 'Đã xảy ra lỗi khi gửi giá trị a: ' + error.message;
            loginMessage.classList.add('error');
          });
      } else {
        loginMessage.textContent = 'Tên người dùng hoặc mật khẩu không đúng!';
        loginMessage.classList.add('error');
      }
    } else {
      loginMessage.textContent = 'Không tìm thấy dữ liệu người dùng!';
      loginMessage.classList.add('error');
    }
  }, (error) => {
    console.error("Lỗi khi đọc dữ liệu người dùng:", error);
    loginMessage.textContent = 'Đã xảy ra lỗi khi lấy dữ liệu người dùng: ' + error.message;
    loginMessage.classList.add('error');
  });
});
