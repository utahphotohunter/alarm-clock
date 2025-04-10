const icon = document.getElementById('icon');
const mobileMenu = document.getElementById('mobile-menu');
const body = document.querySelector('body');

icon.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    body.classList.toggle('active');
})