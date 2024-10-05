// script.js

// Chọn tất cả các phần tử có class 'letter'
const letters = document.querySelectorAll('.letter');

// Thêm sự kiện 'click' cho từng chữ cái
letters.forEach(letter => {
    letter.addEventListener('click', () => {
        alert(`Bạn đã nhấp vào chữ cái: ${letter.textContent}`);
    });
});
