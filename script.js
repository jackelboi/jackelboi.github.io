/* ------------------------------
   Turbulent Gradient Clouds
--------------------------------*/
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resizeClouds() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeClouds();
window.addEventListener("resize", resizeClouds);

let t = 0;

function drawClouds() {
    t += 0.003;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const scroll = window.scrollY || 0;
    const scrollFactor = scroll * 0.0007;

    const baseGrad = ctx.createLinearGradient(0, 0, w, h);
    baseGrad.addColorStop(0, "rgba(254, 255, 239, 1)");
    baseGrad.addColorStop(1, "rgba(233, 244, 246, 1)");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);

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

        const hue = 180 + scrollFactor * 200 + i * 15;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${hue}, 65%, 70%, ${0.35 - depth * 0.05})`);
        grad.addColorStop(0.5, `hsla(${hue + 20}, 70%, 80%, ${0.25 - depth * 0.04})`);
        grad.addColorStop(1, `hsla(${hue + 40}, 80%, 90%, 0)`);

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
   Navy Ribbon Waves
--------------------------------*/
const waveCanvas = document.getElementById("wave-canvas");
const waveCtx = waveCanvas.getContext("2d");

function resizeWaves() {
    waveCanvas.width = window.innerWidth;
    waveCanvas.height = window.innerHeight;
}
resizeWaves();
window.addEventListener("resize", resizeWaves);

let waveT = 0;

function drawWaves() {
    waveT += 0.008;

    const w = waveCanvas.width;
    const h = waveCanvas.height;

    waveCtx.clearRect(0, 0, w, h);

    const scroll = window.scrollY || 0;
    const scrollShift = scroll * 0.002;

    const layers = 4;

    for (let i = 0; i < layers; i++) {
        const amplitude = 40 + i * 25;
        const wavelength = 0.004 + i * 0.0015;
        const speed = 0.6 + i * 0.2;

        waveCtx.beginPath();

        for (let x = 0; x <= w; x++) {
            const y =
                h * 0.5 +
                Math.sin(x * wavelength + waveT * speed + i) * amplitude +
                Math.cos(x * wavelength * 0.6 + waveT * speed * 0.7) * (amplitude * 0.4) +
                scrollShift * (i * 40);

            if (x === 0) waveCtx.moveTo(x, y);
            else waveCtx.lineTo(x, y);
        }

        const navy = `hsla(220, 45%, ${20 + i * 8}%, ${0.18 - i * 0.03})`;

        waveCtx.strokeStyle = navy;
        waveCtx.lineWidth = 2 + i * 0.7;
        waveCtx.stroke();
    }

    requestAnimationFrame(drawWaves);
}

drawWaves();

/* ------------------------------
   Reveal on Scroll
--------------------------------*/
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    reveals.forEach((el) => {
        if (el.getBoundingClientRect().top < trigger) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
