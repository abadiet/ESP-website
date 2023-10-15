document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll(".picture-container.blur-around").forEach(container => {
        container.style.setProperty('--image-url', `url(${container.getElementsByClassName("picture")[0].src})`);
    });

});