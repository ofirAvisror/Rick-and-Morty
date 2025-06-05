import { bookService } from "../services/books.service.js";
import { ELEMENT_ID } from "../shared/constants.js";

document.addEventListener("DOMContentLoaded", initBookDetails);

let currentBookId = null;

function initBookDetails() {
  const params = new URLSearchParams(window.location.search);
  currentBookId = params.get("bookId");

  if (currentBookId) {
    renderBookDetails();
  } else {
    const elBookDetails = document.getElementById(ELEMENT_ID.BOOK_DETAILS);
    if (elBookDetails) {
      elBookDetails.innerHTML =
        '<p class="error-message">No book ID provided. Please select a book from the library.</p>';
    }
  }
}

function renderBookDetails() {
  const elBookDetails = document.getElementById(ELEMENT_ID.BOOK_DETAILS);
  if (!elBookDetails) return;

  elBookDetails.innerHTML =
    '<p class="loading-message">Loading book details...</p>';
  const book = bookService.getBookById(currentBookId);

  if (book) {
    document.title = book.title + " - Details";
    const favoriteButtonText = book.favorite ? "Unfavorite" : "Favorite";
    const favoriteButtonClass = book.favorite ? "is-favorite" : "";

    elBookDetails.innerHTML = `
            <img src="${getBookImage(book.genre)}" alt="${
      book.title
    }" class="book-image-detail">
            <h2 class="book-title-detail">${book.title}</h2>
            <p class="book-author-detail">By ${book.author}</p>
            <div class="detail-item"><strong>Genre:</strong> ${book.genre}</div>
            <div class="detail-item"><strong>Year:</strong> ${book.year}</div>
            <div class="detail-item"><strong>Price:</strong> $${book.price.toFixed(
              2
            )}</div>
            <div class="detail-item"><strong>Description:</strong></div>
            <p class="book-description-detail">${
              book.description || "No description available."
            }</p>

            <div class="book-details-actions">
                <button class="edit-btn-detail" onclick="window.onEditBook()">Edit</button>
                <button class="delete-btn-detail" onclick="window.onDeleteCurrentBook()">Delete</button>
                <button class="favorite-btn-detail ${favoriteButtonClass}" onclick="window.onToggleCurrentFavorite()">${favoriteButtonText}</button>
                <a href="book-list.html" class="action-link back-btn-detail">Back to Library</a>
            </div>
        `;
  } else {
    document.title = "Book Not Found";
    elBookDetails.innerHTML =
      '<p class="error-message">Book not found. It might have been deleted or the ID is incorrect.</p>  <a href="book-list.html" class="action-link back-btn-detail" style="display:block; text-align:center; margin-top:20px;">Back to Library</a>';
  }
}

function getBookImage(genre) {
  genre = genre ? genre.toLowerCase() : "default";
  switch (genre) {
    case "drama":
      return "../assets/images/book.jpeg";
    case "fantasy":
      return "../assets/images/bookFantasy.png";
    case "mystery":
      return "../assets/images/bookMystery.png";
    default:
      return "../assets/images/book.jpeg";
  }
}

function onEditBook() {
  if (currentBookId) {
    window.location.href = `edit-book.html?bookId=${currentBookId}`;
  }
}

function onDeleteCurrentBook() {
  if (currentBookId && confirm("Are you sure you want to delete this book?")) {
    bookService.deleteBook(currentBookId);
    alert("Book deleted.");
    window.location.href = "book-list.html";
  }
}

function onToggleCurrentFavorite() {
  if (currentBookId) {
    bookService.toggleFavorite(currentBookId);
    renderBookDetails();
  }
}

window.onEditBook = onEditBook;
window.onDeleteCurrentBook = onDeleteCurrentBook;
window.onToggleCurrentFavorite = onToggleCurrentFavorite;
