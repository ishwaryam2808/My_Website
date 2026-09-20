/* =========================================================
   ICEEE PORTFOLIO — INTERACTIVE JAVASCRIPT
   ========================================================= */


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   SCROLL TO TOP
   ========================================================= */

const scrollTopButton = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }

});


scrollTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   PARTICLE NETWORK
   ========================================================= */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

const particleCount =
    window.innerWidth < 700 ? 35 : 70;


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}


resizeCanvas();

window.addEventListener("resize", () => {

    resizeCanvas();

    createParticles();

});


/* =========================================================
   CREATE PARTICLES
   ========================================================= */

function createParticles() {

    particles = [];

    for (let i = 0; i < particleCount; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size: Math.random() * 1.8 + 0.5,

            speedX:
                (Math.random() - 0.5) * 0.35,

            speedY:
                (Math.random() - 0.5) * 0.35

        });

    }

}


createParticles();


/* =========================================================
   DRAW PARTICLES
   ========================================================= */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach((particle) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;


        /* Wrap particles around screen */

        if (particle.x < 0) {
            particle.x = canvas.width;
        }

        if (particle.x > canvas.width) {
            particle.x = 0;
        }

        if (particle.y < 0) {
            particle.y = canvas.height;
        }

        if (particle.y > canvas.height) {
            particle.y = 0;
        }


        /* Particle */

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(145, 130, 255, 0.65)";

        ctx.fill();

    });


    /* Connect nearby particles */

    for (let i = 0; i < particles.length; i++) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < 130) {

                const opacity =
                    1 - distance / 130;


                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(120, 105, 255, ${opacity * 0.18})`;

                ctx.lineWidth = 0.6;

                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(drawParticles);

}


drawParticles();


/* =========================================================
   CURSOR GLOW
   ========================================================= */

const cursorGlow = document.createElement("div");

cursorGlow.style.position = "fixed";
cursorGlow.style.width = "180px";
cursorGlow.style.height = "180px";
cursorGlow.style.borderRadius = "50%";
cursorGlow.style.pointerEvents = "none";
cursorGlow.style.zIndex = "999";
cursorGlow.style.transform = "translate(-50%, -50%)";
cursorGlow.style.background =
    "radial-gradient(circle, rgba(120,100,255,0.12), transparent 70%)";
cursorGlow.style.filter = "blur(10px)";

document.body.appendChild(cursorGlow);


document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* =========================================================
   PROJECT CARD TILT
   ========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;


        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0)";

    });

});


/* =========================================================
   SKILL CARD INTERACTION
   ========================================================= */

const skillCards =
    document.querySelectorAll(".skill-card");


skillCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        card.style.background =
            `radial-gradient(
                circle at ${x}px ${y}px,
                rgba(120,100,255,0.12),
                rgba(255,255,255,0.025) 45%
            )`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.background =
            "rgba(255,255,255,0.025)";

    });

});


/* =========================================================
   THEME TOGGLE
   ========================================================= */

const themeToggle =
    document.getElementById("themeToggle");


let lightMode = false;


themeToggle.addEventListener("click", () => {

    lightMode = !lightMode;

    document.body.classList.toggle(
        "light-mode",
        lightMode
    );


    themeToggle.textContent =
        lightMode ? "☾" : "☀";

});


/* =========================================================
   NAVIGATION ACTIVE STATE
   ========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%c ICEEE PORTFOLIO ",
    "background:#7566d9;color:white;padding:8px;font-weight:bold;"
);

console.log(
    "Built with curiosity & code 🚀"
);