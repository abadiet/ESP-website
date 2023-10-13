window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

/* BACKGROUND ASSO HELLO */

const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 8;

const canvas = document.getElementById('stars-container');
const context = canvas.getContext('2d');

let scale = 1, // device pixel ratio
    width = 1,
    height = 1;

let stars = [];

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: Math.pow((1.7 / (window.innerWidth + window.innerHeight)), 1.02) };

function generate() {
  for( let i = 0; i < STAR_COUNT; i++ ) {
       stars.push({
           x: 0,
           y: 0,
           z: Math.random() * ( 1 - STAR_MIN_SCALE ) + STAR_MIN_SCALE
       });
  }
}

function placeStar( star ) {
   star.x = Math.random() * width;
   star.y = Math.random() * height;
}

function recycleStar( star ) {

 let direction = 'z';

 let vx = Math.abs( velocity.x ),
     vy = Math.abs( velocity.y );

 if( vx > 1 || vy > 1 ) {
   let axis;

   if( vx > vy ) {
     axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
   }
   else {
     axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
   }

   if( axis === 'h' ) {
     direction = velocity.x > 0 ? 'l' : 'r';
   }
   else {
     direction = velocity.y > 0 ? 't' : 'b';
   }
 }
 
 star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );

 if( direction === 'z' ) {
   star.z = 0.1;
   star.x = Math.random() * width;
   star.y = Math.random() * height;
 }
 else if( direction === 'l' ) {
   star.x = -OVERFLOW_THRESHOLD;
   star.y = height * Math.random();
 }
 else if( direction === 'r' ) {
   star.x = width + OVERFLOW_THRESHOLD;
   star.y = height * Math.random();
 }
 else if( direction === 't' ) {
   star.x = width * Math.random();
   star.y = -OVERFLOW_THRESHOLD;
 }
 else if( direction === 'b' ) {
   star.x = width * Math.random();
   star.y = height + OVERFLOW_THRESHOLD;
 }

}

function resize() {

  const newscale = window.devicePixelRatio || 1;
  const newwidth = window.innerWidth * newscale;
  const newheight = window.innerHeight * newscale;

  if (Math.abs(newwidth - width) / width > 0.2 || Math.abs(newheight - height) / height > 0.2) {
    scale = newscale;
    width = newwidth;
    height = newheight;

    canvas.width = width;
    canvas.height = height;

    stars.forEach( placeStar );
  }
}

function step() {

 context.clearRect( 0, 0, width, height );

 update();
 render();

 requestAnimationFrame( step );

}

function update() {

 velocity.tx *= 0.96;
 velocity.ty *= 0.96;

 velocity.x += ( velocity.tx - velocity.x ) * 0.8;
 velocity.y += ( velocity.ty - velocity.y ) * 0.8;

 stars.forEach( ( star ) => {

   star.x += velocity.x * star.z;
   star.y += velocity.y * star.z;

   star.x += ( star.x - width/2 ) * velocity.z * star.z;
   star.y += ( star.y - height/2 ) * velocity.z * star.z;
   star.z += velocity.z;
 
   // recycle when out of bounds
   if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
     recycleStar( star );
   }

 } );

}

function render() {

 stars.forEach( ( star ) => {

   context.beginPath();
   context.lineCap = 'round';
   context.lineWidth = STAR_SIZE * star.z * scale;
   context.globalAlpha = 0.5 + 0.5*Math.random();
   context.strokeStyle = STAR_COLOR;

   context.beginPath();
   context.moveTo( star.x, star.y );

   var tailX = velocity.x * 2,
       tailY = velocity.y * 2;

   // stroke() wont work on an invisible line
   if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
   if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;

   context.lineTo( star.x + tailX, star.y + tailY );

   context.stroke();

 } );

}

let previousScroll = window.scrollY;

function scroll() {
   velocity.ty += ( (previousScroll - window.scrollY) / window.innerHeight * 20.0 );
   previousScroll = window.scrollY;
}

generate();
resize();
step();

window.addEventListener('resize', resize);
window.addEventListener('scroll', scroll);

/* SCROLL TO ANCHOR */

const asso_hello = document.getElementById("asso-hello");
let hasScroll = false;

window.addEventListener('scroll', () => {
    if (asso_hello !== null && asso_hello.getBoundingClientRect().top <= 0 && !hasScroll) {
      document.getElementById('asso-scrolldown').click();
      hasScroll = true;
    }
});


/* BACKGROUND PAGE CONTENT */

const background_page = document.querySelector('.background-page');
const background_hello = document.getElementById('background-hello');
const page_content = document.getElementById("page-content");
const menu = document.getElementById("menu-container");

window.addEventListener('scroll', () => {
    if (page_content.getBoundingClientRect().top < window.innerHeight) {
      background_page.style.width = '101%';
      background_page.style.height = '101%';
      background_page.style.borderRadius = '0';
      background_page.style.backgroundColor = 'var(--background-color-main)';
    } else {
      background_page.style.width = '0';
      background_page.style.height = '0';
      background_page.style.backgroundColor = 'var(--background-color-second)';
      background_page.style.borderRadius = '50%';
    }

    if (page_content.getBoundingClientRect().top <= 0.5 && page_content.getBoundingClientRect().top >= 0) {
      setTimeout(() => {
        asso_hello.remove();
        background_hello.remove();
        menu.style.opacity = 1;
      }, 1000);
    }

});