import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getRequest } from "./js/pixabay-api";
import {renderGallery, clearGallery} from "./js/render-functions"

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

loadMoreBtn.classList.add('visually-hidden');

form.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleFormSubmit(event) { 
    event.preventDefault();
    
    const getInputValue = document.querySelector('input[name="search-text"]').value.trim();

    if (getInputValue === '') { 
        iziToast.show({
            title: 'Error',
            message: 'Please enter a search query!'
        });
        return;
    }

    currentQuery = getInputValue;
    currentPage = 1;
    clearGallery(); // Очистити галерею
    loadMoreBtn.classList.add('visually-hidden');

    loader.classList.remove('visually-hidden');

    try {
        const response = await getRequest(currentQuery, currentPage);
        totalHits = response.data.totalHits;

        if (response.data.hits.length === 0) { 
            iziToast.show({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!'
            });
        } else {
            renderGallery(response.data.hits);

            if (response.data.hits.length < totalHits) {
                loadMoreBtn.classList.remove('visually-hidden');
            }
        }
    } catch (error) {
        console.error(error);
        iziToast.show({
            title: 'Error',
            message: 'Sorry, there was an error processing your request. Please try again!'
        });
    } finally {
        loader.classList.add('visually-hidden');
    }
}

async function handleLoadMore() {
    currentPage += 1;
    loader.classList.remove('visually-hidden');

    try {
        const response = await getRequest(currentQuery, currentPage);
        renderGallery(response.data.hits);

        const totalLoadedImages = currentPage * 15;
        if (totalLoadedImages >= totalHits) {
            loadMoreBtn.classList.add('visually-hidden');
            iziToast.show({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results."
            });
        }

        smoothScroll();
    } catch (error) {
        console.error(error);
        iziToast.show({
            title: 'Error',
            message: 'Sorry, there was an error processing your request. Please try again!'
        });
    } finally {
        loader.classList.add('visually-hidden');
    }
}

function smoothScroll() {
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
        const { height } = galleryItem.getBoundingClientRect();
        window.scrollBy({
            top: height * 2,
            behavior: 'smooth',
        });
    }
}