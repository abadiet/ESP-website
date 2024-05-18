function getPropertyValue (property, elem) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(property));
}

window.addEventListener("load", function() {

    /* BLUR AROUND */

    document.querySelectorAll(".image-container.blur-around").forEach(container => {
        container.style.setProperty('--image-url', `url(${container.firstChild.src})`);
    });

});
