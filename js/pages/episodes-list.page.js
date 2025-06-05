import { episodeService } from "../services/Episodes-service.js";
import { ELEMENT_ID } from "../shared/constants.js";

document.addEventListener("DOMContentLoaded", initEpisodeList);

function initEpisodeList() {
  episodeService.loadEpisodes(() => {
    renderEpisodes();
    document
      .getElementById("applyFilterBtn")
      ?.addEventListener("click", onSetFilter);
    document
      .getElementById("clearFilterBtn")
      ?.addEventListener("click", onClearFilter);
  });
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

function getEpisodeImage(episodeCode) {
  const seasonMatch = episodeCode.match(/S(\d{2})/);
  if (!seasonMatch) return "../../assets/images/book.jpeg";

  const season = seasonMatch[1];
  switch (season) {
    case "01":
      return "../../assets/images/season1.png";
    case "02":
      return "../../assets/images/season2.png";
    case "03":
      return "../../assets/images/season3.png";
    case "04":
      return "../../assets/images/season4.png";
    case "05":
      return "../../assets/images/season4.png";
    default:
      return "../../assets/images/book.jpeg";
  }
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

function onDeleteEpisode(episodeId) {
  if (confirm("Are you sure you want to delete this episode?")) {
    episodeService.deleteEpisode(episodeId);
    renderEpisodes();
  }
}

function onToggleFavorite(episodeId) {
  episodeService.toggleFavorite(episodeId);
  renderEpisodes();
}

function onViewDetails(episodeId) {
  window.location.href = `episode-details.html?episodeId=${episodeId}`;
}

function onEditEpisodePage(episodeId) {
  window.location.href = `edit-episode.html?episodeId=${episodeId}`;
}

window.onDeleteEpisode = onDeleteEpisode;
window.onToggleFavorite = onToggleFavorite;
window.onViewDetails = onViewDetails;
window.onEditEpisodePage = onEditEpisodePage;
