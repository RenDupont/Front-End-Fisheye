function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const localisation = document.createElement("span");
        const spanTagline = document.createElement('span');
        const spanPrice = document.createElement("span");

        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        h2.textContent = name;
        link.href = "#";
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
    return { name, picture, getUserCardDOM }
}