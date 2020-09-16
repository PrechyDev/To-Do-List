// select the refresh button
const refresh = document.querySelector('.refresh');
//select the date element
const date = document.getElementById('date');
//select the list element
const list = document.getElementById('list');
//select the input element
const input = document.getElementById('input');

//creating variables for classnames
const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const strike = 'strike';

//create an array for storing toDo items and id for identifying items
let toDoList = [], id = 0;
//get items in to do list
let data = localStorage.getItem('TODO');

//if there is data, restore it 
if (data) {
    toDoList = JSON.parse(data);
    id = toDoList.length //set id to the last one in the list
    loadList(toDoList); //load list
} else {
    //if data is empty, load a fresh page
    toDolist = []
    id = 0;
}

function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.delete)
    })
}



//event listener for refreshing the list
refresh.addEventListener('click', function () {
    localStorage.clear(); //clears the localStorage
    location.reload() //reloads page
})

//shows today's date
let options = { weekday: 'long', month: 'short', day: 'numeric' }
let today = new Date();
date.innerHTML = today.toLocaleDateString('en-ng', options)

//function to create a new li tag and add the input value entered by the user to the list
function addToDo(toDo, id, done, trash) {

    //if trash is true, the function would return to it self
    if (trash) { return; }

    //check if task idss done and assign classnames
    const isChecked = done ? check : uncheck;
    const line = done ? strike : '';

    //text to insert into html
    const item = `
    <li class="item">
    <i class="done fa ${isChecked}" role="mark done" id="${id}"></i>
    <p class="text ${line}">${toDo}</p>
    <i class="delete fa fa-trash-o" role="delete" id="${id}"></i>
</li>`;

    const position = 'beforeend';

    list.insertAdjacentHTML(position, item)
}

//event listener that takes the input.value when the enter key is pressed and assigns it to `toDo` and also resets the input
document.addEventListener('keyup', function (event) {
    //when the enter key is pressed, the following block of code is ran
    if (event.keyCode == 13) {
        //assign the input.value to a variable toDo
        const toDo = input.value;
    
        //returns false if toDo is empty and runs when it's not
        if (toDo) {
            addToDo(toDo, id, false, false);
            //stores the toDO to the array `toDoList`
            toDoList.push({
                    name: toDo,
                    id: id,
                    done: false,
                    delete: false,
                });
            //increases the id by 1 after running the code block
            id++;
            //save to localStorage, it must be added to every way the array is updated
            localStorage.setItem('TODO', JSON.stringify(toDoList));
        }
    //resets the input.value
    input.value = '';
    }
})

//function for marking to do as done
function markDone(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(strike)
    toDoList[element.id].done = toDoList[element.id].done ? false : true;
}

//function for removing a to do item
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    toDoList[element.id].delete = true;
}

//an event listener that each item dynamically
list.addEventListener('click', function (event) {
    const element = event.target; //targets the element that is clicked
    const role = element.attributes.role.value; //delete or mark done
    if (role == 'mark done') {
        markDone(element);
    } else if (role == 'delete') {
        removeToDo(element);
    }

    //save to localStorage, it must be added to every way the array is updated
    localStorage.setItem('TODO', JSON.stringify(toDoList));
});















