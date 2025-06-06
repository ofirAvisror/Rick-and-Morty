import { locationService } from "../services/locations-service.js";

let currentPage = 1;

const elList = document.getElementById("locationsList");
const elPrevPageBtn = document.querySelector(".prevPage");
const elNextPageBtn = document.querySelector(".nextPage");
const elFilterName = document.getElementById("filterTitle");
const elFilterType = document.getElementById("filterType");

window.addEventListener("DOMContentLoaded", () => {
  locationService.loadLocations(() => {
    renderList();
  }, currentPage);

  elFilterName.addEventListener("input", renderList);
  elFilterType.addEventListener("input", renderList);

  elPrevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      locationService.loadLocations(renderList, currentPage);
    }
  });

  elNextPageBtn.addEventListener("click", () => {
    currentPage++;
    locationService.loadLocations(renderList, currentPage);
  });
});

function renderList() {
  const filterBy = {
    title: elFilterName.value,
    type: elFilterType.value,
  };

  const locations = locationService.getLocations(filterBy);
  const strHTMLs = locations
    .map((loc) => {
      const favoriteClass = loc.favorite ? "is-favorite" : "";
      return `
        <div class="episode-item">
          <img src="../../assets/images/fuck.jpeg" alt="${loc.name}">
          <h3 class="episode-title">${loc.name}</h3>
          <p class="episode-author">${loc.type}</p>
          <p class="episode-genre">${loc.dimension}</p>
          <div class="episode-actions">
            <button class="details-btn" onclick="window.location = 'locations-details.html?locationId=${loc.id}&page=${currentPage}'">Details</button>
            <button class="favorite-btn ${favoriteClass}" onclick="onToggleFavorite('${loc.id}')">Favorite</button>
          </div>
        </div>`;
    })
    .join("");

  elList.innerHTML = strHTMLs;
}

function onToggleFavorite(locationId) {
  locationService.toggleFavorite(locationId);
  renderList();
}

window.onToggleFavorite = onToggleFavorite;
