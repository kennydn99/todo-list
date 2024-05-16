//Control the UI!

import RenderHomePage from "./home";
import ProjectImage from './assets/project.png';
import listModule from './todolist';


function ScreenController() {
    //Initial render
    RenderHomePage();
    ToggleSidePanel();

    //hide and unhide menu
    function ToggleSidePanel() {
        const sidePanel = document.querySelector('.side-panel');
        const menuButton = document.querySelector('.toggle-menu');
        menuButton.addEventListener('click', () => {
            if (sidePanel.classList.contains('hidden')) {
                sidePanel.classList.remove('hidden');
            } else {
                sidePanel.classList.add('hidden');
            }
        });
    }

    //clicking Add Project button -> create input for project name & edit/delete buttons ->
    //based on input value create TodoList
    const addProjectButton = document.querySelector('.add-project-btn');
    addProjectButton.addEventListener('click', () => {
        console.log('add project button clicked');
        createProjectForm();
    });

    let isProjectFormOpen = false;
    function createProjectForm() {
        if (!isProjectFormOpen) {
            const projects = document.querySelector('.projects');
            
            //make form
            const projectForm = document.createElement('form');
            projectForm.classList.add('project-form');
            
            //make project icon
            const projectIcon = document.createElement('img');
            projectIcon.src = ProjectImage;
            projectForm.appendChild(projectIcon);

            //make input field
            const inputField = document.createElement('div');
            const projectInput = document.createElement('input');
            projectInput.placeholder = 'Name';
            projectInput.required = true;
            inputField.appendChild(projectInput);

            //form buttons
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

            //event listener for form submit
            projectForm.addEventListener('submit', (e) => {
                const projectName = projectInput.value;
                e.preventDefault();
                createProjectDiv(projectName);
                closeProjectForm();
                //need to create todoItem as well
                listModule.createTodoList(projectName);
            });

            cancelButton.addEventListener('click', () => {
                closeProjectForm();
            });

            isProjectFormOpen = true;
        }
    }

    function createProjectDiv(projectName) {
        const projectsContainer = document.querySelector('.projects');

        // Create project div
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-div');

        //create & put project icon
        const projectIcon = document.createElement('img');
        projectIcon.src = ProjectImage;
        projectDiv.appendChild(projectIcon);

        // Create project name span
        const projectNameSpan = document.createElement('span');
        projectNameSpan.textContent = projectName;
        projectDiv.appendChild(projectNameSpan);

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        projectDiv.appendChild(editButton);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        projectDiv.appendChild(deleteButton);

        // Append project div to projects container
        projectsContainer.appendChild(projectDiv);

        // Event listeners for edit and delete buttons
        editButton.addEventListener('click', () => {
            // Handle edit button click
            console.log('Edit button clicked');
        });

        deleteButton.addEventListener('click', () => {
            // Handle delete button click
            
            projectsContainer.removeChild(projectDiv);
        });
    }

    function closeProjectForm() {
        const projectForm = document.querySelector('.project-form');
        if(projectForm) {
            projectForm.remove();
            isProjectFormOpen = false;
        }
    }
    
}

export {ScreenController};