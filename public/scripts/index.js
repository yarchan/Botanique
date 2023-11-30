let initialization = true
export const loadPage = (page) => {
  const navTitles = document.querySelectorAll('.header__nav-title');
  navTitles.forEach((title) => {
    title.classList.contains('header__nav-choose')
      ? title.classList.remove('header__nav-choose')
      : title.classList.add('header__nav-choose');
  });

  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      if (page.endsWith('.html')) {
        document.getElementById('pageContent').innerHTML = content;
        sessionStorage.setItem('page', page);
        const pageName = page.match(/([^/]+)(?=\.\w+$)/)[0];
        initialization ? loadModuleScript(`./scripts/${pageName}.js`) : reloadScript(`./scripts/${pageName}.js`) 
        initialization = false
      } else {
        const style = document.createElement('style');
        style.textContent = content;
        document.head.appendChild(style);
      }
    })
    .catch((error) => {
      console.error('Error loading page:', error);
      loadPage('./pages/error.html');
    });
};

export const loadModuleScript=(src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'module'; 
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
export const reloadScript = (src) => {
  const cacheBust = `?t=${new Date().getTime()}`;
  const scriptSrc = `${src}${cacheBust}`;

  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) {
    existingScript.remove();
  }
  return loadModuleScript(scriptSrc);
};