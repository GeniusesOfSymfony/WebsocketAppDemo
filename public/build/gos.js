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
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./vendor/gos/web-socket-bundle/Resources/public/js/gos_web_socket_client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./vendor/gos/web-socket-bundle/Resources/public/js/gos_web_socket_client.js":
/*!***********************************************************************************!*\
  !*** ./vendor/gos/web-socket-bundle/Resources/public/js/gos_web_socket_client.js ***!
  \***********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var WS = function () {
    var GosSocket = function GosSocket(uri, config) {

        /**
         * Holds the uri to connect to
         * @type {String}
         * @private
         */
        this._uri = uri;

        /**
         * Hold autobahn session reference
         * @type {Mixed}
         * @private
         */
        this._session = false;

        /**
         * Hold event callbacks
         * @type {Object}
         * @private
         */
        this._listeners = {};

        //calls the Gos Socket connect function.
        this.connect();
    };

    GosSocket.prototype.connect = function () {
        var that = this;

        ab.connect(this._uri,

        //Function on connect
        function (session) {
            that.fire({ type: "socket/connect", data: session });
        },

        //Function on disconnect / error
        function (code, reason) {
            that._session = false;

            that.fire({ type: "socket/disconnect", data: { code: code, reason: reason } });
        });
    };

    /**
     * Adds a listener for an event type
     *
     * @param {String} type
     * @param {function} listener
     */
    GosSocket.prototype.on = function (type, listener) {
        if (typeof this._listeners[type] == "undefined") {
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    };

    /**
     * Fires an event for all listeners.
     * @param {String} event
     */
    GosSocket.prototype.fire = function (event) {
        if (typeof event == "string") {
            event = { type: event };
        }
        if (!event.target) {
            event.target = this;
        }

        if (!event.type) {
            //falsy
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners[event.type] instanceof Array) {
            var listeners = this._listeners[event.type];
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].call(this, event.data);
            }
        }
    };

    /**
     * Removes a listener from an event
     *
     * @param {String} type
     * @param {function} listener
     */
    GosSocket.prototype.off = function (type, listener) {
        if (this._listeners[type] instanceof Array) {
            var listeners = this._listeners[type];
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    };

    return {
        connect: function connect(uri) {
            return new GosSocket(uri);
        }
    };
}();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjYwMjM3ZDYzNGExZmMxNDI2ODkiLCJ3ZWJwYWNrOi8vLy4vdmVuZG9yL2dvcy93ZWItc29ja2V0LWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL2dvc193ZWJfc29ja2V0X2NsaWVudC5qcyJdLCJuYW1lcyI6WyJXUyIsIkdvc1NvY2tldCIsInVyaSIsImNvbmZpZyIsIl91cmkiLCJfc2Vzc2lvbiIsIl9saXN0ZW5lcnMiLCJjb25uZWN0IiwicHJvdG90eXBlIiwidGhhdCIsImFiIiwic2Vzc2lvbiIsImZpcmUiLCJ0eXBlIiwiZGF0YSIsImNvZGUiLCJyZWFzb24iLCJvbiIsImxpc3RlbmVyIiwicHVzaCIsImV2ZW50IiwidGFyZ2V0IiwiRXJyb3IiLCJBcnJheSIsImxpc3RlbmVycyIsImkiLCJsZW4iLCJsZW5ndGgiLCJjYWxsIiwib2ZmIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsS0FBTSxZQUNWO0FBQ0ksUUFBSUMsWUFBWSxTQUFaQSxTQUFZLENBQVNDLEdBQVQsRUFBY0MsTUFBZCxFQUFxQjs7QUFFakM7Ozs7O0FBS0EsYUFBS0MsSUFBTCxHQUFZRixHQUFaOztBQUVBOzs7OztBQUtBLGFBQUtH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QS9HUSxFQUFULEMiLCJmaWxlIjoiZ29zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi92ZW5kb3IvZ29zL3dlYi1zb2NrZXQtYnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvanMvZ29zX3dlYl9zb2NrZXRfY2xpZW50LmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI2MDIzN2Q2MzRhMWZjMTQyNjg5IiwidmFyIFdTID0gKGZ1bmN0aW9uKClcbntcbiAgICB2YXIgR29zU29ja2V0ID0gZnVuY3Rpb24odXJpLCBjb25maWcpe1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIb2xkcyB0aGUgdXJpIHRvIGNvbm5lY3QgdG9cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3VyaSA9IHVyaTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSG9sZCBhdXRvYmFobiBzZXNzaW9uIHJlZmVyZW5jZVxuICAgICAgICAgKiBAdHlwZSB7TWl4ZWR9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9zZXNzaW9uID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhvbGQgZXZlbnQgY2FsbGJhY2tzXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICAvL2NhbGxzIHRoZSBHb3MgU29ja2V0IGNvbm5lY3QgZnVuY3Rpb24uXG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgIH07XG5cbiAgICBHb3NTb2NrZXQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgICBhYi5jb25uZWN0KHRoaXMuX3VyaSxcblxuICAgICAgICAgICAgLy9GdW5jdGlvbiBvbiBjb25uZWN0XG4gICAgICAgICAgICBmdW5jdGlvbihzZXNzaW9uKXtcbiAgICAgICAgICAgICAgICB0aGF0LmZpcmUoe3R5cGU6IFwic29ja2V0L2Nvbm5lY3RcIiwgZGF0YTogc2Vzc2lvbiB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vRnVuY3Rpb24gb24gZGlzY29ubmVjdCAvIGVycm9yXG4gICAgICAgICAgICBmdW5jdGlvbihjb2RlLCByZWFzb24pe1xuICAgICAgICAgICAgICAgIHRoYXQuX3Nlc3Npb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoYXQuZmlyZSh7dHlwZTogXCJzb2NrZXQvZGlzY29ubmVjdFwiLCBkYXRhOiB7Y29kZTogY29kZSwgcmVhc29uOiByZWFzb259fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciBmb3IgYW4gZXZlbnQgdHlwZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqL1xuICAgIEdvc1NvY2tldC5wcm90b3R5cGUub24gPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcil7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVzIGFuIGV2ZW50IGZvciBhbGwgbGlzdGVuZXJzLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqL1xuICAgIEdvc1NvY2tldC5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCA9PSBcInN0cmluZ1wiKXtcbiAgICAgICAgICAgIGV2ZW50ID0geyB0eXBlOiBldmVudCB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXZlbnQudGFyZ2V0KXtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWV2ZW50LnR5cGUpeyAgLy9mYWxzeVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnQgb2JqZWN0IG1pc3NpbmcgJ3R5cGUnIHByb3BlcnR5LlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnNbZXZlbnQudHlwZV0gaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzW2V2ZW50LnR5cGVdO1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBsZW49bGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnNbaV0uY2FsbCh0aGlzLCBldmVudC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbGlzdGVuZXIgZnJvbSBhbiBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqL1xuICAgIEdvc1NvY2tldC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpe1xuICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXJzW3R5cGVdIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgICAgIGZvciAodmFyIGk9MCwgbGVuPWxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXSA9PT0gbGlzdGVuZXIpe1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29ubmVjdDogZnVuY3Rpb24odXJpKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvc1NvY2tldCh1cmkpO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZlbmRvci9nb3Mvd2ViLXNvY2tldC1idW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qcy9nb3Nfd2ViX3NvY2tldF9jbGllbnQuanMiXSwic291cmNlUm9vdCI6IiJ9