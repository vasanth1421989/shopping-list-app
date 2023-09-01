const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clear  = document.querySelector('#clear');
const formBtn = itemForm.querySelector('.btn');
let isEditMode =false;

const itemFilter = document.getElementById('filter');

function onAddItemSubmit(e){
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === ''){
        alert('please enter item');
        return;
    }

    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeFromLocalStorage(itemToEdit.textContent);
        itemToEdit.remove();
        itemToEdit.classList.remove('edit-mode');
        isEditMode = false
    }else{
        if(checkIfItemExists(newItem)){
            alert('item already exists');
            return;
        }
    }

    addItemToDOM(newItem);
    
    addItemToStorage(newItem);

    checkUI();
    
}


function addItemToDOM(item){
    const newItem = item;

    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(newItem));
    
    const button = createButton('remove-item btn-link text-red');
    listItem.appendChild(button);
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    console.log(listItem);

    itemList.appendChild(listItem);
    itemInput.value ='';

    
}



function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;

    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className=classes;
    return icon;
}

function addItemToStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    
    itemsFromStorage.push(item);

    localStorage.setItem('items',JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
     
    return itemsFromStorage;

}


function checkIfItemExists(item){
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
    
}





function onClickItem(e){
    if (e.target.parentElement.classList.contains('remove-item')) {
     removeItem(e.target.parentElement.parentElement)   
    }else{
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item){
    isEditMode = true;
    console.log(item);
    itemList.querySelectorAll('li').forEach(i=>i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor= '#228b22';
    itemInput.value = item.textContent;
    
}


function removeItem(item){
    if (confirm('Are you sure')) {
        item.remove();
        removeFromLocalStorage(item.textContent)
        checkUI();
    }
}

function removeFromLocalStorage(item){
    let storageData  = localStorage.getItem('items');
    let arr = JSON.parse(storageData);
    let result  = arr.filter(a=> a !== item);
    console.log(result);
    localStorage.setItem('items',JSON.stringify(result));
    
}


function clearAll(e){
    
    // if(list.length === 0){
    //     alert('nothing to clear');
    // }

    console.log(itemList);
    if (confirm('Are you sure?')) {
        while(itemList.firstChild){
            
            removeFromLocalStorage(itemList.firstChild.textContent);
            itemList.removeChild(itemList.firstChild);
            
        }
        
        checkUI();    
    }
    
    // const list = document.querySelectorAll('li');
    
    
    // list.forEach(item =>item.remove());
}

function filterItems(e){

    const text = e.target.value.toLowerCase();

    const items = itemList.querySelectorAll('li');

    items.forEach(item=>{
          if (item.textContent.toLowerCase().indexOf(text) !=-1) {
            item.style.display = 'flex';
          } else{
            item.style.display = 'none';
          } 
    });


}



function checkUI(){
    itemInput.value ='';
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        itemFilter.style.display='none';
        clear.style.display='none';
    }else{
        itemFilter.style.display='block';
        clear.style.display='block';
    }


    formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    console.log('page load');
    isEditMode = false;
}

function displayItems(){

    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item)=> addItemToDOM(item));

}






//Event Listeners
(function(){
    itemForm.addEventListener('submit',onAddItemSubmit);
itemList.addEventListener('click',onClickItem);
clear.addEventListener('click',clearAll);
window.addEventListener('load',checkUI);
itemFilter.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);


})();
// itemForm.addEventListener('submit',onAddItemSubmit);
// itemList.addEventListener('click',removeItem);
// clear.addEventListener('click',clearAll);
// window.addEventListener('load',checkUI);
// itemFilter.addEventListener('input',filterItems);
// document.addEventListener('DOMContentLoaded',displayItems);