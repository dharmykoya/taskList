const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const card = document.querySelector('.card');
const heading = document.querySelector('h5');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');



// Load all event listeners
const loadEventListeners = () => {
  // DOM Load event 
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event 
  form.addEventListener('submit', addTask);

  // remove task event
  taskList.addEventListener('click', removeTask);

  // clear task event
  clearBtn.addEventListener('click', clearTask);

  // FIlter tasks event
  filter.addEventListener('keyup', filterTasks)
}
// Get task from local storage

const getTasks = () => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create Text node
    liNode = document.createTextNode(task);

    // append Node to li
    li.appendChild(liNode);

    // Create new Link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content'
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li 
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  })
}

// Add Task

const addTask = (e) => {
  if (taskInput.value === '') {
    alert('Add a Task');
  }

  // Create li element
  const li = document.createElement('li');

  // Add class
  li.className = 'collection-item';

  // Create Text node
  liNode = document.createTextNode(taskInput.value);

  // append Node to li
  li.appendChild(liNode);

  // Create new Link element
  const link = document.createElement('a');

  // Add class
  link.className = 'delete-item secondary-content'
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append link to li 
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  // Store in Local storage
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';
  e.preventDefault();
}

// store Task
const storeTaskInLocalStorage = (task) => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
const removeTask = (e) => {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      
      // remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from local storage
const removeTaskFromLocalStorage = (taskItem) => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
}


// Clear task
const clearTask = () => {
  // taskList.innerHTML = ' ';

  // Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage
const clearTasksFromLocalStorage = () => {
  localStorage.clear();
}

// Filter Task 
const filterTasks = (e) => {
  const text = e.target.value.toLowerCase();

  const tasks = document.querySelectorAll('.collection-item');
  tasks.forEach(task => {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}

// Load all event listeners
loadEventListeners();