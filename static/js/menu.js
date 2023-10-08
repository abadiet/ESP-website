const menuOpenTransitionDuration = 400;
const elementsShowInterval = 30;
const elementsOpactityTransitionDuration = 300;

parent.window.onload = function () {    // wait for parent to be fully loaded

const menuContainer = parent.document.getElementById("menu-container");
const menuButton = parent.document.getElementById('menu-button');
const menuOpen = document.getElementById('menu-open');
const primaryMenu = document.getElementById('primary-menu');
const fusexMenu = document.getElementById('fusex-menu');

function menuTransition(menu) {
    menu.classList.add('show');
    _menuTransition_rec(menu, 0);
}

function _menuTransition_rec(menu, index) {
    if (index < menu.children.length) {
        menu.children[index].classList.add('show');
        setTimeout(() => {
            _menuTransition_rec(menu, index + 1);
        }, elementsShowInterval);
    }
} 

function menuReset(menu, duration) {
    setTimeout(() => {
        menu.classList.remove('show');
    }, duration);
    for (let i = 0; i < menu.children.length; i++) {
        menu.children[i].classList.remove('show');
    }
}

/* CLOSE */

function closeSecondaries(menu) {
    if (menu !== fusexMenu) menuReset(fusexMenu, 0);
}


/* MAIN */

menuButton.addEventListener('click', function() {
    closeSecondaries();
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
    menuOpen.classList.toggle('show');

    if (menuContainer.classList.contains('show')) {
        menuContainer.classList.add('hidding');
        setTimeout(() => {
            menuContainer.classList.remove('show');
            menuContainer.classList.remove('hidding');
        }, menuOpenTransitionDuration);

        parent.document.body.style.overflowY = 'scroll';
        menuReset(primaryMenu, elementsOpactityTransitionDuration);
    } else {
        menuContainer.classList.add('show');
        
        parent.document.body.style.overflowY = 'hidden';
        menuTransition(primaryMenu);
    }
});


/* FUSEX */

const fusex = document.getElementById('fusex');

fusex.addEventListener('click', function() {
    closeSecondaries(fusexMenu);
    menuTransition(fusexMenu);
});

}