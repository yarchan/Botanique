import { baseApi } from './base-api.js';
import { addToDate } from './get-date.js' 

const deviceId = localStorage.getItem('deviceId')
const deviceName = localStorage.getItem('deviceName')

const createDeviceDesckriptionList = (device) => {
  const dateStart = new Date(device.date_start).toLocaleString() ;
  const typeWorks = device.type_works;
  const works = device.works;
  const userName = device.user_name;
  const checked = device.checked === true ? './public/assets/check.svg' : ''
  const phrases = works.split(',');
  const formatPhrase = (phrase) => {
    const [key, value] = phrase.split(': **');
    if (key && value) {
      return `<div class ="analytics__item-text-works"> <p class = "analytics__item-text-bold">${key}:</p> ${value.replace(/\*{2}/g, '')}</div>`;
    }
    return ''; 
  };
  const formattedPhrases = phrases.map((phrase) => {
    const formatted = formatPhrase(phrase.trim());
    return `${formatted}`;
  }).join('');
  const listItem = `
    <li class="analytics__item">
    <div class="analytics__item-text">${dateStart}</div>
    <div class="analytics__item-text">${typeWorks}</div>
    <div class="analytics__item-text">${formattedPhrases}</div>
    <div class="analytics__item-text">
      <p>Результат</p>
      <div class="analytics__item-img">
        <img  src="${checked}" alt="">
      </div>
    </div>
    <div class="analytics__item-text analytics__item-user">${userName}</div>
  </li>  
  `;
  return listItem;
};

const getDevicesDescription = async (descriptionId) => {
  let url = `${baseApi}device_description`;
  if (descriptionId) {
    url += `/${descriptionId}`; 
  }

  await fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
  .then(data => {
    const analyticsList = document.querySelector('.analytics__list');
    const date = new Date(data[0].date_start).toLocaleString();
    const dateStart = document.getElementById('date-start')
    dateStart.textContent = '' + date
    data.forEach(device => {
      const listItem = createDeviceDesckriptionList(data[0]);
      analyticsList.innerHTML += listItem;
    });
  })
  .catch(error => {
    console.error('Ошибка при выполнении запроса:', error);
  });
}

getDevicesDescription(deviceId).then(()=>{
  document.getElementById('analytics-title').textContent = deviceName
  const dateStart = document.getElementById('date-start')
  let dateEnd = document.getElementById('date-end')
  dateEnd.textContent = '' + addToDate('2 недели',dateStart.textContent)
  const intervals = document.querySelectorAll('.analytics__content-interval-item')
  intervals.forEach(interval => {
    interval.addEventListener("click", () => {
      intervals.forEach(interval => {interval.classList.remove('analytics__content-interval-item-active')})
      interval.classList.add('analytics__content-interval-item-active')
      dateEnd.textContent = '' + addToDate(interval.textContent,dateStart.textContent)
    });
  });
  
  const analyticsList = document.querySelectorAll('.analytics__item');
  let maxHeight = 0
  
  analyticsList.forEach((el)=>{
    maxHeight = el.offsetHeight >maxHeight ? el.offsetHeight  : maxHeight
  })
  analyticsList.forEach((el) => {
    el.style.height = `${maxHeight}px`;
  });
   
})

