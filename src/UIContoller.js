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
                //create todoItem
                closeProjectForm();
                listModule.createTodoList(projectName);
                console.log(listModule.lists);
                renderTodoLists(listModule.lists);
            });

            cancelButton.addEventListener('click', () => {
                closeProjectForm();
            });

            isProjectFormOpen = true;
        }
    }

    function renderTodoLists(lists) {
        lists.forEach((list, index) => {
            if (!list.rendered) {
                createProjectDiv(list);
                list.rendered = true;
            }
            console.log(list.name, index);
        })
    }

    function createProjectDiv(list) {
        const projectsContainer = document.querySelector('.projects');

        const projectListContainer = document.createElement('div');
        projectListContainer.classList.add('project-list-container');
        // Create project div
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-div');
        projectDiv.dataset.listId = list.id;
        
        //create & put project icon
        const projectIcon = document.createElement('img');
        projectIcon.src = ProjectImage;
        projectDiv.appendChild(projectIcon);

        // Create project name span
        const projectNameSpan = document.createElement('span');
        projectNameSpan.textContent = list.name;
        projectDiv.appendChild(projectNameSpan);

        //create button container
        const projectDivButtonContainer = document.createElement('div');
        projectDivButtonContainer.classList.add('project-btn-container');

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        projectDivButtonContainer.appendChild(editButton);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        projectDivButtonContainer.appendChild(deleteButton);

        projectDiv.appendChild(projectDivButtonContainer);
        // Append project div to projects container
        projectsContainer.appendChild(projectDiv);

        // Event listeners for edit and delete buttons
        editButton.addEventListener('click', () => {
            // Handle edit button click
            console.log('Edit button clicked');
            //remove project name span
            //replace with input, placeholder has current name span
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.placeholder = projectNameSpan.textContent;
            projectDiv.replaceChild(editInput, projectNameSpan);
            projectDiv.style.padding = '0px';

            //remove edit/delete buttons & replace with update/cancel
            projectDivButtonContainer.removeChild(editButton);
            projectDivButtonContainer.removeChild(deleteButton);

            const exitButton = document.createElement('button');
            exitButton.innerHTML = '&#10006';
            projectDivButtonContainer.appendChild(exitButton);

            exitButton.addEventListener('click', () => {
                projectDiv.replaceChild(projectNameSpan, editInput);
                projectDivButtonContainer.removeChild(exitButton);
                projectDivButtonContainer.appendChild(editButton);
                projectDivButtonContainer.appendChild(deleteButton);
                projectDiv.style.padding = '0px 30px';
            });

            //listmodule update name to new input value when clicking update
            editInput.addEventListener('blur', () => {
                projectNameSpan.textContent = editInput.value || projectNameSpan.textContent;
                listModule.updateName(projectDiv.dataset.listId, projectNameSpan.textContent);
                projectDiv.replaceChild(projectNameSpan, editInput);
                projectDivButtonContainer.removeChild(exitButton);
                projectDivButtonContainer.appendChild(editButton);
                projectDivButtonContainer.appendChild(deleteButton);
                projectDiv.style.padding = '0px 30px';
            });

            editInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    projectNameSpan.textContent = editInput.value || projectNameSpan.textContent;
                    listModule.updateName(projectDiv.dataset.listId, projectNameSpan.textContent);
                    projectDiv.replaceChild(projectNameSpan, editInput);
                    projectDivButtonContainer.removeChild(exitButton);
                    projectDivButtonContainer.appendChild(editButton);
                    projectDivButtonContainer.appendChild(deleteButton);
                    projectDiv.style.padding = '0px 30px';
                }
            });

            editInput.focus();
        });

        deleteButton.addEventListener('click', () => {
            // Handle delete button click
            listModule.deleteTodoList(projectDiv.dataset.listId);
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

    function handleEditProject(projectDiv) {
        console.log('handle the edit button event');
        const projectNameSpan = projectDiv.querySelector('span');
        const currentName = projectNameSpan.textContent;
        console.log(currentName);

        const editProjectName = document.createElement('input');
    }
    
}

export {ScreenController};