var templateItem = document.getElementsByTagName("template")[0].content;
var btnAddItem = document.getElementsByClassName("creator-item__btn-add")[0];
var inputAddItem = document.getElementsByClassName("creator-item__input")[0];
var listItem = document.getElementsByClassName("list__wrapper")[0];



function changeItem(){

}
function deleteItem(evt){
    console.dir(evt);
    console.dir(this);
    var itemList = this.parentElement.parentElement; //получить задачу из списка
    itemList.classList.add("opacity");
    setTimeout( function(){itemList.parentElement.removeChild(itemList)},500);
}
function saveItem(){
       
}
function putListener(element){
    var x = element.querySelector(".item__btn-delete").addEventListener("click", deleteItem);
    
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