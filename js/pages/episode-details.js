import { episodeService } from "../services/Episodes-service.js";
import { ELEMENT_ID } from "../shared/constants.js";
import { getEpisodeImage } from "../services/utils.service.js";

document.addEventListener("DOMContentLoaded", () => {
  episodeService.loadEpisodes(() => {
    initEpisodeDetails();
  });
});

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
    document.title = episode.name + " - Details";
    const favoriteButtonText = episode.favorite ? "Unfavorite" : "Favorite";
    const favoriteButtonClass = episode.favorite ? "is-favorite" : "";

    elDetails.innerHTML = `
      <img src="${getEpisodeImage(episode.episode)}" alt="${
      episode.name
    }" class="episode-image-detail">
      <h2 class="episode-title-detail">${episode.name}</h2>
      <div class="detail-item"><strong>Aired on:</strong> ${episode.air_date}</div>
      <div class="detail-item"><strong>Episode:</strong> ${
        episode.episode
      }</div>
      <div class="detail-item"><strong>Description:</strong></div>
      <div class="episode-details-actions">
        <button class="favorite-btn-detail ${favoriteButtonClass}" onclick="window.onToggleCurrentFavorite()">${favoriteButtonText}</button>
        <a href="episodes-list.html" class="action-link back-btn-detail">Back to episodes</a>
      </div>
    `;
  } else {
    document.title = "Episode Not Found";
    elDetails.innerHTML = `
      <p class="error-message">Episode not found. It might have been deleted or the ID is incorrect.</p>
      <a href="episodes-list.html" class="action-link back-btn-detail" style="display:block; text-align:center; margin-top:20px;">Back to Episodes</a>
    `;
  }
}

function onToggleCurrentFavorite() {
  if (currentEpisodeId) {
    episodeService.toggleFavorite(currentEpisodeId);
    renderEpisodeDetails();
  }
}

window.onToggleCurrentFavorite = onToggleCurrentFavorite;
