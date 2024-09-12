document.addEventListener("DOMContentLoaded", function() {
  let tasks = [];

  const taskInput = document.getElementById("task-input");
  const taskDate = document.getElementById("task-date");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const clearCompletedBtn = document.getElementById("clear-completed-btn");
  const filterAllBtn = document.getElementById("filter-all");
  const filterActiveBtn = document.getElementById("filter-active");
  const filterCompletedBtn = document.getElementById("filter-completed");

  function renderTasks(filter = 'all') {
      taskList.innerHTML = '';
      tasks.filter(task => {
          if (filter === 'active') return !task.completed;
          if (filter === 'completed') return task.completed;
          return true;
      }).forEach(task => {
          const taskItem = document.createElement("div");
          taskItem.className = "task-item";
          taskItem.innerHTML = `
              <input type="checkbox" ${task.completed ? 'checked' : ''}>
              <span>${task.description} (${task.date})</span>
              <button class="delete-btn">Delete</button>
          `;
          taskList.appendChild(taskItem);

          const checkbox = taskItem.querySelector("input[type='checkbox']");
          checkbox.addEventListener('change', function() {
              task.completed = this.checked;
              renderTasks();
          });

          const deleteBtn = taskItem.querySelector(".delete-btn");
          deleteBtn.addEventListener('click', function() {
              tasks = tasks.filter(t => t !== task);
              renderTasks();
          });
      });
  }

  addTaskBtn.addEventListener("click", function() {
      if (taskInput.value && taskDate.value) {
          tasks.push({ description: taskInput.value, date: taskDate.value, completed: false });
          taskInput.value = '';
          taskDate.value = '';
          renderTasks();
      }
  });

  clearCompletedBtn.addEventListener("click", function() {
      tasks = tasks.filter(task => !task.completed);
      renderTasks();
  });

  filterAllBtn.addEventListener("click", function() { renderTasks('all'); });
  filterActiveBtn.addEventListener("click", function() { renderTasks('active'); });
  filterCompletedBtn.addEventListener("click", function() { renderTasks('completed'); });

  renderTasks();
});
