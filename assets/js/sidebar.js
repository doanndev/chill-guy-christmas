const menuIcon = document.querySelector('#menu-icon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const navbarElement = document.getElementById('navbar')

// Toggle sidebar
menuIcon.addEventListener('click', () => {
    console.log('ok');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Close sidebar when clicking on overlay
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});
