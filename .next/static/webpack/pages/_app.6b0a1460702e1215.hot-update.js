/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./store/AppContext.tsx":
/*!******************************!*\
  !*** ./store/AppContext.tsx ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppProvider: () => (/* binding */ AppProvider),\n/* harmony export */   useAppContext: () => (/* binding */ useAppContext)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _useInventory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useInventory */ \"./store/useInventory.ts\");\n/* harmony import */ var _useInventory__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_useInventory__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\nconst InventoryContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction AppProvider(param) {\n    let { children } = param;\n    _s();\n    const inventoryContext = (0,_useInventory__WEBPACK_IMPORTED_MODULE_2__.useInventory)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InventoryContext.Provider, {\n        value: inventoryContext,\n        children: children\n    }, void 0, false, {\n        fileName: \"D:\\\\github\\\\Plateful\\\\store\\\\AppContext.tsx\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, this);\n}\n_s(AppProvider, \"8L6TZgNlpXZrLknq5uP5sDa875o=\", false, function() {\n    return [\n        _useInventory__WEBPACK_IMPORTED_MODULE_2__.useInventory\n    ];\n});\n_c = AppProvider;\nfunction useAppContext() {\n    _s1();\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(InventoryContext);\n    if (!context) {\n        throw new Error(\"useAppContext must be used within an AppProvider\");\n    }\n    return context;\n}\n_s1(useAppContext, \"b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=\");\nvar _c;\n$RefreshReg$(_c, \"AppProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9BcHBDb250ZXh0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQThFO0FBTWhDO0FBaUI5QyxNQUFNSSxpQ0FBbUJILG9EQUFhQSxDQUE4Qkk7QUFNN0QsU0FBU0MsWUFBWSxLQUE4QjtRQUE5QixFQUFFQyxRQUFRLEVBQW9CLEdBQTlCOztJQUMxQixNQUFNQyxtQkFBbUJMLDJEQUFZQTtJQUVyQyxxQkFDRSw4REFBQ0MsaUJBQWlCSyxRQUFRO1FBQUNDLE9BQU9GO2tCQUMvQkQ7Ozs7OztBQUdQO0dBUmdCRDs7UUFDV0gsdURBQVlBOzs7S0FEdkJHO0FBVVQsU0FBU0s7O0lBQ2QsTUFBTUMsVUFBVVYsaURBQVVBLENBQUNFO0lBQzNCLElBQUksQ0FBQ1EsU0FBUztRQUNaLE1BQU0sSUFBSUMsTUFBTTtJQUNsQjtJQUNBLE9BQU9EO0FBQ1Q7SUFOZ0JEIiwic291cmNlcyI6WyJEOlxcZ2l0aHViXFxQbGF0ZWZ1bFxcc3RvcmVcXEFwcENvbnRleHQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgSW52ZW50b3J5SXRlbSxcclxuICBDQVRFR09SWV9PUFRJT05TLFxyXG4gIENhdGVnb3J5T3B0aW9ucyxcclxufSBmcm9tIFwiLi4vdHlwZXMvdHlwZXNcIjtcclxuaW1wb3J0IHsgdXNlSW52ZW50b3J5IH0gZnJvbSBcIi4vdXNlSW52ZW50b3J5XCI7XHJcblxyXG50eXBlIEFwcENvbnRleHRQcm9wcyA9IHtcclxuICBpbnZlbnRvcnk6IEludmVudG9yeUl0ZW1bXTtcclxuICBhZGRJdGVtVG9JbnZlbnRvcnk6IChpdGVtOiBJbnZlbnRvcnlJdGVtKSA9PiB2b2lkO1xyXG4gIHJlbW92ZUl0ZW1Gcm9tSW52ZW50b3J5OiAoaWQ6IG51bWJlcikgPT4gdm9pZDtcclxuICBlZGl0SXRlbUluSW52ZW50b3J5OiAoaXRlbTogSW52ZW50b3J5SXRlbSkgPT4gdm9pZDtcclxuICBoYW5kbGVFZGl0SXRlbTogKGl0ZW06IEludmVudG9yeUl0ZW0pID0+IHZvaWQ7XHJcbiAgZWRpdGluZ0l0ZW06IEludmVudG9yeUl0ZW0gfCBudWxsO1xyXG4gIG5ld0l0ZW1OYW1lOiBzdHJpbmc7XHJcbiAgc2V0TmV3SXRlbU5hbWU6IChuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgbmV3SXRlbUNhdGVnb3J5OiBDYXRlZ29yeU9wdGlvbnM7XHJcbiAgc2V0TmV3SXRlbUNhdGVnb3J5OiAoY2F0ZWdvcnk6IENhdGVnb3J5T3B0aW9ucykgPT4gdm9pZDtcclxuICBoYW5kbGVBZGRPckVkaXRJdGVtOiAoKSA9PiB2b2lkO1xyXG4gIHJlc2V0Rm9ybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEludmVudG9yeUNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEFwcENvbnRleHRQcm9wcyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcclxuXHJcbnR5cGUgQXBwUHJvdmlkZXJQcm9wcyA9IHtcclxuICBjaGlsZHJlbjogUmVhY3ROb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFwcFByb3ZpZGVyKHsgY2hpbGRyZW4gfTogQXBwUHJvdmlkZXJQcm9wcykge1xyXG4gIGNvbnN0IGludmVudG9yeUNvbnRleHQgPSB1c2VJbnZlbnRvcnkoKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxJbnZlbnRvcnlDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtpbnZlbnRvcnlDb250ZXh0fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9JbnZlbnRvcnlDb250ZXh0LlByb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VBcHBDb250ZXh0KCkge1xyXG4gIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KEludmVudG9yeUNvbnRleHQpO1xyXG4gIGlmICghY29udGV4dCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXNlQXBwQ29udGV4dCBtdXN0IGJlIHVzZWQgd2l0aGluIGFuIEFwcFByb3ZpZGVyXCIpO1xyXG4gIH1cclxuICByZXR1cm4gY29udGV4dDtcclxufVxyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZUludmVudG9yeSIsIkludmVudG9yeUNvbnRleHQiLCJ1bmRlZmluZWQiLCJBcHBQcm92aWRlciIsImNoaWxkcmVuIiwiaW52ZW50b3J5Q29udGV4dCIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VBcHBDb250ZXh0IiwiY29udGV4dCIsIkVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/AppContext.tsx\n"));

/***/ }),

/***/ "./store/useInventory.ts":
/*!*******************************!*\
  !*** ./store/useInventory.ts ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});