import menuIcon from './assets/menu.png';
import logoIcon from  './assets/logo.png';
import moonIcon from './assets/moon.png';
import allTasksIcon from './assets/alltasks.png';

export default function RenderHomePage() {
    RenderHeader();
    RenderContent();
    RenderFooter();
}

function RenderHeader() {
    const body = document.body;

    const header = document.createElement('header');
    header.classList.add('page-header');

    const menu = document.createElement('div');
    menu.classList.add('menu');
    const menuImage = document.createElement('img');
    menuImage.classList.add('menu-icon');
    menuImage.src = menuIcon;
    const menuSpan = document.createElement('span');
    menuSpan.classList.add('toggle-menu');
    menuSpan.appendChild(menuImage);
    menu.appendChild(menuSpan);

    const logoSection = document.createElement('div');
    logoSection.classList.add('logo-section');
    const logoImage = document.createElement('img');
    logoImage.src = logoIcon;
    const logoSpan = document.createElement('span');
    logoSpan.textContent = 'Do';
    const logoSpan2 = document.createElement('span');
    logoSpan2.textContent = 'TheNeedful';
    logoSection.appendChild(logoImage);
    logoSection.appendChild(logoSpan);
    logoSection.appendChild(logoSpan2);


    const toggleTheme = document.createElement('div');
    toggleTheme.classList.add('theme');
    const themeImage = document.createElement('img');
    themeImage.classList.add('theme-icon');
    themeImage.src = moonIcon;
    const themeSpan = document.createElement('span');
    themeSpan.classList.add('theme-span');
    themeSpan.appendChild(themeImage);
    toggleTheme.appendChild(themeSpan);

    header.appendChild(menu);
    header.appendChild(logoSection);
    header.appendChild(toggleTheme);

    body.appendChild(header);
}

function RenderContent() {
    const body = document.body;
    
    const content = document.createElement('div');
    content.classList.add('content');

    //side panel
    const sidePanel = document.createElement('div');
    sidePanel.classList.add('side-panel');

    const home = document.createElement('div');
    home.classList.add('home');
    const homeHeading = document.createElement('h2')
    homeHeading.textContent = 'Home';
    home.appendChild(homeHeading);

    // all tasks "list"
    const allTasksList = document.createElement('div');
    allTasksList.classList.add('all-tasks-div');
    allTasksList.classList.add('selected-project');
    const allTasksImage = document.createElement('img');
    allTasksImage.classList.add('all-tasks-icon');
    allTasksImage.src = allTasksIcon;
    const allTasksSpan = document.createElement('span');
    allTasksSpan.classList.add('.all-tasks-span');
    allTasksSpan.textContent = 'The Needful';
    allTasksList.appendChild(allTasksImage);
    allTasksList.appendChild(allTasksSpan);
    home.appendChild(allTasksList);

    const projects = document.createElement('div');
    projects.classList.add('projects');
    const projectsHeading = document.createElement('h2')
    projectsHeading.textContent = 'My Projects';
    const addProjectButton = document.createElement('button');
    addProjectButton.classList.add('add-project-btn');
    addProjectButton.textContent = 'Add Project';
    projects.appendChild(projectsHeading);
    projects.appendChild(addProjectButton);

    sidePanel.appendChild(home);
    sidePanel.appendChild(projects);
    content.appendChild(sidePanel);
    
    //main panel
    const mainPanel = document.createElement('div');
    mainPanel.classList.add('main-panel');
    
    const banner = document.createElement('div');
    banner.classList.add('banner');
    banner.textContent = 'The Needful';

    const taskSection = document.createElement('div');
    taskSection.classList.add('task-section');
    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('add-task-btn');
    addTaskButton.classList.add('hidden');
    addTaskButton.textContent = 'Add Task';

    const taskUl = document.createElement('ul');
    taskUl.classList.add('task-ul');
    taskSection.appendChild(taskUl);
    
    mainPanel.appendChild(banner);
    mainPanel.appendChild(addTaskButton);
    mainPanel.appendChild(taskSection);
    content.appendChild(mainPanel);

    body.appendChild(content);
}

function RenderFooter() {
    const body = document.body;

    const footer = document.createElement('footer');
    const iconCred = document.createElement('div');
    iconCred.innerHTML = 'Icons by <a target="_blank" href="https://icons8.com">Icons8</a> | 2024 © kennydn99';
    footer.appendChild(iconCred);
    body.appendChild(footer);
}