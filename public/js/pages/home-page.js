const grid = document.getElementById("photoGrid");
const NUM_CELLS = 100;

const imagePaths = Array.from(
  { length: 60 },
  (_, i) => "../assets/images/" + (i + 1) + ".jpg"
);
const videoPaths = Array.from(
  { length: 9 },
  (_, i) => "../assets/video/" + (i + 1) + ".mp4"
);

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < NUM_CELLS; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell);
  }
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomEmptyCell() {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const emptyCells = cells.filter((cell) => cell.childElementCount === 0);
  if (emptyCells.length === 0) return null;
  return randomItem(emptyCells);
}

function renderRandomCell() {
  const cell = getRandomEmptyCell();
  if (!cell) return;

  const type = Math.random() < 0.8 ? "image" : "video";

  if (type === "image") {
    const img = document.createElement("img");
    img.src = randomItem(imagePaths);
    img.classList.add("fade-in");
    cell.appendChild(img);
    setTimeout(() => {
      cell.innerHTML = "";
    }, 5000);
  } else {
    const video = document.createElement("video");
    video.src = randomItem(videoPaths);
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = false;
    video.classList.add("fade-in");
    video.onended = () => {
      cell.innerHTML = "";
    };
    cell.appendChild(video);
  }
}

function playTransitionEffect() {
  const overlay = document.getElementById("transition-overlay");
  const sound = document.getElementById("transition-sound");
  overlay.innerHTML = "";
  for (let i = 0; i < 96; i++) {
    const block = document.createElement("div");
    const delay = ((i % 12) + Math.floor(i / 12)) * 50;
    block.style.animationDelay = `${delay}ms`;
    overlay.appendChild(block);
  }
  sound.play();
  setTimeout(() => {
    overlay.style.display = "none";
  }, 1500);
}

createGrid();
setInterval(renderRandomCell, 200);
window.addEventListener("DOMContentLoaded", playTransitionEffect);
