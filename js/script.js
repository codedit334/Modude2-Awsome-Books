const bookTitleInput = document.querySelector("#form-title");
const bookDescInput = document.querySelector("#form-desc");
const bookAddInput = document.querySelector("#form-add");

let booksArr = [];
let bookObj = {};

document.querySelector(".form-add").addEventListener("click", (event) => {
  event.preventDefault();

  if (bookTitleInput.value.length !== 0 && bookTitleInput.value.length !== 0) {
    bookObj.title = bookTitleInput.value;
    bookObj.desc = bookDescInput.value;
    booksArr.push(bookObj);
    localStorage.setItem("books", JSON.stringify(booksArr));
  }
});
