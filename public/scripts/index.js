let initialization = false
const loadPage=(page)=> {
  const navTitles = document.querySelectorAll('.header__nav-title');
  navTitles.forEach(title => {
    title.classList.contains('header__nav-choose') ? title.classList.remove('header__nav-choose') : title.classList.add('header__nav-choose');
  });
  fetch(page)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(content => {
      if (page.endsWith('.html')) {
        document.getElementById('pageContent').innerHTML = content;
        sessionStorage.setItem('page',page)
        if(page ==='./pages/main.html') getDevices(initialization)
        initialization = true
      } else {
        const style = document.createElement('style');
        style.textContent = content;
        document.head.appendChild(style);
      }
    })
    .catch(error => {
      console.log('Error loading page:', error);
      loadPage('./pages/error.html');
    });
}

loadPage('./pages/analytics.html');

