const temperatureUnit = document.querySelector('.temperature');
const number = document.querySelector('.number');
const unit = document.querySelector('.unit');
const errorStatus = document.querySelector('.error');
const description = document.querySelector('.description');
const sky = document.querySelector('.sky');
const country = document.querySelector('.country');

const searchIcon = document.querySelector('.fa-search-location');
const gpsIcon = document.querySelector('.fa-map-marker-alt');
const inputContainer = document.querySelector('.input-container')
const searchInput = document.querySelector('.search');
const iconInputSearch = document.querySelector('.fa-search');

const key = "82005d27a116c2880c8f0fcb866998a0";
let latitude, longitude = 0;
let tempData = 0;

function geoFindMe() {
    number.classList.add("active");
    errorStatus.style.display = "none";

    function location(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        weatherInfo(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`);
    }

    function error() {
        errorStatus.style.display = "block";
        errorStatus.textContent = 'Ups... Nie mogę pobrać Twojej lokalizacji :( Sprawdź połaczenie GPS lub podaj nazwe miasta';
    }

    if (!navigator.geolocation) {
        errorStatus.style.display = "block";
        errorStatus.textContent = 'Ups... Twoja przeglądarka nie wspiera geolokalizacji :(';
    } else {
        navigator.geolocation.getCurrentPosition(location, error);
    }
}

function unitConverter(temp, number) {
    if (number.classList.contains('active')) {
        number.innerHTML = `${Math.floor(temp-273.15)}&deg`;
        unit.textContent = 'C'
        number.classList.remove("active");
    } else {
        number.innerHTML = `${Math.floor(temp)}&deg`;
        unit.textContent = 'K'
        number.classList.add("active");
    }
}

function searchCity() {
    inputContainer.classList.toggle('show');
    errorStatus.style.display = "none";
}

function weatherInfo(link) {
    fetch(link)
        .then(resp => resp.json())
        .then(data => {
            sky.setAttribute('src', `img/${data.weather[0].icon}.png`);
            tempData = data.main.temp;
            unitConverter(tempData, number);
            description.textContent = `${data.weather[0].description}`;
            country.textContent = `${data.name}, ${data.sys.country}`;
        });
}

function iconInputSearchElements() {
    const cityName = searchInput.value;
    weatherInfo(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`);
    inputContainer.classList.toggle('show');
    searchInput.value = '';
}

geoFindMe();

searchIcon.addEventListener('click', searchCity);

gpsIcon.addEventListener('click', geoFindMe);

temperatureUnit.addEventListener('click', function (e) {
    unitConverter(tempData, number);
})

iconInputSearch.addEventListener('click', function (e) {
    number.classList.add("active");
    if (searchInput.value) {
        iconInputSearchElements();
    }
})
searchInput.addEventListener('keydown', function (e) {
    if (searchInput.value) {
        if (e.key === 'Enter') {
            number.classList.add("active");
            iconInputSearchElements();
        }
    }
})