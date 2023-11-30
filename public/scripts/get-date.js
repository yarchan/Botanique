const convertToDateObject = (dateString) => {
  const [datePart, timePart] = dateString.split(', '); 
  const [day, month, year] = datePart.split('.');
  const [hours, minutes] = timePart.split(':');

  const formattedDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
  return formattedDate;
}
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

export const addToDate = (interval, date) => {
  let newDate = new Date(convertToDateObject(date)); 
  switch (interval) {
    case 'День':
      newDate.setDate(newDate.getDate() + 1);
      break;
    case 'Неделя':
      newDate.setDate(newDate.getDate() + 7);
      break;
    case '2 недели':
      newDate.setDate(newDate.getDate() + 14);
      break;
    case 'Месяц':
      newDate.setMonth(newDate.getMonth() + 1);
      break;
    case '3 месяца':
      newDate.setMonth(newDate.getMonth() + 3);
      break;
    case 'Полгода':
      newDate.setMonth(newDate.getMonth() + 6);
      break;
    default:
      break;
  }
  return formatDate(newDate);
}