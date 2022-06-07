const imgs = document.querySelectorAll(".container img");
const btn = document.getElementById("close");
const popcl = document.getElementById("popup_container");

[...imgs].forEach(function (img, index) {
  img.addEventListener("click", (e) => {
    const { src, alt } = img;
    const html = `<img src=".${src.substr(32)}" alt="${alt}" id="popupImage">`;
    popcl.insertAdjacentHTML("beforeend", html);

    if (e.target.naturalHeight >= e.target.naturalWidth)
      popupImage.className = "popup-image-h";

    const matte = document.getElementById("popup");
    matte.style.display = "block";

    let location = document.querySelectorAll(".container .location");

    const { innerHTML } = [...location][index];

    const popupContent = `<div class = "location-info">
                          <span><img src="./images/location.png" alt="" id="locationIcon"></span>
                          <span> ${innerHTML}</span>
                        </div>`;
    popcl.insertAdjacentHTML("beforeend", popupContent);

    const layer = document.getElementById("layer");
    layer.style.display = "block";
    layer.style.top = `${window.scrollY}px`;

    document.querySelector("body").style.overflow = "hidden";

    // e.stopPropagation();
  });
});

const cl = document.getElementById("close");
cl.addEventListener("click", () => {
  while (popcl.firstChild) popcl.removeChild(popcl.firstChild);
  const matte = document.getElementById("popup");
  matte.style.display = "none";
  const layer = document.getElementById("layer");
  layer.style.display = "none";

  document.querySelector("body").style.overflow = "scroll";

  // document.querySelector("body").addEventListener('click', (e) => {
  //   const event = new MouseEvent('click');
  //   cl.dispatchEvent(event);
  // })
});
