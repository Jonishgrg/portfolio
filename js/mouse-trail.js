const trailContainer = document.getElementById("mouse-trail-container");
const trailDots = [];
const MAX_DOTS = 12;

// create trail dots
for (let i = 0; i < MAX_DOTS; i++) {
  const dot = document.createElement("div");
  dot.classList.add("trail-dot");
  trailContainer.appendChild(dot);
  trailDots.push(dot);
}

let mouseX = 0;
let mouseY = 0;
let positions = Array(MAX_DOTS).fill({x: 0, y: 0});

// track mouse
document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// animate
function animateTrail() {
  positions.unshift({x: mouseX, y: mouseY});
  positions.pop();
  trailDots.forEach((dot, i) => {
    const pos = positions[i];
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    dot.style.opacity = `${(MAX_DOTS - i) / MAX_DOTS}`;
  });
  requestAnimationFrame(animateTrail);
}
animateTrail();