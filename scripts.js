function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    card.style.display =
      category === "all" || card.classList.contains(category)
        ? "block"
        : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("close-btn");

  const closeMenu = () => {
    mobileMenu.classList.remove("show");
    overlay.classList.remove("show");
  };

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("show");
    overlay.classList.add("show");
  });

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});

// Show button when user scrolls down 20px
window.onscroll = function () {
  const btn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Scroll to top when button is clicked
function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
