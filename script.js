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
    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
    }).then((result) => {
        if (result.isConfirmed) {
            let tasks = getTasks();
            tasks = tasks.filter(task => task.id !== id);
            saveTasks(tasks);
            renderTasks();
            Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
            );
        }
    });
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
    
    // Sort tasks: uncompleted tasks first, then completed tasks
    tasks.sort((a, b) => a.completed - b.completed);
    
    tasks.forEach(task => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
            </td>
            <td style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
                ${task.description}
            </td>
            <td>
                <button class="btn btn-info btn-sm edit" onclick="editTask(${task.id})">Edit</button>
                <button class="btn btn-danger btn-sm delete" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskList.appendChild(tr);
    });
}
