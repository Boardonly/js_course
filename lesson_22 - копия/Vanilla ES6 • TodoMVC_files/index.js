
const input = document.getElementsByClassName('new-todo')[0];
const main = document.getElementsByClassName('main')[0];
const todoList = document.getElementsByClassName('todo-list')[0];
const itemTemplate = document.getElementsByClassName('hidden')[0];
const clearButton = document.getElementsByClassName('clear-completed')[0];
const todoCount = document.getElementsByClassName('todo-count')[0];
const filters = document.getElementsByClassName('filters')[0];
const SECRET_KEY = '$2a$10$5xA6OFP4qnNwimKo5/eK0eLoN60N/mcBIpajju/F4nxswjlvxe1Ti';

input.addEventListener('keydown', onSubmite);
clearButton.addEventListener('click', onClear);
filters.addEventListener('click', onRoutingChange);

let count = 0;


// 5be0a9634435b24ed640b985

function postData (data){
    return fetch('https://api.jsonbin.io/b', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'secret-key': SECRET_KEY,
            private: 'true',
            name: 'todo',
        }, 
        body: JSON.stringify(data)
   });
};

function putData (id, data){
    return fetch(`https://api.jsonbin.io/b/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'secret-key': SECRET_KEY,
            private: 'true',
            name: 'todo',
        }, 
        body: JSON.stringify(data)
   })
};

function getData (id){
    return fetch(`https://api.jsonbin.io/b/${id}`, {
        method: 'GET',
        headers: {
            'secret-key': SECRET_KEY,
            private: 'true',
        }, 
    }).then(res => res.json());
}

window.postData = postData;
window.getData = getData;
window.putData = putData;

function updateCount(change) {
    count += change;
    todoCount.innerText = `${count} item${count === 1 ? '' : 's'} left`;
}

function onDestroy (element) {
    todoList.removeChild(element);
    if(!element.classList.contains('completed')){
        updateCount(-1);
    }
}

function onChange(element, checkbox){
    if(checkbox.checked){
        element.classList.add('completed');
        updateCount(-1);
    } else{
        element.classList.remove('completed');
        updateCount(+1);
    }
}

const map = {
    '#/active': {
        'true':'none',
        'false':'block',
    }, 
    '#/completed': {
        'true': 'block',
        'false': 'none',
    },
    '#/': {
        'true': 'block',
        'false': 'block',
    },
}

function filterList(hash){
    for(let i=0; i<todoList.children.length; i+=1){
        const isCompleted = todoList.children[i].classList.contains('completed');
        todoList.children[i].style.display = map[hash][isCompleted];
    }
}

function onRoutingChange(){
    for(let i=0; i<todoList.children.length; i+=1){
        const link = filters.children[i].children[0];
        if(link.hash === location.hash){
            link.classList.add('selected');
        } else {
            link.classList.remove('selected');
        }
    } filterList(location.hash);
}

function createItem(value){
    const element = itemTemplate.cloneNode(true);        
    const button = element.getElementsByClassName('destroy')[0];
    const checkbox = element.getElementsByClassName('toggle')[0];

    element.children[0].children[1].innerText = value;
    element.className = '';
    button.addEventListener('click', onDestroy.bind(null, element));
    checkbox.addEventListener('click', onChange.bind(null, element, checkbox));
    
    todoList.append(element);
}

function onSubmite(e) {
    const value = input.value;
    if(e.keyCode === 13 && value.trim().length){
        main.style.display = 'block';
        input.value = '';
        createItem(value);  
        updateCount(+1);
    }
}

function onClear(){
    for(let i=0; i<todoList.children.length; i+=1){
        if(todoList.children[i].classList.contains('completed')){
            todoList.removeChild(todoList.children[i])
        }
    }
}


