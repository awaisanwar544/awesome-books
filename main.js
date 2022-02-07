let books = [
  {
    title: "The Tiral",
    author: "Franz Kafka",
  },
  {
    title: "Harry Potter",
    author: "J. K. Rowling",
  },
];

// populate dom with the list

const addBtn = document.querySelector("#add-btn");
let removeBtn = document.querySelectorAll(".remove");

function populateDom(list) {
  const booksListDiv = document.querySelector('#books-list');
  for (let i = 0; i < list.length; i += 1) {
    const div = document.createElement('div');
    const pTitle = document.createElement('p');
    pTitle.innerHTML = list[i].title;
    div.appendChild(pTitle);
    const pAuthor = document.createElement("p");
    pAuthor.innerHTML = list[i].author;
    div.appendChild(pAuthor);
    const btn = document.createElement('button');
    btn.className = 'remove';
    btn.innerHTML = 'Remove';
    div.appendChild(btn);
    const hr = document.createElement('hr');
    div.appendChild(hr);
    booksListDiv.appendChild(div);
  }
  removeBtn = document.querySelectorAll('.remove');
  addEvents();
}

// add book to the list

function addBook() {
  const bookTitle = document.querySelector('#title').value;
  const bookAuthor = document.querySelector('#author').value;
  if (bookTitle && bookAuthor) {
    const book = {
      title: bookTitle,
      author: bookAuthor,
    };
    books.push(book);
    populateDom([book]);
    addToLocalStorage(books);
    document.querySelector('form').reset();
  }
}

addBtn.addEventListener('click', addBook);

// Remove book from the list

function removeBook (ref) {
  let result = books.filter((value) => value.title !== ref);
  books = result;
  addToLocalStorage(books);
}

// add event listner to newly added book remove button

function addEvents() {
  removeBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
      const ref = e.target.parentElement.firstElementChild.innerText;
      removeBook(ref);
      e.target.parentElement.remove();
    });
  });
}