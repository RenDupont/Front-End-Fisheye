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


//DOM
const modalButton = document.querySelector(".contact_button");
const modalClose = document.querySelector(".closeContact");
const form = document.querySelector(".formContact");

//event
modalButton.addEventListener("click", displayModal);
modalClose.addEventListener("click", closeModal);
document.addEventListener("keydown", closeWithKeyDown);

form.onsubmit = function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll(".formData input");
    const inputMessage = document.getElementById("message");

    inputs.forEach(element => {
        console.log(element.value);
    });
    console.log(inputMessage.value);

    closeModal();
}

// add contenLoad