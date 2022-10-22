/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Canvas.js":
/*!***********************!*\
  !*** ./src/Canvas.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Collision__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Collision */ \"./src/Collision.js\");\n\r\n\r\nArray.prototype.remove = function (value) {\r\n    this.splice(this.indexOf(value), 1);\r\n}\r\n\r\n\r\nclass Canvas {\r\n    constructor(cnc) {\r\n        this.cnv = cnc;\r\n        this.cnc = cnc.getContext('2d');\r\n        this.start = false;\r\n        this.durraion = 3000;\r\n        this.lineArr = [];\r\n        this.collapseArr = [];\r\n        this.colisArr = [];\r\n        this.Draw = this.Draw.bind(this);\r\n        this.reDraw = this.reDraw.bind(this);\r\n        this.mainLoop = this.mainLoop.bind(this);\r\n        this.collapse = this.collapse.bind(this);\r\n        this.onMouseMove = this.onMouseMove.bind(this);\r\n        this.onMouseClick = this.onMouseClick.bind(this);\r\n    }\r\n\r\n    mainLoop(prev = 0) {\r\n        let prevTime = prev;\r\n        let curTime = (new Date()).getTime();\r\n        let deltaTime = curTime - prevTime;\r\n        if (this.collapseArr) {\r\n            for (let i = 0; i < this.collapseArr.length; i++) {\r\n                let middleX = Math.abs(this.collapseArr[i].x1 - this.collapseArr[i].x2) * this.durraion / 1000;\r\n                let middleY = Math.abs(this.collapseArr[i].y1 - this.collapseArr[i].y2) * this.durraion / 1000;\r\n                if (this.lineArr[i].collapseProgress <= 0) {\r\n                    this.lineArr.remove(i);\r\n                    this.collapseArr.remove(i)\r\n                } else {\r\n                    this.lineArr[i].collapseProgress -= (deltaTime / this.durraion);\r\n                    if (this.lineArr[i].x1 < this.lineArr[i].x2) {\r\n                        this.lineArr[i].x1 += middleX * (deltaTime / this.durraion);\r\n                        this.lineArr[i].x2 -= middleX * (deltaTime / this.durraion);\r\n                    } else {\r\n                        this.lineArr[i].x1 -= middleX * (deltaTime / this.durraion);\r\n                        this.lineArr[i].x2 += middleX * (deltaTime / this.durraion);\r\n                    }\r\n                    if (this.lineArr[i].y1 < this.lineArr[i].y2) {\r\n                        this.lineArr[i].y1 += middleY * (deltaTime / this.durraion);\r\n                        this.lineArr[i].y2 -= middleY * (deltaTime / this.durraion);\r\n                    } else {\r\n                        this.lineArr[i].y1 -= middleY * (deltaTime / this.durraion);\r\n                        this.lineArr[i].y2 += middleY * (deltaTime / this.durraion);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        this.reDraw();\r\n        window.requestAnimationFrame(() => this.mainLoop(curTime));\r\n    }\r\n\r\n    getMousePos(canvas, evt) {\r\n        let rect = canvas.getBoundingClientRect();\r\n        return {\r\n            x: evt.clientX - rect.left,\r\n            y: evt.clientY - rect.top\r\n        };\r\n    }\r\n\r\n    onMouseClick(event) {\r\n        let mouse = this.getMousePos(this.cnv, event);\r\n        this.Draw(mouse.x, mouse.y, 'onclick');\r\n\r\n    }\r\n\r\n    onMouseMove(event) {\r\n        let mouse = this.getMousePos(this.cnv, event);\r\n        this.Draw(mouse.x, mouse.y, 'onmousemove');\r\n    }\r\n\r\n    reDraw() {\r\n        this.collision = new _Collision__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.lineArr);\r\n        this.colisArr = this.collision.getCollisionPoints();\r\n        if (!this.lineArr) {\r\n            return null;\r\n        }\r\n        this.cnc.clearRect(0, 0, window.innerWidth, window.innerHeight);\r\n        this.cnc.strokeStyle = \"black\";\r\n        this.cnc.beginPath();\r\n        for (let elem of this.lineArr) {\r\n            this.cnc.moveTo(elem.x1, elem.y1);\r\n            this.cnc.lineTo(elem.x2, elem.y2)\r\n        }\r\n        if (this.colisArr !== []) {\r\n            for (let elem of this.colisArr) {\r\n                this.cnc.fillRect(elem.x - 5, elem.y - 5, 10, 10);\r\n                this.cnc.fillStyle = \"red\";\r\n            }\r\n        }\r\n\r\n        this.cnc.stroke();\r\n    }\r\n\r\n    Draw(x, y, eventType) {\r\n        this.cnc.beginPath();\r\n        this.reDraw();\r\n        this.cnc.strokeStyle = \"black\";\r\n        if (eventType === \"onclick\") {\r\n\r\n            if (!this.start) {\r\n                this.cnc.moveTo(x, y);\r\n                this.lineArr.push({x1: x, y1: y, x2: x, y2: y, collapseProgress: 1})\r\n                this.start = !this.start;\r\n            } else {\r\n                this.cnc.lineTo(x, y);\r\n                this.lineArr[this.lineArr.length - 1].x2 = x;\r\n                this.lineArr[this.lineArr.length - 1].y2 = y;\r\n                this.start = !this.start;\r\n            }\r\n        } else {\r\n            if (this.start) {\r\n                this.cnc.lineTo(x, y);\r\n                this.lineArr[this.lineArr.length - 1].x2 = x;\r\n                this.lineArr[this.lineArr.length - 1].y2 = y;\r\n            }\r\n        }\r\n        this.cnc.stroke();\r\n    }\r\n\r\n    collapse() {\r\n        this.collapseArr = Array.from(new Set(this.lineArr));\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Canvas);\n\n//# sourceURL=webpack://canvas/./src/Canvas.js?");

/***/ }),

/***/ "./src/Collision.js":
/*!**************************!*\
  !*** ./src/Collision.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Collision {\r\n    constructor(dots) {\r\n        this.dots = dots;\r\n        this.getCollisionPoints = this.getCollisionPoints.bind(this);\r\n    }\r\n\r\n    cross(x1, y1, x2, y2, x3, y3, x4, y4) {\r\n\r\n        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {\r\n            return false\r\n        }\r\n\r\n        let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))\r\n\r\n\r\n        if (denominator === 0) {\r\n            return false\r\n        }\r\n\r\n        let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator\r\n        let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator\r\n\r\n\r\n        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {\r\n            return false\r\n        }\r\n\r\n\r\n        let x = x1 + ua * (x2 - x1)\r\n        let y = y1 + ua * (y2 - y1)\r\n\r\n        return {x, y, stat: 1}\r\n    }\r\n\r\n    getCollisionPoints() {\r\n        if (this.dots === []) {\r\n            return [];\r\n        }\r\n        let collPoints = [];\r\n        for (let i = 0; i < this.dots.length; i++) {\r\n            for (let j = 0; j < this.dots.length; j++) {\r\n                if (i === j) continue;\r\n                let result = this.cross(\r\n                    this.dots[i].x1, this.dots[i].y1,\r\n                    this.dots[i].x2, this.dots[i].y2,\r\n                    this.dots[j].x1, this.dots[j].y1,\r\n                    this.dots[j].x2, this.dots[j].y2,\r\n                );\r\n                if (result.stat === 1) {\r\n                    collPoints.push({x: result.x, y: result.y});\r\n                }\r\n            }\r\n        }\r\n        return collPoints;\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Collision);\n\n//# sourceURL=webpack://canvas/./src/Collision.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas.js */ \"./src/Canvas.js\");\n\n\n\n\nconst canvas = document.getElementById(\"test\")\n\nconst clearButton = document.getElementById(\"clear\");\nlet myCanvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\ncanvas.addEventListener('click', (event) => myCanvas.onMouseClick(event));\ncanvas.addEventListener('mousemove', (event) => myCanvas.onMouseMove(event));\ncanvas.width = 800;\ncanvas.height = 800;\nmyCanvas.mainLoop();\n\nclearButton.addEventListener('click', myCanvas.collapse);\n\n\n\n\n\n\n//# sourceURL=webpack://canvas/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;