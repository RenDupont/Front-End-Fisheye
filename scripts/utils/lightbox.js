
    function displayMediaModal() {
    
        const modal = document.getElementById("lightbox_modal");
        const main = document.getElementById("main");
        const body = document.body;
        const img = document.querySelector(".imageLightbox");
    
        img.src = this.src;
        modal.style.display = "block";
        main.setAttribute("aria-hidden", true);
        modal.setAttribute("aria-hidden", false);
        body.classList.add("no-scroll");
    }
    
    function closeMediaModal() {
        console.log('click');
        const modal = document.getElementById("lightbox_modal");
        const main = document.getElementById("main");
        const body = document.body;
    
        modal.style.display = "none";
        main.setAttribute("aria-hidden", false);
        modal.setAttribute("aria-hidden", true);
        body.classList.remove("no-scroll");
    }
    
    function closeWithKeyDown(event) {
        if(event.key === "Escape") {
            closeMediaModal();
        }
    }
    
    //DOM
    const modalLightbox = document.querySelector(".lightbox-link");
    console.log(modalLightbox);
    const modalLightboxClose = document.querySelector(".closeLightbox");
    
    //event
    //modalLightbox.addEventListener("click", displayModal);
    modalLightboxClose.addEventListener("click", closeMediaModal);
    document.addEventListener("keydown", closeWithKeyDown);