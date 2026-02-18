const canvas = document.getElementById("bubble-canvas");
const ctx = canvas.getContext("2d");

let w, h, particles = [];
let targetPoints = [];
let mode = "scatter";

const TEXT = "Sherwin";
const PARTICLE_COUNT = 520;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  createParticles();
  buildTextTargets();
}
window.addEventListener("resize", resize);

function createParticles() {
  particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7,
    r: 2 + Math.random() * 2.5,
    tx: Math.random() * w,
    ty: Math.random() * h
  }));
}

function buildTextTargets() {
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = w;
  temp.height = h;

  const fontSize = Math.min(w * 0.18, 180);
  tctx.clearRect(0, 0, w, h);
  tctx.font = `800 ${fontSize}px Inter`;
  tctx.textAlign = "center";
  tctx.textBaseline = "middle";
  tctx.fillStyle = "white";
  tctx.fillText(TEXT, w / 2, h / 2);

  const imageData = tctx.getImageData(0, 0, w, h).data;
  targetPoints = [];

  for (let y = 0; y < h; y += 6) {
    for (let x = 0; x < w; x += 6) {
      const idx = (y * w + x) * 4;
      if (imageData[idx + 3] > 128) {
        targetPoints.push({ x, y });
      }
    }
  }

  particles.forEach((p, i) => {
    const t = targetPoints[i % targetPoints.length];
    p.tx = t.x;
    p.ty = t.y;
  });
}

function update() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach((p) => {
    if (mode === "text") {
      p.x += (p.tx - p.x) * 0.08;
      p.y += (p.ty - p.y) * 0.08;
    } else {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    ctx.beginPath();
    ctx.fillStyle = "rgba(0,229,255,0.7)";
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(update);
}

function handleScroll() {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;

  document.getElementById("scroll-progress").style.width = `${progress}%`;

  if (progress > 20 && progress < 60) {
    mode = "text";
  } else {
    mode = "scatter";
  }
}

window.addEventListener("scroll", handleScroll);

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const body = document.body;
    body.setAttribute("data-theme", body.getAttribute("data-theme") === "light" ? "dark" : "light");
  });
}

resize();
update();
