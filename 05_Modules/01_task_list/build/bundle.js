/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _data = __webpack_require__(1);

	var _tasks = __webpack_require__(2);

	function _addTask() {
	    _tasks.tasks.add();
	}
	// import { taskRenderer } from "./render.js";


	function _deleteAllTasks() {
	    _tasks.tasks.clear();
	}

	function _saveChanges() {
	    _tasks.tasks.save();
	}

	function _cancelChanges() {
	    _tasks.tasks.cancel();
	}

	function _deleteTask(clickEvent) {
	    _tasks.tasks.remove(clickEvent);
	}

	function _registerEventHandlers() {
	    $("#new-task-button").on("click", _addTask);
	    $("#delete-all-button").on("click", _deleteAllTasks);
	    $("#save-button").on("click", _saveChanges);
	    $("#cancel-button").on("click", _cancelChanges);
	    $("#task-list").on("click", ".delete-button", _deleteTask);
	}

	_registerEventHandlers();
	_tasks.tasks.render();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var STORE_NAME = 'tasks';
	var taskData = {};

	taskData.save = function (tasks) {
	    return localStorage.setItem(STORE_NAME, JSON.stringify(tasks));
	};

	taskData.load = function () {
	    var storedTasks = localStorage.getItem(STORE_NAME);
	    return storedTasks ? JSON.parse(storedTasks) : [];
	};

	taskData.clear = function () {
	    return localStorage.removeItem(STORE_NAME);
	};

	exports.taskData = taskData;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.tasks = undefined;

	var _data = __webpack_require__(1);

	var _render = __webpack_require__(3);

	// import $ from "jquery";
	var tasks = {};

	tasks.add = function () {
	    return _render.taskRenderer.renderNew();
	};

	tasks.remove = function (clickEvent) {
	    var taskElement = clickEvent.target;
	    $(taskElement).closest(".task").remove();
	};

	tasks.clear = function () {
	    _data.taskData.clear();
	    exports.render();
	};

	tasks.save = function () {
	    var tasks = [];
	    $("#task-list .task").each(function (index, task) {
	        var $task = $(task);
	        tasks.push({
	            complete: $task.find(".complete").prop('checked'),
	            description: $task.find(".description").val()
	        });
	    });

	    _data.taskData.save(tasks);
	};

	tasks.cancel = function () {
	    return tasks.render();
	};
	tasks.render = function () {
	    return _render.taskRenderer.renderTasks(_data.taskData.load());
	};

	exports.tasks = tasks;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var taskRenderer = {};
	var taskTemplate = "\n  <li class=\"task\">\n    <input class=\"complete\" type=\"checkbox\"/>\n    <input class=\"description\" type=\"text\" placeholder=\"Enter task description...\"/>\n    <button class=\"delete-button\">Delete</button>\n  </li>";

	function _renderTask(task) {
	    var $task = $(taskTemplate);
	    if (task.complete) {
	        $task.find(".complete").attr("checked", "checked");
	    }
	    $task.find(".description").val(task.description);
	    return $task;
	}

	taskRenderer.renderTasks = function (tasks) {
	    var elementArray = $.map(tasks, _renderTask);

	    $("#task-list").empty().append(elementArray);
	};

	taskRenderer.renderNew = function () {
	    var $taskList = $("#task-list");
	    $taskList.prepend(_renderTask({}));
	};

	exports.taskRenderer = taskRenderer;

/***/ })
/******/ ]);
