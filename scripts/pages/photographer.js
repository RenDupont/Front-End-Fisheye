
/**
 * get parameter in url
 * @returns number
 */
async function getParams () {
  const urlParams = window.location.search;
  const params = new URLSearchParams(urlParams);
  const id = parseInt(params.get('id'));
  return id;
}

/**
 * get photographer information (name, price, portrait ect) from photographers.json by his id
 * @param {number} id
 * @returns object
 */
async function getPhotographer (id) {
  const response = await fetch('../../data/photographers.json');
  const data = await response.json();
  const photographer = data.photographers.find(photographers => photographers.id === id);
  return photographer;
}

/**
 * get all images and video of a photographer from photographers.json by his id
 * @param {number} id
 * @returns array of object
 */
async function getMedia (id) {
  const response = await fetch('../../data/photographers.json');
  const data = await response.json();
  const media = data.media.filter(media => media.photographerId === id);
  return media;
}

/**
 * display photographer information in photograph-header and all media in media-section
 * @param {object} photographer
 * @param {Array} media
 */
async function displayData (photographer, media) {
  const photographHeader = document.querySelector('.photograph-header');
  const mediaSection = document.querySelector('.media-section');
  let price = 0;
  let totalLikeInitial = 0;
  const initialTotalLike = document.querySelector('.totalLike');
  const photographerPrice = document.querySelector('.pricePhotographe');
  const contactName = document.querySelector('.nameModal h2');

  // eslint-disable-next-line no-undef
  const photographerModel = photographerFactory(photographer);
  const photographerDOM = photographerModel.getPhotographeDOM();
  price = photographerModel.price;
  contactName.textContent += ' ' + photographerModel.name;

  photographHeader.append(photographerDOM.imgPhotographe);
  photographHeader.append(photographerDOM.divDescription);

  media.forEach(element => {
    // eslint-disable-next-line no-undef
    const mediaModel = mediaFactory(element);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    totalLikeInitial += mediaModel.likes;
    mediaSection.appendChild(mediaCardDOM);
  });

  photographerPrice.textContent = price + '€ / jour';
  initialTotalLike.textContent = totalLikeInitial;
  sortMediaByLike();
}

const nextButtonMedia = document.getElementById('right-arrow');
const previewsButtonMedia = document.getElementById('left-arrow');

nextButtonMedia.addEventListener('click', function () {
  switchMedia('next');
});
previewsButtonMedia.addEventListener('click', function () {
  switchMedia('previous');
});

/**
 * trouve l'index du media courrant
 * @param {NodeList} list
 * @param {string} currentImgSrc
 * @returns number
 */
function findMediaIndex (list, currentImgSrc) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].src === currentImgSrc) {
      return i;
    }
  }
  return -1;
}

/**
 * obtenir l'index suivant de la liste
 * @param {number} index
 * @param {NodeList} imgcardList
 * @returns number
 */
function getNextIndex (index, imgcardList) {
  if (index === imgcardList.length - 1) {
    // si dernière image, on revient à la première image
    return 0;
  } else {
    return index + 1;
  }
}

/**
 * obtenir l'index precedant de la liste
 * @param {number} index
 * @param {NodeList} imgcardList
 * @returns number
 */
function getPreviousIndex (index, imgcardList) {
  if (index === 0) {
    // si première image, on passe à la dernière image
    return imgcardList.length - 1;
  } else {
    return index - 1;
  }
}

/**
 * update the title of the dipslay media in lightbox_modal when you switch media
 * @param {string} mediaOrTitle
 */
function updatedLightboxTitle (mediaOrTitle) {
  const nameMediaLightbox = document.getElementById('nameMediaLightbox');
  const updatedTitle = mediaOrTitle.replace(/, closeup view$/, '');

  nameMediaLightbox.textContent = updatedTitle;
}

/**
 * change media in lightbox_modal on click or keydown (arrowLeft or arrowRight)
 * @param {string} direction
 */
function switchMedia (direction) {
  const mediaSection = document.querySelector('.media-section');
  const imgcardList = mediaSection.querySelectorAll('.media-section_mediaImg');
  const imageLightbox = document.querySelector('.imageLightbox');
  const videoLightbox = document.querySelector('.videoLightbox');

  const index = findMediaIndex(imgcardList, imageLightbox.src || videoLightbox.src);

  if (index !== -1) {
    let newIndex;

    if (direction === 'next') {
      newIndex = getNextIndex(index, imgcardList);
    } else {
      newIndex = getPreviousIndex(index, imgcardList);
    }

    imageLightbox.src = imgcardList[newIndex].src;

    const nextMedia = imgcardList[newIndex];

    updatedLightboxTitle(imgcardList[newIndex].alt || imgcardList[newIndex].title);

    if (nextMedia.tagName === 'IMG') {
      imageLightbox.style.display = 'block';
      videoLightbox.style.display = 'none';

      imageLightbox.src = nextMedia.src;
    } else if (nextMedia.tagName === 'VIDEO') {
      imageLightbox.style.display = 'none';
      videoLightbox.style.display = 'block';

      videoLightbox.src = nextMedia.src;
    }
  }
}

/**
 * formatting the sorting menu
 */
const dropBtns = document.querySelectorAll('.dropbtn');
const populariteBtn = document.getElementById('popularite');
const arrowUp = document.getElementById('dropbtn-up');
const arrowDown = document.getElementById('dropbtn-down');

dropBtns.forEach(function (btn) {
  btn.addEventListener('mouseover', function () {
    populariteBtn.classList.remove('dropbtnRadiusDefault');
    populariteBtn.classList.add('dropbtnHovered');
    arrowUp.style.display = 'none';
    arrowDown.style.display = 'block';
  });

  btn.addEventListener('mouseout', function () {
    populariteBtn.classList.remove('dropbtnHovered');
    populariteBtn.classList.add('dropbtnRadiusDefault');
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'block';
  });
});

/**
 * remove the previous list and implement the newly sorted list
 * @param {Array} elements
 */
function clearAndAppendElements (elements) {
  const mediaSection = document.querySelector('.media-section');
  while (mediaSection.firstChild) {
    mediaSection.removeChild(mediaSection.firstChild);
  }

  elements.forEach(element => {
    mediaSection.appendChild(element);
  });
}

/**
 * sort by likes
 */
const popularityButton = document.getElementById('popularite');
popularityButton.addEventListener('click', sortMediaByLike);

function sortMediaByLike () {
  const mediaSection = document.querySelector('.media-section');

  // list of media card
  const mediaElements = Array.from(mediaSection.children);

  mediaElements.sort((a, b) => {
    const valueA = parseInt(a.querySelector('.numLikeMedia').textContent);
    const valueB = parseInt(b.querySelector('.numLikeMedia').textContent);
    return valueA - valueB;
  });

  clearAndAppendElements(mediaElements);
}

/**
 * sort by title
 */
const titleButton = document.getElementById('titre');
titleButton.addEventListener('click', sortMediaByTitle);

function sortMediaByTitle () {
  const mediaSection = document.querySelector('.media-section');

  // list of media card
  const mediaElements = Array.from(mediaSection.children);

  mediaElements.sort((a, b) => {
    const titleA = a.querySelector('.mediaName').textContent.toLowerCase();
    const titleB = b.querySelector('.mediaName').textContent.toLowerCase();

    if (titleA < titleB) {
      return -1;
    } else if (titleA > titleB) {
      return 1;
    } else {
      return 0;
    }
  });

  clearAndAppendElements(mediaElements);
}

/**
 * sort by date
 */
const dateButton = document.getElementById('date');
dateButton.addEventListener('click', sortMediaByDate);

function sortMediaByDate () {
  const mediaSection = document.querySelector('.media-section');

  // list of media card
  const mediaElements = Array.from(mediaSection.children);

  mediaElements.sort((a, b) => {
    const dateA = new Date(a.querySelector('.dateMedia').textContent);
    const dateB = new Date(b.querySelector('.dateMedia').textContent);

    return dateA - dateB;
  });

  clearAndAppendElements(mediaElements);
}

/**
 * update the total number of likes in priceAndLike div
 */
// eslint-disable-next-line no-unused-vars
function updateTotalLike () {
  const totalLike = document.querySelector('.totalLike');
  const mediaSection = document.querySelector('.media-section');
  const mediaElements = Array.from(mediaSection.children);
  let total = 0;

  mediaElements.forEach(card => {
    const likeNumber = card.querySelector('.numLikeMedia');
    total += parseInt(likeNumber.textContent);
  });

  totalLike.textContent = total;
}

/**
 * init factory function to create and display data
 */
async function init () {
  const id = await getParams();
  const media = await getMedia(id);
  const photographer = await getPhotographer(id);

  displayData(photographer, media);
};

init();
