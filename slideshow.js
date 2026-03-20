const slides = document.querySelectorAll(".slide")
let current = 0;

function showSlide(index) {
    slides.forEach((slide, i) =>
    {
        slide.classList.toggle("active", i===index);
    });
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

showSlide(current);