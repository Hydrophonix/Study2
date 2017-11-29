// import $ from "jquery";
const STORE_NAME = 'tasks';
let taskData = {};

taskData.save = tasks =>
  localStorage.setItem(STORE_NAME, JSON.stringify(tasks));


taskData.load = () => {
    const storedTasks = localStorage.getItem(STORE_NAME);
    return storedTasks ? JSON.parse(storedTasks) : [];
};

taskData.clear = () => localStorage.removeItem(STORE_NAME);

export { taskData };
