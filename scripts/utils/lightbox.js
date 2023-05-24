
// eslint-disable-next-line no-unused-vars
function displayMediaModal () {
  const modal = document.getElementById('lightbox_modal');
  const main = document.getElementById('main');
  const body = document.body;
  const img = document.querySelector('.imageLightbox');
  const video = document.querySelector('.videoLightbox');
  const nameMediaLightbox = document.getElementById('nameMediaLightbox');

  let mediaTitle;
  let updatedTitle;

  if (this.tagName === 'VIDEO') {
    img.style.display = 'none';
    video.style.display = 'block';
    video.src = this.src;
    mediaTitle = this.title;
    updatedTitle = mediaTitle.replace(/, closeup view$/, '');
  } else { // IMG
    img.style.display = 'block';
    video.style.display = 'none';
    img.src = this.src;
    mediaTitle = this.alt;
    updatedTitle = mediaTitle.replace(/, closeup view$/, '');
  }

  nameMediaLightbox.textContent = updatedTitle;
  console.log(this);
  modal.style.display = 'block';
  main.setAttribute('aria-hidden', true);
  modal.setAttribute('aria-hidden', false);
  body.classList.add('no-scroll');
}

function closeMediaModal () {
  const modal = document.getElementById('lightbox_modal');
  const main = document.getElementById('main');
  const body = document.body;

  modal.style.display = 'none';
  main.setAttribute('aria-hidden', false);
  modal.setAttribute('aria-hidden', true);
  body.classList.remove('no-scroll');
}

function closeWithKeyDown (event) {
  if (event.key === 'Escape') {
    closeMediaModal();
  }
}

// DOM
const modalLightboxClose = document.querySelector('.closeLightbox');

// event
modalLightboxClose.addEventListener('click', closeMediaModal);
document.addEventListener('keydown', closeWithKeyDown);

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    // eslint-disable-next-line no-undef
    switchMedia('previous');
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    // eslint-disable-next-line no-undef
    switchMedia('next');
  }
});
