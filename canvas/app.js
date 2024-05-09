let banner = document.querySelector('.banner');

    const canvas = document.getElementById('dotCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots = [];
    const maxDots = 50; 

    const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

    for (let i = 0; i < maxDots; i++) {
        const color = arrayColors[Math.floor(Math.random() * 5)];

        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        const size = Math.random() * 3 + 5;
        dots.push({ x, y, color, size });
    }

    function draw() {
        dots.forEach((dot, index) => {
            ctx.fillStyle = dot.color;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    draw();
    banner.addEventListener('mousemove', (event) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        const mouse = {
            x: event.clientX,
            y: event.clientY
        }
        dots.forEach((dot, index) => {
            const distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
            if (distance < 300) {
                ctx.strokeStyle = dot.color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        })
})
banner.addEventListener('mouseout', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
})
