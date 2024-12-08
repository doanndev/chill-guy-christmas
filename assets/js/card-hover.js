// JavaScript để tạo hiệu ứng nghiêng thẻ theo con trỏ chuột
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    // Lấy vị trí của thẻ card
    const cardRect = card.getBoundingClientRect();
    const cardX = cardRect.left + cardRect.width / 2;
    const cardY = cardRect.top + cardRect.height / 2;

    // Lấy vị trí của con trỏ chuột
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Tính toán độ nghiêng dựa trên vị trí chuột
    const deltaX = (mouseX - cardX) / cardRect.width;
    const deltaY = (mouseY - cardY) / cardRect.height;

    // Điều chỉnh góc xoay cho thẻ (tăng độ nghiêng)
    const rotateX = deltaY * 50; // Tăng góc nghiêng theo trục X (lên xuống)
    const rotateY = deltaX * 50; // Tăng góc nghiêng theo trục Y (trái phải)

    // Áp dụng hiệu ứng nghiêng cho thẻ
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    // Trở lại trạng thái ban đầu khi chuột rời khỏi thẻ
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});
