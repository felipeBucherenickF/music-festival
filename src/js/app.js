document.addEventListener("DOMContentLoaded", () => initiateApp());

const initiateApp = () => {
  createGallery();
  scrollNav();
  navFixed();
};

const scrollNav = () => {
  const links = document.querySelectorAll(".navbar a");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionId = event.target.attributes.href.value;
      const section = document.querySelector(sectionId);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
};

const navFixed = () => {
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const about = document.querySelector(".about");
  window.addEventListener("scroll", () => {
    if (about.getBoundingClientRect().bottom < 0) {
      header.classList.add("fixed");
      body.classList.add("scroll-body");
    } else {
      header.classList.remove("fixed");
      body.classList.remove("scroll-body");
    }
  });
};

const createGallery = () => {
  const gallery = document.querySelector(".gallery__images");
  for (let i = 1; i <= 12; i++) {
    const galleryImage = document.createElement("li");
    galleryImage.innerHTML = `
    <picture>
    <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
    <img
      loading="lazy"
      width="200"
      height="300"
      src="build/img/thumb/${i}.jpg"
      alt="Imagen de la galeria"
    />
    </picture>`;
    galleryImage.onclick = () => showImage(i);
    gallery.appendChild(galleryImage);
  }
};

const showImage = (id) => {
  const image = document.createElement("picture");
  image.innerHTML = `
    <source srcset="build/img/big/${id}.avif" type="image/avif" />
    <img
      loading="lazy"
      width="200"
      height="300"
      src="build/img/big/${id}.jpg"
      alt="Imagen de la galeria"
    />`;

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("overlay-container");
  overlayContainer.appendChild(image);
  const close = document.createElement("p");
  close.innerHTML = "X";
  overlayContainer.appendChild(close);
  overlay.appendChild(overlayContainer);

  close.onclick = () => {
    body.classList.remove("fixed-body");
    overlay.remove();
  };

  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fixed-body");
};
