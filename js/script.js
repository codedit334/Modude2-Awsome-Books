const bookTitleInput = document.querySelector('#form-title');
const bookDescInput = document.querySelector('#form-desc');
const booksContainer = document.querySelector('.book-list');

let booksArr = [];
const bookObj = {};

const getBooks = () => {
  const books = localStorage.getItem('books');
  if (books) {
    booksArr = JSON.parse(books);
  }
};

const renderBooks = () => {
  getBooks();
  const booksHTML = booksArr.map(
    (book) => `
<li data-id='${book.id}'>
  <div class="book-title">${book.title}</div>
  <div class="book-title">${book.desc}</div>
  <button class="remove_book">Remove</button>
  <hr>
</li>
`,
  );
  booksContainer.innerHTML = booksHTML.join('');

  const removeButtons = document.querySelectorAll('.remove_book');
  if (removeButtons) {
    removeButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        getBooks();
        booksArr = booksArr.filter(
          (book) => parseInt(book.id, 10) !== parseInt(event.target.parentNode.dataset.id, 10),
        );
        localStorage.setItem('books', JSON.stringify(booksArr));
        renderBooks();
      });
    });
  }
};

const addBook = () => {
  if (bookTitleInput.value.length !== 0 && bookTitleInput.value.length !== 0) {
    bookObj.id = Math.floor(Math.random() * 10000);
    bookObj.title = bookTitleInput.value;
    bookObj.desc = bookDescInput.value;
    booksArr.push(bookObj);
    localStorage.setItem('books', JSON.stringify(booksArr));
  }
  renderBooks();
};

window.onload = () => {
  renderBooks();
  document.querySelector('.form-add').addEventListener('click', (event) => {
    event.preventDefault();
    addBook();
  });
};
