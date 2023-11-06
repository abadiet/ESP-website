function getPropertyValue (property, elem) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(property));
}

window.addEventListener("load", function() {

    /* BLUR AROUND */

    document.querySelectorAll(".picture-container.blur-around").forEach(container => {
        container.style.setProperty('--image-url', `url(${container.getElementsByClassName("picture")[0].src})`);
    });


    /* DUAL PICTURES */

    const dual_pictures_width_fixed = document.querySelectorAll(".picture-container.dual-pictures.width-fixed");
    const dual_pictures_height_fixed = document.querySelectorAll(".picture-container.dual-pictures.height-fixed");
    function dualPictures() {
        dual_pictures_width_fixed.forEach(container => {
            container.style.height = (container.children[0].offsetHeight + container.children[1].offsetHeight) * (1 - getPropertyValue("--overlap-ratio", container)) + "px";
        });
        dual_pictures_height_fixed.forEach(container => {
            container.style.width = (container.children[0].offsetWidth + container.children[1].offsetWidth) * (1 - getPropertyValue("--overlap-ratio", container)) + "px";
        });
    }
    dualPictures();
    window.addEventListener('resize', dualPictures);

});
