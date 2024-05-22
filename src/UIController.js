// UIController Module

import RenderHomePage from "./home";
import ProjectImage from './assets/project.png';
import listModule from './todolist';

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
    };

    // Flag to track if the project form is open
    let isProjectFormOpen = false;

    // Handle click event for the "Add Project" button
    const handleAddProjectClick = () => {
        console.log('Add project button clicked');
        if (!isProjectFormOpen) {
            createProjectForm();
        }
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

        // Event listener to update project name on input blur
        editInput.addEventListener('blur', () => {
            updateProjectName(projectDiv, projectNameSpan, editInput, list);
            resetButtons(projectDivButtonContainer, editButton, deleteButton, exitButton);
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
        const banner = document.querySelector('.banner');
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
            banner.textContent = selectedTodoList.name;
        }
    };

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
    };

    // Reset buttons to Edit and Delete after editing
    const resetButtons = (container, editButton, deleteButton, exitButton) => {
        container.removeChild(exitButton);
        container.appendChild(editButton);
        container.appendChild(deleteButton);
        container.parentElement.style.padding = '0px 30px';
    };

    return {
        init,
        renderTodoLists
    };
})();

export { UIController };
