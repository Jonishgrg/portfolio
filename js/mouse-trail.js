const canvas = document.getElementById("mouse-trail-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const points = [];
const MAX_POINTS = 30; // number of points in trail

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  // push current position
  points.push({ x: mouseX, y: mouseY });
  if (points.length > MAX_POINTS) points.shift();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw a smooth connected line
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];

    // smooth gradient along tail
    const t = i / points.length;
    ctx.strokeStyle = `rgba(59, 130, 246, ${t * t})`; // fade tail
    ctx.lineWidth = t * 8 + 2;

    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(59, 130, 246, 0.5)";

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
  }

  requestAnimationFrame(animateTrail);
}

animateTrail();