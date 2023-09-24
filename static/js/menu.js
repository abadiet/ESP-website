const menuButton = document.getElementById('collapsible-menu');
const primaryMenu = document.getElementById('menu-content');
const fusexButton = document.getElementById('fusex');
const fusexContent = document.getElementById('fusex-content');

function closeAllwCheck(e) {
    if (
        e.relatedTarget != primaryMenu &&
        e.relatedTarget != fusexContent &&
        e.relatedTarget.parentElement !== primaryMenu &&
        e.relatedTarget.parentElement !== fusexContent &&
        !menuButton.classList.contains('clicked')
    ) {
        primaryMenu.classList.remove('show');
        menuButton.classList.remove('show');
        fusexContent.classList.remove('show');
        primaryMenu.style.width = "250px";
    }
}

function closeSecondarieswCheck(e, collapsible, button) {
    if (
        e.relatedTarget != fusexContent &&
        e.relatedTarget.parentElement !== fusexContent &&
        !button.classList.contains('clicked')
    ) {
        closeSecondaries();
    }
}

function closeSecondaries() {
    fusexContent.classList.remove('show');
    primaryMenu.style.width = "250px";
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

menuButton.addEventListener('click', function() {
    menuButton.classList.toggle('clicked');
});

menuButton.addEventListener("mouseover", function () {
    primaryMenu.classList.add('show');
    menuButton.classList.add('show');
});

menuButton.addEventListener("mouseout", function (e) {
    closeAllwCheck(e);
});

primaryMenu.addEventListener("mouseout", function (e) {
    closeAllwCheck(e);
});


/* FUSEX */

fusexButton.addEventListener('click', function() {
    fusexButton.classList.toggle('clicked');
});

fusexButton.addEventListener("mouseover", function () {
    fusexContent.classList.add('show');
    primaryMenu.style.width = "480px";
});

fusexButton.addEventListener("mouseout", function (e) {
    closeAllwCheck(e);
});

fusexContent.addEventListener("mouseout", function (e) {
    closeAllwCheck(e);
    closeSecondarieswCheck(e, fusexContent, fusexButton);
});


/* OTHERS */

for (const link of primaryMenu.getElementsByTagName("a")) {
    link.addEventListener("mouseover", function (e) {
        closeSecondaries();
    });
}