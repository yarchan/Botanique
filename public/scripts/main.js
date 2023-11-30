import { baseApi } from './base-api.js';

const createDeviceListItem = (device) => {
  const statusText = device.status ? 'Свободен' : 'Занят';
  const noticeImg = device.notice === '1' ? './public/assets/notice.svg' : (device.notice === '2' ? './public/assets/non-notice.svg' : './public/assets/unnotice.svg');
  const imageData = device.img;
  const listItem = `
    <li id=${device.device_id} class="devices__item">
    <img class="devices__item-img-device" src="data:image/svg+xml;base64,${imageData}">
    <div class="devices__item-title">${device.name}</div>
    <div class="devices__dropdown" id="statusBlock">
      <div class="devices__dropdown-wrapper">
        <button class="devices__dropdown-status" onclick="toggleDropdown()">
          <p class="devices__dropdown-status-text">${statusText}</p> 
          <div id="dropdownArrow" class="devices__dropdown-status-img">
            <img src="./public/assets/arrow.svg" alt=""> 
          </div>
        </button>
        <ul class="devices__dropdown-list devices__dropdown-list-close" id="dropdownList">
          <li class="devices__dropdown-item" onclick="setStatus('Свободен')">Свободен</li>
          <li class="devices__dropdown-item" onclick="setStatus('Занят')">Занят</li>
        </ul>
      </div>
    </div>  
    <img class="devices__item-img-notice" src="${noticeImg}">
  </li>
  `;
  return listItem;
};

const getDevices = () => {
  return fetch(`${baseApi}devices`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const devicesList = document.querySelector('.devices__list');
      data.forEach(device => {
        const listItem = createDeviceListItem(device);
        devicesList.innerHTML += listItem;
      });
    })
    .catch(error => {
      console.error('Ошибка при выполнении запроса:', error);
      throw error; 
    });
};

const goToDescription = (page) => {
  import('./index.js')
    .then((indexModule) => {
      const { loadPage } = indexModule; 
      loadPage(page);
    })
    .catch((error) => {
      console.error('Ошибка при импорте index.js:', error);
    });
};

export let deviceId 
export let deviceName

getDevices()
  .then(() => {
    const devicesList = document.querySelector('.devices__list');
    devicesList.addEventListener('click', (event) => {
      const clickedItem = event.target.closest('.devices__item');
      if (clickedItem) {
        localStorage.setItem('deviceId',clickedItem.id ) 
        localStorage.setItem('deviceName',clickedItem.querySelector('.devices__item-title').textContent) 
        goToDescription('./public/pages/analytics.html');
      }
    });
  })
  .catch((error) => {
    console.error('Ошибка при получении устройств:', error);
  });


const toggleDropdown=()=> {
  const dropdown = document.getElementById('dropdownList');
  const dropdownarrow = document.getElementById('dropdownArrow');
  dropdownarrow.classList.toggle('devices__dropdown-status-img-rotate');
  if(!dropdown.classList.contains('devices__dropdown-list-close')) {
    dropdown.classList.toggle('devices__dropdown-list-open');
    setTimeout(()=>{
      dropdown.classList.toggle('devices__dropdown-list-close');
    },200)
  } else{
    dropdown.classList.toggle('devices__dropdown-list-close');
    setTimeout(()=>{
      dropdown.classList.toggle('devices__dropdown-list-open');
    })
  } 
}

const setStatus=(status) => {
  const statusBlock = document.getElementById('statusBlock');
  const currentStatus = statusBlock.querySelector('.devices__dropdown-status-text');
  currentStatus.textContent = status;
  toggleDropdown();
}
