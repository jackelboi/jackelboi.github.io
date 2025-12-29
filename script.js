/* ------------------------------
   Turbulent Gradient Clouds
--------------------------------*/
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let t = 0;

function drawClouds() {
    t += 0.003;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const scroll = window.scrollY || window.pageYOffset || 0;
    const scrollFactor = scroll * 0.0007;

    // Soft base wash
    const baseGrad = ctx.createLinearGradient(0, 0, w, h);
    baseGrad.addColorStop(0, "rgba(254, 255, 239, 1)");
    baseGrad.addColorStop(1, "rgba(246, 251, 250, 1)");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);

    // Turbulent cloud layers
    const layers = 6;

    for (let i = 0; i < layers; i++) {
        const depth = i / layers;
        const radius = Math.max(w, h) * (0.5 + depth);

        const offsetX =
            Math.sin(t * (0.6 + depth) + i * 1.7) * (200 + 200 * depth) +
            scrollFactor * 900 * (depth - 0.5);
        const offsetY =
            Math.cos(t * (0.4 + depth) + i * 2.1) * (160 + 140 * depth) +
            scrollFactor * 1200 * (depth - 0.3);

        const cx = w / 2 + offsetX;
        const cy = h / 2 + offsetY;

        const baseHue = 180; // teal-ish
        const hueShift = scrollFactor * 220;
        const hue = baseHue + hueShift + i * 10;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${hue}, 55%, 70%, ${0.16 - depth * 0.03})`);
        grad.addColorStop(0.6, `hsla(${hue + 20}, 60%, 80%, ${0.10 - depth * 0.02})`);
        grad.addColorStop(1, `hsla(${hue + 40}, 70%, 90%, 0)`);

        ctx.globalCompositeOperation = "soft-light";
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
