const input = document.querySelector(".new-task__input");

const button = document.querySelector(".new-task__button");

const taskList = document.querySelector(".task-list");

const removeAllButton = document.querySelector(".remove-all-tasks");

const confirmation = document.querySelector(".confirmation");
const confirmationMessage = document.querySelector(".confirmation__message");
const confirmationYes = document.querySelector(".confirmation__yes");
const confirmationNo = document.querySelector(".confirmation__no");

let taskToBeDeleted;

button.addEventListener("click", () => {
	const taskValue = input.value;
	createTask(taskValue);
	input.value = "";
});

removeAllButton.addEventListener("click", () => {
	showConfirmationMessage();
});

function createTask(value) {
	if (value.length > 0) {
		const taskItem = document.createElement("li");
		taskItem.classList.add("task-item");

		const taskId = +new Date();

		const taskLabel = document.createElement("label");
		taskLabel.innerHTML = value;
		taskLabel.setAttribute("for", taskId);
		taskLabel.classList.add("task-label");

		const inputCheckbox = document.createElement("input");
		inputCheckbox.setAttribute("type", "checkbox");
		inputCheckbox.setAttribute("name", taskId);
		inputCheckbox.setAttribute("id", taskId);

		const deleteTask = document.createElement("button");
		deleteTask.innerHTML = "Delete";
		deleteTask.classList.add("delete-task");

		taskItem.append(inputCheckbox, taskLabel, deleteTask);

		taskList.append(taskItem);

		deleteTask.addEventListener("click", () => {
			taskToBeDeleted = taskItem;
			showConfirmationMessage();
		});
	}
}

function showConfirmationMessage() {
	confirmationMessage.innerHTML = taskToBeDeleted
		? "Are you sure to delete the task?"
		: "Are you sure to delete all the tasks?";
	confirmation.setAttribute("style", "display:block");
}

function hideConfirmationMessage() {
	confirmation.setAttribute("style", "display:none");
}

confirmationNo.addEventListener("click", () => {
	hideConfirmationMessage();
	taskToBeDeleted = null;
});

confirmationYes.addEventListener("click", () => {
	if (taskToBeDeleted) {
		taskToBeDeleted.remove();
		taskToBeDeleted = null;
	} else {
		taskList.innerHTML = "";
	}
	hideConfirmationMessage();
});
