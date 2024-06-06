// const header = document.querySelector(".header");
// let searchQuery = "";

// const defaultState =
//     `<div class="prev-search-box">
//         <div class="logo-name">
//           <span class="logo">
//             <img src="/public/icon.png">
//           </span>
//           <span class="name">YouTube</span>
//         </div>
//         <div class="search-icon">
//           <span class="icon" id="search">
//             <img src="./public/search-icon.png">
//           </span>
//         </div>
//       </div>`;
       
//   const newState = 
//     `<div class="new-search-box">
//         <span class="back-icon" id="back">
//           <img src="/back.png">
//         </span>
//         <span class="search-box" id="search" onchange="searching()">
//           <input type="text" placeholder="Search YouTube">
//         </span>
//       </div>`;
      

// document.addEventListener("DOMContentLoaded",() => {
//   //complex logic :) event listners loop
//   header.innerHTML = defaultState;
//   const searchBtn = document.querySelector("#search");
//   searchBtn.addEventListener("click",
//   () => {
//     header.innerHTML = newState;
//     const backBtn = document.querySelector("#back");
//   backBtn.addEventListener("click",
//   () => {
//     header.innerHTML = defaultState;
//     const searchBtn = document.querySelector("#search");
//   searchBtn.addEventListener("click",
//   () => {
//     header.innerHTML = newState;
//     const backBtn = document.querySelector("#back");
//   backBtn.addEventListener("click",
//   () => {
//     header.innerHTML = defaultState;
//       });
//     });
//   });
//   });
// });

// function searching(event){
//   console.log(event)
// };


// function searchVideo(input){
//   const searchURL = `${import.meta.env.BASE_URL}/search?key=${import.meta.env.KEY}&part=snippet&type=video&maxresult=10&q=${input}`;
//   fetch(searchURL)
//   .then(res => res.json())
//   .then(data => console.log(data))
// };

import { fetchRequest,
  fetchChannelData,
  sortData } from "./function.js";
import { renderFeed } from "./main.js";
const header = document.querySelector(".header");
let searchQuery = "";
const feedInjector = document.querySelector("#feed-injector");

const defaultState = `
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
`;

const newState = `
  <div class="new-search-box">
    <span class="back-icon" id="back">
      <img src="/back.png">
    </span>
    <span class="search-box" id="search-box">
      <input type="text" placeholder="Search YouTube" id="search-input">
    </span>
  </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize with default state
  header.innerHTML = defaultState;
  attachDefaultEventListeners();
});

function attachDefaultEventListeners() {
  const searchBtn = document.querySelector("#search");
  searchBtn.addEventListener("click", () => {
    header.innerHTML = newState;
    attachNewStateEventListeners();
  });
}

function attachNewStateEventListeners() {
  const backBtn = document.querySelector("#back");
  const searchInput = document.querySelector("#search-input");

  backBtn.addEventListener("click", () => {
    header.innerHTML = defaultState;
    attachDefaultEventListeners();
  });

  searchInput.addEventListener("keypress", (event) => {
    if(event.key == "Enter"){
      searchVideo(event.target.value);
    }
  });
}

async function searchVideo(input) {
  const searchURL = `${import.meta.env.VITE_YOUTUBE_BASE_URL}/search?key=${import.meta.env.VITE_YOUTUBE_KEY}&part=snippet&type=video&maxresult=10&q=${input}`;
  const result = await fetchRequest(searchURL);
  renderFeed(result);
}