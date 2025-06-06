let gcharacters = [];

export const characterService = {
  loadCharacter,
  getCharacters,
  getCharactersById,
  toggleFavorite,
  getCharactersByUrls,
};

function loadCharacter(callback, page = 1) {
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch episodes");
      return res.json();
    })
    .then((data) => {
      gcharacters = data.results.map((ch) => ({
        id: ch.id.toString(),
        name: ch.name,
        status: ch.status,
        species: ch.species,
        type: ch.type,
        gender: ch.gender,
        origin: ch.origin,
        location: ch.location,
        image: ch.image,
        episode: ch.episode,
        favorite: false,
      }));
      if (callback) callback();
    })
    .catch((err) => {
      console.error("Error loading Characters:", err);
      if (callback) callback();
    });
}

function getCharacters(filterBy = {}) {
  let charactersToReturn = [...gcharacters];

  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, "i");
    charactersToReturn = charactersToReturn.filter((ch) => regex.test(ch.name));
  }

  if (filterBy.season) {
    charactersToReturn = charactersToReturn.filter((ch) => {
      const match = ch.characters.match(/S(\d{2})E\d{2}/);
      if (!match) return false;
      const seasonNum = parseInt(match[1], 10);
      return seasonNum === filterBy.season;
    });
  }

  return charactersToReturn;
}

function getCharactersById(characterId) {
  return gcharacters.find((ch) => ch.id === characterId);
}

function toggleFavorite(characterId) {
  const character = getCharactersById(characterId);
  if (character) {
    character.favorite = !character.favorite;
    return character;
  }
  return null;
}

function getCharactersByUrls(charUrls) {
  const ids = charUrls.map((url) => url.split("/").pop()).join(",");
  return fetch(`https://rickandmortyapi.com/api/character/${ids}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch characters");
      return res.json();
    })
    .then((data) => (Array.isArray(data) ? data : [data]));
}
