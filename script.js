document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

function addTask() {
    const description = document.getElementById('task-description').value;
    
    if (description === '') {
        alert('Please enter a task description.');
        return;
    }

    const task = {
        id: Date.now(),
        description: description,
        completed: false
    };

    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    renderTasks();
    
    document.getElementById('task-description').value = '';
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
}

function editTask(id) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === id);
    
    const newDescription = prompt('Edit task description:', task.description);
    
    if (newDescription !== null) {
        task.description = newDescription;
        
        saveTasks(tasks);
        renderTasks();
    }
}

function toggleComplete(id) {
    let tasks = getTasks();
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    const tasks = getTasks();
    
    tasks.forEach(task => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
                ${task.description}
            </td>
            <td>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                <button class="complete" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
            </td>
        `;
        taskList.appendChild(tr);
    });
}
