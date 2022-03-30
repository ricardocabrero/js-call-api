export default class handlerStorage {
    setDataInLocal(name, data) {
        window.localStorage.setItem(name, JSON.stringify(data));
    }

    getDataFromLocal(name) {
        return window.localStorage.getItem(name);
    }

    getDataParseFromLocal(name) {
        return JSON.parse(window.localStorage.getItem(name));
    }
}
