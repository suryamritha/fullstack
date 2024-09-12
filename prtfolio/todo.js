// todo.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    const filterAllBtn = document.getElementById('filter-all');
    const filterActiveBtn = document.getElementById('filter-active');
    const filterCompletedBtn = document.getElementById('filter-completed');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        const filteredTasks = tasks
            .filter(task => filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed))
            .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort tasks by due date

        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            if (task.completed) taskItem.classList.add('completed');

            taskItem.innerHTML = `
                <span>${task.description} - ${task.date}</span>
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            `;

            taskItem.querySelector('.complete-btn').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks(filter);
                checkAllTasksCompleted(); // Check if all tasks are completed
            });

            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                const index = tasks.indexOf(task);
                tasks.splice(index, 1);
                saveTasks();
                renderTasks(filter);
                checkAllTasksCompleted(); // Check if all tasks are completed
            });

            taskList.appendChild(taskItem);
        });

        checkAllTasksCompleted(); // Check if all tasks are completed after rendering
    }

    function checkAllTasksCompleted() {
        const allCompleted = tasks.length > 0 && tasks.every(task => task.completed);
        if (allCompleted) {
            document.body.style.backgroundImage = "url('todo.png')";
            alert('Congratulations! All tasks are completed!');
        } else {
            document.body.style.backgroundImage = "";
        }
    }

    addTaskBtn.addEventListener('click', () => {
        const description = taskInput.value.trim();
        const date = taskDate.value;

        if (description && date) {
            tasks.push({ description, date, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
            taskDate.value = '';
        }
    });

    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    });

    filterAllBtn.addEventListener('click', () => {
        setActiveFilter(filterAllBtn);
        renderTasks('all');
    });

    filterActiveBtn.addEventListener('click', () => {
        setActiveFilter(filterActiveBtn);
        renderTasks('active');
    });

    filterCompletedBtn.addEventListener('click', () => {
        setActiveFilter(filterCompletedBtn);
        renderTasks('completed');
    });

    function setActiveFilter(button) {
        filterAllBtn.classList.remove('active');
        filterActiveBtn.classList.remove('active');
        filterCompletedBtn.classList.remove('active');
        button.classList.add('active');
    }

    renderTasks(); // Initial rendering of tasks
});
