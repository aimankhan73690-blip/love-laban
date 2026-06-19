document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".dish-slider");
    const viewport = document.querySelector(".carousel-container");
    const previousButton = document.getElementById("prevBtn");
    const nextButton = document.getElementById("nextBtn");

    if (!track || !viewport || !previousButton || !nextButton) {
        return;
    }

    const originalCards = [...track.querySelectorAll(".dish-card")];
    const cloneCount = Math.min(5, originalCards.length);
    const transitionDuration = 650;
    const autoSlideDelay = 4200;

    originalCards
        .slice(-cloneCount)
        .reverse()
        .forEach(card => track.prepend(card.cloneNode(true)));

    originalCards
        .slice(0, cloneCount)
        .forEach(card => track.append(card.cloneNode(true)));

    let currentIndex = cloneCount;
    let isAnimating = false;
    let autoSlide;

    function getStep() {
        const card = track.querySelector(".dish-card");
        const styles = window.getComputedStyle(track);
        const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

        return card.getBoundingClientRect().width + gap;
    }

    function moveToCurrentCard(animate = true) {
        track.style.transition = animate
            ? `transform ${transitionDuration}ms cubic-bezier(.22, .61, .36, 1)`
            : "none";

        track.style.transform = `translate3d(-${currentIndex * getStep()}px, 0, 0)`;
    }

    function move(direction) {
        if (isAnimating) {
            return;
        }

        isAnimating = true;
        currentIndex += direction;
        moveToCurrentCard();
    }

    function startAutoSlide() {
        window.clearInterval(autoSlide);
        autoSlide = window.setInterval(() => move(1), autoSlideDelay);
    }

    function stopAutoSlide() {
        window.clearInterval(autoSlide);
    }

    nextButton.addEventListener("click", () => {
        move(1);
        startAutoSlide();
    });

    previousButton.addEventListener("click", () => {
        move(-1);
        startAutoSlide();
    });

    track.addEventListener("transitionend", event => {
        if (event.propertyName !== "transform") {
            return;
        }

        if (currentIndex >= originalCards.length + cloneCount) {
            currentIndex = cloneCount;
            moveToCurrentCard(false);
        } else if (currentIndex < cloneCount) {
            currentIndex = originalCards.length + cloneCount - 1;
            moveToCurrentCard(false);
        }

        isAnimating = false;
    });

    viewport.addEventListener("mouseenter", stopAutoSlide);
    viewport.addEventListener("mouseleave", startAutoSlide);
    viewport.addEventListener("focusin", stopAutoSlide);
    viewport.addEventListener("focusout", startAutoSlide);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => moveToCurrentCard(false), 120);
    });

    moveToCurrentCard(false);
    startAutoSlide();
});

// Review pagination state
const dots = document.querySelectorAll(".dot");

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        dots.forEach(item => item.classList.remove("active"));
        dot.classList.add("active");
    });
});
