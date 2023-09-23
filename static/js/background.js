const shapeContainer = document.getElementById("shape-container");

function moveShapeRandomly(shape) {
    const size = Math.random() * (25 - 3) + 3;
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

    const colors = ["pink", "lightblue", "lightgreen", "lightyellow", "lightcoral"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    shape.style.backgroundColor = randomColor;

    const size = Math.random() * (25 - 3) + 3;
    const xPos = Math.random() * (100 - size);
    const yPos = Math.random() * (100 - size);

    shape.style.width = `${size}%`;
    shape.style.height = `${size}%`;
    shape.style.left = `${xPos}%`;
    shape.style.top = `${yPos}%`;

    shape.style.filter = `blur(2rem)`;

    const animationDuration = Math.random() * (3 - 1) + 1;
    shape.style.animation = `shape-animation ${animationDuration}s infinite`;
    shape.style.transition = `transform ${animationDuration}s ease-in-out, border-radius ${animationDuration}s ease-in-out, width ${animationDuration}s ease-in-out, height ${animationDuration}s ease-in-out`;

    shapeContainer.appendChild(shape);

    moveShapeRandomly(shape);

    setInterval(function () {
        moveShapeRandomly(shape);
    }, animationDuration * 1000);
}

for (let i = 0; i < 3; i++) {
    createShape();
}
