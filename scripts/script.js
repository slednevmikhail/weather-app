
const GetWeatherInfo = (event) => {
    event.preventDefault()
    const latitude = (form.querySelector('.request-input__latitude')).value.trim()
    const longitude = (form.querySelector('.request-input__longitude')).value.trim()
    if (IsValid(latitude, longitude)){
        GetWeatherData(latitude, longitude).then((weatherData) => FormatData(weatherData, latitude, longitude))
    }
    else {
        alert('Введенные данные некорректны!')
    }
}

const IsValid = (inputValues) => {
    const firstValue = parseFloat(inputValues[0])
    const secondValue = parseFloat(inputValues[1])
    return typeof firstValue === 'number' && typeof secondValue === 'number'
        && !isNaN(firstValue) && !isNaN(secondValue)
        && -90 <= firstValue <= 90 && -180 <= secondValue <= 180;
}

const GetWeatherData = async (latitude, longitude) => {
    try {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d1e4d1d53f86f2eae9c9de8aee8124ec&lang=ru&units=metric`)
        const weatherInfo = await request.json()
        return await weatherInfo
    }
    catch (exceptionVar){
        alert(`Произошла ошибка,код ошибки: ${exceptionVar}`)
    }
}

const FormatData = (weatherInfo, latitude, longitude) => {
    const iconSrc = `https://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`
    const weatherSection = document.getElementById("weather-section")
    const ajaxContainer = weatherSection.querySelector('.weather-section__container')
    const div = document.createElement("div");
    div.classList.add("weather-section_content");
    const markup = `
        <div class="weather-section__city-name">${weatherInfo.name}</div>
        <div class="weather-section__temp">погода : ${weatherInfo.main.temp}<sup>°C</sup></div>
        <div class="weather-section__windspeed">скорость ветра - ${weatherInfo.wind.speed} м/с</div>
        <div class="weather-section__img">
            <img src="${iconSrc}">
        </div>
      `;
    div.innerHTML = markup;
    ajaxContainer.appendChild(div);
}

const form = document.getElementById("request-input__form")
form.addEventListener("submit", GetWeatherInfo)