const icon = document.getElementById('icon');
const mobileMenu = document.getElementById('mobile-menu');
const main = document.querySelector('main');
const editNews = document.getElementById('edit-news'); // button to open the news preferrence dialog

icon.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    main.classList.toggle('active');
})

editNews.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    main.classList.toggle('active');
})