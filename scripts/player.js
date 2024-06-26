let innerHtml = '';
document.addEventListener("DOMContentLoaded",parseURL);

function parseURL(){
  const urlObj = new URL(window.location.href);
  const videoId = urlObj.searchParams.get("id");
  const url = `https://www.youtube.com/embed/${videoId}`;
  getVideoDetails(url);
};

function getVideoDetails(url){
  const receivedData = sessionStorage.getItem("video");
  const parsedData = JSON.parse(receivedData);
  renderPlayer(parsedData,url);
  document.getElementById("player-injector").innerHTML = innerHtml;
};

function renderPlayer(data,url){
 innerHtml = 
  `<div class="plyer-item">
    <div class="player-container">
    <iframe src=${url} autoplay></iframe>
  </div>
  </div>
  <div class="video-detail">
    <span class="channel-thumbnail">
      <img src=${data.thumbnail}>
    </span>
    <div class="video-info">
      <span class="video-title">
      ${data.videoTitle}
        </span>
      <div class="video-channel-info">
        <span>${data.channelTitle}</span>•
        <span>216k views</span>•
        <span>2days ago</span>
       </div>
     </div>
   </div>`;
};