window.addEventListener("load", function() {

    /* FIT WIDTH */
    
    const fit_width = document.querySelectorAll(".text.fit-width");
    function fitWidth() {
        fit_width.forEach(textContainer => {
            console.log(textContainer.parentElement.offsetWidth)
            let i = 1;
            const step = 1
            let decreasing = false;

            while (textContainer.offsetWidth < textContainer.parentElement.offsetWidth) {
                textContainer.style.fontSize = `${i}px`;
                i += step;
            }
            while (i >= 0 && textContainer.offsetWidth > textContainer.parentElement.offsetWidth) {
                textContainer.style.fontSize = `${i}px`;
                i -= step;
                decreasing = true;
            }

            if (decreasing) {
                textContainer.style.fontSize = `${i + step}px`;
            } else {
                textContainer.style.fontSize = `${i - step}px`;
            }
        });
    }
    fitWidth();
    window.addEventListener('resize', fitWidth);

});