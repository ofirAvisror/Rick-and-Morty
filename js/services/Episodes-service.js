import { saveToStorage, loadFromStorage } from "../services/storage.service.js";
import { generateId } from "../services/utils.service.js";

const STORAGE_KEY = "episode_db";
const INITIAL_EPISODES_DATA = [
  {
    id: generateId(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Drama",
    description: "A classic episode about the American Dream.",
    price: 10,
    favorite: true,
  },
  {
    id: generateId(),
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
    description: "A dystopian episode about a totalitarian society.",
    price: 12,
    favorite: false,
  },
  {
    id: generateId(),
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Drama",
    description: "An episode about the American South.",
    price: 15,
    favorite: true,
  },
];

let gEpisodes = _loadEpisodes();

function _loadEpisodes() {
  let episodes = loadFromStorage(STORAGE_KEY);
  if (!episodes || !episodes.length) {
    episodes = [...INITIAL_EPISODES_DATA];
    _saveEpisodesToStorage(episodes);
  }
  return episodes;
}

function _saveEpisodesToStorage(episodes = gEpisodes) {
  saveToStorage(STORAGE_KEY, episodes);
}

export const episodeService = {
  getEpisodes,
  getEpisodeById,
  createEpisode,
  updateEpisode,
  deleteEpisode,
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

function createEpisode(episodeData) {
  const newEpisode = {
    id: generateId(),
    title: episodeData.title,
    author: episodeData.author,
    year: parseInt(episodeData.year),
    genre: episodeData.genre,
    description: episodeData.description,
    price: parseFloat(episodeData.price),
    favorite: false,
  };
  gEpisodes.unshift(newEpisode);
  _saveEpisodesToStorage();
  return newEpisode;
}

function updateEpisode(episodeId, episodeData) {
  const episodeIndex = gEpisodes.findIndex((ep) => ep.id === episodeId);
  if (episodeIndex === -1) return null;

  gEpisodes[episodeIndex] = {
    ...gEpisodes[episodeIndex],
    ...episodeData,
    year: parseInt(episodeData.year) || gEpisodes[episodeIndex].year,
    price: parseFloat(episodeData.price) || gEpisodes[episodeIndex].price,
  };
  _saveEpisodesToStorage();
  return gEpisodes[episodeIndex];
}

function deleteEpisode(episodeId) {
  gEpisodes = gEpisodes.filter((ep) => ep.id !== episodeId);
  _saveEpisodesToStorage();
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
