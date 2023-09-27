const primaryCloseWidth = "0px";
const primaryOpenWidth = "240px";
const primaryLargeWidth = "460px";
const collapsibleTransitionTime = 300;

parent.window.onload = function () {    // wait for parent to be fully loaded

/* IFRAME RESIZE */

const menu = parent.document.getElementsByClassName("menu-container")[0];
const menuButton = document.getElementById('collapsible-menu');
const primaryMenu = document.getElementById('menu-content');

function resizeIframe() {
    menu.style.width = Math.max(menuButton.offsetWidth, parseInt(primaryMenu.style.width)) + 'px';
    menu.style.height = menuButton.offsetHeight + primaryMenu.offsetHeight + 'px';
}

primaryMenu.style.width = primaryCloseWidth;    // init to avoid an empty string error
resizeIframe();


/* COLLAPSIBLES */

const fusexButton = document.getElementById('fusex');
const fusexContent = document.getElementById('fusex-content');

function closeAllwCheck(e) {
    if (
        (
            e.relatedTarget === null ||
            e.relatedTarget !== primaryMenu &&
            e.relatedTarget !== fusexContent &&
            e.relatedTarget.parentElement !== primaryMenu &&
            e.relatedTarget.parentElement !== fusexContent
        ) &&
        !menuButton.classList.contains('clicked')
    ) {
        primaryMenu.style.width = primaryCloseWidth;

        primaryMenu.classList.remove('show');
        menuButton.classList.remove('show');
        fusexContent.classList.remove('show');

        setTimeout(resizeIframe, collapsibleTransitionTime);
    }
}

function closeSecondarieswCheck(e, button) {
    if (
        e.relatedTarget === null ||
        e.relatedTarget != fusexContent &&
        e.relatedTarget.parentElement !== fusexContent &&
        !button.classList.contains('clicked')
    ) {
        closeSecondaries();
    }
}

function closeSecondaries() {
    primaryMenu.style.width = primaryOpenWidth;

    fusexContent.classList.remove('show');

}


/* STOP PROPAGATION */

function stopPropagation(parent) {
    for (const child of parent.children) {
        child.addEventListener("mouseout", function (e) {
            e.stopPropagation();
        });
    }
}

stopPropagation(primaryMenu);
stopPropagation(fusexContent);


/* MAIN */

if (Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1) {
    /* PHONE */

    menuButton.addEventListener('click', function() {
        primaryMenu.style.width = primaryOpenWidth;
        menuButton.classList.toggle('show');
        primaryMenu.classList.toggle('show');
        resizeIframe();
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

} else {
    /* COMPUTER */

    menuButton.addEventListener('click', function() {
        menuButton.classList.toggle('clicked');
    });

    menuButton.addEventListener("mouseover", function () {
        primaryMenu.style.width = primaryOpenWidth;

        primaryMenu.classList.add('show');
        menuButton.classList.add('show');

        resizeIframe();
    });

    menuButton.addEventListener("mouseout", function (e) {
        closeAllwCheck(e);
    });

    primaryMenu.addEventListener("mouseout", function (e) {
        closeAllwCheck(e);
    });


    /* FUSEX */

    fusexButton.addEventListener("mouseover", function () {
        primaryMenu.style.width = primaryLargeWidth;

        fusexContent.classList.add('show');

        resizeIframe();
    });

    fusexButton.addEventListener("mouseout", function (e) {
        closeAllwCheck(e);
    });

    fusexContent.addEventListener("mouseout", function (e) {
        closeAllwCheck(e);
        closeSecondarieswCheck(e, fusexButton);
    });


    /* OTHERS */

    for (const link of primaryMenu.getElementsByTagName("a")) {
        link.addEventListener("mouseover", function (e) {
            closeSecondaries();
        });
    }
}

}