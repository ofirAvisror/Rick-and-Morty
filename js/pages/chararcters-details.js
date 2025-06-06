import { getIdFromUrl, getEpisodeImage } from "../services/utils.service.js";

const params = new URLSearchParams(window.location.search);
const characterId = params.get("characterId");

loadCharacterDetails(characterId);

function loadCharacterDetails(characterId) {
  fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
    .then((res) => res.json())
    .then((character) => renderCharacterDetails(character))
    .catch((err) => {
      console.error("Error loading character:", err);
      document.getElementById("characterDetails").innerHTML =
        "<p>Character not found.</p>";
    });
}

function renderCharacterDetails(character) {
  const originId = getIdFromUrl(character.origin.url);
  const locationId = getIdFromUrl(character.location.url);

  const episodePromises = character.episode.map((epUrl) =>
    fetch(epUrl).then((res) => res.json())
  );

  Promise.all(episodePromises).then((episodes) => {
    const episodesHTML = episodes
      .map((ep) => {
        const page = Math.ceil(ep.id / 20);
        return `
        <a href="/html/episodes/episode-details.html?episodeId=${
          ep.id
        }&page=${page}">
          <article class="character-item">
            <img src="${getEpisodeImage(ep.episode)}" alt="${ep.name}">
            <h4>${ep.name}</h4>
          </article>
        </a>`;
      })
      .join("");

    const html = `
      <h2 class="episode-title-detail">${character.name}</h2>
      <img src="${character.image}" alt="${
      character.name
    }" class="episode-image-detail" />
      <div class="detail-item"><strong>Status:</strong> ${
        character.status
      }</div>
      <div class="detail-item"><strong>Species:</strong> ${
        character.species
      }</div>
      <div class="detail-item"><strong>Gender:</strong> ${
        character.gender
      }</div>
      <div class="detail-item"><strong>Origin:</strong> ${
        originId
          ? `<a href="/html/locations/location-details.html?locationId=${originId}">${character.origin.name}</a>`
          : character.origin.name
      }</div>
      <div class="detail-item"><strong>Current Location:</strong> ${
        locationId
          ? `<a href="/html/locations/location-details.html?locationId=${locationId}">${character.location.name}</a>`
          : character.location.name
      }</div>
      <h3 class="character-title">Episodes:</h3>
      <div class="character-list">${episodesHTML}</div>
    `;

    document.getElementById("characterDetails").innerHTML = html;
  });
}
