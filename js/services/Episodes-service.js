import { saveToStorage, loadFromStorage } from "../services/storage.service.js";
import { generateId } from "../services/utils.service.js";

const STORAGE_KEY = "episode_db";

const episode_page_1 = [];

fetch("https://rickandmortyapi.com/api/episode")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Response not OK");
    }

    return response.json();
  })
  .then((data) => {
    episode_page_1.push(data);
    console.log(episode_page_1[0].results);
  });

let gEpisodes = _loadEpisodes();

function _loadEpisodes() {
  let episodes =episode_page_1;
  if (!episodes || !episodes.length) {
    episodes = [...INITIAL_EPISODES_DATA];  }
  return episodes;
}

export const episodeService = {
  getEpisodes,
  getEpisodeById,
  toggleFavorite,
};

function getEpisodes(filterBy = {}) {
  let episodesToReturn = [...gEpisodes];
  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, "i");
    episodesToReturn = episodesToReturn.filter((ep) => regex.test(ep.title));
  }
  if (filterBy.minPrice) {
    episodesToReturn = episodesToReturn.filter(
      (ep) => ep.price >= filterBy.minPrice
    );
  }
  return episodesToReturn;
}

function getEpisodeById(episodeId) {
  return gEpisodes.find((ep) => ep.id === episodeId);
}



function toggleFavorite(episodeId) {
  const episode = getEpisodeById(episodeId);
  if (episode) {
    episode.favorite = !episode.favorite;
    _saveEpisodesToStorage();
    return episode;
  }
  return null;
}
