const auth = "563492ad6f91700001000001f06d0676ae3f4d07a10f9e1214bb9920";
const gallarey = document.querySelector(".gallarey");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners

searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadPictures);

async function fetchApi(url) {
  const fetchData = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await fetchData.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const gallareyImg = document.createElement("div");
    gallareyImg.classList.add("gallarey-img");
    gallareyImg.innerHTML = ` 
        <div class="gallarey-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img> 
        `;
    gallarey.appendChild(gallareyImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(search) {
  fetchLink = `https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`;
  clearPhotos();
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clearPhotos() {
  gallarey.innerHTML = "";
  searchInput.value = "";
}

async function loadPictures() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
