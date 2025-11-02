function iniciarCarrusel({ sliderId, imagenes, modalId, modalImgId, intervalo = 3000 }) {
  const slider = document.getElementById(sliderId);
  const container = slider.parentElement;
  const modal = document.getElementById(modalId);
  const modalImg = document.getElementById(modalImgId);
  const cerrarBtn = modal.querySelector(".cerrar");
  const flechaIzq = modal.querySelector(".flecha.izq");
  const flechaDer = modal.querySelector(".flecha.der");

  slider.innerHTML = "";
  imagenes.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.style.flex = "0 0 100%";
    slider.appendChild(img);
  });

  const clone = slider.children[0].cloneNode(true);
  slider.appendChild(clone);

  let index = 0;
  const total = slider.children.length;

  function moverA(i, conTransicion = true) {
    const offset = -i * container.clientWidth;
    slider.style.transition = conTransicion ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(${offset}px)`;
  }

  function siguiente() {
    index++;
    moverA(index, true);

    if (index === total - 1) {
      setTimeout(() => {
        moverA(0, false);
        index = 0;
      }, 500);
    }
  }

  const intervalId = setInterval(siguiente, intervalo);

  window.addEventListener("resize", () => {
    moverA(index, false);
  });

  let indexModal = 0;

  slider.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") return;
    let idx = Array.from(slider.children).indexOf(e.target);
    if (idx === total - 1) idx = 0;
    indexModal = idx;
    modalImg.src = imagenes[indexModal];
    modal.style.display = "block";
  });

  cerrarBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  function cambiarImagenModal(direccion) {
    indexModal = (indexModal + direccion + imagenes.length) % imagenes.length;
    modalImg.src = imagenes[indexModal];
  }

  flechaIzq.addEventListener("click", () => cambiarImagenModal(-1));
  flechaDer.addEventListener("click", () => cambiarImagenModal(1));

  return { stop: () => clearInterval(intervalId) };
}

iniciarCarrusel({
  sliderId: "carrusel-slider-1",
  imagenes: [
    "imagenes_multimedia/laufeycar1.jpg",
    "imagenes_multimedia/laufeycar2.jpg",
    "imagenes_multimedia/laufeycar3.jpg"
  ],
  modalId: "modal-carrusel-1",
  modalImgId: "modal-img-1",
  intervalo: 3000
});

iniciarCarrusel({
  sliderId: "carrusel-slider-2",
  imagenes: [
    "imagenes_multimedia/laufeycar4.jpg",
    "imagenes_multimedia/laufeycar5.jpg",
    "imagenes_multimedia/laufeycar6.jpg",
    "imagenes_multimedia/laufeycar7.jpg",
    "imagenes_multimedia/laufeycar8.jpg"
  ],
  modalId: "modal-carrusel-2",
  modalImgId: "modal-img-2",
  intervalo: 3000
});

iniciarCarrusel({
  sliderId: "carrusel-slider-3",
  imagenes: [
    "imagenes_multimedia/laufeycar9.jpg",
    "imagenes_multimedia/laufeycar10.jpg"
  ],
  modalId: "modal-carrusel-3",
  modalImgId: "modal-img-3",
  intervalo: 3000
});

iniciarCarrusel({
  sliderId: "carrusel-slider-4",
  imagenes: [
    "imagenes_multimedia/laufeycar11.jpg",
    "imagenes_multimedia/laufeycar12.jpg",
    "imagenes_multimedia/laufeycar13.jpg",
    "imagenes_multimedia/laufeycar14.jpg"
],
  modalId: "modal-carrusel-4",
  modalImgId: "modal-img-4",
  intervalo: 3000
});

const modalGeneral = document.getElementById("modal-general");
const modalImgGeneral = document.getElementById("modal-img-general");
const cerrarGeneral = modalGeneral.querySelector(".cerrar");

document.querySelectorAll(".imagen-item img").forEach(img => {
  if (!img.closest(".carrusel-container")) {
    img.addEventListener("click", () => {
      modalImgGeneral.src = img.src;
      modalGeneral.style.display = "block";
    });
  }
});

cerrarGeneral.addEventListener("click", () => {
  modalGeneral.style.display = "none";
});

modalGeneral.addEventListener("click", (e) => {
  if (e.target === modalGeneral) modalGeneral.style.display = "none";
});
