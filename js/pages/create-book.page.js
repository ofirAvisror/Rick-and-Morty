import { bookService } from "../services/books.service.js";
import { ELEMENT_ID } from "../shared/constants.js";

document.addEventListener("DOMContentLoaded", initCreateBook);

function initCreateBook() {
  const form = document.getElementById(ELEMENT_ID.CREATE_BOOK_FORM);
  if (form) {
    form.addEventListener("submit", onCreateBook);
    form.addEventListener("reset", onResetFormHandler);
  }
}

function onCreateBook(event) {
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

  bookService.createBook(bookData);
  alert("Book added successfully!");
  form.reset();
  window.location.href = "book-list.html";
}

function onResetFormHandler(event) {
  event.preventDefault();
  if (confirm("Are you sure you want to reset the form?")) {
    document.getElementById(ELEMENT_ID.CREATE_BOOK_FORM).reset();
  }
}
