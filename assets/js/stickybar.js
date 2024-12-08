// Lấy phần tử navbar
const navbar = document.querySelector('.navbar');

// Lắng nghe sự kiện cuộn trang
window.addEventListener('scroll', () => {
  // Kiểm tra vị trí cuộn của trang
  if (window.scrollY > 0) {
    navbar.classList.add('sticky'); // Thêm lớp sticky khi cuộn
  } else {
    navbar.classList.remove('sticky'); // Xóa lớp sticky khi cuộn lên
  }
});
