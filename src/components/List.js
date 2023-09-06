import {useState} from "react";

function Task(props) {
	console.log(props);
	function onChange() {
		// Find the task we want to update and update it
		props.setTasks(tasks => tasks.map(task => {
			if (task.id === props.id) {
				return {
					id: task.id,
					description: task.description,
					completed: !task.completed
				};
			} else {
				return task;
			}
		}));
	}

	function onClick() {
		// Find the task we want to delete and delete it
		props.setTasks(tasks => tasks.filter(task => task.id !== props.id));
	}

	return (
		<li>
			<button onClick = {onClick}>X</button>
			{" " + props.description}
			<input
				type = "checkbox"
				checked = {props.completed}
				onChange = {onChange}
			/>
		</li>
	);
}

function List(props) {
	const [newTask, setNewTask] = useState("");
	function onChange(event) {
		setNewTask(event.target.value);
	}

	function onClick() {
		// Add a new task to the list
		props.setTasks(tasks => [...tasks, {
			id: tasks.length + 1,
			description: newTask,
			completed: false
			}
		]);
	}

	return (
		<div>
			<h1>{props.heading}</h1>
			<b>Add Task </b>
			<input 
				type = "text" 
				placeholder = "Add a new task"
				onChange={onChange}
			/>
			<button onClick = {onClick}>Add</button>
			<ul>
				{props.tasks.map(task => 
					<Task 
						setTasks = {props.setTasks}
						id = {task.id}
						description = {task.description}
						completed = {task.completed}
					/>
				)}
			</ul>
		</div>
	);
}

export default List;
