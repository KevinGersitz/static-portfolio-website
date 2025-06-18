document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const toggleButton = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      localStorage.setItem(
        "theme",
        body.classList.contains("dark-mode") ? "dark" : "light"
      );
    });
  }

  const menuButton = document.getElementById("menuToggle");
  const nav = document.querySelector(".navbar");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const status = document.getElementById("formStatus");

      status.style.color = "black";
      status.innerHTML = "Nachricht wird gesendet...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.style.color = "green";
          status.innerHTML =
            "Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.";
          form.reset();
        } else {
          let errorText = "Ein Fehler ist aufgetreten.";
          try {
            const data = await response.json();
            if (data.errors) {
              errorText = data.errors.map((err) => err.emssage).join("<br>");
            }
          } catch (_) {}
          status.style.color = "red";
          status.innerHTML = errorText;
        }
      } catch (error) {
        status.style.color = "red";
        status.innerHTML =
          "Verbindungsfehler - bitte versuchen Sie es später erneut.";
      } finally {
      }
    });
  }
});
