const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

const spitOutFarenheit = (kelvin) => {
    farenheit = Math.round((kelvin - 273.15) * 9/5 + 32);
    return farenheit;
}

const isDayTime = (icon) => {
    if(icon.includes('d')) {
        return true;
    }else {
        return false;
    }
}

updateWeatherApp = (city) => {
    console.log(city);
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-mid row">
        <div class="col-8 text-center temp">
            <span>${spitOutFarenheit(city.main.temp)}&deg;F</span>
        </div>
        <div class="col-4 condition-temp">
            <p class="condition">${city.weather[0].description}</p>
            <p class="high">${spitOutFarenheit(city.main.temp_max)}&deg;F</p>
            <p class="low">${spitOutFarenheit(city.main.temp_min)}&deg;F</p>
        </div>
    </div>

    <div class="icon-container card shadow mx-auto">
        <div class="mx-auto">
            <img src="${iconSrc}" alt="A Cloud"/>
        </div>    
    </div>

    <div class="card-bottom px-5 py-4 row">
        <div class="col text-center">
            <p>${spitOutFarenheit(city.main.feels_like)}&deg;F</p>
            <span>Feels Like</span>
        </div>
        <div class="col text-center">
            <p>${city.main.humidity}%</p>
            <span>Humidity</span>
        </div>
    </div>
    `;
    if(isDayTime(imageName)) {
        console.log('day');
        timeImage.setAttribute('src', 'img/day_image.svg');
        if(cityName.classList.contains('text-white')) {
            cityName.classList.remove('text-white');
        } else {
            cityName.classList.add('text-black');
        }
    }else {
        console.log('night');
        timeImage.setAttribute('src', 'img/night_image.svg');
        if(cityName.classList.contains('text-black')) {
            cityName.classList.remove('text-black');
        } else {
        cityName.classList.add('text-white');
        }
    }

    cardInfo.classList.remove('d-none');
}

// add an event listener to the form
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched)
    searchForm.reset();

    requestCity(citySearched)
    .then((data) => {
        updateWeatherApp(data);
    })
    .catch((error) => {console.log(error)})
})