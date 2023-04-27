//Mettre le code JavaScript lié à la page photographer.html

async function getParams() {
    let urlParams = window.location.search;
    params = new URLSearchParams(urlParams);
    let id = parseInt(params.get('id'));
    console.log(id);
    return id;
}

async function displayData() {
    const photographHeader = document.querySelector(".photograph-header");
    let id = getParams();
};

displayData();