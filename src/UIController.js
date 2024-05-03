function RenderHeader() {
    const header = document.querySelector('.page-header');

    const menu = document.createElement('div');
    menu.textContent = 'Menu icon here';
    //span icon goes here

    const logoSection = document.createElement('div');
    logoSection.textContent = 'DoTheNeedful';

    const toggleTheme = document.createElement('div');
    toggleTheme.textContent = 'put icons here';

    header.appendChild(menu);
    header.appendChild(logoSection);
    header.appendChild(toggleTheme);
}

export default RenderHeader;