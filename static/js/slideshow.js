const show_time = 3000;
const zIndex_offset = 900;
const scale_adjust = 3;

document.querySelectorAll('.row-slidewshow-container').forEach(slideshow => {

    let cards_order = [];

    let cur_timeout;

    function scroll(left) {

        for (let i = 0; i < slideshow.children.length; i++) {
            let direction = 1;
            if (left) direction = -1;

            cards_order[i] += direction;
            if (cards_order[i] < - Math.ceil(slideshow.children.length / 2)) {
                slideshow.children[i].style.opacity = 0;
                cards_order[i] = slideshow.children.length - 1 - Math.ceil(slideshow.children.length / 2);
            } else {
                if (cards_order[i] > slideshow.children.length - 1 - Math.ceil(slideshow.children.length / 2)) {
                    slideshow.children[i].style.opacity = 0;
                    cards_order[i] = - Math.ceil(slideshow.children.length / 2);
                } else {
                    slideshow.children[i].style.opacity = 1;
                }
            }

            const transOff = cards_order[i] * (2 * slideshow.children[(i - direction + slideshow.children.length) % slideshow.children.length].offsetWidth / (Math.abs(cards_order[i]) + 1));
            slideshow.children[i].style.transform = "translateX(" + transOff + "px) scale(" + scale_adjust / (Math.abs(cards_order[i]) + scale_adjust) + ")";
            slideshow.children[i].style.zIndex = -1 * Math.abs(cards_order[i]) + zIndex_offset;
            slideshow.children[i].style.filter = "blur(" + Math.abs(cards_order[i]) * 4 + "px)";
        }
    
        cur_timeout = setTimeout(() => {
            scroll(left);
        }, show_time);
    }

    let touchMoveStartX = 0;
    function onScroll(event) {
        slideshow.removeEventListener("wheel", onScroll);
        slideshow.removeEventListener("touchmove", onScroll, { passive: false });

        const delta = event.deltaX || (touchMoveStartX - event.touches[0].pageX);

        event.preventDefault();

        clearTimeout(cur_timeout);
        scroll((delta > 0));

        setTimeout(() => {
            slideshow.addEventListener("wheel", onScroll);
            slideshow.addEventListener("touchmove", onScroll, { passive: false });
        }, 200);
    }

    // add some cards if needed
    const min_cards = 10;//TODO 2 * Math.ceil(window.innerWidth / slide_distance) + 1 + 1; // last +1 to avoid screen from opposite side of the right card 
    const prev_len = slideshow.children.length;
    for (let i = 0; i < min_cards - prev_len; i++) {
        let ichild = Math.ceil(prev_len / 2) - 1 + i;
        while (ichild >= prev_len) ichild -= prev_len;
        slideshow.appendChild(slideshow.children[ichild].cloneNode(true));
    }

    // init the cards order
    for (let i = 0; i < slideshow.children.length; i++) {
        cards_order.push(i - Math.ceil(slideshow.children.length / 2));
    }

    scroll(true);

    slideshow.addEventListener("wheel", onScroll);
    slideshow.addEventListener("touchstart", (event) => {
        touchMoveStartX = event.touches[0].pageX;
    }, { passive: true })
    slideshow.addEventListener("touchmove", onScroll, { passive: false });

});
