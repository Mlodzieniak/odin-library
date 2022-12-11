const booksDiv = document.querySelector('.books');
// const titleInput = document.querySelector('#title');
// const authorInput = document.querySelector('#author');
// const pagesInput = document.querySelector('#pages');
// const statusInput = document.querySelector('#status');

const submitButton = document.querySelector('#submit-button');

let myLibrary = [];
let printedBooks = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
Book.prototype.status = function () {
    let didRead = 'not read yet';
    if (this.read === true) didRead = 'read';
    return `${didRead}`
};

const lotr = new Book('Lord of the rings', 'JRR', 266, true);
myLibrary.push(lotr);
const starWars = new Book('Star Wars', 'Stalin', 999, false);
myLibrary.push(starWars);
const it = new Book('IT', 'Stephan Hawking', 500, true);
myLibrary.push(it);
const swordAndFire = new Book('Ogniem i mieczem', 'Jan Kochanowski', 450, true);
myLibrary.push(swordAndFire);
// function addBookToLibrary(){
//     while(true){
//     let userInput = prompt('Add book to library. Format(Title, Author, Pages, Read?(true or false))').split(" ").join(', ');
//     if(userInput == 'exit') break;
//     const newBook = new Book(userInput);
//     }
// }
function printLibrary() {
    myLibrary.forEach(position => {
        if (!isPrinted(position)) {
            const bookCard = document.createElement('div');
            const bookTitle = document.createElement('h1');
            const bookAuthor = document.createElement('h3')
            const bookPages = document.createElement('h3');
            const bookStatus = document.createElement('h3');

            bookCard.classList.add('book-card');
            booksDiv.appendChild(bookCard);
            bookTitle.innerHTML = `${position.title}`;
            bookAuthor.innerHTML = `Author: ${position.author}`;
            bookPages.innerHTML = `Pages: ${position.pages}`;
            bookStatus.innerHTML = `Status: ${position.status()}`;
            bookCard.appendChild(bookTitle);
            bookCard.appendChild(bookAuthor);
            bookCard.appendChild(bookPages);
            bookCard.appendChild(bookStatus);
            printedBooks.push(position);
        }


    });
}
function isPrinted(position) {
    if(printedBooks.includes(position)){
        return true;
    }
    return false;
}

submitButton.addEventListener('click', () => {
    let titleInput = document.forms['add-book']['title'].value;
    if (titleInput == '') {
        alert('Must fill out form.');
        return;
    }
    let authorInput = document.forms['add-book']['author'].value;
    let pagesInput = parseInt(document.forms['add-book']['pages'].value);
    let statusInput = document.forms['add-book']['status'].value;

    // const addBook = new Book(titleInput, authorInput, pagesInput, statusInput);
    myLibrary.push(new Book(titleInput, authorInput, pagesInput, statusInput));
    printLibrary();
    document.forms['add-book'].reset();
})
printLibrary();