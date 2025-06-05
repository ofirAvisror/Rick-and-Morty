import { saveToStorage, loadFromStorage } from "../services/storage.service.js";
import { generateId } from "../services/utils.service.js";

const STORAGE_KEY = "book_db";
const INITIAL_BOOKS_DATA = [
  {
    id: generateId(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Drama",
    description: "A classic novel about the American Dream.",
    price: 10,
    favorite: true,
  },
  {
    id: generateId(),
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
    description: "A dystopian novel about a totalitarian society.",
    price: 12,
    favorite: false,
  },
  {
    id: generateId(),
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Drama",
    description: "A novel about the American South.",
    price: 15,
    favorite: true,
  },
  {
    id: generateId(),
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    genre: "Fantasy",
    description: "A fantasy novel about the adventures of Bilbo Baggins.",
    price: 14,
    favorite: false,
  },
  {
    id: generateId(),
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Drama",
    description: "A romantic novel that critiques the British landed gentry.",
    price: 11,
    favorite: false,
  },
  {
    id: generateId(),
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    genre: "Drama",
    description: "A story about teenage alienation and loss.",
    price: 13,
    favorite: false,
  },
  {
    id: generateId(),
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    genre: "Dystopian",
    description: "A futuristic novel about a controlled society.",
    price: 14,
    favorite: true,
  },
  {
    id: generateId(),
    title: "Moby-Dick",
    author: "Herman Melville",
    year: 1851,
    genre: "Drama",
    description: "The narrative of Captain Ahab's obsessive quest.",
    price: 16,
    favorite: false,
  },
  {
    id: generateId(),
    title: "The Odyssey",
    author: "Homer",
    year: -800,
    genre: "Drama",
    description: "Epic poem about Odysseus’ journey home.",
    price: 18,
    favorite: true,
  },
  {
    id: generateId(),
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    year: 1997,
    genre: "Fantasy",
    description: "The first book in the Harry Potter series.",
    price: 20,
    favorite: true,
  },
  {
    id: generateId(),
    title: "The Da Vinci Code",
    author: "Dan Brown",
    year: 2003,
    genre: "Mystery",
    description: "A mystery thriller involving symbology and conspiracies.",
    price: 17,
    favorite: false,
  },
  {
    id: generateId(),
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
    genre: "Drama",
    description: "A novel about following your dreams.",
    price: 14,
    favorite: true,
  },
  {
    id: generateId(),
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    year: 2005,
    genre: "Mystery",
    description: "A thriller about a journalist and a hacker.",
    price: 15,
    favorite: false,
  },
  {
    id: generateId(),
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    year: 1953,
    genre: "Dystopian",
    description: "A novel about censorship and book burning.",
    price: 12,
    favorite: false,
  },
  {
    id: generateId(),
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Drama",
    description: "A story of a governess and her struggles.",
    price: 13,
    favorite: true,
  },

  // 15 נוספים:
  {
    id: generateId(),
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    year: 1954,
    genre: "Fantasy",
    description: "The first part of the epic fantasy trilogy.",
    price: 25,
    favorite: true,
  },
  {
    id: generateId(),
    title: "The Hunger Games",
    author: "Suzanne Collins",
    year: 2008,
    genre: "Dystopian",
    description: "A dystopian story about survival and rebellion.",
    price: 18,
    favorite: false,
  },
  {
    id: generateId(),
    title: "Animal Farm",
    author: "George Orwell",
    year: 1945,
    genre: "Dystopian",
    description: "An allegory about totalitarianism.",
    price: 11,
    favorite: true,
  },
  {
    id: generateId(),
    title: "Dracula",
    author: "Bram Stoker",
    year: 1897,
    genre: "Mystery",
    description: "Classic gothic horror novel about a vampire.",
    price: 14,
    favorite: false,
  },
  {
    id: generateId(),
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    year: 1866,
    genre: "Drama",
    description: "A psychological novel about morality and redemption.",
    price: 16,
    favorite: true,
  },
  {
    id: generateId(),
    title: "Wuthering Heights",
    author: "Emily Brontë",
    year: 1847,
    genre: "Drama",
    description: "A tale of passionate and doomed love.",
    price: 13,
    favorite: false,
  },
  {
    id: generateId(),
    title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    year: 1950,
    genre: "Fantasy",
    description: "A classic fantasy tale of magic and adventure.",
    price: 17,
    favorite: true,
  },
  {
    id: generateId(),
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    year: 1859,
    genre: "Drama",
    description: "A historical novel set in London and Paris.",
    price: 14,
    favorite: false,
  },
  {
    id: generateId(),
    title: "Les Misérables",
    author: "Victor Hugo",
    year: 1862,
    genre: "Drama",
    description: "A story of justice, love and sacrifice in France.",
    price: 20,
    favorite: true,
  },
  {
    id: generateId(),
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: 1890,
    genre: "Drama",
    description: "A novel about vanity and moral corruption.",
    price: 12,
    favorite: false,
  },
  {
    id: generateId(),
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    genre: "Mystery",
    description: "The story of a scientist and his monstrous creation.",
    price: 15,
    favorite: true,
  },
  {
    id: generateId(),
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    year: 1844,
    genre: "Drama",
    description: "An adventure novel of revenge and justice.",
    price: 18,
    favorite: false,
  },
  {
    id: generateId(),
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    year: 1911,
    genre: "Drama",
    description: "A story about healing and friendship.",
    price: 13,
    favorite: true,
  },
  {
    id: generateId(),
    title: "Gone with the Wind",
    author: "Margaret Mitchell",
    year: 1936,
    genre: "Drama",
    description: "A romantic novel set during the American Civil War.",
    price: 19,
    favorite: false,
  },
];

let gBooks = _loadBooks();

function _loadBooks() {
  let books = loadFromStorage(STORAGE_KEY);
  if (!books || !books.length) {
    books = [...INITIAL_BOOKS_DATA];
    _saveBooksToStorage(books); // ✅ שולחת את המערך כפרמטר
  }
  return books;
}

function _saveBooksToStorage(books = gBooks) {
  saveToStorage(STORAGE_KEY, books); // ✅ כברירת מחדל משתמש ב-gBooks אם לא נשלח כלום
}

export const bookService = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  toggleFavorite,
};

function getBooks(filterBy = {}) {
  let booksToReturn = [...gBooks];
  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, "i");
    booksToReturn = booksToReturn.filter((book) => regex.test(book.title));
  }
  if (filterBy.minPrice) {
    booksToReturn = booksToReturn.filter(
      (book) => book.price >= filterBy.minPrice
    );
  }
  return booksToReturn;
}

function getBookById(bookId) {
  return gBooks.find((book) => book.id === bookId);
}

function createBook(bookData) {
  const newBook = {
    id: generateId(),
    title: bookData.title,
    author: bookData.author,
    year: parseInt(bookData.year),
    genre: bookData.genre,
    description: bookData.description,
    price: parseFloat(bookData.price),
    favorite: false,
  };
  gBooks.unshift(newBook);
  _saveBooksToStorage();
  return newBook;
}

function updateBook(bookId, bookData) {
  const bookIndex = gBooks.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) return null;

  gBooks[bookIndex] = {
    ...gBooks[bookIndex],
    ...bookData,
    year: parseInt(bookData.year) || gBooks[bookIndex].year,
    price: parseFloat(bookData.price) || gBooks[bookIndex].price,
  };
  _saveBooksToStorage();
  return gBooks[bookIndex];
}

function deleteBook(bookId) {
  gBooks = gBooks.filter((book) => book.id !== bookId);
  _saveBooksToStorage();
}

function toggleFavorite(bookId) {
  const book = getBookById(bookId);
  if (book) {
    book.favorite = !book.favorite;
    _saveBooksToStorage();
    return book;
  }
  return null;
}
