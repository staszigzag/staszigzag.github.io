var templateItem = document.getElementsByTagName("template")[0].content;
var btnAddItem = document.getElementsByClassName("creator-item__btn-add")[0];
var inputAddItem = document.getElementsByClassName("creator-item__input")[0];
var listItem = document.getElementsByClassName("list__wrapper")[0];


function creatItem(){ 
    var cloneTemplate = templateItem.cloneNode(true);
    // var text = document.createTextNode(inputAddItem.innerText);
    // console.dir(inputAddItem.innerText);
   
    cloneTemplate.querySelector(".item__text p").innerText = inputAddItem.innerText;
    listItem.appendChild(cloneTemplate);
};
// creatItem
// console.dir(cloneTemplate);
btnAddItem.addEventListener("click", creatItem);