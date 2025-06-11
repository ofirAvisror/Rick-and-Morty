import { getIdFromUrl } from "../services/utils.service.js";

const API_BASE = "https://rickandmortyapi.com/api/location";
let gLocations = [];
let currentPage = 1;

export const locationService = {
  loadLocations,
  getLocations,
  getLocationById,
  toggleFavorite,
};

function loadLocations(callback, page = 1) {
  fetch(`${API_BASE}?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      gLocations = data.results.map((loc) => ({
        id: loc.id.toString(),
        name: loc.name,
        type: loc.type,
        dimension: loc.dimension,
        residents: loc.residents,
        favorite: false,
      }));
      currentPage = page;
      if (callback) callback();
    })
    .catch((err) => {
      console.error("Failed to load locations:", err);
      if (callback) callback();
    });
}

function getLocations(filterBy = {}) {
  let locationsToReturn = [...gLocations];

  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, "i");
    locationsToReturn = locationsToReturn.filter((loc) => regex.test(loc.name));
  }

  if (filterBy.type) {
    const regex = new RegExp(filterBy.type, "i");
    locationsToReturn = locationsToReturn.filter((loc) => regex.test(loc.type));
  }

  return locationsToReturn;
}

function getLocationById(id) {
  return gLocations.find((loc) => loc.id === id.toString());
}

function toggleFavorite(id) {
  const loc = getLocationById(id);
  if (loc) loc.favorite = !loc.favorite;
}
