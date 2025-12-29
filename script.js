/* ------------------------------
   Turbulent Gradient Clouds (High Contrast)
--------------------------------*/
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

// Safety check: if canvas is missing, stop
if (!canvas || !ctx) {
    console.error("Canvas element with id 'bg-canvas' not found.");
}

function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let t = 0;

function drawClouds() {
    if (!canvas || !ctx) return;

    t += 0.003;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const scroll = window.scrollY || window.pageYOffset || 0;
    const scrollFactor = scroll * 0.0007;

    // Base background
    const baseGrad = ctx.createLinearGradient(0, 0, w, h);
    baseGrad.addColorStop(0, "rgba(254, 255, 239, 1)");
    baseGrad.addColorStop(1, "rgba(233, 244, 246, 1)");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);

    // More visible cloud layers
    const layers = 5;

    for (let i = 0; i < layers; i++) {
        const depth = i / layers;
        const radius = Math.max(w, h) * (0.45 + depth * 0.7);

        const offsetX =
            Math.sin(t * (0.7 + depth) + i * 1.5) * (180 + 180 * depth) +
            scrollFactor * 800 * (depth - 0.5);
        const offsetY =
            Math.cos(t * (0.5 + depth) + i * 2.3) * (140 + 120 * depth) +
            scrollFactor * 1000 * (depth - 0.3);

        const cx = w / 2 + offsetX;
        const cy = h / 2 + offsetY;

        const baseHue = 180; // teal-ish
        const hueShift = scrollFactor * 200;
        const hue = baseHue + hueShift + i * 15;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${hue}, 65%, 70%, ${0.35 - depth * 0.05})`);
        grad.addColorStop(0.5, `hsla(${hue + 20}, 70%, 80%, ${0.25 - depth * 0.04})`);
        grad.addColorStop(1, `hsla(${hue + 40}, 80%, 90%, 0)`);

        // Use normal blending so it's clearly visible everywhere
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";

    requestAnimationFrame(drawClouds);
}

drawClouds();

/* ------------------------------
   Reveal on Scroll
--------------------------------*/
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
