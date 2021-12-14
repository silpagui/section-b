const input = document.querySelector(".new-task__input");
const form = document.querySelector(".new-task");
const taskList = document.querySelector(".task-list");
const removeAllButton = document.querySelector(".remove-all-tasks");

const confirmation = document.querySelector(".confirmation");
const confirmationMessage = document.querySelector(".confirmation__message");
const confirmationYes = document.querySelector(".confirmation__yes");
const confirmationNo = document.querySelector(".confirmation__no");

const icons = {
	check: `<svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M24.682 0.334293C24.476 0.1203 24.1964 0 23.9051 0C23.6139 0 23.3343 0.1203 23.1284 0.334293L9.77487 14.2941L2.14205 6.36906C1.86469 6.08071 1.46014 5.96814 1.08119 6.07366C0.702038 6.17917 0.405838 6.48664 0.304291 6.88048C0.202744 7.27433 0.311077 7.69436 0.588656 7.98276L8.99933 16.7165C9.2062 16.9271 9.48465 17.0442 9.77449 17.0426C10.0652 17.0451 10.345 16.928 10.5527 16.7165L24.6751 1.948C24.882 1.73491 24.9989 1.44519 25 1.14251C25.0011 0.83982 24.8866 0.548986 24.6815 0.334282L24.682 0.334293Z" fill="white"/>
		</svg>`,
	cross: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M13.2929 1.41L8.05645 6.64645L7.70289 7L8.05645 7.35355L13.2929 12.59L12.59 13.2929L7.35355 8.05645L7 7.70289L6.64645 8.05645L1.41 13.2929L0.707107 12.59L5.94355 7.35355L6.29711 7L5.94355 6.64645L0.707107 1.41L1.41 0.707107L6.64645 5.94355L7 6.29711L7.35355 5.94355L12.59 0.707107L13.2929 1.41Z" fill="currentColor" stroke="currentColor" />
		</svg>`,
};

let taskToBeDeleted;

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const taskValue = input.value;
	if (taskValue) {
		createTask(taskValue);
	}
	input.value = "";
});

removeAllButton.addEventListener("click", () => {
	showConfirmationMessage();
});

function createTask(value) {
	const taskItem = document.createElement("li");
	taskItem.classList.add("task-item");

	const taskId = +new Date();

	const taskLabel = document.createElement("label");
	taskLabel.setAttribute("for", taskId);
	taskLabel.classList.add("task-label");

	const taskText = document.createElement("span");
	taskText.classList.add("task-title");
	taskText.innerHTML = value;

	const inputCheckbox = document.createElement("input");
	inputCheckbox.setAttribute("type", "checkbox");
	inputCheckbox.setAttribute("name", taskId);
	inputCheckbox.setAttribute("id", taskId);

	const inputChecked = document.createElement("span");
	inputChecked.innerHTML = icons.check;
	inputChecked.classList.add("input-custom-checked");

	const deleteTask = document.createElement("button");
	deleteTask.innerHTML = icons.cross;
	deleteTask.classList.add("delete-task");

	inputCheckbox.addEventListener("change", (event) => {
		if (inputCheckbox.checked) {
			taskItem.classList.add("task-item--checked");
		} else {
			taskItem.classList.remove("task-item--checked");
		}
	});

	deleteTask.addEventListener("click", () => {
		taskToBeDeleted = taskItem;
		showConfirmationMessage();
	});

	taskLabel.append(inputCheckbox, inputChecked, taskText);
	taskItem.append(taskLabel, deleteTask);
	taskList.append(taskItem);

	showRemoveAllTaskButton();
}

function showConfirmationMessage() {
	confirmationMessage.innerText = taskToBeDeleted
		? "Are you sure to delete the task?"
		: "Are you sure to delete all the tasks?";
	confirmation.classList.add("confirmation--show-message");
}

function hideConfirmationMessage() {
	confirmation.classList.remove("confirmation--show-message");
}

function hideRemoveAllTaskButton() {
	removeAllButton.classList.remove("remove-all-tasks--show");
}

function showRemoveAllTaskButton() {
	removeAllButton.classList.add("remove-all-tasks--show");
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

	if (taskList.querySelectorAll("li").length === 0) {
		hideRemoveAllTaskButton();
	}

	hideConfirmationMessage();
});
