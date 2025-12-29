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

    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, h * 0.3);

        for (let x = 0; x < w; x++) {
            const y =
                h * 0.3 +
                Math.sin(x * 0.002 + t + i) * 40 +
                Math.sin(x * 0.005 + t * 2 + i) * 20;
            ctx.lineTo(x, y + i * 80);
        }

        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, `hsla(${200 + i * 40}, 70%, 60%, 0.15)`);
        gradient.addColorStop(1, `hsla(${260 + i * 40}, 70%, 60%, 0.05)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

draw();
