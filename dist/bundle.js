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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(14);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createElement; });
function createElement(type, className, parent) {
    let element = document.createElement(type);
    element.className = className;
    parent.appendChild(element);
    return element;
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return dbInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getTasks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getWeeks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return deleteTask; });
/* unused harmony export changeTask */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getTasksByDay; });
/* unused harmony export deleteWeek */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__week_task__ = __webpack_require__(5);

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
        tx.executeSql("CREATE TABLE IF NOT EXISTS weeks (ID INTEGER PRIMARY KEY ASC, number INTEGER)", []);
    });
}
function createWeek(callback) {
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    getWeeks(function (weeks) {
        db.transaction(function (tx) {
            tx.executeSql("INSERT INTO weeks (number) VALUES(?)", [weeks.length + 1], function (transaction, result) {
                console.log(result);
                callback(true);
            }, function (transaction, error) {
                callback(false);
                throw new Error(error);
            });
        });
    });
}
function deleteWeek(wek_id, callback) {
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("DELETE FROM weeks WHERE ID=?", [wek_id], function (transaction, result) {
            callback(true);
        }, function (transaction, error) {
            console.log(error);
            callback(false);
        });
    });
    return true;
}
function createTask(task, callback) {
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO tasks (text,start,stop,day,color,week_id) VALUES(?,?,?,?,?,?)", [task.text, task.start, task.stop, task.day, task.color, task.week_id], function (transaction, result) {
            console.log(result);
            callback(true);
        }, function (transaction, error) {
            console.log(error);
            callback(false);
        });
    });
    return true;
}
function getTasks(week_id, callback) {
    let final = [];
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM tasks WHERE week_id = ?", [week_id], function (tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                let now_task = new __WEBPACK_IMPORTED_MODULE_0__week_task__["a" /* default */](result.rows.item(i).text, result.rows.item(i).color, result.rows.item(i).start, result.rows.item(i).stop, result.rows.item(i).day, result.rows.item(i).ID, result.rows.item(i).week_id);
                final.push(now_task);
            }
            callback(final);
        });
    });
}
function getTasksByDay(week_id, day, callback) {
    let final = [];
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM tasks WHERE week_id = ? and day = ?", [week_id, day], function (tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                let now_task = new __WEBPACK_IMPORTED_MODULE_0__week_task__["a" /* default */](result.rows.item(i).text, result.rows.item(i).color, result.rows.item(i).start, result.rows.item(i).stop, result.rows.item(i).day, result.rows.item(i).ID, result.rows.item(i).week_id);
                final.push(now_task);
            }
            callback(final);
        });
    });
}
function getWeeks(callback) {
    let final = [];
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM weeks", [], function (tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                final.push({ week_id: Number(result.rows.item(i).ID), week_number: Number(result.rows.item(i).number) });
            }
            callback(final);
        });
    });
}
function deleteTask(task_id, callback) {
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("DELETE FROM tasks WHERE ID=?", [task_id], function (transaction, result) {
            callback(true);
        }, function (transaction, error) {
            console.log(error);
            callback(false);
        });
    });
    return true;
}
function changeTask(up_task, callback) {
    console.log(up_task.text, up_task.id);
    if (!db)
        throw new Error("DB is not init, use dbInit()");
    db.transaction(function (tx) {
        tx.executeSql("update tasks set text=?, start=?, stop=?, day=?, color=?, week_id=? " +
            " where ID=? ", [up_task.text, up_task.start, up_task.stop,
            up_task.day, up_task.color, up_task.week_id,
            up_task.id], function (transaction, result) {
            console.log(result);
            callback(true);
        }, function (transaction, error) {
            console.log(error);
            callback(false);
        });
    });
    return true;
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Draw", function() { return Draw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redrawWeek", function() { return redrawWeek; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__week_week__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__week_task__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functions_functions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_db_api__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__time__ = __webpack_require__(31);





let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let currentWeek = 2;
let startHour = 11;
let currentWeeks = [];
Object(__WEBPACK_IMPORTED_MODULE_3__db_db_api__["c" /* dbInit */])();
function redrawWeek(id) {
    currentWeeks.map(function (item) {
        if (item.data.week_id == id) {
            Object(__WEBPACK_IMPORTED_MODULE_3__db_db_api__["e" /* getTasks */])(item.data.week_id, function (tasks) {
                item.loadTasks(tasks);
                item.draw();
            });
        }
    });
}
function clear(classType) {
    let elements = document.getElementsByClassName(classType);
    for (let i = elements.length; i--;) {
        elements[i].remove();
    }
}
function drawButton() {
    let buttonShell = Object(__WEBPACK_IMPORTED_MODULE_2__functions_functions__["a" /* createElement */])("div", "buttonShell", document.body);
    let button = Object(__WEBPACK_IMPORTED_MODULE_2__functions_functions__["a" /* createElement */])("div", "button createWeek", buttonShell);
    button.innerText = "Create week";
    button.onclick = function () {
        buttonShell.style.display = "none";
        Object(__WEBPACK_IMPORTED_MODULE_3__db_db_api__["b" /* createWeek */])(function (res) {
            if (!res)
                return;
            Draw();
            buttonShell.style.display = "block";
        });
    };
}
function Draw() {
    clear("paper  main-container");
    clear("buttonShell");
    clear("taskTooltip");
    Object(__WEBPACK_IMPORTED_MODULE_3__db_db_api__["g" /* getWeeks */])(function (weeks) {
        if (weeks.length == 0) {
            drawButton();
        }
        let nowData = Object(__WEBPACK_IMPORTED_MODULE_4__time__["a" /* getTimeDataSecond */])(weeks);
        currentWeek = nowData.currentWeek;
        startHour = nowData.currentHour;
        weeks.map(function (item, index) {
            Object(__WEBPACK_IMPORTED_MODULE_3__db_db_api__["e" /* getTasks */])(item.week_id, function (tasks) {
                let week = new __WEBPACK_IMPORTED_MODULE_0__week_week__["a" /* Week */](item.week_number, item.week_id);
                week.create(document.body, (item.week_number == currentWeek));
                week.loadDays(days);
                week.setStartHour(startHour);
                week.loadTasks(tasks);
                week.draw();
                currentWeeks.push(week);
                if (index == weeks.length - 1) {
                    drawButton();
                }
            });
        });
    });
}
Draw();
Object(__WEBPACK_IMPORTED_MODULE_4__time__["b" /* notificationManager */])(new __WEBPACK_IMPORTED_MODULE_1__week_task__["a" /* default */]("", "", 0, 0, 0, -1, 0));



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tooltip__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__features_popup_contents_task_change_task_change__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__features_popup_popup__ = __webpack_require__(8);



class Task {
    constructor(text, color, start, stop, day, id, week_id) {
        this.currentGroup = 0;
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
    setAtrib(name, value) {
        this.element.setAttribute(name, value);
    }
    setTooltip() {
        this.tooltipElement = new __WEBPACK_IMPORTED_MODULE_0__tooltip__["a" /* default */](this.text, this.color, this.start, this.stop);
    }
    elementClick(event) {
        let content = new __WEBPACK_IMPORTED_MODULE_1__features_popup_contents_task_change_task_change__["a" /* default */]();
        content.setCurrentTask(this);
        let popup = Object(__WEBPACK_IMPORTED_MODULE_2__features_popup_popup__["a" /* getPopup */])();
        popup.open(content);
    }
    elementHover(event) {
        let elementList = document.querySelectorAll('[data-group]');
        let tasksElements = [];
        let currentDataGroupEl = event.srcElement.getAttribute("data-group");
        for (let i = 0; i < elementList.length; i++) {
            if (currentDataGroupEl == elementList[i].getAttribute("data-group")) {
                tasksElements.push(i);
            }
        }
        if (tasksElements.length != 0) {
            let begin = elementList[tasksElements[0]].getBoundingClientRect().left;
            let top = elementList[tasksElements[0]].getBoundingClientRect().top - 10;
            let done = elementList[tasksElements[tasksElements.length - 1]].getBoundingClientRect().left +
                elementList[tasksElements[tasksElements.length - 1]].getBoundingClientRect().width;
            if (begin < 0) {
                done -= begin;
                begin -= begin;
            }
            let middle = begin + Math.floor((done - begin) / 2);
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return drawButtons; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_functions__ = __webpack_require__(2);

function drawButtons(buttons, parent) {
    let wrapper = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("div", "buttonWrapper", parent);
    buttons.map(function (item) {
        let now = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("div", "button", wrapper);
        now.innerText = item.name;
        now.style.background = item.bg;
        now.style.color = item.color;
        now.style['float'] = item.float;
        now.style.border = "1px solid " + item.border;
        now.onclick = function () { item.click(); };
    });
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return drawColor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_functions__ = __webpack_require__(2);

function drawColor(colors, callback, parent) {
    let final = [];
    let wrapper = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("div", "colorWrapper", parent);
    wrapper.innerHTML = "<div>Colors</div>";
    colors.map(function (item) {
        let now = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("div", "colorPopup", wrapper);
        now.style.background = item;
        now.onclick = function () { callback(item); };
        final.push(now);
    });
    return final;
}



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPopup; });
__webpack_require__(18);
class Popup {
    constructor() {
        this.now_open = false;
        let newBackground = document.createElement("div");
        newBackground.className = "popupBack close";
        this.background = newBackground;
        this.background.onclick = function (e) {
            if (e.srcElement.className != this.background.className)
                return;
            this.close();
        }.bind(this);
        document.body.appendChild(newBackground);
    }
    open(content) {
        if (this.now_open) {
            this.close();
        }
        this.now_open = true;
        this.background.className = "popupBack open";
        document.body.style.overflow = 'hidden';
        content.draw(this.background, function () { this.close(); }.bind(this));
    }
    close() {
        this.now_open = false;
        this.background.className = "popupBack close";
        document.body.style.overflow = 'auto';
        this.background.innerHTML = null;
    }
}
let currentPopup;
function getPopup() {
    if (!currentPopup) {
        currentPopup = new Popup();
    }
    return currentPopup;
}



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Week; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__time__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__days__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__features_popup_popup__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__features_popup_contents_week_settings_week_change__ = __webpack_require__(32);






__webpack_require__(29);
class Week {
    constructor(week_number, week_id) {
        this.hourWidth = 80;
        this.startHour = 13;
        this.data = { week_id, week_number };
        this.timePanel = new __WEBPACK_IMPORTED_MODULE_0__time__["a" /* default */]();
        this.graphPanel = new __WEBPACK_IMPORTED_MODULE_2__graph__["a" /* default */]();
        this.daysPanel = new __WEBPACK_IMPORTED_MODULE_3__days__["a" /* default */]();
    }
    create(parent, currentWeek) {
        let wrap = document.createElement("div");
        wrap.className = "paper  main-container";
        let up = document.createElement("div");
        up.className = (currentWeek) ? "up active" : "up";
        let upText = document.createElement("div");
        upText.className = "weekUpText";
        upText.innerHTML = "Week " + String(this.data.week_number);
        up.appendChild(upText);
        let settings = document.createElement("div");
        settings.innerHTML =
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width="512px" height="512px">` +
                `<g>` +
                `<path d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z" fill="#3e97f3"/>` +
                `<path d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z" fill="#3e97f3"/>` +
                `<path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z" fill="#3e97f3"/>` +
                `</g>` +
                `</svg>`;
        settings.className = "settingsButtonWeek";
        up.appendChild(settings);
        wrap.appendChild(up);
        upText.onclick = function (e) {
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
        settings.onclick = function (e) {
            let content = new __WEBPACK_IMPORTED_MODULE_5__features_popup_contents_week_settings_week_change__["a" /* default */](this.data.week_id);
            let popup = Object(__WEBPACK_IMPORTED_MODULE_4__features_popup_popup__["a" /* getPopup */])();
            popup.open(content);
        }.bind(this);
        let grid = document.createElement("div");
        grid.id = "grid" + String(this.data.week_number);
        let header = document.createElement("div");
        header.className = "header";
        header.id = "header" + String(this.data.week_number);
        let container = document.createElement("div");
        container.className = "container-week";
        container.id = "container-week" + String(this.data.week_number);
        grid.appendChild(header);
        grid.appendChild(container);
        let days = document.createElement("div");
        let graph = document.createElement("div");
        days.id = "days" + String(this.data.week_number);
        days.className = "days";
        graph.id = "graph" + String(this.data.week_number);
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
            let now = (i > 24) ? i - 24 : i;
            timePlans[i + 1] = new Array(7);
            for (let j = 0; j < 7; j++) {
                timePlans[i + 1][j] = new __WEBPACK_IMPORTED_MODULE_1__task__["a" /* default */]("", "", 0, 0, 0, 0, 0);
                timePlans[i + 1][j].id = -1;
            }
            for (let j = 0; j < plans.length; j++) {
                if (now >= plans[j].start && now < plans[j].stop) {
                    timePlans[i + 1][plans[j].day] = plans[j];
                }
                else if (plans[j].start == 0 && now == 24) {
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
        this.container.style.width = String(24.5 * this.hourWidth) + 'px';
        this.timePanel.setup(this.startHour, this.hourWidth);
        let count = this.timePanel.draw();
        this.graphPanel.setup(this.startHour, count, this.hourWidth, this.data.week_number);
        this.graphPanel.draw(this.tasks);
        this.daysPanel.draw();
    }
}



/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(12);
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
        let time = document.createElement("div");
        text.className = "tooltipText";
        time.className = "tooltipTime";
        text.innerText = this.text;
        time.innerText = String(this.start) +
            ":00 - " + String(this.stop) + ":00";
        this.element.appendChild(text);
        this.element.appendChild(time);
    }
    draw(top, left) {
        this.element.className = "taskTooltip active";
        let borderRight = window.innerWidth;
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./tooltip.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./tooltip.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".taskTooltip{\r\n    position: absolute;\r\n    height: 0;\r\n    width:0;\r\n    overflow: hidden;\r\n    opacity: 0;\r\n    transition: opacity 0.3s ease-in-out;\r\n    font-family: Helvetica-Light;\r\n    padding: 5px;\r\n}\r\n.taskTooltip.active{\r\n    height: 40px;\r\n    opacity: 1;\r\n    z-index: 999;\r\n    width: 150px;\r\n    background: #ffffff;\r\n    border-radius: 5px;\r\n    /*border: #3e97f3 1px solid;*/\r\n    box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.17);\r\n}\r\n.tooltipText{\r\n    display: inline-block;\r\n    font-size: 18px;\r\n}\r\n.tooltipTime{\r\n    font-size: 14px;\r\n}\r\n.tooltipColor{\r\n    width:10px;\r\n    height:10px;\r\n    display: inline-block;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_functions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_popup_basic_functions__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__task_basic_functions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_db_api__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app__ = __webpack_require__(4);





__webpack_require__(16);
class TaskChange {
    constructor() {
        this.colorsList = ["#cbf0e8", "#ffd9a5", "#dae8f5"];
        this.colorsElements = [];
        this.currentColor = this.colorsList[0];
        this.buttons = [{ name: "Exit", click: function () { }, bg: "#f4f4f4",
                color: "#59606a", border: "#f4f4f4", float: "left" },
            { name: "Save", click: function () { this.save(); }.bind(this), bg: "#3b9fff",
                color: "#fff", border: "#177bf3", float: "right" },
            { name: "Delete", click: function () { this.delete(); }.bind(this), bg: "#f4f4f4",
                color: "#59606a", border: "#f4f4f4", float: "right" },];
    }
    draw(background, closePopup) {
        this.currentColor = this.currentTask.color;
        this.closePopup = closePopup;
        this.buttons[0].click = function () { closePopup(); };
        if (!this.currentTask)
            return;
        this.element = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("div", "", background);
        this.element.innerHTML =
            "<div class='popupContent task_create'>" +
                "<div>Change task</div>" +
                "<hr/>" +
                "<div>" +
                "<div>Name</div>" +
                `<input id='namePopup' value=${this.currentTask.text}>` +
                "</div>" +
                "<div class='timeChoosePopup'>" +
                "<div>Time</div>" +
                `<input value=${this.currentTask.start} id='startTimePopup'>` +
                " - " +
                `<input value=${this.currentTask.stop} id='stopTimePopup'>` +
                "</div>" +
                "</div>";
        this.colorsElements =
            Object(__WEBPACK_IMPORTED_MODULE_2__task_basic_functions__["a" /* drawColor */])(this.colorsList, function (click_color) {
                this.currentColor = click_color;
                this.drawColors();
            }.bind(this), this.element.children[0]);
        this.drawColors();
        Object(__WEBPACK_IMPORTED_MODULE_1__popup_popup_basic_functions__["a" /* drawButtons */])(this.buttons, this.element.children[0]);
    }
    setCurrentTask(task) {
        this.currentTask = task;
    }
    drawColors() {
        console.log(this.currentTask);
        this.colorsList.map(function (item, index) {
            if (item == this.currentColor) {
                this.colorsElements[index].className = "colorPopup current";
            }
            else {
                this.colorsElements[index].className = "colorPopup";
            }
        }.bind(this));
    }
    save() {
        console.log(this.currentTask);
        this.currentTask.text = document.getElementById("namePopup")['value'];
        this.currentTask.start = Number(document.getElementById("startTimePopup")['value']);
        this.currentTask.stop = Number(document.getElementById("stopTimePopup")['value']);
        this.currentTask.color = this.currentColor;
        Object(__WEBPACK_IMPORTED_MODULE_3__db_db_api__["a" /* createTask */])(this.currentTask, function (result) {
            if (result) {
                this.closePopup();
                Object(__WEBPACK_IMPORTED_MODULE_4__app__["redrawWeek"])(this.currentTask.week_id);
            }
        }.bind(this));
    }
    delete() {
        Object(__WEBPACK_IMPORTED_MODULE_3__db_db_api__["d" /* deleteTask */])(this.currentTask.id, function (result) {
            if (result) {
                this.closePopup();
                Object(__WEBPACK_IMPORTED_MODULE_4__app__["redrawWeek"])(this.currentTask.week_id);
            }
        }.bind(this));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (TaskChange);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./task_change.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./task_change.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./popup.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./popup.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".popupBack{\r\n    position: fixed;\r\n    z-index: 9999;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n.popupBack.close{\r\n    width: 0;\r\n    height: 0;\r\n    background-color: rgba(0,0,0,0);\r\n}\r\n\r\n.popupBack.open{\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background-color: rgba(0,0,0,0.7);\r\n}\r\n.popupContent{\r\n    background: #fff;\r\n    overflow: hidden;\r\n    font-family: Helvetica-Light;\r\n    padding: 10px;\r\n    background: #fff;\r\n    position: fixed;\r\n    border-radius: 5px;\r\n    opacity: 1;\r\n}\r\n.buttonWrapper{\r\n    margin-top: 30px;\r\n}\r\n.button{\r\n    padding: 5px 20px;\r\n    width: max-content;\r\n    border-radius: 2px;\r\n    cursor: pointer;\r\n    display: inline-block;\r\n    user-select: none;\r\n    font-family: Helvetica-Regular;\r\n    font-size: 12px !important;\r\n    margin: 0px 5px;\r\n}\r\n\r\n.button:active{\r\n    border: none !important;\r\n    padding: 6px 21px;\r\n}", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__features_popup_popup__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__features_popup_contents_task_create_task_create__ = __webpack_require__(21);



__webpack_require__(24);
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
        let lastJ = 0;
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
                if (i == this.start) {
                    newEl.style.width = 20 + "px";
                    newColumn.style.width = 20 + "px";
                }
                if (tasks[i][j].id != -1) {
                    tasks[i][j].draw(newEl, i, j, this.week_number);
                    tasks[i][j].setAtrib("data-group", String(tasks[i][j].currentGroup) + ":" + String(tasks[i][j].id));
                    if (i != this.start + this.count) {
                        if (tasks[i][j].id == tasks[i + 1][j].id) {
                            tasks[i][j].setStyle('marginRight', '0px');
                        }
                        else {
                            tasks[i][j].setStyle('borderTopRightRadius', '5px');
                            tasks[i][j].setStyle('borderBottomRightRadius', '5px');
                            tasks[i][j].setTooltip();
                            if (j != lastJ)
                                tasks[i][j].currentGroup++;
                            lastJ = j;
                        }
                    }
                    else {
                        tasks[i][j].setStyle('borderTopRightRadius', '5px');
                        tasks[i][j].setStyle('borderBottomRightRadius', '5px');
                        tasks[i][j].setTooltip();
                        if (j != lastJ)
                            tasks[i][j].currentGroup++;
                        lastJ = j;
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
                else if (i != this.start) {
                    let newInEl = document.createElement("div");
                    newInEl.className = "empty_cell";
                    newInEl.onclick = function (e) {
                        let startTask = (i > 24) ? i - 24 : i;
                        let content = new __WEBPACK_IMPORTED_MODULE_2__features_popup_contents_task_create_task_create__["a" /* default */]();
                        content.setCurrentTask(new __WEBPACK_IMPORTED_MODULE_0__task__["a" /* default */]("", "#fff", startTask - 1, startTask, j, 0, this.week_number));
                        let popup = Object(__WEBPACK_IMPORTED_MODULE_1__features_popup_popup__["a" /* getPopup */])();
                        popup.open(content);
                    }.bind(this);
                    newEl.appendChild(newInEl);
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_functions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_popup_basic_functions__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__task_basic_functions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_db_api__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app__ = __webpack_require__(4);





__webpack_require__(22);
class TaskCreate {
    constructor() {
        this.colorsList = ["#cbf0e8", "#ffd9a5", "#dae8f5"];
        this.colorsElements = [];
        this.currentColor = this.colorsList[0];
        this.buttons = [{ name: "Exit", click: function () { }, bg: "#f4f4f4",
                color: "#59606a", border: "#f4f4f4", float: "left" },
            { name: "Create", click: function () { this.create(); }.bind(this), bg: "#3b9fff",
                color: "#fff", border: "#177bf3", float: "right" }];
    }
    draw(background, closePopup) {
        this.closePopup = closePopup;
        this.buttons[0].click = function () { closePopup(); };
        if (!this.currentTask)
            return;
        this.element = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("div", "", background);
        this.element.innerHTML =
            "<div class='popupContent task_create'>" +
                "<div>Create task</div>" +
                "<hr/>" +
                "<div>" +
                "<div>Name</div>" +
                "<input id='namePopup'>" +
                "</div>" +
                "<div class='timeChoosePopup'>" +
                "<div>Time</div>" +
                `<input value=${this.currentTask.start} id='startTimePopup'>` +
                " - " +
                `<input value=${this.currentTask.stop} id='stopTimePopup'>` +
                "</div>" +
                "</div>";
        this.colorsElements =
            Object(__WEBPACK_IMPORTED_MODULE_2__task_basic_functions__["a" /* drawColor */])(this.colorsList, function (click_color) {
                this.currentColor = click_color;
                this.drawColors();
            }.bind(this), this.element.children[0]);
        this.drawColors();
        Object(__WEBPACK_IMPORTED_MODULE_1__popup_popup_basic_functions__["a" /* drawButtons */])(this.buttons, this.element.children[0]);
    }
    setCurrentTask(task) {
        this.currentTask = task;
    }
    drawColors() {
        console.log(this.currentTask);
        this.colorsList.map(function (item, index) {
            if (item == this.currentColor) {
                this.colorsElements[index].className = "colorPopup current";
            }
            else {
                this.colorsElements[index].className = "colorPopup";
            }
        }.bind(this));
    }
    create() {
        console.log(this.currentTask);
        this.currentTask.text = document.getElementById("namePopup")['value'];
        this.currentTask.start = Number(document.getElementById("startTimePopup")['value']);
        this.currentTask.stop = Number(document.getElementById("stopTimePopup")['value']);
        this.currentTask.color = this.currentColor;
        Object(__WEBPACK_IMPORTED_MODULE_3__db_db_api__["a" /* createTask */])(this.currentTask, function (result) {
            if (result) {
                console.log("Result");
                this.closePopup();
                Object(__WEBPACK_IMPORTED_MODULE_4__app__["redrawWeek"])(this.currentTask.week_id);
            }
        }.bind(this));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (TaskCreate);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./task_create_style.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./task_create_style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".task_create{\r\n    width: 300px;\r\n    height: 180px;\r\n    left: calc(50vw - 150px);\r\n    top: calc(50vh - 90px);\r\n}\r\n.task_create div{\r\n    font-size: 14px;\r\n\r\n}\r\n.task_create input{\r\n    background: #efefef;\r\n    border: 1px solid rgba(0,0,0,0.1);\r\n    border-radius: 5px;\r\n}\r\n.task_create input:focus{\r\n    outline: none;\r\n}\r\n#startTimePopup,\r\n#stopTimePopup{\r\n    width: 30px;\r\n}\r\n.timeChoosePopup{\r\n    margin-top: 10px;\r\n}\r\n.colorPopup{\r\n    height: 20px;\r\n    cursor: pointer;\r\n    width: 20px;\r\n    border-radius: 2px;\r\n    box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.39);\r\n    display: inline-block;\r\n    margin-right: 10px;\r\n}\r\n.colorPopup:hover{\r\n    box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.25);\r\n}\r\n.colorPopup.current{\r\n    box-shadow: 1px 1px 5px 1px rgba(0,0,0,0);\r\n}\r\n.colorWrapper{\r\n    display: inline-block;\r\n    margin-left: 20px;\r\n    margin-top: 10px;\r\n}\r\n.timeChoosePopup{\r\n    display: inline-block;\r\n    float:left;\r\n}", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./graph.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./graph.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".graph{\r\n    /*width:100vw;*/\r\n    overflow: hidden;\r\n}\r\n.cell{\r\n    height: 41px !important;\r\n    display: inline-block;\r\n    border: 1px solid rgba(206, 206, 206,0.2);\r\n    border-left: none;\r\n    margin-top: -5px;\r\n    border-top: none;\r\n    cursor: pointer;\r\n}\r\n.empty_cell{\r\n    width: 100%;\r\n    /*height: 99%;*/\r\n    height: 41px;\r\n\r\n    /*overflow-y: hidden;*/\r\n\r\n}\r\n.empty_cell:hover{\r\n    background: #9dd3ff;\r\n    opacity: 0.3;\r\n\r\n\r\n}\r\n.column{\r\n    display: inline-block;\r\n}\r\n.task{\r\n    /*padding: 10px;*/\r\n    height: 20px;\r\n    margin: 10px;\r\n}\r\n.container-week{\r\n    overflow-x: hidden;\r\n    word-wrap: break-word;\r\n    min-height: calc(100% - 50px);\r\n}\r\n.grid{\r\n    overflow-x: auto ;\r\n    padding-left: 35px;\r\n}", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(27);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./days.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./days.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".days{\r\n    float: left;\r\n    height: 280px;\r\n    margin-top: -20px;\r\n    padding-top: 16px;\r\n    background: #fff;\r\n    position: absolute;\r\n    left: 15px;\r\n    width: 40px;\r\n    transition: height 0.3s ease-out;\r\n    overflow-y: hidden;\r\n}\r\n.days.close{\r\n    height: 0;\r\n}\r\n.day{\r\n    height: 20px;\r\n    background: #fff;\r\n    font-size: 12px;\r\n    text-align: center;\r\n    margin-bottom: 20px;\r\n    line-height: 3;\r\n}", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./week.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./week.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".header{\r\n    padding-left: 5px;\r\n    margin: 5px 0;\r\n}\r\n.hour{\r\n    display: inline-block;\r\n    font-size: 12px;\r\n}\r\n.up{\r\n    text-align: center;\r\n    font-size: 14px;\r\n    opacity: 0.9;\r\n    padding-bottom: 5px;\r\n    border-bottom: 1px solid #efefef;\r\n    user-select: none;\r\n    height: 15px;\r\n}\r\n.up:hover{\r\n    color:#3e97f3;\r\n}\r\n.up.active{\r\n    color:#3e97f3;\r\n}\r\n.paper{\r\n    background: #fff;\r\n    color:#707070;\r\n    font-family: Helvetica-Light;\r\n    padding: 10px;\r\n    border-radius: 5px;\r\n    margin-top: 10px;\r\n    border:0.1px solid #efefef;\r\n}\r\n.main-container{\r\n    height: 351px;\r\n    transition: height 0.3s ease-out;\r\n    overflow-y: hidden;\r\n}\r\n.main-container.closed{\r\n    height: 40px;\r\n}\r\n.settingsButtonWeek{\r\n    width:15px;\r\n    display: inline-block;\r\n    float:right;\r\n    margin-right: 10px;\r\n}\r\n.settingsButtonWeek svg{\r\n    width:25px;\r\n    height:15px;\r\n    cursor: pointer;\r\n}\r\n.settingsButtonWeek:hover{\r\n    opacity: 0.6;\r\n}\r\n.settingsButtonWeek:active{\r\n    opacity: 0.3;\r\n}\r\n.weekUpText{\r\n   float:left;\r\n   cursor: pointer;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getTimeDataFirst */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getTimeDataSecond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return notificationManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_db_api__ = __webpack_require__(3);

Date.prototype['getWeekNumber'] = function () {
    let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};
let nowTimeout;
console.log('The current ISO week number is ' + new Date("21 May 1958 10:12")['getWeekNumber']());
function getTimeDataFirst(callBack) {
    let final = { currentDay: 0, currentWeek: 0, currentHour: 0 };
    let now = new Date();
    final.currentWeek = now['getWeekNumber']();
    final.currentDay = now.getDay();
    final.currentHour = now.getHours();
    Object(__WEBPACK_IMPORTED_MODULE_0__db_db_api__["g" /* getWeeks */])(function (weeks) {
        let maxWeekNumber = Math.max.apply(Math, weeks);
        let processDate = final.currentWeek % maxWeekNumber;
        if (processDate == 0) {
            final.currentWeek = maxWeekNumber;
        }
        else {
            for (let i = 1; i < maxWeekNumber; i++) {
                if (processDate == i / maxWeekNumber) {
                    final.currentWeek = i;
                }
            }
        }
        callBack(final);
    });
}
function getTimeDataSecond(weeks) {
    let final = { currentDay: 0, currentWeek: 0, currentHour: 0 };
    let weeksNumbers = weeks.map((i) => i.week_number);
    let now = new Date();
    final.currentWeek = now['getWeekNumber']();
    final.currentDay = now.getDay();
    final.currentHour = now.getHours();
    let maxWeekNumber = Math.max.apply(Math, weeksNumbers);
    let processDate = final.currentWeek % maxWeekNumber;
    if (processDate == 0) {
        final.currentWeek = maxWeekNumber;
    }
    else {
        for (let i = 1; i < maxWeekNumber; i++) {
            if (processDate == i / maxWeekNumber) {
                final.currentWeek = i;
            }
        }
    }
    return final;
}
function notificationManager(lastTask) {
    clearTimeout(nowTimeout);
    getTimeDataFirst(function (data) {
        Object(__WEBPACK_IMPORTED_MODULE_0__db_db_api__["f" /* getTasksByDay */])(data.currentWeek, data.currentDay - 1, function (tasks) {
            tasks.map(function (item) {
                console.log(data.currentDay);
                if (data.currentHour >= item.start && data.currentHour < item.stop) {
                    if (lastTask.id != item.id) {
                        lastTask = item;
                    }
                }
            });
            nowTimeout = setTimeout(function () {
                notificationManager(lastTask);
            }, (60 - new Date().getMinutes()) * 60000);
        });
    });
}



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_functions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_popup_basic_functions__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app__ = __webpack_require__(4);



__webpack_require__(33);
class WeekChange {
    constructor(currentWeek) {
        this.buttons = [{ name: "Exit", click: function () { }, bg: "#f4f4f4",
                color: "#59606a", border: "#f4f4f4", float: "left" },
            { name: "Save", click: function () { this.save(); }.bind(this), bg: "#3b9fff",
                color: "#fff", border: "#177bf3", float: "right" },
            { name: "Delete", click: function () { this.delete(); }.bind(this), bg: "#f4f4f4",
                color: "#59606a", border: "#f4f4f4", float: "right" },];
        this.currentWeek = currentWeek;
    }
    draw(background, closePopup) {
        this.closePopup = closePopup;
        this.buttons[0].click = function () { closePopup(); };
        this.element = Object(__WEBPACK_IMPORTED_MODULE_0__functions_functions__["a" /* createElement */])("div", "", background);
        this.element.innerHTML =
            "<div class='popupContent week_change'>" +
                "<div>Change week</div>" +
                "<hr/>" +
                "</div>";
        Object(__WEBPACK_IMPORTED_MODULE_1__popup_popup_basic_functions__["a" /* drawButtons */])(this.buttons, this.element.children[0]);
        background.appendChild(this.element);
    }
    save() {
    }
    delete() {
        deleteWeek(this.currentTask.id, function (result) {
            if (result) {
                this.closePopup();
                Object(__WEBPACK_IMPORTED_MODULE_2__app__["redrawWeek"])(this.currentTask.week_id);
            }
        }.bind(this));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (WeekChange);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./week_change.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./week_change.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".week_change{\r\n    width: 300px;\r\n    height: 180px;\r\n    left: calc(50vw - 150px);\r\n    top: calc(50vh - 90px);\r\n}\r\n.week_change{\r\n    font-size: 14px;\r\n}", ""]);

// exports


/***/ })
/******/ ]);