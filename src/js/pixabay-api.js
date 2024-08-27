import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(searchValue, page, perPage) {
  const API_KEY = '44400014-e8ce3fc6f032fabdec0605d2e';
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });
  const url = `?${params}`;
  const { data } = await axios(url);
  return data;
}
