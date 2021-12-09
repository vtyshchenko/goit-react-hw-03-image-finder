import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const KEY = '23423301-88813f09fe7b27f5f83c66d56';

async function fetchImages(searchQuery, page, perPage, onError) {
  if (searchQuery.length === 0) {
    return Promise.resolve('');
  }

  const url = `${BASE_URL}&q=${searchQuery}&page=${page}&per_page=${perPage}&key=${KEY}`;
  return axios
    .get(url)
    .then(response => {
      if (response.status === 200) {
        return response.data.hits;
      } else {
        return [];
      }
    })
    .catch(onError);
}

export default fetchImages;
