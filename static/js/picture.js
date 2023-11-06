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
            var picture0 = container.children[0];
            if (picture0.classList.contains('picture-container')) picture0 = picture0.children[0];
            var picture1 = container.children[1];
            if (picture1.classList.contains('picture-container')) picture1 = picture1.children[0];

            container.style.height = (
                picture0.naturalHeight * picture0.offsetWidth / picture0.naturalWidth +
                picture1.naturalHeight * picture1.offsetWidth / picture1.naturalWidth 
            ) * (1 - getPropertyValue("--overlap-ratio", container)) + "px"
        });
        dual_pictures_height_fixed.forEach(container => {
            var picture0 = container.children[0];
            if (picture0.classList.contains('picture-container')) picture0 = picture0.children[0];
            var picture1 = container.children[1];
            if (picture1.classList.contains('picture-container')) picture1 = picture1.children[0];

            container.style.width = (
                picture0.naturalWidth * picture0.offsetHeight / picture0.naturalHeight +
                picture1.naturalWidth * picture1.offsetHeight / picture1.naturalHeight 
            ) * (1 - getPropertyValue("--overlap-ratio", container)) + "px";
        });
    }
    dualPictures();
    window.addEventListener('resize', dualPictures);

});
