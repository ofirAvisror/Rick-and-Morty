import { episodeService } from "../services/Episodes-service.js";
import { ELEMENT_ID } from "../shared/constants.js";

document.addEventListener("DOMContentLoaded", initEpisodeList);

function initEpisodeList() {
  renderEpisodes();
  document
    .getElementById("applyFilterBtn")
    ?.addEventListener("click", onSetFilter);
  document
    .getElementById("clearFilterBtn")
    ?.addEventListener("click", onClearFilter);
}

function renderEpisodes(filterBy = {}) {
  const episodes = episodeService.getEpisodes(filterBy);
  const elEpisodeList = document.getElementById(ELEMENT_ID.EPISODE_LIST);

  if (!elEpisodeList) {
    return;
  }

  if (!episodes || episodes.length === 0) {
    elEpisodeList.innerHTML =
      "<p>No episodes found. Try adjusting your filters or add some episodes!</p>";
    return;
  }

  const strHTMLs = episodes
    .map(
      (episode) => `
        <article class="episode-item" data-id="${episode.id}">
            <img src="${getEpisodeImage(episode.genre)}" alt="${episode.title}">
            <h3 class="episode-title">${episode.title}</h3>
            <p class="episode-author">By: ${episode.author}</p>
            <p class="episode-genre">Genre: ${episode.genre}</p>
            <p class="episode-year">Published: ${episode.year}</p>
            <p class="episode-price">$${episode.price.toFixed(2)}</p>
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

function getEpisodeImage(genre) {
  genre = genre ? genre.toLowerCase() : "default";
  switch (genre) {
    case "drama":
      return "../../assets/images/book.jpeg";
    case "fantasy":
      return "../../assets/images/bookFantasy.png";
    case "mystery":
      return "../../assets/images/bookMystery.png";
    default:
      return "../../assets/images/book.jpeg";
  }
}

function onSetFilter() {
  const title = document.getElementById("filterTitle").value;
  const minPrice = document.getElementById("filterMinPrice").value;
  const filterBy = {};
  if (title) filterBy.title = title;
  if (minPrice) filterBy.minPrice = parseFloat(minPrice);
  renderEpisodes(filterBy);
}

function onClearFilter() {
  document.getElementById("filterTitle").value = "";
  document.getElementById("filterMinPrice").value = "";
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
