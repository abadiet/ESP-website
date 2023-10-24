/* BACKGROUND ASSO HELLO */

const STAR_SIZE = 10;  // px
const our_speed = 0.3; // unit distance per seconds
const stars_container = document.getElementById('stars-container');

function random(a, b) {
  return Math.random() * (b - a) + a;
}

function randomizeStar(star, spawnFarAway) {
  star.style.setProperty("--size", STAR_SIZE);
  star.style.setProperty("--our-speed", our_speed);

  let initX = random(0, window.innerWidth);
  while (initX === 0.5 * window.innerWidth) initX = random(0, window.innerWidth);
  star.style.setProperty("--initX", initX + "px");

  let initY = random(0, window.innerHeight);
  while (initY === 0.5 * window.innerHeight) initY = random(0, window.innerHeight);
  star.style.setProperty("--initY", initY + "px");

  let transX_sign, transY_sign, initX_reduced, initY_reduced;
  if (initX < 0.5 * window.innerWidth) {
    if (initY < 0.5 * window.innerHeight) {
      transX_sign = -1;
      transY_sign = -1;
      initX_reduced = initX;
      initY_reduced = initY;
    } else {
      transX_sign = -1;
      transY_sign = 1;
      initX_reduced = initX;
      initY_reduced = window.innerHeight - initY;
    }
  } else {
    if (initY < 0.5 * window.innerHeight) {
      transX_sign = 1;
      transY_sign = -1;
      initX_reduced = window.innerWidth - initX;
      initY_reduced = initY;
    } else {
      transX_sign = 1;
      transY_sign = 1;
      initX_reduced = window.innerWidth - initX;
      initY_reduced = window.innerHeight - initY;
    }
  }
  const translateX = transX_sign * (Math.min(initY_reduced * (0.5 * window.innerWidth - initX_reduced) / (0.5 * window.innerHeight - initY_reduced), initX_reduced) + STAR_SIZE);
  const translateY = transY_sign * (Math.min(initX_reduced * (0.5 * window.innerHeight - initY_reduced) / (0.5 * window.innerWidth - initX_reduced), initY_reduced) + STAR_SIZE);
  const trajectory_distance = Math.sqrt(Math.pow(translateX, 2) + Math.pow(translateY, 2));
  star.style.setProperty("--translate", trajectory_distance);

  const angle = Math.atan2(translateY, translateX);
  star.style.setProperty("--angle", angle);

  let distance;
  if (spawnFarAway) {
    distance = 10;
  } else {
    distance = random(1, 10);
  }
  star.style.setProperty("--distance", distance);

  const init_distance_from_center = Math.sqrt(Math.pow(initX - 0.5 * window.innerWidth, 2) + Math.pow(initY - 0.5 * window.innerHeight, 2));
  const time_to_leave = distance * (1 - init_distance_from_center / (trajectory_distance + init_distance_from_center)) / our_speed;
  star.style.setProperty("--time-to-leave", time_to_leave);

  star.style.setProperty("--blink-duration", random(0.2, 0.4) + 's');
  star.style.setProperty("--blink-delay", random(0, 0.5) + 's');
}


function generate(count, spawnFarAway) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    randomizeStar(star, spawnFarAway);
    star.classList.add("bkg-star");

    star.addEventListener("animationend", () => {
      if (!star.classList.contains("slide")) {
        generate(1, true);
        star.remove();
      }
    });

    stars_container.appendChild(star);
  }
}

generate((window.innerWidth + window.innerHeight) / 8, false);
document.body.style.overflowY = 'hidden';


/* GO TO CONTENT */

const background_hello = document.getElementById('background-hello');
const asso_hello = document.getElementById("asso-hello");
const background_page = document.getElementById('background-page');
const background_page_sub = document.getElementById('background-page-sublayer');
const page_content = document.getElementById("page-content");
const menu = document.getElementById("menu-container");

function goToContent() {
  document.body.addEventListener("wheel", goToContent, options);
  document.body.addEventListener("touchmove", goToContent, options);
  document.body.addEventListener("click", goToContent, options);

  background_page.classList.add("show");
  background_page_sub.classList.add("show");
  page_content.classList.add("show");

  document.body.style.overflowY = 'scroll';

  setTimeout(() => {
    asso_hello.remove();
    background_hello.remove();
    menu.style.opacity = 1;
  }, 500);

}

let passiveSupported = false;
try {
  const options = {
    get passive() {
      passiveSupported = true;
      return false;
    },
  };

  window.addEventListener("test", null, options);
  window.removeEventListener("test", null, options);
} catch (err) {
  passiveSupported = false;
}
const options = passiveSupported ? { passive: true } : false;


document.body.addEventListener("wheel", goToContent, options);
document.body.addEventListener("touchmove", goToContent, options);
document.body.addEventListener("click", goToContent, options);
