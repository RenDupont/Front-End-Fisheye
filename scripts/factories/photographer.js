function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `../../assets/photographers/${portrait}`;

    /**
     * create photographe card for photographer_section in index.html
     * @returns article
     */
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const localisation = document.createElement("span");
        const spanTagline = document.createElement('span');
        const spanPrice = document.createElement("span");

        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        h2.textContent = name;
        link.href = `photographer.html?id=${id}`;
        link.setAttribute("focusable", true);
        link.setAttribute("alt", name);
        link.setAttribute("role", "link");
        localisation.textContent = `${city}, ${country}`;
        spanTagline.textContent = tagline;
        spanPrice.textContent = `${price}€/jour`;

        img.classList.add("photographer_portrait")
        h2.classList.add("photographer_name");
        localisation.classList.add("photographer_localisation");
        spanTagline.classList.add("photographer_tagline");
        spanPrice.classList.add("photographer_price");

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(localisation);
        article.appendChild(spanTagline);
        article.appendChild(spanPrice);
        
        return (article);
    }
    
    /**
     * create description and portrait for photograph-header in photographer.html
     * @returns 
     */
    function getPhotographeDOM() {
        const divDescription = document.createElement('div');
        const imgPhotographe = document.createElement('img');
        const h1 = document.createElement( 'h1' );
        const localisation = document.createElement("span");
        const spanTagline = document.createElement('span');

        imgPhotographe.setAttribute("src", picture);
        h1.textContent = name;
        localisation.textContent = `${city}, ${country}`;
        spanTagline.textContent = tagline;

        imgPhotographe.classList.add("photograph-header_portrait");
        divDescription.classList.add("photograph-header_description");
        localisation.classList.add("photograph-header_localisation");
        spanTagline.classList.add("photograph-header_tagline");

        divDescription.appendChild(h1);
        divDescription.appendChild(localisation);
        divDescription.appendChild(spanTagline);

        return {divDescription, imgPhotographe};
    }

    return { price, getUserCardDOM, getPhotographeDOM }
}

function mediaFactory(data) {
    const { title, image, video, likes, date } = data;

    let picture;
    let media;
    let isLiked = false;

    function incLike(event) {

        if (!isLiked) {
            const likeNumber = event.target.closest('.media-like').querySelector('.numLikeMedia');
            let incNumber = parseInt(likeNumber.textContent);
            incNumber++;
            likeNumber.textContent = incNumber;
    
            isLiked = true;

            event.target.removeEventListener('click', incLike);

            updateTotalLike(); 
        }
    }

    function getMediaCardDOM() {

        if(data.hasOwnProperty('image')) {
            picture = `../../assets/images/media/${image}`;
            media = document.createElement( 'img' );
            media.setAttribute("src", picture);
            media.setAttribute("alt", "");
        }
        else if(data.hasOwnProperty('video')) {
            picture = `../../assets/images/media/${video}`;
            media = document.createElement('video');
            media.setAttribute("src", picture);
            //media.controls = true;
        }

        const article = document.createElement( 'article' );
        const spanName = document.createElement('span');
        const spanDate = document.createElement('span');
        const spanLikeNumber = document.createElement("span");
        const iconLike = document.createElement('i');
        const divDescription = document.createElement('div');
        const divLike = document.createElement('div');

        media.setAttribute("focusable", true);
        media.setAttribute("role", "link");
        spanName.textContent = title;
        spanDate.textContent = date;
        spanLikeNumber.textContent = likes;

        iconLike.classList.add('fas', 'fa-heart', 'likeIcon');
        media.classList.add("media-section_mediaImg");
        divDescription.classList.add("media-description");
        divLike.classList.add("media-like");
        media.classList.add("lightbox-link");
        spanLikeNumber.classList.add('numLikeMedia');
        spanDate.classList.add('dateMedia');
        spanName.classList.add('mediaName');

        media.addEventListener('click', displayMediaModal);
        iconLike.addEventListener('click', incLike);

        divDescription.appendChild(spanName);
        divDescription.appendChild(spanDate);
        divLike.appendChild(spanLikeNumber);
        divLike.appendChild(iconLike);
        divDescription.appendChild(divLike);
        article.appendChild(media);
        article.appendChild(divDescription);
        
        return (article);
    }

    return { getMediaCardDOM, image, likes }
}