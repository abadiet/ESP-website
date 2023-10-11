parent.window.onload = function () {    // wait for parent to be fully loaded

function getPropertyValue (property, menu) {
    if (menu === null) menu = document.body;
    return parseFloat(getComputedStyle(menu).getPropertyValue(property));
}

const menuOpenTransitionDuration = getPropertyValue('--menu-open-duration', null);
const elementsShowInterval = 25;
const elementsOpactityTransitionDuration = getPropertyValue('--menu-elem-duration', null);
const slidingDuration = getPropertyValue('--menu-sliding-duration', null);
const menuBarHeight = getPropertyValue("--menu-bar-height", null)

const menuContainer = parent.document.getElementById("menu-container");
const menuButton = parent.document.getElementById('menu-button');
const menuBar = parent.document.getElementById('menu-bar');
const menuOpen = document.getElementById('menu-open');
const backArrow = document.getElementById('back-arrow');
const primaryMenu = document.getElementById('primary-menu');
const fusexMenu = document.getElementById('fusex-menu');
const minifMenu = document.getElementById('minif-menu');
const naascMenu = document.getElementById('naasc-menu');

let menuStayOpen = true;

function checkEnoughWidth() {
    const menuWIdth = getPropertyValue('--menu-width', null);
    const menuGap = getPropertyValue('--menu-gap', null);
    const maxLenTree = getPropertyValue('--max-len-menu-tree', null);

    if (50 + (menuWIdth + menuGap) * maxLenTree - menuGap + 50 > window.innerWidth) {
        menuStayOpen = false;
        fusexMenu.classList.remove('secondary-margin');
        minifMenu.classList.remove('secondary-margin');
        naascMenu.classList.remove('secondary-margin');
    } else {
        menuStayOpen = true;
        fusexMenu.classList.add('secondary-margin');
        minifMenu.classList.add('secondary-margin');
        naascMenu.classList.add('secondary-margin');
    }
}

function openMenu(menu) {
    menu.classList.add('show');
    _openMenu_rec(menu, 0);
}

function _openMenu_rec(menu, index) {
    if (index < menu.children.length) {
        menu.children[index].classList.add('show');
        setTimeout(() => {
            _openMenu_rec(menu, index + 1);
        }, elementsShowInterval);
    }
} 

function closeMenu(menu, duration) {
    for (let i = 0; i < menu.children.length; i++) {
        menu.children[i].classList.add('hiding');
    }
    setTimeout(() => {
        menu.classList.remove('show');
        for (let i = 0; i < menu.children.length; i++) {
            menu.children[i].classList.remove('hiding');
            menu.children[i].classList.remove('show');
            menu.children[i].classList.remove('noanimation');
        }
    }, duration);
}

function slideRight(menu) {
    menu.classList.add('show');
    menu.classList.add('sliding-right');
    for (let i = 0; i < menu.children.length; i++) {
        menu.children[i].classList.add('noanimation');
        menu.children[i].classList.add('show');
    }
    setTimeout(() => {
        menu.classList.remove('sliding-right');
    }, slidingDuration);
}

function slideLeft(menu) {
    menu.classList.add('sliding-left');
    setTimeout(() => {
        menu.classList.remove('show');
        menu.classList.remove('sliding-left');
        for (let i = 0; i < menu.children.length; i++) {
            menu.children[i].classList.remove('show');
            menu.children[i].classList.remove('noanimation');
        }
    }, slidingDuration);
}


/* SECONDARIES */

function closeSecondaries(menu) {
    if (!menuStayOpen) {
        slideLeft(fusexMenu);
        slideLeft(minifMenu);
        slideLeft(naascMenu);
        setTimeout(() => {slideRight(primaryMenu);}, slidingDuration);
        backArrow.classList.remove("show");
    } else {
        if (menu !== fusexMenu) closeMenu(fusexMenu, 0);
        if (menu !== minifMenu) closeMenu(minifMenu, 0);
        if (menu !== naascMenu) closeMenu(naascMenu, 0);
    }
}

function openSecondaries(menu) {
    if (!menuStayOpen) {
        slideLeft(primaryMenu);
        setTimeout(() => {slideRight(menu);}, slidingDuration);
        backArrow.classList.add("show");
    } else {
        closeSecondaries(menu);
        openMenu(menu);
    }
}

document.getElementById('fusex').addEventListener('click', function() {
    openSecondaries(fusexMenu);
});
document.getElementById('minif').addEventListener('click', function() {
    openSecondaries(minifMenu);
});
document.getElementById('naasc').addEventListener('click', function() {
    openSecondaries(naascMenu);
});


/* MAIN */

menuButton.addEventListener('click', function() {
    if (menuButton.classList.contains('open')) {
        menuButton.classList.remove('open');
        menuButton.classList.add('close');
    } else {
        if (menuButton.classList.contains('close')) {
            menuButton.classList.add('open');
            menuButton.classList.remove('close');
        } else {
            menuButton.classList.add('close');
        }
    }

    if (menuContainer.classList.contains('show')) {
        menuContainer.classList.add('hiding');
        setTimeout(() => {
            menuContainer.classList.remove('show');
            menuContainer.classList.remove('hiding');
            primaryMenu.classList.remove('hiding');
            backArrow.classList.remove("show");
        }, menuOpenTransitionDuration);

        parent.document.body.style.overflowY = 'scroll';

        menuOpen.style.setProperty('--menu-open-scaleY', '1');
        menuOpen.classList.remove('show');
        menuBar.classList.add('show');

        // smoothly closing every menus, even those not shown
        closeMenu(primaryMenu, elementsOpactityTransitionDuration);
        closeMenu(fusexMenu, elementsOpactityTransitionDuration);
        closeMenu(minifMenu, elementsOpactityTransitionDuration);
        closeMenu(naascMenu, elementsOpactityTransitionDuration);

    } else {
        menuContainer.classList.add('show');
        parent.document.body.style.overflowY = 'hidden';
        menuOpen.classList.add('show');
        menuOpen.style.setProperty('--menu-open-scaleY', window.innerHeight / menuBarHeight);
        menuBar.classList.remove('show');
        openMenu(primaryMenu);
    }
});


/* ON RESIZE */

checkEnoughWidth();

parent.window.addEventListener('resize', () => {
    checkEnoughWidth();
    closeSecondaries(null);
    menuOpen.style.setProperty('--menu-open-scaleY', window.innerHeight / menuBarHeight);
});


/* BACK ARROW */

document.getElementById('back-arrow').addEventListener('click', function() {
    closeSecondaries(null);
});

}
