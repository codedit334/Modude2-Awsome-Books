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

// list items
const navList = document.querySelector('.nav-list');
const navAdd = document.querySelector('.nav-add');
const navContact = document.querySelector('.nav-contact');

navList.addEventListener('click', () => {
  navList.classList.add('active');
  navAdd.classList.remove('active');
  navContact.classList.remove('active');
  document.querySelector('.book-section').classList.remove('hidden');
  document.querySelector('.add-book-section').classList.add('hidden');
  document.querySelector('.contact-section').classList.add('hidden');
});

navAdd.addEventListener('click', () => {
  navAdd.classList.add('active');
  navList.classList.remove('active');
  navContact.classList.remove('active');
  document.querySelector('.book-section').classList.add('hidden');
  document.querySelector('.add-book-section').classList.remove('hidden');
  document.querySelector('.contact-section').classList.add('hidden');
});

navContact.addEventListener('click', () => {
  navContact.classList.add('active');
  navAdd.classList.remove('active');
  navList.classList.remove('active');
  document.querySelector('.book-section').classList.add('hidden');
  document.querySelector('.add-book-section').classList.add('hidden');
  document.querySelector('.contact-section').classList.remove('hidden');
});
