import{a as d,S as P,i}from"./assets/vendor-C-TexYiS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();d.defaults.baseURL="https://pixabay.com/api/";async function p(a,t,r){const s="44400014-e8ce3fc6f032fabdec0605d2e",o=`?${new URLSearchParams({key:s,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:r})}`,{data:n}=await d(o);return n}const h=document.querySelector(".gallery"),f=document.querySelector(".loader"),y=document.querySelector(".load-more");function g(a){const t=a.map(({webformatURL:r,largeImageURL:s,likes:e,comments:o,downloads:n,views:q,tags:M})=>`<li class="gallery-item">
      <a class="item-link" href="${s}"><img src="${r}" alt="${M}" /></a>
          <div class="thumb">
            <p class="thumb-item">Likes <span class="thumb-counts">${e}</span></p>
            <p class="thumb-item">Views <span class="thumb-counts">${q}</span></p>
            <p class="thumb-item">Comments <span class="thumb-counts">${o}</span></p>
            <p class="thumb-item">Downloads <span class="thumb-counts">${n}</span></p>
          </div>
        </li>
  `).join("");h.insertAdjacentHTML("beforeend",t)}function R(){h.innerHTML=""}function b(){f.style.display="block"}function L(){f.style.display="none"}function w(){y.style.display="flex"}function u(){y.style.display="none"}const S=document.querySelector(".search-form"),$=document.querySelector(".load-more");S.addEventListener("submit",B);$.addEventListener("click",T);let l="",c=1;const m=15,v=new P(".gallery a",{captionsData:"alt",captionDelay:250});function B(a){if(a.preventDefault(),l=S.elements.searchValue.value.trim(),R(),c=1,u(),l===""){i.warning({position:"topRight",title:"Caution",message:"Please enter a search query"});return}b(),setTimeout(async()=>{try{const{hits:t,totalHits:r}=await p(l,c,m);if(t.length===0){i.error({position:"topRight",title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!"});return}g(t),v.refresh(),w(),Math.ceil(r/m)===c&&(u(),i.info({position:"topRight",title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch(t){i.error({position:"topRight",title:"Caution",message:"Sorry something wrong! Try again later"}),console.log(t)}finally{L()}},1e3)}function T(a){c+=1,b(),u(),setTimeout(async()=>{try{const{hits:t,totalHits:r}=await p(l,c,m);g(t),w(),v.refresh();const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"}),Math.ceil(r/m)===c&&(u(),i.info({position:"topRight",title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch(t){i.error({position:"topRight",title:"Error",message:"Sorry something wrong! Try again later"}),console.log(t)}finally{L()}},1e3)}
//# sourceMappingURL=commonHelpers.js.map
