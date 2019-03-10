var templateItem = document.getElementsByTagName("template")[0].content;
var btnAddItem = document.getElementsByClassName("creator-item__btn-add")[0];
var inputAddItem = document.getElementsByClassName("creator-item__input")[0];
var listItem = document.getElementsByClassName("list__wrapper")[0];



function changeItem(){
    var inputItem = this.parentElement.previousElementSibling.firstElementChild;
    var labelItem = inputItem.nextElementSibling;
    var textItem = labelItem.lastElementChild;

    if(this.textContent == "Изменить"){
    inputItem.innerText = textItem.innerText;
    labelItem.style.display = "none";
    inputItem.style.display = "";
    inputItem.focus();
    this.innerText = "Сохранить";
    }else{
        textItem.innerText = inputItem.innerText;
        labelItem.style.display = "";
        inputItem.style.display = "none";
        this.innerText = "Изменить"
    }
}
function deleteItem(evt){
    // console.dir(evt);
    // console.dir(this);
    var itemIslist = this.parentElement.parentElement; //получить задачу из списка
    itemIslist.classList.add("opacity");
    setTimeout( function(){itemIslist.parentElement.removeChild(itemIslist)},500);
}
function saveItem(){
   
}
function putListener(element){
    element.querySelector(".item__btn-delete").addEventListener("click", deleteItem);
    element.querySelector(".item__btn-change").addEventListener("click", changeItem);
    // element.querySelector(".item__btn-delete").addEventListener("click", deleteItem);
}
function creatItem(){ 
    var cloneTemplate = templateItem.cloneNode(true);
    var text = inputAddItem.innerText;
    
    if(text.trim() == ""){                     //проверка на пустую строку
        inputAddItem.innerText = "";
        inputAddItem.focus();
        }else{ 
        cloneTemplate.querySelector(".item__text p").innerText = text;
        putListener(cloneTemplate);
        listItem.appendChild(cloneTemplate);
        inputAddItem.innerText = "";
        inputAddItem.focus();
    }
}


// creatItem
// console.dir(cloneTemplate);
btnAddItem.addEventListener("click", creatItem);