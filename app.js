// ============================================================
// VARENYA CHIVUKULA — PORTFOLIO V4
// ============================================================


// ------------------------------------------------------------
// GLOBALS
// ------------------------------------------------------------

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const progressBar = document.querySelector(".progress span");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);


// ------------------------------------------------------------
// MOBILE NAVIGATION
// ------------------------------------------------------------

if (menu && nav) {
  menu.addEventListener("click", () => {
    const open =
      menu.getAttribute("aria-expanded") !== "true";

    menu.setAttribute(
      "aria-expanded",
      String(open)
    );

    nav.classList.toggle("open", open);

    menu.textContent =
      open ? "Close −" : "Menu +";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.setAttribute(
        "aria-expanded",
        "false"
      );

      nav.classList.remove("open");
      menu.textContent = "Menu +";
    });
  });
}


// ------------------------------------------------------------
// HEADER SCROLL STATE
// ------------------------------------------------------------

function updateHeader() {
  if (!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 25
  );
}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


// ------------------------------------------------------------
// PAGE PROGRESS
// ------------------------------------------------------------

function updateProgress() {
  if (!progressBar) return;

  const scrollable =
    document.documentElement.scrollHeight -
    window.innerHeight;

  if (scrollable <= 0) {
    progressBar.style.width = "0%";
    return;
  }

  const progress =
    Math.min(
      Math.max(
        window.scrollY / scrollable,
        0
      ),
      1
    );

  progressBar.style.width =
    `${progress * 100}%`;
}

window.addEventListener(
  "scroll",
  updateProgress,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateProgress
);

updateProgress();


// ------------------------------------------------------------
// REVEAL ON SCROLL
// ------------------------------------------------------------

const revealElements =
  document.querySelectorAll(".reveal");

if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion.matches
) {
  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting)
            return;

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.1,
        rootMargin:
          "0px 0px -45px 0px",
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


// ------------------------------------------------------------
// ACTIVE NAVIGATION
// ------------------------------------------------------------

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    'nav a[href^="#"]'
  );

if (
  "IntersectionObserver" in window &&
  sections.length
) {
  const sectionObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting)
            return;

          const id =
            entry.target.id;

          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
                `#${id}`
            );
          });
        });
      },
      {
        threshold: 0.2,
        rootMargin:
          "-25% 0px -55% 0px",
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


// ------------------------------------------------------------
// HERO SYSTEM VISUAL
// ------------------------------------------------------------

const heroSystem =
  document.querySelector(
    ".hero-system"
  );

if (
  heroSystem &&
  !prefersReducedMotion.matches
) {
  heroSystem.addEventListener(
    "pointermove",
    (event) => {
      const rect =
        heroSystem.getBoundingClientRect();

      const x =
        (event.clientX -
          rect.left) /
        rect.width;

      const y =
        (event.clientY -
          rect.top) /
        rect.height;

      const rotateX =
        (0.5 - y) * 3;

      const rotateY =
        (x - 0.5) * 3;

      heroSystem.style.setProperty(
        "--mouse-x",
        `${x * 100}%`
      );

      heroSystem.style.setProperty(
        "--mouse-y",
        `${y * 100}%`
      );

      heroSystem.style.transform =
        `perspective(1100px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;
    }
  );

  heroSystem.addEventListener(
    "pointerleave",
    () => {
      heroSystem.style.transform =
        "";

      heroSystem.style.removeProperty(
        "--mouse-x"
      );

      heroSystem.style.removeProperty(
        "--mouse-y"
      );
    }
  );
}


// ------------------------------------------------------------
// HERO NODES
// ------------------------------------------------------------

const heroNodes =
  document.querySelectorAll(
    ".system-node"
  );

heroNodes.forEach((node) => {
  node.addEventListener(
    "mouseenter",
    () => {
      heroNodes.forEach(
        (otherNode) => {
          if (otherNode !== node) {
            otherNode.classList.add(
              "muted"
            );
          }
        }
      );

      node.classList.add(
        "focused"
      );
    }
  );

  node.addEventListener(
    "mouseleave",
    () => {
      heroNodes.forEach(
        (otherNode) => {
          otherNode.classList.remove(
            "muted",
            "focused"
          );
        }
      );
    }
  );
});


// ------------------------------------------------------------
// INDUSTRIAL VISION SCANNER
// ------------------------------------------------------------

const visionFeed =
  document.querySelector(
    ".vision-feed"
  );

if (
  visionFeed &&
  !prefersReducedMotion.matches
) {
  visionFeed.addEventListener(
    "pointermove",
    (event) => {
      const rect =
        visionFeed.getBoundingClientRect();

      const x =
        ((event.clientX -
          rect.left) /
          rect.width) *
        100;

      const y =
        ((event.clientY -
          rect.top) /
          rect.height) *
        100;

      visionFeed.style.setProperty(
        "--scan-x",
        `${x}%`
      );

      visionFeed.style.setProperty(
        "--scan-y",
        `${y}%`
      );
    }
  );
}


// ------------------------------------------------------------
// PROJECT DETAILS
// ------------------------------------------------------------

const projectToggles =
  document.querySelectorAll(
    ".project-toggle"
  );

projectToggles.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      const panelId =
        button.getAttribute(
          "aria-controls"
        );

      const panel =
        document.getElementById(
          panelId
        );

      if (!panel) return;

      const opening =
        panel.hidden;

      panel.hidden = !opening;

      button.setAttribute(
        "aria-expanded",
        String(opening)
      );

      const openLabel =
        button.dataset.openLabel ||
        "View project details";

      const closeLabel =
        button.dataset.closeLabel ||
        "Close project details";

      button.innerHTML =
        opening
          ? `${closeLabel} <span>−</span>`
          : `${openLabel} <span>↗</span>`;
    }
  );
});


// ------------------------------------------------------------
// INTERACTIVE CARDS
// ------------------------------------------------------------

const cards =
  document.querySelectorAll(
    ".project-card, .case-study, .experience-feature, .paper"
  );

if (!prefersReducedMotion.matches) {
  cards.forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect =
          card.getBoundingClientRect();

        const x =
          ((event.clientX -
            rect.left) /
            rect.width) *
          100;

        const y =
          ((event.clientY -
            rect.top) /
            rect.height) *
          100;

        card.style.setProperty(
          "--pointer-x",
          `${x}%`
        );

        card.style.setProperty(
          "--pointer-y",
          `${y}%`
        );
      }
    );

    card.addEventListener(
      "pointerleave",
      () => {
        card.style.removeProperty(
          "--pointer-x"
        );

        card.style.removeProperty(
          "--pointer-y"
        );
      }
    );
  });
}


// ------------------------------------------------------------
// METRIC COUNTERS
// ------------------------------------------------------------

const counters =
  document.querySelectorAll(
    "[data-count]"
  );

function animateCounter(element) {
  const target =
    Number(
      element.dataset.count
    );

  if (
    Number.isNaN(target)
  ) {
    return;
  }

  const decimals =
    Number(
      element.dataset.decimals ||
      0
    );

  const suffix =
    element.dataset.suffix || "";

  const prefix =
    element.dataset.prefix || "";

  const duration = 1200;

  const start =
    performance.now();

  function frame(now) {
    const elapsed =
      now - start;

    const progress =
      Math.min(
        elapsed / duration,
        1
      );

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );

    const value =
      target * eased;

    element.textContent =
      `${prefix}${value.toFixed(
        decimals
      )}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(
        frame
      );
    }
  }

  requestAnimationFrame(frame);
}

if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion.matches
) {
  const counterObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(
          (entry) => {
            if (
              !entry.isIntersecting
            )
              return;

            animateCounter(
              entry.target
            );

            observer.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.6,
      }
    );

  counters.forEach(
    (counter) => {
      counterObserver.observe(
        counter
      );
    }
  );
} else {
  counters.forEach(
    (counter) => {
      const target =
        counter.dataset.count;

      const suffix =
        counter.dataset.suffix ||
        "";

      const prefix =
        counter.dataset.prefix ||
        "";

      counter.textContent =
        `${prefix}${target}${suffix}`;
    }
  );
}


// ------------------------------------------------------------
// BUTTERFLY
// ------------------------------------------------------------

const butterfly =
  document.querySelector(
    ".flying-butterfly"
  );

const motionButton =
  document.querySelector(
    ".butterfly-motion"
  );

function setButterflyPaused(
  paused
) {
  if (
    !butterfly ||
    !motionButton
  )
    return;

  butterfly.classList.toggle(
    "paused",
    paused
  );

  motionButton.setAttribute(
    "aria-pressed",
    String(paused)
  );

  motionButton.textContent =
    paused
      ? "Let butterfly fly"
      : "Pause butterfly";
}

if (
  butterfly &&
  motionButton
) {
  setButterflyPaused(
    prefersReducedMotion.matches
  );

  motionButton.addEventListener(
    "click",
    () => {
      const paused =
        motionButton.getAttribute(
          "aria-pressed"
        ) === "true";

      setButterflyPaused(
        !paused
      );
    }
  );

  if (
    typeof prefersReducedMotion
      .addEventListener ===
    "function"
  ) {
    prefersReducedMotion.addEventListener(
      "change",
      (event) => {
        setButterflyPaused(
          event.matches
        );
      }
    );
  }
}


// ------------------------------------------------------------
// SMOOTH INTERNAL LINKS
// ------------------------------------------------------------

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const href =
          link.getAttribute(
            "href"
          );

        if (
          !href ||
          href === "#"
        )
          return;

        const target =
          document.querySelector(
            href
          );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior:
            prefersReducedMotion.matches
              ? "auto"
              : "smooth",
          block: "start",
        });

        history.replaceState(
          null,
          "",
          href
        );
      }
    );
  });


// ------------------------------------------------------------
// ESCAPE KEY
// ------------------------------------------------------------

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key !== "Escape"
    )
      return;

    if (
      nav &&
      nav.classList.contains(
        "open"
      )
    ) {
      nav.classList.remove(
        "open"
      );

      if (menu) {
        menu.setAttribute(
          "aria-expanded",
          "false"
        );

        menu.textContent =
          "Menu +";

        menu.focus();
      }
    }

    projectToggles.forEach(
      (button) => {
        const panelId =
          button.getAttribute(
            "aria-controls"
          );

        const panel =
          document.getElementById(
            panelId
          );

        if (
          !panel ||
          panel.hidden
        )
          return;

        panel.hidden = true;

        button.setAttribute(
          "aria-expanded",
          "false"
        );

        const openLabel =
          button.dataset.openLabel ||
          "View project details";

        button.innerHTML =
          `${openLabel} <span>↗</span>`;
      }
    );
  }
);
