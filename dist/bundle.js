/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tooltip__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__window_task_settings_task_settings_window__ = __webpack_require__(9);


class Task {
    constructor(text, color, start, stop, day, id, week_id) {
        this.color = color;
        this.start = start;
        this.stop = stop;
        this.day = day;
        this.id = id;
        this.text = text;
        this.week_id = week_id;
    }
    draw(parentElement, hour, day, week_number) {
        let newInEl = document.createElement("div");
        newInEl.className = "task";
        newInEl.id = "task" + String(week_number) + ":" + String(hour) + ":" + String(day);
        newInEl.setAttribute("data-id", String(this.id));
        newInEl.style.background = this.color;
        newInEl.onclick = function (e) { this.elementClick(e); }.bind(this);
        newInEl.onmouseover = function (e) { this.elementHover(e); }.bind(this);
        newInEl.onmouseleave = function (e) { this.elementLeave(e); }.bind(this);
        parentElement.appendChild(newInEl);
        this.element = newInEl;
    }
    setTooltip() {
        this.tooltipElement = new __WEBPACK_IMPORTED_MODULE_0__tooltip__["a" /* default */](this.text, this.color, this.start, this.stop);
    }
    elementClick(event) {
        let modalSettings = Object(__WEBPACK_IMPORTED_MODULE_1__window_task_settings_task_settings_window__["a" /* getWindowTaskSettings */])();
        this.tooltipElement.hidden();
        modalSettings.draw(this);
    }
    elementHover(event) {
        let elementList = document.querySelectorAll('[data-id]');
        let tasksElements = [];
        for (let i = 0; i < elementList.length; i++) {
            if (String(this.id) == elementList[i].getAttribute("data-id")) {
                tasksElements.push(i);
            }
        }
        if (tasksElements.length != 0) {
            let begin = elementList[tasksElements[0]].getBoundingClientRect().left;
            let top = elementList[tasksElements[0]].getBoundingClientRect().top - 10;
            let done = elementList[tasksElements[tasksElements.length - 1]].getBoundingClientRect().left +
                elementList[tasksElements[tasksElements.length - 1]].getBoundingClientRect().width;
            console.log("Begin: " + String(begin) + " Done: " + String(done));
            let middle = begin + Math.floor((done - begin) / 2);
            console.log("Middle: " + String(middle));
            this.tooltipElement.draw(top, middle);
        }
    }
    elementLeave() {
        this.tooltipElement.hidden();
    }
    setStyle(styleName, styleValue) {
        if (this.element != null) {
            this.element.style[styleName] = styleValue;
        }
    }
    clear() {
        if (this.element != null) {
            this.element.remove();
            this.element = null;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Task);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__week_week__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__week_task__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_db_api__ = __webpack_require__(7);



let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let plans = [];
for (let o = 0; o < 5; o++) {
    plans[o] = new __WEBPACK_IMPORTED_MODULE_1__week_task__["a" /* default */]("hello", "#ffdda9", 13 + o, 16 + o, o, 1 + o + Math.random(), 1);
}
let currentWeek = 2;
let startHour = 11;
Object(__WEBPACK_IMPORTED_MODULE_2__db_db_api__["a" /* dbInit */])();
let week = new __WEBPACK_IMPORTED_MODULE_0__week_week__["a" /* default */](1);
week.create(document.body, (1 == currentWeek));
week.loadDays(days);
week.setStartHour(startHour);
week.loadTasks(plans);
week.draw();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__time__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__days__ = __webpack_require__(6);




class Week {
    constructor(week_number) {
        this.hourWidth = 80;
        this.startHour = 13;
        this.week_number = week_number;
        this.timePanel = new __WEBPACK_IMPORTED_MODULE_0__time__["a" /* default */]();
        this.graphPanel = new __WEBPACK_IMPORTED_MODULE_2__graph__["a" /* default */]();
        this.daysPanel = new __WEBPACK_IMPORTED_MODULE_3__days__["a" /* default */]();
    }
    create(parent, currentWeek) {
        let wrap = document.createElement("div");
        wrap.className = "paper  main-container";
        let up = document.createElement("div");
        up.className = (currentWeek) ? "up active" : "up";
        wrap.appendChild(up);
        up.innerHTML = "Week " + String(this.week_number);
        up.onclick = function (e) {
            console.log(e.target);
            wrap.classList;
            let clList = wrap.classList;
            for (let i = 0; i < clList.length; i++) {
                if (clList[i] == "closed") {
                    clList.remove("closed");
                    days.className = "days";
                    return;
                }
            }
            clList.add("closed");
            days.className = "days close";
        };
        let grid = document.createElement("div");
        grid.id = "grid" + String(this.week_number);
        let header = document.createElement("div");
        header.className = "header";
        header.id = "header" + String(this.week_number);
        let container = document.createElement("div");
        container.className = "container-week";
        container.id = "container-week" + String(this.week_number);
        grid.appendChild(header);
        grid.appendChild(container);
        let days = document.createElement("div");
        let graph = document.createElement("div");
        days.id = "days" + String(this.week_number);
        days.className = "days";
        graph.id = "graph" + String(this.week_number);
        graph.className = "graph";
        container.appendChild(days);
        container.appendChild(graph);
        grid.className = "grid";
        wrap.appendChild(grid);
        parent.appendChild(wrap);
        this.container = container;
        this.daysPanel.setup(days);
        this.graphPanel.setNativeElement(graph);
        this.timePanel.setNativeElement(header);
    }
    loadTasks(plans) {
        let timePlans = [];
        for (let i = this.startHour; i < this.startHour + 24; i++) {
            let now = (i > 23) ? i - 23 : i;
            timePlans[i + 1] = new Array(7);
            for (let j = 0; j < 7; j++) {
                timePlans[i + 1][j] = new __WEBPACK_IMPORTED_MODULE_1__task__["a" /* default */]();
                timePlans[i + 1][j].id = -1;
            }
            for (let j = 0; j < plans.length; j++) {
                if (now >= plans[j].start && now <= plans[j].stop) {
                    if (plans[j].stop == i) {
                        continue;
                    }
                    timePlans[i + 1][plans[j].day] = plans[j];
                }
            }
        }
        timePlans[this.startHour] = timePlans[this.startHour + 1];
        this.tasks = timePlans;
    }
    loadDays(days) {
        this.daysPanel.loadDays(days);
    }
    setStartHour(hour) {
        this.startHour = hour;
    }
    draw() {
        this.container.style.width = String(24 * this.hourWidth) + 'px';
        this.timePanel.setup(this.startHour, this.hourWidth);
        let count = this.timePanel.draw();
        this.graphPanel.setup(this.startHour, count, this.hourWidth, this.week_number);
        this.graphPanel.draw(this.tasks);
        this.daysPanel.draw();
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Week);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Time {
    setup(start, hourWidth) {
        this.start = start;
        this.hourWidth = hourWidth;
    }
    setNativeElement(element) {
        this.nativeElement = element;
    }
    draw() {
        this.nativeElement.innerHTML = "";
        this.nativeElement.style.width = String(24 * this.hourWidth) + "px";
        let count = 24;
        let final = this.start + count;
        let begin = this.start;
        for (let i = begin; i < final; i++) {
            if (i >= 24) {
                i = i - 24;
                final = final - 24;
            }
            let newEl = document.createElement("div");
            let time = (i < 10) ? '0' + String(i) : String(i);
            newEl.innerHTML = time + ":00";
            newEl.className = "hour";
            newEl.style.width = this.hourWidth + "px";
            this.nativeElement.appendChild(newEl);
        }
        return count;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Time);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tooltip {
    constructor(text, color, start, stop) {
        this.open = false;
        this.color = color;
        this.start = start;
        this.stop = stop;
        this.text = text;
        let tooltip = document.createElement("div");
        tooltip.className = "taskTooltip";
        document.body.appendChild(tooltip);
        this.element = tooltip;
        this.drawInner();
    }
    drawInner() {
        if (!this.element)
            throw new Error("tooltip yet not created");
        let text = document.createElement("div");
        let color = document.createElement("div");
        let time = document.createElement("div");
        text.className = "tooltipText";
        color.className = "tooltipColor";
        time.className = "tooltipTime";
        text.innerText = this.text;
        color.style.background = this.color;
        time.innerText = String(this.start) +
            ":00 - " + String(this.stop) + ":00";
        this.element.appendChild(text);
        this.element.appendChild(color);
        this.element.appendChild(time);
    }
    draw(top, left) {
        this.element.className = "taskTooltip active";
        let borderRight = window.innerWidth;
        let borderBottom = window.innerHeight;
        let elementHeight = this.element.getBoundingClientRect().height;
        let elementWidth = this.element.getBoundingClientRect().width;
        let nTop = top - elementHeight;
        let nLeft = left - (elementWidth / 2);
        if (nLeft + elementWidth > borderRight) {
            nLeft = borderRight - elementWidth;
        }
        this.element.style.top = String(nTop) + "px";
        this.element.style.left = String(nLeft) + "px";
        this.open = true;
    }
    hidden() {
        this.element.className = "taskTooltip";
        this.open = false;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Tooltip);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Graph {
    constructor() {
        this.elementClick = function (e) {
        };
    }
    setNativeElement(element) {
        this.nativeElement = element;
    }
    setup(start, count, hourWidth, week_number) {
        this.start = start;
        this.count = count;
        this.hourWidth = hourWidth;
        this.week_number = week_number;
    }
    draw(tasks) {
        this.nativeElement.innerHTML = "";
        for (let i = this.start; i < this.start + this.count + 1; i++) {
            let newColumn = document.createElement("div");
            newColumn.className = "column";
            newColumn.style.width = this.hourWidth + "px";
            newColumn.style.height = 40 * 7 + "px";
            for (let j = 0; j < 7; j++) {
                let newEl = document.createElement("div");
                newEl.className = "cell";
                newEl.style.width = this.hourWidth + "px";
                if (i == this.start || i == this.start + this.count) {
                    newEl.style.width = 20 + "px";
                    newColumn.style.width = 20 + "px";
                }
                if (tasks[i][j].id != -1) {
                    tasks[i][j].draw(newEl, i, j, this.week_number);
                    if (i != this.start + this.count) {
                        if (tasks[i][j].id == tasks[i + 1][j].id) {
                            tasks[i][j].setStyle('marginRight', '0px');
                        }
                        else {
                            tasks[i][j].setStyle('borderTopRightRadius', '5px');
                            tasks[i][j].setStyle('borderBottomRightRadius', '5px');
                            tasks[i][j].setTooltip();
                        }
                    }
                    if (i != this.start) {
                        if (tasks[i - 1][j].id == tasks[i][j].id && i - 1 != this.start) {
                            tasks[i][j].setStyle('marginLeft', '0px');
                        }
                        else {
                            tasks[i][j].setStyle('borderTopLeftRadius', '5px');
                            tasks[i][j].setStyle('borderBottomLeftRadius', '5px');
                        }
                    }
                    else {
                        tasks[i][j].clear();
                    }
                }
                if (i == this.start + this.count) {
                    newEl.style.borderRight = "none";
                }
                if (j == 6) {
                    newEl.style.borderBottom = "none";
                }
                newColumn.appendChild(newEl);
            }
            this.nativeElement.appendChild(newColumn);
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Graph);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Days {
    setup(element) {
        this.nativeElement = element;
    }
    draw() {
        this.nativeElement.innerHTML = "";
        for (let i = 0; i < this.days.length; i++) {
            let newEl = document.createElement("div");
            newEl.innerHTML = this.days[i];
            newEl.className = "day";
            this.nativeElement.appendChild(newEl);
        }
    }
    loadDays(days) {
        this.days = days;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Days);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dbInit; });
/* unused harmony export createWeek */
/* unused harmony export createTask */
/* unused harmony export getTasks */
/* unused harmony export getWeeks */
/* unused harmony export deleteTask */
/* unused harmony export changeTask */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__week_task__ = __webpack_require__(0);

let db;
function dbInit() {
    db = openDatabase('main_db', '1.1', 'Main DB', 2 * 1024 * 1024);
    if (!db) {
        throw new Error("Fail open db");
    }
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS tasks" +
            " (ID INTEGER PRIMARY KEY ASC,text TEXT,start " +
            "INTEGER, stop INTEGER, day INTEGER, color TEXT, week_id INTEGER)", []);
        tx.executeSql("CREATE TABLE IF NOT EXISTS weeks (ID INTEGER PRIMARY KEY ASC)", []);
    });
}
function createWeek(resolve, reject) {
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO weeks DEFAULT VALUES ");
    });
    resolve(true);
}
function createTask(resolve, reject, text, start, stop, week_id) {
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO tasks (text,start,stop,week_id) VALUES(?,?,?,?)", [text, start, stop, week_id]);
    });
    resolve(true);
}
function getTasks(resolve, reject, week_id) {
    let result = [];
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM tasks WHERE week_id = ?", [week_id], function (tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                let now_task = new __WEBPACK_IMPORTED_MODULE_0__week_task__["a" /* default */](result.rows.item(i).text, result.rows.item(i).color, result.rows.item(i).start, result.rows.item(i).stop, result.rows.item(i).day, result.rows.item(i).ID, result.rows.item(i).week_id);
                result.push(now_task);
            }
        });
    });
    resolve(result);
}
function getWeeks(resolve, reject) {
    let result = [];
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM weeks", [], function (tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                result.push(result.rows.item(i).ID);
            }
        });
    });
    resolve(result);
}
function deleteTask(resolve, reject, task_id) {
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("DELETE FROM tasks WHERE ID=?", [task_id]);
    });
    resolve(true);
}
function changeTask(resolve, reject, up_task) {
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("UPDATE tasks SET (text,start,stop,day,color,week_id)" +
            "VALUES(?,?,?,?,?,?) WHERE ID=?", [up_task.text,
            up_task.start,
            up_task.stop,
            up_task.day,
            up_task.color,
            up_task.week_id,
            up_task.id]);
    });
    resolve(true);
}



/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getWindowTaskSettings; });
/* unused harmony export TaskSettingsWindow */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task_settings_content__ = __webpack_require__(10);

let taskSettings;
function getWindowTaskSettings() {
    if (!taskSettings) {
        taskSettings = new TaskSettingsWindow();
    }
    return taskSettings;
}
class TaskSettingsWindow {
    constructor() {
        this.open = false;
        let newBackground = document.createElement("div");
        newBackground.className = "modalBackground";
        this.background = newBackground;
        document.body.appendChild(newBackground);
        this.content = new __WEBPACK_IMPORTED_MODULE_0__task_settings_content__["a" /* TaskSettingsContent */](this.background);
    }
    draw(task) {
        this.background.className = "modalBackground colored";
        this.background.onclick = function (e) {
            if (e.srcElement.className != this.background.className)
                return;
            this.close();
        }.bind(this);
        this.content.draw(task);
    }
    close() {
        this.background.className = "modalBackground close";
        this.content.clear();
    }
}



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskSettingsContent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_functions__ = __webpack_require__(11);

class TaskSettingsContent {
    constructor(parent) {
        this.colors = [];
        this.element = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("div", "modalContent", parent);
        this.name = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("input", "modalContentInput", this.element);
        this.timeStart = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("input", "modalContentInput", this.element);
        this.timeStop = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("input", "modalContentInput", this.element);
        ["#fff", "#000"].map(function (item) {
            this.colors.push(Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("div", "modalContentColor", this.element));
            this.colors[this.colors.length - 1].style.background = item;
        }.bind(this));
    }
    draw(task) {
        this.element.className = "modalContent active";
        this.currentColor = task.color;
        this.name.setAttribute("value", task.text);
        this.timeStart.setAttribute("value", String(task.start));
        this.timeStop.setAttribute("value", String(task.stop));
    }
    clear() {
        this.element.className = "modalContent close";
    }
}



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createElement; });
function createElement(type, className, parent) {
    let element = document.createElement(type);
    element.className = className;
    parent.appendChild(element);
    return element;
}



/***/ })
/******/ ]);