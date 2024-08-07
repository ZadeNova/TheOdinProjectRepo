import styles from "./styles/styles.css";
import * as boostrap from "bootstrap";
import ToDoObject, * as ToDo from "./ToDo.js";
import * as AppStorage from "./localStorage.js";
import projects, * as Projects from "./Projects.js";
import cardTemplate, * as HTMLTemplates from "./HTMLTemplates.js";
// Task is under project.

// What to Do

// Add create , update , delete for projects :(
// After that project should be done!

// Create default data for the App

localStorage.clear();

const defaultPrj = new projects("Main");

const prj1 = new projects("Life Improvement");

const prj2 = new projects("Finances");

let prjArray = [defaultPrj, prj1, prj2];
let prjArrayJSON = JSON.stringify(prjArray);

localStorage.setItem("Projects", prjArrayJSON);

// Initialize Data for Todo
const todo1 = new ToDoObject(
	"Finish Coding Course",
	"Try your best to complete the Odin Project Javascript Course",
	"2024-12-30",
	"High",
	ToDo.generateUUID(),
	"",
	"Life Improvement"
);

const todo2 = new ToDoObject(
	"Do 15 pull ups by August 30th 2024",
	"Train in the gym to do pull ups",
	"2024-08-30",
	"Medium",
	ToDo.generateUUID(),
	"",
	"Life Improvement"
);

const todo3 = new ToDoObject(
	"Save $1000 by 30th September 2024",
	"Save 1k before 30th september",
	"2024-09-30",
	"Medium",
	ToDo.generateUUID(),
	"",
	"Finances"
);

let todoArray = [todo1, todo2, todo3];
let todoArrayJSON = JSON.stringify(todoArray);
localStorage.setItem("ToDoTasks", todoArrayJSON);

// Code to initialize the hard-coded projects and todo tasks.
// Add eventlistener to display all the task under each project , when you click on a project.
const prjElement = document.getElementById("Projects");

// This is the for loop that generates the project cards;
for (let i = 0; i < JSON.parse(localStorage.getItem("Projects")).length; i++) {
	const newCard = document.createElement("div");
	//newCard.addEventListener("click", displayTaskUnderProjects);
	newCard.innerHTML = HTMLTemplates.cardTemplate(
		JSON.parse(localStorage.getItem("Projects"))[i].projectName,
		ToDo.countByProject(
			JSON.parse(localStorage.getItem("Projects"))[i].projectName
		)
	);

	prjElement.append(newCard);
}

// function for the for loop that generates project cards

export function generateProjectCards() {
	const projectElement = document.getElementById("Projects");
	projectElement.innerHTML = "";
	for (
		let i = 0;
		i < JSON.parse(localStorage.getItem("Projects")).length;
		i++
	) {
		const newCard = document.createElement("div");
		//newCard.addEventListener("click", displayTaskUnderProjects);
		newCard.innerHTML = HTMLTemplates.cardTemplate(
			JSON.parse(localStorage.getItem("Projects"))[i].projectName,
			ToDo.countByProject(
				JSON.parse(localStorage.getItem("Projects"))[i].projectName
			)
		);

		projectElement.append(newCard);
	}
}

const tasksElement = document.getElementById("ToDoTasks");

for (
	let i = 0;
	i < JSON.parse(localStorage.getItem("ToDoTasks")).length;
	i++
) {}

// Add Event Listeners

// Create Project div event listener. Use for loop to ensure that all projects have event listeners added.
const prjCard = document.getElementsByClassName("myCard");
for (let i = 0; i < prjCard.length; i++) {
	prjCard[i].addEventListener("click", displayTaskUnderProjects);
}

// Create Project card buttons event listeners.

const prjCardBtnsEdit = document.getElementsByClassName("prjBtnsEdit");
const prjCardBtnsDelete = document.getElementsByClassName("prjBtnsDelete");

for (let i = 0; i < prjCardBtnsEdit.length; i++) {
	prjCardBtnsEdit[i].addEventListener("click", handleEditAndDeleteBtns);
}

for (let i = 0; i < prjCardBtnsDelete.length; i++) {
	prjCardBtnsDelete[i].addEventListener("click", handleEditAndDeleteBtns);
}

// Modal event listeners
const addTaskModal = document.getElementById("addTaskModal");
addTaskModal.addEventListener("click", HTMLTemplates.generateSelectProjects);

const createToDoObjectBtn = document.getElementById("btn_CreateToDo");
createToDoObjectBtn.addEventListener("click", handleToDoObjBtn);

const resetAppBtn = document.getElementById("resetApp");
resetAppBtn.addEventListener("click", resetAppToDefault);

const createProjectBtn = document.getElementById("btn_addProject");
createProjectBtn.addEventListener("click", addProjectBtn);

// Add Event Listener to task. Update and Delete.

// Function to handle add project:

function addProjectBtn() {
	console.log("hi");
	const data = Projects.createProject();
	AppStorage.saveProject_tostorage(data);
	// Update HTML side
	prjElement.innerHTML = "";
	// This is the for loop that generates the project cards;
	for (
		let i = 0;
		i < JSON.parse(localStorage.getItem("Projects")).length;
		i++
	) {
		const newCard = document.createElement("div");
		//newCard.addEventListener("click", displayTaskUnderProjects);
		newCard.innerHTML = HTMLTemplates.cardTemplate(
			JSON.parse(localStorage.getItem("Projects"))[i].projectName,
			ToDo.countByProject(
				JSON.parse(localStorage.getItem("Projects"))[i].projectName
			)
		);

		prjElement.append(newCard);
	}

	// Create Project div event listener. Use for loop to ensure that all projects have event listeners added.
	const prjCard = document.getElementsByClassName("myCard");
	for (let i = 0; i < prjCard.length; i++) {
		prjCard[i].addEventListener("click", displayTaskUnderProjects);
	}
}

export function handleEditAndDeleteBtns(event) {
	// Stops the onclick event for the <div> element. Stop the onclick event from bubbling up to the parent div.
	event.stopPropagation();

	//console.log(event.target.className);

	if (event.target.className === "prjBtnsEdit") {
		// Code to edit the project
		Projects.updateProject(event.target.dataset.project);

		// generateProjectCards();

		// HTMLTemplates.updateProjectCount(
		// 	ToDo.countByProject(newProjectName),
		// 	newProjectName
		// );


		// for (let i = 0; i < prjCard.length; i++) {
		// 	//console.log('display task under projects')
		// 	prjCard[i].addEventListener("click", displayTaskUnderProjects);
		// }

		// for (let i = 0; i < prjCardBtnsEdit.length; i++) {
		// 	prjCardBtnsEdit[i].addEventListener("click", handleEditAndDeleteBtns);
		// }

		// for (let i = 0; i < prjCardBtnsDelete.length; i++) {
		// 	prjCardBtnsDelete[i].addEventListener("click", handleEditAndDeleteBtns);
		// }

		// update the project count
		//HTMLTemplates.updateProjectCount()
	} else {
		// Code the Delete function
		Projects.deleteProject(event.target.dataset.project);

		generateProjectCards();

		for (let i = 0; i < prjCard.length; i++) {
			prjCard[i].addEventListener("click", displayTaskUnderProjects);
		}		

		for (let i = 0; i < prjCardBtnsEdit.length; i++) {
			prjCardBtnsEdit[i].addEventListener("click", handleEditAndDeleteBtns);
		}

		for (let i = 0; i < prjCardBtnsDelete.length; i++) {
			prjCardBtnsDelete[i].addEventListener("click", handleEditAndDeleteBtns);
		}
	}
}

function handleToDoObjBtn() {
	const data = ToDo.createToDoObject();
	//console.log("hello");
	console.log(data);

	// Once you create the task , save the task into storage array

	// Saving newly object into storage array.
	AppStorage.saveTasks_tostorage(data.ToDoObject1);

	HTMLTemplates.updateProjectCount(
		ToDo.countByProject(data.toDoProject),
		data.toDoProject
	);
	//document.getElementById(`${data.prjName}count`).innerText = toString(data.prjCount);
}

export function handleToDoDeleteBtn(event) {
	//console.log(event.target.dataset.taskid);
	ToDo.deleteToDoObject(event.target.dataset.taskid);
}

export function handleToDoUpdateBtn(event) {
	//console.log(event.target.dataset.taskid);
	ToDo.UpdateToDoObject(event.target.dataset.taskid);

	// Update the HTML
}

function resetAppToDefault() {
	console.log("App reset!");
	localStorage.clear();
	AppStorage.createStorage_forApp();

	// Initialize Data for Project
	const prj1 = new projects("Life Improvement");

	const prj2 = new projects("Finances");

	const prj3 = new projects("Main")

	let prjArray = [prj3, prj1, prj2];
	let prjArrayJSON = JSON.stringify(prjArray);

	localStorage.setItem("Projects", prjArrayJSON);

	// Initialize Data for Todo
	const todo1 = new ToDoObject(
		"Finish Coding Course",
		"Try your best to complete the Odin Project Javascript Course",
		new Date("2024-12-30"),
		"High",
		ToDo.generateUUID(),
		"",
		"Life Improvement"
	);

	const todo2 = new ToDoObject(
		"Do 15 pull ups by August 30th 2024",
		"Train in the gym to do pull ups",
		new Date("2024-08-30"),
		"Medium",
		ToDo.generateUUID(),
		"",
		"Life Improvement"
	);

	const todo3 = new ToDoObject(
		"Save $1000 by 30th September 2024",
		"Save 1k before 30th september",
		new Date("2024-09-30"),
		"Medium",
		ToDo.generateUUID(),
		"",
		"Finances"
	);

	let todoArray = [todo1, todo2, todo3];
	let todoArrayJSON = JSON.stringify(todoArray);
	localStorage.setItem("ToDoTasks", todoArrayJSON);


	generateProjectCards();
	for (let i = 0; i < prjCard.length; i++) {
		prjCard[i].addEventListener("click", displayTaskUnderProjects);
	}		

	for (let i = 0; i < prjCardBtnsEdit.length; i++) {
		prjCardBtnsEdit[i].addEventListener("click", handleEditAndDeleteBtns);
	}

	for (let i = 0; i < prjCardBtnsDelete.length; i++) {
		prjCardBtnsDelete[i].addEventListener("click", handleEditAndDeleteBtns);
	}

}

export function displayTaskUnderProjects(event) {
	//console.log('Hello the event listener is working')

	tasksElement.innerHTML = "";
	const prjName = event.currentTarget.id;
	let todoArray = JSON.parse(localStorage.getItem("ToDoTasks")).filter(
		(task) => task.project === prjName
	);
	todoArray.forEach((element) => {
		const newTaskCard = document.createElement("div");
		newTaskCard.innerHTML = HTMLTemplates.TaskcardTemplate(element);
		tasksElement.append(newTaskCard);
	});

	// Add Update and Delete Event Listeners here:

	const deleteTaskBtn = document.getElementsByClassName("deleteBtn");
	for (let i = 0; i < deleteTaskBtn.length; i++) {
		deleteTaskBtn[i].addEventListener("click", handleToDoDeleteBtn);
	}

	const updateTaskBtn = document.getElementsByClassName("updateBtn");
	for (let i = 0; i < updateTaskBtn.length; i++) {
		updateTaskBtn[i].addEventListener("click", handleToDoUpdateBtn);
	}
}

// functions related to project is here.
