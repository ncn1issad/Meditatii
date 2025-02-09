"use strict";
const themeToggleBtn = document.getElementById("theme-toggle");
const lightTheme = {
    "--bg-color": "#f5f5f5",
    "--text-color": "black",
    "--second-text": "white",
};
const darkTheme = {
    "--bg-color": "#333",
    "--text-color": "white",
    "--second-text": "white",
};
function applyTheme(theme) {
    Object.keys(theme).forEach((key) => {
        document.documentElement.style.setProperty(key, theme[key]);
    });
    localStorage.setItem("theme", theme === lightTheme ? "light" : "dark");
    themeToggleBtn.textContent = theme === lightTheme ? "Dark mode" : "Light mode";
}
function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme) {
        applyTheme(savedTheme === "light" ? lightTheme : darkTheme);
    }
    else {
        applyTheme(systemPrefersDark ? darkTheme : lightTheme);
    }
}
themeToggleBtn.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme");
    applyTheme(currentTheme === "light" ? darkTheme : lightTheme);
});
document.addEventListener("DOMContentLoaded", initTheme);
