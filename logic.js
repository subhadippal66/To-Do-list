//selector
const toDoInput = document.querySelector('.toDoInput');
const toDoButton = document.querySelector('.toDoButton');
const toDoList = document.querySelector('.toDoList');
const toDoFilter = document.querySelector('#box');

const body = document.querySelector('body');


//event-listener

document.addEventListener('DOMContentLoaded', getToDo);
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener('click',deleteToDo);
toDoFilter.addEventListener('change', filter);



//body.addEventListener('onLoad', setbackground);
//function

function setbackground()
{
window.setTimeout( "setbackground()", 2000); // 5000 milliseconds delay
var index = Math.round(Math.random() * 9);
var ColorValue = "2f2420"; // default color - white (index = 0)
if(index == 1)
ColorValue = "2f2a20"; //peach
if(index == 2)
ColorValue = "2a2f20"; //violet
if(index == 3)
ColorValue = "2b2f20"; //lt blue
if(index == 4)
ColorValue = "232f20"; //cyan
if(index == 5)
 ColorValue = "202f27"; //tan
if(index == 6)
ColorValue = "202f2f"; //lt green
if(index == 7)
ColorValue = "20292f"; //lt yellow
if(index == 8)
ColorValue = "20222f"; //lt orange
if(index == 9)
ColorValue = "29202f"; //lt grey
document.getElementsByTagName("body")[0].style.backgroundColor = "#" + ColorValue;
}







function addToDo(event){
    event.preventDefault();
    //creating div that contains everything
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('toDo');
    //creating a li and append it inside the div
    const toDoName = document.createElement('li');
    toDoName.classList.add('toDo-name');
    toDoName.innerText = toDoInput.value;
    //save locally
    saveLocal(toDoInput.value);

    //append the div in li
    if(toDoInput.value !== ''){
        toDoList.appendChild(toDoDiv);
    }
    toDoInput.value = '';
    toDoDiv.appendChild(toDoName);

    

    //creating a done button and append it inside the div
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done-btn');
    doneBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
    toDoDiv.appendChild(doneBtn);

    //creating a delete button and append it inside the div
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML ='<i class="fas fa-trash"></i>';
    toDoDiv.appendChild(deleteBtn);
    
    
    
}

function deleteToDo(e){    
    const btn_clicked = e.target;
    if(btn_clicked.classList[0]==='delete-btn'){
        btn_clicked.parentElement.classList.add('fall');
        removeLocalToDo(btn_clicked.parentElement);
        btn_clicked.parentElement.addEventListener('transitionend', function(){
            btn_clicked.parentElement.remove();
        });
    }

    if(btn_clicked.classList[0]==='done-btn'){
        btn_clicked.parentElement.classList.toggle('completed');
    }
}



function filter(e){
    
    const toDo_ = toDoList.children;
    //console.dir(toDo_[1]);

    for(let todo of toDo_){
        //console.dir(todo);
        if(e.target.id === 'all'){
            todo.style.display = 'flex';
        }
    
        else if(e.target.id === 'complete'){
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }
            else{
                todo.style.display = 'none';
            }
        }
        else if(e.target.id === 'incomplete'){
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }
            else{
                todo.style.display = 'none';
            }
        }
    }
    
    
}    





function saveLocal(toDo){
    //check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(toDo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function getToDo(){
    console.log('hey');
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add('toDo');
        //creating a li and append it inside the div
        const toDoName = document.createElement('li');
        toDoName.classList.add('toDo-name');
        toDoName.innerText = todo;
        
        toDoList.appendChild(toDoDiv);
        
        
        toDoDiv.appendChild(toDoName);
          

    //creating a done button and append it inside the div
        const doneBtn = document.createElement('button');
        doneBtn.classList.add('done-btn');
        doneBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
        toDoDiv.appendChild(doneBtn);

    //creating a delete button and append it inside the div
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML ='<i class="fas fa-trash"></i>';
        toDoDiv.appendChild(deleteBtn);
    })
}


function removeLocalToDo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
 //[Done]we have the text of the div we want to delete now we have to find the index in the array todos
    

    let txt = todo.children[0].outerText;
    //console.log(txt);

    let index = todos.indexOf(txt);   //returning -1 that means search failed   need to fix

    //console.log(index);
    todos.splice(index,1);

    localStorage.setItem("todos",JSON.stringify(todos));
}