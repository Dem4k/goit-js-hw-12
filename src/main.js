import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImages } from './js/pixabay-api';
import {
  clearGallery,
  hideLoader,
  renderImages,
  showLoader,
} from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(event) {
  event.preventDefault();
  const searchValue = searchForm.elements.searchValue.value.trim();
  clearGallery();
  if (searchValue === '') {
    iziToast.warning({
      position: 'topRight',
      title: 'Caution',
      message: 'Please enter a search query',
    });
    return;
  }
  showLoader();

  setTimeout(() => {
    getImages(searchValue)
      .then(({ hits }) => {
        hideLoader();
        if (hits.length === 0) {
          iziToast.error({
            position: 'topRight',
            title: 'Caution',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
          return;
        }
        renderImages(hits);
        lightbox.refresh();
      })
      .catch(error => {
        hideLoader();
        iziToast.error({
          position: 'topRight',
          title: 'Caution',
          message: 'Sorry something wrong! Try again later',
        });
        console.log(error);
      });
  }, 1000);
}
