(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();async function u(n){const a=await(await fetch(n)).json(),c=await v(a),t=await y(c);return await g(c,t.items)}async function v(n){return await n.items.map(a=>{const{id:c,snippet:t}=a,{thumbnails:s,channelId:o,channelTitle:d,title:i}=t;return{videoId:c,thumbnails:s,channelId:o,channelTitle:d,title:i}})}async function y(n){const s=`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${n.map(i=>i.channelId).join(",")}&key=AIzaSyCpeTCqG8w56qWE3WA-loelZU96jTmS0nI`;return await(await fetch(s)).json()}async function g(n,e){return n.map(c=>{const t=e.find(s=>s.id===c.channelId);return{...c,channelInfo:t}})}const b="AIzaSyCpeTCqG8w56qWE3WA-loelZU96jTmS0nI",w="https://www.googleapis.com/youtube/v3",I=document.querySelector("#feed-injector");let l="";async function p(){const n=`${w}/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=US&key=${b}`,e=await u(n);h(e)}function h(n){n.forEach(e=>{const{high:a,medium:c,standard:t}=e.thumbnails,s=encodeURIComponent(e.title);l+=`<div class="feed-item">
    <a href=${`player?id=${e.videoId}`} data-channel-title=${e.channelTitle} data-thumbnail=${c.url} data-video-title=${s} id="feed-item-click">
    <div class="thumbnail-container">
    <picture>
    <source src=${a.url} />
    <img src=${c.url} />
    </picture>
  </div>
  <div class="video-detail">
    <span class="channel-thumbnail">
      <img src=${e.channelInfo.snippet.thumbnails.high.url}>
    </span>
    <div class="video-info">
      <span class="video-title">
      ${e.title}
        </span>
      <div class="video-channel-info">
        <span class="channel-title">${e.channelTitle}</span> •
        <span>216k views</span> •
        <span>2days ago</span>
       </div>
     </div>
   </div>
   </a>
  </div>`}),I.innerHTML=l}p();document.addEventListener("click",n=>{S(n)});function S(n){const e=n.target.closest("#feed-item-click");if(e){const a=e.getAttribute("data-channel-title"),c=e.getAttribute("data-thumbnail"),t=decodeURIComponent(e.getAttribute("data-video-title"));sessionStorage.setItem("video",JSON.stringify({videoTitle:t,thumbnail:c,channelTitle:a}))}}document.addEventListener("scroll",()=>{window.innerHeight+window.scrollY>=document.body.offsetHeight&&p()});const r=document.querySelector(".header");document.querySelector("#feed-injector");const m=`
  <div class="prev-search-box">
    <div class="logo-name">
      <span class="logo">
        <img src="/public/icon.png">
      </span>
      <span class="name">YouTube</span>
    </div>
    <div class="search-icon">
      <span class="icon" id="search">
        <img src="./public/search-icon.png">
      </span>
    </div>
  </div>
`,L=`
  <div class="new-search-box">
    <span class="back-icon" id="back">
      <img src="/back.png">
    </span>
    <span class="search-box" id="search-box">
      <input type="text" placeholder="Search YouTube" id="search-input">
    </span>
  </div>
`;document.addEventListener("DOMContentLoaded",()=>{r.innerHTML=m,f()});function f(){document.querySelector("#search").addEventListener("click",()=>{r.innerHTML=L,E()})}function E(){const n=document.querySelector("#back"),e=document.querySelector("#search-input");n.addEventListener("click",()=>{r.innerHTML=m,f()}),e.addEventListener("keypress",a=>{a.key=="Enter"&&T(a.target.value)})}async function T(n){const e=`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCpeTCqG8w56qWE3WA-loelZU96jTmS0nI&part=snippet&type=video&maxresult=10&q=${n}`,a=await u(e);h(a)}
