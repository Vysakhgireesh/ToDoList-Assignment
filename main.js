function validateId(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "admin" && password === "12345") {
    window.location.href = "todolist.html";
  } else {
    alert(
      "Username or password is invalid. Please Enter valid Username and Password"
    );
  }
}

function logout() {
  window.location.href = "index.html";
}

let completedTaskCount = 0;
let completedTaskPromise;

function TodoList() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => displayTodos(data))
    .catch((error) => console.error("Error fetching todos:", error));
}

function displayTodos(data) {
  const tableBody = document.getElementById("listTable");
  tableBody.innerHTML = "";

  completedTasks = 0;
  completedTaskPromise = checkFiveTasksCompleted();

  data.map((todo, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
                   
                    <td>${todo.id}</td>
                    <td>${todo.title}</td>
                    <td>
                        <input type="checkbox" class="form-check-input" ${
                          todo.completed ? "checked disabled" : ""
                        }
                          onchange="taskChecked(this, ${todo.completed})">
                    </td>
                `;

    tableBody.appendChild(row);
  });
}

function taskChecked(checkbox, isCompleted) {
  if (!isCompleted && checkbox.checked) {
    completedTasks++;
  } else if (!isCompleted && !checkbox.checked) {
    completedTasks--;
  }

  if (completedTasks === 5) {
    completedTaskPromise.then(() => {
      alert("Congrats, you have completed 5 tasks!");
    });
  }
}

function checkFiveTasksCompleted() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (completedTasks === 5) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}

function logout() {
  window.location.href = "index.html";
}
