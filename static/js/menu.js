parent.window.onload = function () {    // wait for parent to be fully loaded

function getPropertyValue (property, menu) {
    if (menu === null) menu = document.body;
    return parseFloat(getComputedStyle(menu).getPropertyValue(property));
}

const menuOpenTransitionDuration = getPropertyValue('--menu-open-duration', null);
const elementsShowWait = 100;
const elementsShowInterval = 12;
const elementsOpactityTransitionDuration = getPropertyValue('--menu-elem-duration', null);
const slidingDuration = getPropertyValue('--menu-sliding-duration', null);
const menuBarHeight = getPropertyValue("--menu-bar-height", null)

const menuContainer = parent.document.getElementById("menu-container");
const menuButton = parent.document.getElementById('menu-button');
const menuBar = parent.document.getElementById('menu-bar');
const menuOpen = document.getElementById('menu-open');
const backArrow = document.getElementById('back-arrow');

const primaryMenu = document.getElementById('primary-menu');

const submenus = document.getElementById("submenus");
const fusexMenu = document.getElementById('fusex-menu');
const minifMenu = document.getElementById('minif-menu');
const naascMenu = document.getElementById('naasc-menu');

let menuStayOpen = true;

function checkEnoughWidth() {
    menuStayOpen = true;

    // hide the primary menu
    primaryMenu.style.opacity = 0;
    primaryMenu.classList.add("show");

    // display each element
    for (let elem = 0; elem < primaryMenu.children.length; elem++) {
        primaryMenu.children[elem].classList.add('show');
    }

    let i = 0;
    while (menuStayOpen && i < submenus.children.length) {
        // hide everything
        submenus.children[i].style.opacity = 0;
        submenus.children[i].classList.add("show");

        // display each element
        for (let elem = 0; elem < submenus.children[i].children.length; elem++) {
            submenus.children[i].children[elem].classList.add('show');
        }

        // check if their is enough place for this menu
        if (submenus.children[i].offsetLeft + submenus.children[i].offsetWidth + 2 * 50 > window.innerWidth) {
            menuStayOpen = false;
        }

        // reset the menu
        submenus.children[i].classList.remove("show");
        submenus.children[i].style.opacity = 1;
        for (let elem = 0; elem < submenus.children[i].children.length; elem++) {
            submenus.children[i].children[elem].classList.remove('show');
        }

        i++;
    }

    // reset the primary menu
    primaryMenu.classList.remove("show");
    primaryMenu.style.opacity = 1;
    for (let elem = 0; elem < primaryMenu.children.length; elem++) {
        primaryMenu.children[elem].classList.remove('show');
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
        slideLeft(backArrow);
        slideLeft(fusexMenu);
        slideLeft(minifMenu);
        slideLeft(naascMenu);
        setTimeout(() => {slideRight(primaryMenu);}, slidingDuration);
    } else {
        if (menu !== fusexMenu) closeMenu(fusexMenu, 0);
        if (menu !== minifMenu) closeMenu(minifMenu, 0);
        if (menu !== naascMenu) closeMenu(naascMenu, 0);
    }
}

function openSecondaries(menu) {
    if (!menuStayOpen) {
        slideLeft(primaryMenu);
        slideRight(backArrow);
        setTimeout(() => {slideRight(menu);}, slidingDuration);
    } else {
        closeSecondaries(menu);
        setTimeout(() => {
            openMenu(menu);
        }, 5);  // to be sure all the menus are closed
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
        backArrow.classList.add("hiding");
        setTimeout(() => {
            menuContainer.classList.remove('show');
            menuContainer.classList.remove('hiding');
            primaryMenu.classList.remove('hiding');
            backArrow.classList.remove("show");
            backArrow.classList.remove("hiding");
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
        setTimeout(() => {
            openMenu(primaryMenu);
        }, elementsShowWait);
    }
});


/* ON RESIZE */

checkEnoughWidth();

parent.window.addEventListener('resize', () => {
    checkEnoughWidth();
    if (menuButton.classList.contains('close')) menuButton.click();
});


/* BACK ARROW */

document.getElementById('back-arrow').addEventListener('click', function() {
    closeSecondaries(null);
});

}
