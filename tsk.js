//fetching elements
const inputType = document.getElementById("input");
const submitBtnType = document.getElementById("submitBtn");
const tasklistType = document.getElementById("tasklist");

// Initialize an array to store tasks

let task = []
let editTask = null;

//function to render task
function renderTask() {
    tasklistType.innerHTML = ""; // Clear the task list

   // Iterate through each task
task.forEach((item, index) => {
    // Create a container div for the task item
    const taskItem = document.createElement("div");
    taskItem.className =
        "text-bg-light d-flex justify-content-between align-items-center mt-3 border border-info p-2 rounded";

    // Create a container for the checkbox and task text
    const taskTextContainer = document.createElement("div");
    taskTextContainer.className = "form-check";

    // Create a checkbox
    const checkbox = document.createElement("input");
    checkbox.className = "form-check-input text-bg-white border border-primary";
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => toggleCompletion(index));

    // Create a label for the task text
    const taskLabel = document.createElement("label");
    taskLabel.className = "form-check-label";
    taskLabel.textContent = item;

    // Append checkbox and label to the task text container
    taskTextContainer.appendChild(checkbox);
    taskTextContainer.appendChild(taskLabel);

    // Create a container for action buttons
    const actionContainer = document.createElement("div");

    // Create the Edit button
    const editButton = document.createElement("button");
    editButton.className = "btn btn-outline-success btn-sm rounded-pill px-3 shadow-sm me-2";
    editButton.textContent = "Edit";
    editButton.onclick = () => handleEdit(index);

    // Create the Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-outline-danger btn-sm rounded-pill px-3 shadow-sm me-2";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => handleDelete(index);

    // Append buttons to the action container
    actionContainer.appendChild(editButton);
    actionContainer.appendChild(deleteButton);

    // Append the task text container and action container to the task item container
    taskItem.appendChild(taskTextContainer);
    taskItem.appendChild(actionContainer);

    // Add the task item container to the task list
    tasklistType.appendChild(taskItem);
});




}

// Toggle completion state of a task
function toggleCompletion(index) {
    const taskText = tasklistType.children[index].querySelector(".form-check-label");

    if (tasklistType.children[index].querySelector("input").checked) {
        taskText.style.textDecoration = "line-through"; // Cross out the task
        showSnackbar("Task Completed successfully!");  // Show snackbar
    } else {
        taskText.style.textDecoration = "none"; // Remove cross out
         // Show snackbar
    }
}



// to handle add task
function addtask(){
    // at first capturing the input value
    const EnterTaskValue = inputType.value.trim()

    if(!EnterTaskValue)
    {
        alert("please Enter Task");
        return;
    }
    //updating task

    if(editTask!=null){
        //aSIGNING updated task to that index 
        task[editTask]=EnterTaskValue;
        editTask= null;
        submitBtnType.textContent= " Add Task";
    }
    else{
        task.push(EnterTaskValue);
    }

    inputType.value=" ";
    renderTask();

}

//Function to handle editing a task
function handleEdit(index){
    inputType.value=task[index];
    editTask=index;
    submitBtnType.textContent="Update Task";

}
// Function to handle deleting a task
function handleDelete(index) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        // Remove the task at the given index
       task.splice(index, 1);
        renderTask(); // Re-render the task list
        showSnackbar("Task deleted successfully!");
    }
}

function showSnackbar(message) {
    const snackbar = document.createElement("div");
    snackbar.textContent = message;
    snackbar.className = "snackbar show"; // Add classes for styling and animation
    document.body.appendChild(snackbar);

    // Remove snackbar after 3 seconds
    setTimeout(() => {
        snackbar.remove();
    }, 3000);
}





// addEventListener for adding/updating tasks
submitBtnType.addEventListener("click",addtask);