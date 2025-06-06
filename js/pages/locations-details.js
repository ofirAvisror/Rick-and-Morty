import { locationService } from "../services/location-service.js";
import { characterService } from "../services/chararcters-service.js";

let currentLocationId = null;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  currentLocationId = params.get("locationId");
  if (currentLocationId) {
    renderLocationDetails();
  } else {
    const elDetails = document.getElementById("locationDetails");
    if (elDetails) {
      elDetails.innerHTML =
        '<p class="error-message">No location ID provided. Please select a location from the list.</p>';
    }
  }
});

function renderLocationDetails() {
  const elDetails = document.getElementById("locationDetails");
  if (!elDetails || !currentLocationId) return;

  elDetails.innerHTML =
    '<p class="loading-message">Loading location details...</p>';

  const location = locationService.getLocationById(currentLocationId);
  if (location) {
    document.title = location.name + " - Location Details";
    elDetails.innerHTML = `
      <h2 class="episode-title-detail">${location.name}</h2>
      <div class="detail-item"><strong>Type:</strong> ${location.type}</div>
      <div class="detail-item"><strong>Dimension:</strong> ${location.dimension}</div>
      <div class="episode-details-actions">
        <a href="locations-list.html" class="action-link back-btn-detail">Back to Locations</a>
      </div>
    `;

    characterService
      .getCharactersByUrls(location.residents)
      .then((characters) => {
        const charactersHtml = characters
          .map(
            (ch) => `
        <article class="character-item">
          <img src="${ch.image}" alt="${ch.name}">
          <h4>${ch.name}</h4>
        </article>
      `
          )
          .join("");

        elDetails.innerHTML += `
        <h3 class="character-title">Residents:</h3>
        <div class="character-list">${charactersHtml}</div>
      `;
      });
  } else {
    elDetails.innerHTML = `
      <p class="error-message">Location not found.</p>
      <a href="locations-list.html" class="action-link back-btn-detail">Back to Locations</a>
    `;
  }
}
