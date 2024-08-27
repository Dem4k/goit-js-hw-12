// Список параметров строки запроса, которые необходимо обязательно указать:

// key твой уникальный ключ доступа к API.
// q - слово для поиска. То, что будет вводить пользователь.
// image_type – тип изображения. Нужны только фотографии, поэтому поставь значение  photo.
// orientation – ориентация фотографии. Поставь значение  horizontal.
// safesearch - фильтр по возрасту. Поставь значение  true.

export function getImages(searchValue) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '44400014-e8ce3fc6f032fabdec0605d2e';
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}?${params}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
