let weather = {
  apiKey: process.env.API_KEY,
  
    fetchWeather: function (city) {
      fetch(
        " https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&appid=${this.apiKey}")
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
            .then(data => this.displayWeather(data))
            .catch(error => console.error("Error fetching weather:", error));
    },
  
    displayWeather: function (data) {
      const { name, weather, main, wind } = data;
      const { icon, description } = weather[0];
      const { temp, humidity } = main;
      const { speed } = wind;
  
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },
  
    search: function () {
      const searchBar = document.querySelector(".search-bar");
      if (searchBar.value) {
        this.fetchWeather(searchBar.value);
        searchBar.value = ""; 
      }
    },
  };
  
  document.querySelector(".search button")
  .addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });
  
  weather.fetchWeather("Denver");
  