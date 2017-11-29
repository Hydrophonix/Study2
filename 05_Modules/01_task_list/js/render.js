// import $ from "jquery";
let taskRenderer = {};
const taskTemplate = `
  <li class="task">
    <input class="complete" type="checkbox"/>
    <input class="description" type="text" placeholder="Enter task description..."/>
    <button class="delete-button">Delete</button>
  </li>`;

function _renderTask(task) {
    const $task = $(taskTemplate);
    if(task.complete) {
        $task.find(".complete").attr("checked", "checked");
    }
    $task.find(".description").val(task.description);
    return $task;
}

taskRenderer.renderTasks = tasks => {
    const elementArray = $.map(tasks, _renderTask);

    $("#task-list")
        .empty()
        .append(elementArray);
};

taskRenderer.renderNew = () => {
    const $taskList = $("#task-list");
    $taskList.prepend(_renderTask({}));
};

export { taskRenderer };
