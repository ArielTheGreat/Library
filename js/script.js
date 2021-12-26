let myLibrary = [];
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.changeReadStatus = function(){
    console.log(this.read);
    if(this.read == "true"){
        this.read = "false";
    }else{
        this.read = "true";
    }
    displayBooks();
};
let inputTitle = document.getElementById("titleOfBook");
let inputAuthor = document.getElementById("authorOfBook");
let inputPages = document.getElementById("pagesOfBook");
let table = document.getElementById("tableLibrary");
let crossCloseWindow = document.getElementById("crossCloseWindow");
let modal = document.getElementById('bg-modal');
crossCloseWindow.addEventListener("click",function(){
    modal.style.visibility = "hidden";
});
table.classList.add("tableLibrary");
function createBookObject(){
    let title = inputTitle.value;
    let author = inputAuthor.value;
    let pages = inputPages.value;
    let readsRadios = document.getElementsByName('questionAlreadyReadBook');
    let read;
    for(let i = 0;i < readsRadios.length;i++){
        if(readsRadios[i].checked){
            read = readsRadios[i].value;
        }
    }
    let book = new Book(title,author,pages,read);
    addBookToLibrary(book);
    displayBooks();
}
displayBooks();
function addBookToLibrary(book){
    myLibrary.push(book);
    document.getElementById('bg-modal').style.visibility="hidden";
}
function displayBooks(){
    while (table.children.length > 1) {
        table.removeChild(table.lastChild);
    }
    for(let y = 0; y < myLibrary.length;y++){
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");
            let textTitle = document.createTextNode(myLibrary[y].title);
            let textAuthor = document.createTextNode(myLibrary[y].author);
            let textPages = document.createTextNode(myLibrary[y].pages);
            let textRead;
            switch(myLibrary[y].read){
                case "true":
                    textRead =document.createTextNode( "Already read");
                    break;
                case "false":
                    textRead =document.createTextNode("Not read yet"); 
                    break;
            }
            let buttonChangeReadStatus = document.createElement("button");
            let buttonDelete = document.createElement("button");
            buttonChangeReadStatus.innerHTML = "Change Read Status";
            buttonChangeReadStatus.onclick = function(){
                console.log(this);
                myLibrary[y].changeReadStatus();
            };
            let vr = document.createElement("br");
            buttonDelete.innerHTML = "Remove";
            buttonDelete.setAttribute("numero",y);
            buttonDelete.onclick = deleteThisBookFromLibrary;
            td.appendChild(textTitle);
            td2.appendChild(textAuthor);
            td3.appendChild(textPages);
            td4.appendChild(textRead);
            td4.appendChild(vr);
            td4.appendChild(buttonChangeReadStatus);
            td5.appendChild(buttonDelete);
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            table.appendChild(tr);
    }
}
function deleteThisBookFromLibrary(){
    myLibrary.splice(this.getAttribute("numero"),1);
    displayBooks();
}
function showPopupForm(){
    modal.style.visibility="visible";
    inputAuthor.value = '';
    inputPages.value = '';
    inputTitle.value = '';
}
