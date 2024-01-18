const API_KEY = `3cb5405eeaaedbf9c88a33cbdbe393b4`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
    try {
        weather.innerHTML = `<h2>Loading...</h2>`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        showWeather(data);
    } catch (error) {
        console.error(error.message);
        weather.innerHTML = `<h2>City Not Found</h2>`;
    }
};

const showWeather = (data) => {
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
    `;
};

form.addEventListener("submit", function (event) {
    getWeather(search.value);
    event.preventDefault();
});
