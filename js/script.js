// =============== TO-DO LIST ===============
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const datetimeInput = document.getElementById('datetime-input');

addBtn.addEventListener('click', addTodo);

function addTodo() {
  const task = todoInput.value.trim();
  if (!task) return alert('タスクを記入してください！');
  
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${task}</span>
    <div>
      <button class="done">✔</button>
      <button class="delete">🗑</button>
    </div>
  `;
  todoList.appendChild(li);
  todoInput.value = '';

  li.querySelector('.done').addEventListener('click', () => {
    li.classList.toggle('completed');
  });
  li.querySelector('.delete').addEventListener('click', () => {
    li.remove();
  });
}

// =============== CLOCK / DATE ===============
const datetimeEl = document.getElementById('datetime');
function updateTime() {
  const now = new Date();
  datetimeEl.textContent = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

// =============== WEATHER API ===============
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const getWeatherBtn = document.getElementById('get-weather');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

getWeatherBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  const encodedCity = encodeURIComponent(city); 
  const apiKey = '9c2c0ce25074185586d797113e40de76';
  if (!city) return alert('都市・地域名を記入してください！');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=ja`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod !== 200) {
    weatherInfo.textContent = '都市や地域は見つかりませんでした!';
    return;
  }

  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  weatherInfo.innerHTML = `
    <p><strong>${data.name}</strong></p>
    <p>${data.main.temp}°C, ${data.weather[0].description}</p>
    <img src="${icon}" alt="icon cuaca">
  `;
});

// =============== THEME TOGGLE ===============
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});
