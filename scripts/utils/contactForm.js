function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//DOM
const modalButton = document.querySelector(".contact_button");
const modalClose = document.querySelector(".close");

//event
modalButton.addEventListener("click", displayModal);
modalClose.addEventListener("click", closeModal);