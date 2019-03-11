var templateItem = document.getElementsByTagName("template")[0].content;
var btnAddItem = document.getElementsByClassName("creator-item__btn-add")[0];
var inputAddItem = document.getElementsByClassName("creator-item__input")[0];
var listItem = document.getElementsByClassName("list__wrapper")[0];

// изменить или сохранить элемент списка-------------------------------------------------------------------------------
function changeItem(){
    var inputItem = this.parentElement.previousElementSibling.firstElementChild;
    var labelItem = inputItem.nextElementSibling;
    var textItem = labelItem.lastElementChild;

    if (this.textContent == "Изменить"){  //проверка на состояние кнопки
    inputItem.innerText = textItem.innerText;
    labelItem.style.display = "none";
    inputItem.style.display = "";
    inputItem.focus(); // добавить фокус на поле ввода
    this.innerText = "Сохранить";
    }else{
        if ((textItem.innerText != inputItem.innerText) && (inputItem.innerText.trim() != "")){ 
            //проверка на изменения текста и пустую строку
            textItem.innerText = inputItem.innerText;
            parseListItemAndWriteLocacStorage();
        }
        labelItem.style.display = "";
        inputItem.style.display = "none";
        this.innerText = "Изменить";
    }
}
// удалить элемент из списка задач-------------------------------------------------------------------------------------
function deleteItem(){
    var itemIslist = this.parentElement.parentElement; //получить элемент из списка

    itemIslist.classList.add("opacity");   //добавить класс с анимацией прозрачности
    setTimeout(function()  { itemIslist.parentElement.removeChild(itemIslist);
                            parseListItemAndWriteLocacStorage();
                            },400); // анимация прозрачности длиться 300мс, а элемент удалим через 400мс
}
// создать новый элемент для списка -------------------------------------------------------------------------------------
function creatItem(){ 
    var cloneTemplate = templateItem.cloneNode(true); // глубокое копирование
    var text = inputAddItem.innerText;

    if (text.trim() == ""){                     //проверка на пустую строку
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
// повесить обработчики на кнопки нового элемента ------------------------------------------------------------------------
function putListener(element){
    element.querySelector(".item__btn-delete").addEventListener("click", deleteItem);
    element.querySelector(".item__btn-change").addEventListener("click", changeItem);
}
// запись в LocacStorage---------------------------------------------------------------------------------------------------
function parseListItemAndWriteLocacStorage (){
    var arrLi = document.querySelectorAll(".item");
    var arrObjectInfo = {}; 
    for (var i = 0; i < arrLi.length; i++){
        var obj = {};
        obj.status = arrLi[i].querySelector(".item__chek").checked;
        obj.text = arrLi[i].querySelector(".item__text p").innerText;
        arrObjectInfo[i] = obj;
    }
    localStorage.setItem("ToDoList", JSON.stringify(arrObjectInfo));
}
// проверка при старте на наличие записей, создание тестовой и их рендер---------------------------------------------------
function parseStartLocalStorage(){
    var arrObjectInfoOutLocal = JSON.parse(localStorage.getItem("ToDoList"));

    if (!arrObjectInfoOutLocal){   //проверка на наличие записей, и присваение lorem 
        arrObjectInfoOutLocal = {"0":{"status":false,"text":"беспробудную тупость, всегда легко спутать с гениальностью.... 😈 😈 😈"}};
    }
    for (var key in arrObjectInfoOutLocal){  //рендер всех сохраненных записей
        var cloneTemplate = templateItem.cloneNode(true);
        cloneTemplate.querySelector(".item__text p").innerText = arrObjectInfoOutLocal[key].text;
        cloneTemplate.querySelector(".item__chek").checked = arrObjectInfoOutLocal[key].status;
        putListener(cloneTemplate);
        listItem.appendChild(cloneTemplate);
    }
}
btnAddItem.addEventListener("click", creatItem); // обработка нажатия на добавить
document.addEventListener("change", parseListItemAndWriteLocacStorage); // запись изменений при смене чекбоксов
parseStartLocalStorage(); //точка входа 
