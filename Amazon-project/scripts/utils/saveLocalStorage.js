function saveToLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

export default saveToLocalStorage;