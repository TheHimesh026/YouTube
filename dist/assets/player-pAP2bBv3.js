import"./search-CTAJa6tL.js";let i="";document.addEventListener("DOMContentLoaded",s);function s(){const a=`https://www.youtube.com/embed/${new URL(window.location.href).searchParams.get("id")}`;t(a)}function t(e){const n=sessionStorage.getItem("video"),a=JSON.parse(n);o(a,e),document.getElementById("player-injector").innerHTML=i}function o(e,n){i=`<div class="plyer-item">
    <div class="player-container">
    <iframe src=${n} autoplay></iframe>
  </div>
  </div>
  <div class="video-detail">
    <span class="channel-thumbnail">
      <img src="https://yt3.ggpht.com/3095TIO28q9_IfeiM2Uqbr_vwxpJU_4zaNkzL5Pob7jaWApbb2E_U5sjKIkYBZ28qAjf6m43ZjY=s68-c-k-c0x00ffffff-no-rj">
    </span>
    <div class="video-info">
      <span class="video-title">
      ${e.videoTitle}
        </span>
      <div class="video-channel-info">
        <span>${e.channelTitle}</span>•
        <span>216k views</span>•
        <span>2days ago</span>
       </div>
     </div>
   </div>`}
