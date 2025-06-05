import { episodeService } from "../services/Episodes-service.js";
import { ELEMENT_ID } from "../shared/constants.js";

document.addEventListener("DOMContentLoaded", initEpisodeDetails);

let currentEpisodeId = null;

function initEpisodeDetails() {
  const params = new URLSearchParams(window.location.search);
  currentEpisodeId = params.get("episodeId");

  if (currentEpisodeId) {
    renderEpisodeDetails();
  } else {
    const elDetails = document.getElementById(ELEMENT_ID.EPISODE_DETAILS);
    if (elDetails) {
      elDetails.innerHTML =
        '<p class="error-message">No episode ID provided. Please select an episode from the list.</p>';
    }
  }
}

function renderEpisodeDetails() {
  const elDetails = document.getElementById(ELEMENT_ID.EPISODE_DETAILS);
  if (!elDetails) return;

  elDetails.innerHTML =
    '<p class="loading-message">Loading episode details...</p>';
  const episode = episodeService.getEpisodeById(currentEpisodeId);

  if (episode) {
    document.title = episode.title + " - Details";
    const favoriteButtonText = episode.favorite ? "Unfavorite" : "Favorite";
    const favoriteButtonClass = episode.favorite ? "is-favorite" : "";

    elDetails.innerHTML = `
            <img src="${getEpisodeImage(episode.genre)}" alt="${
      episode.title
    }" class="episode-image-detail">
            <h2 class="episode-title-detail">${episode.title}</h2>
            <p class="episode-author-detail">By ${episode.author}</p>
            <div class="detail-item"><strong>Genre:</strong> ${
              episode.genre
            }</div>
            <div class="detail-item"><strong>Year:</strong> ${
              episode.year
            }</div>
            <div class="detail-item"><strong>Price:</strong> $${episode.price.toFixed(
              2
            )}</div>
            <div class="detail-item"><strong>Description:</strong></div>
            <p class="episode-description-detail">${
              episode.description || "No description available."
            }</p>

            <div class="episode-details-actions">
                <button class="favorite-btn-detail ${favoriteButtonClass}" onclick="window.onToggleCurrentFavorite()">${favoriteButtonText}</button>
                <a href="episodes-list.html" class="action-link back-btn-detail">Back to episodes</a>
            </div>
        `;
  } else {
    document.title = "Episode Not Found";
    elDetails.innerHTML =
      '<p class="error-message">Episode not found. It might have been deleted or the ID is incorrect.</p>  <a href="episodes-list.html" class="action-link back-btn-detail" style="display:block; text-align:center; margin-top:20px;">Back to Episodes</a>';
  }
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

function onEditEpisode() {
  if (currentEpisodeId) {
    window.location.href = `edit-episode.html?episodeId=${currentEpisodeId}`;
  }
}

function onDeleteCurrentEpisode() {
  if (
    currentEpisodeId &&
    confirm("Are you sure you want to delete this episode?")
  ) {
    episodeService.deleteEpisode(currentEpisodeId);
    alert("Episode deleted.");
    window.location.href = "episodes-list.html";
  }
}

function onToggleCurrentFavorite() {
  if (currentEpisodeId) {
    episodeService.toggleFavorite(currentEpisodeId);
    renderEpisodeDetails();
  }
}

window.onEditEpisode = onEditEpisode;
window.onDeleteCurrentEpisode = onDeleteCurrentEpisode;
window.onToggleCurrentFavorite = onToggleCurrentFavorite;
