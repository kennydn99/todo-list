// UIController Module

import RenderHomePage from "./home";
import ProjectImage from './assets/project.png';
import EditTaskIcon from './assets/editTask.png';
import DeleteTaskIcon from './assets/deleteTask.png';
import CheckmarkIcon from './assets/checkmark.png';
import listModule from './todolist';
import itemModule from './todoitem';
import {format} from "date-fns";


const UIController = (() => {
    // Initialize the UI
    const init = () => {
        // Render the home page content
        RenderHomePage();
        // Set up the side panel toggle functionality
        ToggleSidePanel();
        // Set up other necessary event listeners
        setupEventListeners();
    };

    // Function to toggle the visibility of the side panel
    const ToggleSidePanel = () => {
        const sidePanel = document.querySelector('.side-panel');
        const menuButton = document.querySelector('.toggle-menu');
        menuButton.addEventListener('click', () => {
            sidePanel.classList.toggle('hidden');
        });
    };

    // Set up event listeners for various UI elements
    const setupEventListeners = () => {
        const addProjectButton = document.querySelector('.add-project-btn');
        addProjectButton.addEventListener('click', handleAddProjectClick);

        // Add Task to Project
        const addTaskButton = document.querySelector('.add-task-btn');
        addTaskButton.addEventListener('click', handleAddTaskClick);

        const allTasksDiv = document.querySelector('.all-tasks-div');
        allTasksDiv.addEventListener('click', handleAllTasksDivClick);
    };

    // Flag to track if the project form is open
    let isProjectFormOpen = false;

    // Flag to track if the project form is open
    let isTaskModalOpen = false;

    // Handle click event for the "Add Project" button
    const handleAddProjectClick = () => {
        if (!isProjectFormOpen) {
            createProjectForm();
        }
    };

    // Handle click event for the "Add Task" Button
    const handleAddTaskClick = () => {
        if(!isTaskModalOpen) {
            createTaskModal();
        }
    }

    // Create & display the task creation form
    const createTaskModal = (existingTask = null, taskDiv) => {
        const taskSection = document.querySelector('.task-section');

        // Create form element
        const taskModal = document.createElement('div');
        taskModal.classList.add('task-modal');

        // Create and add input for forms details
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        const taskTitleInput = document.createElement('input');
        taskTitleInput.required = true;
        taskTitleInput.id = 'task-title';
        taskTitleInput.placeholder = 'Enter Task Name...';
        if (existingTask) taskTitleInput.value = existingTask.title;
        const taskTitleLabel = document.createElement('label');
        taskTitleLabel.textContent = 'Title:';
        taskTitleLabel.htmlFor = taskTitleInput.id;

        // Description
        const taskDescriptionTextArea = document.createElement('textarea');
        taskDescriptionTextArea.placeholder = 'Enter Task Description Here...';
        if (existingTask) taskDescriptionTextArea.value = existingTask.description;
        const taskDescriptionLabel = document.createElement('label');
        taskDescriptionLabel.textContent = 'Description:';

        // select container
        const selectContainer = document.createElement('div');
        selectContainer.classList.add('date-priority-container');

        // Date
        const dateContainer = document.createElement('div');
        dateContainer.classList.add('date-container');
        const taskDate = document.createElement('input');
        taskDate.type = 'date';
        taskDate.id = 'task-date-input';
        if (existingTask && existingTask.dueDate) {
            // const formattedDate = format(parse(existingTask.dueDate))
            taskDate.value = format(existingTask.dueDate, 'yyy-MM-dd');
        } 
        const taskDateLabel = document.createElement('label');
        taskDateLabel.textContent = 'Date:';
        dateContainer.appendChild(taskDateLabel);
        dateContainer.appendChild(taskDate);

        // Priority
        const priorityContainer = document.createElement('div');
        priorityContainer.classList.add('priority-container');
        const taskPriorityLabel = document.createElement('label');
        taskPriorityLabel.textContent = 'Priority:';
        const taskPriority = document.createElement('select');
        taskPriority.id = 'task-priority-select';
        const priorities = ['Low', 'Medium', 'High'];
        priorities.forEach(priority => {
            const option = document.createElement('option');
            option.value = priority;
            option.text = priority;
            taskPriority.appendChild(option);
        });
        if (existingTask) taskPriority.value = existingTask.priority;
        priorityContainer.appendChild(taskPriorityLabel);
        priorityContainer.appendChild(taskPriority);

        selectContainer.appendChild(dateContainer);
        selectContainer.appendChild(priorityContainer);
        // Buttons
        const modalButtonContainer = document.createElement('div');
        modalButtonContainer.classList.add('modal-btn-container');
        const submitTaskButton = document.createElement('button');
        submitTaskButton.textContent = existingTask ? 'Update' : 'Add';
        submitTaskButton.type = 'submit';
        const cancelTaskButton = document.createElement('button');
        cancelTaskButton.textContent = 'Cancel';
        modalButtonContainer.appendChild(submitTaskButton);
        modalButtonContainer.appendChild(cancelTaskButton);

        modalContent.appendChild(taskTitleLabel);
        modalContent.appendChild(taskTitleInput);
        modalContent.appendChild(taskDescriptionLabel);
        modalContent.appendChild(taskDescriptionTextArea);
        modalContent.appendChild(selectContainer);
        modalContent.appendChild(modalButtonContainer);
        taskModal.appendChild(modalContent);
        taskSection.appendChild(taskModal);

        // event listener for submitting modal
        submitTaskButton.addEventListener('click', (e) => handleTaskFormSubmit(e, taskTitleInput, taskDescriptionTextArea, taskDate, taskPriority, existingTask, taskDiv));

        // event listener for canceling / closing modal
        cancelTaskButton.addEventListener('click', () => {
            closeTaskModal();
        });

        isTaskModalOpen = true;
    };

    // Create and display the project creation form
    const createProjectForm = () => {
        const projects = document.querySelector('.projects');

        // Create form element
        const projectForm = document.createElement('form');
        projectForm.classList.add('project-form');

        // Create and add project icon
        const projectIcon = document.createElement('img');
        projectIcon.src = ProjectImage;
        projectForm.appendChild(projectIcon);

        // Create and add input field for project name
        const inputField = document.createElement('div');
        const projectInput = document.createElement('input');
        projectInput.placeholder = 'Name';
        projectInput.required = true;
        inputField.appendChild(projectInput);

        // Create and add form buttons (Add and Cancel)
        const projectFormButtons = document.createElement('div');
        projectFormButtons.classList.add('project-form-buttons');
        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.textContent = "Add";
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = "Cancel";
        projectFormButtons.appendChild(addButton);
        projectFormButtons.appendChild(cancelButton);
        inputField.appendChild(projectFormButtons);

        projectForm.appendChild(inputField);
        projectForm.appendChild(projectFormButtons);

        projects.appendChild(projectForm);

        // Event listener for form submit to create a new project
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectName = projectInput.value;
            closeProjectForm();
            listModule.createTodoList(projectName);
            renderTodoLists(listModule.lists);
        });

        // Event listener for Cancel button to close the form
        cancelButton.addEventListener('click', () => {
            closeProjectForm();
        });

        isProjectFormOpen = true;
    };

    // Close and remove the project creation form
    const closeProjectForm = () => {
        const projectForm = document.querySelector('.project-form');
        if (projectForm) {
            projectForm.remove();
            isProjectFormOpen = false;
        }
    };

    // Lcose ane remove task modal
    const closeTaskModal = () => {
        const taskModal = document.querySelector('.task-modal');
        if (taskModal) {
            taskModal.remove();
            isTaskModalOpen = false;
        }
    }

    // Render the list of todo lists
    const renderTodoLists = (lists) => {
        lists.forEach((list) => {
            if (!list.rendered) {
                createProjectDiv(list);
                list.rendered = true;
            }
        });
    };

    // render the todoitems of a list
    const renderTodoItems = (list) => {
        list.taskList.forEach((task) => {
            if(!task.rendered) {
                console.log('task complete:', task.complete);
                createTaskDiv(task);
                task.rendered = true;
            }
        })
    };

    // create and append a new task div to li then to the task ul
    const createTaskDiv = (task) => {
        const taskUl = document.querySelector('.task-ul');
        const taskLi = document.createElement('li');
        const taskDiv = buildTaskDiv(task);
        taskLi.appendChild(taskDiv);
        taskUl.appendChild(taskLi);
        addTaskEventListeners(taskDiv, task);
    };

    // Build a task div element for a given task
    const buildTaskDiv = (task) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-div');
        taskDiv.dataset.taskId = task.id;

        // priority color, checkbox, div(title & descrip), dueDate, options
        const taskPriorityColor = document.createElement('div');
        taskPriorityColor.classList.add('task-priority-color');
        switch(task.priority) {
            case "Low": 
                taskPriorityColor.style.borderColor = '#28a745';
                taskDiv.style.borderColor = '#28a745';
                break;
            case "Medium": 
                taskPriorityColor.style.borderColor = '#fd7e14';
                taskDiv.style.borderColor = '#fd7e14';
                break;
            case "High": 
                taskPriorityColor.style.borderColor = '#dc3545';
                taskDiv.style.borderColor = '#dc3545';
                break;
        }

        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');

        const taskDetailsContainer = document.createElement('div');
        taskDetailsContainer.classList.add('task-details-div');
        const taskTitleDiv = document.createElement('div');
        taskTitleDiv.classList.add('task-title-div');
        taskTitleDiv.textContent = task.title;
        const taskDescriptionDiv = document.createElement('div');
        taskDescriptionDiv.classList.add('task-desc-div');
        taskDescriptionDiv.textContent = task.description;
        taskDetailsContainer.appendChild(taskTitleDiv);
        taskDetailsContainer.appendChild(taskDescriptionDiv);

        const taskDateDiv = document.createElement('div');
        taskDateDiv.classList.add('task-date-div');
        taskDateDiv.textContent = task.dueDate;
        if(task.dueDate === "") {
            taskDateDiv.style.border = 'none';
        }

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options-div');
        //icon opens edit & delete buttons
        const editTask = document.createElement('span');
        editTask.classList.add('edit-task');
        const editTaskImage = document.createElement('img');
        editTaskImage.src = EditTaskIcon;
        editTask.appendChild(editTaskImage);
        const deleteTask = document.createElement('span');
        deleteTask.classList.add('delete-task');
        const deleteTaskImage = document.createElement('img');
        deleteTaskImage.src = DeleteTaskIcon;
        deleteTask.appendChild(deleteTaskImage);
        optionsDiv.appendChild(editTask);
        optionsDiv.appendChild(deleteTask);

        // append elements
        taskDiv.appendChild(taskPriorityColor);
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskDetailsContainer);
        taskDiv.appendChild(taskDateDiv);
        taskDiv.appendChild(optionsDiv);

        // Apply completion status
        if (task.complete) {
            checkbox.style.backgroundImage = `url(${CheckmarkIcon})`;
            checkbox.style.backgroundRepeat = 'no-repeat';
            checkbox.style.backgroundSize = '100%';
            taskDetailsContainer.style.textDecoration = 'line-through';
        }
        
        return taskDiv;
    };

    // Add event listeners to task div when checking off, editing and deleting
    const addTaskEventListeners = (taskDiv, task) => {
        const checkbox = taskDiv.querySelector('.checkbox');
        const editTaskButton = taskDiv.querySelector('.edit-task');
        const deleteTaskButton = taskDiv.querySelector('.delete-task');

        checkbox.addEventListener('click', () => handleCheckboxClick(taskDiv, task));
        editTaskButton.addEventListener('click', () => handleEditTaskClick(taskDiv, task));
        deleteTaskButton.addEventListener('click', () => handleDeleteTaskClick(taskDiv, task));
    };

    // Handle click event for task checkbox
    const handleCheckboxClick = (taskDiv, task) => {
        styleCompletedTask(taskDiv, task);
    };

    // Style completed tasks
    const styleCompletedTask = (taskDiv, task) => {
        const checkbox = taskDiv.querySelector('.checkbox');
        const taskDetails = taskDiv.querySelector('.task-details-div');

        if (!task.complete) {
            checkbox.style.backgroundImage = `url(${CheckmarkIcon})`;
            checkbox.style.backgroundRepeat = 'no-repeat';
            checkbox.style.backgroundSize = '100%';
            
            taskDetails.style.textDecoration = 'line-through';
            task.complete = true;
        } else {
            checkbox.style.removeProperty('background-image');
            checkbox.style.removeProperty('background-repeat');
            checkbox.style.removeProperty('background-size');

            taskDetails.style.removeProperty('text-decoration');
            task.complete = false;
        }
    }

    const handleEditTaskClick = (taskDiv, task) => {
        // create & open a Task modal with placeholders as existing values to edit & update task changes
        if (!isTaskModalOpen) {
            createTaskModal(task, taskDiv);
        }
    };

    const handleDeleteTaskClick = (taskDiv, task) => {
        task.deleteTodoItem();
        taskDiv.remove()
        //need to remove todo item from todolist
        const selectedList = listModule.getSelectedList();
        listModule.removeTodoItemFromList(selectedList.id, task);
    };

    // Create and append a new project div to the projects container
    const createProjectDiv = (list) => {
        const projectsContainer = document.querySelector('.projects');
        const projectDiv = buildProjectDiv(list);
        projectsContainer.appendChild(projectDiv);
        addProjectEventListeners(projectDiv, list);
    };

    // Build a project div element for a given list
    const buildProjectDiv = (list) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-div');
        projectDiv.dataset.listId = list.id;

        // Create and add project icon
        const projectIcon = document.createElement('img');
        projectIcon.src = ProjectImage;
        projectDiv.appendChild(projectIcon);

        // Create and add project name span
        const projectNameSpan = document.createElement('span');
        projectNameSpan.textContent = list.name;
        projectDiv.appendChild(projectNameSpan);

        // Create and add button container with Edit and Delete buttons
        const projectDivButtonContainer = document.createElement('div');
        projectDivButtonContainer.classList.add('project-btn-container');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        projectDivButtonContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        projectDivButtonContainer.appendChild(deleteButton);

        projectDiv.appendChild(projectDivButtonContainer);

        return projectDiv;
    };

    // Add event listeners to a project div for edit, delete, and click events
    const addProjectEventListeners = (projectDiv, list) => {
        const editButton = projectDiv.querySelector('button:first-child');
        const deleteButton = projectDiv.querySelector('button:last-child');
        const projectNameSpan = projectDiv.querySelector('span');

        editButton.addEventListener('click', () => handleEditButtonClick(projectDiv, projectNameSpan, editButton, deleteButton, list));
        deleteButton.addEventListener('click', () => handleDeleteButtonClick(projectDiv, list));
        projectDiv.addEventListener('click', () => handleProjectDivClick(projectDiv, list));
    };

    // Handle click event for the Edit button
    const handleEditButtonClick = (projectDiv, projectNameSpan, editButton, deleteButton, list) => {
        // Replace project name span with an input field for editing
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.placeholder = projectNameSpan.textContent;
        projectDiv.replaceChild(editInput, projectNameSpan);
        projectDiv.style.padding = '0px';

        // Create and add exit button
        const exitButton = document.createElement('button');
        exitButton.innerHTML = '&#10006';
        const projectDivButtonContainer = projectDiv.querySelector('.project-btn-container');
        projectDivButtonContainer.removeChild(editButton);
        projectDivButtonContainer.removeChild(deleteButton);
        projectDivButtonContainer.appendChild(exitButton);

        // Event listener to cancel edit and revert changes
        exitButton.addEventListener('click', () => {
            cancelEdit(projectDiv, projectNameSpan, editInput, editButton, deleteButton, exitButton);
        });

        // Event listener to update project name on Enter key press
        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                updateProjectName(projectDiv, projectNameSpan, editInput, list);
                resetButtons(projectDivButtonContainer, editButton, deleteButton, exitButton);
            }
        });

        editInput.focus();
    };

    // Handle click event for the Delete button
    const handleDeleteButtonClick = (projectDiv, list) => {
        listModule.deleteTodoList(projectDiv.dataset.listId);
        projectDiv.remove();
        // const projectsContainer = document.querySelector('.projects');
        // console.log(projectsContainer.children.length)
        // const addTaskButton = document.querySelector('.add-task-btn');
        // if (projectsContainer.children.length === 2) {
        //     addTaskButton.classList.add('hidden');
        // }
    };

    // Handle click event for a project div to select the project
    const handleProjectDivClick = (projectDiv, list) => {
        // Unselect all project divs
        unselectAllProjectDivs();

        // Select the clicked project div
        const selectedTodoList = listModule.getList(projectDiv.dataset.listId);
        if (selectedTodoList) {
            selectedTodoList.selected = true;
            projectDiv.classList.add('selected-project');
            updateBanner(selectedTodoList.name);
            
            // clear task in UI and render tasks of selected todolist
            clearTaskList();
            selectedTodoList.taskList.forEach((task) => task.rendered = false);
            renderTodoItems(selectedTodoList);
        }

        const addTaskButton = document.querySelector('.add-task-btn');
        addTaskButton.classList.remove('hidden');
    };

    // Handle click event for all tasks (the Needful)
    const handleAllTasksDivClick = () => {
        unselectAllProjectDivs();
        // make the all-task-div styled
        const allTasksDiv = document.querySelector('.all-tasks-div');
        allTasksDiv.classList.add('selected-project');

        // update banner
        const allTasksSpan = allTasksDiv.querySelector('span');
        updateBanner(allTasksSpan.textContent);

        // clearlist
        clearTaskList();
        // hide add task button
        const addTaskButton = document.querySelector('.add-task-btn');
        addTaskButton.classList.add('hidden');

        //uncheck render fo all tasks

        // render todoitems of each todolist
        const listOfAllProjects = listModule.lists;
        listOfAllProjects.forEach((project) => {
            project.taskList.forEach((task) => task.rendered = false);
            renderTodoItems(project);
        });
    }

    // Unselect all project divs
    const unselectAllProjectDivs = () => {
        const projectDivs = document.querySelectorAll('.project-div');

        // Unselect all project divs
        projectDivs.forEach(div => {
            const listId = div.dataset.listId;
            const listItem = listModule.getList(listId);
            if (listItem) {
                listItem.selected = false;
            }
            div.classList.remove('selected-project');
        });

        // unselect all tasks div
        const allTasksDiv = document.querySelector('.all-tasks-div');
        allTasksDiv.classList.remove('selected-project');
    }

    // Clear the existing task list on UI
    const clearTaskList = () => {
        const taskUl = document.querySelector('.task-ul');
        taskUl.innerHTML = '';
    };

    // Handle Adding Task Form Submission
    const handleTaskFormSubmit = (event, taskTitle, taskDescription, taskDate, taskPriority, existingTask = null, taskDiv) => {
        event.preventDefault();

        if (!taskTitle.value.trim()) {
            // Display an error message or perform some action
            alert('Task title is required!');
            return;
        }
        
        const selectedList = listModule.getSelectedList();
        
        // if task has id we update, otherwise its new task
        if (existingTask) {
            //update todoitem
            existingTask.updateTitle(taskTitle.value);
            existingTask.updateDescription(taskDescription.value);
            existingTask.updateDueDate(taskDate.value);
            existingTask.updatePriority(taskPriority.value);
            // remove existing div and create new taskdiv with updated fields
            listModule.addTodoItemtoList(selectedList.id, existingTask);
            handleDeleteTaskClick(taskDiv, existingTask);
            createTaskDiv(existingTask);
        } else {
            const newTodoItem = itemModule.createTodoItem(taskTitle.value, taskDescription.value, taskDate.value, taskPriority.value);
            listModule.addTodoItemtoList(selectedList.id, newTodoItem);
        }
        
        // close task modal
        closeTaskModal();
        // render todo items
        renderTodoItems(selectedList);
    }

    // Cancel edit mode and revert to displaying project name
    const cancelEdit = (projectDiv, projectNameSpan, editInput, editButton, deleteButton, exitButton) => {
        projectDiv.replaceChild(projectNameSpan, editInput);
        const projectDivButtonContainer = projectDiv.querySelector('.project-btn-container');
        projectDivButtonContainer.removeChild(exitButton);
        projectDivButtonContainer.appendChild(editButton);
        projectDivButtonContainer.appendChild(deleteButton);
        projectDiv.style.padding = '0px 30px';
    };

    // Update the project name and revert to displaying project name span
    const updateProjectName = (projectDiv, projectNameSpan, editInput, list) => {
        projectNameSpan.textContent = editInput.value || projectNameSpan.textContent;
        listModule.updateName(projectDiv.dataset.listId, projectNameSpan.textContent);
        projectDiv.replaceChild(projectNameSpan, editInput);
        updateBanner(projectNameSpan.textContent);
    };

    // Reset buttons to Edit and Delete after editing
    const resetButtons = (container, editButton, deleteButton, exitButton) => {
        container.removeChild(exitButton);
        container.appendChild(editButton);
        container.appendChild(deleteButton);
        container.parentElement.style.padding = '0px 30px';
    };

    const updateBanner = (projectName) => {
        const banner = document.querySelector('.banner');
        banner.textContent = projectName;
    }

    return {
        init,
        renderTodoLists
    };
})();

export { UIController };
