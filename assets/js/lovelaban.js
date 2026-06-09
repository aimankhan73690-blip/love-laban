
document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".dish-slider");
    const cards = document.querySelectorAll(".dish-card");

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    let currentIndex = 0;

    const visibleCards = 4.5;
    const gap = 20;

    function getCardWidth() {
        return cards[0].offsetWidth + gap;
    }

    nextBtn.addEventListener("click", () => {

        const maxIndex = cards.length - Math.floor(visibleCards);

        if (currentIndex < maxIndex) {
            currentIndex++;

            track.style.transform =
                `translateX(-${currentIndex * getCardWidth()}px)`;
        }

    });

    prevBtn.addEventListener("click", () => {

        if (currentIndex > 0) {
            currentIndex--;

            track.style.transform =
                `translateX(-${currentIndex * getCardWidth()}px)`;
        }

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".dish-slider");
    const cards = document.querySelectorAll(".dish-card");

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    let currentIndex = 0;

    const visibleCards = 4.5;
    const gap = 20;

    function getCardWidth() {
        return cards[0].offsetWidth + gap;
    }

    function updateSlider() {
        track.style.transform =
            `translateX(-${currentIndex * getCardWidth()}px)`;
    }

    // Next Button
    nextBtn.addEventListener("click", () => {

        const maxIndex = cards.length - Math.ceil(visibleCards);

        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        updateSlider();
    });

    // Previous Button
    prevBtn.addEventListener("click", () => {

        const maxIndex = cards.length - Math.ceil(visibleCards);

        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }

        updateSlider();
    });

    // AUTO SLIDE
    let autoSlide = setInterval(() => {

        const maxIndex = cards.length - Math.ceil(visibleCards);

        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        updateSlider();

    }, 3000); // 3 seconds

    // Pause on hover
    track.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    track.addEventListener("mouseleave", () => {

        autoSlide = setInterval(() => {

            const maxIndex = cards.length - Math.ceil(visibleCards);

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }

            updateSlider();

        }, 3000);

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".dish-slider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const visibleCards = 4;
    const gap = 20;

    let cards = [...document.querySelectorAll(".dish-card")];

    // Clone first and last cards
    const firstClones = cards.slice(0, visibleCards).map(card => card.cloneNode(true));
    const lastClones = cards.slice(-visibleCards).map(card => card.cloneNode(true));

    firstClones.forEach(clone => track.appendChild(clone));

    lastClones.reverse().forEach(clone => {
        track.insertBefore(clone, track.firstChild);
    });

    cards = [...document.querySelectorAll(".dish-card")];

    let currentIndex = visibleCards;

    function getCardWidth() {
        return cards[0].offsetWidth + gap;
    }

    function updateSlider(animated = true) {

        track.style.transition =
            animated ? "transform .5s ease" : "none";

        track.style.transform =
            `translateX(-${currentIndex * getCardWidth()}px)`;
    }

    updateSlider(false);

    // NEXT
    nextBtn.addEventListener("click", () => {
        currentIndex++;
        updateSlider();
    });

    // PREV
    prevBtn.addEventListener("click", () => {
        currentIndex--;
        updateSlider();
    });

    track.addEventListener("transitionend", () => {

        const originalCount = cards.length - (visibleCards * 2);

        // Jump from end clones
        if (currentIndex >= originalCount + visibleCards) {

            currentIndex = visibleCards;

            updateSlider(false);
        }

        // Jump from start clones
        if (currentIndex < visibleCards) {

            currentIndex = originalCount + visibleCards - 1;

            updateSlider(false);
        }

    });

    // AUTO SLIDE
    let autoSlide = setInterval(() => {
        currentIndex++;
        updateSlider();
    }, 3000);

    // Pause on hover
    track.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    track.addEventListener("mouseleave", () => {

        autoSlide = setInterval(() => {
            currentIndex++;
            updateSlider();
        }, 3000);

    });

    // Responsive fix
    window.addEventListener("resize", () => {
        updateSlider(false);
    });

});

// reviews-javascript
const dots = document.querySelectorAll(".dot");

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        dots.forEach(d => d.classList.remove("active"));

        dot.classList.add("active");

        // Move slider here
    });

});



