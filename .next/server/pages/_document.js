"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.js":
/*!****************************!*\
  !*** ./pages/_document.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Document)\n/* harmony export */ });\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Document() {\n  const setInitialTheme = `\n    function getInitialTheme() {\n      const storedTheme = window.localStorage.getItem('theme');\n      if (storedTheme) return storedTheme;\n      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';\n    }\n    const theme = getInitialTheme();\n    document.documentElement.classList.add(theme);\n  `;\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_0__.Html, {\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(next_document__WEBPACK_IMPORTED_MODULE_0__.Head, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(\"body\", {\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"script\", {\n        dangerouslySetInnerHTML: {\n          __html: setInitialTheme\n        }\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(next_document__WEBPACK_IMPORTED_MODULE_0__.Main, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(next_document__WEBPACK_IMPORTED_MODULE_0__.NextScript, {})]\n    })]\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBNEQ7QUFBQTtBQUU3QyxTQUFTUSxRQUFRQSxDQUFBLEVBQUc7RUFDakMsTUFBTUMsZUFBZSxHQUFJO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztFQUVELG9CQUNFRix1REFBQSxDQUFDUCwrQ0FBSTtJQUFBVSxRQUFBLGdCQUNITCxzREFBQSxDQUFDSiwrQ0FBSSxJQUFFLENBQUMsZUFDUk0sdURBQUE7TUFBQUcsUUFBQSxnQkFDRUwsc0RBQUE7UUFBUU0sdUJBQXVCLEVBQUU7VUFBRUMsTUFBTSxFQUFFSDtRQUFnQjtNQUFFLENBQUUsQ0FBQyxlQUNoRUosc0RBQUEsQ0FBQ0gsK0NBQUksSUFBRSxDQUFDLGVBQ1JHLHNEQUFBLENBQUNGLHFEQUFVLElBQUUsQ0FBQztJQUFBLENBQ1YsQ0FBQztFQUFBLENBQ0gsQ0FBQztBQUVYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFkb3RpLWRhaWx5LW1hcnQvLi9wYWdlcy9fZG9jdW1lbnQuanM/NTM4YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdG1sLCBIZWFkLCBNYWluLCBOZXh0U2NyaXB0IH0gZnJvbSAnbmV4dC9kb2N1bWVudCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRG9jdW1lbnQoKSB7XG4gIGNvbnN0IHNldEluaXRpYWxUaGVtZSA9IGBcbiAgICBmdW5jdGlvbiBnZXRJbml0aWFsVGhlbWUoKSB7XG4gICAgICBjb25zdCBzdG9yZWRUaGVtZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWUnKTtcbiAgICAgIGlmIChzdG9yZWRUaGVtZSkgcmV0dXJuIHN0b3JlZFRoZW1lO1xuICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcyA/ICdkYXJrJyA6ICdsaWdodCc7XG4gICAgfVxuICAgIGNvbnN0IHRoZW1lID0gZ2V0SW5pdGlhbFRoZW1lKCk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhlbWUpO1xuICBgO1xuXG4gIHJldHVybiAoXG4gICAgPEh0bWw+XG4gICAgICA8SGVhZCAvPlxuICAgICAgPGJvZHk+XG4gICAgICAgIDxzY3JpcHQgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzZXRJbml0aWFsVGhlbWUgfX0gLz5cbiAgICAgICAgPE1haW4gLz5cbiAgICAgICAgPE5leHRTY3JpcHQgLz5cbiAgICAgIDwvYm9keT5cbiAgICA8L0h0bWw+XG4gIClcbn1cbiJdLCJuYW1lcyI6WyJIdG1sIiwiSGVhZCIsIk1haW4iLCJOZXh0U2NyaXB0IiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsIkRvY3VtZW50Iiwic2V0SW5pdGlhbFRoZW1lIiwiY2hpbGRyZW4iLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsIl9faHRtbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_document.js\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_document.js")));
module.exports = __webpack_exports__;

})();