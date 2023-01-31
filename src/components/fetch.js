import axios from 'axios';
import Notiflix from 'notiflix';

export async function fetchImages(value, pageNumber) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${value}&page=1&key=31911886-b70f9395e6a878339225ca253&image_type=photo&orientation=horizontal&per_page=12&page=${pageNumber}`,
    { params: {} }
  );
  if (response.data.total === 0) {
    Notiflix.Notify.failure('There is no images');
    return;
  }
  // console.log('Responce from fetch.js', responce.data.hits);
  Notiflix.Notify.success(`Hooray, we found ${response.data.total} images`);
  return response.data;
}
