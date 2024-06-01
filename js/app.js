/*this is a async function that fetches or retrieves an Api of countries....
converts them to Json and passes the data to displaycountries...and also catches errors

*/
async function getCountries(){
    try{
        const response = await fetch(' https://restcountries.com/v3.1/all?fields=name,flags,population.captial,region');
        if(!response.ok){
            throw new Error('failed to fetch data');
        }
        const data = await response.json();
        displayCountries(data);
        
    }catch(error){
        console.error(error);
    }
// this function dislpays the countries and their information onto the page
}
function displayCountries(data){
    data.forEach((country) => {
        countryHtml = `
        <div class="country">
        <h2 class="country-name">${country.name.commom}</h2>
        <img class="country-flag" src="${country.flags.svg}" />
        <div class="content">
          <h3>Capital</h3>
          <p>${country.captial}</p>
          <h3>Population</h3>
          <p>${country.population}</p>
          <h3>Region</h3>
          <p>${country.region}</p>
        </div>
      </div>
        `;
        document.querySelector('.countries')
        .insertAdjacentHTML('beforeend',countryHtml);
    });
}

getCountries();