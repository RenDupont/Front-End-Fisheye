//Mettre le code JavaScript lié à la page photographer.html

//let listSrcMedia = [];

async function getParams() {
    let urlParams = window.location.search;
    params = new URLSearchParams(urlParams);
    let id = parseInt(params.get('id'));
    return id;
}

async function getPhotographer(id) {     
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(photographers => photographers.id === id);
    return photographer;
}

async function getMedia(id) {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const media = data.media.filter(media => media.photographerId === id);
    return media;
}

async function displayData(photographer, media) {
    const photographHeader = document.querySelector(".photograph-header");
    const mediaSection = document.querySelector('.media-section');

    const photographerModel = photographerFactory(photographer);
    const photographerDOM = photographerModel.getPhotographeDOM();
    photographHeader.append(photographerDOM.imgPhotographe);
    photographHeader.append(photographerDOM.divDescription);

    media.forEach(element => {
        const mediaModel = mediaFactory(element);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        //listSrcMedia.push(mediaModel.image);
        mediaSection.appendChild(mediaCardDOM);
    });
}

/*function findImageIndex(listSrc, currentSrc) {
    let index = 0;
    listSrc.forEach(element => {
        if (element === currentSrc) {
            return index;
        }
        index++;
    });
}  

async function gogoToNextMedia() {
    const id = await getParams();
    const media = await getMedia(id);
    let currentSrcMedia = document.querySelector(".imageLightbox").getAttribute('src');
    console.log(currentSrcMedia, "1");

    let index = findImageIndex(listSrcMedia, currentSrcMedia);
    console.log(listSrcMedia);
    console.log(index);
}

function gogoToPreviewsMedia() {
    console.log('click2');
}*/

const dropBtns = document.querySelectorAll(".dropbtn");
const populariteBtn = document.getElementById("popularite");

dropBtns.forEach(function(btn) {
    btn.addEventListener('mouseover', function() {
      populariteBtn.classList.remove('dropbtnRadiusDefault');
      populariteBtn.classList.add('dropbtnHovered');
    });
  
    btn.addEventListener('mouseout', function() {
      populariteBtn.classList.remove('dropbtnHovered');
      populariteBtn.classList.add('dropbtnRadiusDefault');
    });
});

const popularityButton = document.getElementById("popularite");
popularityButton.addEventListener("click", sortMediaByLike);

function sortMediaByLike() {

  const mediaSection = document.querySelector('.media-section');
  
  const mediaElements = Array.from(mediaSection.children);

  mediaElements.sort((a, b) => {
    const valueA = parseInt(a.querySelector('.numLikeMedia').textContent);
    const valueB = parseInt(b.querySelector('.numLikeMedia').textContent);
    return valueA - valueB;
  });

  while (mediaSection.firstChild) {
    mediaSection.removeChild(mediaSection.firstChild);
  }

  mediaElements.forEach(element => {
    mediaSection.appendChild(element);
  });
}


async function init() {
    const id = await getParams();
    const media = await getMedia(id);
    const photographer = await getPhotographer(id);

    //const nextButtonMedia = document.getElementById("right-arrow");
    //const previewsButtonMedia = document.getElementById("left-arrow");
    
    displayData(photographer, media);

    //nextButtonMedia.addEventListener("click", gogoToNextMedia);
    //previewsButtonMedia.addEventListener("click", gogoToPreviewsMedia);


};

init();