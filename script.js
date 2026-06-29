/* =========================================
   Portfolio — script.js
   ========================================= */

/* ─── Navbar Scroll State ─── */
const navbar = document.getElementById("navbar");
let navbarScrolled = false;

const updateNavbarState = () => {
  if (!navbar) return;

  const shouldScroll = window.scrollY > 24;
  if (shouldScroll !== navbarScrolled) {
    navbarScrolled = shouldScroll;
    navbar.classList.toggle("scrolled", shouldScroll);
  }
};

window.addEventListener("scroll", updateNavbarState, { passive: true });
window.addEventListener("load", updateNavbarState);
updateNavbarState();

/* ─── Mobile Menu Toggle ─── */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu on link click
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

/* ─── Smooth Scroll for All Anchor Links ─── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ─── Active Nav Link Highlight ─── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px" },
);

sections.forEach((s) => sectionObserver.observe(s));

/* ─── Scroll Reveal (Intersection Observer) ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ─── Staggered Children Reveal ─── */
// Add incremental delays to sibling .reveal elements inside grids
document.querySelectorAll(".grid").forEach((grid) => {
  const cards = grid.querySelectorAll(".reveal");
  cards.forEach((card, i) => {
    // Only override if no inline delay set
    if (!card.style.transitionDelay) {
      card.style.transitionDelay = `${i * 0.08}s`;
    }
  });
});

/* ─── Email Copy ─── */
function copyEmail() {
  const email = document.getElementById("emailText").textContent;
  const hint = document.getElementById("copyHint");

  navigator.clipboard
    .writeText(email)
    .then(() => {
      hint.textContent = "✓ 복사됨!";
      hint.style.color = "#7C3AED";
      setTimeout(() => {
        hint.textContent = "클릭하여 복사";
        hint.style.color = "";
      }, 2000);
    })
    .catch(() => {
      // Fallback for browsers without clipboard API
      hint.textContent = email;
      setTimeout(() => {
        hint.textContent = "클릭하여 복사";
      }, 3000);
    });
}

/* ─── Hero Typing Effect (Cursor blink simulation) ─── */
// Nothing intrusive — just a subtle cursor blink on the last headline word
(function initTypingCursor() {
  const heroH1 = document.querySelector("#hero h1");
  if (!heroH1) return;

  // Insert a blinking cursor span after the gradient-text
  const gradientEl = heroH1.querySelector(".gradient-text");
  if (!gradientEl) return;

  const cursor = document.createElement("span");
  cursor.textContent = "|";
  cursor.style.cssText = `
    display: inline-block;
    width: 3px;
    height: 0.85em;
    background: #7C3AED;
    margin-left: 4px;
    vertical-align: middle;
    border-radius: 2px;
    animation: blink 1.1s step-start infinite;
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }
  `;
  document.head.appendChild(styleTag);

  // Append after gradient text
  gradientEl.parentNode.insertBefore(cursor, gradientEl.nextSibling);

  // Remove cursor after 4s
  setTimeout(() => {
    cursor.style.animation = "none";
    cursor.style.opacity = "0";
    cursor.style.transition = "opacity 0.5s";
  }, 4000);
})();

/* ─── Parallax Glow Orbs on Mouse Move (Desktop only) ─── */
if (window.matchMedia("(hover: hover)").matches) {
  const hero = document.getElementById("hero");
  const orbs = hero ? hero.querySelectorAll(".rounded-full.blur-3xl") : [];

  hero &&
    hero.addEventListener("mousemove", (e) => {
      const { clientX: x, clientY: y } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;

      orbs.forEach((orb, i) => {
        const factor = i === 0 ? 18 : 10;
        orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
        orb.style.transition =
          "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)";
      });
    });
}

/* ─── Tech Badge: Random glow color on hover ─── */
document.querySelectorAll(".tech-badge").forEach((badge) => {
  badge.addEventListener("mouseenter", () => {
    const color = badge.dataset.color;
    const colors = {
      orange: "rgba(234,88,12,0.2)",
      blue: "rgba(21,114,182,0.2)",
      yellow: "rgba(234,179,8,0.15)",
      cyan: "rgba(6,182,212,0.2)",
      white: "rgba(255,255,255,0.08)",
      green: "rgba(34,197,94,0.15)",
      violet: "rgba(124,58,237,0.2)",
      pink: "rgba(236,72,153,0.2)",
    };
    badge.style.boxShadow = `0 0 20px ${colors[color] || "rgba(124,58,237,0.2)"}`;
    badge.style.background = colors[color] || "rgba(124,58,237,0.1)";
  });
  badge.addEventListener("mouseleave", () => {
    badge.style.boxShadow = "";
    badge.style.background = "";
  });
});
