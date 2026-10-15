const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const form = document.querySelector("#reserve-form");
const statusEl = document.querySelector("#form-status");
const dateInput = document.querySelector("#date");

if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
}

if (form && statusEl) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      statusEl.textContent = "Please fill in name, email, date, and time.";
      statusEl.style.color = "#c45c3a";
      form.reportValidity();
      return;
    }
    statusEl.style.color = "#5f7f6a";
    statusEl.textContent =
      "Request received. A host will email you to confirm within a few hours. For same-day seats, call (503) 555-0148.";
    form.reset();
    if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
  });
}
