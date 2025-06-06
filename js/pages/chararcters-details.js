import { characterService } from "../services/chararcters-service.js";
import { getIdFromUrl } from "../services/utils.service.js";

window.addEventListener("DOMContentLoaded", () => {
  const id = getIdFromUrl("characterId");
  const character = characterService.getCharacterById(id);

  if (!character) {
    document.getElementById("characterDetails").innerHTML =
      "<p>Character not found</p>";
    return;
  }

  const originId = getIdFromUrl(character.origin.url);
  const originLink = character.origin.url
    ? `<a href="../locations/locations-details.html?locationId=${originId}">${character.origin.name}</a>`
    : character.origin.name;

  const episodesLinks = character.episode
    .map((epUrl) => {
      const epId = getIdFromUrl(epUrl);
      return `<li><a href="../libary-episodes/episode-details.html?episodeId=${epId}">Episode ${epId}</a></li>`;
    })
    .join("");

  const strHTML = `
    <div class="episode-details">
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p><strong>Status:</strong> ${character.status}</p>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Gender:</strong> ${character.gender}</p>
      <p><strong>Origin:</strong> ${originLink}</p>
      <h3>Episodes:</h3>
      <ul>${episodesLinks}</ul>
    </div>`;

  document.getElementById("characterDetails").innerHTML = strHTML;
});
