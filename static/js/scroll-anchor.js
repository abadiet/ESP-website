document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));

        const targetOffset = targetElement.getBoundingClientRect().top;

        const initOffset = window.scrollY;
        const duration = 850 * (1 - Math.min(initOffset / targetOffset, targetOffset / initOffset));

        const start = performance.now();
        
        function scrollStep(timestamp) {
            const currentTime = timestamp - start;

            const progress = Math.min(currentTime / duration, 1);
            const easedProgress = progress;

            if (initOffset < targetOffset) {
                window.scrollTo(0, initOffset + targetOffset * easedProgress);
            } else {
                window.scrollTo(0, initOffset - targetOffset * easedProgress);
            }

            if (currentTime < duration) {
                requestAnimationFrame(scrollStep);
            }
        }
        
        requestAnimationFrame(scrollStep);
    });
});
