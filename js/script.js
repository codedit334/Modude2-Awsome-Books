/* eslint max-classes-per-file: ["error", 2] */

const bookTitleInput = document.querySelector('#form-title');
const bookAuthorInput = document.querySelector('#form-author');
const booksContainer = document.querySelector('.book-list');

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
    const books = localStorage.getItem('books');
    if (books) {
      booksArr = JSON.parse(books);
    }
  };

  static renderBooks = () => {
    this.getBooks();
    const booksHTML = booksArr.map(
      (book) => `
      <li data-id='${book.id}'>
        <div>
        <span class="book-title">"${book.title}" by </span>
        <span class="book-title">${book.author}</span>
        </div>
        <button class="remove_book">Remove</button>
      </li>
      `,
    );
    booksContainer.innerHTML = booksHTML.join('');

    const removeButtons = document.querySelectorAll('.remove_book');
    if (removeButtons) {
      removeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          this.getBooks();
          booksArr = booksArr.filter(
            (book) => parseInt(book.id, 10)
              !== parseInt(event.target.parentNode.dataset.id, 10),
          );
          localStorage.setItem('books', JSON.stringify(booksArr));
          this.renderBooks();
        });
      });
    }
  };

  static addBook = () => {
    if (
      bookTitleInput.value.length !== 0
      && bookTitleInput.value.length !== 0
    ) {
      booksArr.push(new Book(bookTitleInput.value, bookAuthorInput.value));
      localStorage.setItem('books', JSON.stringify(booksArr));
    }
    this.renderBooks();
  };
}

window.onload = () => {
  UI.renderBooks();
  document.querySelector('.form-add').addEventListener('click', (event) => {
    event.preventDefault();
    UI.addBook();
  });
  document.querySelector('.date-div').textContent = new Date().toDateString();
};

const navList = document.querySelector('.nav-list');
const navAdd = document.querySelector('.nav-add');
const navContact = document.querySelector('.nav-contact');

const spaDisplay = (event) => {
  document.querySelectorAll(`.menu li:not(${event.target.classList[0]})`).forEach((li) => li.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelector(`.${event.target.dataset.target}`).classList.remove('hidden');
  document.querySelectorAll(`section:not(.${event.target.dataset.target})`).forEach((section) => section.classList.add('hidden'));
};

navList.addEventListener('click', (event) => {
  spaDisplay(event);
});

navAdd.addEventListener('click', (event) => {
  spaDisplay(event);
});

navContact.addEventListener('click', (event) => {
  spaDisplay(event);
});