// =====================================================
// PERSONAL WORKSPACE PORTFOLIO — INTERACTIONS
// =====================================================

const menuButton = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section[id]");

// Mobile navigation
if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
        const open = mobileMenu.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(open));
    });
}

mobileLinks.forEach(link => {
    link.addEventListener("click", event => {
        const targetSelector = link.getAttribute("href");
        const target = targetSelector
            ? document.querySelector(targetSelector)
            : null;

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            history.pushState(null, "", targetSelector);
        }

        mobileMenu?.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");
    });
});

// Highlight current section in the desktop workspace navigation
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navItems.forEach(item => {
                    item.classList.toggle(
                        "active",
                        item.getAttribute("href") === `#${id}`
                    );
                });
            }
        });
    },
    {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
    }
);

sections.forEach(section => observer.observe(section));

// Current year
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Small paper-card parallax effect on desktop
const desk = document.querySelector(".desk");

if (desk && window.matchMedia("(min-width: 801px)").matches) {
    desk.addEventListener("mousemove", event => {
        const rect = desk.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        desk.style.transform = `translate(${x * 7}px, ${y * 7}px)`;
    });

    desk.addEventListener("mouseleave", () => {
        desk.style.transform = "";
    });
}

// Modal
function openCertificate(image) {
    const modal = document.getElementById("certificate-modal");
    const preview = document.getElementById("certificate-preview");

    preview.src = image;
    modal.classList.add("active");
}

function closeCertificate() {
    const modal = document.getElementById("certificate-modal");

    modal.classList.remove("active");
}

// Soft cursor-following highlight on desktop.
const root = document.documentElement;
let cursorFrame;

window.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse") return;

    if (cursorFrame) cancelAnimationFrame(cursorFrame);

    cursorFrame = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${event.clientX}px`);
        root.style.setProperty("--cursor-y", `${event.clientY}px`);
        document.body.classList.add("cursor-active");
    });
});

window.addEventListener("pointerleave", () => {
    document.body.classList.remove("cursor-active");
});
