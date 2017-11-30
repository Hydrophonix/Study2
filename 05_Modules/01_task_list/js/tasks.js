import { taskData } from "./data.js";
import { taskRenderer } from "./render.js";

let tasks = {};

tasks.add = () => taskRenderer.renderNew();

tasks.remove = clickEvent => {
  const taskElement = clickEvent.target;
  $(taskElement).closest(".task").remove();
};

tasks.clear = () => {
  taskData.clear();
  exports.render();
};

tasks.save = () => {
  const tasks = [];
  $("#task-list .task").each(function (index, task) {
    var $task = $(task);
    tasks.push({
      complete: $task.find(".complete").prop('checked'),
      description: $task.find(".description").val()
    });
  });

  taskData.save(tasks);
};

tasks.cancel = () => tasks.render();
tasks.render = () => taskRenderer.renderTasks(taskData.load());

export { tasks };
