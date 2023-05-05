document.addEventListener("DOMContentLoaded", function() {
    function displayModal(event) {
        event.preventDefault();
    
        const modal = document.getElementById("lightbox_modal");
        const main = document.getElementById("main");
        const body = document.body;
    
    
        modal.style.display = "block";
        main.setAttribute("aria-hidden", true);
        modal.setAttribute("aria-hidden", false);
        body.classList.add("no-scroll");
    }
    
    function closeModal() {
        const modal = document.getElementById("lightbox_modal");
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
    const modalLightbox = document.querySelector(".lightbox-link");
    console.log(modalLightbox);
    const modalLightboxClose = document.querySelector(".close");
    
    //event
    modalLightbox.addEventListener("click", displayModal);
    modalLightboxClose.addEventListener("click", closeModal);
    document.addEventListener("keydown", closeWithKeyDown);
});