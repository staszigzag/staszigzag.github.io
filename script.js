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
        if((textItem.innerText != inputItem.innerText)&& (inputItem.innerText.trim() != "") ){
            //проверка на изменения и пустую строку
            textItem.innerText = inputItem.innerText;
            parseListItemAndWriteLocacStorage ();
        }
        labelItem.style.display = "";
        inputItem.style.display = "none";
        this.innerText = "Изменить";
        
    }
}
function deleteItem(evt){
    // console.dir(evt);
    // console.dir(this);
    var itemIslist = this.parentElement.parentElement; //получить задачу из списка
    itemIslist.classList.add("opacity");
    setTimeout( function(){itemIslist.parentElement.removeChild(itemIslist);
                            parseListItemAndWriteLocacStorage ();},400);
}
function putListener(element){
    element.querySelector(".item__btn-delete").addEventListener("click", deleteItem);
    element.querySelector(".item__btn-change").addEventListener("click", changeItem);
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
        parseListItemAndWriteLocacStorage ();
        
    }
}


// creatItem
// console.dir(cloneTemplate);
btnAddItem.addEventListener("click", creatItem);
document.addEventListener("change", parseListItemAndWriteLocacStorage );

var arrItem
var localListItem 

function parseListItemAndWriteLocacStorage (){
    var arrLi = document.querySelectorAll(".item");
    var arrInfo = {} ; //??????????????????????????????????????????
    for (var i = 0; i < arrLi.length; i++) {
        var obj = {};
        obj.status = arrLi[i].querySelector(".item__chek").checked;
        obj.text = arrLi[i].querySelector(".item__text p").innerText;
        arrInfo[i] = obj;
    }
    localStorage.setItem("ToDoList", JSON.stringify(arrInfo));
// console.dir(JSON.parse(localStorage.getItem("ToDoList")));

}
function writeInHTML(){
    var arrInfo = JSON.parse(localStorage.getItem("ToDoList"));
    // if(arrInfo.ToDoList == "no list item") return;
    for( var key in arrInfo){
        var cloneTemplate = templateItem.cloneNode(true);
        cloneTemplate.querySelector(".item__text p").innerText = arrInfo[key].text;
        cloneTemplate.querySelector(".item__chek").checked = arrInfo[key].status;
        putListener(cloneTemplate);
        listItem.appendChild(cloneTemplate);
        // inputAddItem.innerText = "";
        // inputAddItem.focus();
    }

}


function parseStartLocalStorage(){
    if(localStorage.getItem("ToDoList")){
    localListItem = JSON.parse(localStorage.getItem("ToDoList"));
    console.dir(localListItem);
    }else{
    // localStorage.setItem("ToDoList", '{"ToDoList":"no list item"}')
    localStorage.setItem("ToDoList", '{"0":{"status":false,"text":"беспробудную тупость, всегда легко спутать с гениальностью....   😈 😈 😈 "}}')
    console.dir("no");
    }
}


parseStartLocalStorage();
// parseListItemAndWriteLocacStorage ();
writeInHTML();


// console.dir({localStorage:"new", fgfg:"ff"} );
// console.info({localStorage:"new", fgfg:"ff"} );
// localStorage.new.z =2452254;