/* ------------------------------
   Background Animation
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

    for (let i = 0; i < 4; i++) {
        ctx.beginPath();

        for (let x = 0; x < w; x++) {
            const y =
                h * 0.3 +
                Math.sin(x * 0.002 + t + i) * (30 + i * 10) +
                Math.sin(x * 0.005 + t * 2 + i) * (15 + i * 5);

            ctx.lineTo(x, y + i * 70);
        }

        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, `hsla(${180 + i * 20}, 40%, 40%, 0.15)`);
        gradient.addColorStop(1, `hsla(${200 + i * 20}, 40%, 40%, 0.05)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
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
        const top = el.getBoundingClientRect().top;
        if (top < trigger) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
