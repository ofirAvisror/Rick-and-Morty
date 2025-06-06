export function getEpisodeImage(episodeCode) {
  const match = episodeCode.match(/S(\d{2})/);
  if (!match) return "";
  const season = match[1];
  switch (season) {
    case "01":
      return "../../assets/images/season1.jpg";
    case "02":
      return "../../assets/images/season2.jpg";
    case "03":
      return "../../assets/images/season3.jpg";
    case "04":
      return "../../assets/images/season4.jpg";
    case "05":
      return "../../assets/images/season5.jpg";
  }
}

export function getIdFromUrl(url) {
  if (!url) return null;
  const parts = url.split("/");
  return parts[parts.length - 1];
}
