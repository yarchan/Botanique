import {loadModuleScript} from './index.js'

const loadPage = (page) => {
  loadModuleScript('./public/scripts/index.js') 
    .then(() => {
      import('./index.js')
        .then((indexModule) => {
          const { loadPage } = indexModule; 
          loadPage(page);
        })
        .catch((error) => {
          console.error('Ошибка при импорте index.js:', error);
        });
    })
    .catch((error) => {
      console.error('Ошибка при загрузке index.js:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadPage('./public/pages/main.html')
});

document.addEventListener('DOMContentLoaded', () => {
  const mainNavTitle = document.getElementById('main');
  const analyticsNavTitle = document.getElementById('analytics');

  mainNavTitle.addEventListener('click', () => {
    loadPage('./public/pages/main.html');
  });

  analyticsNavTitle.addEventListener('click', () => {
    loadPage('./public/pages/analytics.html');
  });
});