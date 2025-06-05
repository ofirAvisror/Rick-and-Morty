import { bookService } from "../services/books.service.js";
import { ELEMENT_ID } from "../shared/constants.js";

document.addEventListener("DOMContentLoaded", initEditBook);

let currentBookId = null;

function initEditBook() {
  const params = new URLSearchParams(window.location.search);
  currentBookId = params.get("bookId");
  const form = document.getElementById(ELEMENT_ID.EDIT_BOOK_FORM);

  if (!currentBookId || !form) {
    const container = document.querySelector(".form-container");
    if (container) {
      container.innerHTML =
        '<p class="error-message">Error: Book ID not found or form element missing. Cannot edit book.</p> <a href="book-list.html" class="action-link back-btn-detail" style="display:block; text-align:center; margin-top:20px;">Back to Library</a>';
    }
    return;
  }

  const book = bookService.getBookById(currentBookId);

  if (book) {
    document.title = "Edit: " + book.title;
    document.getElementById(
      "editBookTitle"
    ).textContent = `Edit: ${book.title}`;
    form.elements["id"].value = book.id;
    form.elements["title"].value = book.title;
    form.elements["author"].value = book.author;
    form.elements["year"].value = book.year;
    form.elements["genre"].value = book.genre;
    form.elements["price"].value = book.price;
    form.elements["description"].value = book.description;

    const cancelBtn = document.getElementById("cancelEditBtn");
    if (cancelBtn) {
      cancelBtn.href = `book-details.html?bookId=${currentBookId}`;
    }
  } else {
    const container = document.querySelector(".form-container");
    if (container) {
      container.innerHTML =
        '<p class="error-message">Book not found. Cannot edit.</p> <a href="book-list.html" class="action-link back-btn-detail" style="display:block; text-align:center; margin-top:20px;">Back to Library</a>';
    }
    return;
  }

  form.addEventListener("submit", onEditBookSubmit);
}

function onEditBookSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const bookData = Object.fromEntries(formData.entries());

  if (
    !bookData.title ||
    !bookData.author ||
    !bookData.year ||
    !bookData.price
  ) {
    alert("Please fill in all required fields (Title, Author, Year, Price).");
    return;
  }

  const updatedBook = bookService.updateBook(currentBookId, bookData);

  if (updatedBook) {
    alert("Book updated successfully!");
    window.location.href = `book-details.html?bookId=${currentBookId}`;
  } else {
    alert("Failed to update book. Please try again.");
  }
}
