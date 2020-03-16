const imgSky = document.querySelector('.sky');
const temperatureUnit = document.querySelector('.temperature');
const number = document.querySelector('.number');
const unit = document.querySelector('.unit');
const errorStatus = document.querySelector('.error');
const description = document.querySelector('.description');
const sky = document.querySelector('.sky');
const country = document.querySelector('.country');

const key = "82005d27a116c2880c8f0fcb866998a0";
let latitude, longitude = 0;

function geoFindMe() {

    function location(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        weatherInfo(latitude, longitude, key);
    }

    function error() {
        errorStatus.style.display = "block";
        errorStatus.textContent = 'Ups... Nie mogę pobrać Twojej lokalizacji :(';
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

function weatherInfo(latitude, longitude, key) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
        .then(resp => resp.json())
        .then(data => {
            sky.setAttribute('src', `img/${data.weather[0].icon}.png`);
            unitConverter(data.main.temp, number);
            temperatureUnit.addEventListener('click', function () {
                unitConverter(data.main.temp, number);
            })
            description.textContent = `${data.weather[0].description}`;
            country.textContent = `${data.name}, ${data.sys.country}`;
        });
}

geoFindMe();