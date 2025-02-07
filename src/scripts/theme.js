var themeToggleBtn = document.getElementById("theme-toggle");
function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add("".concat(theme, "-mode"));
    themeToggleBtn.textContent = theme === "light" ? "Light Mode" : "Dark Mode";
    localStorage.setItem("theme", theme);
}
document.addEventListener("DOMContentLoaded", function () {
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    }
    else {
        applyTheme(getSystemTheme());
    }
});
themeToggleBtn.addEventListener("click", function () {
    var currentTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
    applyTheme(currentTheme);
});
