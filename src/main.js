import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImages } from './js/pixabay-api';
import {
  clearGallery,
  hideLoader,
  hideLoadMoreBtn,
  renderImages,
  showLoader,
  showLoadMoreBtn,
} from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

let searchValue = '';
let page = 1;
const perPage = 15;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onSearchFormSubmit(event) {
  event.preventDefault();
  searchValue = searchForm.elements.searchValue.value.trim();
  clearGallery();
  page = 1;
  hideLoadMoreBtn();
  if (searchValue === '') {
    iziToast.warning({
      position: 'topRight',
      title: 'Caution',
      message: 'Please enter a search query',
    });
    return;
  }
  showLoader();

  setTimeout(async () => {
    try {
      const { hits, totalHits } = await getImages(searchValue, page, perPage);

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
      showLoadMoreBtn();
      if (Math.ceil(totalHits / perPage) === page) {
        hideLoadMoreBtn();
        iziToast.info({
          position: 'topRight',
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } catch (error) {
      iziToast.error({
        position: 'topRight',
        title: 'Caution',
        message: 'Sorry something wrong! Try again later',
      });
      console.log(error);
    } finally {
      hideLoader();
    }
  }, 1000);
}

function onLoadMoreBtnClick(event) {
  page += 1;
  showLoader();
  hideLoadMoreBtn();
  setTimeout(async () => {
    try {
      const { hits, totalHits } = await getImages(searchValue, page, perPage);

      renderImages(hits);
      showLoadMoreBtn();
      lightbox.refresh();
      const cardHeight = document
        .querySelector('.gallery-item')
        .getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      if (Math.ceil(totalHits / perPage) === page) {
        hideLoadMoreBtn();
        iziToast.info({
          position: 'topRight',
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } catch (error) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Sorry something wrong! Try again later',
      });
      console.log(error);
    } finally {
      hideLoader();
    }
  }, 1000);
}
