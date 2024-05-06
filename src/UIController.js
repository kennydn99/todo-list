import menuIcon from './menu.png';

function RenderHeader() {
    const header = document.querySelector('.page-header');

    const menu = document.createElement('div');
    menu.classList.add('menu');
    const menuImage = document.createElement('img');
    menuImage.src = menuIcon;
    const menuSpan = document.createElement('span');
    menuSpan.appendChild(menuImage);
    menu.appendChild(menuSpan);

    const logoSection = document.createElement('div');
    logoSection.textContent = 'DoTheNeedful';

    const toggleTheme = document.createElement('div');
    toggleTheme.textContent = 'toggle theme here';

    header.appendChild(menu);
    header.appendChild(logoSection);
    header.appendChild(toggleTheme);
}

function RenderContent() {
    const body = document.body;
    
    const content = document.createElement('div');
    content.classList.add('content');

    //side panel - left side
    const sidePanel = document.createElement('div');
    sidePanel.classList.add('side-panel');

    const home = document.createElement('div');
    home.classList.add('home');
    const homeHeading = document.createElement('h2')
    homeHeading.textContent = 'Home';
    home.appendChild(homeHeading);

    const projects = document.createElement('div');
    projects.classList.add('projects');
    const projectsHeading = document.createElement('h2')
    projectsHeading.textContent = 'My Projects';
    projects.appendChild(projectsHeading);

    sidePanel.appendChild(home);
    sidePanel.appendChild(projects);
    content.appendChild(sidePanel);
    
    //main panel - right side
    const mainPanel = document.createElement('div');
    mainPanel.classList.add('main-panel');
    
    const banner = document.createElement('div');
    banner.classList.add('banner');
    banner.textContent = 'The Needful';

    const taskSection = document.createElement('div');
    taskSection.classList.add('task-section');
    taskSection.textContent = "Tasks listed here";

    mainPanel.appendChild(banner);
    mainPanel.appendChild(taskSection);
    content.appendChild(mainPanel);

    body.appendChild(content);

}


export {RenderHeader, RenderContent};