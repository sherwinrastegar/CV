document.querySelectorAll("[data-slider]").forEach((slider) => {
  const images = slider.querySelectorAll("img");
  let index = 0;

  const show = (i) => {
    images.forEach((img) => img.classList.remove("active"));
    images[i].classList.add("active");
  };

  slider.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    show(index);
  });

  slider.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    show(index);
  });
});
