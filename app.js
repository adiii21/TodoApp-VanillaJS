const addInput = document.querySelector('#add-task');
const addBtn = document.querySelector('#add-btn');
const delTaskBtn = document.querySelector('#del-btn');
const renameBtn = document.querySelector('.rename-task');
const updateBtn = document.querySelector('.update-task');
const delBtn = document.querySelector('.del-task');
const newTasks = document.querySelector('.new-tasks');

document.addEventListener("DOMContentLoaded", getTodos);

var indexOfEditBox;


// To null the input value
delTaskBtn.addEventListener('click', () =>{
    addInput.value = ''
})



addBtn.addEventListener('click', (e) =>{
    let todo = addInput.value
    todo = todo.trim(); 
    if(todo==''){
        alert('No task entered')
    }else{
        addTodo(todo)
        addInput.value = ''
        updateTodo()
    }
})

function addTodo(todo){
    let todoTask  = ` 
                <div class="task">
					<input type="text" id="added-task" name='todo' disabled value="${todo}">
                    <div>
                        <input type="button" value="✔️" name='update' title='update task' class="update-task">
                        <input type="button" value="✏️" name='rename' title='rename task' class="rename-task">
                        <input type="button" value="❌" name='delete' title='delete task' class="del-task">
                    </div>
                </div>
                ` 
    newTasks.innerHTML += todoTask
    // Add todoto local storage
    saveLocalTodos(todo);

}

function updateTodo(){
    let task = document.querySelectorAll('.task')

    task.forEach((t) => {
        console.log(t.children);
        t.addEventListener('click', e =>{
            console.log("calling click")
            

            if(e.target.classList.contains('rename-task')){

                let lists;

    
                if(localStorage.getItem('lists')=== null){
                    lists = [];
                } else{
                    lists = JSON.parse(localStorage.getItem('lists'));
                    
                }
                // todo.children[0].value
                // console.log(t.children[0].value);
                // console.log(lists.indexOf(t.children[0].value));

                indexOfEditBox = lists.indexOf(t.children[0].value);
                console.log("indexOfEditBox in click rename = " + indexOfEditBox);

                if(t.children[0].disabled){
                    t.children[0].disabled = false
                }
            }else if(e.target.classList.contains('del-task')){
                t.remove()
                // delTaskBtn(t);
                removeLocalTodo(t);
            }
            else if(e.target.classList.contains('update-task')){

                let lists;

    
                if(localStorage.getItem('lists')=== null){
                    lists = [];
                } else{
                    lists = JSON.parse(localStorage.getItem('lists'));
                    
                }
                // todo.children[0].value
                let updatedValue = t.children[0].value
                console.log("updatedValue ",updatedValue)
                console.log("indexOfEditBox in update ",indexOfEditBox)
                lists[indexOfEditBox] = updatedValue;

                console.log("final updated lists", lists)

                //set in local storage
                localStorage.setItem('lists',JSON.stringify(lists));

                if(t.children[0].disabled == false){
                    t.children[0].disabled = true

                }

            }
        })
    })
}

// Save local todos

function saveLocalTodos(todo) {
    let lists;
    if(localStorage.getItem('lists')=== null){
        lists = [];
    } else{
        lists = JSON.parse(localStorage.getItem('lists'));
    }
    
    lists.push(todo);
    localStorage.setItem('lists', JSON.stringify(lists));
}

function getTodos(){
    
    let lists;
    if(localStorage.getItem('lists')=== null){
        lists = [];
    } else{
        lists = JSON.parse(localStorage.getItem('lists'));
    }
    lists.forEach(function(list){

        let todoTask  = ` 
        <div class="task">
            <input type="text" id="added-task" name='todo' disabled value="${list}">
            <div>
                <input type="button" value="✔️" name='update' title='update task' class="update-task">
                <input type="button" value="✏️" name='rename' title='rename task' class="rename-task">
                <input type="button" value="❌" name='delete' title='delete task' class="del-task">
            </div>
        </div>
        ` 
        newTasks.innerHTML += todoTask
        updateTodo();

    });
}

function removeLocalTodo(todo){
    let lists;
    
    if(localStorage.getItem('lists')=== null){
        lists = [];
    } else{
        lists = JSON.parse(localStorage.getItem('lists'));
        
    }
    const todoIndex =  todo.children[0].value;
    lists.splice(lists.indexOf(todoIndex), 1);
    localStorage.setItem('lists',JSON.stringify(lists));
    
}

// function updateLocalTodo(todo){
//     let lists;
    
//     if(localStorage.getItem('lists')=== null){
//         lists = [];
//     } else{
//         lists = JSON.parse(localStorage.getItem('lists'));
        
//     }
//     console.log(lists.indexOf(todo.children[0].value));
//     // lists.splice(lists.indexOf(todoIndex), 1);
//     // localStorage.setItem('lists',JSON.stringify(lists));
    
// }

