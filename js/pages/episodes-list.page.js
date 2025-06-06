import { episodeService } from "../services/Episodes-service.js";
import { ELEMENT_ID } from "../shared/constants.js";
import { getEpisodeImage } from "../services/utils.service.js";

let currentPage = 1;

const elFilterTitle = document.getElementById("filterTitle");
const elFilterSeason = document.getElementById("filterSeason");
const elNextPageBtn = document.querySelector(".nextPage");
const elPrevPageBtn = document.querySelector(".prevPage");

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const pageFromURL = +params.get("page");
  if (pageFromURL) currentPage = pageFromURL;

  initEpisodeList();

  elFilterTitle.addEventListener("input", renderEpisodes);
  elFilterSeason.addEventListener("input", renderEpisodes);

  elNextPageBtn.addEventListener("click", () => {
    if (currentPage < 3) {
      currentPage++;
      episodeService.loadEpisodes(renderEpisodes, currentPage);
    }
  });

  elPrevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      episodeService.loadEpisodes(renderEpisodes, currentPage);
    }
  });

  document
    .getElementById("applyFilterBtn")
    ?.addEventListener("click", onSetFilter);
  document
    .getElementById("clearFilterBtn")
    ?.addEventListener("click", onClearFilter);
});

function initEpisodeList() {
  episodeService.loadEpisodes(() => {
    renderEpisodes();
  }, currentPage);
}

function renderEpisodes() {
  const title = elFilterTitle.value;
  const season = elFilterSeason.value;

  const filterBy = {};
  if (title) filterBy.title = title;
  if (season) filterBy.season = parseInt(season);

  const episodes = episodeService.getEpisodes(filterBy);
  const elEpisodeList = document.getElementById(ELEMENT_ID.EPISODE_LIST);
  if (!elEpisodeList) return;

  if (!episodes || episodes.length === 0) {
    elEpisodeList.innerHTML =
      "<p>No episodes found. Try adjusting your filters.</p>";
    return;
  }

  const strHTMLs = episodes
    .map(
      (episode) => `
    <article class="episode-item" data-id="${episode.id}">
      <img src="${getEpisodeImage(episode.episode)}" alt="${episode.name}">
      <h3 class="episode-title">${episode.name}</h3>
      <p class="detail-item"><strong>Episode:</strong> ${episode.episode}</p>
      <div class="episode-actions">
        <button class="details-btn" onclick="window.onViewDetails('${
          episode.id
        }')">Details</button>
        <button class="favorite-btn ${
          episode.favorite ? "is-favorite" : ""
        }" onclick="window.onToggleFavorite('${episode.id}')">
          ${episode.favorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </article>
  `
    )
    .join("");

  elEpisodeList.innerHTML = strHTMLs;
}

function onSetFilter() {
  renderEpisodes();
}

function onClearFilter() {
  elFilterTitle.value = "";
  elFilterSeason.value = "";
  renderEpisodes();
}

function onToggleFavorite(episodeId) {
  episodeService.toggleFavorite(episodeId);
  renderEpisodes();
}

function onViewDetails(episodeId) {
  window.location.href = `episode-details.html?episodeId=${episodeId}&page=${currentPage}`;
}

window.onToggleFavorite = onToggleFavorite;
window.onViewDetails = onViewDetails;
