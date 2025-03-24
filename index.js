import{a as g,S as v,i}from"./assets/vendor-BjRz3xa9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function e(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=e(t);fetch(t.href,a)}})();const L="49320414-34c235123b434a4e0d748057d";async function h(r,s=1,e=15){try{return await g.get("https://pixabay.com/api/",{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:e}})}catch(o){throw console.error("Error fetching data from Pixabay API:",o),o}}const m=document.querySelector(".gallery");let u;function w(){m.innerHTML=""}function f(r){const s=r.map(e=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img src="${e.webformatURL}" alt="${e.tags}" width="360" height="240" />
            </a>
            <div class="description-container">
                <div class="description">
                    <p class="gallery-item-text">Likes</p>
                    <span>${e.likes}</span>
                </div>
                <div class="description">
                    <p class="gallery-item-text">Views</p>
                    <span>${e.views}</span>
                </div>
                <div class="description">
                    <p class="gallery-item-text">Comments</p>
                    <span>${e.comments}</span>
                </div>
                <div class="description">
                    <p class="gallery-item-text">Downloads</p>
                    <span>${e.downloads}</span>
                </div>
            </div>
        </li>`).join("");m.insertAdjacentHTML("beforeend",s),u?u.refresh():u=new v(".gallery a",{captionsData:"alt",captionDelay:250})}const S=document.querySelector(".form"),c=document.querySelector(".loader"),n=document.querySelector(".load-more");document.querySelector(".gallery");let l=1,y="",p=0;n.classList.add("visually-hidden");S.addEventListener("submit",b);n.addEventListener("click",q);async function b(r){r.preventDefault();const s=document.querySelector('input[name="search-text"]').value.trim();if(s===""){i.show({title:"Error",message:"Please enter a search query!"});return}y=s,l=1,w(),n.classList.add("visually-hidden"),c.classList.remove("visually-hidden");try{const e=await h(y,l);p=e.data.totalHits,e.data.hits.length===0?i.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}):(f(e.data.hits),e.data.hits.length<p&&n.classList.remove("visually-hidden"))}catch(e){console.error(e),i.show({title:"Error",message:"Sorry, there was an error processing your request. Please try again!"})}finally{c.classList.add("visually-hidden")}}async function q(){l+=1,c.classList.remove("visually-hidden");try{const r=await h(y,l);f(r.data.hits),l*15>=p&&(n.classList.add("visually-hidden"),i.show({title:"Info",message:"We're sorry, but you've reached the end of search results."})),P()}catch(r){console.error(r),i.show({title:"Error",message:"Sorry, there was an error processing your request. Please try again!"})}finally{c.classList.add("visually-hidden")}}function P(){const r=document.querySelector(".gallery-item");if(r){const{height:s}=r.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
