// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Подключение базового набора функционала
import lightGallery from "lightgallery";

// Плагины
// lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, lgShare, lgThumbnail, lgVideo, lgMediumZoom
// import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
//import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'

// Базовые стили
import "@scss/libs/gallery/lightgallery.scss";
// Стили дополнений
// import '@scss/libs/gallery/lg-thumbnail.scss';
// import '@scss/libs/gallery/lg-video.scss';
// import '@scss/libs/gallery/lg-autoplay.scss';
// import '@scss/libs/gallery/lg-zoom.scss';
// import '@scss/libs/gallery/lg-pager.scss';
// import '@scss/libs/gallery/lg-fullscreen.scss';
// import '@scss/libs/gallery/lg-share.scss';
// import '@scss/libs/gallery/lg-comments.scss';s
// import '@scss/libs/gallery/lg-rotate.scss';
// import '@scss/libs/gallery/lg-medium-zoom.scss';
// import '@scss/libs/gallery/lg-relative-caption.scss';

// Запуск
const galleries = document.querySelectorAll("[data-gallery]");
if (galleries.length) {
    let galleyItems = [];
    galleries.forEach((gallery) => {
        galleyItems.push({
            gallery,
            galleryClass: lightGallery(gallery, {
                // plugins: [lgZoom, lgThumbnail],
                licenseKey: process.env.REACT_APP_GALLERY_KEY,
                speed: 500,
            }),
        });
    });
    // Добавляем в объект модулей
    flsModules.gallery = galleyItems;
}
