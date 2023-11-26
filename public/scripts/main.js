// const getDevices =(initialization)=>{ 
//   if(!initialization) return  
//   fetch('http://localhost:3000/devices')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     const devicesList = document.querySelector('.devices__list');
    
//     data.forEach(device => {
//       const statusText = device.status ? 'Свободен' : 'Занят';
//       const noticeImg = device.notice === '1' ? './assets/notice.svg' : (device.notice === '2' ? './assets/non-notice.svg' : './assets/unnotice.svg');
//       const imageData = device.img
//       const listItem = `
//         <li class="devices__item">
//           <img class="devices__item-img-device" src="data:image/svg+xml;base64,${imageData}">
//           <div class="devices__item-title">${device.name}</div>
//           <div class="devices__dropdown" id="statusBlock">
//             <div class="devices__dropdown-wrapper">
//               <button class="devices__dropdown-status" onclick="toggleDropdown()">
//                 <p class="devices__dropdown-status-text">${statusText}</p> 
//                 <div id="dropdownArrow" class="devices__dropdown-status-img">
//                   <img src="./assets/arrow.svg" alt=""> 
//                 </div>
//               </button>
//               <ul class="devices__dropdown-list devices__dropdown-list-close" id="dropdownList">
//                 <li class="devices__dropdown-item" onclick="setStatus('Свободен')">Свободен</li>
//                 <li class="devices__dropdown-item" onclick="setStatus('Занят')">Занят</li>
//               </ul>
//             </div>
//           </div>  
//           <img class="devices__item-img-notice" src="${noticeImg}">
//         </li>
//       `;

//       devicesList.innerHTML += listItem;
//     });
//   })
//   .catch(error => {
//     console.error('Ошибка при выполнении запроса:', error);
//   });
// }

// getDevices(true)

// const toggleDropdown=()=> {
//   const dropdown = document.getElementById('dropdownList');
//   const dropdownarrow = document.getElementById('dropdownArrow');
//   dropdownarrow.classList.toggle('devices__dropdown-status-img-rotate');
//   if(!dropdown.classList.contains('devices__dropdown-list-close')) {
//     dropdown.classList.toggle('devices__dropdown-list-open');
//     setTimeout(()=>{
//       dropdown.classList.toggle('devices__dropdown-list-close');
//     },200)
//   } else{
//     dropdown.classList.toggle('devices__dropdown-list-close');
//     setTimeout(()=>{
//       dropdown.classList.toggle('devices__dropdown-list-open');
//     })
//   } 
// }

// const setStatus=(status) => {
//   const statusBlock = document.getElementById('statusBlock');
//   const currentStatus = statusBlock.querySelector('.devices__dropdown-status-text');
//   currentStatus.textContent = status;
//   toggleDropdown();
// }
