parent.window.onload = function () {    // wait for parent to be fully loaded

/* IFRAME RESIZE */

const menuContainer = parent.document.getElementById("menu-container");
const menuButton = parent.document.getElementById('menu-button');
const menuOpen = document.getElementById('menu-open');
const fusexMenu = document.getElementById('fusex-menu');


/* COLLAPSIBLES */

function closeSecondaries() {
    fusexMenu.classList.remove('show');
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
    menuContainer.classList.toggle('show');
});


/* FUSEX */

fusexButton.addEventListener("click", function () {
    primaryMenu.style.width = primaryLargeWidth;

    fusexContent.classList.add('show');

    resizeIframe();
});


/* OTHERS */

for (const link of primaryMenu.getElementsByTagName("a")) {
    link.addEventListener("click", function (e) {
        closeSecondaries();
    });
}

}