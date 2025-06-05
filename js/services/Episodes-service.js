let gEpisodes = [];
let currentPage = 1;

export const episodeService = {
  loadEpisodes,
  getEpisodes,
  getEpisodeById,
  toggleFavorite,
};
function loadEpisodes(callback, page = 1) {
  fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch episodes");
      return res.json();
    })
    .then((data) => {
      gEpisodes = data.results.map((ep) => ({
        id: ep.id.toString(),
        name: ep.name,
        year: new Date(ep.air_date).getFullYear(),
        air_date: ep.air_date,
        favorite: false,
        episode: ep.episode,
        characters: ep.characters,
      }));
      if (callback) callback();
    })
    .catch((err) => {
      console.error("Error loading episodes:", err);
      if (callback) callback();
    });
}

function getEpisodes(filterBy = {}) {
  let episodesToReturn = [...gEpisodes];

  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, "i");
    episodesToReturn = episodesToReturn.filter((ep) => regex.test(ep.name));
  }

  if (filterBy.season) {
    episodesToReturn = episodesToReturn.filter((ep) => {
      const match = ep.episode.match(/S(\d{2})E\d{2}/);
      if (!match) return false;
      const seasonNum = parseInt(match[1], 10);
      return seasonNum === filterBy.season;
    });
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
    return episode;
  }
  return null;
}
