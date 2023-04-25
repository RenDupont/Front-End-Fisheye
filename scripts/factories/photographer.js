function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const divImg = document.createElement('div');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        divImg.appendChild(img);
        article.appendChild(divImg);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}