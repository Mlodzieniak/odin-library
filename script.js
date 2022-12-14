const booksDiv = document.querySelector('.books');
document.getElementById('reading').checked = true;
const submitButton = document.querySelector('#submit-button');

const editForm = document.querySelector('.edit-book-form');
const saveButton = document.querySelector('#save-changes-button');

let myLibrary = [];
let printedBooks = [];
let currentlyEdited = {};

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
Book.prototype.status = function () {
    let didRead = 'not read yet';
    if (this.read == 'Finished') didRead = this.read;
    if (this.read == 'Reading') didRead = this.read;
    if (this.read == 'I plan to read it') didRead = this.read;
    return `${didRead}`
};

//Dummy books
const lotr = new Book('Lord of the rings', 'JRR', 266, 'Finished');
myLibrary.push(lotr);
const starWars = new Book('Star Wars', 'Stalin', 999, 'Finished');
myLibrary.push(starWars);
const it = new Book('IT', 'Stephan Hawking', 500, 'I plan to read it');
myLibrary.push(it);
const swordAndFire = new Book('Ogniem i mieczem', 'Jan Kochanowski', 450, 'Reading');
myLibrary.push(swordAndFire);

function printLibrary() {
    myLibrary.forEach(position => {
        if (!isPrinted(position)) {
            const bookCard = document.createElement('div');
            const cardData = document.createElement('div');
            const bookTitle = document.createElement('h1');
            const bookAuthor = document.createElement('h3');
            const bookPages = document.createElement('h3');
            const bookStatus = document.createElement('h3');
            const cardButtons = document.createElement('div');
            const remove = document.createElement('button');
            const edit = document.createElement('button');
            const commentButton = document.createElement('button');

            bookCard.classList.add('book-card');
            bookCard.setAttribute('data-index-number', `${myLibrary.length}`);
            cardButtons.classList.add('card-buttons')
            remove.classList.add('remove');
            remove.setAttribute('type','button');
            remove.innerHTML = 'Remove';
            edit.classList.add('edit');
            edit.setAttribute('type','button');
            edit.innerHTML = 'Edit';
            commentButton.classList.add('comment');
            commentButton.setAttribute('type','button');
            commentButton.innerHTML = 'Add comment'

            booksDiv.appendChild(bookCard);
            bookCard.appendChild(cardData);
            bookTitle.innerHTML = `${position.title}`;
            bookAuthor.innerHTML = `Author: ${position.author}`;
            bookPages.innerHTML = `Pages: ${position.pages}`;
            bookStatus.innerHTML = `Status: ${position.status()}`;
            cardData.appendChild(bookTitle);
            cardData.appendChild(bookAuthor);
            cardData.appendChild(bookPages);
            cardData.appendChild(bookStatus);

            bookCard.appendChild(cardButtons);
            cardButtons.appendChild(edit);
            cardButtons.appendChild(commentButton);
            cardButtons.appendChild(remove);
           
            
            edit.addEventListener('click', ()=>showEditForm(position));
            commentButton.addEventListener('click', ()=>addComment(position, cardData, cardButtons,commentButton))
            remove.addEventListener('click', ()=>removeCard(position));
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
function reloadLibrary(){
    booksDiv.innerHTML = '';
    printedBooks = [];
    printLibrary();
}
function removeCard(position){
    myLibrary.splice(myLibrary.findIndex(element=>{
       return element.title == position.title;
    }), 1);
    reloadLibrary();
}
function addComment(position, cardData, cardButtons,commentButton){
    if(!position.hasOwnProperty('comment')){
    const commentArea = document.createElement('textarea');
    const commentLabel = document.createElement('label');
    commentLabel.innerHTML = 'Comment:';
    cardData.appendChild(commentLabel);
    commentArea.setAttribute('name', 'book-comment');
    commentArea.setAttribute('placeholder', 'Add comment...');
    commentArea.setAttribute('rows', '3');
    commentArea.setAttribute('maxlength', '100');
    position.comment = commentArea.value;
    cardData.appendChild(commentArea);
    cardButtons.removeChild(commentButton);
    const saveButton = document.createElement('button');
    saveButton.setAttribute('type', 'button');
    saveButton.innerHTML = 'Save comment';
    cardButtons.appendChild(saveButton);

    saveButton.addEventListener('click', ()=>{
        position.comment = commentArea.value;
    })
    }
} 
function showEditForm(position){
    editForm.classList.toggle("hide");
    saveButton.removeAttribute('disabled');
    document.forms['edit-book']['edit-title'].value = position.title;
    document.forms['edit-book']['edit-author'].value = position.author;
    document.forms['edit-book']['edit-pages'].value = position.pages;
    document.forms['edit-book']['edit-status'].value = position.read;
    currentlyEdited = position;

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

    myLibrary.push(new Book(titleInput, authorInput, pagesInput, statusInput));
    printLibrary();
    document.forms['add-book'].reset();
})
saveButton.addEventListener('click', () =>{
    let titleEdit = document.forms['edit-book']['edit-title'].value;
    let authorEdit = document.forms['edit-book']['edit-author'].value;
    let pagesEdit = document.forms['edit-book']['edit-pages'].value;
    let statusEdit = document.forms['edit-book']['edit-status'].value;
    currentlyEdited.title = titleEdit;
    currentlyEdited.author = authorEdit;
    currentlyEdited.pages = pagesEdit;
    currentlyEdited.read = statusEdit;
    currentlyEdited.status();
    
    reloadLibrary();
})
printLibrary();