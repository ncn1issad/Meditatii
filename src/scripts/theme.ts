const themeToggleBtn = document.getElementById("theme-toggle") as HTMLButtonElement;

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${theme}-mode`);
    themeToggleBtn.textContent = theme === "light" ? "Light Mode" : "Dark Mode";
    localStorage.setItem("theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme as "light" | "dark");
    } else {
        applyTheme(getSystemTheme());
    }
});

themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
    applyTheme(currentTheme);
});