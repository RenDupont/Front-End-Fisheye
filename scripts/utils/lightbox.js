
    function displayMediaModal() {
    
        const modal = document.getElementById("lightbox_modal");
        const main = document.getElementById("main");
        const body = document.body;
        const img = document.querySelector(".imageLightbox");
        const video = document.querySelector(".videoLightbox");

        if (this.tagName === "VIDEO") {
            img.style.display = "none";
            video.style.display = "block";
            video.src = this.src;
        }
        else { //IMG
            img.style.display = "block";
            video.style.display = "none";
            img.src = this.src;
        }
    
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
    const modalLightboxClose = document.querySelector(".closeLightbox");
    
    //event
    //modalLightbox.addEventListener("click", displayModal);    in photographer.js
    modalLightboxClose.addEventListener("click", closeMediaModal);
    document.addEventListener("keydown", closeWithKeyDown);