const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const logo_png = document.querySelector(".logo_png");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  logo_png.classList.remove("animation");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});