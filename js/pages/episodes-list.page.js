import { bookService } from "../services/books.service.js";
import { ELEMENT_ID } from "../shared/constants.js";

document.addEventListener("DOMContentLoaded", initBookList);

function initBookList() {
  renderBooks();
  document
    .getElementById("applyFilterBtn")
    ?.addEventListener("click", onSetFilter);
  document
    .getElementById("clearFilterBtn")
    ?.addEventListener("click", onClearFilter);
}

function renderBooks(filterBy = {}) {
  const books = bookService.getBooks(filterBy);
  const elBookList = document.getElementById(ELEMENT_ID.BOOK_LIST);

  if (!elBookList) {
    return;
  }

  if (!books || books.length === 0) {
    elBookList.innerHTML =
      "<p>No books found. Try adjusting your filters or add some books!</p>";
    return;
  }

  const strHTMLs = books
    .map(
      (book) => `
        <article class="book-item" data-id="${book.id}">
            <img src="${getBookImage(book.genre)}" alt="${book.title}">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">By: ${book.author}</p>
            <p class="book-genre">Genre: ${book.genre}</p>
            <p class="book-year">Published: ${book.year}</p>
            <p class="book-price">$${book.price.toFixed(2)}</p>
            <div class="book-actions">
                <button class="details-btn" onclick="window.onViewDetails('${
                  book.id
                }')">Details</button>
                <button class="edit-btn" onclick="window.onEditBookPage('${
                  book.id
                }')">Edit</button>
                <button class="favorite-btn ${
                  book.favorite ? "is-favorite" : ""
                }" onclick="window.onToggleFavorite('${book.id}')">
                    ${book.favorite ? "Unfavorite" : "Favorite"}
                </button>
                <button class="delete-btn" onclick="window.onDeleteBook('${
                  book.id
                }')">Delete</button>
            </div>
        </article>
    `
    )
    .join("");

  elBookList.innerHTML = strHTMLs;
}

function getBookImage(genre) {
  genre = genre ? genre.toLowerCase() : "default";
  switch (genre) {
    case "drama":
      return "../../assets/images/book.jpeg";
    case "fantasy":
      return "../../assets/images/bookFantasy.png";
    case "mystery":
      return "../../assets/images/bookMystery.png";
    default:
      return "../../assets/images/book.jpeg";
  }
}

function onSetFilter() {
  const title = document.getElementById("filterTitle").value;
  const minPrice = document.getElementById("filterMinPrice").value;
  const filterBy = {};
  if (title) filterBy.title = title;
  if (minPrice) filterBy.minPrice = parseFloat(minPrice);
  renderBooks(filterBy);
}

function onClearFilter() {
  document.getElementById("filterTitle").value = "";
  document.getElementById("filterMinPrice").value = "";
  renderBooks();
}

function onDeleteBook(bookId) {
  if (confirm("Are you sure you want to delete this book?")) {
    bookService.deleteBook(bookId);
    renderBooks();
  }
}

function onToggleFavorite(bookId) {
  bookService.toggleFavorite(bookId);
  renderBooks();
}

function onViewDetails(bookId) {
  window.location.href = `episode-details.html?bookId=${bookId}`;
}

function onEditBookPage(bookId) {
  window.location.href = `edit-book.html?bookId=${bookId}`;
}

window.onDeleteBook = onDeleteBook;
window.onToggleFavorite = onToggleFavorite;
window.onViewDetails = onViewDetails;
window.onEditBookPage = onEditBookPage;
