const STORAGE_KEY = 'todoApp';
// Save enire list of TodoList instances to localStorage
const saveToLocalStorage = (lists) => {
    try {
        const serializedData = JSON.stringify(lists.map(list => list.toJSON()));
        localStorage.setItem(STORAGE_KEY, serializedData);
        console.log(`Saving serialilzedData: ${serializedData} to localStorage`);
    } catch (error) {
        console.error('Error saving to localStorage: ', error);
    }
}

//loads data from localStorage & convert back into todolist instances
const loadFromLocalStorage = (TodoList) => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsedData = JSON.parse(data);
            console.log('loadingFromLocalStorage...returning parsedData: ', parsedData.map(TodoList.fromJSON))
            return parsedData.map(TodoList.fromJSON);
        }
        return [];
    } catch (error) {
        console.log('Error loading from localStorage: ', error);
        return [];
    }
}

export {saveToLocalStorage, loadFromLocalStorage};