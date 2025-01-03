const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskValue = inputBox.value.trim();

    if (taskValue === "") {
        alert("Nothing is in there, bro!");
        return;
    }

    if (taskExists(taskValue)) {
        alert("This task already exists.");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = taskValue;

    let span = document.createElement("span");
    span.innerHTML = '<i class="fas fa-trash"></i>';  // Font Awesome trash bin icon
    span.classList.add("delete-icon");

    li.appendChild(span); //ading icon to the list
    listContainer.appendChild(li); //adding task to the list
    inputBox.value = ""; //clearing out the input box

    saveData();
}

function taskExists(taskValue) {
    let taskExists = false;
    const tasks = document.getElementsByTagName("li");

    for (let task of tasks) {
        if (task.firstChild.textContent.trim() === taskValue) {
            taskExists = true;
        }
    }

    return taskExists;
}

listContainer.addEventListener("click", function(e) {
    
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        saveData();
    }
    
    
    else if (e.target.parentElement.tagName === "SPAN") {
        const li = e.target.closest('li'); 
        if (li) {
            li.remove();  

            saveData();
        }
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
