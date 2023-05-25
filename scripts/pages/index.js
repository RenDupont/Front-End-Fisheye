/**
 * get all photograpehers informations
 * @returns array of oject
 */
async function getPhotographers () {
  const response = await fetch('../../data/photographers.json');
  const data = await response.json();
  const photographers = data.photographers;
  return ({ photographers: [...photographers] });
}

/**
 * display all photographers and their informations
 * @param {Array} photographers
 */
async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

/**
 * init factory function to create and display data
 */
async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();
