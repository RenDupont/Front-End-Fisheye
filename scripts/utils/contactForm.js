function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById("main");
    const body = document.body;

	modal.style.display = "block";
    main.setAttribute("aria-hidden", true);
    modal.setAttribute("aria-hidden", false);
    body.classList.add("no-scroll");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById("main");
    const body = document.body;

	modal.style.display = "none";
    main.setAttribute("aria-hidden", false);
    modal.setAttribute("aria-hidden", true);
    body.classList.remove("no-scroll");
}

function closeWithKeyDown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
}

/*async function getParams() {
    let urlParams = window.location.search;
    params = new URLSearchParams(urlParams);
    let id = parseInt(params.get('id'));
    return id;
}

async function getPhotographerName(id) {     
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(photographers => photographers.id === id);
    return photographer.name;
}

function setPhotographerName(name) {
    const modalName = document.querySelector(".nameModal");
    modalName.textContent += " "+name;
}

async function init() {
    const id = await getParams();
    const photographerName = await getPhotographerName(id);
    console.log(photographerName);
    setPhotographerName(photographerName);
}

init();*/

//DOM
const modalButton = document.querySelector(".contact_button");
const modalClose = document.querySelector(".close");

//event
modalButton.addEventListener("click", displayModal);
modalClose.addEventListener("click", closeModal);
document.addEventListener("keydown", closeWithKeyDown);