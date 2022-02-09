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

// add event listner to newly added book remove button
let removeBtn = document.querySelectorAll(".remove");

function addEvents() {
  removeBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      const ref = e.target.id;
      Book.removeBook(ref);
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
    div.className = "book";
    const pTitle = document.createElement("p");
    pTitle.innerHTML = `"${list[i].title}" by ${list[i].author}`;
    div.appendChild(pTitle);
    const btn = document.createElement("button");
    btn.className = "remove";
    btn.innerHTML = "Remove";
    btn.id = list[i].id;
    div.appendChild(btn);
    booksListDiv.appendChild(div);
  }
  removeBtn = document.querySelectorAll(".remove");
  addEvents();
}

function nav(element, link) {
  document.querySelector(".show").className = "hidden";
  document.querySelector(element).className = "show";
  document.querySelectorAll("a").forEach((item) => {
    item.className = "";
  });
  link.className = "active";
}
// get input from form and call addToBooks method

function addNewBook() {
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  if (bookTitle && bookAuthor) {
    const newBook = new Book(bookTitle, bookAuthor);
    Book.addToBooks(newBook);
    populateDom([newBook]);
    document.querySelector("form").reset();
    const listLink = document.querySelector("#list-link");
    nav("#books", listLink);
  }
}

addBtn.addEventListener("click", addNewBook);

document.querySelectorAll("a").forEach((item) => {
  const ref = item.getAttribute("href");
  item.addEventListener("click", () => {
    nav(ref, item);
  });
});

const dateTime = () => {
  const time = document.querySelector(".date");
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const locale = navigator.en;
  time.innerHTML = new Intl.DateTimeFormat(locale, options).format(now);

  setTimeout(dateTime, 1000);
};
dateTime();

window.onload = () => {
  if (localStorage.getItem("data") === null) {
    populateDom(Book.books);
  } else {
    const localBooks = JSON.parse(localStorage.getItem("data"));
    populateDom(localBooks);
    Book.books = localBooks;
  }
};
