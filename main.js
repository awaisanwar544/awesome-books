class Book {
  constructor(title, author) {
    this.id = Date.now().toString();
    this.title = title;
    this.author = author;
  }

  static books = [
    {
      id: "001",
      title: "The Trial",
      author: "Franz Kafka",
    },
    {
      id: "002",
      title: "Harry Potter",
      author: "J. K. Rowling",
    },
  ];

  static addToLocalStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  static addToBooks(book) {
    this.books.push(book);
    this.addToLocalStorage(this.books);
  }

  static removeBook(ref) {
    const result = this.books.filter((value) => value.id !== ref);
    this.books = result;
    this.addToLocalStorage(this.books);
  }
}

// add data to local storage

function addToLocalStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

// Remove book from the list

function removeBook(ref) {
  const result = books.filter((value) => value.id !== ref);
  books = result;
  addToLocalStorage(books);
}

// add event listner to newly added book remove button
let removeBtn = document.querySelectorAll(".remove");

function addEvents() {
  removeBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      const ref = e.target.id;
      removeBook(ref);
      e.target.parentElement.remove();
    });
  });
}

// populate dom with the list

const addBtn = document.querySelector("#add-btn");

function populateDom(list) {
  const booksListDiv = document.querySelector("#books-list");
  for (let i = 0; i < list.length; i += 1) {
    const div = document.createElement("div");
    const pTitle = document.createElement("p");
    pTitle.innerHTML = list[i].title;
    div.appendChild(pTitle);
    const pAuthor = document.createElement("p");
    pAuthor.innerHTML = list[i].author;
    div.appendChild(pAuthor);
    const btn = document.createElement("button");
    btn.className = "remove";
    btn.innerHTML = "Remove";
    btn.id = list[i].id;
    div.appendChild(btn);
    const hr = document.createElement("hr");
    div.appendChild(hr);
    booksListDiv.appendChild(div);
  }
  removeBtn = document.querySelectorAll(".remove");
  addEvents();
}

// add book to the list

function addBook() {
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  if (bookTitle && bookAuthor) {
    const book = {
      id: Date.now().toString(),
      title: bookTitle,
      author: bookAuthor,
    };
    books.push(book);
    populateDom([book]);
    addToLocalStorage(books);
    document.querySelector("form").reset();
  }
}

addBtn.addEventListener("click", addBook);

window.onload = () => {
  if (localStorage.getItem("data") === null) {
    populateDom(books);
  } else {
    const localBooks = JSON.parse(localStorage.getItem("data"));
    populateDom(localBooks);
    books = localBooks;
  }
};
