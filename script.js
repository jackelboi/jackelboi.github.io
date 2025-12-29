/* ------------------------------
   Animated Blobs Background
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

function draw() {
    t += 0.003;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const scroll = window.scrollY * 0.002;

    for (let i = 0; i < 4; i++) {
        const radius = 300 + i * 120;
        const x = w / 2 + Math.sin(t + i) * 200 * (i * 0.3 + 1);
        const y = h / 2 + Math.cos(t * 0.7 + i) * 150 * (i * 0.3 + 1) + scroll * 200;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `hsla(${180 + i * 20}, 60%, 70%, 0.25)`);
        gradient.addColorStop(1, `hsla(${200 + i * 20}, 60%, 70%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(draw);
}
draw();

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
