const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

export function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        likes,
        comments,
        downloads,
        views,
        tags,
      }) => `<li class="gallery-item">
      <a class="item-link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" /></a>
          <div class="thumb">
            <p class="thumb-item">Likes <span class="thumb-counts">${likes}</span></p>
            <p class="thumb-item">Views <span class="thumb-counts">${views}</span></p>
            <p class="thumb-item">Comments <span class="thumb-counts">${comments}</span></p>
            <p class="thumb-item">Downloads <span class="thumb-counts">${downloads}</span></p>
          </div>
        </li>
  `
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'flex';
}

export function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}
