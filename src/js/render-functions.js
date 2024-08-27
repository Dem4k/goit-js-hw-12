const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

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
      <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" />
          <div>
            <p>Likes ${likes}</p>
            <p>Views ${views}</p>
            <p>Comments ${comments}</p>
            <p>Downloads ${downloads}</p>
          </div></a>
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
  loader.style.display = 'inline-block';
}

export function hideLoader() {
  loader.style.display = 'none';
}
