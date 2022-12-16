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
const metro = new Book('Metro 2033', 'Glukhovsky Dmitry', 592, 'I plan to read it');
myLibrary.push(metro);
const lotr = new Book('Lord of the rings', 'J.R.R. Tolkien', 266, 'Finished');
myLibrary.push(lotr);
const witcher = new Book('The Witcher', 'Andrzej Sapkowski', 237, 'Finished');
myLibrary.push(witcher);
const it = new Book('IT', 'King Stephen', 1376, 'I plan to read it');
myLibrary.push(it);



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
            const commentDiv = document.createElement('div');

            bookCard.classList.add('book-card');
            bookCard.setAttribute('data-index-number', `${myLibrary.length}`);
            cardButtons.classList.add('card-buttons');
            cardData.classList.add('card-data')
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
            cardButtons.appendChild(commentDiv);
            commentDiv.appendChild(commentButton);
            cardButtons.appendChild(remove);
           
            
            edit.addEventListener('click', ()=>showEditForm(position));
            remove.addEventListener('click', ()=>removeCard(position));
            commentButton.addEventListener('click', ()=>addComment(position, cardData, cardButtons, commentButton, commentDiv))
            printedBooks.push(position);
            if(typeof position.comment === 'string' && position.comment.length !== 0){
                comment(position, cardData, cardButtons,commentButton, commentDiv);
            }
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
function addComment(position, cardData, cardButtons,commentButton, commentDiv){
    if(!position.hasOwnProperty('comment')){
        comment(position, cardData, cardButtons, commentButton, commentDiv);
    }
} 
function comment(position, cardData, cardButtons,commentButton, commentDiv){
    const commentArea = document.createElement('textarea');
    const commentLabel = document.createElement('label');
    commentLabel.innerHTML = 'Comment:';
    cardData.appendChild(commentLabel);
    commentArea.setAttribute('name', 'book-comment');
    commentArea.setAttribute('placeholder', 'Add comment...');
    commentArea.setAttribute('rows', '4');
    commentArea.setAttribute('maxlength', '100');
    if(typeof position.comment === 'string' && position.comment.length !== 0){
        commentArea.value = position.comment;   
    }
    cardData.appendChild(commentArea);
    commentDiv.removeChild(commentButton);   
    const saveCommentButton = document.createElement('button');
    saveCommentButton.setAttribute('type', 'button');
    saveCommentButton.innerHTML = 'Save comment';
    commentDiv.appendChild(saveCommentButton);

    saveCommentButton.addEventListener('click', ()=>{
        position.comment = commentArea.value;

    })
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