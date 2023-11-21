//Cloud Animations
const canvas = document.getElementById("landing-canvas");
canvas.style.width = window.innerWidth > 1920 ? window.innerWidth : 1920;
canvas.style.height = window.innerHeight > 1080 ? window.innerHeight : 1080;
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth > 1920 ? window.innerWidth : 1920;
ctx.canvas.height = window.innerHeight > 1080 ? window.innerHeight : 1080;

const clouds = [];

for (let i = 0; i < 15; i++) {
    if (Math.random() > 0.5) {
        var image = new Image();
        image.src = `images/Cloud-${Math.floor(Math.random() * 6) + 1}.svg`;
        image.onload = function () {
            clouds.push({
                type: this,
                x: Math.random() * ctx.canvas.width,
                y: Math.random() * window.innerHeight * 0.85 + window.innerHeight * 0.15,
                size: Math.random() * 0.5 + 0.75,
                opacity: Math.random() * 0.25 + 0.1,
                speed: Math.random() * 0.2 + 0.1,
            })
        }
    }
}

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clouds.forEach(cloud => {
        ctx.globalAlpha = cloud.opacity;
        cloud.x = cloud.x + cloud.speed;
        ctx.drawImage(cloud.type, cloud.x, cloud.y, cloud.type.width * cloud.size, cloud.type.height * cloud.size);
        if (cloud.x > ctx.canvas.width) {
            clouds.splice(clouds.indexOf(cloud), 1);
        }
    })
}, 10)

setInterval(() => {
    if (Math.random() > 0.5 && clouds.length <= 10) {
        var image = new Image();
        image.src = `images/Cloud-${Math.floor(Math.random() * 6) + 1}.svg`;
        image.onload = function () {
            clouds.push({
                type: this,
                x: -200,
                y: Math.random() * window.innerHeight * 0.85 + window.innerHeight * 0.15,
                size: Math.random() * 0.5 + 0.75,
                opacity: Math.random() * 0.25 + 0.1,
                speed: Math.random() * 0.4 + 0.1,
            })
        }
    }
}, 1000)