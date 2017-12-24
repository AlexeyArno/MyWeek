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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__week_week__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__week_task__ = __webpack_require__(3);


var week = new __WEBPACK_IMPORTED_MODULE_0__week_week__["a" /* default */]();
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
week.loadDays(days);
var daysEl = document.getElementById('days');
var grapEl = document.getElementById('graph');
var timeEl = document.getElementById('header');
week.setupAll(daysEl, timeEl, grapEl);
var plans = new Array();
for (var o = 0; o < 5; o++) {
    plans[o] = new __WEBPACK_IMPORTED_MODULE_1__week_task__["a" /* default */]();
    plans[o].setup("green", 13 + o, 16 + o, 0 + o, 1 + o);
}
week.loadTasks(plans);
week.draw();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__time__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__days__ = __webpack_require__(5);




var Week = (function () {
    function Week() {
        this.hourWidth = 80;
        this.startHour = 13;
        this.timePanel = new __WEBPACK_IMPORTED_MODULE_0__time__["a" /* default */]();
        this.graphPanel = new __WEBPACK_IMPORTED_MODULE_2__graph__["a" /* default */]();
        this.daysPanel = new __WEBPACK_IMPORTED_MODULE_3__days__["a" /* default */]();
    }
    Week.prototype.loadTasks = function (plans) {
        var timePlans = new Array();
        for (var i = this.startHour; i < this.startHour + 24; i++) {
            var now = (i > 23) ? i - 23 : i;
            timePlans[i + 1] = new Array(7);
            for (var j = 0; j < 7; j++) {
                timePlans[i + 1][j] = new __WEBPACK_IMPORTED_MODULE_1__task__["a" /* default */]();
                timePlans[i + 1][j].id = -1;
            }
            for (var j = 0; j < plans.length; j++) {
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
    };
    Week.prototype.loadDays = function (days) {
        this.daysPanel.loadDays(days);
    };
    Week.prototype.setupAll = function (DaysElement, TimeElement, GraphElement) {
        this.daysPanel.setup(DaysElement);
        this.graphPanel.setNativeElement(GraphElement);
        this.timePanel.setNativeElement(TimeElement);
    };
    Week.prototype.draw = function () {
        document.getElementById('container-week1').style.width = String(24 * this.hourWidth) + 'px';
        this.timePanel.setup(this.startHour, this.hourWidth);
        var count = this.timePanel.draw();
        this.graphPanel.setup(this.startHour, count, this.hourWidth);
        this.graphPanel.draw(this.tasks);
        this.daysPanel.draw();
    };
    return Week;
}());
/* harmony default export */ __webpack_exports__["a"] = (Week);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Time = (function () {
    function Time() {
    }
    Time.prototype.setup = function (start, hourWidth) {
        this.start = start;
        this.hourWidth = hourWidth;
    };
    Time.prototype.setNativeElement = function (element) {
        this.nativeElement = element;
    };
    Time.prototype.draw = function () {
        this.nativeElement.innerHTML = "";
        this.nativeElement.style.width = String(24 * this.hourWidth) + "px";
        var count = 24;
        var final = this.start + count;
        var begin = this.start;
        for (var i = begin; i < final; i++) {
            if (i >= 24) {
                i = i - 24;
                final = final - 24;
            }
            var newEl = document.createElement("div");
            var time = (i < 10) ? '0' + String(i) : String(i);
            newEl.innerHTML = time + ":00";
            newEl.className = "hour";
            newEl.style.width = this.hourWidth + "px";
            this.nativeElement.appendChild(newEl);
        }
        return count;
    };
    return Time;
}());
/* harmony default export */ __webpack_exports__["a"] = (Time);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Task = (function () {
    function Task() {
    }
    Task.prototype.setup = function (color, start, stop, day, id) {
        this.color = color;
        this.start = start;
        this.stop = stop;
        this.day = day;
        this.id = id;
    };
    Task.prototype.draw = function (parentElement, hour, day) {
        var newInEl = document.createElement("div");
        newInEl.className = "task";
        newInEl.id = "task" + String(hour) + String(day);
        newInEl.setAttribute("data-id", String(this.id));
        newInEl.style.background = this.color;
        newInEl.onclick = function (e) { this.elementClick(e); }.bind(this);
        parentElement.appendChild(newInEl);
        this.element = newInEl;
    };
    Task.prototype.elementClick = function (event) {
        var elementList = document.querySelectorAll('[data-id]');
        for (var i = 0; i < elementList.length; i++) {
            if (String(this.id) == elementList[i].getAttribute("data-id")) {
                console.log('Click');
            }
        }
    };
    Task.prototype.setStyle = function (styleName, styleValue) {
        if (this.element != null) {
            this.element.style[styleName] = styleValue;
        }
    };
    Task.prototype.clear = function () {
        if (this.element != null) {
            this.element.remove();
            this.element = null;
        }
    };
    return Task;
}());
/* harmony default export */ __webpack_exports__["a"] = (Task);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Graph = (function () {
    function Graph() {
        this.elementClick = function (e) {
        };
    }
    Graph.prototype.setNativeElement = function (element) {
        this.nativeElement = element;
    };
    Graph.prototype.setup = function (start, count, hourWidth) {
        this.start = start;
        this.count = count;
        this.hourWidth = hourWidth;
    };
    Graph.prototype.draw = function (tasks) {
        this.nativeElement.innerHTML = "";
        for (var i = this.start; i < this.start + this.count + 1; i++) {
            var newCollum = document.createElement("div");
            newCollum.className = "collumn";
            newCollum.style.width = this.hourWidth + "px";
            newCollum.style.height = 40 * 7 + "px";
            for (var j = 0; j < 7; j++) {
                var newEl = document.createElement("div");
                newEl.className = "cell";
                newEl.style.width = this.hourWidth + "px";
                if (i == this.start || i == this.start + this.count) {
                    newEl.style.width = 20 + "px";
                    newCollum.style.width = 20 + "px";
                }
                if (tasks[i][j].id != -1) {
                    tasks[i][j].draw(newEl, i, j);
                    if (i != this.start + this.count) {
                        if (tasks[i][j].id == tasks[i + 1][j].id) {
                            tasks[i][j].setStyle('marginRight', '0px');
                        }
                        else {
                            tasks[i][j].setStyle('borderTopRightRadius', '5px');
                            tasks[i][j].setStyle('borderBottomRightRadius', '5px');
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
                newCollum.appendChild(newEl);
            }
            this.nativeElement.appendChild(newCollum);
        }
    };
    return Graph;
}());
/* harmony default export */ __webpack_exports__["a"] = (Graph);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Days = (function () {
    function Days() {
    }
    Days.prototype.setup = function (element) {
        this.nativeElement = element;
    };
    Days.prototype.draw = function () {
        this.nativeElement.innerHTML = "";
        for (var i = 0; i < this.days.length; i++) {
            var newEl = document.createElement("div");
            newEl.innerHTML = this.days[i];
            newEl.className = "day";
            this.nativeElement.appendChild(newEl);
        }
    };
    Days.prototype.loadDays = function (days) {
        this.days = days;
    };
    return Days;
}());
/* harmony default export */ __webpack_exports__["a"] = (Days);


/***/ })
/******/ ]);