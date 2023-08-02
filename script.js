const city = document.querySelector(".city");
const icon = document.querySelector(".icon");
const now = document.querySelector(".currently");
const temp = document.querySelector(".temperature");
const down = document.querySelector(".down");
const speed = document.querySelector(".speed");

function updateClock() {
  const now = new Date();

  const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();

  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();

  const time = document.querySelector(".time");

  time.textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);

function renderDay(url, date, temp) {
  const day = `

      <div class="flex-wrap">
        <div class="date">${date}</div>     
        <div class="image">
          <img src="https://openweathermap.org/img/wn/${url}@2x.png">
        </div>
        <div class="temp">${Math.round(temp)}°C</div>
      </div>

  `;
  down.innerHTML += day;
}

ymaps.ready(function () {
  const myCity = ymaps.geolocation.city;
  console.log(myCity);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${myCity}&units=metric&appid=6567cb27403fa051fdf1fab80e8b9252`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < data.list.length; i = i + 8) {
        renderDay(
          data.list[i].weather[0].icon,
          data.list[i].dt_txt,
          data.list[i].main.temp
        );
      }
      console.log(data);
      city.innerText = data.city.name;

      let iconName = data.list[0].weather[0].icon;
      icon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${iconName}@2x.png`
      );

      now.innerText = data.list[0].weather[0].main;

      let temperature = data.list[0].main.temp;
      temp.innerText = `${Math.round(temperature)}°С`;

      speed.innerText = `${data.list[0].wind.speed.toFixed(1)} m/s`;

      
    });
});
