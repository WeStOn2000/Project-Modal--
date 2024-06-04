let countries = [];
const modalContent = document.querySelector('.modal-content');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.modal-close');
const container = document.querySelector('.countries');

container.addEventListener('click', (e) => {
const countryCard = e.target.closest('.countries');
if(!countryCard) return;

const countryName = countryCard.dataset.name;
const country = countries.find(
  (country) => country.name.common === countryName
);
displayCountryModal(country);
});

function displayCountryModal(country){
  const modalHTML = `
  <h2>${country.name.common}</h2>
  <div class="flag">
  <img src=${country.flag.svg} alt=${country.flag.alt}/>
  </div>
  <div class="content">
  <h3>Population:</h3>
  <p>${country.population}</p>
  <h3>Region:</h3>
  <p>${country.region}</p>
  <h3>Capital:</h3>
  <p>${country.capital}</p>
  </div>
  `;
  modalContent.innerHTML = modalHTML;
  overlay.classList.add('open');
}
closeButton.addEventListener('click',() => {
overlay.classList.remove('open');
});

overlay.addEventListener('click', (event) => {
const isOutside = !event.target.closest('.modal');
if(isOutside){
  overlay.classList.remove('open');
}
});
 document.addEventListener('keyboard',(event) => {
  if(event.key === 'Escape'){
    overlay.classList.remove('open');
  }
 });



async function getCountries() {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region'
  );
  const data = await response.json();
  countries = data;
  displayCountries(data);
  return data;
}

function displayCountries(countries) {
  const countriesHTML = countries
    .map(
      (country) => `
          <div class="country" data-name="${country.name.common}">
              <h3 class="country-name">${country.name.common}</h3>
              <img class="country-flag" src="${country.flags.svg}" />
          </div>
      `
    )
    .join('');
  container.innerHTML = countriesHTML;
}

getCountries();
