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

    task.forEach((item, index) => {
        // Create a div for the task item
        const taskItem = document.createElement("div");
        taskItem.className = 
        "text-bg-light d-flex justify-content-between align-items-center mt-3 border border-info p-2 rounded";
        

        // Create a span to hold the task text
        const taskText = document.createElement("div");
        taskText.className="form-check";
        
        const buildInput =document.createElement("input");
        buildInput.className="text-bg-white border border-primary form-check-input" ;
        buildInput.type="checkbox";

        const buildLabel = document.createElement("label");
        buildLabel.className="form-check-label";
        buildLabel.textContent = item;
       

        // Create a div for action buttons
        const action = document.createElement("div");

        // Create an edit button
        const editButton = document.createElement("button");
        editButton.className = "btn btn-outline-success btn-sm rounded-pill px-3 shadow-sm me-2";
        editButton.textContent = "Edit";
        editButton.onclick = () => handleEdit(index);

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-outline-danger btn-sm rounded-pill px-3 shadow-sm me-2";
        deleteButton.textContent = "Delete";
        deleteButton. onclick = () => handleDelete(index);

        // Append buttons to the action div
        action.appendChild(editButton);
        action.appendChild(deleteButton);

        // Append text ,checkbox to the action div
        taskText.appendChild(buildInput);
        taskText.appendChild(buildLabel );



        // Append task text and actions to the task item
        taskItem.appendChild(taskText);
        taskItem.appendChild(action);

        // Add the task item to the task list
        tasklistType.appendChild(taskItem);

        // Add event listener to checkbox
            buildInput.addEventListener("change", function () {
                if (buildInput.checked) {
                    buildLabel.style.textDecoration = "line-through"; // Cross out the text
                    showSnackbar("Task completed successfully!");
                } else {
                    buildLabel.style.textDecoration = "none"; // Remove the line-through
                }
            });

            // Append the container to your desired parent element (e.g., a list)
            document.getElementById("taskList").appendChild(taskText);


       

    });



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