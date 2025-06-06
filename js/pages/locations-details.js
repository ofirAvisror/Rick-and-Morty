import { locationService } from "../services/locations-service.js";
import { characterService } from "../services/characters-service.js";
import { getIdFromUrl } from "../services/utils.service.js";

let currentLocationId = null;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  currentLocationId = params.get("locationId");

  if (currentLocationId) {
    renderLocationDetails();
  } else {
    document.getElementById("locationDetails").innerHTML =
      '<p class="error-message">No location ID provided.</p>';
  }
});

function renderLocationDetails() {
  const elDetails = document.getElementById("locationDetails");
  if (!elDetails || !currentLocationId) return;

  elDetails.innerHTML = "<p>Loading location...</p>";

  let location = locationService.getLocationById(currentLocationId);

  if (location) {
    renderLocation(location);
  } else {
    fetch(`https://rickandmortyapi.com/api/location/${currentLocationId}`)
      .then((res) => res.json())
      .then((loc) => {
        renderLocation({
          id: loc.id,
          name: loc.name,
          type: loc.type,
          dimension: loc.dimension,
          residents: loc.residents,
        });
      })
      .catch(() => {
        elDetails.innerHTML = `<p class="error-message">Location not found.</p>`;
      });
  }
}
function renderLocation(location) {
  const elDetails = document.getElementById("locationDetails");
  document.title = location.name + " - Location Details";

  elDetails.innerHTML = `
    <h2 class="episode-title-detail">${location.name}</h2>
    <div class="detail-item"><strong>Type:</strong> ${location.type}</div>
    <div class="detail-item"><strong>Dimension:</strong> ${location.dimension}</div>
    <div class="episode-details-actions">
      <a href="locations-list.html" class="action-link back-btn-detail">Back to Locations</a>
    </div>
    <h3 class="character-title">Residents:</h3>
  `;

  if (location.residents.length === 0) {
    elDetails.innerHTML += `<p>No known residents.</p>`;
    return;
  }

  characterService
    .getCharactersByUrls(location.residents)
    .then((characters) => {
      const charactersHtml = characters
        .map((ch) => {
          return `
            <a href="/html/characters/characters-details.html?characterId=${ch.id}&page=1">
              <article class="character-item">
                <img src="${ch.image}" alt="${ch.name}">
                <h4>${ch.name}</h4>
              </article>
            </a>`;
        })
        .join("");

      elDetails.innerHTML += `<div class="character-list">${charactersHtml}</div>`;
    });
}
