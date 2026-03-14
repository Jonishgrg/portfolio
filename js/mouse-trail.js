const canvas = document.getElementById("mouse-trail-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const points = [];
const MAX_POINTS = 12; // shorter trail

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let isMouseInside = false; // track if mouse is inside

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMouseInside = true; // mouse is inside
});

// when mouse leaves window
document.addEventListener("mouseleave", () => {
  isMouseInside = false;
  points.length = 0; // clear trail immediately
});

// optional: reset when mouse comes back in
document.addEventListener("mouseenter", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMouseInside = true;
});

function animateTrail() {
  if (isMouseInside) {
    // push current position directly (no lag)
    points.push({ x: mouseX, y: mouseY });
    if (points.length > MAX_POINTS) points.shift();
  } else {
    // slowly fade out points if needed
    if (points.length) points.shift();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // draw trail
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];

    const t = i / points.length;

    ctx.strokeStyle = `rgba(59, 130, 246, ${t})`;
    ctx.lineWidth = t * 8 + 2;

    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(59, 130, 246, 0.7)";

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
  }

  // draw pointy endpoint
  if (points.length) {
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.shadowBlur = 30;
    ctx.shadowColor = "rgba(59, 130, 246, 1)";
    ctx.fill();
  }

  requestAnimationFrame(animateTrail);
}

animateTrail();