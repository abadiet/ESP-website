/* BACKGROUND */

const background = document.querySelector('.background');

window.addEventListener('scroll', () => {
    const scrollDeg = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * (180 - 45) + 45;

    background.style.background = `linear-gradient(${scrollDeg}deg, hsl(53deg 86% 57%) 0%, hsl(23deg 100% 44%) 28%, hsl(327deg 100% 32%) 36%, hsl(239deg 100% 23%) 45%, hsl(0deg 0% 0%) 100%)`;
});


/* SHAPES */

const shapeContainer = document.getElementById("shape-container");

function moveShapeRandomly(shape) {
    const size = Math.random() * (5 - 0.5) + 0.5;
    shape.style.width = `${size}%`;
    shape.style.height = `${size}%`;

    const randomX = Math.random() * (100 - size);
    const randomY = Math.random() * (100 - size);

    const borderRadii = [];
    for (let i = 0; i < 8; i++) {
        borderRadii.push(Math.random() * (80 - 20) + 20);
    }

    shape.style.transform = `translate(${randomX}%, ${randomY}%)`;
    shape.style.borderRadius = `${borderRadii[0]}% ${borderRadii[1]}% ${borderRadii[2]}% ${borderRadii[3]}% / ${borderRadii[4]}% ${borderRadii[5]}% ${borderRadii[6]}% ${borderRadii[7]}%`;
}

function createShape() {
    const shape = document.createElement("div");
    shape.classList.add("shape");

    const size = Math.random() * (5 - 1) + 1;
    const xPos = Math.random() * (100 - size);
    const yPos = Math.random() * (100 - size);

    shape.style.width = `${size}%`;
    shape.style.height = `${size}%`;
    shape.style.left = `${xPos}%`;
    shape.style.top = `${yPos}%`;

    const animationDuration = Math.random() * (3 - 0.5) + 0.5;
    shape.style.animation = `shape-animation ${animationDuration}s infinite`;
    shape.style.transition = `transform ${animationDuration}s ease-in-out, border-radius ${animationDuration}s ease-in-out, width ${animationDuration}s ease-in-out, height ${animationDuration}s ease-in-out`;

    shapeContainer.appendChild(shape);

    moveShapeRandomly(shape);

    setInterval(function () {
        moveShapeRandomly(shape);
    }, animationDuration * 1000);
}

for (let i = 0; i < 20; i++) {
    createShape();
}
