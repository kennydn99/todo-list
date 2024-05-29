// UIController Module

import RenderHomePage from "./home";
import ProjectImage from './assets/project.png';
import listModule from './todolist';
import itemModule from './todoitem'

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
    const createTaskModal = () => {
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
        const taskTitleLabel = document.createElement('label');
        taskTitleLabel.textContent = 'Title:';
        taskTitleLabel.htmlFor = taskTitleInput.id;

        // Description
        const taskDescriptionTextArea = document.createElement('textarea');
        taskDescriptionTextArea.placeholder = 'Enter Task Description Here...'
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
        for (let i = 0; i < priorities.length; i++) {
            let option = document.createElement('option');
            option.value = priorities[i];
            option.text = priorities[i];
            taskPriority.appendChild(option);
        }
        priorityContainer.appendChild(taskPriorityLabel);
        priorityContainer.appendChild(taskPriority);

        selectContainer.appendChild(dateContainer);
        selectContainer.appendChild(priorityContainer);
        // Buttons
        const modalButtonContainer = document.createElement('div');
        modalButtonContainer.classList.add('modal-btn-container');
        const submitTaskButton = document.createElement('button');
        submitTaskButton.textContent = 'Add';
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
        submitTaskButton.addEventListener('click', (e) => handleTaskFormSubmit(e, taskTitleInput, taskDescriptionTextArea, taskDate, taskPriority));

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
            console.log(listModule.lists);
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
    };

    // Handle click event for a project div to select the project
    const handleProjectDivClick = (projectDiv, list) => {
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

        // Select the clicked project div
        const selectedTodoList = listModule.getList(projectDiv.dataset.listId);
        if (selectedTodoList) {
            selectedTodoList.selected = true;
            projectDiv.classList.add('selected-project');
            updateBanner(selectedTodoList.name);
        }
    };

    // render the selected todolist task items (seleced todolist should display its own todo items when switching)

    // Handle Adding Task Form Submission
    const handleTaskFormSubmit = (event, taskTitle, taskDescription, taskDate, taskPriority) => {
        event.preventDefault();
        // create todo item
        const newTodoItem = itemModule.createTodoItem(taskTitle.value, taskDescription.value, taskDate.value, taskPriority.value);
        console.log(newTodoItem);
        // Add todo item to selected list
        const selectedList = listModule.getSelectedList();
        listModule.addTodoItemtoList(selectedList.id, newTodoItem);
        console.log(selectedList);
        // close task modal
        closeTaskModal();
        // render todo items

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
