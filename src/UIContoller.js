//Control the UI!

import RenderHomePage from "./home";
import ProjectImage from './assets/project.png';


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

    function createProjectForm() {
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
        inputField.appendChild(projectInput);

        //form buttons
        const projectFormButtons = document.createElement('div');
        projectFormButtons.classList.add('project-form-buttons');
        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.textContent = "Add";
        const cancelButton = document.createElement('button');
        cancelButton.textContent = "Cancel";
        projectFormButtons.appendChild(addButton);
        projectFormButtons.appendChild(cancelButton);
        inputField.appendChild(projectFormButtons);

        projectForm.appendChild(inputField);
        projectForm.appendChild(projectFormButtons);

        projects.appendChild(projectForm);
    }
    
}

export {ScreenController};