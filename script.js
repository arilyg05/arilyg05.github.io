/* ==========================================
PREMIUM PORTFOLIO JS - PART 1
========================================== */

/* ==========================================
SAFE QUERY HELPER
========================================== */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================
LOADER (SAFE)
========================================== */
window.addEventListener("load", () => {
    const loader = $("#loader");

    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 1200);
});


/* ==========================================
CUSTOM CURSOR GLOW (SAFE)
========================================== */
const cursor = $(".cursor");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}


/* ==========================================
TYPING EFFECT (PREMIUM VERSION)
========================================== */
const typingElement = $("#typing");

if (typingElement) {

    const texts = [
        "Marketing Communication Student",
        "Creative Marketing Enthusiast",
        "Public Relations Enthusiast",
        "Content Creator",
        "Branding & Event Management"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const current = texts[textIndex];

        if (!isDeleting) {
            typingElement.textContent = current.substring(0, charIndex++);
        } else {
            typingElement.textContent = current.substring(0, charIndex--);
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex > current.length) {
            isDeleting = true;
            speed = 1500;
        }

        if (isDeleting && charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            charIndex = 0;
            speed = 500;
        }

        setTimeout(typeLoop, speed);
    }

    typeLoop();
}


/* ==========================================
SMOOTH SCROLL (NAV LINK)
========================================== */
$$("nav ul li a").forEach(link => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");

        if (targetId && targetId.startsWith("#")) {
            e.preventDefault();

            const target = document.querySelector(targetId);

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        }
    });
});


/* ==========================================
AURORA BACKGROUND (CANVAS - BASIC VERSION)
========================================== */
const canvas = document.getElementById("aurora");

if (canvas) {
    const ctx = canvas.getContext("2d");

    let w, h;
    let blobs = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    function createBlobs() {
        blobs = [];

        for (let i = 0; i < 6; i++) {
            blobs.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 120 + Math.random() * 200,
                dx: (Math.random() - 0.5) * 0.6,
                dy: (Math.random() - 0.5) * 0.6,
                hue: Math.random() * 360
            });
        }
    }

    function drawBlobs() {
        ctx.clearRect(0, 0, w, h);

        for (let b of blobs) {
            const gradient = ctx.createRadialGradient(
                b.x, b.y, 0,
                b.x, b.y, b.r
            );

            gradient.addColorStop(0, `hsla(${b.hue}, 80%, 60%, 0.35)`);
            gradient.addColorStop(1, "transparent");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fill();

            b.x += b.dx;
            b.y += b.dy;

            if (b.x < -200 || b.x > w + 200) b.dx *= -1;
            if (b.y < -200 || b.y > h + 200) b.dy *= -1;
        }

        requestAnimationFrame(drawBlobs);
    }

    createBlobs();
    drawBlobs();
}
/* ==========================================
PREMIUM PORTFOLIO JS - PART 2
INTERACTION + SCROLL SYSTEM
========================================== */


/* ==========================================
SCROLL REVEAL (IMPROVED)
========================================== */
const revealElements = $$(".reveal");

function revealOnScroll() {
    if (!revealElements.length) return;

    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((el) => {
        const boxTop = el.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ==========================================
ACTIVE NAVBAR SECTION HIGHLIGHT
========================================== */
const sections = $$("section");
const navLinks = $$("nav ul li a");

function activeNavbar() {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", activeNavbar);


/* ==========================================
NAVBAR BLUR ON SCROLL
========================================== */
const navbar = document.querySelector("nav");

function navbarBlur() {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.backdropFilter = "blur(10px)";
        navbar.style.background = "rgba(0,0,0,0.4)";
    } else {
        navbar.style.backdropFilter = "blur(0px)";
        navbar.style.background = "transparent";
    }
}

window.addEventListener("scroll", navbarBlur);


/* ==========================================
SCROLL PROGRESS BAR
========================================== */
const progressBar = document.createElement("div");

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "3px";
progressBar.style.width = "0%";
progressBar.style.background = "linear-gradient(90deg,#00f5ff,#8a2be2)";
progressBar.style.zIndex = "9999";

document.body.appendChild(progressBar);

function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", updateProgressBar);


/* ==========================================
COUNTER ANIMATION (NUMBER INCREASE)
========================================== */
const counters = $$(".counter");

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;

        const speed = target / 80;

        function update() {
            count += speed;

            if (count < target) {
                counter.textContent = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }

        update();
    });
}


/* Trigger counter when visible */
function handleCounterScroll() {
    const trigger = window.innerHeight * 0.85;

    counters.forEach(counter => {
        const top = counter.getBoundingClientRect().top;

        if (top < trigger && !counter.classList.contains("done")) {
            counter.classList.add("done");
            animateCounters();
        }
    });
}

window.addEventListener("scroll", handleCounterScroll);
/* ==========================================
PREMIUM PORTFOLIO JS - PART 3
FINAL POLISH + EFFECTS
========================================== */


/* ==========================================
MOUSE PARTICLE TRAIL
========================================== */
const particles = [];

document.addEventListener("mousemove", (e) => {
    particles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 2,
        life: 1
    });

    if (particles.length > 80) {
        particles.shift();
    }
});

function drawParticles() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9998";

    document.body.appendChild(canvas);

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.life -= 0.02;

            if (p.life <= 0) {
                particles.splice(i, 1);
                return;
            }

            ctx.beginPath();
            ctx.fillStyle = `rgba(0, 245, 255, ${p.life})`;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

drawParticles();


/* ==========================================
FLOATING LIGHTS (BACKGROUND DEPTH)
========================================== */
function createFloatingLights() {
    const container = document.body;

    for (let i = 0; i < 12; i++) {
        const light = document.createElement("div");

        light.className = "floating-light";

        light.style.position = "fixed";
        light.style.width = Math.random() * 200 + 100 + "px";
        light.style.height = light.style.width;
        light.style.background = "radial-gradient(circle, rgba(138,43,226,0.25), transparent)";
        light.style.borderRadius = "50%";
        light.style.left = Math.random() * 100 + "vw";
        light.style.top = Math.random() * 100 + "vh";
        light.style.filter = "blur(40px)";
        light.style.animation = `float ${10 + Math.random() * 20}s infinite linear`;
        light.style.zIndex = "0";

        container.appendChild(light);
    }
}

createFloatingLights();


/* ==========================================
PORTFOLIO MODAL POPUP
========================================== */
const modal = document.createElement("div");

modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.background = "rgba(0,0,0,0.8)";
modal.style.display = "none";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
modal.style.zIndex = "10000";

modal.innerHTML = `
<div style="
    background:#111;
    padding:30px;
    border-radius:12px;
    max-width:500px;
    color:white;
">
    <h2 id="modal-title">Project</h2>
    <p id="modal-desc">Description</p>
    <button id="closeModal" style="
        margin-top:20px;
        padding:10px 20px;
        cursor:pointer;
        background:#00f5ff;
        border:none;
        border-radius:8px;
    ">Close</button>
</div>
`;

document.body.appendChild(modal);

const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        modal.style.display = "flex";

        modalTitle.textContent =
            card.getAttribute("data-title") || "Project Title";

        modalDesc.textContent =
            card.getAttribute("data-desc") || "Project Description";
    });
});

document.addEventListener("click", (e) => {
    if (e.target.id === "closeModal" || e.target === modal) {
        modal.style.display = "none";
    }
});


/* ==========================================
PARALLAX SCROLL EFFECT (LIGHT)
========================================== */
const parallaxElements = $$(".parallax");

function parallaxScroll() {
    let scrollY = window.scrollY;

    parallaxElements.forEach(el => {
        let speed = el.getAttribute("data-speed") || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

window.addEventListener("scroll", parallaxScroll);


/* ==========================================
PERFORMANCE THROTTLE (LIGHT OPTIMIZATION)
========================================== */
let ticking = false;

function optimizedScroll(callback) {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            callback();
            ticking = false;
        });
        ticking = true;
    }
}

/* OPTIONAL: contoh penggunaan
window.addEventListener("scroll", () => {
    optimizedScroll(() => {
        activeNavbar();
        revealOnScroll();
        navbarBlur();
        updateProgressBar();
        handleCounterScroll();
        parallaxScroll();
    });
});
*/