function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

Promise.all([
  loadScript('./scripts/index.js'),
  loadScript('./scripts/main.js'),
])
.then(() => {})
.catch((error) => {
  console.error('Ошибка при загрузке скриптов:', error);
});
