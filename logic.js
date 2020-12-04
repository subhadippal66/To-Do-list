//selector
const toDoInput = document.querySelector('.toDoInput');
const toDoButton = document.querySelector('.toDoButton');
const toDoList = document.querySelector('.toDoList');
const toDoFilter = document.querySelector('#box');


//event-listener

toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener('click',deleteToDo);
toDoFilter.addEventListener('change', filter);


//function

function addToDo(event){
    event.preventDefault();
    //creating div that contains everything
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('toDo');
    //creating a li and append it inside the div
    const toDoName = document.createElement('li');
    toDoName.classList.add('toDo-name');
    toDoName.innerText = toDoInput.value;

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


