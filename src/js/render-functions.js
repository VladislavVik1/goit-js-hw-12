import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
let lightbox;

export function clearGallery() {
    gallery.innerHTML = '';
}

export function renderGallery(images) {
    const markup = images.map(image => `
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" width="360" height="240" />
            </a>
            <div class="description-container">
                <div class="description">
                    <p class="gallery-item-text">Likes</p>
                    <span>${image.likes}</span>
                </div>
                <div class="description">
                    <p class="gallery-item-text">Views</p>
                    <span>${image.views}</span>
                </div>
                <div class="description">
                    <p class="gallery-item-text">Comments</p>
                    <span>${image.comments}</span>
                </div>
                <div class="description">
                    <p class="gallery-item-text">Downloads</p>
                    <span>${image.downloads}</span>
                </div>
            </div>
        </li>`
    ).join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
        });
    } else {
        lightbox.refresh();
    }
}