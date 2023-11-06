window.addEventListener("load", function() {

    /* FIT WIDTH */
    
    const fit_width = document.querySelectorAll(".text-container.fit-width");
    function fitWidth() {
        fit_width.forEach(textContainer => {
            let i = 1;
            const step = 1
            let decreasing = false;

            while (textContainer.firstElementChild.offsetWidth < textContainer.offsetWidth) {
                textContainer.firstElementChild.style.fontSize = `${i}px`;
                i += step;
            }
            while (i >= 0 && textContainer.firstElementChild.offsetWidth > textContainer.offsetWidth) {
                textContainer.firstElementChild.style.fontSize = `${i}px`;
                i -= step;
                decreasing = true;
            }

            if (decreasing) {
                textContainer.firstElementChild.style.fontSize = `${i + step}px`;
            } else {
                textContainer.firstElementChild.style.fontSize = `${i - step}px`;
            }
        });
    }
    fitWidth();
    window.addEventListener('resize', fitWidth);

});