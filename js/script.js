const bookTitleInput = document.querySelector("#form-title");
const bookAuthorInput = document.querySelector("#form-author");
const booksContainer = document.querySelector(".book-list");

let booksArr = [];

class Book {
  constructor(title, author) {
    this.id = Math.floor(Math.random() * 10000);
    this.author = author;
    this.title = title;
  }
}

class UI {
  static getBooks = () => {
    const books = localStorage.getItem("books");
    if (books) {
      booksArr = JSON.parse(books);
    }
  };

  static renderBooks = () => {
    this.getBooks();
    const booksHTML = booksArr.map(
      (book) => `
      <li data-id='${book.id}'>
        <div class="book-title">${book.title}</div>
        <div class="book-title">${book.author}</div>
        <button class="remove_book">Remove</button>
        <hr>
      </li>
      `
    );
    booksContainer.innerHTML = booksHTML.join("");

    const removeButtons = document.querySelectorAll(".remove_book");
    if (removeButtons) {
      removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          this.getBooks();
          booksArr = booksArr.filter(
            (book) =>
              parseInt(book.id, 10) !==
              parseInt(event.target.parentNode.dataset.id, 10)
          );
          localStorage.setItem("books", JSON.stringify(booksArr));
          this.renderBooks();
        });
      });
    }

    
  };
  static addBook = () => {
    if (
      bookTitleInput.value.length !== 0 &&
      bookTitleInput.value.length !== 0
    ) {
      booksArr.push(new Book(bookTitleInput.value,bookAuthorInput.value));
      localStorage.setItem("books", JSON.stringify(booksArr));
    }
    this.renderBooks();
  };
}

window.onload = () => {
  UI.renderBooks();
  document.querySelector(".form-add").addEventListener("click", (event) => {
    event.preventDefault();
    UI.addBook();
  });
};
