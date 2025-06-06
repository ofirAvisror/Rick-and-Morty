import { characterService } from "../services/characters-service.js";

let currentPage = 1;

const elList = document.getElementById("charactersList");
const elPrevPageBtn = document.querySelector(".prevPage");
const elNextPageBtn = document.querySelector(".nextPage");
const elFilterName = document.getElementById("filterTitle");

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const pageFromURL = +params.get("page");
  if (pageFromURL) currentPage = pageFromURL;

  characterService.loadCharacter(() => {
    renderList();
  }, currentPage);

  elFilterName.addEventListener("input", renderList);

  elPrevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      characterService.loadCharacter(renderList, currentPage);
    }
  });

  elNextPageBtn.addEventListener("click", () => {
    currentPage++;
    characterService.loadCharacter(renderList, currentPage);
  });
});

function renderList() {
  const filterBy = {
    title: elFilterName.value,
  };

  const characters = characterService.getCharacters(filterBy);
  const strHTMLs = characters
    .map((ch) => {
      const favoriteClass = ch.favorite ? "is-favorite" : "";
      return `
      <div class="episode-item">
        <img src="${ch.image}" alt="${ch.name}">
        <h3 class="episode-title">${ch.name}</h3>
        <p class="episode-author">${ch.species}</p>
        <p class="episode-genre">${ch.gender}</p>
        <div class="episode-actions">
          <button class="details-btn" onclick="window.location='characters-details.html?characterId=${ch.id}&page=${currentPage}'">Details</button>
          <button class="favorite-btn ${favoriteClass}" onclick="onToggleFavorite('${ch.id}')">Favorite</button>
        </div>
      </div>`;
    })
    .join("");

  elList.innerHTML = strHTMLs;
}

function onToggleFavorite(characterId) {
  characterService.toggleFavorite(characterId);
  renderList();
}

window.onToggleFavorite = onToggleFavorite;
