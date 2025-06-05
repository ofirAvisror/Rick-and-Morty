let gEpisodes = [];

export const episodeService = {
  loadEpisodes,
  getEpisodes,
  getEpisodeById,
  toggleFavorite,
};

function loadEpisodes(callback) {
  if (gEpisodes.length > 0) {
    callback();
    return;
  }

  fetch("https://rickandmortyapi.com/api/episode")
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
      callback();
    })
    .catch((err) => {
      console.error("Error loading episodes:", err);
      callback();
    });
}

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
    return episode;
  }
  return null;
}
