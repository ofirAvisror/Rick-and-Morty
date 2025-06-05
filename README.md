# MyLibrary Project

## Project Overview

MyLibrary is a web application that helps users manage their book collection. The application will use local storage to persist data and focus on implementing proper separation of concerns in JavaScript code organization.

## Project Structure

```
├── js/
│   ├── pages/         # Files that interact with the DOM and call services
│   └── services/      # Files that manage data operations (no DOM interaction)
├── css/              # Styling files
└── html/            # HTML pages
```

## Core Concepts

1. **Separation of Concerns**

   - **Pages (js/pages/)**: Handle all DOM interactions and user events
   - **Services (js/services/)**: Manage data operations and business logic
   - **No Direct DOM Manipulation in Services**: Services should be pure data management

2. **Local Storage**
   - All data will be stored in the browser's localStorage
   - No external API calls required

## Development Steps

### 1. List Page (books.html)

Start with the main page that shows all books.

#### Steps:

1. Create the HTML structure for displaying books
2. In services:
   - Create `BookService` with methods:
     - `getBooks()`
3. In pages:
   - Create `episodePage` to:
     - Display all books
     - Add event listener
     - Render book list
     - Handle delete functionality
     - Handle toggle favorite functionality

### 2. Details Page (character-details.html)

Create a page to show detailed information about a single book.

#### Steps:

1. Create the HTML structure for book details
2. In services:
   - Add to `BookService`:
     - `getBookBy(bookId)`
3. In pages:
   - Create `BookDetailsPage` to:
     - Display book details
     - Add navigation buttons
     - Handle delete functionality
     - Handle toggle favorite functionality
     - Handle "Edit" and "Back" actions

### 3. Create Page (character-details.html)

Implement the page for adding new books.

#### Steps:

1. Create the HTML form structure
2. In services:
   - Add to `BookService`:
     - `createBook(values)`
3. In pages:
   - Create `CreateBookPage` to:
     - Handle form submission
     - Validate input
     - Save new book (via service)
     - Navigate back to list

### 4. Edit Page (locations.html)

Create the page for editing existing books.

#### Steps:

1. Create the HTML form structure
2. In services:
   - Add to `BookService`:
     - `updateBook(id, bookData)`
3. In pages:
   - Create `EditBookPage` to:
     - Pre-fill form with book data (use search params to get the bookId)
     - Handle form submission
     - Update book
     - Navigate back to details

## Book Data Structure

```javascript
{
  id: string,          // Unique identifier
  title: string,       // Book title
  author: string,      // Author name
  year: number,        // Publication year
  genre: string,       // Book genre
  description: string  // Book description
}
```

## Best Practices

### Services

- Keep services focused on data operations only
- Return copies of data, not references
- Handle all localStorage operations
- Include error handling
- No DOM manipulation

### Pages

- Keep DOM manipulation code separate from business logic
- Use event delegation where appropriate
- Clear separation between event handling and display logic
- Validate user input before passing to services

## Testing Your Implementation

1. Test data persistence by:
   - Adding books
   - Refreshing the page
   - Verifying data remains
2. Test navigation flow
3. Verify error handling
4. Check form validation
5. Test responsive design

## Common Pitfalls to Avoid

1. Mixing DOM manipulation with data operations
2. Forgetting to handle errors
3. Not validating user input
4. Directly manipulating localStorage in page files
5. Complex logic in page files that should be in services

## Bonus Challenges

1. Add search functionality
2. Implement sorting options
3. Add categories/tags for books
4. Create a statistics dashboard
5. Add data export/import functionality

Remember: Focus on maintaining clean separation between pages and services. If you find yourself wanting to manipulate the DOM in a service file, that's a sign that the code should be moved to a page file instead.
