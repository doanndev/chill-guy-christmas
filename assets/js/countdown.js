  // Ngày bắt đầu và kết thúc
  const startDate = new Date("2024-12-01T00:00:00"); // Ngày bắt đầu
  const endDate = new Date("2024-12-31T23:59:59");  // Ngày kết thúc

  function updateCountdown() {
      const now = new Date(); // Thời gian hiện tại
      const timeLeft = endDate - now; // Khoảng thời gian còn lại (ms)

      if (timeLeft > 0) {
          // Tính toán ngày, giờ, phút, giây còn lại
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          // Cập nhật hiển thị
          document.getElementById("days").textContent = String(days).padStart(2, '0');
          document.getElementById("hours").textContent = String(hours).padStart(2, '0');
          document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
          document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
      } else {
          // Khi thời gian đã hết
          document.querySelector('.countdown').innerHTML = "<p>Time out!</p>";
          clearInterval(interval); // Dừng bộ đếm
      }
  }
  // Cập nhật mỗi giây
  const interval = setInterval(updateCountdown, 1000);

  // Gọi ngay khi trang tải
  updateCountdown();