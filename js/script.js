const bookTitleInput = document.querySelector("#form-title");
const bookDescInput = document.querySelector("#form-desc");
const bookAddInput = document.querySelector("#form-add");
const booksContainer = document.querySelector(".book-list");

let booksArr = [];
let bookObj = {};

const getBooks = () => {
  const books = localStorage.getItem("books");
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
`
  );
  booksContainer.innerHTML = booksHTML.join("");

};

const addRemoveEvent = () => {
  const removeButtons = document.querySelectorAll(".remove_book");
  if (removeButtons)
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log('clicked')
        getBooks();
        removeBook(event.target.parentNode.dataset.id);
      });
    });
}

const addBook = () => {
  if (bookTitleInput.value.length !== 0 && bookTitleInput.value.length !== 0) {
    bookObj.id = Math.floor(Math.random() * 10000);
    bookObj.title = bookTitleInput.value;
    bookObj.desc = bookDescInput.value;
    booksArr.push(bookObj);
    localStorage.setItem("books", JSON.stringify(booksArr));
  }
  renderBooks();
  addRemoveEvent();
}

const removeBook = (bookId) => {
  booksArr= booksArr.filter((book) => parseInt(book.id) !== parseInt(bookId));
  localStorage.setItem("books", JSON.stringify(booksArr));
  renderBooks();
  addRemoveEvent()
};

window.onload = () => {
  renderBooks();
  addRemoveEvent();
  document.querySelector(".form-add").addEventListener("click", (event) => {
    event.preventDefault();
    addBook();
  });

};
