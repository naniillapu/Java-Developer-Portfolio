// Small, dependency-free interactions for the portfolio.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const copyButton = document.getElementById("copyEmail");
const copyStatus = document.getElementById("copyStatus");

copyButton?.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email copied";
  } catch {
    // Clipboard access may be blocked on file:// pages or in older browsers.
    copyStatus.textContent = email;
  }
  window.setTimeout(() => { copyStatus.textContent = ""; }, 3000);
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) => item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach((section) => observer.observe(section));
}
