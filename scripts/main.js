import { fetchRequest, sortData,fetchChannelData } from "./function.js";
const KEY = import.meta.env.VITE_YOUTUBE_KEY;
const BASE_URL = import.meta.env.VITE_YOUTUBE_BASE_URL;
const feedInjector = document.querySelector("#feed-injector");

let innerHtml = '';

async function fetchHomeFeed(){
  const feedURL = `${BASE_URL}/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=US&key=${KEY}`;
   const result = await fetchRequest(feedURL);
   renderFeed(result);
};

export function renderFeed(data){
  data.forEach(info => {
    const { high,medium,standard } = info.thumbnails;
    const videoTitle = encodeURIComponent(info.title);
    innerHtml += 
   `<div class="feed-item">
    <a href=${`player?id=${info.videoId}`} data-channel-title=${info.channelTitle} data-thumbnail=${medium.url} data-video-title=${videoTitle} id="feed-item-click">
    <div class="thumbnail-container">
    <picture>
    <source src=${high.url} />
    <img src=${medium.url} />
    </picture>
  </div>
  <div class="video-detail">
    <span class="channel-thumbnail">
      <img src=${info.channelInfo.snippet.thumbnails.high.url}>
    </span>
    <div class="video-info">
      <span class="video-title">
      ${info.title}
        </span>
      <div class="video-channel-info">
        <span class="channel-title">${info.channelTitle}</span> •
        <span>216k views</span> •
        <span>2days ago</span>
       </div>
     </div>
   </div>
   </a>
  </div>`;
 });
 feedInjector.innerHTML = innerHtml;
};

fetchHomeFeed();

document.addEventListener("click",(event) => {
  saveVideoInfo(event)});

function saveVideoInfo(event){
  const videoData = event.target.closest("#feed-item-click");
  if(videoData){
  const channelTitle = videoData.getAttribute("data-channel-title");
  const thumbnail = videoData.getAttribute("data-thumbnail");
  const videoTitle = decodeURIComponent(videoData.getAttribute("data-video-title"));
  sessionStorage.setItem("video",JSON.stringify({videoTitle,thumbnail,channelTitle}));
  }
};


document.addEventListener("scroll",() => {
  if((window.innerHeight + window. scrollY >= document.body.offsetHeight)){
    fetchHomeFeed();
  }
});