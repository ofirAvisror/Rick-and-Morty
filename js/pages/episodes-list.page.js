import { episodeService } from "../services/Episodes-service.js";
import { ELEMENT_ID } from "../shared/constants.js";
import { getEpisodeImage } from "../services/utils.service.js";

let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const pageFromURL = +params.get("page");
  if (pageFromURL) currentPage = pageFromURL;

  initEpisodeList();
});

document.querySelector(".nextPage").addEventListener("click", () => {
  if (currentPage < 3) {
    currentPage++;
    episodeService.loadEpisodes(renderEpisodes, currentPage);
  }
});

document.querySelector(".prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    episodeService.loadEpisodes(renderEpisodes, currentPage);
  }
});

function initEpisodeList() {
  episodeService.loadEpisodes(() => {
    renderEpisodes();
    document
      .getElementById("applyFilterBtn")
      ?.addEventListener("click", onSetFilter);
    document
      .getElementById("clearFilterBtn")
      ?.addEventListener("click", onClearFilter);
  }, currentPage);
}

function renderEpisodes(filterBy = {}) {
  const episodes = episodeService.getEpisodes(filterBy);
  const elEpisodeList = document.getElementById(ELEMENT_ID.EPISODE_LIST);
  if (!elEpisodeList) return;

  if (!episodes || episodes.length === 0) {
    elEpisodeList.innerHTML =
      "<p>No episodes found. Try adjusting your filters or add some episodes!</p>";
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
  const title = document.getElementById("filterTitle").value;
  const season = document.getElementById("filterSeason").value;
  const filterBy = {};
  if (title) filterBy.title = title;
  if (season) filterBy.season = parseInt(season);
  renderEpisodes(filterBy);
}

function onClearFilter() {
  document.getElementById("filterTitle").value = "";
  document.getElementById("filterSeason").value = "";
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
