const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

function handleEvent(){
    const APIKey = "4601ef0f18867aba0cc18f54901910a4";
    const city = document.querySelector(".search-box input").value;

    const date = new Date();
    const hours = date.getHours();
    
    const dayTime = document.querySelector(".weather-box .day-time");

    if(hours < 12){
        dayTime.innerHTML = "Bom dia!";
    } else if(hours < 18){
        dayTime.innerHTML = "Boa tarde!";
    } else{
        dayTime.innerHTML = "Boa noite!";
    }


    if (city === "")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

        if(json.cod === "404"){
            container.style.height = "400px";
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fadeIn");
            return;
        }

        error404.style.display = "none";
        error404.classList.remove("fadeIn");

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const minMax = document.querySelector(".weather-box .min-max");
        const feelsLike = document.querySelector(".weather-box .feels-like")
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        switch (json.weather[0].main){
            case "Clear":
                image.src = "images/clear.png";
                description.innerHTML = "Céu Limpo";
                break;

            case "Rain":
                image.src = "images/rain.png";
                description.innerHTML = "Chuvoso";
                break;
                
            case "Snow":
                image.src = "images/snow.png";
                description.innerHTML = "Tempestades";
                break;
                
            case "Clouds":
                image.src = "images/cloud.png";
                description.innerHTML = "Nublado";
                break;
                
            case "Haze":
                image.src = "images/mist.png";
                description.innerHTML = "Ventos Fortes";
                break;

            default:
                image.src = "";
                
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        minMax.innerHTML = `${parseInt(json.main.temp_min)}<span>°C</span> min - ${parseInt(json.main.temp_max)}<span>°C</span> max`;

        feelsLike.innerHTML = `sensação térmica - ${parseInt(json.main.feels_like)}<span>°C</span>`


        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "650px";

    });
}

search.addEventListener("click", () => {
    handleEvent();
});

document.querySelector(".search-box input").addEventListener("keydown", (e) => {
    if(e.keyCode == 13) handleEvent();
})