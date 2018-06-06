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
/******/ 	return __webpack_require__(__webpack_require__.s = "./vendor/gos/web-socket-bundle/Resources/public/js/vendor/autobahn.min.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/when/lib/Promise.js":
/*!******************************************!*\
  !*** ./node_modules/when/lib/Promise.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	var makePromise = __webpack_require__(/*! ./makePromise */ "./node_modules/when/lib/makePromise.js");
	var Scheduler = __webpack_require__(/*! ./Scheduler */ "./node_modules/when/lib/Scheduler.js");
	var async = __webpack_require__(/*! ./env */ "./node_modules/when/lib/env.js").asap;

	return makePromise({
		scheduler: new Scheduler(async)
	});

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js"));


/***/ }),

/***/ "./node_modules/when/lib/Scheduler.js":
/*!********************************************!*\
  !*** ./node_modules/when/lib/Scheduler.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	// Credit to Twisol (https://github.com/Twisol) for suggesting
	// this type of extensible queue + trampoline approach for next-tick conflation.

	/**
	 * Async task scheduler
	 * @param {function} async function to schedule a single async function
	 * @constructor
	 */
	function Scheduler(async) {
		this._async = async;
		this._running = false;

		this._queue = this;
		this._queueLen = 0;
		this._afterQueue = {};
		this._afterQueueLen = 0;

		var self = this;
		this.drain = function() {
			self._drain();
		};
	}

	/**
	 * Enqueue a task
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.enqueue = function(task) {
		this._queue[this._queueLen++] = task;
		this.run();
	};

	/**
	 * Enqueue a task to run after the main task queue
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.afterQueue = function(task) {
		this._afterQueue[this._afterQueueLen++] = task;
		this.run();
	};

	Scheduler.prototype.run = function() {
		if (!this._running) {
			this._running = true;
			this._async(this.drain);
		}
	};

	/**
	 * Drain the handler queue entirely, and then the after queue
	 */
	Scheduler.prototype._drain = function() {
		var i = 0;
		for (; i < this._queueLen; ++i) {
			this._queue[i].run();
			this._queue[i] = void 0;
		}

		this._queueLen = 0;
		this._running = false;

		for (i = 0; i < this._afterQueueLen; ++i) {
			this._afterQueue[i].run();
			this._afterQueue[i] = void 0;
		}

		this._afterQueueLen = 0;
	};

	return Scheduler;

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/TimeoutError.js":
/*!***********************************************!*\
  !*** ./node_modules/when/lib/TimeoutError.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	/**
	 * Custom error type for promises rejected by promise.timeout
	 * @param {string} message
	 * @constructor
	 */
	function TimeoutError (message) {
		Error.call(this);
		this.message = message;
		this.name = TimeoutError.name;
		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(this, TimeoutError);
		}
	}

	TimeoutError.prototype = Object.create(Error.prototype);
	TimeoutError.prototype.constructor = TimeoutError;

	return TimeoutError;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));

/***/ }),

/***/ "./node_modules/when/lib/apply.js":
/*!****************************************!*\
  !*** ./node_modules/when/lib/apply.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	makeApply.tryCatchResolve = tryCatchResolve;

	return makeApply;

	function makeApply(Promise, call) {
		if(arguments.length < 2) {
			call = tryCatchResolve;
		}

		return apply;

		function apply(f, thisArg, args) {
			var p = Promise._defer();
			var l = args.length;
			var params = new Array(l);
			callAndResolve({ f:f, thisArg:thisArg, args:args, params:params, i:l-1, call:call }, p._handler);

			return p;
		}

		function callAndResolve(c, h) {
			if(c.i < 0) {
				return call(c.f, c.thisArg, c.params, h);
			}

			var handler = Promise._handler(c.args[c.i]);
			handler.fold(callAndResolveNext, c, void 0, h);
		}

		function callAndResolveNext(c, x, h) {
			c.params[c.i] = x;
			c.i -= 1;
			callAndResolve(c, h);
		}
	}

	function tryCatchResolve(f, thisArg, args, resolver) {
		try {
			resolver.resolve(f.apply(thisArg, args));
		} catch(e) {
			resolver.reject(e);
		}
	}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));




/***/ }),

/***/ "./node_modules/when/lib/decorators/array.js":
/*!***************************************************!*\
  !*** ./node_modules/when/lib/decorators/array.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {

	var state = __webpack_require__(/*! ../state */ "./node_modules/when/lib/state.js");
	var applier = __webpack_require__(/*! ../apply */ "./node_modules/when/lib/apply.js");

	return function array(Promise) {

		var applyFold = applier(Promise);
		var toPromise = Promise.resolve;
		var all = Promise.all;

		var ar = Array.prototype.reduce;
		var arr = Array.prototype.reduceRight;
		var slice = Array.prototype.slice;

		// Additional array combinators

		Promise.any = any;
		Promise.some = some;
		Promise.settle = settle;

		Promise.map = map;
		Promise.filter = filter;
		Promise.reduce = reduce;
		Promise.reduceRight = reduceRight;

		/**
		 * When this promise fulfills with an array, do
		 * onFulfilled.apply(void 0, array)
		 * @param {function} onFulfilled function to apply
		 * @returns {Promise} promise for the result of applying onFulfilled
		 */
		Promise.prototype.spread = function(onFulfilled) {
			return this.then(all).then(function(array) {
				return onFulfilled.apply(this, array);
			});
		};

		return Promise;

		/**
		 * One-winner competitive race.
		 * Return a promise that will fulfill when one of the promises
		 * in the input array fulfills, or will reject when all promises
		 * have rejected.
		 * @param {array} promises
		 * @returns {Promise} promise for the first fulfilled value
		 */
		function any(promises) {
			var p = Promise._defer();
			var resolver = p._handler;
			var l = promises.length>>>0;

			var pending = l;
			var errors = [];

			for (var h, x, i = 0; i < l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				h = Promise._handler(x);
				if(h.state() > 0) {
					resolver.become(h);
					Promise._visitRemaining(promises, i, h);
					break;
				} else {
					h.visit(resolver, handleFulfill, handleReject);
				}
			}

			if(pending === 0) {
				resolver.reject(new RangeError('any(): array must not be empty'));
			}

			return p;

			function handleFulfill(x) {
				/*jshint validthis:true*/
				errors = null;
				this.resolve(x); // this === resolver
			}

			function handleReject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--pending === 0) {
					this.reject(errors);
				}
			}
		}

		/**
		 * N-winner competitive race
		 * Return a promise that will fulfill when n input promises have
		 * fulfilled, or will reject when it becomes impossible for n
		 * input promises to fulfill (ie when promises.length - n + 1
		 * have rejected)
		 * @param {array} promises
		 * @param {number} n
		 * @returns {Promise} promise for the earliest n fulfillment values
		 *
		 * @deprecated
		 */
		function some(promises, n) {
			/*jshint maxcomplexity:7*/
			var p = Promise._defer();
			var resolver = p._handler;

			var results = [];
			var errors = [];

			var l = promises.length>>>0;
			var nFulfill = 0;
			var nReject;
			var x, i; // reused in both for() loops

			// First pass: count actual array items
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}
				++nFulfill;
			}

			// Compute actual goals
			n = Math.max(n, 0);
			nReject = (nFulfill - n + 1);
			nFulfill = Math.min(n, nFulfill);

			if(n > nFulfill) {
				resolver.reject(new RangeError('some(): array must contain at least '
				+ n + ' item(s), but had ' + nFulfill));
			} else if(nFulfill === 0) {
				resolver.resolve(results);
			}

			// Second pass: observe each array item, make progress toward goals
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}

				Promise._handler(x).visit(resolver, fulfill, reject, resolver.notify);
			}

			return p;

			function fulfill(x) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				results.push(x);
				if(--nFulfill === 0) {
					errors = null;
					this.resolve(results);
				}
			}

			function reject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--nReject === 0) {
					results = null;
					this.reject(errors);
				}
			}
		}

		/**
		 * Apply f to the value of each promise in a list of promises
		 * and return a new list containing the results.
		 * @param {array} promises
		 * @param {function(x:*, index:Number):*} f mapping function
		 * @returns {Promise}
		 */
		function map(promises, f) {
			return Promise._traverse(f, promises);
		}

		/**
		 * Filter the provided array of promises using the provided predicate.  Input may
		 * contain promises and values
		 * @param {Array} promises array of promises and values
		 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
		 *  Must return truthy (or promise for truthy) for items to retain.
		 * @returns {Promise} promise that will fulfill with an array containing all items
		 *  for which predicate returned truthy.
		 */
		function filter(promises, predicate) {
			var a = slice.call(promises);
			return Promise._traverse(predicate, a).then(function(keep) {
				return filterSync(a, keep);
			});
		}

		function filterSync(promises, keep) {
			// Safe because we know all promises have fulfilled if we've made it this far
			var l = keep.length;
			var filtered = new Array(l);
			for(var i=0, j=0; i<l; ++i) {
				if(keep[i]) {
					filtered[j++] = Promise._handler(promises[i]).value;
				}
			}
			filtered.length = j;
			return filtered;

		}

		/**
		 * Return a promise that will always fulfill with an array containing
		 * the outcome states of all input promises.  The returned promise
		 * will never reject.
		 * @param {Array} promises
		 * @returns {Promise} promise for array of settled state descriptors
		 */
		function settle(promises) {
			return all(promises.map(settleOne));
		}

		function settleOne(p) {
			// Optimize the case where we get an already-resolved when.js promise
			//  by extracting its state:
			var handler;
			if (p instanceof Promise) {
				// This is our own Promise type and we can reach its handler internals:
				handler = p._handler.join();
			}
			if((handler && handler.state() === 0) || !handler) {
				// Either still pending, or not a Promise at all:
				return toPromise(p).then(state.fulfilled, state.rejected);
			}

			// The promise is our own, but it is already resolved. Take a shortcut.
			// Since we're not actually handling the resolution, we need to disable
			// rejection reporting.
			handler._unreport();
			return state.inspect(handler);
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduce(promises, f /*, initialValue */) {
			return arguments.length > 2 ? ar.call(promises, liftCombine(f), arguments[2])
					: ar.call(promises, liftCombine(f));
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduceRight()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduceRight(promises, f /*, initialValue */) {
			return arguments.length > 2 ? arr.call(promises, liftCombine(f), arguments[2])
					: arr.call(promises, liftCombine(f));
		}

		function liftCombine(f) {
			return function(z, x, i) {
				return applyFold(f, void 0, [z,x,i]);
			};
		}
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/flow.js":
/*!**************************************************!*\
  !*** ./node_modules/when/lib/decorators/flow.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function flow(Promise) {

		var resolve = Promise.resolve;
		var reject = Promise.reject;
		var origCatch = Promise.prototype['catch'];

		/**
		 * Handle the ultimate fulfillment value or rejection reason, and assume
		 * responsibility for all errors.  If an error propagates out of result
		 * or handleFatalError, it will be rethrown to the host, resulting in a
		 * loud stack track on most platforms and a crash on some.
		 * @param {function?} onResult
		 * @param {function?} onError
		 * @returns {undefined}
		 */
		Promise.prototype.done = function(onResult, onError) {
			this._handler.visit(this._handler.receiver, onResult, onError);
		};

		/**
		 * Add Error-type and predicate matching to catch.  Examples:
		 * promise.catch(TypeError, handleTypeError)
		 *   .catch(predicate, handleMatchedErrors)
		 *   .catch(handleRemainingErrors)
		 * @param onRejected
		 * @returns {*}
		 */
		Promise.prototype['catch'] = Promise.prototype.otherwise = function(onRejected) {
			if (arguments.length < 2) {
				return origCatch.call(this, onRejected);
			}

			if(typeof onRejected !== 'function') {
				return this.ensure(rejectInvalidPredicate);
			}

			return origCatch.call(this, createCatchFilter(arguments[1], onRejected));
		};

		/**
		 * Wraps the provided catch handler, so that it will only be called
		 * if the predicate evaluates truthy
		 * @param {?function} handler
		 * @param {function} predicate
		 * @returns {function} conditional catch handler
		 */
		function createCatchFilter(handler, predicate) {
			return function(e) {
				return evaluatePredicate(e, predicate)
					? handler.call(this, e)
					: reject(e);
			};
		}

		/**
		 * Ensures that onFulfilledOrRejected will be called regardless of whether
		 * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
		 * receive the promises' value or reason.  Any returned value will be disregarded.
		 * onFulfilledOrRejected may throw or return a rejected promise to signal
		 * an additional error.
		 * @param {function} handler handler to be called regardless of
		 *  fulfillment or rejection
		 * @returns {Promise}
		 */
		Promise.prototype['finally'] = Promise.prototype.ensure = function(handler) {
			if(typeof handler !== 'function') {
				return this;
			}

			return this.then(function(x) {
				return runSideEffect(handler, this, identity, x);
			}, function(e) {
				return runSideEffect(handler, this, reject, e);
			});
		};

		function runSideEffect (handler, thisArg, propagate, value) {
			var result = handler.call(thisArg);
			return maybeThenable(result)
				? propagateValue(result, propagate, value)
				: propagate(value);
		}

		function propagateValue (result, propagate, x) {
			return resolve(result).then(function () {
				return propagate(x);
			});
		}

		/**
		 * Recover from a failure by returning a defaultValue.  If defaultValue
		 * is a promise, it's fulfillment value will be used.  If defaultValue is
		 * a promise that rejects, the returned promise will reject with the
		 * same reason.
		 * @param {*} defaultValue
		 * @returns {Promise} new promise
		 */
		Promise.prototype['else'] = Promise.prototype.orElse = function(defaultValue) {
			return this.then(void 0, function() {
				return defaultValue;
			});
		};

		/**
		 * Shortcut for .then(function() { return value; })
		 * @param  {*} value
		 * @return {Promise} a promise that:
		 *  - is fulfilled if value is not a promise, or
		 *  - if value is a promise, will fulfill with its value, or reject
		 *    with its reason.
		 */
		Promise.prototype['yield'] = function(value) {
			return this.then(function() {
				return value;
			});
		};

		/**
		 * Runs a side effect when this promise fulfills, without changing the
		 * fulfillment value.
		 * @param {function} onFulfilledSideEffect
		 * @returns {Promise}
		 */
		Promise.prototype.tap = function(onFulfilledSideEffect) {
			return this.then(onFulfilledSideEffect)['yield'](this);
		};

		return Promise;
	};

	function rejectInvalidPredicate() {
		throw new TypeError('catch predicate must be a function');
	}

	function evaluatePredicate(e, predicate) {
		return isError(predicate) ? e instanceof predicate : predicate(e);
	}

	function isError(predicate) {
		return predicate === Error
			|| (predicate != null && predicate.prototype instanceof Error);
	}

	function maybeThenable(x) {
		return (typeof x === 'object' || typeof x === 'function') && x !== null;
	}

	function identity(x) {
		return x;
	}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/fold.js":
/*!**************************************************!*\
  !*** ./node_modules/when/lib/decorators/fold.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @author Jeff Escalante */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function fold(Promise) {

		Promise.prototype.fold = function(f, z) {
			var promise = this._beget();

			this._handler.fold(function(z, x, to) {
				Promise._handler(z).fold(function(x, z, to) {
					to.resolve(f.call(this, z, x));
				}, x, this, to);
			}, z, promise._handler.receiver, promise._handler);

			return promise;
		};

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/inspect.js":
/*!*****************************************************!*\
  !*** ./node_modules/when/lib/decorators/inspect.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {

	var inspect = __webpack_require__(/*! ../state */ "./node_modules/when/lib/state.js").inspect;

	return function inspection(Promise) {

		Promise.prototype.inspect = function() {
			return inspect(Promise._handler(this));
		};

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/iterate.js":
/*!*****************************************************!*\
  !*** ./node_modules/when/lib/decorators/iterate.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function generate(Promise) {

		var resolve = Promise.resolve;

		Promise.iterate = iterate;
		Promise.unfold = unfold;

		return Promise;

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.iterate
		 * Generate a (potentially infinite) stream of promised values:
		 * x, f(x), f(f(x)), etc. until condition(x) returns true
		 * @param {function} f function to generate a new x from the previous x
		 * @param {function} condition function that, given the current x, returns
		 *  truthy when the iterate should stop
		 * @param {function} handler function to handle the value produced by f
		 * @param {*|Promise} x starting value, may be a promise
		 * @return {Promise} the result of the last call to f before
		 *  condition returns true
		 */
		function iterate(f, condition, handler, x) {
			return unfold(function(x) {
				return [x, f(x)];
			}, condition, handler, x);
		}

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.unfold
		 * Generate a (potentially infinite) stream of promised values
		 * by applying handler(generator(seed)) iteratively until
		 * condition(seed) returns true.
		 * @param {function} unspool function that generates a [value, newSeed]
		 *  given a seed.
		 * @param {function} condition function that, given the current seed, returns
		 *  truthy when the unfold should stop
		 * @param {function} handler function to handle the value produced by unspool
		 * @param x {*|Promise} starting value, may be a promise
		 * @return {Promise} the result of the last value produced by unspool before
		 *  condition returns true
		 */
		function unfold(unspool, condition, handler, x) {
			return resolve(x).then(function(seed) {
				return resolve(condition(seed)).then(function(done) {
					return done ? seed : resolve(unspool(seed)).spread(next);
				});
			});

			function next(item, newSeed) {
				return resolve(handler(item)).then(function() {
					return unfold(unspool, condition, handler, newSeed);
				});
			}
		}
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/progress.js":
/*!******************************************************!*\
  !*** ./node_modules/when/lib/decorators/progress.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function progress(Promise) {

		/**
		 * @deprecated
		 * Register a progress handler for this promise
		 * @param {function} onProgress
		 * @returns {Promise}
		 */
		Promise.prototype.progress = function(onProgress) {
			return this.then(void 0, void 0, onProgress);
		};

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/timed.js":
/*!***************************************************!*\
  !*** ./node_modules/when/lib/decorators/timed.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {

	var env = __webpack_require__(/*! ../env */ "./node_modules/when/lib/env.js");
	var TimeoutError = __webpack_require__(/*! ../TimeoutError */ "./node_modules/when/lib/TimeoutError.js");

	function setTimeout(f, ms, x, y) {
		return env.setTimer(function() {
			f(x, y, ms);
		}, ms);
	}

	return function timed(Promise) {
		/**
		 * Return a new promise whose fulfillment value is revealed only
		 * after ms milliseconds
		 * @param {number} ms milliseconds
		 * @returns {Promise}
		 */
		Promise.prototype.delay = function(ms) {
			var p = this._beget();
			this._handler.fold(handleDelay, ms, void 0, p._handler);
			return p;
		};

		function handleDelay(ms, x, h) {
			setTimeout(resolveDelay, ms, x, h);
		}

		function resolveDelay(x, h) {
			h.resolve(x);
		}

		/**
		 * Return a new promise that rejects after ms milliseconds unless
		 * this promise fulfills earlier, in which case the returned promise
		 * fulfills with the same value.
		 * @param {number} ms milliseconds
		 * @param {Error|*=} reason optional rejection reason to use, defaults
		 *   to a TimeoutError if not provided
		 * @returns {Promise}
		 */
		Promise.prototype.timeout = function(ms, reason) {
			var p = this._beget();
			var h = p._handler;

			var t = setTimeout(onTimeout, ms, reason, p._handler);

			this._handler.visit(h,
				function onFulfill(x) {
					env.clearTimer(t);
					this.resolve(x); // this = h
				},
				function onReject(x) {
					env.clearTimer(t);
					this.reject(x); // this = h
				},
				h.notify);

			return p;
		};

		function onTimeout(reason, h, ms) {
			var e = typeof reason === 'undefined'
				? new TimeoutError('timed out after ' + ms + 'ms')
				: reason;
			h.reject(e);
		}

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/unhandledRejection.js":
/*!****************************************************************!*\
  !*** ./node_modules/when/lib/decorators/unhandledRejection.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {

	var setTimer = __webpack_require__(/*! ../env */ "./node_modules/when/lib/env.js").setTimer;
	var format = __webpack_require__(/*! ../format */ "./node_modules/when/lib/format.js");

	return function unhandledRejection(Promise) {

		var logError = noop;
		var logInfo = noop;
		var localConsole;

		if(typeof console !== 'undefined') {
			// Alias console to prevent things like uglify's drop_console option from
			// removing console.log/error. Unhandled rejections fall into the same
			// category as uncaught exceptions, and build tools shouldn't silence them.
			localConsole = console;
			logError = typeof localConsole.error !== 'undefined'
				? function (e) { localConsole.error(e); }
				: function (e) { localConsole.log(e); };

			logInfo = typeof localConsole.info !== 'undefined'
				? function (e) { localConsole.info(e); }
				: function (e) { localConsole.log(e); };
		}

		Promise.onPotentiallyUnhandledRejection = function(rejection) {
			enqueue(report, rejection);
		};

		Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
			enqueue(unreport, rejection);
		};

		Promise.onFatalRejection = function(rejection) {
			enqueue(throwit, rejection.value);
		};

		var tasks = [];
		var reported = [];
		var running = null;

		function report(r) {
			if(!r.handled) {
				reported.push(r);
				logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
			}
		}

		function unreport(r) {
			var i = reported.indexOf(r);
			if(i >= 0) {
				reported.splice(i, 1);
				logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
			}
		}

		function enqueue(f, x) {
			tasks.push(f, x);
			if(running === null) {
				running = setTimer(flush, 0);
			}
		}

		function flush() {
			running = null;
			while(tasks.length > 0) {
				tasks.shift()(tasks.shift());
			}
		}

		return Promise;
	};

	function throwit(e) {
		throw e;
	}

	function noop() {}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/with.js":
/*!**************************************************!*\
  !*** ./node_modules/when/lib/decorators/with.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function addWith(Promise) {
		/**
		 * Returns a promise whose handlers will be called with `this` set to
		 * the supplied receiver.  Subsequent promises derived from the
		 * returned promise will also have their handlers called with receiver
		 * as `this`. Calling `with` with undefined or no arguments will return
		 * a promise whose handlers will again be called in the usual Promises/A+
		 * way (no `this`) thus safely undoing any previous `with` in the
		 * promise chain.
		 *
		 * WARNING: Promises returned from `with`/`withThis` are NOT Promises/A+
		 * compliant, specifically violating 2.2.5 (http://promisesaplus.com/#point-41)
		 *
		 * @param {object} receiver `this` value for all handlers attached to
		 *  the returned promise.
		 * @returns {Promise}
		 */
		Promise.prototype['with'] = Promise.prototype.withThis = function(receiver) {
			var p = this._beget();
			var child = p._handler;
			child.receiver = receiver;
			this._handler.chain(child, receiver);
			return p;
		};

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));



/***/ }),

/***/ "./node_modules/when/lib/env.js":
/*!**************************************!*\
  !*** ./node_modules/when/lib/env.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;var require;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {
	/*jshint maxcomplexity:6*/

	// Sniff "best" async scheduling option
	// Prefer process.nextTick or MutationObserver, then check for
	// setTimeout, and finally vertx, since its the only env that doesn't
	// have setTimeout

	var MutationObs;
	var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;

	// Default env
	var setTimer = function(f, ms) { return setTimeout(f, ms); };
	var clearTimer = function(t) { return clearTimeout(t); };
	var asap = function (f) { return capturedSetTimeout(f, 0); };

	// Detect specific env
	if (isNode()) { // Node
		asap = function (f) { return process.nextTick(f); };

	} else if (MutationObs = hasMutationObserver()) { // Modern browser
		asap = initMutationObserver(MutationObs);

	} else if (!capturedSetTimeout) { // vert.x
		var vertxRequire = require;
		var vertx = __webpack_require__(/*! vertx */ 0);
		setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
		clearTimer = vertx.cancelTimer;
		asap = vertx.runOnLoop || vertx.runOnContext;
	}

	return {
		setTimer: setTimer,
		clearTimer: clearTimer,
		asap: asap
	};

	function isNode () {
		return typeof process !== 'undefined' &&
			Object.prototype.toString.call(process) === '[object process]';
	}

	function hasMutationObserver () {
	    return (typeof MutationObserver !== 'undefined' && MutationObserver) ||
			(typeof WebKitMutationObserver !== 'undefined' && WebKitMutationObserver);
	}

	function initMutationObserver(MutationObserver) {
		var scheduled;
		var node = document.createTextNode('');
		var o = new MutationObserver(run);
		o.observe(node, { characterData: true });

		function run() {
			var f = scheduled;
			scheduled = void 0;
			f();
		}

		var i = 0;
		return function (f) {
			scheduled = f;
			node.data = (i ^= 1);
		};
	}
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/when/lib/format.js":
/*!*****************************************!*\
  !*** ./node_modules/when/lib/format.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return {
		formatError: formatError,
		formatObject: formatObject,
		tryStringify: tryStringify
	};

	/**
	 * Format an error into a string.  If e is an Error and has a stack property,
	 * it's returned.  Otherwise, e is formatted using formatObject, with a
	 * warning added about e not being a proper Error.
	 * @param {*} e
	 * @returns {String} formatted string, suitable for output to developers
	 */
	function formatError(e) {
		var s = typeof e === 'object' && e !== null && (e.stack || e.message) ? e.stack || e.message : formatObject(e);
		return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
	}

	/**
	 * Format an object, detecting "plain" objects and running them through
	 * JSON.stringify if possible.
	 * @param {Object} o
	 * @returns {string}
	 */
	function formatObject(o) {
		var s = String(o);
		if(s === '[object Object]' && typeof JSON !== 'undefined') {
			s = tryStringify(o, s);
		}
		return s;
	}

	/**
	 * Try to return the result of JSON.stringify(x).  If that fails, return
	 * defaultValue
	 * @param {*} x
	 * @param {*} defaultValue
	 * @returns {String|*} JSON.stringify(x) or defaultValue
	 */
	function tryStringify(x, defaultValue) {
		try {
			return JSON.stringify(x);
		} catch(e) {
			return defaultValue;
		}
	}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/makePromise.js":
/*!**********************************************!*\
  !*** ./node_modules/when/lib/makePromise.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function makePromise(environment) {

		var tasks = environment.scheduler;
		var emitRejection = initEmitRejection();

		var objectCreate = Object.create ||
			function(proto) {
				function Child() {}
				Child.prototype = proto;
				return new Child();
			};

		/**
		 * Create a promise whose fate is determined by resolver
		 * @constructor
		 * @returns {Promise} promise
		 * @name Promise
		 */
		function Promise(resolver, handler) {
			this._handler = resolver === Handler ? handler : init(resolver);
		}

		/**
		 * Run the supplied resolver
		 * @param resolver
		 * @returns {Pending}
		 */
		function init(resolver) {
			var handler = new Pending();

			try {
				resolver(promiseResolve, promiseReject, promiseNotify);
			} catch (e) {
				promiseReject(e);
			}

			return handler;

			/**
			 * Transition from pre-resolution state to post-resolution state, notifying
			 * all listeners of the ultimate fulfillment or rejection
			 * @param {*} x resolution value
			 */
			function promiseResolve (x) {
				handler.resolve(x);
			}
			/**
			 * Reject this promise with reason, which will be used verbatim
			 * @param {Error|*} reason rejection reason, strongly suggested
			 *   to be an Error type
			 */
			function promiseReject (reason) {
				handler.reject(reason);
			}

			/**
			 * @deprecated
			 * Issue a progress event, notifying all progress listeners
			 * @param {*} x progress event payload to pass to all listeners
			 */
			function promiseNotify (x) {
				handler.notify(x);
			}
		}

		// Creation

		Promise.resolve = resolve;
		Promise.reject = reject;
		Promise.never = never;

		Promise._defer = defer;
		Promise._handler = getHandler;

		/**
		 * Returns a trusted promise. If x is already a trusted promise, it is
		 * returned, otherwise returns a new trusted Promise which follows x.
		 * @param  {*} x
		 * @return {Promise} promise
		 */
		function resolve(x) {
			return isPromise(x) ? x
				: new Promise(Handler, new Async(getHandler(x)));
		}

		/**
		 * Return a reject promise with x as its reason (x is used verbatim)
		 * @param {*} x
		 * @returns {Promise} rejected promise
		 */
		function reject(x) {
			return new Promise(Handler, new Async(new Rejected(x)));
		}

		/**
		 * Return a promise that remains pending forever
		 * @returns {Promise} forever-pending promise.
		 */
		function never() {
			return foreverPendingPromise; // Should be frozen
		}

		/**
		 * Creates an internal {promise, resolver} pair
		 * @private
		 * @returns {Promise}
		 */
		function defer() {
			return new Promise(Handler, new Pending());
		}

		// Transformation and flow control

		/**
		 * Transform this promise's fulfillment value, returning a new Promise
		 * for the transformed result.  If the promise cannot be fulfilled, onRejected
		 * is called with the reason.  onProgress *may* be called with updates toward
		 * this promise's fulfillment.
		 * @param {function=} onFulfilled fulfillment handler
		 * @param {function=} onRejected rejection handler
		 * @param {function=} onProgress @deprecated progress handler
		 * @return {Promise} new promise
		 */
		Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
			var parent = this._handler;
			var state = parent.join().state();

			if ((typeof onFulfilled !== 'function' && state > 0) ||
				(typeof onRejected !== 'function' && state < 0)) {
				// Short circuit: value will not change, simply share handler
				return new this.constructor(Handler, parent);
			}

			var p = this._beget();
			var child = p._handler;

			parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);

			return p;
		};

		/**
		 * If this promise cannot be fulfilled due to an error, call onRejected to
		 * handle the error. Shortcut for .then(undefined, onRejected)
		 * @param {function?} onRejected
		 * @return {Promise}
		 */
		Promise.prototype['catch'] = function(onRejected) {
			return this.then(void 0, onRejected);
		};

		/**
		 * Creates a new, pending promise of the same type as this promise
		 * @private
		 * @returns {Promise}
		 */
		Promise.prototype._beget = function() {
			return begetFrom(this._handler, this.constructor);
		};

		function begetFrom(parent, Promise) {
			var child = new Pending(parent.receiver, parent.join().context);
			return new Promise(Handler, child);
		}

		// Array combinators

		Promise.all = all;
		Promise.race = race;
		Promise._traverse = traverse;

		/**
		 * Return a promise that will fulfill when all promises in the
		 * input array have fulfilled, or will reject when one of the
		 * promises rejects.
		 * @param {array} promises array of promises
		 * @returns {Promise} promise for array of fulfillment values
		 */
		function all(promises) {
			return traverseWith(snd, null, promises);
		}

		/**
		 * Array<Promise<X>> -> Promise<Array<f(X)>>
		 * @private
		 * @param {function} f function to apply to each promise's value
		 * @param {Array} promises array of promises
		 * @returns {Promise} promise for transformed values
		 */
		function traverse(f, promises) {
			return traverseWith(tryCatch2, f, promises);
		}

		function traverseWith(tryMap, f, promises) {
			var handler = typeof f === 'function' ? mapAt : settleAt;

			var resolver = new Pending();
			var pending = promises.length >>> 0;
			var results = new Array(pending);

			for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
				x = promises[i];

				if (x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				traverseAt(promises, handler, i, x, resolver);
			}

			if(pending === 0) {
				resolver.become(new Fulfilled(results));
			}

			return new Promise(Handler, resolver);

			function mapAt(i, x, resolver) {
				if(!resolver.resolved) {
					traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
				}
			}

			function settleAt(i, x, resolver) {
				results[i] = x;
				if(--pending === 0) {
					resolver.become(new Fulfilled(results));
				}
			}
		}

		function traverseAt(promises, handler, i, x, resolver) {
			if (maybeThenable(x)) {
				var h = getHandlerMaybeThenable(x);
				var s = h.state();

				if (s === 0) {
					h.fold(handler, i, void 0, resolver);
				} else if (s > 0) {
					handler(i, h.value, resolver);
				} else {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
				}
			} else {
				handler(i, x, resolver);
			}
		}

		Promise._visitRemaining = visitRemaining;
		function visitRemaining(promises, start, handler) {
			for(var i=start; i<promises.length; ++i) {
				markAsHandled(getHandler(promises[i]), handler);
			}
		}

		function markAsHandled(h, handler) {
			if(h === handler) {
				return;
			}

			var s = h.state();
			if(s === 0) {
				h.visit(h, void 0, h._unreport);
			} else if(s < 0) {
				h._unreport();
			}
		}

		/**
		 * Fulfill-reject competitive race. Return a promise that will settle
		 * to the same state as the earliest input promise to settle.
		 *
		 * WARNING: The ES6 Promise spec requires that race()ing an empty array
		 * must return a promise that is pending forever.  This implementation
		 * returns a singleton forever-pending promise, the same singleton that is
		 * returned by Promise.never(), thus can be checked with ===
		 *
		 * @param {array} promises array of promises to race
		 * @returns {Promise} if input is non-empty, a promise that will settle
		 * to the same outcome as the earliest input promise to settle. if empty
		 * is empty, returns a promise that will never settle.
		 */
		function race(promises) {
			if(typeof promises !== 'object' || promises === null) {
				return reject(new TypeError('non-iterable passed to race()'));
			}

			// Sigh, race([]) is untestable unless we return *something*
			// that is recognizable without calling .then() on it.
			return promises.length === 0 ? never()
				 : promises.length === 1 ? resolve(promises[0])
				 : runRace(promises);
		}

		function runRace(promises) {
			var resolver = new Pending();
			var i, x, h;
			for(i=0; i<promises.length; ++i) {
				x = promises[i];
				if (x === void 0 && !(i in promises)) {
					continue;
				}

				h = getHandler(x);
				if(h.state() !== 0) {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
					break;
				} else {
					h.visit(resolver, resolver.resolve, resolver.reject);
				}
			}
			return new Promise(Handler, resolver);
		}

		// Promise internals
		// Below this, everything is @private

		/**
		 * Get an appropriate handler for x, without checking for cycles
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandler(x) {
			if(isPromise(x)) {
				return x._handler.join();
			}
			return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
		}

		/**
		 * Get a handler for thenable x.
		 * NOTE: You must only call this if maybeThenable(x) == true
		 * @param {object|function|Promise} x
		 * @returns {object} handler
		 */
		function getHandlerMaybeThenable(x) {
			return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
		}

		/**
		 * Get a handler for potentially untrusted thenable x
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandlerUntrusted(x) {
			try {
				var untrustedThen = x.then;
				return typeof untrustedThen === 'function'
					? new Thenable(untrustedThen, x)
					: new Fulfilled(x);
			} catch(e) {
				return new Rejected(e);
			}
		}

		/**
		 * Handler for a promise that is pending forever
		 * @constructor
		 */
		function Handler() {}

		Handler.prototype.when
			= Handler.prototype.become
			= Handler.prototype.notify // deprecated
			= Handler.prototype.fail
			= Handler.prototype._unreport
			= Handler.prototype._report
			= noop;

		Handler.prototype._state = 0;

		Handler.prototype.state = function() {
			return this._state;
		};

		/**
		 * Recursively collapse handler chain to find the handler
		 * nearest to the fully resolved value.
		 * @returns {object} handler nearest the fully resolved value
		 */
		Handler.prototype.join = function() {
			var h = this;
			while(h.handler !== void 0) {
				h = h.handler;
			}
			return h;
		};

		Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
			this.when({
				resolver: to,
				receiver: receiver,
				fulfilled: fulfilled,
				rejected: rejected,
				progress: progress
			});
		};

		Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
			this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
		};

		Handler.prototype.fold = function(f, z, c, to) {
			this.when(new Fold(f, z, c, to));
		};

		/**
		 * Handler that invokes fail() on any handler it becomes
		 * @constructor
		 */
		function FailIfRejected() {}

		inherit(Handler, FailIfRejected);

		FailIfRejected.prototype.become = function(h) {
			h.fail();
		};

		var failIfRejected = new FailIfRejected();

		/**
		 * Handler that manages a queue of consumers waiting on a pending promise
		 * @constructor
		 */
		function Pending(receiver, inheritedContext) {
			Promise.createContext(this, inheritedContext);

			this.consumers = void 0;
			this.receiver = receiver;
			this.handler = void 0;
			this.resolved = false;
		}

		inherit(Handler, Pending);

		Pending.prototype._state = 0;

		Pending.prototype.resolve = function(x) {
			this.become(getHandler(x));
		};

		Pending.prototype.reject = function(x) {
			if(this.resolved) {
				return;
			}

			this.become(new Rejected(x));
		};

		Pending.prototype.join = function() {
			if (!this.resolved) {
				return this;
			}

			var h = this;

			while (h.handler !== void 0) {
				h = h.handler;
				if (h === this) {
					return this.handler = cycle();
				}
			}

			return h;
		};

		Pending.prototype.run = function() {
			var q = this.consumers;
			var handler = this.handler;
			this.handler = this.handler.join();
			this.consumers = void 0;

			for (var i = 0; i < q.length; ++i) {
				handler.when(q[i]);
			}
		};

		Pending.prototype.become = function(handler) {
			if(this.resolved) {
				return;
			}

			this.resolved = true;
			this.handler = handler;
			if(this.consumers !== void 0) {
				tasks.enqueue(this);
			}

			if(this.context !== void 0) {
				handler._report(this.context);
			}
		};

		Pending.prototype.when = function(continuation) {
			if(this.resolved) {
				tasks.enqueue(new ContinuationTask(continuation, this.handler));
			} else {
				if(this.consumers === void 0) {
					this.consumers = [continuation];
				} else {
					this.consumers.push(continuation);
				}
			}
		};

		/**
		 * @deprecated
		 */
		Pending.prototype.notify = function(x) {
			if(!this.resolved) {
				tasks.enqueue(new ProgressTask(x, this));
			}
		};

		Pending.prototype.fail = function(context) {
			var c = typeof context === 'undefined' ? this.context : context;
			this.resolved && this.handler.join().fail(c);
		};

		Pending.prototype._report = function(context) {
			this.resolved && this.handler.join()._report(context);
		};

		Pending.prototype._unreport = function() {
			this.resolved && this.handler.join()._unreport();
		};

		/**
		 * Wrap another handler and force it into a future stack
		 * @param {object} handler
		 * @constructor
		 */
		function Async(handler) {
			this.handler = handler;
		}

		inherit(Handler, Async);

		Async.prototype.when = function(continuation) {
			tasks.enqueue(new ContinuationTask(continuation, this));
		};

		Async.prototype._report = function(context) {
			this.join()._report(context);
		};

		Async.prototype._unreport = function() {
			this.join()._unreport();
		};

		/**
		 * Handler that wraps an untrusted thenable and assimilates it in a future stack
		 * @param {function} then
		 * @param {{then: function}} thenable
		 * @constructor
		 */
		function Thenable(then, thenable) {
			Pending.call(this);
			tasks.enqueue(new AssimilateTask(then, thenable, this));
		}

		inherit(Pending, Thenable);

		/**
		 * Handler for a fulfilled promise
		 * @param {*} x fulfillment value
		 * @constructor
		 */
		function Fulfilled(x) {
			Promise.createContext(this);
			this.value = x;
		}

		inherit(Handler, Fulfilled);

		Fulfilled.prototype._state = 1;

		Fulfilled.prototype.fold = function(f, z, c, to) {
			runContinuation3(f, z, this, c, to);
		};

		Fulfilled.prototype.when = function(cont) {
			runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
		};

		var errorId = 0;

		/**
		 * Handler for a rejected promise
		 * @param {*} x rejection reason
		 * @constructor
		 */
		function Rejected(x) {
			Promise.createContext(this);

			this.id = ++errorId;
			this.value = x;
			this.handled = false;
			this.reported = false;

			this._report();
		}

		inherit(Handler, Rejected);

		Rejected.prototype._state = -1;

		Rejected.prototype.fold = function(f, z, c, to) {
			to.become(this);
		};

		Rejected.prototype.when = function(cont) {
			if(typeof cont.rejected === 'function') {
				this._unreport();
			}
			runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
		};

		Rejected.prototype._report = function(context) {
			tasks.afterQueue(new ReportTask(this, context));
		};

		Rejected.prototype._unreport = function() {
			if(this.handled) {
				return;
			}
			this.handled = true;
			tasks.afterQueue(new UnreportTask(this));
		};

		Rejected.prototype.fail = function(context) {
			this.reported = true;
			emitRejection('unhandledRejection', this);
			Promise.onFatalRejection(this, context === void 0 ? this.context : context);
		};

		function ReportTask(rejection, context) {
			this.rejection = rejection;
			this.context = context;
		}

		ReportTask.prototype.run = function() {
			if(!this.rejection.handled && !this.rejection.reported) {
				this.rejection.reported = true;
				emitRejection('unhandledRejection', this.rejection) ||
					Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
			}
		};

		function UnreportTask(rejection) {
			this.rejection = rejection;
		}

		UnreportTask.prototype.run = function() {
			if(this.rejection.reported) {
				emitRejection('rejectionHandled', this.rejection) ||
					Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
			}
		};

		// Unhandled rejection hooks
		// By default, everything is a noop

		Promise.createContext
			= Promise.enterContext
			= Promise.exitContext
			= Promise.onPotentiallyUnhandledRejection
			= Promise.onPotentiallyUnhandledRejectionHandled
			= Promise.onFatalRejection
			= noop;

		// Errors and singletons

		var foreverPendingHandler = new Handler();
		var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

		function cycle() {
			return new Rejected(new TypeError('Promise cycle'));
		}

		// Task runners

		/**
		 * Run a single consumer
		 * @constructor
		 */
		function ContinuationTask(continuation, handler) {
			this.continuation = continuation;
			this.handler = handler;
		}

		ContinuationTask.prototype.run = function() {
			this.handler.join().when(this.continuation);
		};

		/**
		 * Run a queue of progress handlers
		 * @constructor
		 */
		function ProgressTask(value, handler) {
			this.handler = handler;
			this.value = value;
		}

		ProgressTask.prototype.run = function() {
			var q = this.handler.consumers;
			if(q === void 0) {
				return;
			}

			for (var c, i = 0; i < q.length; ++i) {
				c = q[i];
				runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
			}
		};

		/**
		 * Assimilate a thenable, sending it's value to resolver
		 * @param {function} then
		 * @param {object|function} thenable
		 * @param {object} resolver
		 * @constructor
		 */
		function AssimilateTask(then, thenable, resolver) {
			this._then = then;
			this.thenable = thenable;
			this.resolver = resolver;
		}

		AssimilateTask.prototype.run = function() {
			var h = this.resolver;
			tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

			function _resolve(x) { h.resolve(x); }
			function _reject(x)  { h.reject(x); }
			function _notify(x)  { h.notify(x); }
		};

		function tryAssimilate(then, thenable, resolve, reject, notify) {
			try {
				then.call(thenable, resolve, reject, notify);
			} catch (e) {
				reject(e);
			}
		}

		/**
		 * Fold a handler value with z
		 * @constructor
		 */
		function Fold(f, z, c, to) {
			this.f = f; this.z = z; this.c = c; this.to = to;
			this.resolver = failIfRejected;
			this.receiver = this;
		}

		Fold.prototype.fulfilled = function(x) {
			this.f.call(this.c, this.z, x, this.to);
		};

		Fold.prototype.rejected = function(x) {
			this.to.reject(x);
		};

		Fold.prototype.progress = function(x) {
			this.to.notify(x);
		};

		// Other helpers

		/**
		 * @param {*} x
		 * @returns {boolean} true iff x is a trusted Promise
		 */
		function isPromise(x) {
			return x instanceof Promise;
		}

		/**
		 * Test just enough to rule out primitives, in order to take faster
		 * paths in some code
		 * @param {*} x
		 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
		 */
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}

		function runContinuation1(f, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject(f, h.value, receiver, next);
			Promise.exitContext();
		}

		function runContinuation3(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject3(f, x, h.value, receiver, next);
			Promise.exitContext();
		}

		/**
		 * @deprecated
		 */
		function runNotify(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.notify(x);
			}

			Promise.enterContext(h);
			tryCatchReturn(f, x, receiver, next);
			Promise.exitContext();
		}

		function tryCatch2(f, a, b) {
			try {
				return f(a, b);
			} catch(e) {
				return reject(e);
			}
		}

		/**
		 * Return f.call(thisArg, x), or if it throws return a rejected promise for
		 * the thrown exception
		 */
		function tryCatchReject(f, x, thisArg, next) {
			try {
				next.become(getHandler(f.call(thisArg, x)));
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * Same as above, but includes the extra argument parameter.
		 */
		function tryCatchReject3(f, x, y, thisArg, next) {
			try {
				f.call(thisArg, x, y, next);
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * @deprecated
		 * Return f.call(thisArg, x), or if it throws, *return* the exception
		 */
		function tryCatchReturn(f, x, thisArg, next) {
			try {
				next.notify(f.call(thisArg, x));
			} catch(e) {
				next.notify(e);
			}
		}

		function inherit(Parent, Child) {
			Child.prototype = objectCreate(Parent.prototype);
			Child.prototype.constructor = Child;
		}

		function snd(x, y) {
			return y;
		}

		function noop() {}

		function hasCustomEvent() {
			if(typeof CustomEvent === 'function') {
				try {
					var ev = new CustomEvent('unhandledRejection');
					return ev instanceof CustomEvent;
				} catch (ignoredException) {}
			}
			return false;
		}

		function hasInternetExplorerCustomEvent() {
			if(typeof document !== 'undefined' && typeof document.createEvent === 'function') {
				try {
					// Try to create one event to make sure it's supported
					var ev = document.createEvent('CustomEvent');
					ev.initCustomEvent('eventType', false, true, {});
					return true;
				} catch (ignoredException) {}
			}
			return false;
		}

		function initEmitRejection() {
			/*global process, self, CustomEvent*/
			if(typeof process !== 'undefined' && process !== null
				&& typeof process.emit === 'function') {
				// Returning falsy here means to call the default
				// onPotentiallyUnhandledRejection API.  This is safe even in
				// browserify since process.emit always returns falsy in browserify:
				// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
				return function(type, rejection) {
					return type === 'unhandledRejection'
						? process.emit(type, rejection.value, rejection)
						: process.emit(type, rejection);
				};
			} else if(typeof self !== 'undefined' && hasCustomEvent()) {
				return (function (self, CustomEvent) {
					return function (type, rejection) {
						var ev = new CustomEvent(type, {
							detail: {
								reason: rejection.value,
								key: rejection
							},
							bubbles: false,
							cancelable: true
						});

						return !self.dispatchEvent(ev);
					};
				}(self, CustomEvent));
			} else if(typeof self !== 'undefined' && hasInternetExplorerCustomEvent()) {
				return (function(self, document) {
					return function(type, rejection) {
						var ev = document.createEvent('CustomEvent');
						ev.initCustomEvent(type, false, true, {
							reason: rejection.value,
							key: rejection
						});

						return !self.dispatchEvent(ev);
					};
				}(self, document));
			}

			return noop;
		}

		return Promise;
	};
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/when/lib/state.js":
/*!****************************************!*\
  !*** ./node_modules/when/lib/state.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return {
		pending: toPendingState,
		fulfilled: toFulfilledState,
		rejected: toRejectedState,
		inspect: inspect
	};

	function toPendingState() {
		return { state: 'pending' };
	}

	function toRejectedState(e) {
		return { state: 'rejected', reason: e };
	}

	function toFulfilledState(x) {
		return { state: 'fulfilled', value: x };
	}

	function inspect(handler) {
		var state = handler.state();
		return state === 0 ? toPendingState()
			 : state > 0   ? toFulfilledState(handler.value)
			               : toRejectedState(handler.value);
	}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/when.js":
/*!***********************************!*\
  !*** ./node_modules/when/when.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */

/**
 * Promises/A+ and when() implementation
 * when is part of the cujoJS family of libraries (http://cujojs.com/)
 * @author Brian Cavalier
 * @author John Hann
 */
(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	var timed = __webpack_require__(/*! ./lib/decorators/timed */ "./node_modules/when/lib/decorators/timed.js");
	var array = __webpack_require__(/*! ./lib/decorators/array */ "./node_modules/when/lib/decorators/array.js");
	var flow = __webpack_require__(/*! ./lib/decorators/flow */ "./node_modules/when/lib/decorators/flow.js");
	var fold = __webpack_require__(/*! ./lib/decorators/fold */ "./node_modules/when/lib/decorators/fold.js");
	var inspect = __webpack_require__(/*! ./lib/decorators/inspect */ "./node_modules/when/lib/decorators/inspect.js");
	var generate = __webpack_require__(/*! ./lib/decorators/iterate */ "./node_modules/when/lib/decorators/iterate.js");
	var progress = __webpack_require__(/*! ./lib/decorators/progress */ "./node_modules/when/lib/decorators/progress.js");
	var withThis = __webpack_require__(/*! ./lib/decorators/with */ "./node_modules/when/lib/decorators/with.js");
	var unhandledRejection = __webpack_require__(/*! ./lib/decorators/unhandledRejection */ "./node_modules/when/lib/decorators/unhandledRejection.js");
	var TimeoutError = __webpack_require__(/*! ./lib/TimeoutError */ "./node_modules/when/lib/TimeoutError.js");

	var Promise = [array, flow, fold, generate, progress,
		inspect, withThis, timed, unhandledRejection]
		.reduce(function(Promise, feature) {
			return feature(Promise);
		}, __webpack_require__(/*! ./lib/Promise */ "./node_modules/when/lib/Promise.js"));

	var apply = __webpack_require__(/*! ./lib/apply */ "./node_modules/when/lib/apply.js")(Promise);

	// Public API

	when.promise     = promise;              // Create a pending promise
	when.resolve     = Promise.resolve;      // Create a resolved promise
	when.reject      = Promise.reject;       // Create a rejected promise

	when.lift        = lift;                 // lift a function to return promises
	when['try']      = attempt;              // call a function and return a promise
	when.attempt     = attempt;              // alias for when.try

	when.iterate     = Promise.iterate;      // DEPRECATED (use cujojs/most streams) Generate a stream of promises
	when.unfold      = Promise.unfold;       // DEPRECATED (use cujojs/most streams) Generate a stream of promises

	when.join        = join;                 // Join 2 or more promises

	when.all         = all;                  // Resolve a list of promises
	when.settle      = settle;               // Settle a list of promises

	when.any         = lift(Promise.any);    // One-winner race
	when.some        = lift(Promise.some);   // Multi-winner race
	when.race        = lift(Promise.race);   // First-to-settle race

	when.map         = map;                  // Array.map() for promises
	when.filter      = filter;               // Array.filter() for promises
	when.reduce      = lift(Promise.reduce);       // Array.reduce() for promises
	when.reduceRight = lift(Promise.reduceRight);  // Array.reduceRight() for promises

	when.isPromiseLike = isPromiseLike;      // Is something promise-like, aka thenable

	when.Promise     = Promise;              // Promise constructor
	when.defer       = defer;                // Create a {promise, resolve, reject} tuple

	// Error types

	when.TimeoutError = TimeoutError;

	/**
	 * Get a trusted promise for x, or by transforming x with onFulfilled
	 *
	 * @param {*} x
	 * @param {function?} onFulfilled callback to be called when x is
	 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
	 *   will be invoked immediately.
	 * @param {function?} onRejected callback to be called when x is
	 *   rejected.
	 * @param {function?} onProgress callback to be called when progress updates
	 *   are issued for x. @deprecated
	 * @returns {Promise} a new promise that will fulfill with the return
	 *   value of callback or errback or the completion value of promiseOrValue if
	 *   callback and/or errback is not supplied.
	 */
	function when(x, onFulfilled, onRejected, onProgress) {
		var p = Promise.resolve(x);
		if (arguments.length < 2) {
			return p;
		}

		return p.then(onFulfilled, onRejected, onProgress);
	}

	/**
	 * Creates a new promise whose fate is determined by resolver.
	 * @param {function} resolver function(resolve, reject, notify)
	 * @returns {Promise} promise whose fate is determine by resolver
	 */
	function promise(resolver) {
		return new Promise(resolver);
	}

	/**
	 * Lift the supplied function, creating a version of f that returns
	 * promises, and accepts promises as arguments.
	 * @param {function} f
	 * @returns {Function} version of f that returns promises
	 */
	function lift(f) {
		return function() {
			for(var i=0, l=arguments.length, a=new Array(l); i<l; ++i) {
				a[i] = arguments[i];
			}
			return apply(f, this, a);
		};
	}

	/**
	 * Call f in a future turn, with the supplied args, and return a promise
	 * for the result.
	 * @param {function} f
	 * @returns {Promise}
	 */
	function attempt(f /*, args... */) {
		/*jshint validthis:true */
		for(var i=0, l=arguments.length-1, a=new Array(l); i<l; ++i) {
			a[i] = arguments[i+1];
		}
		return apply(f, this, a);
	}

	/**
	 * Creates a {promise, resolver} pair, either or both of which
	 * may be given out safely to consumers.
	 * @return {{promise: Promise, resolve: function, reject: function, notify: function}}
	 */
	function defer() {
		return new Deferred();
	}

	function Deferred() {
		var p = Promise._defer();

		function resolve(x) { p._handler.resolve(x); }
		function reject(x) { p._handler.reject(x); }
		function notify(x) { p._handler.notify(x); }

		this.promise = p;
		this.resolve = resolve;
		this.reject = reject;
		this.notify = notify;
		this.resolver = { resolve: resolve, reject: reject, notify: notify };
	}

	/**
	 * Determines if x is promise-like, i.e. a thenable object
	 * NOTE: Will return true for *any thenable object*, and isn't truly
	 * safe, since it may attempt to access the `then` property of x (i.e.
	 *  clever/malicious getters may do weird things)
	 * @param {*} x anything
	 * @returns {boolean} true if x is promise-like
	 */
	function isPromiseLike(x) {
		return x && typeof x.then === 'function';
	}

	/**
	 * Return a promise that will resolve only once all the supplied arguments
	 * have resolved. The resolution value of the returned promise will be an array
	 * containing the resolution values of each of the arguments.
	 * @param {...*} arguments may be a mix of promises and values
	 * @returns {Promise}
	 */
	function join(/* ...promises */) {
		return Promise.all(arguments);
	}

	/**
	 * Return a promise that will fulfill once all input promises have
	 * fulfilled, or reject when any one input promise rejects.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise}
	 */
	function all(promises) {
		return when(promises, Promise.all);
	}

	/**
	 * Return a promise that will always fulfill with an array containing
	 * the outcome states of all input promises.  The returned promise
	 * will only reject if `promises` itself is a rejected promise.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise} promise for array of settled state descriptors
	 */
	function settle(promises) {
		return when(promises, Promise.settle);
	}

	/**
	 * Promise-aware array map function, similar to `Array.prototype.map()`,
	 * but input array may contain promises or values.
	 * @param {Array|Promise} promises array of anything, may contain promises and values
	 * @param {function(x:*, index:Number):*} mapFunc map function which may
	 *  return a promise or value
	 * @returns {Promise} promise that will fulfill with an array of mapped values
	 *  or reject if any input promise rejects.
	 */
	function map(promises, mapFunc) {
		return when(promises, function(promises) {
			return Promise.map(promises, mapFunc);
		});
	}

	/**
	 * Filter the provided array of promises using the provided predicate.  Input may
	 * contain promises and values
	 * @param {Array|Promise} promises array of promises and values
	 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
	 *  Must return truthy (or promise for truthy) for items to retain.
	 * @returns {Promise} promise that will fulfill with an array containing all items
	 *  for which predicate returned truthy.
	 */
	function filter(promises, predicate) {
		return when(promises, function(promises) {
			return Promise.filter(promises, predicate);
		});
	}

	return when;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js"));


/***/ }),

/***/ "./vendor/gos/web-socket-bundle/Resources/public/js/vendor/autobahn.min.js":
/*!*********************************************************************************!*\
  !*** ./vendor/gos/web-socket-bundle/Resources/public/js/vendor/autobahn.min.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 AutobahnJS - http://autobahn.ws

 Copyright (C) 2011-2014 Tavendo GmbH.
 Licensed under the MIT License.
 See license text at http://www.opensource.org/licenses/mit-license.php

 AutobahnJS includes code from:

 when - http://cujojs.com

 (c) copyright B Cavalier & J Hann
 Licensed under the MIT License at:
 http://www.opensource.org/licenses/mit-license.php

 Crypto-JS - http://code.google.com/p/crypto-js/

 (c) 2009-2012 by Jeff Mott. All rights reserved.
 Licensed under the New BSD License at:
 http://code.google.com/p/crypto-js/wiki/License

 console-normalizer - https://github.com/Zenovations/console-normalizer

 (c) 2012 by Zenovations.
 Licensed under the MIT License at:
 http://www.opensource.org/licenses/mit-license.php

 */
window.define || (window.define = function (c) {
    try {
        delete window.define;
    } catch (g) {
        window.define = void 0;
    }window.when = c();
}, window.define.amd = {});(function (c) {
    c || (c = window.console = { log: function log(c, a, b, d, h) {}, info: function info(c, a, b, d, h) {}, warn: function warn(c, a, b, d, h) {}, error: function error(c, a, b, d, h) {} });Function.prototype.bind || (Function.prototype.bind = function (c) {
        var a = this,
            b = Array.prototype.slice.call(arguments, 1);return function () {
            return a.apply(c, Array.prototype.concat.apply(b, arguments));
        };
    });"object" === _typeof(c.log) && (c.log = Function.prototype.call.bind(c.log, c), c.info = Function.prototype.call.bind(c.info, c), c.warn = Function.prototype.call.bind(c.warn, c), c.error = Function.prototype.call.bind(c.error, c));"group" in c || (c.group = function (g) {
        c.info("\n--- " + g + " ---\n");
    });"groupEnd" in c || (c.groupEnd = function () {
        c.log("\n");
    });"time" in c || function () {
        var g = {};c.time = function (a) {
            g[a] = new Date().getTime();
        };c.timeEnd = function (a) {
            var b = new Date().getTime();c.info(a + ": " + (a in g ? b - g[a] : 0) + "ms");
        };
    }();
})(window.console); /*
                    MIT License (c) copyright 2011-2013 original author or authors */
(function (c) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function (c) {
        function a(a, b, e, c) {
            return (a instanceof d ? a : h(a)).then(b, e, c);
        }function b(a) {
            return new d(a, B.PromiseStatus && B.PromiseStatus());
        }function d(a, b) {
            function d(a) {
                if (m) {
                    var c = m;m = w;p(function () {
                        q = e(l, a);b && A(q, b);f(c, q);
                    });
                }
            }function c(a) {
                d(new k(a));
            }function h(a) {
                if (m) {
                    var b = m;p(function () {
                        f(b, new z(a));
                    });
                }
            }var l,
                q,
                m = [];l = this;this._status = b;this.inspect = function () {
                return q ? q.inspect() : { state: "pending" };
            };this._when = function (a, b, e, d, c) {
                function f(h) {
                    h._when(a, b, e, d, c);
                }m ? m.push(f) : p(function () {
                    f(q);
                });
            };try {
                a(d, c, h);
            } catch (n) {
                c(n);
            }
        }function h(a) {
            return b(function (b) {
                b(a);
            });
        }function f(a, b) {
            for (var e = 0; e < a.length; e++) {
                a[e](b);
            }
        }function e(a, b) {
            if (b === a) return new k(new TypeError());if (b instanceof d) return b;try {
                var e = b === Object(b) && b.then;return "function" === typeof e ? l(e, b) : new t(b);
            } catch (c) {
                return new k(c);
            }
        }function l(a, e) {
            return b(function (b, d) {
                G(a, e, b, d);
            });
        }function t(a) {
            this.value = a;
        }function k(a) {
            this.value = a;
        }function z(a) {
            this.value = a;
        }function A(a, b) {
            a.then(function () {
                b.fulfilled();
            }, function (a) {
                b.rejected(a);
            });
        }function q(a) {
            return a && "function" === typeof a.then;
        }function m(e, d, c, f, h) {
            return a(e, function (e) {
                return b(function (b, c, f) {
                    function h(a) {
                        _n(a);
                    }function A(a) {
                        _k(a);
                    }var l, q, D, m, _k, _n, t, g;t = e.length >>> 0;l = Math.max(0, Math.min(d, t));D = [];q = t - l + 1;m = [];if (l) {
                        _n = function n(a) {
                            m.push(a);--q || (_k = _n = s, c(m));
                        };_k = function k(a) {
                            D.push(a);--l || (_k = _n = s, b(D));
                        };for (g = 0; g < t; ++g) {
                            g in e && a(e[g], A, h, f);
                        }
                    } else b(D);
                }).then(c, f, h);
            });
        }function n(a, b, e, d) {
            return u(a, s).then(b, e, d);
        }function u(b, e, c) {
            return a(b, function (b) {
                return new d(function (d, f, h) {
                    function A(b, q) {
                        a(b, e, c).then(function (a) {
                            l[q] = a;--k || d(l);
                        }, f, h);
                    }var l, q, k, m;k = q = b.length >>> 0;l = [];if (k) for (m = 0; m < q; m++) {
                        m in b ? A(b[m], m) : --k;
                    } else d(l);
                });
            });
        }function y(a) {
            return { state: "fulfilled", value: a };
        }function x(a) {
            return { state: "rejected", reason: a };
        }function p(a) {
            1 === E.push(a) && C(v);
        }function v() {
            f(E);E = [];
        }function s(a) {
            return a;
        }function K(a) {
            "function" === typeof B.reportUnhandled ? B.reportUnhandled() : p(function () {
                throw a;
            });throw a;
        }a.promise = b;a.resolve = h;a.reject = function (b) {
            return a(b, function (a) {
                return new k(a);
            });
        };
        a.defer = function () {
            var a, e, d;a = { promise: w, resolve: w, reject: w, notify: w, resolver: { resolve: w, reject: w, notify: w } };a.promise = e = b(function (b, c, f) {
                a.resolve = a.resolver.resolve = function (a) {
                    if (d) return h(a);d = !0;b(a);return e;
                };a.reject = a.resolver.reject = function (a) {
                    if (d) return h(new k(a));d = !0;c(a);return e;
                };a.notify = a.resolver.notify = function (a) {
                    f(a);return a;
                };
            });return a;
        };a.join = function () {
            return u(arguments, s);
        };a.all = n;a.map = function (a, b) {
            return u(a, b);
        };a.reduce = function (b, e) {
            var d = G(H, arguments, 1);return a(b, function (b) {
                var c;c = b.length;d[0] = function (b, d, f) {
                    return a(b, function (b) {
                        return a(d, function (a) {
                            return e(b, a, f, c);
                        });
                    });
                };return I.apply(b, d);
            });
        };a.settle = function (a) {
            return u(a, y, x);
        };a.any = function (a, b, e, d) {
            return m(a, 1, function (a) {
                return b ? b(a[0]) : a[0];
            }, e, d);
        };a.some = m;a.isPromise = q;a.isPromiseLike = q;r = d.prototype;r.then = function (a, b, e) {
            var c = this;return new d(function (d, f, h) {
                c._when(d, h, a, b, e);
            }, this._status && this._status.observed());
        };r["catch"] = r.otherwise = function (a) {
            return this.then(w, a);
        };r["finally"] = r.ensure = function (a) {
            function b() {
                return h(a());
            }return "function" === typeof a ? this.then(b, b).yield(this) : this;
        };r.done = function (a, b) {
            this.then(a, b)["catch"](K);
        };r.yield = function (a) {
            return this.then(function () {
                return a;
            });
        };r.tap = function (a) {
            return this.then(a).yield(this);
        };r.spread = function (a) {
            return this.then(function (b) {
                return n(b, function (b) {
                    return a.apply(w, b);
                });
            });
        };r.always = function (a, b) {
            return this.then(a, a, b);
        };F = Object.create || function (a) {
            function b() {}b.prototype = a;return new b();
        };t.prototype = F(r);
        t.prototype.inspect = function () {
            return y(this.value);
        };t.prototype._when = function (a, b, e) {
            try {
                a("function" === typeof e ? e(this.value) : this.value);
            } catch (d) {
                a(new k(d));
            }
        };k.prototype = F(r);k.prototype.inspect = function () {
            return x(this.value);
        };k.prototype._when = function (a, b, e, d) {
            try {
                a("function" === typeof d ? d(this.value) : this);
            } catch (c) {
                a(new k(c));
            }
        };z.prototype = F(r);z.prototype._when = function (a, b, e, d, c) {
            try {
                b("function" === typeof c ? c(this.value) : this.value);
            } catch (f) {
                b(f);
            }
        };var r, F, I, H, G, C, E, B, J, w;E = [];B = "undefined" !== typeof console ? console : a;if ("object" === (typeof process === "undefined" ? "undefined" : _typeof(process)) && process.nextTick) C = process.nextTick;else if (r = "function" === typeof MutationObserver && MutationObserver || "function" === typeof WebKitMutationObserver && WebKitMutationObserver) C = function (a, b, e) {
            var d = a.createElement("div");new b(e).observe(d, { attributes: !0 });return function () {
                d.setAttribute("x", "x");
            };
        }(document, r, v);else try {
            C = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).runOnLoop || __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).runOnContext;
        } catch (L) {
            J = setTimeout, C = function C(a) {
                J(a, 0);
            };
        }c = Function.prototype;r = c.call;G = c.bind ? r.bind(r) : function (a, b) {
            return a.apply(b, H.call(arguments, 2));
        };c = [];H = c.slice;I = c.reduce || function (a) {
            var b, e, d, c, f;f = 0;b = Object(this);c = b.length >>> 0;e = arguments;if (1 >= e.length) for (;;) {
                if (f in b) {
                    d = b[f++];break;
                }if (++f >= c) throw new TypeError();
            } else d = e[1];for (; f < c; ++f) {
                f in b && (d = a(d, b[f], f, b));
            }return d;
        };return a;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js"));var CryptoJS = CryptoJS || function (c, g) {
    var a = {},
        b = a.lib = {},
        d = b.Base = function () {
        function a() {}return { extend: function extend(b) {
                a.prototype = this;var e = new a();b && e.mixIn(b);e.hasOwnProperty("init") || (e.init = function () {
                    e.$super.init.apply(this, arguments);
                });e.init.prototype = e;e.$super = this;return e;
            }, create: function create() {
                var a = this.extend();a.init.apply(a, arguments);return a;
            }, init: function init() {}, mixIn: function mixIn(a) {
                for (var b in a) {
                    a.hasOwnProperty(b) && (this[b] = a[b]);
                }a.hasOwnProperty("toString") && (this.toString = a.toString);
            },
            clone: function clone() {
                return this.init.prototype.extend(this);
            } };
    }(),
        h = b.WordArray = d.extend({ init: function init(a, b) {
            a = this.words = a || [];this.sigBytes = b != g ? b : 4 * a.length;
        }, toString: function toString(a) {
            return (a || e).stringify(this);
        }, concat: function concat(a) {
            var b = this.words,
                e = a.words,
                d = this.sigBytes;a = a.sigBytes;this.clamp();if (d % 4) for (var c = 0; c < a; c++) {
                b[d + c >>> 2] |= (e[c >>> 2] >>> 24 - 8 * (c % 4) & 255) << 24 - 8 * ((d + c) % 4);
            } else if (65535 < e.length) for (c = 0; c < a; c += 4) {
                b[d + c >>> 2] = e[c >>> 2];
            } else b.push.apply(b, e);this.sigBytes += a;return this;
        }, clamp: function clamp() {
            var a = this.words,
                b = this.sigBytes;a[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);a.length = c.ceil(b / 4);
        }, clone: function clone() {
            var a = d.clone.call(this);a.words = this.words.slice(0);return a;
        }, random: function random(a) {
            for (var b = [], e = 0; e < a; e += 4) {
                b.push(4294967296 * c.random() | 0);
            }return new h.init(b, a);
        } }),
        f = a.enc = {},
        e = f.Hex = { stringify: function stringify(a) {
            var b = a.words;a = a.sigBytes;for (var e = [], d = 0; d < a; d++) {
                var c = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;e.push((c >>> 4).toString(16));e.push((c & 15).toString(16));
            }return e.join("");
        }, parse: function parse(a) {
            for (var b = a.length, e = [], d = 0; d < b; d += 2) {
                e[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
            }return new h.init(e, b / 2);
        } },
        l = f.Latin1 = { stringify: function stringify(a) {
            var b = a.words;a = a.sigBytes;for (var e = [], d = 0; d < a; d++) {
                e.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
            }return e.join("");
        }, parse: function parse(a) {
            for (var b = a.length, e = [], d = 0; d < b; d++) {
                e[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4);
            }return new h.init(e, b);
        } },
        t = f.Utf8 = { stringify: function stringify(a) {
            try {
                return decodeURIComponent(escape(l.stringify(a)));
            } catch (b) {
                throw Error("Malformed UTF-8 data");
            }
        }, parse: function parse(a) {
            return l.parse(unescape(encodeURIComponent(a)));
        } },
        k = b.BufferedBlockAlgorithm = d.extend({ reset: function reset() {
            this._data = new h.init();this._nDataBytes = 0;
        }, _append: function _append(a) {
            "string" == typeof a && (a = t.parse(a));this._data.concat(a);this._nDataBytes += a.sigBytes;
        }, _process: function _process(a) {
            var b = this._data,
                e = b.words,
                d = b.sigBytes,
                f = this.blockSize,
                l = d / (4 * f),
                l = a ? c.ceil(l) : c.max((l | 0) - this._minBufferSize, 0);a = l * f;d = c.min(4 * a, d);if (a) {
                for (var k = 0; k < a; k += f) {
                    this._doProcessBlock(e, k);
                }k = e.splice(0, a);b.sigBytes -= d;
            }return new h.init(k, d);
        }, clone: function clone() {
            var a = d.clone.call(this);a._data = this._data.clone();return a;
        }, _minBufferSize: 0 });b.Hasher = k.extend({ cfg: d.extend(), init: function init(a) {
            this.cfg = this.cfg.extend(a);this.reset();
        }, reset: function reset() {
            k.reset.call(this);this._doReset();
        }, update: function update(a) {
            this._append(a);this._process();return this;
        }, finalize: function finalize(a) {
            a && this._append(a);return this._doFinalize();
        }, blockSize: 16, _createHelper: function _createHelper(a) {
            return function (b, e) {
                return new a.init(e).finalize(b);
            };
        }, _createHmacHelper: function _createHmacHelper(a) {
            return function (b, e) {
                return new z.HMAC.init(a, e).finalize(b);
            };
        } });var z = a.algo = {};return a;
}(Math);(function () {
    var c = CryptoJS,
        g = c.lib.WordArray;c.enc.Base64 = { stringify: function stringify(a) {
            var b = a.words,
                d = a.sigBytes,
                c = this._map;a.clamp();a = [];for (var f = 0; f < d; f += 3) {
                for (var e = (b[f >>> 2] >>> 24 - 8 * (f % 4) & 255) << 16 | (b[f + 1 >>> 2] >>> 24 - 8 * ((f + 1) % 4) & 255) << 8 | b[f + 2 >>> 2] >>> 24 - 8 * ((f + 2) % 4) & 255, l = 0; 4 > l && f + 0.75 * l < d; l++) {
                    a.push(c.charAt(e >>> 6 * (3 - l) & 63));
                }
            }if (b = c.charAt(64)) for (; a.length % 4;) {
                a.push(b);
            }return a.join("");
        }, parse: function parse(a) {
            var b = a.length,
                d = this._map,
                c = d.charAt(64);c && (c = a.indexOf(c), -1 != c && (b = c));for (var c = [], f = 0, e = 0; e < b; e++) {
                if (e % 4) {
                    var l = d.indexOf(a.charAt(e - 1)) << 2 * (e % 4),
                        t = d.indexOf(a.charAt(e)) >>> 6 - 2 * (e % 4);c[f >>> 2] |= (l | t) << 24 - 8 * (f % 4);f++;
                }
            }return g.create(c, f);
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
})();(function () {
    var c = CryptoJS,
        g = c.enc.Utf8;c.algo.HMAC = c.lib.Base.extend({ init: function init(a, b) {
            a = this._hasher = new a.init();"string" == typeof b && (b = g.parse(b));var d = a.blockSize,
                c = 4 * d;b.sigBytes > c && (b = a.finalize(b));b.clamp();for (var f = this._oKey = b.clone(), e = this._iKey = b.clone(), l = f.words, t = e.words, k = 0; k < d; k++) {
                l[k] ^= 1549556828, t[k] ^= 909522486;
            }f.sigBytes = e.sigBytes = c;this.reset();
        }, reset: function reset() {
            var a = this._hasher;a.reset();a.update(this._iKey);
        }, update: function update(a) {
            this._hasher.update(a);return this;
        }, finalize: function finalize(a) {
            var b = this._hasher;a = b.finalize(a);b.reset();return b.finalize(this._oKey.clone().concat(a));
        } });
})();(function (c) {
    var g = CryptoJS,
        a = g.lib,
        b = a.WordArray,
        d = a.Hasher,
        a = g.algo,
        h = [],
        f = [];(function () {
        function a(b) {
            for (var e = c.sqrt(b), d = 2; d <= e; d++) {
                if (!(b % d)) return !1;
            }return !0;
        }function b(a) {
            return 4294967296 * (a - (a | 0)) | 0;
        }for (var e = 2, d = 0; 64 > d;) {
            a(e) && (8 > d && (h[d] = b(c.pow(e, 0.5))), f[d] = b(c.pow(e, 1 / 3)), d++), e++;
        }
    })();var e = [],
        a = a.SHA256 = d.extend({ _doReset: function _doReset() {
            this._hash = new b.init(h.slice(0));
        }, _doProcessBlock: function _doProcessBlock(a, b) {
            for (var d = this._hash.words, c = d[0], h = d[1], g = d[2], m = d[3], n = d[4], u = d[5], y = d[6], x = d[7], p = 0; 64 > p; p++) {
                if (16 > p) e[p] = a[b + p] | 0;else {
                    var v = e[p - 15],
                        s = e[p - 2];e[p] = ((v << 25 | v >>> 7) ^ (v << 14 | v >>> 18) ^ v >>> 3) + e[p - 7] + ((s << 15 | s >>> 17) ^ (s << 13 | s >>> 19) ^ s >>> 10) + e[p - 16];
                }v = x + ((n << 26 | n >>> 6) ^ (n << 21 | n >>> 11) ^ (n << 7 | n >>> 25)) + (n & u ^ ~n & y) + f[p] + e[p];s = ((c << 30 | c >>> 2) ^ (c << 19 | c >>> 13) ^ (c << 10 | c >>> 22)) + (c & h ^ c & g ^ h & g);x = y;y = u;u = n;n = m + v | 0;m = g;g = h;h = c;c = v + s | 0;
            }d[0] = d[0] + c | 0;d[1] = d[1] + h | 0;d[2] = d[2] + g | 0;d[3] = d[3] + m | 0;d[4] = d[4] + n | 0;d[5] = d[5] + u | 0;d[6] = d[6] + y | 0;d[7] = d[7] + x | 0;
        }, _doFinalize: function _doFinalize() {
            var a = this._data,
                b = a.words,
                d = 8 * this._nDataBytes,
                e = 8 * a.sigBytes;b[e >>> 5] |= 128 << 24 - e % 32;b[(e + 64 >>> 9 << 4) + 14] = c.floor(d / 4294967296);b[(e + 64 >>> 9 << 4) + 15] = d;a.sigBytes = 4 * b.length;this._process();return this._hash;
        }, clone: function clone() {
            var a = d.clone.call(this);a._hash = this._hash.clone();return a;
        } });g.SHA256 = d._createHelper(a);g.HmacSHA256 = d._createHmacHelper(a);
})(Math);(function () {
    var c = CryptoJS,
        g = c.lib,
        a = g.Base,
        b = g.WordArray,
        g = c.algo,
        d = g.HMAC,
        h = g.PBKDF2 = a.extend({ cfg: a.extend({ keySize: 4, hasher: g.SHA1, iterations: 1 }), init: function init(a) {
            this.cfg = this.cfg.extend(a);
        }, compute: function compute(a, e) {
            for (var c = this.cfg, h = d.create(c.hasher, a), g = b.create(), z = b.create([1]), A = g.words, q = z.words, m = c.keySize, c = c.iterations; A.length < m;) {
                var n = h.update(e).finalize(z);h.reset();for (var u = n.words, y = u.length, x = n, p = 1; p < c; p++) {
                    x = h.finalize(x);h.reset();for (var v = x.words, s = 0; s < y; s++) {
                        u[s] ^= v[s];
                    }
                }g.concat(n);
                q[0]++;
            }g.sigBytes = 4 * m;return g;
        } });c.PBKDF2 = function (a, b, d) {
        return h.create(d).compute(a, b);
    };
})(); /*
      MIT License (c) 2011-2013 Copyright Tavendo GmbH. */
var AUTOBAHNJS_VERSION = "0.8.2",
    global = this;
(function (c, g) {
     true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! when */ "./node_modules/when/when.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (a) {
        return c.ab = g(c, a);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" !== typeof exports ? "undefined" != typeof module && module.exports && (exports = module.exports = g(c, c.when)) : c.ab = g(c, c.when);
})(global, function (c, g) {
    var a = { _version: AUTOBAHNJS_VERSION };(function () {
        Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
            if (null === this) throw new TypeError();var d = Object(this),
                c = d.length >>> 0;if (0 === c) return -1;var f = 0;0 < arguments.length && (f = Number(arguments[1]), f !== f ? f = 0 : 0 !== f && Infinity !== f && -Infinity !== f && (f = (0 < f || -1) * Math.floor(Math.abs(f))));if (f >= c) return -1;for (f = 0 <= f ? f : Math.max(c - Math.abs(f), 0); f < c; f++) {
                if (f in d && d[f] === a) return f;
            }return -1;
        });Array.prototype.forEach || (Array.prototype.forEach = function (a, d) {
            var c, f;if (null === this) throw new TypeError(" this is null or not defined");var e = Object(this),
                l = e.length >>> 0;if ("[object Function]" !== {}.toString.call(a)) throw new TypeError(a + " is not a function");d && (c = d);for (f = 0; f < l;) {
                var g;f in e && (g = e[f], a.call(c, g, f, e));f++;
            }
        });
    })();a._sliceUserAgent = function (a, d, c) {
        var f = [],
            e = navigator.userAgent;a = e.indexOf(a);d = e.indexOf(d, a);0 > d && (d = e.length);c = e.slice(a, d).split(c);e = c[1].split(".");for (d = 0; d < e.length; ++d) {
            f.push(parseInt(e[d], 10));
        }return { name: c[0], version: f };
    };a.getBrowser = function () {
        var b = navigator.userAgent;return -1 < b.indexOf("Chrome") ? a._sliceUserAgent("Chrome", " ", "/") : -1 < b.indexOf("Safari") ? a._sliceUserAgent("Safari", " ", "/") : -1 < b.indexOf("Firefox") ? a._sliceUserAgent("Firefox", " ", "/") : -1 < b.indexOf("MSIE") ? a._sliceUserAgent("MSIE", ";", " ") : null;
    };a.getServerUrl = function (a, d) {
        return "file:" === c.location.protocol ? d ? d : "ws://127.0.0.1/ws" : ("https:" === c.location.protocol ? "wss://" : "ws://") + c.location.hostname + ("" !== c.location.port ? ":" + c.location.port : "") + "/" + (a ? a : "ws");
    };a.browserNotSupportedMessage = "Browser does not support WebSockets (RFC6455)";a.deriveKey = function (a, d) {
        return d && d.salt ? CryptoJS.PBKDF2(a, d.salt, { keySize: (d.keylen || 32) / 4, iterations: d.iterations || 1E4, hasher: CryptoJS.algo.SHA256 }).toString(CryptoJS.enc.Base64) : a;
    };a._idchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";a._idlen = 16;a._subprotocol = "wamp";a._newid = function () {
        for (var b = "", d = 0; d < a._idlen; d += 1) {
            b += a._idchars.charAt(Math.floor(Math.random() * a._idchars.length));
        }return b;
    };a._newidFast = function () {
        return Math.random().toString(36);
    };a.log = function () {
        if (1 < arguments.length) {
            console.group("Log Item");for (var a = 0; a < arguments.length; a += 1) {
                console.log(arguments[a]);
            }console.groupEnd();
        } else console.log(arguments[0]);
    };a._debugrpc = !1;a._debugpubsub = !1;a._debugws = !1;a._debugconnect = !1;a.debug = function (b, d, h) {
        if ("console" in c) a._debugrpc = b, a._debugpubsub = b, a._debugws = d, a._debugconnect = h;else throw "browser does not support console object";
    };a.version = function () {
        return a._version;
    };a.PrefixMap = function () {
        this._index = {};this._rindex = {};
    };a.PrefixMap.prototype.get = function (a) {
        return this._index[a];
    };a.PrefixMap.prototype.set = function (a, d) {
        this._index[a] = d;this._rindex[d] = a;
    };a.PrefixMap.prototype.setDefault = function (a) {
        this._index[""] = a;this._rindex[a] = "";
    };a.PrefixMap.prototype.remove = function (a) {
        var d = this._index[a];d && (delete this._index[a], delete this._rindex[d]);
    };a.PrefixMap.prototype.resolve = function (a, d) {
        var c = a.indexOf(":");if (0 <= c) {
            var f = a.substring(0, c);if (this._index[f]) return this._index[f] + a.substring(c + 1);
        }return !0 === d ? a : null;
    };a.PrefixMap.prototype.shrink = function (a, d) {
        for (var c = a.length; 0 < c; c -= 1) {
            var f = a.substring(0, c);if (f = this._rindex[f]) return f + ":" + a.substring(c);
        }return !0 === d ? a : null;
    };a._MESSAGE_TYPEID_WELCOME = 0;a._MESSAGE_TYPEID_PREFIX = 1;a._MESSAGE_TYPEID_CALL = 2;a._MESSAGE_TYPEID_CALL_RESULT = 3;a._MESSAGE_TYPEID_CALL_ERROR = 4;a._MESSAGE_TYPEID_SUBSCRIBE = 5;a._MESSAGE_TYPEID_UNSUBSCRIBE = 6;a._MESSAGE_TYPEID_PUBLISH = 7;a._MESSAGE_TYPEID_EVENT = 8;a.CONNECTION_CLOSED = 0;a.CONNECTION_LOST = 1;a.CONNECTION_RETRIES_EXCEEDED = 2;a.CONNECTION_UNREACHABLE = 3;a.CONNECTION_UNSUPPORTED = 4;a.CONNECTION_UNREACHABLE_SCHEDULED_RECONNECT = 5;a.CONNECTION_LOST_SCHEDULED_RECONNECT = 6;a.Deferred = g.defer;a._construct = function (a, d) {
        return "WebSocket" in c ? d ? new WebSocket(a, d) : new WebSocket(a) : "MozWebSocket" in c ? d ? new MozWebSocket(a, d) : new MozWebSocket(a) : null;
    };a.Session = function (b, d, c, f) {
        var e = this;e._wsuri = b;e._options = f;e._websocket_onopen = d;e._websocket_onclose = c;e._websocket = null;e._websocket_connected = !1;e._session_id = null;e._wamp_version = null;e._server = null;e._calls = {};e._subscriptions = {};e._prefixes = new a.PrefixMap();e._txcnt = 0;e._rxcnt = 0;e._websocket = e._options && e._options.skipSubprotocolAnnounce ? a._construct(e._wsuri) : a._construct(e._wsuri, [a._subprotocol]);
        if (!e._websocket) {
            if (void 0 !== c) {
                c(a.CONNECTION_UNSUPPORTED);return;
            }throw a.browserNotSupportedMessage;
        }e._websocket.onmessage = function (b) {
            a._debugws && (e._rxcnt += 1, console.group("WS Receive"), console.info(e._wsuri + "  [" + e._session_id + "]"), console.log(e._rxcnt), console.log(b.data), console.groupEnd());b = JSON.parse(b.data);if (b[1] in e._calls) {
                if (b[0] === a._MESSAGE_TYPEID_CALL_RESULT) {
                    var d = e._calls[b[1]],
                        c = b[2];if (a._debugrpc && void 0 !== d._ab_callobj) {
                        console.group("WAMP Call", d._ab_callobj[2]);console.timeEnd(d._ab_tid);
                        console.group("Arguments");for (var f = 3; f < d._ab_callobj.length; f += 1) {
                            var h = d._ab_callobj[f];if (void 0 !== h) console.log(h);else break;
                        }console.groupEnd();console.group("Result");console.log(c);console.groupEnd();console.groupEnd();
                    }d.resolve(c);
                } else if (b[0] === a._MESSAGE_TYPEID_CALL_ERROR) {
                    d = e._calls[b[1]];c = b[2];f = b[3];h = b[4];if (a._debugrpc && void 0 !== d._ab_callobj) {
                        console.group("WAMP Call", d._ab_callobj[2]);console.timeEnd(d._ab_tid);console.group("Arguments");for (var g = 3; g < d._ab_callobj.length; g += 1) {
                            var m = d._ab_callobj[g];if (void 0 !== m) console.log(m);else break;
                        }console.groupEnd();console.group("Error");console.log(c);console.log(f);void 0 !== h && console.log(h);console.groupEnd();console.groupEnd();
                    }void 0 !== h ? d.reject({ uri: c, desc: f, detail: h }) : d.reject({ uri: c, desc: f });
                }delete e._calls[b[1]];
            } else if (b[0] === a._MESSAGE_TYPEID_EVENT) {
                if (d = e._prefixes.resolve(b[1], !0), d in e._subscriptions) {
                    var n = b[1],
                        u = b[2];a._debugpubsub && (console.group("WAMP Event"), console.info(e._wsuri + "  [" + e._session_id + "]"), console.log(n), console.log(u), console.groupEnd());e._subscriptions[d].forEach(function (a) {
                        a(n, u);
                    });
                }
            } else if (b[0] === a._MESSAGE_TYPEID_WELCOME) if (null === e._session_id) {
                e._session_id = b[1];e._wamp_version = b[2];e._server = b[3];if (a._debugrpc || a._debugpubsub) console.group("WAMP Welcome"), console.info(e._wsuri + "  [" + e._session_id + "]"), console.log(e._wamp_version), console.log(e._server), console.groupEnd();null !== e._websocket_onopen && e._websocket_onopen();
            } else throw "protocol error (welcome message received more than once)";
        };e._websocket.onopen = function (b) {
            if (e._websocket.protocol !== a._subprotocol) if ("undefined" === typeof e._websocket.protocol) a._debugws && (console.group("WS Warning"), console.info(e._wsuri), console.log("WebSocket object has no protocol attribute: WAMP subprotocol check skipped!"), console.groupEnd());else if (e._options && e._options.skipSubprotocolCheck) a._debugws && (console.group("WS Warning"), console.info(e._wsuri), console.log("Server does not speak WAMP, but subprotocol check disabled by option!"), console.log(e._websocket.protocol), console.groupEnd());else throw e._websocket.close(1E3, "server does not speak WAMP"), "server does not speak WAMP (but '" + e._websocket.protocol + "' !)";a._debugws && (console.group("WAMP Connect"), console.info(e._wsuri), console.log(e._websocket.protocol), console.groupEnd());e._websocket_connected = !0;
        };e._websocket.onerror = function (a) {};e._websocket.onclose = function (b) {
            a._debugws && (e._websocket_connected ? console.log("Autobahn connection to " + e._wsuri + " lost (code " + b.code + ", reason '" + b.reason + "', wasClean " + b.wasClean + ").") : console.log("Autobahn could not connect to " + e._wsuri + " (code " + b.code + ", reason '" + b.reason + "', wasClean " + b.wasClean + ")."));void 0 !== e._websocket_onclose && (e._websocket_connected ? b.wasClean ? e._websocket_onclose(a.CONNECTION_CLOSED, "WS-" + b.code + ": " + b.reason) : e._websocket_onclose(a.CONNECTION_LOST) : e._websocket_onclose(a.CONNECTION_UNREACHABLE));e._websocket_connected = !1;e._wsuri = null;e._websocket_onopen = null;e._websocket_onclose = null;e._websocket = null;
        };e.log = function () {
            e._options && "sessionIdent" in e._options ? console.group("WAMP Session '" + e._options.sessionIdent + "' [" + e._session_id + "]") : console.group("WAMP Session [" + e._session_id + "]");for (var a = 0; a < arguments.length; ++a) {
                console.log(arguments[a]);
            }console.groupEnd();
        };
    };a.Session.prototype._send = function (b) {
        if (!this._websocket_connected) throw "Autobahn not connected";switch (!0) {case c.Prototype && "undefined" === typeof top.root.__prototype_deleted:case "function" === typeof b.toJSON:
                b = b.toJSON();break;default:
                b = JSON.stringify(b);}this._websocket.send(b);
        this._txcnt += 1;a._debugws && (console.group("WS Send"), console.info(this._wsuri + "  [" + this._session_id + "]"), console.log(this._txcnt), console.log(b), console.groupEnd());
    };a.Session.prototype.close = function () {
        this._websocket_connected && this._websocket.close();
    };a.Session.prototype.sessionid = function () {
        return this._session_id;
    };a.Session.prototype.wsuri = function () {
        return this._wsuri;
    };a.Session.prototype.shrink = function (a, d) {
        void 0 === d && (d = !0);return this._prefixes.shrink(a, d);
    };a.Session.prototype.resolve = function (a, d) {
        void 0 === d && (d = !0);return this._prefixes.resolve(a, d);
    };a.Session.prototype.prefix = function (b, d) {
        this._prefixes.set(b, d);if (a._debugrpc || a._debugpubsub) console.group("WAMP Prefix"), console.info(this._wsuri + "  [" + this._session_id + "]"), console.log(b), console.log(d), console.groupEnd();this._send([a._MESSAGE_TYPEID_PREFIX, b, d]);
    };a.Session.prototype.call = function () {
        for (var b = new a.Deferred(), d; !(d = a._newidFast(), !(d in this._calls));) {}this._calls[d] = b;for (var c = this._prefixes.shrink(arguments[0], !0), c = [a._MESSAGE_TYPEID_CALL, d, c], f = 1; f < arguments.length; f += 1) {
            c.push(arguments[f]);
        }this._send(c);a._debugrpc && (b._ab_callobj = c, b._ab_tid = this._wsuri + "  [" + this._session_id + "][" + d + "]", console.time(b._ab_tid), console.info());return b.promise.then ? b.promise : b;
    };a.Session.prototype.subscribe = function (b, d) {
        var c = this._prefixes.resolve(b, !0);c in this._subscriptions || (a._debugpubsub && (console.group("WAMP Subscribe"), console.info(this._wsuri + "  [" + this._session_id + "]"), console.log(b), console.log(d), console.groupEnd()), this._send([a._MESSAGE_TYPEID_SUBSCRIBE, b]), this._subscriptions[c] = []);if (-1 === this._subscriptions[c].indexOf(d)) this._subscriptions[c].push(d);else throw "callback " + d + " already subscribed for topic " + c;
    };a.Session.prototype.unsubscribe = function (b, d) {
        var c = this._prefixes.resolve(b, !0);if (c in this._subscriptions) {
            var f;if (void 0 !== d) {
                var e = this._subscriptions[c].indexOf(d);if (-1 !== e) f = d, this._subscriptions[c].splice(e, 1);else throw "no callback " + d + " subscribed on topic " + c;
            } else f = this._subscriptions[c].slice(), this._subscriptions[c] = [];0 === this._subscriptions[c].length && (delete this._subscriptions[c], a._debugpubsub && (console.group("WAMP Unsubscribe"), console.info(this._wsuri + "  [" + this._session_id + "]"), console.log(b), console.log(f), console.groupEnd()), this._send([a._MESSAGE_TYPEID_UNSUBSCRIBE, b]));
        } else throw "not subscribed to topic " + c;
    };a.Session.prototype.publish = function () {
        var b = arguments[0],
            d = arguments[1],
            c = null,
            f = null,
            e = null,
            g = null;if (3 < arguments.length) {
            if (!(arguments[2] instanceof Array)) throw "invalid argument type(s)";
            if (!(arguments[3] instanceof Array)) throw "invalid argument type(s)";f = arguments[2];e = arguments[3];g = [a._MESSAGE_TYPEID_PUBLISH, b, d, f, e];
        } else if (2 < arguments.length) {
            if ("boolean" === typeof arguments[2]) c = arguments[2], g = [a._MESSAGE_TYPEID_PUBLISH, b, d, c];else if (arguments[2] instanceof Array) f = arguments[2], g = [a._MESSAGE_TYPEID_PUBLISH, b, d, f];else throw "invalid argument type(s)";
        } else g = [a._MESSAGE_TYPEID_PUBLISH, b, d];a._debugpubsub && (console.group("WAMP Publish"), console.info(this._wsuri + "  [" + this._session_id + "]"), console.log(b), console.log(d), null !== c ? console.log(c) : null !== f && (console.log(f), null !== e && console.log(e)), console.groupEnd());this._send(g);
    };a.Session.prototype.authreq = function (a, d) {
        return this.call("http://api.wamp.ws/procedure#authreq", a, d);
    };a.Session.prototype.authsign = function (a, d) {
        d || (d = "");return CryptoJS.HmacSHA256(a, d).toString(CryptoJS.enc.Base64);
    };a.Session.prototype.auth = function (a) {
        return this.call("http://api.wamp.ws/procedure#auth", a);
    };a._connect = function (b) {
        var d = new a.Session(b.wsuri, function () {
            b.connects += 1;b.retryCount = 0;b.onConnect(d);
        }, function (d, f) {
            var e = null;switch (d) {case a.CONNECTION_CLOSED:
                    b.onHangup(d, "Connection was closed properly [" + f + "]");break;case a.CONNECTION_UNSUPPORTED:
                    b.onHangup(d, "Browser does not support WebSocket.");break;case a.CONNECTION_UNREACHABLE:
                    b.retryCount += 1;if (0 === b.connects) b.onHangup(d, "Connection could not be established.");else if (b.retryCount <= b.options.maxRetries) (e = b.onHangup(a.CONNECTION_UNREACHABLE_SCHEDULED_RECONNECT, "Connection unreachable - scheduled reconnect to occur in " + b.options.retryDelay / 1E3 + " second(s) - attempt " + b.retryCount + " of " + b.options.maxRetries + ".", { delay: b.options.retryDelay, retries: b.retryCount, maxretries: b.options.maxRetries })) ? (a._debugconnect && console.log("Connection unreachable - retrying stopped by app"), b.onHangup(a.CONNECTION_RETRIES_EXCEEDED, "Number of connection retries exceeded.")) : (a._debugconnect && console.log("Connection unreachable - retrying (" + b.retryCount + ") .."), c.setTimeout(function () {
                        a._connect(b);
                    }, b.options.retryDelay));else b.onHangup(a.CONNECTION_RETRIES_EXCEEDED, "Number of connection retries exceeded.");break;case a.CONNECTION_LOST:
                    b.retryCount += 1;if (b.retryCount <= b.options.maxRetries) (e = b.onHangup(a.CONNECTION_LOST_SCHEDULED_RECONNECT, "Connection lost - scheduled " + b.retryCount + "th reconnect to occur in " + b.options.retryDelay / 1E3 + " second(s).", { delay: b.options.retryDelay, retries: b.retryCount, maxretries: b.options.maxRetries })) ? (a._debugconnect && console.log("Connection lost - retrying stopped by app"), b.onHangup(a.CONNECTION_RETRIES_EXCEEDED, "Connection lost.")) : (a._debugconnect && console.log("Connection lost - retrying (" + b.retryCount + ") .."), c.setTimeout(function () {
                        a._connect(b);
                    }, b.options.retryDelay));else b.onHangup(a.CONNECTION_RETRIES_EXCEEDED, "Connection lost.");break;default:
                    throw "unhandled close code in ab._connect";}
        }, b.options);
    };a.connect = function (b, d, c, f) {
        var e = {};e.wsuri = b;e.options = f ? f : {};void 0 === e.options.retryDelay && (e.options.retryDelay = 5E3);void 0 === e.options.maxRetries && (e.options.maxRetries = 10);void 0 === e.options.skipSubprotocolCheck && (e.options.skipSubprotocolCheck = !1);void 0 === e.options.skipSubprotocolAnnounce && (e.options.skipSubprotocolAnnounce = !1);if (d) e.onConnect = d;else throw "onConnect handler required!";e.onHangup = c ? c : function (b, d, c) {
            a._debugconnect && console.log(b, d, c);
        };e.connects = 0;e.retryCount = 0;a._connect(e);
    };a.launch = function (b, d, c) {
        a.connect(b.wsuri, function (c) {
            !b.appkey || "" === b.appkey ? c.authreq().then(function () {
                c.auth().then(function (b) {
                    d ? d(c) : a._debugconnect && c.log("Session opened.");
                }, c.log);
            }, c.log) : c.authreq(b.appkey, b.appextra).then(function (e) {
                var g = null;"function" === typeof b.appsecret ? g = b.appsecret(e) : (g = a.deriveKey(b.appsecret, JSON.parse(e).authextra), g = c.authsign(e, g));c.auth(g).then(function (b) {
                    d ? d(c) : a._debugconnect && c.log("Session opened.");
                }, c.log);
            }, c.log);
        }, function (b, d, g) {
            c ? c(b, d, g) : a._debugconnect && a.log("Session closed.", b, d, g);
        }, b.sessionConfig);
    };return a;
});ab._UA_FIREFOX = /.*Firefox\/([0-9+]*).*/;ab._UA_CHROME = /.*Chrome\/([0-9+]*).*/;ab._UA_CHROMEFRAME = /.*chromeframe\/([0-9]*).*/;ab._UA_WEBKIT = /.*AppleWebKit\/([0-9+.]*)w*.*/;ab._UA_WEBOS = /.*webOS\/([0-9+.]*)w*.*/;ab._matchRegex = function (c, g) {
    var a = g.exec(c);return a ? a[1] : a;
};
ab.lookupWsSupport = function () {
    var c = navigator.userAgent;if (-1 < c.indexOf("MSIE")) {
        if (-1 < c.indexOf("MSIE 10")) return [!0, !0, !0];if (-1 < c.indexOf("chromeframe")) {
            var g = parseInt(ab._matchRegex(c, ab._UA_CHROMEFRAME));return 14 <= g ? [!0, !1, !0] : [!1, !1, !1];
        }if (-1 < c.indexOf("MSIE 8") || -1 < c.indexOf("MSIE 9")) return [!0, !0, !0];
    } else {
        if (-1 < c.indexOf("Firefox")) {
            if (g = parseInt(ab._matchRegex(c, ab._UA_FIREFOX))) {
                if (7 <= g) return [!0, !1, !0];if (3 <= g) return [!0, !0, !0];
            }return [!1, !1, !0];
        }if (-1 < c.indexOf("Safari") && -1 == c.indexOf("Chrome")) {
            if (g = ab._matchRegex(c, ab._UA_WEBKIT)) return -1 < c.indexOf("Windows") && "534+" == g || -1 < c.indexOf("Macintosh") && (g = g.replace("+", "").split("."), 535 == parseInt(g[0]) && 24 <= parseInt(g[1]) || 535 < parseInt(g[0])) ? [!0, !1, !0] : -1 < c.indexOf("webOS") ? (g = ab._matchRegex(c, ab._UA_WEBOS).split("."), 2 == parseInt(g[0]) ? [!1, !0, !0] : [!1, !1, !1]) : [!0, !0, !0];
        } else if (-1 < c.indexOf("Chrome")) {
            if (g = parseInt(ab._matchRegex(c, ab._UA_CHROME))) return 14 <= g ? [!0, !1, !0] : 4 <= g ? [!0, !0, !0] : [!1, !1, !0];
        } else if (-1 < c.indexOf("Android")) {
            if (-1 < c.indexOf("Firefox") || -1 < c.indexOf("CrMo")) return [!0, !1, !0];if (-1 < c.indexOf("Opera")) return [!1, !1, !0];if (-1 < c.indexOf("CrMo")) return [!0, !0, !0];
        } else if (-1 < c.indexOf("iPhone") || -1 < c.indexOf("iPad") || -1 < c.indexOf("iPod")) return [!1, !1, !0];
    }return [!1, !1, !1];
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../../../../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** vertx (ignored) ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjYwMjM3ZDYzNGExZmMxNDI2ODkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvU2NoZWR1bGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGVuL2xpYi9UaW1lb3V0RXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2FwcGx5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGVuL2xpYi9kZWNvcmF0b3JzL2FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGVuL2xpYi9kZWNvcmF0b3JzL2Zsb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvZm9sZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvZGVjb3JhdG9ycy9pbnNwZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGVuL2xpYi9kZWNvcmF0b3JzL2l0ZXJhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvdGltZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvdW5oYW5kbGVkUmVqZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGVuL2xpYi9kZWNvcmF0b3JzL3dpdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2Vudi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvZm9ybWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGVuL2xpYi9tYWtlUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3doZW4vd2hlbi5qcyIsIndlYnBhY2s6Ly8vLi92ZW5kb3IvZ29zL3dlYi1zb2NrZXQtYnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvanMvdmVuZG9yL2F1dG9iYWhuLm1pbi5qcyIsIndlYnBhY2s6Ly8vdmVydHggKGlnbm9yZWQpIl0sIm5hbWVzIjpbIndpbmRvdyIsImRlZmluZSIsImMiLCJnIiwid2hlbiIsImFtZCIsImNvbnNvbGUiLCJsb2ciLCJhIiwiYiIsImQiLCJoIiwiaW5mbyIsIndhcm4iLCJlcnJvciIsIkZ1bmN0aW9uIiwicHJvdG90eXBlIiwiYmluZCIsIkFycmF5Iiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJjb25jYXQiLCJncm91cCIsImdyb3VwRW5kIiwidGltZSIsIkRhdGUiLCJnZXRUaW1lIiwidGltZUVuZCIsImUiLCJ0aGVuIiwiQiIsIlByb21pc2VTdGF0dXMiLCJtIiwidyIsInAiLCJxIiwibCIsIkEiLCJmIiwiayIsInoiLCJfc3RhdHVzIiwiaW5zcGVjdCIsInN0YXRlIiwiX3doZW4iLCJwdXNoIiwibiIsImxlbmd0aCIsIlR5cGVFcnJvciIsIk9iamVjdCIsInQiLCJHIiwidmFsdWUiLCJmdWxmaWxsZWQiLCJyZWplY3RlZCIsIkQiLCJNYXRoIiwibWF4IiwibWluIiwicyIsInUiLCJ5IiwieCIsInJlYXNvbiIsIkUiLCJDIiwidiIsIksiLCJyZXBvcnRVbmhhbmRsZWQiLCJwcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRlZmVyIiwibm90aWZ5IiwicmVzb2x2ZXIiLCJqb2luIiwiYWxsIiwibWFwIiwicmVkdWNlIiwiSCIsIkkiLCJzZXR0bGUiLCJhbnkiLCJzb21lIiwiaXNQcm9taXNlIiwiaXNQcm9taXNlTGlrZSIsInIiLCJvYnNlcnZlZCIsIm90aGVyd2lzZSIsImVuc3VyZSIsInlpZWxkIiwiZG9uZSIsInRhcCIsInNwcmVhZCIsImFsd2F5cyIsIkYiLCJjcmVhdGUiLCJKIiwicHJvY2VzcyIsIm5leHRUaWNrIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJjcmVhdGVFbGVtZW50Iiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGUiLCJkb2N1bWVudCIsInJ1bk9uTG9vcCIsInJ1bk9uQ29udGV4dCIsIkwiLCJzZXRUaW1lb3V0IiwiQ3J5cHRvSlMiLCJsaWIiLCJCYXNlIiwiZXh0ZW5kIiwibWl4SW4iLCJoYXNPd25Qcm9wZXJ0eSIsImluaXQiLCIkc3VwZXIiLCJ0b1N0cmluZyIsImNsb25lIiwiV29yZEFycmF5Iiwid29yZHMiLCJzaWdCeXRlcyIsInN0cmluZ2lmeSIsImNsYW1wIiwiY2VpbCIsInJhbmRvbSIsImVuYyIsIkhleCIsInBhcnNlIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJMYXRpbjEiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0IiwiVXRmOCIsImRlY29kZVVSSUNvbXBvbmVudCIsImVzY2FwZSIsIkVycm9yIiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJCdWZmZXJlZEJsb2NrQWxnb3JpdGhtIiwicmVzZXQiLCJfZGF0YSIsIl9uRGF0YUJ5dGVzIiwiX2FwcGVuZCIsIl9wcm9jZXNzIiwiYmxvY2tTaXplIiwiX21pbkJ1ZmZlclNpemUiLCJfZG9Qcm9jZXNzQmxvY2siLCJzcGxpY2UiLCJIYXNoZXIiLCJjZmciLCJfZG9SZXNldCIsInVwZGF0ZSIsImZpbmFsaXplIiwiX2RvRmluYWxpemUiLCJfY3JlYXRlSGVscGVyIiwiX2NyZWF0ZUhtYWNIZWxwZXIiLCJITUFDIiwiYWxnbyIsIkJhc2U2NCIsIl9tYXAiLCJjaGFyQXQiLCJpbmRleE9mIiwiX2hhc2hlciIsIl9vS2V5IiwiX2lLZXkiLCJzcXJ0IiwicG93IiwiU0hBMjU2IiwiX2hhc2giLCJmbG9vciIsIkhtYWNTSEEyNTYiLCJQQktERjIiLCJrZXlTaXplIiwiaGFzaGVyIiwiU0hBMSIsIml0ZXJhdGlvbnMiLCJjb21wdXRlIiwiQVVUT0JBSE5KU19WRVJTSU9OIiwiZ2xvYmFsIiwiYWIiLCJleHBvcnRzIiwibW9kdWxlIiwiX3ZlcnNpb24iLCJOdW1iZXIiLCJJbmZpbml0eSIsImFicyIsImZvckVhY2giLCJfc2xpY2VVc2VyQWdlbnQiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJzcGxpdCIsIm5hbWUiLCJ2ZXJzaW9uIiwiZ2V0QnJvd3NlciIsImdldFNlcnZlclVybCIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0bmFtZSIsInBvcnQiLCJicm93c2VyTm90U3VwcG9ydGVkTWVzc2FnZSIsImRlcml2ZUtleSIsInNhbHQiLCJrZXlsZW4iLCJfaWRjaGFycyIsIl9pZGxlbiIsIl9zdWJwcm90b2NvbCIsIl9uZXdpZCIsIl9uZXdpZEZhc3QiLCJfZGVidWdycGMiLCJfZGVidWdwdWJzdWIiLCJfZGVidWd3cyIsIl9kZWJ1Z2Nvbm5lY3QiLCJkZWJ1ZyIsIlByZWZpeE1hcCIsIl9pbmRleCIsIl9yaW5kZXgiLCJnZXQiLCJzZXQiLCJzZXREZWZhdWx0IiwicmVtb3ZlIiwic3Vic3RyaW5nIiwic2hyaW5rIiwiX01FU1NBR0VfVFlQRUlEX1dFTENPTUUiLCJfTUVTU0FHRV9UWVBFSURfUFJFRklYIiwiX01FU1NBR0VfVFlQRUlEX0NBTEwiLCJfTUVTU0FHRV9UWVBFSURfQ0FMTF9SRVNVTFQiLCJfTUVTU0FHRV9UWVBFSURfQ0FMTF9FUlJPUiIsIl9NRVNTQUdFX1RZUEVJRF9TVUJTQ1JJQkUiLCJfTUVTU0FHRV9UWVBFSURfVU5TVUJTQ1JJQkUiLCJfTUVTU0FHRV9UWVBFSURfUFVCTElTSCIsIl9NRVNTQUdFX1RZUEVJRF9FVkVOVCIsIkNPTk5FQ1RJT05fQ0xPU0VEIiwiQ09OTkVDVElPTl9MT1NUIiwiQ09OTkVDVElPTl9SRVRSSUVTX0VYQ0VFREVEIiwiQ09OTkVDVElPTl9VTlJFQUNIQUJMRSIsIkNPTk5FQ1RJT05fVU5TVVBQT1JURUQiLCJDT05ORUNUSU9OX1VOUkVBQ0hBQkxFX1NDSEVEVUxFRF9SRUNPTk5FQ1QiLCJDT05ORUNUSU9OX0xPU1RfU0NIRURVTEVEX1JFQ09OTkVDVCIsIkRlZmVycmVkIiwiX2NvbnN0cnVjdCIsIldlYlNvY2tldCIsIk1veldlYlNvY2tldCIsIlNlc3Npb24iLCJfd3N1cmkiLCJfb3B0aW9ucyIsIl93ZWJzb2NrZXRfb25vcGVuIiwiX3dlYnNvY2tldF9vbmNsb3NlIiwiX3dlYnNvY2tldCIsIl93ZWJzb2NrZXRfY29ubmVjdGVkIiwiX3Nlc3Npb25faWQiLCJfd2FtcF92ZXJzaW9uIiwiX3NlcnZlciIsIl9jYWxscyIsIl9zdWJzY3JpcHRpb25zIiwiX3ByZWZpeGVzIiwiX3R4Y250IiwiX3J4Y250Iiwic2tpcFN1YnByb3RvY29sQW5ub3VuY2UiLCJvbm1lc3NhZ2UiLCJkYXRhIiwiSlNPTiIsIl9hYl9jYWxsb2JqIiwiX2FiX3RpZCIsInVyaSIsImRlc2MiLCJkZXRhaWwiLCJvbm9wZW4iLCJza2lwU3VicHJvdG9jb2xDaGVjayIsImNsb3NlIiwib25lcnJvciIsIm9uY2xvc2UiLCJjb2RlIiwid2FzQ2xlYW4iLCJzZXNzaW9uSWRlbnQiLCJfc2VuZCIsIlByb3RvdHlwZSIsInRvcCIsInJvb3QiLCJfX3Byb3RvdHlwZV9kZWxldGVkIiwidG9KU09OIiwic2VuZCIsInNlc3Npb25pZCIsIndzdXJpIiwicHJlZml4Iiwic3Vic2NyaWJlIiwidW5zdWJzY3JpYmUiLCJwdWJsaXNoIiwiYXV0aHJlcSIsImF1dGhzaWduIiwiYXV0aCIsIl9jb25uZWN0IiwiY29ubmVjdHMiLCJyZXRyeUNvdW50Iiwib25Db25uZWN0Iiwib25IYW5ndXAiLCJvcHRpb25zIiwibWF4UmV0cmllcyIsInJldHJ5RGVsYXkiLCJkZWxheSIsInJldHJpZXMiLCJtYXhyZXRyaWVzIiwiY29ubmVjdCIsImxhdW5jaCIsImFwcGtleSIsImFwcGV4dHJhIiwiYXBwc2VjcmV0IiwiYXV0aGV4dHJhIiwic2Vzc2lvbkNvbmZpZyIsIl9VQV9GSVJFRk9YIiwiX1VBX0NIUk9NRSIsIl9VQV9DSFJPTUVGUkFNRSIsIl9VQV9XRUJLSVQiLCJfVUFfV0VCT1MiLCJfbWF0Y2hSZWdleCIsImV4ZWMiLCJsb29rdXBXc1N1cHBvcnQiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNU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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixjQUFjLGdCQUFnQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWEsRUFBRTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLEVBQUU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0FBRCxHQUFHdEssRUFBRXNLLE9BQUYsQ0FBVSxPQUFWLENBQU4sRUFBeUIsT0FBTSxDQUFDLENBQUMsQ0FBRixFQUFJLENBQUMsQ0FBTCxFQUFPLENBQUMsQ0FBUixDQUFOLENBQWlCLElBQUcsQ0FBQyxDQUFELEdBQUd0SyxFQUFFc0ssT0FBRixDQUFVLE1BQVYsQ0FBTixFQUF3QixPQUFNLENBQUMsQ0FBQyxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBQyxDQUFSLENBQU47QUFBaUIsU0FEc1YsTUFDalYsSUFBRyxDQUFDLENBQUQsR0FBR3RLLEVBQUVzSyxPQUFGLENBQVUsUUFBVixDQUFILElBQXdCLENBQUMsQ0FBRCxHQUFHdEssRUFBRXNLLE9BQUYsQ0FBVSxNQUFWLENBQTNCLElBQThDLENBQUMsQ0FBRCxHQUFHdEssRUFBRXNLLE9BQUYsQ0FBVSxNQUFWLENBQXBELEVBQXNFLE9BQU0sQ0FBQyxDQUFDLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFDLENBQVIsQ0FBTjtBQUFpQixZQUFNLENBQUMsQ0FBQyxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBQyxDQUFSLENBQU47QUFBaUIsQ0FGMU8sQzs7Ozs7Ozs7Ozs7OztBQ3BGQSxlIiwiZmlsZSI6ImF1dG9iYWhuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi92ZW5kb3IvZ29zL3dlYi1zb2NrZXQtYnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvanMvdmVuZG9yL2F1dG9iYWhuLm1pbi5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNjAyMzdkNjM0YTFmYzE0MjY4OSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2FtZC1kZWZpbmUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE0IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbihmdW5jdGlvbihkZWZpbmUpIHsgJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKGZ1bmN0aW9uIChyZXF1aXJlKSB7XG5cblx0dmFyIG1ha2VQcm9taXNlID0gcmVxdWlyZSgnLi9tYWtlUHJvbWlzZScpO1xuXHR2YXIgU2NoZWR1bGVyID0gcmVxdWlyZSgnLi9TY2hlZHVsZXInKTtcblx0dmFyIGFzeW5jID0gcmVxdWlyZSgnLi9lbnYnKS5hc2FwO1xuXG5cdHJldHVybiBtYWtlUHJvbWlzZSh7XG5cdFx0c2NoZWR1bGVyOiBuZXcgU2NoZWR1bGVyKGFzeW5jKVxuXHR9KTtcblxufSk7XG59KSh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUgOiBmdW5jdGlvbiAoZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSk7IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvUHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvUHJvbWlzZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTQgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuKGZ1bmN0aW9uKGRlZmluZSkgeyAndXNlIHN0cmljdCc7XG5kZWZpbmUoZnVuY3Rpb24oKSB7XG5cblx0Ly8gQ3JlZGl0IHRvIFR3aXNvbCAoaHR0cHM6Ly9naXRodWIuY29tL1R3aXNvbCkgZm9yIHN1Z2dlc3Rpbmdcblx0Ly8gdGhpcyB0eXBlIG9mIGV4dGVuc2libGUgcXVldWUgKyB0cmFtcG9saW5lIGFwcHJvYWNoIGZvciBuZXh0LXRpY2sgY29uZmxhdGlvbi5cblxuXHQvKipcblx0ICogQXN5bmMgdGFzayBzY2hlZHVsZXJcblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gYXN5bmMgZnVuY3Rpb24gdG8gc2NoZWR1bGUgYSBzaW5nbGUgYXN5bmMgZnVuY3Rpb25cblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRmdW5jdGlvbiBTY2hlZHVsZXIoYXN5bmMpIHtcblx0XHR0aGlzLl9hc3luYyA9IGFzeW5jO1xuXHRcdHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcblxuXHRcdHRoaXMuX3F1ZXVlID0gdGhpcztcblx0XHR0aGlzLl9xdWV1ZUxlbiA9IDA7XG5cdFx0dGhpcy5fYWZ0ZXJRdWV1ZSA9IHt9O1xuXHRcdHRoaXMuX2FmdGVyUXVldWVMZW4gPSAwO1xuXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHRoaXMuZHJhaW4gPSBmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYuX2RyYWluKCk7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFbnF1ZXVlIGEgdGFza1xuXHQgKiBAcGFyYW0ge3sgcnVuOmZ1bmN0aW9uIH19IHRhc2tcblx0ICovXG5cdFNjaGVkdWxlci5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uKHRhc2spIHtcblx0XHR0aGlzLl9xdWV1ZVt0aGlzLl9xdWV1ZUxlbisrXSA9IHRhc2s7XG5cdFx0dGhpcy5ydW4oKTtcblx0fTtcblxuXHQvKipcblx0ICogRW5xdWV1ZSBhIHRhc2sgdG8gcnVuIGFmdGVyIHRoZSBtYWluIHRhc2sgcXVldWVcblx0ICogQHBhcmFtIHt7IHJ1bjpmdW5jdGlvbiB9fSB0YXNrXG5cdCAqL1xuXHRTY2hlZHVsZXIucHJvdG90eXBlLmFmdGVyUXVldWUgPSBmdW5jdGlvbih0YXNrKSB7XG5cdFx0dGhpcy5fYWZ0ZXJRdWV1ZVt0aGlzLl9hZnRlclF1ZXVlTGVuKytdID0gdGFzaztcblx0XHR0aGlzLnJ1bigpO1xuXHR9O1xuXG5cdFNjaGVkdWxlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCF0aGlzLl9ydW5uaW5nKSB7XG5cdFx0XHR0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcblx0XHRcdHRoaXMuX2FzeW5jKHRoaXMuZHJhaW4pO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogRHJhaW4gdGhlIGhhbmRsZXIgcXVldWUgZW50aXJlbHksIGFuZCB0aGVuIHRoZSBhZnRlciBxdWV1ZVxuXHQgKi9cblx0U2NoZWR1bGVyLnByb3RvdHlwZS5fZHJhaW4gPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0Zm9yICg7IGkgPCB0aGlzLl9xdWV1ZUxlbjsgKytpKSB7XG5cdFx0XHR0aGlzLl9xdWV1ZVtpXS5ydW4oKTtcblx0XHRcdHRoaXMuX3F1ZXVlW2ldID0gdm9pZCAwO1xuXHRcdH1cblxuXHRcdHRoaXMuX3F1ZXVlTGVuID0gMDtcblx0XHR0aGlzLl9ydW5uaW5nID0gZmFsc2U7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fYWZ0ZXJRdWV1ZUxlbjsgKytpKSB7XG5cdFx0XHR0aGlzLl9hZnRlclF1ZXVlW2ldLnJ1bigpO1xuXHRcdFx0dGhpcy5fYWZ0ZXJRdWV1ZVtpXSA9IHZvaWQgMDtcblx0XHR9XG5cblx0XHR0aGlzLl9hZnRlclF1ZXVlTGVuID0gMDtcblx0fTtcblxuXHRyZXR1cm4gU2NoZWR1bGVyO1xuXG59KTtcbn0odHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lIDogZnVuY3Rpb24oZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTsgfSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvU2NoZWR1bGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9TY2hlZHVsZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE0IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbihmdW5jdGlvbihkZWZpbmUpIHsgJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKGZ1bmN0aW9uKCkge1xuXG5cdC8qKlxuXHQgKiBDdXN0b20gZXJyb3IgdHlwZSBmb3IgcHJvbWlzZXMgcmVqZWN0ZWQgYnkgcHJvbWlzZS50aW1lb3V0XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0ZnVuY3Rpb24gVGltZW91dEVycm9yIChtZXNzYWdlKSB7XG5cdFx0RXJyb3IuY2FsbCh0aGlzKTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHRcdHRoaXMubmFtZSA9IFRpbWVvdXRFcnJvci5uYW1lO1xuXHRcdGlmICh0eXBlb2YgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIFRpbWVvdXRFcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0VGltZW91dEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcblx0VGltZW91dEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbWVvdXRFcnJvcjtcblxuXHRyZXR1cm4gVGltZW91dEVycm9yO1xufSk7XG59KHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSA6IGZ1bmN0aW9uKGZhY3RvcnkpIHsgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7IH0pKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9UaW1lb3V0RXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL1RpbWVvdXRFcnJvci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTQgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuKGZ1bmN0aW9uKGRlZmluZSkgeyAndXNlIHN0cmljdCc7XG5kZWZpbmUoZnVuY3Rpb24oKSB7XG5cblx0bWFrZUFwcGx5LnRyeUNhdGNoUmVzb2x2ZSA9IHRyeUNhdGNoUmVzb2x2ZTtcblxuXHRyZXR1cm4gbWFrZUFwcGx5O1xuXG5cdGZ1bmN0aW9uIG1ha2VBcHBseShQcm9taXNlLCBjYWxsKSB7XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcblx0XHRcdGNhbGwgPSB0cnlDYXRjaFJlc29sdmU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFwcGx5O1xuXG5cdFx0ZnVuY3Rpb24gYXBwbHkoZiwgdGhpc0FyZywgYXJncykge1xuXHRcdFx0dmFyIHAgPSBQcm9taXNlLl9kZWZlcigpO1xuXHRcdFx0dmFyIGwgPSBhcmdzLmxlbmd0aDtcblx0XHRcdHZhciBwYXJhbXMgPSBuZXcgQXJyYXkobCk7XG5cdFx0XHRjYWxsQW5kUmVzb2x2ZSh7IGY6ZiwgdGhpc0FyZzp0aGlzQXJnLCBhcmdzOmFyZ3MsIHBhcmFtczpwYXJhbXMsIGk6bC0xLCBjYWxsOmNhbGwgfSwgcC5faGFuZGxlcik7XG5cblx0XHRcdHJldHVybiBwO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNhbGxBbmRSZXNvbHZlKGMsIGgpIHtcblx0XHRcdGlmKGMuaSA8IDApIHtcblx0XHRcdFx0cmV0dXJuIGNhbGwoYy5mLCBjLnRoaXNBcmcsIGMucGFyYW1zLCBoKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGhhbmRsZXIgPSBQcm9taXNlLl9oYW5kbGVyKGMuYXJnc1tjLmldKTtcblx0XHRcdGhhbmRsZXIuZm9sZChjYWxsQW5kUmVzb2x2ZU5leHQsIGMsIHZvaWQgMCwgaCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY2FsbEFuZFJlc29sdmVOZXh0KGMsIHgsIGgpIHtcblx0XHRcdGMucGFyYW1zW2MuaV0gPSB4O1xuXHRcdFx0Yy5pIC09IDE7XG5cdFx0XHRjYWxsQW5kUmVzb2x2ZShjLCBoKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB0cnlDYXRjaFJlc29sdmUoZiwgdGhpc0FyZywgYXJncywgcmVzb2x2ZXIpIHtcblx0XHR0cnkge1xuXHRcdFx0cmVzb2x2ZXIucmVzb2x2ZShmLmFwcGx5KHRoaXNBcmcsIGFyZ3MpKTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdHJlc29sdmVyLnJlamVjdChlKTtcblx0XHR9XG5cdH1cblxufSk7XG59KHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSA6IGZ1bmN0aW9uKGZhY3RvcnkpIHsgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7IH0pKTtcblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9hcHBseS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvYXBwbHkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE0IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbihmdW5jdGlvbihkZWZpbmUpIHsgJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUpIHtcblxuXHR2YXIgc3RhdGUgPSByZXF1aXJlKCcuLi9zdGF0ZScpO1xuXHR2YXIgYXBwbGllciA9IHJlcXVpcmUoJy4uL2FwcGx5Jyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGFycmF5KFByb21pc2UpIHtcblxuXHRcdHZhciBhcHBseUZvbGQgPSBhcHBsaWVyKFByb21pc2UpO1xuXHRcdHZhciB0b1Byb21pc2UgPSBQcm9taXNlLnJlc29sdmU7XG5cdFx0dmFyIGFsbCA9IFByb21pc2UuYWxsO1xuXG5cdFx0dmFyIGFyID0gQXJyYXkucHJvdG90eXBlLnJlZHVjZTtcblx0XHR2YXIgYXJyID0gQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0O1xuXHRcdHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuXHRcdC8vIEFkZGl0aW9uYWwgYXJyYXkgY29tYmluYXRvcnNcblxuXHRcdFByb21pc2UuYW55ID0gYW55O1xuXHRcdFByb21pc2Uuc29tZSA9IHNvbWU7XG5cdFx0UHJvbWlzZS5zZXR0bGUgPSBzZXR0bGU7XG5cblx0XHRQcm9taXNlLm1hcCA9IG1hcDtcblx0XHRQcm9taXNlLmZpbHRlciA9IGZpbHRlcjtcblx0XHRQcm9taXNlLnJlZHVjZSA9IHJlZHVjZTtcblx0XHRQcm9taXNlLnJlZHVjZVJpZ2h0ID0gcmVkdWNlUmlnaHQ7XG5cblx0XHQvKipcblx0XHQgKiBXaGVuIHRoaXMgcHJvbWlzZSBmdWxmaWxscyB3aXRoIGFuIGFycmF5LCBkb1xuXHRcdCAqIG9uRnVsZmlsbGVkLmFwcGx5KHZvaWQgMCwgYXJyYXkpXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gb25GdWxmaWxsZWQgZnVuY3Rpb24gdG8gYXBwbHlcblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSBmb3IgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBvbkZ1bGZpbGxlZFxuXHRcdCAqL1xuXHRcdFByb21pc2UucHJvdG90eXBlLnNwcmVhZCA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy50aGVuKGFsbCkudGhlbihmdW5jdGlvbihhcnJheSkge1xuXHRcdFx0XHRyZXR1cm4gb25GdWxmaWxsZWQuYXBwbHkodGhpcywgYXJyYXkpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdHJldHVybiBQcm9taXNlO1xuXG5cdFx0LyoqXG5cdFx0ICogT25lLXdpbm5lciBjb21wZXRpdGl2ZSByYWNlLlxuXHRcdCAqIFJldHVybiBhIHByb21pc2UgdGhhdCB3aWxsIGZ1bGZpbGwgd2hlbiBvbmUgb2YgdGhlIHByb21pc2VzXG5cdFx0ICogaW4gdGhlIGlucHV0IGFycmF5IGZ1bGZpbGxzLCBvciB3aWxsIHJlamVjdCB3aGVuIGFsbCBwcm9taXNlc1xuXHRcdCAqIGhhdmUgcmVqZWN0ZWQuXG5cdFx0ICogQHBhcmFtIHthcnJheX0gcHJvbWlzZXNcblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSBmb3IgdGhlIGZpcnN0IGZ1bGZpbGxlZCB2YWx1ZVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGFueShwcm9taXNlcykge1xuXHRcdFx0dmFyIHAgPSBQcm9taXNlLl9kZWZlcigpO1xuXHRcdFx0dmFyIHJlc29sdmVyID0gcC5faGFuZGxlcjtcblx0XHRcdHZhciBsID0gcHJvbWlzZXMubGVuZ3RoPj4+MDtcblxuXHRcdFx0dmFyIHBlbmRpbmcgPSBsO1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXG5cdFx0XHRmb3IgKHZhciBoLCB4LCBpID0gMDsgaSA8IGw7ICsraSkge1xuXHRcdFx0XHR4ID0gcHJvbWlzZXNbaV07XG5cdFx0XHRcdGlmKHggPT09IHZvaWQgMCAmJiAhKGkgaW4gcHJvbWlzZXMpKSB7XG5cdFx0XHRcdFx0LS1wZW5kaW5nO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aCA9IFByb21pc2UuX2hhbmRsZXIoeCk7XG5cdFx0XHRcdGlmKGguc3RhdGUoKSA+IDApIHtcblx0XHRcdFx0XHRyZXNvbHZlci5iZWNvbWUoaCk7XG5cdFx0XHRcdFx0UHJvbWlzZS5fdmlzaXRSZW1haW5pbmcocHJvbWlzZXMsIGksIGgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGgudmlzaXQocmVzb2x2ZXIsIGhhbmRsZUZ1bGZpbGwsIGhhbmRsZVJlamVjdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYocGVuZGluZyA9PT0gMCkge1xuXHRcdFx0XHRyZXNvbHZlci5yZWplY3QobmV3IFJhbmdlRXJyb3IoJ2FueSgpOiBhcnJheSBtdXN0IG5vdCBiZSBlbXB0eScpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHA7XG5cblx0XHRcdGZ1bmN0aW9uIGhhbmRsZUZ1bGZpbGwoeCkge1xuXHRcdFx0XHQvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSovXG5cdFx0XHRcdGVycm9ycyA9IG51bGw7XG5cdFx0XHRcdHRoaXMucmVzb2x2ZSh4KTsgLy8gdGhpcyA9PT0gcmVzb2x2ZXJcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gaGFuZGxlUmVqZWN0KGUpIHtcblx0XHRcdFx0Lypqc2hpbnQgdmFsaWR0aGlzOnRydWUqL1xuXHRcdFx0XHRpZih0aGlzLnJlc29sdmVkKSB7IC8vIHRoaXMgPT09IHJlc29sdmVyXG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZXJyb3JzLnB1c2goZSk7XG5cdFx0XHRcdGlmKC0tcGVuZGluZyA9PT0gMCkge1xuXHRcdFx0XHRcdHRoaXMucmVqZWN0KGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBOLXdpbm5lciBjb21wZXRpdGl2ZSByYWNlXG5cdFx0ICogUmV0dXJuIGEgcHJvbWlzZSB0aGF0IHdpbGwgZnVsZmlsbCB3aGVuIG4gaW5wdXQgcHJvbWlzZXMgaGF2ZVxuXHRcdCAqIGZ1bGZpbGxlZCwgb3Igd2lsbCByZWplY3Qgd2hlbiBpdCBiZWNvbWVzIGltcG9zc2libGUgZm9yIG5cblx0XHQgKiBpbnB1dCBwcm9taXNlcyB0byBmdWxmaWxsIChpZSB3aGVuIHByb21pc2VzLmxlbmd0aCAtIG4gKyAxXG5cdFx0ICogaGF2ZSByZWplY3RlZClcblx0XHQgKiBAcGFyYW0ge2FycmF5fSBwcm9taXNlc1xuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBuXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgZm9yIHRoZSBlYXJsaWVzdCBuIGZ1bGZpbGxtZW50IHZhbHVlc1xuXHRcdCAqXG5cdFx0ICogQGRlcHJlY2F0ZWRcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBzb21lKHByb21pc2VzLCBuKSB7XG5cdFx0XHQvKmpzaGludCBtYXhjb21wbGV4aXR5OjcqL1xuXHRcdFx0dmFyIHAgPSBQcm9taXNlLl9kZWZlcigpO1xuXHRcdFx0dmFyIHJlc29sdmVyID0gcC5faGFuZGxlcjtcblxuXHRcdFx0dmFyIHJlc3VsdHMgPSBbXTtcblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblxuXHRcdFx0dmFyIGwgPSBwcm9taXNlcy5sZW5ndGg+Pj4wO1xuXHRcdFx0dmFyIG5GdWxmaWxsID0gMDtcblx0XHRcdHZhciBuUmVqZWN0O1xuXHRcdFx0dmFyIHgsIGk7IC8vIHJldXNlZCBpbiBib3RoIGZvcigpIGxvb3BzXG5cblx0XHRcdC8vIEZpcnN0IHBhc3M6IGNvdW50IGFjdHVhbCBhcnJheSBpdGVtc1xuXHRcdFx0Zm9yKGk9MDsgaTxsOyArK2kpIHtcblx0XHRcdFx0eCA9IHByb21pc2VzW2ldO1xuXHRcdFx0XHRpZih4ID09PSB2b2lkIDAgJiYgIShpIGluIHByb21pc2VzKSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCsrbkZ1bGZpbGw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbXB1dGUgYWN0dWFsIGdvYWxzXG5cdFx0XHRuID0gTWF0aC5tYXgobiwgMCk7XG5cdFx0XHRuUmVqZWN0ID0gKG5GdWxmaWxsIC0gbiArIDEpO1xuXHRcdFx0bkZ1bGZpbGwgPSBNYXRoLm1pbihuLCBuRnVsZmlsbCk7XG5cblx0XHRcdGlmKG4gPiBuRnVsZmlsbCkge1xuXHRcdFx0XHRyZXNvbHZlci5yZWplY3QobmV3IFJhbmdlRXJyb3IoJ3NvbWUoKTogYXJyYXkgbXVzdCBjb250YWluIGF0IGxlYXN0ICdcblx0XHRcdFx0KyBuICsgJyBpdGVtKHMpLCBidXQgaGFkICcgKyBuRnVsZmlsbCkpO1xuXHRcdFx0fSBlbHNlIGlmKG5GdWxmaWxsID09PSAwKSB7XG5cdFx0XHRcdHJlc29sdmVyLnJlc29sdmUocmVzdWx0cyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNlY29uZCBwYXNzOiBvYnNlcnZlIGVhY2ggYXJyYXkgaXRlbSwgbWFrZSBwcm9ncmVzcyB0b3dhcmQgZ29hbHNcblx0XHRcdGZvcihpPTA7IGk8bDsgKytpKSB7XG5cdFx0XHRcdHggPSBwcm9taXNlc1tpXTtcblx0XHRcdFx0aWYoeCA9PT0gdm9pZCAwICYmICEoaSBpbiBwcm9taXNlcykpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdFByb21pc2UuX2hhbmRsZXIoeCkudmlzaXQocmVzb2x2ZXIsIGZ1bGZpbGwsIHJlamVjdCwgcmVzb2x2ZXIubm90aWZ5KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHA7XG5cblx0XHRcdGZ1bmN0aW9uIGZ1bGZpbGwoeCkge1xuXHRcdFx0XHQvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSovXG5cdFx0XHRcdGlmKHRoaXMucmVzb2x2ZWQpIHsgLy8gdGhpcyA9PT0gcmVzb2x2ZXJcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHRzLnB1c2goeCk7XG5cdFx0XHRcdGlmKC0tbkZ1bGZpbGwgPT09IDApIHtcblx0XHRcdFx0XHRlcnJvcnMgPSBudWxsO1xuXHRcdFx0XHRcdHRoaXMucmVzb2x2ZShyZXN1bHRzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiByZWplY3QoZSkge1xuXHRcdFx0XHQvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSovXG5cdFx0XHRcdGlmKHRoaXMucmVzb2x2ZWQpIHsgLy8gdGhpcyA9PT0gcmVzb2x2ZXJcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlcnJvcnMucHVzaChlKTtcblx0XHRcdFx0aWYoLS1uUmVqZWN0ID09PSAwKSB7XG5cdFx0XHRcdFx0cmVzdWx0cyA9IG51bGw7XG5cdFx0XHRcdFx0dGhpcy5yZWplY3QoZXJyb3JzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEFwcGx5IGYgdG8gdGhlIHZhbHVlIG9mIGVhY2ggcHJvbWlzZSBpbiBhIGxpc3Qgb2YgcHJvbWlzZXNcblx0XHQgKiBhbmQgcmV0dXJuIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgcmVzdWx0cy5cblx0XHQgKiBAcGFyYW0ge2FycmF5fSBwcm9taXNlc1xuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqLCBpbmRleDpOdW1iZXIpOip9IGYgbWFwcGluZyBmdW5jdGlvblxuXHRcdCAqIEByZXR1cm5zIHtQcm9taXNlfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIG1hcChwcm9taXNlcywgZikge1xuXHRcdFx0cmV0dXJuIFByb21pc2UuX3RyYXZlcnNlKGYsIHByb21pc2VzKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBGaWx0ZXIgdGhlIHByb3ZpZGVkIGFycmF5IG9mIHByb21pc2VzIHVzaW5nIHRoZSBwcm92aWRlZCBwcmVkaWNhdGUuICBJbnB1dCBtYXlcblx0XHQgKiBjb250YWluIHByb21pc2VzIGFuZCB2YWx1ZXNcblx0XHQgKiBAcGFyYW0ge0FycmF5fSBwcm9taXNlcyBhcnJheSBvZiBwcm9taXNlcyBhbmQgdmFsdWVzXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbih4OiosIGluZGV4Ok51bWJlcik6Ym9vbGVhbn0gcHJlZGljYXRlIGZpbHRlcmluZyBwcmVkaWNhdGUuXG5cdFx0ICogIE11c3QgcmV0dXJuIHRydXRoeSAob3IgcHJvbWlzZSBmb3IgdHJ1dGh5KSBmb3IgaXRlbXMgdG8gcmV0YWluLlxuXHRcdCAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgd2lsbCBmdWxmaWxsIHdpdGggYW4gYXJyYXkgY29udGFpbmluZyBhbGwgaXRlbXNcblx0XHQgKiAgZm9yIHdoaWNoIHByZWRpY2F0ZSByZXR1cm5lZCB0cnV0aHkuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZmlsdGVyKHByb21pc2VzLCBwcmVkaWNhdGUpIHtcblx0XHRcdHZhciBhID0gc2xpY2UuY2FsbChwcm9taXNlcyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5fdHJhdmVyc2UocHJlZGljYXRlLCBhKS50aGVuKGZ1bmN0aW9uKGtlZXApIHtcblx0XHRcdFx0cmV0dXJuIGZpbHRlclN5bmMoYSwga2VlcCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmaWx0ZXJTeW5jKHByb21pc2VzLCBrZWVwKSB7XG5cdFx0XHQvLyBTYWZlIGJlY2F1c2Ugd2Uga25vdyBhbGwgcHJvbWlzZXMgaGF2ZSBmdWxmaWxsZWQgaWYgd2UndmUgbWFkZSBpdCB0aGlzIGZhclxuXHRcdFx0dmFyIGwgPSBrZWVwLmxlbmd0aDtcblx0XHRcdHZhciBmaWx0ZXJlZCA9IG5ldyBBcnJheShsKTtcblx0XHRcdGZvcih2YXIgaT0wLCBqPTA7IGk8bDsgKytpKSB7XG5cdFx0XHRcdGlmKGtlZXBbaV0pIHtcblx0XHRcdFx0XHRmaWx0ZXJlZFtqKytdID0gUHJvbWlzZS5faGFuZGxlcihwcm9taXNlc1tpXSkudmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGZpbHRlcmVkLmxlbmd0aCA9IGo7XG5cdFx0XHRyZXR1cm4gZmlsdGVyZWQ7XG5cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm4gYSBwcm9taXNlIHRoYXQgd2lsbCBhbHdheXMgZnVsZmlsbCB3aXRoIGFuIGFycmF5IGNvbnRhaW5pbmdcblx0XHQgKiB0aGUgb3V0Y29tZSBzdGF0ZXMgb2YgYWxsIGlucHV0IHByb21pc2VzLiAgVGhlIHJldHVybmVkIHByb21pc2Vcblx0XHQgKiB3aWxsIG5ldmVyIHJlamVjdC5cblx0XHQgKiBAcGFyYW0ge0FycmF5fSBwcm9taXNlc1xuXHRcdCAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIGZvciBhcnJheSBvZiBzZXR0bGVkIHN0YXRlIGRlc2NyaXB0b3JzXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gc2V0dGxlKHByb21pc2VzKSB7XG5cdFx0XHRyZXR1cm4gYWxsKHByb21pc2VzLm1hcChzZXR0bGVPbmUpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZXR0bGVPbmUocCkge1xuXHRcdFx0Ly8gT3B0aW1pemUgdGhlIGNhc2Ugd2hlcmUgd2UgZ2V0IGFuIGFscmVhZHktcmVzb2x2ZWQgd2hlbi5qcyBwcm9taXNlXG5cdFx0XHQvLyAgYnkgZXh0cmFjdGluZyBpdHMgc3RhdGU6XG5cdFx0XHR2YXIgaGFuZGxlcjtcblx0XHRcdGlmIChwIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuXHRcdFx0XHQvLyBUaGlzIGlzIG91ciBvd24gUHJvbWlzZSB0eXBlIGFuZCB3ZSBjYW4gcmVhY2ggaXRzIGhhbmRsZXIgaW50ZXJuYWxzOlxuXHRcdFx0XHRoYW5kbGVyID0gcC5faGFuZGxlci5qb2luKCk7XG5cdFx0XHR9XG5cdFx0XHRpZigoaGFuZGxlciAmJiBoYW5kbGVyLnN0YXRlKCkgPT09IDApIHx8ICFoYW5kbGVyKSB7XG5cdFx0XHRcdC8vIEVpdGhlciBzdGlsbCBwZW5kaW5nLCBvciBub3QgYSBQcm9taXNlIGF0IGFsbDpcblx0XHRcdFx0cmV0dXJuIHRvUHJvbWlzZShwKS50aGVuKHN0YXRlLmZ1bGZpbGxlZCwgc3RhdGUucmVqZWN0ZWQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUaGUgcHJvbWlzZSBpcyBvdXIgb3duLCBidXQgaXQgaXMgYWxyZWFkeSByZXNvbHZlZC4gVGFrZSBhIHNob3J0Y3V0LlxuXHRcdFx0Ly8gU2luY2Ugd2UncmUgbm90IGFjdHVhbGx5IGhhbmRsaW5nIHRoZSByZXNvbHV0aW9uLCB3ZSBuZWVkIHRvIGRpc2FibGVcblx0XHRcdC8vIHJlamVjdGlvbiByZXBvcnRpbmcuXG5cdFx0XHRoYW5kbGVyLl91bnJlcG9ydCgpO1xuXHRcdFx0cmV0dXJuIHN0YXRlLmluc3BlY3QoaGFuZGxlcik7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogVHJhZGl0aW9uYWwgcmVkdWNlIGZ1bmN0aW9uLCBzaW1pbGFyIHRvIGBBcnJheS5wcm90b3R5cGUucmVkdWNlKClgLCBidXRcblx0XHQgKiBpbnB1dCBtYXkgY29udGFpbiBwcm9taXNlcyBhbmQvb3IgdmFsdWVzLCBhbmQgcmVkdWNlRnVuY1xuXHRcdCAqIG1heSByZXR1cm4gZWl0aGVyIGEgdmFsdWUgb3IgYSBwcm9taXNlLCAqYW5kKiBpbml0aWFsVmFsdWUgbWF5XG5cdFx0ICogYmUgYSBwcm9taXNlIGZvciB0aGUgc3RhcnRpbmcgdmFsdWUuXG5cdFx0ICogQHBhcmFtIHtBcnJheXxQcm9taXNlfSBwcm9taXNlcyBhcnJheSBvciBwcm9taXNlIGZvciBhbiBhcnJheSBvZiBhbnl0aGluZyxcblx0XHQgKiAgICAgIG1heSBjb250YWluIGEgbWl4IG9mIHByb21pc2VzIGFuZCB2YWx1ZXMuXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbihhY2N1bXVsYXRlZDoqLCB4OiosIGluZGV4Ok51bWJlcik6Kn0gZiByZWR1Y2UgZnVuY3Rpb25cblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhhdCB3aWxsIHJlc29sdmUgdG8gdGhlIGZpbmFsIHJlZHVjZWQgdmFsdWVcblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZWR1Y2UocHJvbWlzZXMsIGYgLyosIGluaXRpYWxWYWx1ZSAqLykge1xuXHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXIuY2FsbChwcm9taXNlcywgbGlmdENvbWJpbmUoZiksIGFyZ3VtZW50c1syXSlcblx0XHRcdFx0XHQ6IGFyLmNhbGwocHJvbWlzZXMsIGxpZnRDb21iaW5lKGYpKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBUcmFkaXRpb25hbCByZWR1Y2UgZnVuY3Rpb24sIHNpbWlsYXIgdG8gYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodCgpYCwgYnV0XG5cdFx0ICogaW5wdXQgbWF5IGNvbnRhaW4gcHJvbWlzZXMgYW5kL29yIHZhbHVlcywgYW5kIHJlZHVjZUZ1bmNcblx0XHQgKiBtYXkgcmV0dXJuIGVpdGhlciBhIHZhbHVlIG9yIGEgcHJvbWlzZSwgKmFuZCogaW5pdGlhbFZhbHVlIG1heVxuXHRcdCAqIGJlIGEgcHJvbWlzZSBmb3IgdGhlIHN0YXJ0aW5nIHZhbHVlLlxuXHRcdCAqIEBwYXJhbSB7QXJyYXl8UHJvbWlzZX0gcHJvbWlzZXMgYXJyYXkgb3IgcHJvbWlzZSBmb3IgYW4gYXJyYXkgb2YgYW55dGhpbmcsXG5cdFx0ICogICAgICBtYXkgY29udGFpbiBhIG1peCBvZiBwcm9taXNlcyBhbmQgdmFsdWVzLlxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24oYWNjdW11bGF0ZWQ6KiwgeDoqLCBpbmRleDpOdW1iZXIpOip9IGYgcmVkdWNlIGZ1bmN0aW9uXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9IHRoYXQgd2lsbCByZXNvbHZlIHRvIHRoZSBmaW5hbCByZWR1Y2VkIHZhbHVlXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVkdWNlUmlnaHQocHJvbWlzZXMsIGYgLyosIGluaXRpYWxWYWx1ZSAqLykge1xuXHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJyLmNhbGwocHJvbWlzZXMsIGxpZnRDb21iaW5lKGYpLCBhcmd1bWVudHNbMl0pXG5cdFx0XHRcdFx0OiBhcnIuY2FsbChwcm9taXNlcywgbGlmdENvbWJpbmUoZikpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGxpZnRDb21iaW5lKGYpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbih6LCB4LCBpKSB7XG5cdFx0XHRcdHJldHVybiBhcHBseUZvbGQoZiwgdm9pZCAwLCBbeix4LGldKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9O1xuXG59KTtcbn0odHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lIDogZnVuY3Rpb24oZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSk7IH0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvYXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvYXJyYXkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE0IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbihmdW5jdGlvbihkZWZpbmUpIHsgJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKGZ1bmN0aW9uKCkge1xuXG5cdHJldHVybiBmdW5jdGlvbiBmbG93KFByb21pc2UpIHtcblxuXHRcdHZhciByZXNvbHZlID0gUHJvbWlzZS5yZXNvbHZlO1xuXHRcdHZhciByZWplY3QgPSBQcm9taXNlLnJlamVjdDtcblx0XHR2YXIgb3JpZ0NhdGNoID0gUHJvbWlzZS5wcm90b3R5cGVbJ2NhdGNoJ107XG5cblx0XHQvKipcblx0XHQgKiBIYW5kbGUgdGhlIHVsdGltYXRlIGZ1bGZpbGxtZW50IHZhbHVlIG9yIHJlamVjdGlvbiByZWFzb24sIGFuZCBhc3N1bWVcblx0XHQgKiByZXNwb25zaWJpbGl0eSBmb3IgYWxsIGVycm9ycy4gIElmIGFuIGVycm9yIHByb3BhZ2F0ZXMgb3V0IG9mIHJlc3VsdFxuXHRcdCAqIG9yIGhhbmRsZUZhdGFsRXJyb3IsIGl0IHdpbGwgYmUgcmV0aHJvd24gdG8gdGhlIGhvc3QsIHJlc3VsdGluZyBpbiBhXG5cdFx0ICogbG91ZCBzdGFjayB0cmFjayBvbiBtb3N0IHBsYXRmb3JtcyBhbmQgYSBjcmFzaCBvbiBzb21lLlxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBvblJlc3VsdFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBvbkVycm9yXG5cdFx0ICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0XHQgKi9cblx0XHRQcm9taXNlLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24ob25SZXN1bHQsIG9uRXJyb3IpIHtcblx0XHRcdHRoaXMuX2hhbmRsZXIudmlzaXQodGhpcy5faGFuZGxlci5yZWNlaXZlciwgb25SZXN1bHQsIG9uRXJyb3IpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBBZGQgRXJyb3ItdHlwZSBhbmQgcHJlZGljYXRlIG1hdGNoaW5nIHRvIGNhdGNoLiAgRXhhbXBsZXM6XG5cdFx0ICogcHJvbWlzZS5jYXRjaChUeXBlRXJyb3IsIGhhbmRsZVR5cGVFcnJvcilcblx0XHQgKiAgIC5jYXRjaChwcmVkaWNhdGUsIGhhbmRsZU1hdGNoZWRFcnJvcnMpXG5cdFx0ICogICAuY2F0Y2goaGFuZGxlUmVtYWluaW5nRXJyb3JzKVxuXHRcdCAqIEBwYXJhbSBvblJlamVjdGVkXG5cdFx0ICogQHJldHVybnMgeyp9XG5cdFx0ICovXG5cdFx0UHJvbWlzZS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBQcm9taXNlLnByb3RvdHlwZS5vdGhlcndpc2UgPSBmdW5jdGlvbihvblJlamVjdGVkKSB7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcblx0XHRcdFx0cmV0dXJuIG9yaWdDYXRjaC5jYWxsKHRoaXMsIG9uUmVqZWN0ZWQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0eXBlb2Ygb25SZWplY3RlZCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5lbnN1cmUocmVqZWN0SW52YWxpZFByZWRpY2F0ZSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvcmlnQ2F0Y2guY2FsbCh0aGlzLCBjcmVhdGVDYXRjaEZpbHRlcihhcmd1bWVudHNbMV0sIG9uUmVqZWN0ZWQpKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogV3JhcHMgdGhlIHByb3ZpZGVkIGNhdGNoIGhhbmRsZXIsIHNvIHRoYXQgaXQgd2lsbCBvbmx5IGJlIGNhbGxlZFxuXHRcdCAqIGlmIHRoZSBwcmVkaWNhdGUgZXZhbHVhdGVzIHRydXRoeVxuXHRcdCAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBoYW5kbGVyXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gcHJlZGljYXRlXG5cdFx0ICogQHJldHVybnMge2Z1bmN0aW9ufSBjb25kaXRpb25hbCBjYXRjaCBoYW5kbGVyXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gY3JlYXRlQ2F0Y2hGaWx0ZXIoaGFuZGxlciwgcHJlZGljYXRlKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRyZXR1cm4gZXZhbHVhdGVQcmVkaWNhdGUoZSwgcHJlZGljYXRlKVxuXHRcdFx0XHRcdD8gaGFuZGxlci5jYWxsKHRoaXMsIGUpXG5cdFx0XHRcdFx0OiByZWplY3QoZSk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEVuc3VyZXMgdGhhdCBvbkZ1bGZpbGxlZE9yUmVqZWN0ZWQgd2lsbCBiZSBjYWxsZWQgcmVnYXJkbGVzcyBvZiB3aGV0aGVyXG5cdFx0ICogdGhpcyBwcm9taXNlIGlzIGZ1bGZpbGxlZCBvciByZWplY3RlZC4gIG9uRnVsZmlsbGVkT3JSZWplY3RlZCBXSUxMIE5PVFxuXHRcdCAqIHJlY2VpdmUgdGhlIHByb21pc2VzJyB2YWx1ZSBvciByZWFzb24uICBBbnkgcmV0dXJuZWQgdmFsdWUgd2lsbCBiZSBkaXNyZWdhcmRlZC5cblx0XHQgKiBvbkZ1bGZpbGxlZE9yUmVqZWN0ZWQgbWF5IHRocm93IG9yIHJldHVybiBhIHJlamVjdGVkIHByb21pc2UgdG8gc2lnbmFsXG5cdFx0ICogYW4gYWRkaXRpb25hbCBlcnJvci5cblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVyIGhhbmRsZXIgdG8gYmUgY2FsbGVkIHJlZ2FyZGxlc3Mgb2Zcblx0XHQgKiAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0UHJvbWlzZS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IFByb21pc2UucHJvdG90eXBlLmVuc3VyZSA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcblx0XHRcdGlmKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKHgpIHtcblx0XHRcdFx0cmV0dXJuIHJ1blNpZGVFZmZlY3QoaGFuZGxlciwgdGhpcywgaWRlbnRpdHksIHgpO1xuXHRcdFx0fSwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRyZXR1cm4gcnVuU2lkZUVmZmVjdChoYW5kbGVyLCB0aGlzLCByZWplY3QsIGUpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGZ1bmN0aW9uIHJ1blNpZGVFZmZlY3QgKGhhbmRsZXIsIHRoaXNBcmcsIHByb3BhZ2F0ZSwgdmFsdWUpIHtcblx0XHRcdHZhciByZXN1bHQgPSBoYW5kbGVyLmNhbGwodGhpc0FyZyk7XG5cdFx0XHRyZXR1cm4gbWF5YmVUaGVuYWJsZShyZXN1bHQpXG5cdFx0XHRcdD8gcHJvcGFnYXRlVmFsdWUocmVzdWx0LCBwcm9wYWdhdGUsIHZhbHVlKVxuXHRcdFx0XHQ6IHByb3BhZ2F0ZSh2YWx1ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHJvcGFnYXRlVmFsdWUgKHJlc3VsdCwgcHJvcGFnYXRlLCB4KSB7XG5cdFx0XHRyZXR1cm4gcmVzb2x2ZShyZXN1bHQpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gcHJvcGFnYXRlKHgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmVjb3ZlciBmcm9tIGEgZmFpbHVyZSBieSByZXR1cm5pbmcgYSBkZWZhdWx0VmFsdWUuICBJZiBkZWZhdWx0VmFsdWVcblx0XHQgKiBpcyBhIHByb21pc2UsIGl0J3MgZnVsZmlsbG1lbnQgdmFsdWUgd2lsbCBiZSB1c2VkLiAgSWYgZGVmYXVsdFZhbHVlIGlzXG5cdFx0ICogYSBwcm9taXNlIHRoYXQgcmVqZWN0cywgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCByZWplY3Qgd2l0aCB0aGVcblx0XHQgKiBzYW1lIHJlYXNvbi5cblx0XHQgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZVxuXHRcdCAqIEByZXR1cm5zIHtQcm9taXNlfSBuZXcgcHJvbWlzZVxuXHRcdCAqL1xuXHRcdFByb21pc2UucHJvdG90eXBlWydlbHNlJ10gPSBQcm9taXNlLnByb3RvdHlwZS5vckVsc2UgPSBmdW5jdGlvbihkZWZhdWx0VmFsdWUpIHtcblx0XHRcdHJldHVybiB0aGlzLnRoZW4odm9pZCAwLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTaG9ydGN1dCBmb3IgLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiB2YWx1ZTsgfSlcblx0XHQgKiBAcGFyYW0gIHsqfSB2YWx1ZVxuXHRcdCAqIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0OlxuXHRcdCAqICAtIGlzIGZ1bGZpbGxlZCBpZiB2YWx1ZSBpcyBub3QgYSBwcm9taXNlLCBvclxuXHRcdCAqICAtIGlmIHZhbHVlIGlzIGEgcHJvbWlzZSwgd2lsbCBmdWxmaWxsIHdpdGggaXRzIHZhbHVlLCBvciByZWplY3Rcblx0XHQgKiAgICB3aXRoIGl0cyByZWFzb24uXG5cdFx0ICovXG5cdFx0UHJvbWlzZS5wcm90b3R5cGVbJ3lpZWxkJ10gPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJ1bnMgYSBzaWRlIGVmZmVjdCB3aGVuIHRoaXMgcHJvbWlzZSBmdWxmaWxscywgd2l0aG91dCBjaGFuZ2luZyB0aGVcblx0XHQgKiBmdWxmaWxsbWVudCB2YWx1ZS5cblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFNpZGVFZmZlY3Rcblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX1cblx0XHQgKi9cblx0XHRQcm9taXNlLnByb3RvdHlwZS50YXAgPSBmdW5jdGlvbihvbkZ1bGZpbGxlZFNpZGVFZmZlY3QpIHtcblx0XHRcdHJldHVybiB0aGlzLnRoZW4ob25GdWxmaWxsZWRTaWRlRWZmZWN0KVsneWllbGQnXSh0aGlzKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIFByb21pc2U7XG5cdH07XG5cblx0ZnVuY3Rpb24gcmVqZWN0SW52YWxpZFByZWRpY2F0ZSgpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdjYXRjaCBwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBldmFsdWF0ZVByZWRpY2F0ZShlLCBwcmVkaWNhdGUpIHtcblx0XHRyZXR1cm4gaXNFcnJvcihwcmVkaWNhdGUpID8gZSBpbnN0YW5jZW9mIHByZWRpY2F0ZSA6IHByZWRpY2F0ZShlKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGlzRXJyb3IocHJlZGljYXRlKSB7XG5cdFx0cmV0dXJuIHByZWRpY2F0ZSA9PT0gRXJyb3Jcblx0XHRcdHx8IChwcmVkaWNhdGUgIT0gbnVsbCAmJiBwcmVkaWNhdGUucHJvdG90eXBlIGluc3RhbmNlb2YgRXJyb3IpO1xuXHR9XG5cblx0ZnVuY3Rpb24gbWF5YmVUaGVuYWJsZSh4KSB7XG5cdFx0cmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbicpICYmIHggIT09IG51bGw7XG5cdH1cblxuXHRmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG5cdFx0cmV0dXJuIHg7XG5cdH1cblxufSk7XG59KHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSA6IGZ1bmN0aW9uKGZhY3RvcnkpIHsgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7IH0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvZmxvdy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvZGVjb3JhdG9ycy9mbG93LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNCBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuLyoqIEBhdXRob3IgSmVmZiBFc2NhbGFudGUgKi9cblxuKGZ1bmN0aW9uKGRlZmluZSkgeyAndXNlIHN0cmljdCc7XG5kZWZpbmUoZnVuY3Rpb24oKSB7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGZvbGQoUHJvbWlzZSkge1xuXG5cdFx0UHJvbWlzZS5wcm90b3R5cGUuZm9sZCA9IGZ1bmN0aW9uKGYsIHopIHtcblx0XHRcdHZhciBwcm9taXNlID0gdGhpcy5fYmVnZXQoKTtcblxuXHRcdFx0dGhpcy5faGFuZGxlci5mb2xkKGZ1bmN0aW9uKHosIHgsIHRvKSB7XG5cdFx0XHRcdFByb21pc2UuX2hhbmRsZXIoeikuZm9sZChmdW5jdGlvbih4LCB6LCB0bykge1xuXHRcdFx0XHRcdHRvLnJlc29sdmUoZi5jYWxsKHRoaXMsIHosIHgpKTtcblx0XHRcdFx0fSwgeCwgdGhpcywgdG8pO1xuXHRcdFx0fSwgeiwgcHJvbWlzZS5faGFuZGxlci5yZWNlaXZlciwgcHJvbWlzZS5faGFuZGxlcik7XG5cblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gUHJvbWlzZTtcblx0fTtcblxufSk7XG59KHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSA6IGZ1bmN0aW9uKGZhY3RvcnkpIHsgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7IH0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvZm9sZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvZGVjb3JhdG9ycy9mb2xkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNCBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4oZnVuY3Rpb24oZGVmaW5lKSB7ICd1c2Ugc3RyaWN0JztcbmRlZmluZShmdW5jdGlvbihyZXF1aXJlKSB7XG5cblx0dmFyIGluc3BlY3QgPSByZXF1aXJlKCcuLi9zdGF0ZScpLmluc3BlY3Q7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGluc3BlY3Rpb24oUHJvbWlzZSkge1xuXG5cdFx0UHJvbWlzZS5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGluc3BlY3QoUHJvbWlzZS5faGFuZGxlcih0aGlzKSk7XG5cdFx0fTtcblxuXHRcdHJldHVybiBQcm9taXNlO1xuXHR9O1xuXG59KTtcbn0odHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lIDogZnVuY3Rpb24oZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSk7IH0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvaW5zcGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvZGVjb3JhdG9ycy9pbnNwZWN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNCBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4oZnVuY3Rpb24oZGVmaW5lKSB7ICd1c2Ugc3RyaWN0JztcbmRlZmluZShmdW5jdGlvbigpIHtcblxuXHRyZXR1cm4gZnVuY3Rpb24gZ2VuZXJhdGUoUHJvbWlzZSkge1xuXG5cdFx0dmFyIHJlc29sdmUgPSBQcm9taXNlLnJlc29sdmU7XG5cblx0XHRQcm9taXNlLml0ZXJhdGUgPSBpdGVyYXRlO1xuXHRcdFByb21pc2UudW5mb2xkID0gdW5mb2xkO1xuXG5cdFx0cmV0dXJuIFByb21pc2U7XG5cblx0XHQvKipcblx0XHQgKiBAZGVwcmVjYXRlZCBVc2UgZ2l0aHViLmNvbS9jdWpvanMvbW9zdCBzdHJlYW1zIGFuZCBtb3N0Lml0ZXJhdGVcblx0XHQgKiBHZW5lcmF0ZSBhIChwb3RlbnRpYWxseSBpbmZpbml0ZSkgc3RyZWFtIG9mIHByb21pc2VkIHZhbHVlczpcblx0XHQgKiB4LCBmKHgpLCBmKGYoeCkpLCBldGMuIHVudGlsIGNvbmRpdGlvbih4KSByZXR1cm5zIHRydWVcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgbmV3IHggZnJvbSB0aGUgcHJldmlvdXMgeFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbmRpdGlvbiBmdW5jdGlvbiB0aGF0LCBnaXZlbiB0aGUgY3VycmVudCB4LCByZXR1cm5zXG5cdFx0ICogIHRydXRoeSB3aGVuIHRoZSBpdGVyYXRlIHNob3VsZCBzdG9wXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gaGFuZGxlciBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIHZhbHVlIHByb2R1Y2VkIGJ5IGZcblx0XHQgKiBAcGFyYW0geyp8UHJvbWlzZX0geCBzdGFydGluZyB2YWx1ZSwgbWF5IGJlIGEgcHJvbWlzZVxuXHRcdCAqIEByZXR1cm4ge1Byb21pc2V9IHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgY2FsbCB0byBmIGJlZm9yZVxuXHRcdCAqICBjb25kaXRpb24gcmV0dXJucyB0cnVlXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gaXRlcmF0ZShmLCBjb25kaXRpb24sIGhhbmRsZXIsIHgpIHtcblx0XHRcdHJldHVybiB1bmZvbGQoZnVuY3Rpb24oeCkge1xuXHRcdFx0XHRyZXR1cm4gW3gsIGYoeCldO1xuXHRcdFx0fSwgY29uZGl0aW9uLCBoYW5kbGVyLCB4KTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBAZGVwcmVjYXRlZCBVc2UgZ2l0aHViLmNvbS9jdWpvanMvbW9zdCBzdHJlYW1zIGFuZCBtb3N0LnVuZm9sZFxuXHRcdCAqIEdlbmVyYXRlIGEgKHBvdGVudGlhbGx5IGluZmluaXRlKSBzdHJlYW0gb2YgcHJvbWlzZWQgdmFsdWVzXG5cdFx0ICogYnkgYXBwbHlpbmcgaGFuZGxlcihnZW5lcmF0b3Ioc2VlZCkpIGl0ZXJhdGl2ZWx5IHVudGlsXG5cdFx0ICogY29uZGl0aW9uKHNlZWQpIHJldHVybnMgdHJ1ZS5cblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSB1bnNwb29sIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgW3ZhbHVlLCBuZXdTZWVkXVxuXHRcdCAqICBnaXZlbiBhIHNlZWQuXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gY29uZGl0aW9uIGZ1bmN0aW9uIHRoYXQsIGdpdmVuIHRoZSBjdXJyZW50IHNlZWQsIHJldHVybnNcblx0XHQgKiAgdHJ1dGh5IHdoZW4gdGhlIHVuZm9sZCBzaG91bGQgc3RvcFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHRoZSB2YWx1ZSBwcm9kdWNlZCBieSB1bnNwb29sXG5cdFx0ICogQHBhcmFtIHggeyp8UHJvbWlzZX0gc3RhcnRpbmcgdmFsdWUsIG1heSBiZSBhIHByb21pc2Vcblx0XHQgKiBAcmV0dXJuIHtQcm9taXNlfSB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IHZhbHVlIHByb2R1Y2VkIGJ5IHVuc3Bvb2wgYmVmb3JlXG5cdFx0ICogIGNvbmRpdGlvbiByZXR1cm5zIHRydWVcblx0XHQgKi9cblx0XHRmdW5jdGlvbiB1bmZvbGQodW5zcG9vbCwgY29uZGl0aW9uLCBoYW5kbGVyLCB4KSB7XG5cdFx0XHRyZXR1cm4gcmVzb2x2ZSh4KS50aGVuKGZ1bmN0aW9uKHNlZWQpIHtcblx0XHRcdFx0cmV0dXJuIHJlc29sdmUoY29uZGl0aW9uKHNlZWQpKS50aGVuKGZ1bmN0aW9uKGRvbmUpIHtcblx0XHRcdFx0XHRyZXR1cm4gZG9uZSA/IHNlZWQgOiByZXNvbHZlKHVuc3Bvb2woc2VlZCkpLnNwcmVhZChuZXh0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZnVuY3Rpb24gbmV4dChpdGVtLCBuZXdTZWVkKSB7XG5cdFx0XHRcdHJldHVybiByZXNvbHZlKGhhbmRsZXIoaXRlbSkpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHVuZm9sZCh1bnNwb29sLCBjb25kaXRpb24sIGhhbmRsZXIsIG5ld1NlZWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cbn0pO1xufSh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUgOiBmdW5jdGlvbihmYWN0b3J5KSB7IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpOyB9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9kZWNvcmF0b3JzL2l0ZXJhdGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvaXRlcmF0ZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTQgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuKGZ1bmN0aW9uKGRlZmluZSkgeyAndXNlIHN0cmljdCc7XG5kZWZpbmUoZnVuY3Rpb24oKSB7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHByb2dyZXNzKFByb21pc2UpIHtcblxuXHRcdC8qKlxuXHRcdCAqIEBkZXByZWNhdGVkXG5cdFx0ICogUmVnaXN0ZXIgYSBwcm9ncmVzcyBoYW5kbGVyIGZvciB0aGlzIHByb21pc2Vcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvblByb2dyZXNzXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0UHJvbWlzZS5wcm90b3R5cGUucHJvZ3Jlc3MgPSBmdW5jdGlvbihvblByb2dyZXNzKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy50aGVuKHZvaWQgMCwgdm9pZCAwLCBvblByb2dyZXNzKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIFByb21pc2U7XG5cdH07XG5cbn0pO1xufSh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUgOiBmdW5jdGlvbihmYWN0b3J5KSB7IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpOyB9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9kZWNvcmF0b3JzL3Byb2dyZXNzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9kZWNvcmF0b3JzL3Byb2dyZXNzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNCBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4oZnVuY3Rpb24oZGVmaW5lKSB7ICd1c2Ugc3RyaWN0JztcbmRlZmluZShmdW5jdGlvbihyZXF1aXJlKSB7XG5cblx0dmFyIGVudiA9IHJlcXVpcmUoJy4uL2VudicpO1xuXHR2YXIgVGltZW91dEVycm9yID0gcmVxdWlyZSgnLi4vVGltZW91dEVycm9yJyk7XG5cblx0ZnVuY3Rpb24gc2V0VGltZW91dChmLCBtcywgeCwgeSkge1xuXHRcdHJldHVybiBlbnYuc2V0VGltZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRmKHgsIHksIG1zKTtcblx0XHR9LCBtcyk7XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24gdGltZWQoUHJvbWlzZSkge1xuXHRcdC8qKlxuXHRcdCAqIFJldHVybiBhIG5ldyBwcm9taXNlIHdob3NlIGZ1bGZpbGxtZW50IHZhbHVlIGlzIHJldmVhbGVkIG9ubHlcblx0XHQgKiBhZnRlciBtcyBtaWxsaXNlY29uZHNcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gbXMgbWlsbGlzZWNvbmRzXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0UHJvbWlzZS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbihtcykge1xuXHRcdFx0dmFyIHAgPSB0aGlzLl9iZWdldCgpO1xuXHRcdFx0dGhpcy5faGFuZGxlci5mb2xkKGhhbmRsZURlbGF5LCBtcywgdm9pZCAwLCBwLl9oYW5kbGVyKTtcblx0XHRcdHJldHVybiBwO1xuXHRcdH07XG5cblx0XHRmdW5jdGlvbiBoYW5kbGVEZWxheShtcywgeCwgaCkge1xuXHRcdFx0c2V0VGltZW91dChyZXNvbHZlRGVsYXksIG1zLCB4LCBoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZXNvbHZlRGVsYXkoeCwgaCkge1xuXHRcdFx0aC5yZXNvbHZlKHgpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybiBhIG5ldyBwcm9taXNlIHRoYXQgcmVqZWN0cyBhZnRlciBtcyBtaWxsaXNlY29uZHMgdW5sZXNzXG5cdFx0ICogdGhpcyBwcm9taXNlIGZ1bGZpbGxzIGVhcmxpZXIsIGluIHdoaWNoIGNhc2UgdGhlIHJldHVybmVkIHByb21pc2Vcblx0XHQgKiBmdWxmaWxscyB3aXRoIHRoZSBzYW1lIHZhbHVlLlxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBtcyBtaWxsaXNlY29uZHNcblx0XHQgKiBAcGFyYW0ge0Vycm9yfCo9fSByZWFzb24gb3B0aW9uYWwgcmVqZWN0aW9uIHJlYXNvbiB0byB1c2UsIGRlZmF1bHRzXG5cdFx0ICogICB0byBhIFRpbWVvdXRFcnJvciBpZiBub3QgcHJvdmlkZWRcblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX1cblx0XHQgKi9cblx0XHRQcm9taXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24obXMsIHJlYXNvbikge1xuXHRcdFx0dmFyIHAgPSB0aGlzLl9iZWdldCgpO1xuXHRcdFx0dmFyIGggPSBwLl9oYW5kbGVyO1xuXG5cdFx0XHR2YXIgdCA9IHNldFRpbWVvdXQob25UaW1lb3V0LCBtcywgcmVhc29uLCBwLl9oYW5kbGVyKTtcblxuXHRcdFx0dGhpcy5faGFuZGxlci52aXNpdChoLFxuXHRcdFx0XHRmdW5jdGlvbiBvbkZ1bGZpbGwoeCkge1xuXHRcdFx0XHRcdGVudi5jbGVhclRpbWVyKHQpO1xuXHRcdFx0XHRcdHRoaXMucmVzb2x2ZSh4KTsgLy8gdGhpcyA9IGhcblx0XHRcdFx0fSxcblx0XHRcdFx0ZnVuY3Rpb24gb25SZWplY3QoeCkge1xuXHRcdFx0XHRcdGVudi5jbGVhclRpbWVyKHQpO1xuXHRcdFx0XHRcdHRoaXMucmVqZWN0KHgpOyAvLyB0aGlzID0gaFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRoLm5vdGlmeSk7XG5cblx0XHRcdHJldHVybiBwO1xuXHRcdH07XG5cblx0XHRmdW5jdGlvbiBvblRpbWVvdXQocmVhc29uLCBoLCBtcykge1xuXHRcdFx0dmFyIGUgPSB0eXBlb2YgcmVhc29uID09PSAndW5kZWZpbmVkJ1xuXHRcdFx0XHQ/IG5ldyBUaW1lb3V0RXJyb3IoJ3RpbWVkIG91dCBhZnRlciAnICsgbXMgKyAnbXMnKVxuXHRcdFx0XHQ6IHJlYXNvbjtcblx0XHRcdGgucmVqZWN0KGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBQcm9taXNlO1xuXHR9O1xuXG59KTtcbn0odHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lIDogZnVuY3Rpb24oZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSk7IH0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvdGltZWQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvdGltZWQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE0IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbihmdW5jdGlvbihkZWZpbmUpIHsgJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUpIHtcblxuXHR2YXIgc2V0VGltZXIgPSByZXF1aXJlKCcuLi9lbnYnKS5zZXRUaW1lcjtcblx0dmFyIGZvcm1hdCA9IHJlcXVpcmUoJy4uL2Zvcm1hdCcpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmhhbmRsZWRSZWplY3Rpb24oUHJvbWlzZSkge1xuXG5cdFx0dmFyIGxvZ0Vycm9yID0gbm9vcDtcblx0XHR2YXIgbG9nSW5mbyA9IG5vb3A7XG5cdFx0dmFyIGxvY2FsQ29uc29sZTtcblxuXHRcdGlmKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0Ly8gQWxpYXMgY29uc29sZSB0byBwcmV2ZW50IHRoaW5ncyBsaWtlIHVnbGlmeSdzIGRyb3BfY29uc29sZSBvcHRpb24gZnJvbVxuXHRcdFx0Ly8gcmVtb3ZpbmcgY29uc29sZS5sb2cvZXJyb3IuIFVuaGFuZGxlZCByZWplY3Rpb25zIGZhbGwgaW50byB0aGUgc2FtZVxuXHRcdFx0Ly8gY2F0ZWdvcnkgYXMgdW5jYXVnaHQgZXhjZXB0aW9ucywgYW5kIGJ1aWxkIHRvb2xzIHNob3VsZG4ndCBzaWxlbmNlIHRoZW0uXG5cdFx0XHRsb2NhbENvbnNvbGUgPSBjb25zb2xlO1xuXHRcdFx0bG9nRXJyb3IgPSB0eXBlb2YgbG9jYWxDb25zb2xlLmVycm9yICE9PSAndW5kZWZpbmVkJ1xuXHRcdFx0XHQ/IGZ1bmN0aW9uIChlKSB7IGxvY2FsQ29uc29sZS5lcnJvcihlKTsgfVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIChlKSB7IGxvY2FsQ29uc29sZS5sb2coZSk7IH07XG5cblx0XHRcdGxvZ0luZm8gPSB0eXBlb2YgbG9jYWxDb25zb2xlLmluZm8gIT09ICd1bmRlZmluZWQnXG5cdFx0XHRcdD8gZnVuY3Rpb24gKGUpIHsgbG9jYWxDb25zb2xlLmluZm8oZSk7IH1cblx0XHRcdFx0OiBmdW5jdGlvbiAoZSkgeyBsb2NhbENvbnNvbGUubG9nKGUpOyB9O1xuXHRcdH1cblxuXHRcdFByb21pc2Uub25Qb3RlbnRpYWxseVVuaGFuZGxlZFJlamVjdGlvbiA9IGZ1bmN0aW9uKHJlamVjdGlvbikge1xuXHRcdFx0ZW5xdWV1ZShyZXBvcnQsIHJlamVjdGlvbik7XG5cdFx0fTtcblxuXHRcdFByb21pc2Uub25Qb3RlbnRpYWxseVVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQgPSBmdW5jdGlvbihyZWplY3Rpb24pIHtcblx0XHRcdGVucXVldWUodW5yZXBvcnQsIHJlamVjdGlvbik7XG5cdFx0fTtcblxuXHRcdFByb21pc2Uub25GYXRhbFJlamVjdGlvbiA9IGZ1bmN0aW9uKHJlamVjdGlvbikge1xuXHRcdFx0ZW5xdWV1ZSh0aHJvd2l0LCByZWplY3Rpb24udmFsdWUpO1xuXHRcdH07XG5cblx0XHR2YXIgdGFza3MgPSBbXTtcblx0XHR2YXIgcmVwb3J0ZWQgPSBbXTtcblx0XHR2YXIgcnVubmluZyA9IG51bGw7XG5cblx0XHRmdW5jdGlvbiByZXBvcnQocikge1xuXHRcdFx0aWYoIXIuaGFuZGxlZCkge1xuXHRcdFx0XHRyZXBvcnRlZC5wdXNoKHIpO1xuXHRcdFx0XHRsb2dFcnJvcignUG90ZW50aWFsbHkgdW5oYW5kbGVkIHJlamVjdGlvbiBbJyArIHIuaWQgKyAnXSAnICsgZm9ybWF0LmZvcm1hdEVycm9yKHIudmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1bnJlcG9ydChyKSB7XG5cdFx0XHR2YXIgaSA9IHJlcG9ydGVkLmluZGV4T2Yocik7XG5cdFx0XHRpZihpID49IDApIHtcblx0XHRcdFx0cmVwb3J0ZWQuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRsb2dJbmZvKCdIYW5kbGVkIHByZXZpb3VzIHJlamVjdGlvbiBbJyArIHIuaWQgKyAnXSAnICsgZm9ybWF0LmZvcm1hdE9iamVjdChyLnZhbHVlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZW5xdWV1ZShmLCB4KSB7XG5cdFx0XHR0YXNrcy5wdXNoKGYsIHgpO1xuXHRcdFx0aWYocnVubmluZyA9PT0gbnVsbCkge1xuXHRcdFx0XHRydW5uaW5nID0gc2V0VGltZXIoZmx1c2gsIDApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGZsdXNoKCkge1xuXHRcdFx0cnVubmluZyA9IG51bGw7XG5cdFx0XHR3aGlsZSh0YXNrcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRhc2tzLnNoaWZ0KCkodGFza3Muc2hpZnQoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFByb21pc2U7XG5cdH07XG5cblx0ZnVuY3Rpb24gdGhyb3dpdChlKSB7XG5cdFx0dGhyb3cgZTtcblx0fVxuXG5cdGZ1bmN0aW9uIG5vb3AoKSB7fVxuXG59KTtcbn0odHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lIDogZnVuY3Rpb24oZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSk7IH0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvdW5oYW5kbGVkUmVqZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9kZWNvcmF0b3JzL3VuaGFuZGxlZFJlamVjdGlvbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTQgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuKGZ1bmN0aW9uKGRlZmluZSkgeyAndXNlIHN0cmljdCc7XG5kZWZpbmUoZnVuY3Rpb24oKSB7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGFkZFdpdGgoUHJvbWlzZSkge1xuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgYSBwcm9taXNlIHdob3NlIGhhbmRsZXJzIHdpbGwgYmUgY2FsbGVkIHdpdGggYHRoaXNgIHNldCB0b1xuXHRcdCAqIHRoZSBzdXBwbGllZCByZWNlaXZlci4gIFN1YnNlcXVlbnQgcHJvbWlzZXMgZGVyaXZlZCBmcm9tIHRoZVxuXHRcdCAqIHJldHVybmVkIHByb21pc2Ugd2lsbCBhbHNvIGhhdmUgdGhlaXIgaGFuZGxlcnMgY2FsbGVkIHdpdGggcmVjZWl2ZXJcblx0XHQgKiBhcyBgdGhpc2AuIENhbGxpbmcgYHdpdGhgIHdpdGggdW5kZWZpbmVkIG9yIG5vIGFyZ3VtZW50cyB3aWxsIHJldHVyblxuXHRcdCAqIGEgcHJvbWlzZSB3aG9zZSBoYW5kbGVycyB3aWxsIGFnYWluIGJlIGNhbGxlZCBpbiB0aGUgdXN1YWwgUHJvbWlzZXMvQStcblx0XHQgKiB3YXkgKG5vIGB0aGlzYCkgdGh1cyBzYWZlbHkgdW5kb2luZyBhbnkgcHJldmlvdXMgYHdpdGhgIGluIHRoZVxuXHRcdCAqIHByb21pc2UgY2hhaW4uXG5cdFx0ICpcblx0XHQgKiBXQVJOSU5HOiBQcm9taXNlcyByZXR1cm5lZCBmcm9tIGB3aXRoYC9gd2l0aFRoaXNgIGFyZSBOT1QgUHJvbWlzZXMvQStcblx0XHQgKiBjb21wbGlhbnQsIHNwZWNpZmljYWxseSB2aW9sYXRpbmcgMi4yLjUgKGh0dHA6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNDEpXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge29iamVjdH0gcmVjZWl2ZXIgYHRoaXNgIHZhbHVlIGZvciBhbGwgaGFuZGxlcnMgYXR0YWNoZWQgdG9cblx0XHQgKiAgdGhlIHJldHVybmVkIHByb21pc2UuXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0UHJvbWlzZS5wcm90b3R5cGVbJ3dpdGgnXSA9IFByb21pc2UucHJvdG90eXBlLndpdGhUaGlzID0gZnVuY3Rpb24ocmVjZWl2ZXIpIHtcblx0XHRcdHZhciBwID0gdGhpcy5fYmVnZXQoKTtcblx0XHRcdHZhciBjaGlsZCA9IHAuX2hhbmRsZXI7XG5cdFx0XHRjaGlsZC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuXHRcdFx0dGhpcy5faGFuZGxlci5jaGFpbihjaGlsZCwgcmVjZWl2ZXIpO1xuXHRcdFx0cmV0dXJuIHA7XG5cdFx0fTtcblxuXHRcdHJldHVybiBQcm9taXNlO1xuXHR9O1xuXG59KTtcbn0odHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lIDogZnVuY3Rpb24oZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTsgfSkpO1xuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9kZWNvcmF0b3JzL3dpdGguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2RlY29yYXRvcnMvd2l0aC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTQgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuLypnbG9iYWwgcHJvY2Vzcyxkb2N1bWVudCxzZXRUaW1lb3V0LGNsZWFyVGltZW91dCxNdXRhdGlvbk9ic2VydmVyLFdlYktpdE11dGF0aW9uT2JzZXJ2ZXIqL1xuKGZ1bmN0aW9uKGRlZmluZSkgeyAndXNlIHN0cmljdCc7XG5kZWZpbmUoZnVuY3Rpb24ocmVxdWlyZSkge1xuXHQvKmpzaGludCBtYXhjb21wbGV4aXR5OjYqL1xuXG5cdC8vIFNuaWZmIFwiYmVzdFwiIGFzeW5jIHNjaGVkdWxpbmcgb3B0aW9uXG5cdC8vIFByZWZlciBwcm9jZXNzLm5leHRUaWNrIG9yIE11dGF0aW9uT2JzZXJ2ZXIsIHRoZW4gY2hlY2sgZm9yXG5cdC8vIHNldFRpbWVvdXQsIGFuZCBmaW5hbGx5IHZlcnR4LCBzaW5jZSBpdHMgdGhlIG9ubHkgZW52IHRoYXQgZG9lc24ndFxuXHQvLyBoYXZlIHNldFRpbWVvdXRcblxuXHR2YXIgTXV0YXRpb25PYnM7XG5cdHZhciBjYXB0dXJlZFNldFRpbWVvdXQgPSB0eXBlb2Ygc2V0VGltZW91dCAhPT0gJ3VuZGVmaW5lZCcgJiYgc2V0VGltZW91dDtcblxuXHQvLyBEZWZhdWx0IGVudlxuXHR2YXIgc2V0VGltZXIgPSBmdW5jdGlvbihmLCBtcykgeyByZXR1cm4gc2V0VGltZW91dChmLCBtcyk7IH07XG5cdHZhciBjbGVhclRpbWVyID0gZnVuY3Rpb24odCkgeyByZXR1cm4gY2xlYXJUaW1lb3V0KHQpOyB9O1xuXHR2YXIgYXNhcCA9IGZ1bmN0aW9uIChmKSB7IHJldHVybiBjYXB0dXJlZFNldFRpbWVvdXQoZiwgMCk7IH07XG5cblx0Ly8gRGV0ZWN0IHNwZWNpZmljIGVudlxuXHRpZiAoaXNOb2RlKCkpIHsgLy8gTm9kZVxuXHRcdGFzYXAgPSBmdW5jdGlvbiAoZikgeyByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmKTsgfTtcblxuXHR9IGVsc2UgaWYgKE11dGF0aW9uT2JzID0gaGFzTXV0YXRpb25PYnNlcnZlcigpKSB7IC8vIE1vZGVybiBicm93c2VyXG5cdFx0YXNhcCA9IGluaXRNdXRhdGlvbk9ic2VydmVyKE11dGF0aW9uT2JzKTtcblxuXHR9IGVsc2UgaWYgKCFjYXB0dXJlZFNldFRpbWVvdXQpIHsgLy8gdmVydC54XG5cdFx0dmFyIHZlcnR4UmVxdWlyZSA9IHJlcXVpcmU7XG5cdFx0dmFyIHZlcnR4ID0gdmVydHhSZXF1aXJlKCd2ZXJ0eCcpO1xuXHRcdHNldFRpbWVyID0gZnVuY3Rpb24gKGYsIG1zKSB7IHJldHVybiB2ZXJ0eC5zZXRUaW1lcihtcywgZik7IH07XG5cdFx0Y2xlYXJUaW1lciA9IHZlcnR4LmNhbmNlbFRpbWVyO1xuXHRcdGFzYXAgPSB2ZXJ0eC5ydW5Pbkxvb3AgfHwgdmVydHgucnVuT25Db250ZXh0O1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzZXRUaW1lcjogc2V0VGltZXIsXG5cdFx0Y2xlYXJUaW1lcjogY2xlYXJUaW1lcixcblx0XHRhc2FwOiBhc2FwXG5cdH07XG5cblx0ZnVuY3Rpb24gaXNOb2RlICgpIHtcblx0XHRyZXR1cm4gdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG5cdFx0XHRPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblx0fVxuXG5cdGZ1bmN0aW9uIGhhc011dGF0aW9uT2JzZXJ2ZXIgKCkge1xuXHQgICAgcmV0dXJuICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgTXV0YXRpb25PYnNlcnZlcikgfHxcblx0XHRcdCh0eXBlb2YgV2ViS2l0TXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgV2ViS2l0TXV0YXRpb25PYnNlcnZlcik7XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0TXV0YXRpb25PYnNlcnZlcihNdXRhdGlvbk9ic2VydmVyKSB7XG5cdFx0dmFyIHNjaGVkdWxlZDtcblx0XHR2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcblx0XHR2YXIgbyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHJ1bik7XG5cdFx0by5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcblxuXHRcdGZ1bmN0aW9uIHJ1bigpIHtcblx0XHRcdHZhciBmID0gc2NoZWR1bGVkO1xuXHRcdFx0c2NoZWR1bGVkID0gdm9pZCAwO1xuXHRcdFx0ZigpO1xuXHRcdH1cblxuXHRcdHZhciBpID0gMDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGYpIHtcblx0XHRcdHNjaGVkdWxlZCA9IGY7XG5cdFx0XHRub2RlLmRhdGEgPSAoaSBePSAxKTtcblx0XHR9O1xuXHR9XG59KTtcbn0odHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lIDogZnVuY3Rpb24oZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSk7IH0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2Vudi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvZW52LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNCBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4oZnVuY3Rpb24oZGVmaW5lKSB7ICd1c2Ugc3RyaWN0JztcbmRlZmluZShmdW5jdGlvbigpIHtcblxuXHRyZXR1cm4ge1xuXHRcdGZvcm1hdEVycm9yOiBmb3JtYXRFcnJvcixcblx0XHRmb3JtYXRPYmplY3Q6IGZvcm1hdE9iamVjdCxcblx0XHR0cnlTdHJpbmdpZnk6IHRyeVN0cmluZ2lmeVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYW4gZXJyb3IgaW50byBhIHN0cmluZy4gIElmIGUgaXMgYW4gRXJyb3IgYW5kIGhhcyBhIHN0YWNrIHByb3BlcnR5LFxuXHQgKiBpdCdzIHJldHVybmVkLiAgT3RoZXJ3aXNlLCBlIGlzIGZvcm1hdHRlZCB1c2luZyBmb3JtYXRPYmplY3QsIHdpdGggYVxuXHQgKiB3YXJuaW5nIGFkZGVkIGFib3V0IGUgbm90IGJlaW5nIGEgcHJvcGVyIEVycm9yLlxuXHQgKiBAcGFyYW0geyp9IGVcblx0ICogQHJldHVybnMge1N0cmluZ30gZm9ybWF0dGVkIHN0cmluZywgc3VpdGFibGUgZm9yIG91dHB1dCB0byBkZXZlbG9wZXJzXG5cdCAqL1xuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihlKSB7XG5cdFx0dmFyIHMgPSB0eXBlb2YgZSA9PT0gJ29iamVjdCcgJiYgZSAhPT0gbnVsbCAmJiAoZS5zdGFjayB8fCBlLm1lc3NhZ2UpID8gZS5zdGFjayB8fCBlLm1lc3NhZ2UgOiBmb3JtYXRPYmplY3QoZSk7XG5cdFx0cmV0dXJuIGUgaW5zdGFuY2VvZiBFcnJvciA/IHMgOiBzICsgJyAoV0FSTklORzogbm9uLUVycm9yIHVzZWQpJztcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYW4gb2JqZWN0LCBkZXRlY3RpbmcgXCJwbGFpblwiIG9iamVjdHMgYW5kIHJ1bm5pbmcgdGhlbSB0aHJvdWdoXG5cdCAqIEpTT04uc3RyaW5naWZ5IGlmIHBvc3NpYmxlLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb1xuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gZm9ybWF0T2JqZWN0KG8pIHtcblx0XHR2YXIgcyA9IFN0cmluZyhvKTtcblx0XHRpZihzID09PSAnW29iamVjdCBPYmplY3RdJyAmJiB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHMgPSB0cnlTdHJpbmdpZnkobywgcyk7XG5cdFx0fVxuXHRcdHJldHVybiBzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRyeSB0byByZXR1cm4gdGhlIHJlc3VsdCBvZiBKU09OLnN0cmluZ2lmeSh4KS4gIElmIHRoYXQgZmFpbHMsIHJldHVyblxuXHQgKiBkZWZhdWx0VmFsdWVcblx0ICogQHBhcmFtIHsqfSB4XG5cdCAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd8Kn0gSlNPTi5zdHJpbmdpZnkoeCkgb3IgZGVmYXVsdFZhbHVlXG5cdCAqL1xuXHRmdW5jdGlvbiB0cnlTdHJpbmdpZnkoeCwgZGVmYXVsdFZhbHVlKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh4KTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9XG5cbn0pO1xufSh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUgOiBmdW5jdGlvbihmYWN0b3J5KSB7IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpOyB9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9mb3JtYXQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL2Zvcm1hdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTQgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuKGZ1bmN0aW9uKGRlZmluZSkgeyAndXNlIHN0cmljdCc7XG5kZWZpbmUoZnVuY3Rpb24oKSB7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIG1ha2VQcm9taXNlKGVudmlyb25tZW50KSB7XG5cblx0XHR2YXIgdGFza3MgPSBlbnZpcm9ubWVudC5zY2hlZHVsZXI7XG5cdFx0dmFyIGVtaXRSZWplY3Rpb24gPSBpbml0RW1pdFJlamVjdGlvbigpO1xuXG5cdFx0dmFyIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHxcblx0XHRcdGZ1bmN0aW9uKHByb3RvKSB7XG5cdFx0XHRcdGZ1bmN0aW9uIENoaWxkKCkge31cblx0XHRcdFx0Q2hpbGQucHJvdG90eXBlID0gcHJvdG87XG5cdFx0XHRcdHJldHVybiBuZXcgQ2hpbGQoKTtcblx0XHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGUgYSBwcm9taXNlIHdob3NlIGZhdGUgaXMgZGV0ZXJtaW5lZCBieSByZXNvbHZlclxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlXG5cdFx0ICogQG5hbWUgUHJvbWlzZVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIFByb21pc2UocmVzb2x2ZXIsIGhhbmRsZXIpIHtcblx0XHRcdHRoaXMuX2hhbmRsZXIgPSByZXNvbHZlciA9PT0gSGFuZGxlciA/IGhhbmRsZXIgOiBpbml0KHJlc29sdmVyKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSdW4gdGhlIHN1cHBsaWVkIHJlc29sdmVyXG5cdFx0ICogQHBhcmFtIHJlc29sdmVyXG5cdFx0ICogQHJldHVybnMge1BlbmRpbmd9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gaW5pdChyZXNvbHZlcikge1xuXHRcdFx0dmFyIGhhbmRsZXIgPSBuZXcgUGVuZGluZygpO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXNvbHZlcihwcm9taXNlUmVzb2x2ZSwgcHJvbWlzZVJlamVjdCwgcHJvbWlzZU5vdGlmeSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHByb21pc2VSZWplY3QoZSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBoYW5kbGVyO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFRyYW5zaXRpb24gZnJvbSBwcmUtcmVzb2x1dGlvbiBzdGF0ZSB0byBwb3N0LXJlc29sdXRpb24gc3RhdGUsIG5vdGlmeWluZ1xuXHRcdFx0ICogYWxsIGxpc3RlbmVycyBvZiB0aGUgdWx0aW1hdGUgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uXG5cdFx0XHQgKiBAcGFyYW0geyp9IHggcmVzb2x1dGlvbiB2YWx1ZVxuXHRcdFx0ICovXG5cdFx0XHRmdW5jdGlvbiBwcm9taXNlUmVzb2x2ZSAoeCkge1xuXHRcdFx0XHRoYW5kbGVyLnJlc29sdmUoeCk7XG5cdFx0XHR9XG5cdFx0XHQvKipcblx0XHRcdCAqIFJlamVjdCB0aGlzIHByb21pc2Ugd2l0aCByZWFzb24sIHdoaWNoIHdpbGwgYmUgdXNlZCB2ZXJiYXRpbVxuXHRcdFx0ICogQHBhcmFtIHtFcnJvcnwqfSByZWFzb24gcmVqZWN0aW9uIHJlYXNvbiwgc3Ryb25nbHkgc3VnZ2VzdGVkXG5cdFx0XHQgKiAgIHRvIGJlIGFuIEVycm9yIHR5cGVcblx0XHRcdCAqL1xuXHRcdFx0ZnVuY3Rpb24gcHJvbWlzZVJlamVjdCAocmVhc29uKSB7XG5cdFx0XHRcdGhhbmRsZXIucmVqZWN0KHJlYXNvbik7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQGRlcHJlY2F0ZWRcblx0XHRcdCAqIElzc3VlIGEgcHJvZ3Jlc3MgZXZlbnQsIG5vdGlmeWluZyBhbGwgcHJvZ3Jlc3MgbGlzdGVuZXJzXG5cdFx0XHQgKiBAcGFyYW0geyp9IHggcHJvZ3Jlc3MgZXZlbnQgcGF5bG9hZCB0byBwYXNzIHRvIGFsbCBsaXN0ZW5lcnNcblx0XHRcdCAqL1xuXHRcdFx0ZnVuY3Rpb24gcHJvbWlzZU5vdGlmeSAoeCkge1xuXHRcdFx0XHRoYW5kbGVyLm5vdGlmeSh4KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDcmVhdGlvblxuXG5cdFx0UHJvbWlzZS5yZXNvbHZlID0gcmVzb2x2ZTtcblx0XHRQcm9taXNlLnJlamVjdCA9IHJlamVjdDtcblx0XHRQcm9taXNlLm5ldmVyID0gbmV2ZXI7XG5cblx0XHRQcm9taXNlLl9kZWZlciA9IGRlZmVyO1xuXHRcdFByb21pc2UuX2hhbmRsZXIgPSBnZXRIYW5kbGVyO1xuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhIHRydXN0ZWQgcHJvbWlzZS4gSWYgeCBpcyBhbHJlYWR5IGEgdHJ1c3RlZCBwcm9taXNlLCBpdCBpc1xuXHRcdCAqIHJldHVybmVkLCBvdGhlcndpc2UgcmV0dXJucyBhIG5ldyB0cnVzdGVkIFByb21pc2Ugd2hpY2ggZm9sbG93cyB4LlxuXHRcdCAqIEBwYXJhbSAgeyp9IHhcblx0XHQgKiBAcmV0dXJuIHtQcm9taXNlfSBwcm9taXNlXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG5cdFx0XHRyZXR1cm4gaXNQcm9taXNlKHgpID8geFxuXHRcdFx0XHQ6IG5ldyBQcm9taXNlKEhhbmRsZXIsIG5ldyBBc3luYyhnZXRIYW5kbGVyKHgpKSk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJuIGEgcmVqZWN0IHByb21pc2Ugd2l0aCB4IGFzIGl0cyByZWFzb24gKHggaXMgdXNlZCB2ZXJiYXRpbSlcblx0XHQgKiBAcGFyYW0geyp9IHhcblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gcmVqZWN0ZWQgcHJvbWlzZVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHJlamVjdCh4KSB7XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoSGFuZGxlciwgbmV3IEFzeW5jKG5ldyBSZWplY3RlZCh4KSkpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybiBhIHByb21pc2UgdGhhdCByZW1haW5zIHBlbmRpbmcgZm9yZXZlclxuXHRcdCAqIEByZXR1cm5zIHtQcm9taXNlfSBmb3JldmVyLXBlbmRpbmcgcHJvbWlzZS5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBuZXZlcigpIHtcblx0XHRcdHJldHVybiBmb3JldmVyUGVuZGluZ1Byb21pc2U7IC8vIFNob3VsZCBiZSBmcm96ZW5cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGFuIGludGVybmFsIHtwcm9taXNlLCByZXNvbHZlcn0gcGFpclxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZGVmZXIoKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoSGFuZGxlciwgbmV3IFBlbmRpbmcoKSk7XG5cdFx0fVxuXG5cdFx0Ly8gVHJhbnNmb3JtYXRpb24gYW5kIGZsb3cgY29udHJvbFxuXG5cdFx0LyoqXG5cdFx0ICogVHJhbnNmb3JtIHRoaXMgcHJvbWlzZSdzIGZ1bGZpbGxtZW50IHZhbHVlLCByZXR1cm5pbmcgYSBuZXcgUHJvbWlzZVxuXHRcdCAqIGZvciB0aGUgdHJhbnNmb3JtZWQgcmVzdWx0LiAgSWYgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZCwgb25SZWplY3RlZFxuXHRcdCAqIGlzIGNhbGxlZCB3aXRoIHRoZSByZWFzb24uICBvblByb2dyZXNzICptYXkqIGJlIGNhbGxlZCB3aXRoIHVwZGF0ZXMgdG93YXJkXG5cdFx0ICogdGhpcyBwcm9taXNlJ3MgZnVsZmlsbG1lbnQuXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbj19IG9uRnVsZmlsbGVkIGZ1bGZpbGxtZW50IGhhbmRsZXJcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gb25SZWplY3RlZCByZWplY3Rpb24gaGFuZGxlclxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb249fSBvblByb2dyZXNzIEBkZXByZWNhdGVkIHByb2dyZXNzIGhhbmRsZXJcblx0XHQgKiBAcmV0dXJuIHtQcm9taXNlfSBuZXcgcHJvbWlzZVxuXHRcdCAqL1xuXHRcdFByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgb25Qcm9ncmVzcykge1xuXHRcdFx0dmFyIHBhcmVudCA9IHRoaXMuX2hhbmRsZXI7XG5cdFx0XHR2YXIgc3RhdGUgPSBwYXJlbnQuam9pbigpLnN0YXRlKCk7XG5cblx0XHRcdGlmICgodHlwZW9mIG9uRnVsZmlsbGVkICE9PSAnZnVuY3Rpb24nICYmIHN0YXRlID4gMCkgfHxcblx0XHRcdFx0KHR5cGVvZiBvblJlamVjdGVkICE9PSAnZnVuY3Rpb24nICYmIHN0YXRlIDwgMCkpIHtcblx0XHRcdFx0Ly8gU2hvcnQgY2lyY3VpdDogdmFsdWUgd2lsbCBub3QgY2hhbmdlLCBzaW1wbHkgc2hhcmUgaGFuZGxlclxuXHRcdFx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoSGFuZGxlciwgcGFyZW50KTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHAgPSB0aGlzLl9iZWdldCgpO1xuXHRcdFx0dmFyIGNoaWxkID0gcC5faGFuZGxlcjtcblxuXHRcdFx0cGFyZW50LmNoYWluKGNoaWxkLCBwYXJlbnQucmVjZWl2ZXIsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBvblByb2dyZXNzKTtcblxuXHRcdFx0cmV0dXJuIHA7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIElmIHRoaXMgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkIGR1ZSB0byBhbiBlcnJvciwgY2FsbCBvblJlamVjdGVkIHRvXG5cdFx0ICogaGFuZGxlIHRoZSBlcnJvci4gU2hvcnRjdXQgZm9yIC50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZClcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9uP30gb25SZWplY3RlZFxuXHRcdCAqIEByZXR1cm4ge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0UHJvbWlzZS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbihvblJlamVjdGVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy50aGVuKHZvaWQgMCwgb25SZWplY3RlZCk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENyZWF0ZXMgYSBuZXcsIHBlbmRpbmcgcHJvbWlzZSBvZiB0aGUgc2FtZSB0eXBlIGFzIHRoaXMgcHJvbWlzZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0UHJvbWlzZS5wcm90b3R5cGUuX2JlZ2V0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmVnZXRGcm9tKHRoaXMuX2hhbmRsZXIsIHRoaXMuY29uc3RydWN0b3IpO1xuXHRcdH07XG5cblx0XHRmdW5jdGlvbiBiZWdldEZyb20ocGFyZW50LCBQcm9taXNlKSB7XG5cdFx0XHR2YXIgY2hpbGQgPSBuZXcgUGVuZGluZyhwYXJlbnQucmVjZWl2ZXIsIHBhcmVudC5qb2luKCkuY29udGV4dCk7XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoSGFuZGxlciwgY2hpbGQpO1xuXHRcdH1cblxuXHRcdC8vIEFycmF5IGNvbWJpbmF0b3JzXG5cblx0XHRQcm9taXNlLmFsbCA9IGFsbDtcblx0XHRQcm9taXNlLnJhY2UgPSByYWNlO1xuXHRcdFByb21pc2UuX3RyYXZlcnNlID0gdHJhdmVyc2U7XG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm4gYSBwcm9taXNlIHRoYXQgd2lsbCBmdWxmaWxsIHdoZW4gYWxsIHByb21pc2VzIGluIHRoZVxuXHRcdCAqIGlucHV0IGFycmF5IGhhdmUgZnVsZmlsbGVkLCBvciB3aWxsIHJlamVjdCB3aGVuIG9uZSBvZiB0aGVcblx0XHQgKiBwcm9taXNlcyByZWplY3RzLlxuXHRcdCAqIEBwYXJhbSB7YXJyYXl9IHByb21pc2VzIGFycmF5IG9mIHByb21pc2VzXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgZm9yIGFycmF5IG9mIGZ1bGZpbGxtZW50IHZhbHVlc1xuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuXHRcdFx0cmV0dXJuIHRyYXZlcnNlV2l0aChzbmQsIG51bGwsIHByb21pc2VzKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBBcnJheTxQcm9taXNlPFg+PiAtPiBQcm9taXNlPEFycmF5PGYoWCk+PlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gZiBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIHByb21pc2UncyB2YWx1ZVxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9IHByb21pc2VzIGFycmF5IG9mIHByb21pc2VzXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgZm9yIHRyYW5zZm9ybWVkIHZhbHVlc1xuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHRyYXZlcnNlKGYsIHByb21pc2VzKSB7XG5cdFx0XHRyZXR1cm4gdHJhdmVyc2VXaXRoKHRyeUNhdGNoMiwgZiwgcHJvbWlzZXMpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyYXZlcnNlV2l0aCh0cnlNYXAsIGYsIHByb21pc2VzKSB7XG5cdFx0XHR2YXIgaGFuZGxlciA9IHR5cGVvZiBmID09PSAnZnVuY3Rpb24nID8gbWFwQXQgOiBzZXR0bGVBdDtcblxuXHRcdFx0dmFyIHJlc29sdmVyID0gbmV3IFBlbmRpbmcoKTtcblx0XHRcdHZhciBwZW5kaW5nID0gcHJvbWlzZXMubGVuZ3RoID4+PiAwO1xuXHRcdFx0dmFyIHJlc3VsdHMgPSBuZXcgQXJyYXkocGVuZGluZyk7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwLCB4OyBpIDwgcHJvbWlzZXMubGVuZ3RoICYmICFyZXNvbHZlci5yZXNvbHZlZDsgKytpKSB7XG5cdFx0XHRcdHggPSBwcm9taXNlc1tpXTtcblxuXHRcdFx0XHRpZiAoeCA9PT0gdm9pZCAwICYmICEoaSBpbiBwcm9taXNlcykpIHtcblx0XHRcdFx0XHQtLXBlbmRpbmc7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cmF2ZXJzZUF0KHByb21pc2VzLCBoYW5kbGVyLCBpLCB4LCByZXNvbHZlcik7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHBlbmRpbmcgPT09IDApIHtcblx0XHRcdFx0cmVzb2x2ZXIuYmVjb21lKG5ldyBGdWxmaWxsZWQocmVzdWx0cykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoSGFuZGxlciwgcmVzb2x2ZXIpO1xuXG5cdFx0XHRmdW5jdGlvbiBtYXBBdChpLCB4LCByZXNvbHZlcikge1xuXHRcdFx0XHRpZighcmVzb2x2ZXIucmVzb2x2ZWQpIHtcblx0XHRcdFx0XHR0cmF2ZXJzZUF0KHByb21pc2VzLCBzZXR0bGVBdCwgaSwgdHJ5TWFwKGYsIHgsIGkpLCByZXNvbHZlcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gc2V0dGxlQXQoaSwgeCwgcmVzb2x2ZXIpIHtcblx0XHRcdFx0cmVzdWx0c1tpXSA9IHg7XG5cdFx0XHRcdGlmKC0tcGVuZGluZyA9PT0gMCkge1xuXHRcdFx0XHRcdHJlc29sdmVyLmJlY29tZShuZXcgRnVsZmlsbGVkKHJlc3VsdHMpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyYXZlcnNlQXQocHJvbWlzZXMsIGhhbmRsZXIsIGksIHgsIHJlc29sdmVyKSB7XG5cdFx0XHRpZiAobWF5YmVUaGVuYWJsZSh4KSkge1xuXHRcdFx0XHR2YXIgaCA9IGdldEhhbmRsZXJNYXliZVRoZW5hYmxlKHgpO1xuXHRcdFx0XHR2YXIgcyA9IGguc3RhdGUoKTtcblxuXHRcdFx0XHRpZiAocyA9PT0gMCkge1xuXHRcdFx0XHRcdGguZm9sZChoYW5kbGVyLCBpLCB2b2lkIDAsIHJlc29sdmVyKTtcblx0XHRcdFx0fSBlbHNlIGlmIChzID4gMCkge1xuXHRcdFx0XHRcdGhhbmRsZXIoaSwgaC52YWx1ZSwgcmVzb2x2ZXIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmVyLmJlY29tZShoKTtcblx0XHRcdFx0XHR2aXNpdFJlbWFpbmluZyhwcm9taXNlcywgaSsxLCBoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFuZGxlcihpLCB4LCByZXNvbHZlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0UHJvbWlzZS5fdmlzaXRSZW1haW5pbmcgPSB2aXNpdFJlbWFpbmluZztcblx0XHRmdW5jdGlvbiB2aXNpdFJlbWFpbmluZyhwcm9taXNlcywgc3RhcnQsIGhhbmRsZXIpIHtcblx0XHRcdGZvcih2YXIgaT1zdGFydDsgaTxwcm9taXNlcy5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRtYXJrQXNIYW5kbGVkKGdldEhhbmRsZXIocHJvbWlzZXNbaV0pLCBoYW5kbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBtYXJrQXNIYW5kbGVkKGgsIGhhbmRsZXIpIHtcblx0XHRcdGlmKGggPT09IGhhbmRsZXIpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcyA9IGguc3RhdGUoKTtcblx0XHRcdGlmKHMgPT09IDApIHtcblx0XHRcdFx0aC52aXNpdChoLCB2b2lkIDAsIGguX3VucmVwb3J0KTtcblx0XHRcdH0gZWxzZSBpZihzIDwgMCkge1xuXHRcdFx0XHRoLl91bnJlcG9ydCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEZ1bGZpbGwtcmVqZWN0IGNvbXBldGl0aXZlIHJhY2UuIFJldHVybiBhIHByb21pc2UgdGhhdCB3aWxsIHNldHRsZVxuXHRcdCAqIHRvIHRoZSBzYW1lIHN0YXRlIGFzIHRoZSBlYXJsaWVzdCBpbnB1dCBwcm9taXNlIHRvIHNldHRsZS5cblx0XHQgKlxuXHRcdCAqIFdBUk5JTkc6IFRoZSBFUzYgUHJvbWlzZSBzcGVjIHJlcXVpcmVzIHRoYXQgcmFjZSgpaW5nIGFuIGVtcHR5IGFycmF5XG5cdFx0ICogbXVzdCByZXR1cm4gYSBwcm9taXNlIHRoYXQgaXMgcGVuZGluZyBmb3JldmVyLiAgVGhpcyBpbXBsZW1lbnRhdGlvblxuXHRcdCAqIHJldHVybnMgYSBzaW5nbGV0b24gZm9yZXZlci1wZW5kaW5nIHByb21pc2UsIHRoZSBzYW1lIHNpbmdsZXRvbiB0aGF0IGlzXG5cdFx0ICogcmV0dXJuZWQgYnkgUHJvbWlzZS5uZXZlcigpLCB0aHVzIGNhbiBiZSBjaGVja2VkIHdpdGggPT09XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge2FycmF5fSBwcm9taXNlcyBhcnJheSBvZiBwcm9taXNlcyB0byByYWNlXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9IGlmIGlucHV0IGlzIG5vbi1lbXB0eSwgYSBwcm9taXNlIHRoYXQgd2lsbCBzZXR0bGVcblx0XHQgKiB0byB0aGUgc2FtZSBvdXRjb21lIGFzIHRoZSBlYXJsaWVzdCBpbnB1dCBwcm9taXNlIHRvIHNldHRsZS4gaWYgZW1wdHlcblx0XHQgKiBpcyBlbXB0eSwgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIG5ldmVyIHNldHRsZS5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByYWNlKHByb21pc2VzKSB7XG5cdFx0XHRpZih0eXBlb2YgcHJvbWlzZXMgIT09ICdvYmplY3QnIHx8IHByb21pc2VzID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybiByZWplY3QobmV3IFR5cGVFcnJvcignbm9uLWl0ZXJhYmxlIHBhc3NlZCB0byByYWNlKCknKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNpZ2gsIHJhY2UoW10pIGlzIHVudGVzdGFibGUgdW5sZXNzIHdlIHJldHVybiAqc29tZXRoaW5nKlxuXHRcdFx0Ly8gdGhhdCBpcyByZWNvZ25pemFibGUgd2l0aG91dCBjYWxsaW5nIC50aGVuKCkgb24gaXQuXG5cdFx0XHRyZXR1cm4gcHJvbWlzZXMubGVuZ3RoID09PSAwID8gbmV2ZXIoKVxuXHRcdFx0XHQgOiBwcm9taXNlcy5sZW5ndGggPT09IDEgPyByZXNvbHZlKHByb21pc2VzWzBdKVxuXHRcdFx0XHQgOiBydW5SYWNlKHByb21pc2VzKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBydW5SYWNlKHByb21pc2VzKSB7XG5cdFx0XHR2YXIgcmVzb2x2ZXIgPSBuZXcgUGVuZGluZygpO1xuXHRcdFx0dmFyIGksIHgsIGg7XG5cdFx0XHRmb3IoaT0wOyBpPHByb21pc2VzLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdHggPSBwcm9taXNlc1tpXTtcblx0XHRcdFx0aWYgKHggPT09IHZvaWQgMCAmJiAhKGkgaW4gcHJvbWlzZXMpKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRoID0gZ2V0SGFuZGxlcih4KTtcblx0XHRcdFx0aWYoaC5zdGF0ZSgpICE9PSAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZXIuYmVjb21lKGgpO1xuXHRcdFx0XHRcdHZpc2l0UmVtYWluaW5nKHByb21pc2VzLCBpKzEsIGgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGgudmlzaXQocmVzb2x2ZXIsIHJlc29sdmVyLnJlc29sdmUsIHJlc29sdmVyLnJlamVjdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShIYW5kbGVyLCByZXNvbHZlcik7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvbWlzZSBpbnRlcm5hbHNcblx0XHQvLyBCZWxvdyB0aGlzLCBldmVyeXRoaW5nIGlzIEBwcml2YXRlXG5cblx0XHQvKipcblx0XHQgKiBHZXQgYW4gYXBwcm9wcmlhdGUgaGFuZGxlciBmb3IgeCwgd2l0aG91dCBjaGVja2luZyBmb3IgY3ljbGVzXG5cdFx0ICogQHBhcmFtIHsqfSB4XG5cdFx0ICogQHJldHVybnMge29iamVjdH0gaGFuZGxlclxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGdldEhhbmRsZXIoeCkge1xuXHRcdFx0aWYoaXNQcm9taXNlKHgpKSB7XG5cdFx0XHRcdHJldHVybiB4Ll9oYW5kbGVyLmpvaW4oKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXliZVRoZW5hYmxlKHgpID8gZ2V0SGFuZGxlclVudHJ1c3RlZCh4KSA6IG5ldyBGdWxmaWxsZWQoeCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogR2V0IGEgaGFuZGxlciBmb3IgdGhlbmFibGUgeC5cblx0XHQgKiBOT1RFOiBZb3UgbXVzdCBvbmx5IGNhbGwgdGhpcyBpZiBtYXliZVRoZW5hYmxlKHgpID09IHRydWVcblx0XHQgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbnxQcm9taXNlfSB4XG5cdFx0ICogQHJldHVybnMge29iamVjdH0gaGFuZGxlclxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGdldEhhbmRsZXJNYXliZVRoZW5hYmxlKHgpIHtcblx0XHRcdHJldHVybiBpc1Byb21pc2UoeCkgPyB4Ll9oYW5kbGVyLmpvaW4oKSA6IGdldEhhbmRsZXJVbnRydXN0ZWQoeCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogR2V0IGEgaGFuZGxlciBmb3IgcG90ZW50aWFsbHkgdW50cnVzdGVkIHRoZW5hYmxlIHhcblx0XHQgKiBAcGFyYW0geyp9IHhcblx0XHQgKiBAcmV0dXJucyB7b2JqZWN0fSBoYW5kbGVyXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZ2V0SGFuZGxlclVudHJ1c3RlZCh4KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgdW50cnVzdGVkVGhlbiA9IHgudGhlbjtcblx0XHRcdFx0cmV0dXJuIHR5cGVvZiB1bnRydXN0ZWRUaGVuID09PSAnZnVuY3Rpb24nXG5cdFx0XHRcdFx0PyBuZXcgVGhlbmFibGUodW50cnVzdGVkVGhlbiwgeClcblx0XHRcdFx0XHQ6IG5ldyBGdWxmaWxsZWQoeCk7XG5cdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBSZWplY3RlZChlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBIYW5kbGVyIGZvciBhIHByb21pc2UgdGhhdCBpcyBwZW5kaW5nIGZvcmV2ZXJcblx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBIYW5kbGVyKCkge31cblxuXHRcdEhhbmRsZXIucHJvdG90eXBlLndoZW5cblx0XHRcdD0gSGFuZGxlci5wcm90b3R5cGUuYmVjb21lXG5cdFx0XHQ9IEhhbmRsZXIucHJvdG90eXBlLm5vdGlmeSAvLyBkZXByZWNhdGVkXG5cdFx0XHQ9IEhhbmRsZXIucHJvdG90eXBlLmZhaWxcblx0XHRcdD0gSGFuZGxlci5wcm90b3R5cGUuX3VucmVwb3J0XG5cdFx0XHQ9IEhhbmRsZXIucHJvdG90eXBlLl9yZXBvcnRcblx0XHRcdD0gbm9vcDtcblxuXHRcdEhhbmRsZXIucHJvdG90eXBlLl9zdGF0ZSA9IDA7XG5cblx0XHRIYW5kbGVyLnByb3RvdHlwZS5zdGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3N0YXRlO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZWN1cnNpdmVseSBjb2xsYXBzZSBoYW5kbGVyIGNoYWluIHRvIGZpbmQgdGhlIGhhbmRsZXJcblx0XHQgKiBuZWFyZXN0IHRvIHRoZSBmdWxseSByZXNvbHZlZCB2YWx1ZS5cblx0XHQgKiBAcmV0dXJucyB7b2JqZWN0fSBoYW5kbGVyIG5lYXJlc3QgdGhlIGZ1bGx5IHJlc29sdmVkIHZhbHVlXG5cdFx0ICovXG5cdFx0SGFuZGxlci5wcm90b3R5cGUuam9pbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGggPSB0aGlzO1xuXHRcdFx0d2hpbGUoaC5oYW5kbGVyICE9PSB2b2lkIDApIHtcblx0XHRcdFx0aCA9IGguaGFuZGxlcjtcblx0XHRcdH1cblx0XHRcdHJldHVybiBoO1xuXHRcdH07XG5cblx0XHRIYW5kbGVyLnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uKHRvLCByZWNlaXZlciwgZnVsZmlsbGVkLCByZWplY3RlZCwgcHJvZ3Jlc3MpIHtcblx0XHRcdHRoaXMud2hlbih7XG5cdFx0XHRcdHJlc29sdmVyOiB0byxcblx0XHRcdFx0cmVjZWl2ZXI6IHJlY2VpdmVyLFxuXHRcdFx0XHRmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcblx0XHRcdFx0cmVqZWN0ZWQ6IHJlamVjdGVkLFxuXHRcdFx0XHRwcm9ncmVzczogcHJvZ3Jlc3Ncblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRIYW5kbGVyLnByb3RvdHlwZS52aXNpdCA9IGZ1bmN0aW9uKHJlY2VpdmVyLCBmdWxmaWxsZWQsIHJlamVjdGVkLCBwcm9ncmVzcykge1xuXHRcdFx0dGhpcy5jaGFpbihmYWlsSWZSZWplY3RlZCwgcmVjZWl2ZXIsIGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIHByb2dyZXNzKTtcblx0XHR9O1xuXG5cdFx0SGFuZGxlci5wcm90b3R5cGUuZm9sZCA9IGZ1bmN0aW9uKGYsIHosIGMsIHRvKSB7XG5cdFx0XHR0aGlzLndoZW4obmV3IEZvbGQoZiwgeiwgYywgdG8pKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGFuZGxlciB0aGF0IGludm9rZXMgZmFpbCgpIG9uIGFueSBoYW5kbGVyIGl0IGJlY29tZXNcblx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBGYWlsSWZSZWplY3RlZCgpIHt9XG5cblx0XHRpbmhlcml0KEhhbmRsZXIsIEZhaWxJZlJlamVjdGVkKTtcblxuXHRcdEZhaWxJZlJlamVjdGVkLnByb3RvdHlwZS5iZWNvbWUgPSBmdW5jdGlvbihoKSB7XG5cdFx0XHRoLmZhaWwoKTtcblx0XHR9O1xuXG5cdFx0dmFyIGZhaWxJZlJlamVjdGVkID0gbmV3IEZhaWxJZlJlamVjdGVkKCk7XG5cblx0XHQvKipcblx0XHQgKiBIYW5kbGVyIHRoYXQgbWFuYWdlcyBhIHF1ZXVlIG9mIGNvbnN1bWVycyB3YWl0aW5nIG9uIGEgcGVuZGluZyBwcm9taXNlXG5cdFx0ICogQGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gUGVuZGluZyhyZWNlaXZlciwgaW5oZXJpdGVkQ29udGV4dCkge1xuXHRcdFx0UHJvbWlzZS5jcmVhdGVDb250ZXh0KHRoaXMsIGluaGVyaXRlZENvbnRleHQpO1xuXG5cdFx0XHR0aGlzLmNvbnN1bWVycyA9IHZvaWQgMDtcblx0XHRcdHRoaXMucmVjZWl2ZXIgPSByZWNlaXZlcjtcblx0XHRcdHRoaXMuaGFuZGxlciA9IHZvaWQgMDtcblx0XHRcdHRoaXMucmVzb2x2ZWQgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRpbmhlcml0KEhhbmRsZXIsIFBlbmRpbmcpO1xuXG5cdFx0UGVuZGluZy5wcm90b3R5cGUuX3N0YXRlID0gMDtcblxuXHRcdFBlbmRpbmcucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbih4KSB7XG5cdFx0XHR0aGlzLmJlY29tZShnZXRIYW5kbGVyKHgpKTtcblx0XHR9O1xuXG5cdFx0UGVuZGluZy5wcm90b3R5cGUucmVqZWN0ID0gZnVuY3Rpb24oeCkge1xuXHRcdFx0aWYodGhpcy5yZXNvbHZlZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuYmVjb21lKG5ldyBSZWplY3RlZCh4KSk7XG5cdFx0fTtcblxuXHRcdFBlbmRpbmcucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5yZXNvbHZlZCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdFx0dmFyIGggPSB0aGlzO1xuXG5cdFx0XHR3aGlsZSAoaC5oYW5kbGVyICE9PSB2b2lkIDApIHtcblx0XHRcdFx0aCA9IGguaGFuZGxlcjtcblx0XHRcdFx0aWYgKGggPT09IHRoaXMpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVyID0gY3ljbGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaDtcblx0XHR9O1xuXG5cdFx0UGVuZGluZy5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcSA9IHRoaXMuY29uc3VtZXJzO1xuXHRcdFx0dmFyIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdFx0XHR0aGlzLmhhbmRsZXIgPSB0aGlzLmhhbmRsZXIuam9pbigpO1xuXHRcdFx0dGhpcy5jb25zdW1lcnMgPSB2b2lkIDA7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRoYW5kbGVyLndoZW4ocVtpXSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdFBlbmRpbmcucHJvdG90eXBlLmJlY29tZSA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcblx0XHRcdGlmKHRoaXMucmVzb2x2ZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnJlc29sdmVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG5cdFx0XHRpZih0aGlzLmNvbnN1bWVycyAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdHRhc2tzLmVucXVldWUodGhpcyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuY29udGV4dCAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdGhhbmRsZXIuX3JlcG9ydCh0aGlzLmNvbnRleHQpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRQZW5kaW5nLnByb3RvdHlwZS53aGVuID0gZnVuY3Rpb24oY29udGludWF0aW9uKSB7XG5cdFx0XHRpZih0aGlzLnJlc29sdmVkKSB7XG5cdFx0XHRcdHRhc2tzLmVucXVldWUobmV3IENvbnRpbnVhdGlvblRhc2soY29udGludWF0aW9uLCB0aGlzLmhhbmRsZXIpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRoaXMuY29uc3VtZXJzID09PSB2b2lkIDApIHtcblx0XHRcdFx0XHR0aGlzLmNvbnN1bWVycyA9IFtjb250aW51YXRpb25dO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuY29uc3VtZXJzLnB1c2goY29udGludWF0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBAZGVwcmVjYXRlZFxuXHRcdCAqL1xuXHRcdFBlbmRpbmcucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uKHgpIHtcblx0XHRcdGlmKCF0aGlzLnJlc29sdmVkKSB7XG5cdFx0XHRcdHRhc2tzLmVucXVldWUobmV3IFByb2dyZXNzVGFzayh4LCB0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdFBlbmRpbmcucHJvdG90eXBlLmZhaWwgPSBmdW5jdGlvbihjb250ZXh0KSB7XG5cdFx0XHR2YXIgYyA9IHR5cGVvZiBjb250ZXh0ID09PSAndW5kZWZpbmVkJyA/IHRoaXMuY29udGV4dCA6IGNvbnRleHQ7XG5cdFx0XHR0aGlzLnJlc29sdmVkICYmIHRoaXMuaGFuZGxlci5qb2luKCkuZmFpbChjKTtcblx0XHR9O1xuXG5cdFx0UGVuZGluZy5wcm90b3R5cGUuX3JlcG9ydCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcblx0XHRcdHRoaXMucmVzb2x2ZWQgJiYgdGhpcy5oYW5kbGVyLmpvaW4oKS5fcmVwb3J0KGNvbnRleHQpO1xuXHRcdH07XG5cblx0XHRQZW5kaW5nLnByb3RvdHlwZS5fdW5yZXBvcnQgPSBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMucmVzb2x2ZWQgJiYgdGhpcy5oYW5kbGVyLmpvaW4oKS5fdW5yZXBvcnQoKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogV3JhcCBhbm90aGVyIGhhbmRsZXIgYW5kIGZvcmNlIGl0IGludG8gYSBmdXR1cmUgc3RhY2tcblx0XHQgKiBAcGFyYW0ge29iamVjdH0gaGFuZGxlclxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIEFzeW5jKGhhbmRsZXIpIHtcblx0XHRcdHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG5cdFx0fVxuXG5cdFx0aW5oZXJpdChIYW5kbGVyLCBBc3luYyk7XG5cblx0XHRBc3luYy5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uKGNvbnRpbnVhdGlvbikge1xuXHRcdFx0dGFza3MuZW5xdWV1ZShuZXcgQ29udGludWF0aW9uVGFzayhjb250aW51YXRpb24sIHRoaXMpKTtcblx0XHR9O1xuXG5cdFx0QXN5bmMucHJvdG90eXBlLl9yZXBvcnQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG5cdFx0XHR0aGlzLmpvaW4oKS5fcmVwb3J0KGNvbnRleHQpO1xuXHRcdH07XG5cblx0XHRBc3luYy5wcm90b3R5cGUuX3VucmVwb3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmpvaW4oKS5fdW5yZXBvcnQoKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGFuZGxlciB0aGF0IHdyYXBzIGFuIHVudHJ1c3RlZCB0aGVuYWJsZSBhbmQgYXNzaW1pbGF0ZXMgaXQgaW4gYSBmdXR1cmUgc3RhY2tcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0aGVuXG5cdFx0ICogQHBhcmFtIHt7dGhlbjogZnVuY3Rpb259fSB0aGVuYWJsZVxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIFRoZW5hYmxlKHRoZW4sIHRoZW5hYmxlKSB7XG5cdFx0XHRQZW5kaW5nLmNhbGwodGhpcyk7XG5cdFx0XHR0YXNrcy5lbnF1ZXVlKG5ldyBBc3NpbWlsYXRlVGFzayh0aGVuLCB0aGVuYWJsZSwgdGhpcykpO1xuXHRcdH1cblxuXHRcdGluaGVyaXQoUGVuZGluZywgVGhlbmFibGUpO1xuXG5cdFx0LyoqXG5cdFx0ICogSGFuZGxlciBmb3IgYSBmdWxmaWxsZWQgcHJvbWlzZVxuXHRcdCAqIEBwYXJhbSB7Kn0geCBmdWxmaWxsbWVudCB2YWx1ZVxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIEZ1bGZpbGxlZCh4KSB7XG5cdFx0XHRQcm9taXNlLmNyZWF0ZUNvbnRleHQodGhpcyk7XG5cdFx0XHR0aGlzLnZhbHVlID0geDtcblx0XHR9XG5cblx0XHRpbmhlcml0KEhhbmRsZXIsIEZ1bGZpbGxlZCk7XG5cblx0XHRGdWxmaWxsZWQucHJvdG90eXBlLl9zdGF0ZSA9IDE7XG5cblx0XHRGdWxmaWxsZWQucHJvdG90eXBlLmZvbGQgPSBmdW5jdGlvbihmLCB6LCBjLCB0bykge1xuXHRcdFx0cnVuQ29udGludWF0aW9uMyhmLCB6LCB0aGlzLCBjLCB0byk7XG5cdFx0fTtcblxuXHRcdEZ1bGZpbGxlZC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uKGNvbnQpIHtcblx0XHRcdHJ1bkNvbnRpbnVhdGlvbjEoY29udC5mdWxmaWxsZWQsIHRoaXMsIGNvbnQucmVjZWl2ZXIsIGNvbnQucmVzb2x2ZXIpO1xuXHRcdH07XG5cblx0XHR2YXIgZXJyb3JJZCA9IDA7XG5cblx0XHQvKipcblx0XHQgKiBIYW5kbGVyIGZvciBhIHJlamVjdGVkIHByb21pc2Vcblx0XHQgKiBAcGFyYW0geyp9IHggcmVqZWN0aW9uIHJlYXNvblxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIFJlamVjdGVkKHgpIHtcblx0XHRcdFByb21pc2UuY3JlYXRlQ29udGV4dCh0aGlzKTtcblxuXHRcdFx0dGhpcy5pZCA9ICsrZXJyb3JJZDtcblx0XHRcdHRoaXMudmFsdWUgPSB4O1xuXHRcdFx0dGhpcy5oYW5kbGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLnJlcG9ydGVkID0gZmFsc2U7XG5cblx0XHRcdHRoaXMuX3JlcG9ydCgpO1xuXHRcdH1cblxuXHRcdGluaGVyaXQoSGFuZGxlciwgUmVqZWN0ZWQpO1xuXG5cdFx0UmVqZWN0ZWQucHJvdG90eXBlLl9zdGF0ZSA9IC0xO1xuXG5cdFx0UmVqZWN0ZWQucHJvdG90eXBlLmZvbGQgPSBmdW5jdGlvbihmLCB6LCBjLCB0bykge1xuXHRcdFx0dG8uYmVjb21lKHRoaXMpO1xuXHRcdH07XG5cblx0XHRSZWplY3RlZC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uKGNvbnQpIHtcblx0XHRcdGlmKHR5cGVvZiBjb250LnJlamVjdGVkID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHRoaXMuX3VucmVwb3J0KCk7XG5cdFx0XHR9XG5cdFx0XHRydW5Db250aW51YXRpb24xKGNvbnQucmVqZWN0ZWQsIHRoaXMsIGNvbnQucmVjZWl2ZXIsIGNvbnQucmVzb2x2ZXIpO1xuXHRcdH07XG5cblx0XHRSZWplY3RlZC5wcm90b3R5cGUuX3JlcG9ydCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcblx0XHRcdHRhc2tzLmFmdGVyUXVldWUobmV3IFJlcG9ydFRhc2sodGhpcywgY29udGV4dCkpO1xuXHRcdH07XG5cblx0XHRSZWplY3RlZC5wcm90b3R5cGUuX3VucmVwb3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih0aGlzLmhhbmRsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5oYW5kbGVkID0gdHJ1ZTtcblx0XHRcdHRhc2tzLmFmdGVyUXVldWUobmV3IFVucmVwb3J0VGFzayh0aGlzKSk7XG5cdFx0fTtcblxuXHRcdFJlamVjdGVkLnByb3RvdHlwZS5mYWlsID0gZnVuY3Rpb24oY29udGV4dCkge1xuXHRcdFx0dGhpcy5yZXBvcnRlZCA9IHRydWU7XG5cdFx0XHRlbWl0UmVqZWN0aW9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCB0aGlzKTtcblx0XHRcdFByb21pc2Uub25GYXRhbFJlamVjdGlvbih0aGlzLCBjb250ZXh0ID09PSB2b2lkIDAgPyB0aGlzLmNvbnRleHQgOiBjb250ZXh0KTtcblx0XHR9O1xuXG5cdFx0ZnVuY3Rpb24gUmVwb3J0VGFzayhyZWplY3Rpb24sIGNvbnRleHQpIHtcblx0XHRcdHRoaXMucmVqZWN0aW9uID0gcmVqZWN0aW9uO1xuXHRcdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcblx0XHR9XG5cblx0XHRSZXBvcnRUYXNrLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmKCF0aGlzLnJlamVjdGlvbi5oYW5kbGVkICYmICF0aGlzLnJlamVjdGlvbi5yZXBvcnRlZCkge1xuXHRcdFx0XHR0aGlzLnJlamVjdGlvbi5yZXBvcnRlZCA9IHRydWU7XG5cdFx0XHRcdGVtaXRSZWplY3Rpb24oJ3VuaGFuZGxlZFJlamVjdGlvbicsIHRoaXMucmVqZWN0aW9uKSB8fFxuXHRcdFx0XHRcdFByb21pc2Uub25Qb3RlbnRpYWxseVVuaGFuZGxlZFJlamVjdGlvbih0aGlzLnJlamVjdGlvbiwgdGhpcy5jb250ZXh0KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0ZnVuY3Rpb24gVW5yZXBvcnRUYXNrKHJlamVjdGlvbikge1xuXHRcdFx0dGhpcy5yZWplY3Rpb24gPSByZWplY3Rpb247XG5cdFx0fVxuXG5cdFx0VW5yZXBvcnRUYXNrLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmKHRoaXMucmVqZWN0aW9uLnJlcG9ydGVkKSB7XG5cdFx0XHRcdGVtaXRSZWplY3Rpb24oJ3JlamVjdGlvbkhhbmRsZWQnLCB0aGlzLnJlamVjdGlvbikgfHxcblx0XHRcdFx0XHRQcm9taXNlLm9uUG90ZW50aWFsbHlVbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVkKHRoaXMucmVqZWN0aW9uKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gVW5oYW5kbGVkIHJlamVjdGlvbiBob29rc1xuXHRcdC8vIEJ5IGRlZmF1bHQsIGV2ZXJ5dGhpbmcgaXMgYSBub29wXG5cblx0XHRQcm9taXNlLmNyZWF0ZUNvbnRleHRcblx0XHRcdD0gUHJvbWlzZS5lbnRlckNvbnRleHRcblx0XHRcdD0gUHJvbWlzZS5leGl0Q29udGV4dFxuXHRcdFx0PSBQcm9taXNlLm9uUG90ZW50aWFsbHlVbmhhbmRsZWRSZWplY3Rpb25cblx0XHRcdD0gUHJvbWlzZS5vblBvdGVudGlhbGx5VW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlZFxuXHRcdFx0PSBQcm9taXNlLm9uRmF0YWxSZWplY3Rpb25cblx0XHRcdD0gbm9vcDtcblxuXHRcdC8vIEVycm9ycyBhbmQgc2luZ2xldG9uc1xuXG5cdFx0dmFyIGZvcmV2ZXJQZW5kaW5nSGFuZGxlciA9IG5ldyBIYW5kbGVyKCk7XG5cdFx0dmFyIGZvcmV2ZXJQZW5kaW5nUHJvbWlzZSA9IG5ldyBQcm9taXNlKEhhbmRsZXIsIGZvcmV2ZXJQZW5kaW5nSGFuZGxlcik7XG5cblx0XHRmdW5jdGlvbiBjeWNsZSgpIHtcblx0XHRcdHJldHVybiBuZXcgUmVqZWN0ZWQobmV3IFR5cGVFcnJvcignUHJvbWlzZSBjeWNsZScpKTtcblx0XHR9XG5cblx0XHQvLyBUYXNrIHJ1bm5lcnNcblxuXHRcdC8qKlxuXHRcdCAqIFJ1biBhIHNpbmdsZSBjb25zdW1lclxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIENvbnRpbnVhdGlvblRhc2soY29udGludWF0aW9uLCBoYW5kbGVyKSB7XG5cdFx0XHR0aGlzLmNvbnRpbnVhdGlvbiA9IGNvbnRpbnVhdGlvbjtcblx0XHRcdHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG5cdFx0fVxuXG5cdFx0Q29udGludWF0aW9uVGFzay5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmhhbmRsZXIuam9pbigpLndoZW4odGhpcy5jb250aW51YXRpb24pO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSdW4gYSBxdWV1ZSBvZiBwcm9ncmVzcyBoYW5kbGVyc1xuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIFByb2dyZXNzVGFzayh2YWx1ZSwgaGFuZGxlcikge1xuXHRcdFx0dGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRQcm9ncmVzc1Rhc2sucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHEgPSB0aGlzLmhhbmRsZXIuY29uc3VtZXJzO1xuXHRcdFx0aWYocSA9PT0gdm9pZCAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgYywgaSA9IDA7IGkgPCBxLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGMgPSBxW2ldO1xuXHRcdFx0XHRydW5Ob3RpZnkoYy5wcm9ncmVzcywgdGhpcy52YWx1ZSwgdGhpcy5oYW5kbGVyLCBjLnJlY2VpdmVyLCBjLnJlc29sdmVyKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQXNzaW1pbGF0ZSBhIHRoZW5hYmxlLCBzZW5kaW5nIGl0J3MgdmFsdWUgdG8gcmVzb2x2ZXJcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0aGVuXG5cdFx0ICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRoZW5hYmxlXG5cdFx0ICogQHBhcmFtIHtvYmplY3R9IHJlc29sdmVyXG5cdFx0ICogQGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gQXNzaW1pbGF0ZVRhc2sodGhlbiwgdGhlbmFibGUsIHJlc29sdmVyKSB7XG5cdFx0XHR0aGlzLl90aGVuID0gdGhlbjtcblx0XHRcdHRoaXMudGhlbmFibGUgPSB0aGVuYWJsZTtcblx0XHRcdHRoaXMucmVzb2x2ZXIgPSByZXNvbHZlcjtcblx0XHR9XG5cblx0XHRBc3NpbWlsYXRlVGFzay5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaCA9IHRoaXMucmVzb2x2ZXI7XG5cdFx0XHR0cnlBc3NpbWlsYXRlKHRoaXMuX3RoZW4sIHRoaXMudGhlbmFibGUsIF9yZXNvbHZlLCBfcmVqZWN0LCBfbm90aWZ5KTtcblxuXHRcdFx0ZnVuY3Rpb24gX3Jlc29sdmUoeCkgeyBoLnJlc29sdmUoeCk7IH1cblx0XHRcdGZ1bmN0aW9uIF9yZWplY3QoeCkgIHsgaC5yZWplY3QoeCk7IH1cblx0XHRcdGZ1bmN0aW9uIF9ub3RpZnkoeCkgIHsgaC5ub3RpZnkoeCk7IH1cblx0XHR9O1xuXG5cdFx0ZnVuY3Rpb24gdHJ5QXNzaW1pbGF0ZSh0aGVuLCB0aGVuYWJsZSwgcmVzb2x2ZSwgcmVqZWN0LCBub3RpZnkpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoZW4uY2FsbCh0aGVuYWJsZSwgcmVzb2x2ZSwgcmVqZWN0LCBub3RpZnkpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogRm9sZCBhIGhhbmRsZXIgdmFsdWUgd2l0aCB6XG5cdFx0ICogQGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gRm9sZChmLCB6LCBjLCB0bykge1xuXHRcdFx0dGhpcy5mID0gZjsgdGhpcy56ID0gejsgdGhpcy5jID0gYzsgdGhpcy50byA9IHRvO1xuXHRcdFx0dGhpcy5yZXNvbHZlciA9IGZhaWxJZlJlamVjdGVkO1xuXHRcdFx0dGhpcy5yZWNlaXZlciA9IHRoaXM7XG5cdFx0fVxuXG5cdFx0Rm9sZC5wcm90b3R5cGUuZnVsZmlsbGVkID0gZnVuY3Rpb24oeCkge1xuXHRcdFx0dGhpcy5mLmNhbGwodGhpcy5jLCB0aGlzLnosIHgsIHRoaXMudG8pO1xuXHRcdH07XG5cblx0XHRGb2xkLnByb3RvdHlwZS5yZWplY3RlZCA9IGZ1bmN0aW9uKHgpIHtcblx0XHRcdHRoaXMudG8ucmVqZWN0KHgpO1xuXHRcdH07XG5cblx0XHRGb2xkLnByb3RvdHlwZS5wcm9ncmVzcyA9IGZ1bmN0aW9uKHgpIHtcblx0XHRcdHRoaXMudG8ubm90aWZ5KHgpO1xuXHRcdH07XG5cblx0XHQvLyBPdGhlciBoZWxwZXJzXG5cblx0XHQvKipcblx0XHQgKiBAcGFyYW0geyp9IHhcblx0XHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZmYgeCBpcyBhIHRydXN0ZWQgUHJvbWlzZVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGlzUHJvbWlzZSh4KSB7XG5cdFx0XHRyZXR1cm4geCBpbnN0YW5jZW9mIFByb21pc2U7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogVGVzdCBqdXN0IGVub3VnaCB0byBydWxlIG91dCBwcmltaXRpdmVzLCBpbiBvcmRlciB0byB0YWtlIGZhc3RlclxuXHRcdCAqIHBhdGhzIGluIHNvbWUgY29kZVxuXHRcdCAqIEBwYXJhbSB7Kn0geFxuXHRcdCAqIEByZXR1cm5zIHtib29sZWFufSBmYWxzZSBpZmYgeCBpcyBndWFyYW50ZWVkICpub3QqIHRvIGJlIGEgdGhlbmFibGVcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBtYXliZVRoZW5hYmxlKHgpIHtcblx0XHRcdHJldHVybiAodHlwZW9mIHggPT09ICdvYmplY3QnIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKSAmJiB4ICE9PSBudWxsO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJ1bkNvbnRpbnVhdGlvbjEoZiwgaCwgcmVjZWl2ZXIsIG5leHQpIHtcblx0XHRcdGlmKHR5cGVvZiBmICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHJldHVybiBuZXh0LmJlY29tZShoKTtcblx0XHRcdH1cblxuXHRcdFx0UHJvbWlzZS5lbnRlckNvbnRleHQoaCk7XG5cdFx0XHR0cnlDYXRjaFJlamVjdChmLCBoLnZhbHVlLCByZWNlaXZlciwgbmV4dCk7XG5cdFx0XHRQcm9taXNlLmV4aXRDb250ZXh0KCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcnVuQ29udGludWF0aW9uMyhmLCB4LCBoLCByZWNlaXZlciwgbmV4dCkge1xuXHRcdFx0aWYodHlwZW9mIGYgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0cmV0dXJuIG5leHQuYmVjb21lKGgpO1xuXHRcdFx0fVxuXG5cdFx0XHRQcm9taXNlLmVudGVyQ29udGV4dChoKTtcblx0XHRcdHRyeUNhdGNoUmVqZWN0MyhmLCB4LCBoLnZhbHVlLCByZWNlaXZlciwgbmV4dCk7XG5cdFx0XHRQcm9taXNlLmV4aXRDb250ZXh0KCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQGRlcHJlY2F0ZWRcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBydW5Ob3RpZnkoZiwgeCwgaCwgcmVjZWl2ZXIsIG5leHQpIHtcblx0XHRcdGlmKHR5cGVvZiBmICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHJldHVybiBuZXh0Lm5vdGlmeSh4KTtcblx0XHRcdH1cblxuXHRcdFx0UHJvbWlzZS5lbnRlckNvbnRleHQoaCk7XG5cdFx0XHR0cnlDYXRjaFJldHVybihmLCB4LCByZWNlaXZlciwgbmV4dCk7XG5cdFx0XHRQcm9taXNlLmV4aXRDb250ZXh0KCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdHJ5Q2F0Y2gyKGYsIGEsIGIpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJldHVybiBmKGEsIGIpO1xuXHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdHJldHVybiByZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJuIGYuY2FsbCh0aGlzQXJnLCB4KSwgb3IgaWYgaXQgdGhyb3dzIHJldHVybiBhIHJlamVjdGVkIHByb21pc2UgZm9yXG5cdFx0ICogdGhlIHRocm93biBleGNlcHRpb25cblx0XHQgKi9cblx0XHRmdW5jdGlvbiB0cnlDYXRjaFJlamVjdChmLCB4LCB0aGlzQXJnLCBuZXh0KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRuZXh0LmJlY29tZShnZXRIYW5kbGVyKGYuY2FsbCh0aGlzQXJnLCB4KSkpO1xuXHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdG5leHQuYmVjb21lKG5ldyBSZWplY3RlZChlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogU2FtZSBhcyBhYm92ZSwgYnV0IGluY2x1ZGVzIHRoZSBleHRyYSBhcmd1bWVudCBwYXJhbWV0ZXIuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gdHJ5Q2F0Y2hSZWplY3QzKGYsIHgsIHksIHRoaXNBcmcsIG5leHQpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGYuY2FsbCh0aGlzQXJnLCB4LCB5LCBuZXh0KTtcblx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRuZXh0LmJlY29tZShuZXcgUmVqZWN0ZWQoZSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEBkZXByZWNhdGVkXG5cdFx0ICogUmV0dXJuIGYuY2FsbCh0aGlzQXJnLCB4KSwgb3IgaWYgaXQgdGhyb3dzLCAqcmV0dXJuKiB0aGUgZXhjZXB0aW9uXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gdHJ5Q2F0Y2hSZXR1cm4oZiwgeCwgdGhpc0FyZywgbmV4dCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bmV4dC5ub3RpZnkoZi5jYWxsKHRoaXNBcmcsIHgpKTtcblx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRuZXh0Lm5vdGlmeShlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBpbmhlcml0KFBhcmVudCwgQ2hpbGQpIHtcblx0XHRcdENoaWxkLnByb3RvdHlwZSA9IG9iamVjdENyZWF0ZShQYXJlbnQucHJvdG90eXBlKTtcblx0XHRcdENoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENoaWxkO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNuZCh4LCB5KSB7XG5cdFx0XHRyZXR1cm4geTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBub29wKCkge31cblxuXHRcdGZ1bmN0aW9uIGhhc0N1c3RvbUV2ZW50KCkge1xuXHRcdFx0aWYodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFyIGV2ID0gbmV3IEN1c3RvbUV2ZW50KCd1bmhhbmRsZWRSZWplY3Rpb24nKTtcblx0XHRcdFx0XHRyZXR1cm4gZXYgaW5zdGFuY2VvZiBDdXN0b21FdmVudDtcblx0XHRcdFx0fSBjYXRjaCAoaWdub3JlZEV4Y2VwdGlvbikge31cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBoYXNJbnRlcm5ldEV4cGxvcmVyQ3VzdG9tRXZlbnQoKSB7XG5cdFx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRyeSB0byBjcmVhdGUgb25lIGV2ZW50IHRvIG1ha2Ugc3VyZSBpdCdzIHN1cHBvcnRlZFxuXHRcdFx0XHRcdHZhciBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdFx0XHRcdGV2LmluaXRDdXN0b21FdmVudCgnZXZlbnRUeXBlJywgZmFsc2UsIHRydWUsIHt9KTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBjYXRjaCAoaWdub3JlZEV4Y2VwdGlvbikge31cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBpbml0RW1pdFJlamVjdGlvbigpIHtcblx0XHRcdC8qZ2xvYmFsIHByb2Nlc3MsIHNlbGYsIEN1c3RvbUV2ZW50Ki9cblx0XHRcdGlmKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzICE9PSBudWxsXG5cdFx0XHRcdCYmIHR5cGVvZiBwcm9jZXNzLmVtaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Ly8gUmV0dXJuaW5nIGZhbHN5IGhlcmUgbWVhbnMgdG8gY2FsbCB0aGUgZGVmYXVsdFxuXHRcdFx0XHQvLyBvblBvdGVudGlhbGx5VW5oYW5kbGVkUmVqZWN0aW9uIEFQSS4gIFRoaXMgaXMgc2FmZSBldmVuIGluXG5cdFx0XHRcdC8vIGJyb3dzZXJpZnkgc2luY2UgcHJvY2Vzcy5lbWl0IGFsd2F5cyByZXR1cm5zIGZhbHN5IGluIGJyb3dzZXJpZnk6XG5cdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWZ1bmN0em9tYmllL25vZGUtcHJvY2Vzcy9ibG9iL21hc3Rlci9icm93c2VyLmpzI0w0MC1MNDZcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKHR5cGUsIHJlamVjdGlvbikge1xuXHRcdFx0XHRcdHJldHVybiB0eXBlID09PSAndW5oYW5kbGVkUmVqZWN0aW9uJ1xuXHRcdFx0XHRcdFx0PyBwcm9jZXNzLmVtaXQodHlwZSwgcmVqZWN0aW9uLnZhbHVlLCByZWplY3Rpb24pXG5cdFx0XHRcdFx0XHQ6IHByb2Nlc3MuZW1pdCh0eXBlLCByZWplY3Rpb24pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIGlmKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBoYXNDdXN0b21FdmVudCgpKSB7XG5cdFx0XHRcdHJldHVybiAoZnVuY3Rpb24gKHNlbGYsIEN1c3RvbUV2ZW50KSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh0eXBlLCByZWplY3Rpb24pIHtcblx0XHRcdFx0XHRcdHZhciBldiA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG5cdFx0XHRcdFx0XHRcdGRldGFpbDoge1xuXHRcdFx0XHRcdFx0XHRcdHJlYXNvbjogcmVqZWN0aW9uLnZhbHVlLFxuXHRcdFx0XHRcdFx0XHRcdGtleTogcmVqZWN0aW9uXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGJ1YmJsZXM6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRjYW5jZWxhYmxlOiB0cnVlXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuICFzZWxmLmRpc3BhdGNoRXZlbnQoZXYpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0oc2VsZiwgQ3VzdG9tRXZlbnQpKTtcblx0XHRcdH0gZWxzZSBpZih0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgaGFzSW50ZXJuZXRFeHBsb3JlckN1c3RvbUV2ZW50KCkpIHtcblx0XHRcdFx0cmV0dXJuIChmdW5jdGlvbihzZWxmLCBkb2N1bWVudCkge1xuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbih0eXBlLCByZWplY3Rpb24pIHtcblx0XHRcdFx0XHRcdHZhciBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdFx0XHRcdFx0ZXYuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCB0cnVlLCB7XG5cdFx0XHRcdFx0XHRcdHJlYXNvbjogcmVqZWN0aW9uLnZhbHVlLFxuXHRcdFx0XHRcdFx0XHRrZXk6IHJlamVjdGlvblxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdHJldHVybiAhc2VsZi5kaXNwYXRjaEV2ZW50KGV2KTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9KHNlbGYsIGRvY3VtZW50KSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBub29wO1xuXHRcdH1cblxuXHRcdHJldHVybiBQcm9taXNlO1xuXHR9O1xufSk7XG59KHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSA6IGZ1bmN0aW9uKGZhY3RvcnkpIHsgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7IH0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL21ha2VQcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93aGVuL2xpYi9tYWtlUHJvbWlzZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTQgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuKGZ1bmN0aW9uKGRlZmluZSkgeyAndXNlIHN0cmljdCc7XG5kZWZpbmUoZnVuY3Rpb24oKSB7XG5cblx0cmV0dXJuIHtcblx0XHRwZW5kaW5nOiB0b1BlbmRpbmdTdGF0ZSxcblx0XHRmdWxmaWxsZWQ6IHRvRnVsZmlsbGVkU3RhdGUsXG5cdFx0cmVqZWN0ZWQ6IHRvUmVqZWN0ZWRTdGF0ZSxcblx0XHRpbnNwZWN0OiBpbnNwZWN0XG5cdH07XG5cblx0ZnVuY3Rpb24gdG9QZW5kaW5nU3RhdGUoKSB7XG5cdFx0cmV0dXJuIHsgc3RhdGU6ICdwZW5kaW5nJyB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9SZWplY3RlZFN0YXRlKGUpIHtcblx0XHRyZXR1cm4geyBzdGF0ZTogJ3JlamVjdGVkJywgcmVhc29uOiBlIH07XG5cdH1cblxuXHRmdW5jdGlvbiB0b0Z1bGZpbGxlZFN0YXRlKHgpIHtcblx0XHRyZXR1cm4geyBzdGF0ZTogJ2Z1bGZpbGxlZCcsIHZhbHVlOiB4IH07XG5cdH1cblxuXHRmdW5jdGlvbiBpbnNwZWN0KGhhbmRsZXIpIHtcblx0XHR2YXIgc3RhdGUgPSBoYW5kbGVyLnN0YXRlKCk7XG5cdFx0cmV0dXJuIHN0YXRlID09PSAwID8gdG9QZW5kaW5nU3RhdGUoKVxuXHRcdFx0IDogc3RhdGUgPiAwICAgPyB0b0Z1bGZpbGxlZFN0YXRlKGhhbmRsZXIudmFsdWUpXG5cdFx0XHQgICAgICAgICAgICAgICA6IHRvUmVqZWN0ZWRTdGF0ZShoYW5kbGVyLnZhbHVlKTtcblx0fVxuXG59KTtcbn0odHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lIDogZnVuY3Rpb24oZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTsgfSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2hlbi9saWIvc3RhdGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3doZW4vbGliL3N0YXRlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNCBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuXG4vKipcbiAqIFByb21pc2VzL0ErIGFuZCB3aGVuKCkgaW1wbGVtZW50YXRpb25cbiAqIHdoZW4gaXMgcGFydCBvZiB0aGUgY3Vqb0pTIGZhbWlseSBvZiBsaWJyYXJpZXMgKGh0dHA6Ly9jdWpvanMuY29tLylcbiAqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXJcbiAqIEBhdXRob3IgSm9obiBIYW5uXG4gKi9cbihmdW5jdGlvbihkZWZpbmUpIHsgJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKGZ1bmN0aW9uIChyZXF1aXJlKSB7XG5cblx0dmFyIHRpbWVkID0gcmVxdWlyZSgnLi9saWIvZGVjb3JhdG9ycy90aW1lZCcpO1xuXHR2YXIgYXJyYXkgPSByZXF1aXJlKCcuL2xpYi9kZWNvcmF0b3JzL2FycmF5Jyk7XG5cdHZhciBmbG93ID0gcmVxdWlyZSgnLi9saWIvZGVjb3JhdG9ycy9mbG93Jyk7XG5cdHZhciBmb2xkID0gcmVxdWlyZSgnLi9saWIvZGVjb3JhdG9ycy9mb2xkJyk7XG5cdHZhciBpbnNwZWN0ID0gcmVxdWlyZSgnLi9saWIvZGVjb3JhdG9ycy9pbnNwZWN0Jyk7XG5cdHZhciBnZW5lcmF0ZSA9IHJlcXVpcmUoJy4vbGliL2RlY29yYXRvcnMvaXRlcmF0ZScpO1xuXHR2YXIgcHJvZ3Jlc3MgPSByZXF1aXJlKCcuL2xpYi9kZWNvcmF0b3JzL3Byb2dyZXNzJyk7XG5cdHZhciB3aXRoVGhpcyA9IHJlcXVpcmUoJy4vbGliL2RlY29yYXRvcnMvd2l0aCcpO1xuXHR2YXIgdW5oYW5kbGVkUmVqZWN0aW9uID0gcmVxdWlyZSgnLi9saWIvZGVjb3JhdG9ycy91bmhhbmRsZWRSZWplY3Rpb24nKTtcblx0dmFyIFRpbWVvdXRFcnJvciA9IHJlcXVpcmUoJy4vbGliL1RpbWVvdXRFcnJvcicpO1xuXG5cdHZhciBQcm9taXNlID0gW2FycmF5LCBmbG93LCBmb2xkLCBnZW5lcmF0ZSwgcHJvZ3Jlc3MsXG5cdFx0aW5zcGVjdCwgd2l0aFRoaXMsIHRpbWVkLCB1bmhhbmRsZWRSZWplY3Rpb25dXG5cdFx0LnJlZHVjZShmdW5jdGlvbihQcm9taXNlLCBmZWF0dXJlKSB7XG5cdFx0XHRyZXR1cm4gZmVhdHVyZShQcm9taXNlKTtcblx0XHR9LCByZXF1aXJlKCcuL2xpYi9Qcm9taXNlJykpO1xuXG5cdHZhciBhcHBseSA9IHJlcXVpcmUoJy4vbGliL2FwcGx5JykoUHJvbWlzZSk7XG5cblx0Ly8gUHVibGljIEFQSVxuXG5cdHdoZW4ucHJvbWlzZSAgICAgPSBwcm9taXNlOyAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgcGVuZGluZyBwcm9taXNlXG5cdHdoZW4ucmVzb2x2ZSAgICAgPSBQcm9taXNlLnJlc29sdmU7ICAgICAgLy8gQ3JlYXRlIGEgcmVzb2x2ZWQgcHJvbWlzZVxuXHR3aGVuLnJlamVjdCAgICAgID0gUHJvbWlzZS5yZWplY3Q7ICAgICAgIC8vIENyZWF0ZSBhIHJlamVjdGVkIHByb21pc2VcblxuXHR3aGVuLmxpZnQgICAgICAgID0gbGlmdDsgICAgICAgICAgICAgICAgIC8vIGxpZnQgYSBmdW5jdGlvbiB0byByZXR1cm4gcHJvbWlzZXNcblx0d2hlblsndHJ5J10gICAgICA9IGF0dGVtcHQ7ICAgICAgICAgICAgICAvLyBjYWxsIGEgZnVuY3Rpb24gYW5kIHJldHVybiBhIHByb21pc2Vcblx0d2hlbi5hdHRlbXB0ICAgICA9IGF0dGVtcHQ7ICAgICAgICAgICAgICAvLyBhbGlhcyBmb3Igd2hlbi50cnlcblxuXHR3aGVuLml0ZXJhdGUgICAgID0gUHJvbWlzZS5pdGVyYXRlOyAgICAgIC8vIERFUFJFQ0FURUQgKHVzZSBjdWpvanMvbW9zdCBzdHJlYW1zKSBHZW5lcmF0ZSBhIHN0cmVhbSBvZiBwcm9taXNlc1xuXHR3aGVuLnVuZm9sZCAgICAgID0gUHJvbWlzZS51bmZvbGQ7ICAgICAgIC8vIERFUFJFQ0FURUQgKHVzZSBjdWpvanMvbW9zdCBzdHJlYW1zKSBHZW5lcmF0ZSBhIHN0cmVhbSBvZiBwcm9taXNlc1xuXG5cdHdoZW4uam9pbiAgICAgICAgPSBqb2luOyAgICAgICAgICAgICAgICAgLy8gSm9pbiAyIG9yIG1vcmUgcHJvbWlzZXNcblxuXHR3aGVuLmFsbCAgICAgICAgID0gYWxsOyAgICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgYSBsaXN0IG9mIHByb21pc2VzXG5cdHdoZW4uc2V0dGxlICAgICAgPSBzZXR0bGU7ICAgICAgICAgICAgICAgLy8gU2V0dGxlIGEgbGlzdCBvZiBwcm9taXNlc1xuXG5cdHdoZW4uYW55ICAgICAgICAgPSBsaWZ0KFByb21pc2UuYW55KTsgICAgLy8gT25lLXdpbm5lciByYWNlXG5cdHdoZW4uc29tZSAgICAgICAgPSBsaWZ0KFByb21pc2Uuc29tZSk7ICAgLy8gTXVsdGktd2lubmVyIHJhY2Vcblx0d2hlbi5yYWNlICAgICAgICA9IGxpZnQoUHJvbWlzZS5yYWNlKTsgICAvLyBGaXJzdC10by1zZXR0bGUgcmFjZVxuXG5cdHdoZW4ubWFwICAgICAgICAgPSBtYXA7ICAgICAgICAgICAgICAgICAgLy8gQXJyYXkubWFwKCkgZm9yIHByb21pc2VzXG5cdHdoZW4uZmlsdGVyICAgICAgPSBmaWx0ZXI7ICAgICAgICAgICAgICAgLy8gQXJyYXkuZmlsdGVyKCkgZm9yIHByb21pc2VzXG5cdHdoZW4ucmVkdWNlICAgICAgPSBsaWZ0KFByb21pc2UucmVkdWNlKTsgICAgICAgLy8gQXJyYXkucmVkdWNlKCkgZm9yIHByb21pc2VzXG5cdHdoZW4ucmVkdWNlUmlnaHQgPSBsaWZ0KFByb21pc2UucmVkdWNlUmlnaHQpOyAgLy8gQXJyYXkucmVkdWNlUmlnaHQoKSBmb3IgcHJvbWlzZXNcblxuXHR3aGVuLmlzUHJvbWlzZUxpa2UgPSBpc1Byb21pc2VMaWtlOyAgICAgIC8vIElzIHNvbWV0aGluZyBwcm9taXNlLWxpa2UsIGFrYSB0aGVuYWJsZVxuXG5cdHdoZW4uUHJvbWlzZSAgICAgPSBQcm9taXNlOyAgICAgICAgICAgICAgLy8gUHJvbWlzZSBjb25zdHJ1Y3RvclxuXHR3aGVuLmRlZmVyICAgICAgID0gZGVmZXI7ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIHtwcm9taXNlLCByZXNvbHZlLCByZWplY3R9IHR1cGxlXG5cblx0Ly8gRXJyb3IgdHlwZXNcblxuXHR3aGVuLlRpbWVvdXRFcnJvciA9IFRpbWVvdXRFcnJvcjtcblxuXHQvKipcblx0ICogR2V0IGEgdHJ1c3RlZCBwcm9taXNlIGZvciB4LCBvciBieSB0cmFuc2Zvcm1pbmcgeCB3aXRoIG9uRnVsZmlsbGVkXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0geFxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9uP30gb25GdWxmaWxsZWQgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIHdoZW4geCBpc1xuXHQgKiAgIHN1Y2Nlc3NmdWxseSBmdWxmaWxsZWQuICBJZiBwcm9taXNlT3JWYWx1ZSBpcyBhbiBpbW1lZGlhdGUgdmFsdWUsIGNhbGxiYWNrXG5cdCAqICAgd2lsbCBiZSBpbnZva2VkIGltbWVkaWF0ZWx5LlxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9uP30gb25SZWplY3RlZCBjYWxsYmFjayB0byBiZSBjYWxsZWQgd2hlbiB4IGlzXG5cdCAqICAgcmVqZWN0ZWQuXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb24/fSBvblByb2dyZXNzIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCB3aGVuIHByb2dyZXNzIHVwZGF0ZXNcblx0ICogICBhcmUgaXNzdWVkIGZvciB4LiBAZGVwcmVjYXRlZFxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gYSBuZXcgcHJvbWlzZSB0aGF0IHdpbGwgZnVsZmlsbCB3aXRoIHRoZSByZXR1cm5cblx0ICogICB2YWx1ZSBvZiBjYWxsYmFjayBvciBlcnJiYWNrIG9yIHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHByb21pc2VPclZhbHVlIGlmXG5cdCAqICAgY2FsbGJhY2sgYW5kL29yIGVycmJhY2sgaXMgbm90IHN1cHBsaWVkLlxuXHQgKi9cblx0ZnVuY3Rpb24gd2hlbih4LCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgb25Qcm9ncmVzcykge1xuXHRcdHZhciBwID0gUHJvbWlzZS5yZXNvbHZlKHgpO1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuXHRcdFx0cmV0dXJuIHA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHAudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgb25Qcm9ncmVzcyk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBwcm9taXNlIHdob3NlIGZhdGUgaXMgZGV0ZXJtaW5lZCBieSByZXNvbHZlci5cblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZXIgZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0LCBub3RpZnkpXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHdob3NlIGZhdGUgaXMgZGV0ZXJtaW5lIGJ5IHJlc29sdmVyXG5cdCAqL1xuXHRmdW5jdGlvbiBwcm9taXNlKHJlc29sdmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmVyKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZ0IHRoZSBzdXBwbGllZCBmdW5jdGlvbiwgY3JlYXRpbmcgYSB2ZXJzaW9uIG9mIGYgdGhhdCByZXR1cm5zXG5cdCAqIHByb21pc2VzLCBhbmQgYWNjZXB0cyBwcm9taXNlcyBhcyBhcmd1bWVudHMuXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGZcblx0ICogQHJldHVybnMge0Z1bmN0aW9ufSB2ZXJzaW9uIG9mIGYgdGhhdCByZXR1cm5zIHByb21pc2VzXG5cdCAqL1xuXHRmdW5jdGlvbiBsaWZ0KGYpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRmb3IodmFyIGk9MCwgbD1hcmd1bWVudHMubGVuZ3RoLCBhPW5ldyBBcnJheShsKTsgaTxsOyArK2kpIHtcblx0XHRcdFx0YVtpXSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBhcHBseShmLCB0aGlzLCBhKTtcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGwgZiBpbiBhIGZ1dHVyZSB0dXJuLCB3aXRoIHRoZSBzdXBwbGllZCBhcmdzLCBhbmQgcmV0dXJuIGEgcHJvbWlzZVxuXHQgKiBmb3IgdGhlIHJlc3VsdC5cblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gZlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdGZ1bmN0aW9uIGF0dGVtcHQoZiAvKiwgYXJncy4uLiAqLykge1xuXHRcdC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG5cdFx0Zm9yKHZhciBpPTAsIGw9YXJndW1lbnRzLmxlbmd0aC0xLCBhPW5ldyBBcnJheShsKTsgaTxsOyArK2kpIHtcblx0XHRcdGFbaV0gPSBhcmd1bWVudHNbaSsxXTtcblx0XHR9XG5cdFx0cmV0dXJuIGFwcGx5KGYsIHRoaXMsIGEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSB7cHJvbWlzZSwgcmVzb2x2ZXJ9IHBhaXIsIGVpdGhlciBvciBib3RoIG9mIHdoaWNoXG5cdCAqIG1heSBiZSBnaXZlbiBvdXQgc2FmZWx5IHRvIGNvbnN1bWVycy5cblx0ICogQHJldHVybiB7e3Byb21pc2U6IFByb21pc2UsIHJlc29sdmU6IGZ1bmN0aW9uLCByZWplY3Q6IGZ1bmN0aW9uLCBub3RpZnk6IGZ1bmN0aW9ufX1cblx0ICovXG5cdGZ1bmN0aW9uIGRlZmVyKCkge1xuXHRcdHJldHVybiBuZXcgRGVmZXJyZWQoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIERlZmVycmVkKCkge1xuXHRcdHZhciBwID0gUHJvbWlzZS5fZGVmZXIoKTtcblxuXHRcdGZ1bmN0aW9uIHJlc29sdmUoeCkgeyBwLl9oYW5kbGVyLnJlc29sdmUoeCk7IH1cblx0XHRmdW5jdGlvbiByZWplY3QoeCkgeyBwLl9oYW5kbGVyLnJlamVjdCh4KTsgfVxuXHRcdGZ1bmN0aW9uIG5vdGlmeSh4KSB7IHAuX2hhbmRsZXIubm90aWZ5KHgpOyB9XG5cblx0XHR0aGlzLnByb21pc2UgPSBwO1xuXHRcdHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG5cdFx0dGhpcy5yZWplY3QgPSByZWplY3Q7XG5cdFx0dGhpcy5ub3RpZnkgPSBub3RpZnk7XG5cdFx0dGhpcy5yZXNvbHZlciA9IHsgcmVzb2x2ZTogcmVzb2x2ZSwgcmVqZWN0OiByZWplY3QsIG5vdGlmeTogbm90aWZ5IH07XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyBpZiB4IGlzIHByb21pc2UtbGlrZSwgaS5lLiBhIHRoZW5hYmxlIG9iamVjdFxuXHQgKiBOT1RFOiBXaWxsIHJldHVybiB0cnVlIGZvciAqYW55IHRoZW5hYmxlIG9iamVjdCosIGFuZCBpc24ndCB0cnVseVxuXHQgKiBzYWZlLCBzaW5jZSBpdCBtYXkgYXR0ZW1wdCB0byBhY2Nlc3MgdGhlIGB0aGVuYCBwcm9wZXJ0eSBvZiB4IChpLmUuXG5cdCAqICBjbGV2ZXIvbWFsaWNpb3VzIGdldHRlcnMgbWF5IGRvIHdlaXJkIHRoaW5ncylcblx0ICogQHBhcmFtIHsqfSB4IGFueXRoaW5nXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHggaXMgcHJvbWlzZS1saWtlXG5cdCAqL1xuXHRmdW5jdGlvbiBpc1Byb21pc2VMaWtlKHgpIHtcblx0XHRyZXR1cm4geCAmJiB0eXBlb2YgeC50aGVuID09PSAnZnVuY3Rpb24nO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiBhIHByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgb25seSBvbmNlIGFsbCB0aGUgc3VwcGxpZWQgYXJndW1lbnRzXG5cdCAqIGhhdmUgcmVzb2x2ZWQuIFRoZSByZXNvbHV0aW9uIHZhbHVlIG9mIHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgYW4gYXJyYXlcblx0ICogY29udGFpbmluZyB0aGUgcmVzb2x1dGlvbiB2YWx1ZXMgb2YgZWFjaCBvZiB0aGUgYXJndW1lbnRzLlxuXHQgKiBAcGFyYW0gey4uLip9IGFyZ3VtZW50cyBtYXkgYmUgYSBtaXggb2YgcHJvbWlzZXMgYW5kIHZhbHVlc1xuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdGZ1bmN0aW9uIGpvaW4oLyogLi4ucHJvbWlzZXMgKi8pIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBwcm9taXNlIHRoYXQgd2lsbCBmdWxmaWxsIG9uY2UgYWxsIGlucHV0IHByb21pc2VzIGhhdmVcblx0ICogZnVsZmlsbGVkLCBvciByZWplY3Qgd2hlbiBhbnkgb25lIGlucHV0IHByb21pc2UgcmVqZWN0cy5cblx0ICogQHBhcmFtIHthcnJheXxQcm9taXNlfSBwcm9taXNlcyBhcnJheSAob3IgcHJvbWlzZSBmb3IgYW4gYXJyYXkpIG9mIHByb21pc2VzXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0ZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG5cdFx0cmV0dXJuIHdoZW4ocHJvbWlzZXMsIFByb21pc2UuYWxsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBwcm9taXNlIHRoYXQgd2lsbCBhbHdheXMgZnVsZmlsbCB3aXRoIGFuIGFycmF5IGNvbnRhaW5pbmdcblx0ICogdGhlIG91dGNvbWUgc3RhdGVzIG9mIGFsbCBpbnB1dCBwcm9taXNlcy4gIFRoZSByZXR1cm5lZCBwcm9taXNlXG5cdCAqIHdpbGwgb25seSByZWplY3QgaWYgYHByb21pc2VzYCBpdHNlbGYgaXMgYSByZWplY3RlZCBwcm9taXNlLlxuXHQgKiBAcGFyYW0ge2FycmF5fFByb21pc2V9IHByb21pc2VzIGFycmF5IChvciBwcm9taXNlIGZvciBhbiBhcnJheSkgb2YgcHJvbWlzZXNcblx0ICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgZm9yIGFycmF5IG9mIHNldHRsZWQgc3RhdGUgZGVzY3JpcHRvcnNcblx0ICovXG5cdGZ1bmN0aW9uIHNldHRsZShwcm9taXNlcykge1xuXHRcdHJldHVybiB3aGVuKHByb21pc2VzLCBQcm9taXNlLnNldHRsZSk7XG5cdH1cblxuXHQvKipcblx0ICogUHJvbWlzZS1hd2FyZSBhcnJheSBtYXAgZnVuY3Rpb24sIHNpbWlsYXIgdG8gYEFycmF5LnByb3RvdHlwZS5tYXAoKWAsXG5cdCAqIGJ1dCBpbnB1dCBhcnJheSBtYXkgY29udGFpbiBwcm9taXNlcyBvciB2YWx1ZXMuXG5cdCAqIEBwYXJhbSB7QXJyYXl8UHJvbWlzZX0gcHJvbWlzZXMgYXJyYXkgb2YgYW55dGhpbmcsIG1heSBjb250YWluIHByb21pc2VzIGFuZCB2YWx1ZXNcblx0ICogQHBhcmFtIHtmdW5jdGlvbih4OiosIGluZGV4Ok51bWJlcik6Kn0gbWFwRnVuYyBtYXAgZnVuY3Rpb24gd2hpY2ggbWF5XG5cdCAqICByZXR1cm4gYSBwcm9taXNlIG9yIHZhbHVlXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgd2lsbCBmdWxmaWxsIHdpdGggYW4gYXJyYXkgb2YgbWFwcGVkIHZhbHVlc1xuXHQgKiAgb3IgcmVqZWN0IGlmIGFueSBpbnB1dCBwcm9taXNlIHJlamVjdHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXAocHJvbWlzZXMsIG1hcEZ1bmMpIHtcblx0XHRyZXR1cm4gd2hlbihwcm9taXNlcywgZnVuY3Rpb24ocHJvbWlzZXMpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLm1hcChwcm9taXNlcywgbWFwRnVuYyk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogRmlsdGVyIHRoZSBwcm92aWRlZCBhcnJheSBvZiBwcm9taXNlcyB1c2luZyB0aGUgcHJvdmlkZWQgcHJlZGljYXRlLiAgSW5wdXQgbWF5XG5cdCAqIGNvbnRhaW4gcHJvbWlzZXMgYW5kIHZhbHVlc1xuXHQgKiBAcGFyYW0ge0FycmF5fFByb21pc2V9IHByb21pc2VzIGFycmF5IG9mIHByb21pc2VzIGFuZCB2YWx1ZXNcblx0ICogQHBhcmFtIHtmdW5jdGlvbih4OiosIGluZGV4Ok51bWJlcik6Ym9vbGVhbn0gcHJlZGljYXRlIGZpbHRlcmluZyBwcmVkaWNhdGUuXG5cdCAqICBNdXN0IHJldHVybiB0cnV0aHkgKG9yIHByb21pc2UgZm9yIHRydXRoeSkgZm9yIGl0ZW1zIHRvIHJldGFpbi5cblx0ICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgdGhhdCB3aWxsIGZ1bGZpbGwgd2l0aCBhbiBhcnJheSBjb250YWluaW5nIGFsbCBpdGVtc1xuXHQgKiAgZm9yIHdoaWNoIHByZWRpY2F0ZSByZXR1cm5lZCB0cnV0aHkuXG5cdCAqL1xuXHRmdW5jdGlvbiBmaWx0ZXIocHJvbWlzZXMsIHByZWRpY2F0ZSkge1xuXHRcdHJldHVybiB3aGVuKHByb21pc2VzLCBmdW5jdGlvbihwcm9taXNlcykge1xuXHRcdFx0cmV0dXJuIFByb21pc2UuZmlsdGVyKHByb21pc2VzLCBwcmVkaWNhdGUpO1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIHdoZW47XG59KTtcbn0pKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSA6IGZ1bmN0aW9uIChmYWN0b3J5KSB7IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKTsgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93aGVuL3doZW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3doZW4vd2hlbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuIEF1dG9iYWhuSlMgLSBodHRwOi8vYXV0b2JhaG4ud3NcblxuIENvcHlyaWdodCAoQykgMjAxMS0yMDE0IFRhdmVuZG8gR21iSC5cbiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gU2VlIGxpY2Vuc2UgdGV4dCBhdCBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4gQXV0b2JhaG5KUyBpbmNsdWRlcyBjb2RlIGZyb206XG5cbiB3aGVuIC0gaHR0cDovL2N1am9qcy5jb21cblxuIChjKSBjb3B5cmlnaHQgQiBDYXZhbGllciAmIEogSGFublxuIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSBhdDpcbiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4gQ3J5cHRvLUpTIC0gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2NyeXB0by1qcy9cblxuIChjKSAyMDA5LTIwMTIgYnkgSmVmZiBNb3R0LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIExpY2Vuc2UgYXQ6XG4gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2NyeXB0by1qcy93aWtpL0xpY2Vuc2VcblxuIGNvbnNvbGUtbm9ybWFsaXplciAtIGh0dHBzOi8vZ2l0aHViLmNvbS9aZW5vdmF0aW9ucy9jb25zb2xlLW5vcm1hbGl6ZXJcblxuIChjKSAyMDEyIGJ5IFplbm92YXRpb25zLlxuIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSBhdDpcbiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4gKi9cbndpbmRvdy5kZWZpbmV8fCh3aW5kb3cuZGVmaW5lPWZ1bmN0aW9uKGMpe3RyeXtkZWxldGUgd2luZG93LmRlZmluZX1jYXRjaChnKXt3aW5kb3cuZGVmaW5lPXZvaWQgMH13aW5kb3cud2hlbj1jKCl9LHdpbmRvdy5kZWZpbmUuYW1kPXt9KTsoZnVuY3Rpb24oYyl7Y3x8KGM9d2luZG93LmNvbnNvbGU9e2xvZzpmdW5jdGlvbihjLGEsYixkLGgpe30saW5mbzpmdW5jdGlvbihjLGEsYixkLGgpe30sd2FybjpmdW5jdGlvbihjLGEsYixkLGgpe30sZXJyb3I6ZnVuY3Rpb24oYyxhLGIsZCxoKXt9fSk7RnVuY3Rpb24ucHJvdG90eXBlLmJpbmR8fChGdW5jdGlvbi5wcm90b3R5cGUuYmluZD1mdW5jdGlvbihjKXt2YXIgYT10aGlzLGI9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBhLmFwcGx5KGMsQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShiLGFyZ3VtZW50cykpfX0pO1wib2JqZWN0XCI9PT10eXBlb2YgYy5sb2cmJihjLmxvZz1GdW5jdGlvbi5wcm90b3R5cGUuY2FsbC5iaW5kKGMubG9nLGMpLGMuaW5mbz1GdW5jdGlvbi5wcm90b3R5cGUuY2FsbC5iaW5kKGMuaW5mbyxjKSxjLndhcm49RnVuY3Rpb24ucHJvdG90eXBlLmNhbGwuYmluZChjLndhcm4sYyksXG4gICAgYy5lcnJvcj1GdW5jdGlvbi5wcm90b3R5cGUuY2FsbC5iaW5kKGMuZXJyb3IsYykpO1wiZ3JvdXBcImluIGN8fChjLmdyb3VwPWZ1bmN0aW9uKGcpe2MuaW5mbyhcIlxcbi0tLSBcIitnK1wiIC0tLVxcblwiKX0pO1wiZ3JvdXBFbmRcImluIGN8fChjLmdyb3VwRW5kPWZ1bmN0aW9uKCl7Yy5sb2coXCJcXG5cIil9KTtcInRpbWVcImluIGN8fGZ1bmN0aW9uKCl7dmFyIGc9e307Yy50aW1lPWZ1bmN0aW9uKGEpe2dbYV09KG5ldyBEYXRlKS5nZXRUaW1lKCl9O2MudGltZUVuZD1mdW5jdGlvbihhKXt2YXIgYj0obmV3IERhdGUpLmdldFRpbWUoKTtjLmluZm8oYStcIjogXCIrKGEgaW4gZz9iLWdbYV06MCkrXCJtc1wiKX19KCl9KSh3aW5kb3cuY29uc29sZSk7LypcbiBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTEtMjAxMyBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuKGZ1bmN0aW9uKGMpe2MoZnVuY3Rpb24oYyl7ZnVuY3Rpb24gYShhLGIsZSxjKXtyZXR1cm4oYSBpbnN0YW5jZW9mIGQ/YTpoKGEpKS50aGVuKGIsZSxjKX1mdW5jdGlvbiBiKGEpe3JldHVybiBuZXcgZChhLEIuUHJvbWlzZVN0YXR1cyYmQi5Qcm9taXNlU3RhdHVzKCkpfWZ1bmN0aW9uIGQoYSxiKXtmdW5jdGlvbiBkKGEpe2lmKG0pe3ZhciBjPW07bT13O3AoZnVuY3Rpb24oKXtxPWUobCxhKTtiJiZBKHEsYik7ZihjLHEpfSl9fWZ1bmN0aW9uIGMoYSl7ZChuZXcgayhhKSl9ZnVuY3Rpb24gaChhKXtpZihtKXt2YXIgYj1tO3AoZnVuY3Rpb24oKXtmKGIsbmV3IHooYSkpfSl9fXZhciBsLHEsbT1bXTtsPXRoaXM7dGhpcy5fc3RhdHVzPWI7dGhpcy5pbnNwZWN0PWZ1bmN0aW9uKCl7cmV0dXJuIHE/cS5pbnNwZWN0KCk6e3N0YXRlOlwicGVuZGluZ1wifX07dGhpcy5fd2hlbj1mdW5jdGlvbihhLGIsZSxkLGMpe2Z1bmN0aW9uIGYoaCl7aC5fd2hlbihhLGIsZSxkLGMpfW0/bS5wdXNoKGYpOlxuICAgIHAoZnVuY3Rpb24oKXtmKHEpfSl9O3RyeXthKGQsYyxoKX1jYXRjaChuKXtjKG4pfX1mdW5jdGlvbiBoKGEpe3JldHVybiBiKGZ1bmN0aW9uKGIpe2IoYSl9KX1mdW5jdGlvbiBmKGEsYil7Zm9yKHZhciBlPTA7ZTxhLmxlbmd0aDtlKyspYVtlXShiKX1mdW5jdGlvbiBlKGEsYil7aWYoYj09PWEpcmV0dXJuIG5ldyBrKG5ldyBUeXBlRXJyb3IpO2lmKGIgaW5zdGFuY2VvZiBkKXJldHVybiBiO3RyeXt2YXIgZT1iPT09T2JqZWN0KGIpJiZiLnRoZW47cmV0dXJuXCJmdW5jdGlvblwiPT09dHlwZW9mIGU/bChlLGIpOm5ldyB0KGIpfWNhdGNoKGMpe3JldHVybiBuZXcgayhjKX19ZnVuY3Rpb24gbChhLGUpe3JldHVybiBiKGZ1bmN0aW9uKGIsZCl7RyhhLGUsYixkKX0pfWZ1bmN0aW9uIHQoYSl7dGhpcy52YWx1ZT1hfWZ1bmN0aW9uIGsoYSl7dGhpcy52YWx1ZT1hfWZ1bmN0aW9uIHooYSl7dGhpcy52YWx1ZT1hfWZ1bmN0aW9uIEEoYSxiKXthLnRoZW4oZnVuY3Rpb24oKXtiLmZ1bGZpbGxlZCgpfSxcbiAgICBmdW5jdGlvbihhKXtiLnJlamVjdGVkKGEpfSl9ZnVuY3Rpb24gcShhKXtyZXR1cm4gYSYmXCJmdW5jdGlvblwiPT09dHlwZW9mIGEudGhlbn1mdW5jdGlvbiBtKGUsZCxjLGYsaCl7cmV0dXJuIGEoZSxmdW5jdGlvbihlKXtyZXR1cm4gYihmdW5jdGlvbihiLGMsZil7ZnVuY3Rpb24gaChhKXtuKGEpfWZ1bmN0aW9uIEEoYSl7ayhhKX12YXIgbCxxLEQsbSxrLG4sdCxnO3Q9ZS5sZW5ndGg+Pj4wO2w9TWF0aC5tYXgoMCxNYXRoLm1pbihkLHQpKTtEPVtdO3E9dC1sKzE7bT1bXTtpZihsKXtuPWZ1bmN0aW9uKGEpe20ucHVzaChhKTstLXF8fChrPW49cyxjKG0pKX07az1mdW5jdGlvbihhKXtELnB1c2goYSk7LS1sfHwoaz1uPXMsYihEKSl9O2ZvcihnPTA7Zzx0OysrZylnIGluIGUmJmEoZVtnXSxBLGgsZil9ZWxzZSBiKEQpfSkudGhlbihjLGYsaCl9KX1mdW5jdGlvbiBuKGEsYixlLGQpe3JldHVybiB1KGEscykudGhlbihiLGUsZCl9ZnVuY3Rpb24gdShiLGUsYyl7cmV0dXJuIGEoYixmdW5jdGlvbihiKXtyZXR1cm4gbmV3IGQoZnVuY3Rpb24oZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYsaCl7ZnVuY3Rpb24gQShiLHEpe2EoYixlLGMpLnRoZW4oZnVuY3Rpb24oYSl7bFtxXT1hOy0ta3x8ZChsKX0sZixoKX12YXIgbCxxLGssbTtrPXE9Yi5sZW5ndGg+Pj4wO2w9W107aWYoaylmb3IobT0wO208cTttKyspbSBpbiBiP0EoYlttXSxtKTotLWs7ZWxzZSBkKGwpfSl9KX1mdW5jdGlvbiB5KGEpe3JldHVybntzdGF0ZTpcImZ1bGZpbGxlZFwiLHZhbHVlOmF9fWZ1bmN0aW9uIHgoYSl7cmV0dXJue3N0YXRlOlwicmVqZWN0ZWRcIixyZWFzb246YX19ZnVuY3Rpb24gcChhKXsxPT09RS5wdXNoKGEpJiZDKHYpfWZ1bmN0aW9uIHYoKXtmKEUpO0U9W119ZnVuY3Rpb24gcyhhKXtyZXR1cm4gYX1mdW5jdGlvbiBLKGEpe1wiZnVuY3Rpb25cIj09PXR5cGVvZiBCLnJlcG9ydFVuaGFuZGxlZD9CLnJlcG9ydFVuaGFuZGxlZCgpOnAoZnVuY3Rpb24oKXt0aHJvdyBhO30pO3Rocm93IGE7fWEucHJvbWlzZT1iO2EucmVzb2x2ZT1oO2EucmVqZWN0PWZ1bmN0aW9uKGIpe3JldHVybiBhKGIsZnVuY3Rpb24oYSl7cmV0dXJuIG5ldyBrKGEpfSl9O1xuICAgIGEuZGVmZXI9ZnVuY3Rpb24oKXt2YXIgYSxlLGQ7YT17cHJvbWlzZTp3LHJlc29sdmU6dyxyZWplY3Q6dyxub3RpZnk6dyxyZXNvbHZlcjp7cmVzb2x2ZTp3LHJlamVjdDp3LG5vdGlmeTp3fX07YS5wcm9taXNlPWU9YihmdW5jdGlvbihiLGMsZil7YS5yZXNvbHZlPWEucmVzb2x2ZXIucmVzb2x2ZT1mdW5jdGlvbihhKXtpZihkKXJldHVybiBoKGEpO2Q9ITA7YihhKTtyZXR1cm4gZX07YS5yZWplY3Q9YS5yZXNvbHZlci5yZWplY3Q9ZnVuY3Rpb24oYSl7aWYoZClyZXR1cm4gaChuZXcgayhhKSk7ZD0hMDtjKGEpO3JldHVybiBlfTthLm5vdGlmeT1hLnJlc29sdmVyLm5vdGlmeT1mdW5jdGlvbihhKXtmKGEpO3JldHVybiBhfX0pO3JldHVybiBhfTthLmpvaW49ZnVuY3Rpb24oKXtyZXR1cm4gdShhcmd1bWVudHMscyl9O2EuYWxsPW47YS5tYXA9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdShhLGIpfTthLnJlZHVjZT1mdW5jdGlvbihiLGUpe3ZhciBkPUcoSCxhcmd1bWVudHMsMSk7cmV0dXJuIGEoYixcbiAgICAgICAgZnVuY3Rpb24oYil7dmFyIGM7Yz1iLmxlbmd0aDtkWzBdPWZ1bmN0aW9uKGIsZCxmKXtyZXR1cm4gYShiLGZ1bmN0aW9uKGIpe3JldHVybiBhKGQsZnVuY3Rpb24oYSl7cmV0dXJuIGUoYixhLGYsYyl9KX0pfTtyZXR1cm4gSS5hcHBseShiLGQpfSl9O2Euc2V0dGxlPWZ1bmN0aW9uKGEpe3JldHVybiB1KGEseSx4KX07YS5hbnk9ZnVuY3Rpb24oYSxiLGUsZCl7cmV0dXJuIG0oYSwxLGZ1bmN0aW9uKGEpe3JldHVybiBiP2IoYVswXSk6YVswXX0sZSxkKX07YS5zb21lPW07YS5pc1Byb21pc2U9cTthLmlzUHJvbWlzZUxpa2U9cTtyPWQucHJvdG90eXBlO3IudGhlbj1mdW5jdGlvbihhLGIsZSl7dmFyIGM9dGhpcztyZXR1cm4gbmV3IGQoZnVuY3Rpb24oZCxmLGgpe2MuX3doZW4oZCxoLGEsYixlKX0sdGhpcy5fc3RhdHVzJiZ0aGlzLl9zdGF0dXMub2JzZXJ2ZWQoKSl9O3JbXCJjYXRjaFwiXT1yLm90aGVyd2lzZT1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy50aGVuKHcsYSl9O3JbXCJmaW5hbGx5XCJdPVxuICAgICAgICByLmVuc3VyZT1mdW5jdGlvbihhKXtmdW5jdGlvbiBiKCl7cmV0dXJuIGgoYSgpKX1yZXR1cm5cImZ1bmN0aW9uXCI9PT10eXBlb2YgYT90aGlzLnRoZW4oYixiKS55aWVsZCh0aGlzKTp0aGlzfTtyLmRvbmU9ZnVuY3Rpb24oYSxiKXt0aGlzLnRoZW4oYSxiKVtcImNhdGNoXCJdKEspfTtyLnlpZWxkPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gYX0pfTtyLnRhcD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy50aGVuKGEpLnlpZWxkKHRoaXMpfTtyLnNwcmVhZD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGIpe3JldHVybiBuKGIsZnVuY3Rpb24oYil7cmV0dXJuIGEuYXBwbHkodyxiKX0pfSl9O3IuYWx3YXlzPWZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMudGhlbihhLGEsYil9O0Y9T2JqZWN0LmNyZWF0ZXx8ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYigpe31iLnByb3RvdHlwZT1hO3JldHVybiBuZXcgYn07dC5wcm90b3R5cGU9RihyKTtcbiAgICB0LnByb3RvdHlwZS5pbnNwZWN0PWZ1bmN0aW9uKCl7cmV0dXJuIHkodGhpcy52YWx1ZSl9O3QucHJvdG90eXBlLl93aGVuPWZ1bmN0aW9uKGEsYixlKXt0cnl7YShcImZ1bmN0aW9uXCI9PT10eXBlb2YgZT9lKHRoaXMudmFsdWUpOnRoaXMudmFsdWUpfWNhdGNoKGQpe2EobmV3IGsoZCkpfX07ay5wcm90b3R5cGU9RihyKTtrLnByb3RvdHlwZS5pbnNwZWN0PWZ1bmN0aW9uKCl7cmV0dXJuIHgodGhpcy52YWx1ZSl9O2sucHJvdG90eXBlLl93aGVuPWZ1bmN0aW9uKGEsYixlLGQpe3RyeXthKFwiZnVuY3Rpb25cIj09PXR5cGVvZiBkP2QodGhpcy52YWx1ZSk6dGhpcyl9Y2F0Y2goYyl7YShuZXcgayhjKSl9fTt6LnByb3RvdHlwZT1GKHIpO3oucHJvdG90eXBlLl93aGVuPWZ1bmN0aW9uKGEsYixlLGQsYyl7dHJ5e2IoXCJmdW5jdGlvblwiPT09dHlwZW9mIGM/Yyh0aGlzLnZhbHVlKTp0aGlzLnZhbHVlKX1jYXRjaChmKXtiKGYpfX07dmFyIHIsRixJLEgsRyxDLEUsQixKLHc7RT1bXTtCPVwidW5kZWZpbmVkXCIhPT1cbiAgICB0eXBlb2YgY29uc29sZT9jb25zb2xlOmE7aWYoXCJvYmplY3RcIj09PXR5cGVvZiBwcm9jZXNzJiZwcm9jZXNzLm5leHRUaWNrKUM9cHJvY2Vzcy5uZXh0VGljaztlbHNlIGlmKHI9XCJmdW5jdGlvblwiPT09dHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXImJk11dGF0aW9uT2JzZXJ2ZXJ8fFwiZnVuY3Rpb25cIj09PXR5cGVvZiBXZWJLaXRNdXRhdGlvbk9ic2VydmVyJiZXZWJLaXRNdXRhdGlvbk9ic2VydmVyKUM9ZnVuY3Rpb24oYSxiLGUpe3ZhciBkPWEuY3JlYXRlRWxlbWVudChcImRpdlwiKTsobmV3IGIoZSkpLm9ic2VydmUoZCx7YXR0cmlidXRlczohMH0pO3JldHVybiBmdW5jdGlvbigpe2Quc2V0QXR0cmlidXRlKFwieFwiLFwieFwiKX19KGRvY3VtZW50LHIsdik7ZWxzZSB0cnl7Qz1jKFwidmVydHhcIikucnVuT25Mb29wfHxjKFwidmVydHhcIikucnVuT25Db250ZXh0fWNhdGNoKEwpe0o9c2V0VGltZW91dCxDPWZ1bmN0aW9uKGEpe0ooYSwwKX19Yz1GdW5jdGlvbi5wcm90b3R5cGU7cj1jLmNhbGw7Rz1jLmJpbmQ/XG4gICAgICAgIHIuYmluZChyKTpmdW5jdGlvbihhLGIpe3JldHVybiBhLmFwcGx5KGIsSC5jYWxsKGFyZ3VtZW50cywyKSl9O2M9W107SD1jLnNsaWNlO0k9Yy5yZWR1Y2V8fGZ1bmN0aW9uKGEpe3ZhciBiLGUsZCxjLGY7Zj0wO2I9T2JqZWN0KHRoaXMpO2M9Yi5sZW5ndGg+Pj4wO2U9YXJndW1lbnRzO2lmKDE+PWUubGVuZ3RoKWZvcig7Oyl7aWYoZiBpbiBiKXtkPWJbZisrXTticmVha31pZigrK2Y+PWMpdGhyb3cgbmV3IFR5cGVFcnJvcjt9ZWxzZSBkPWVbMV07Zm9yKDtmPGM7KytmKWYgaW4gYiYmKGQ9YShkLGJbZl0sZixiKSk7cmV0dXJuIGR9O3JldHVybiBhfSl9KShcImZ1bmN0aW9uXCI9PT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZTpmdW5jdGlvbihjKXttb2R1bGUuZXhwb3J0cz1jKHJlcXVpcmUpfSk7dmFyIENyeXB0b0pTPUNyeXB0b0pTfHxmdW5jdGlvbihjLGcpe3ZhciBhPXt9LGI9YS5saWI9e30sZD1iLkJhc2U9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKCl7fXJldHVybntleHRlbmQ6ZnVuY3Rpb24oYil7YS5wcm90b3R5cGU9dGhpczt2YXIgZT1uZXcgYTtiJiZlLm1peEluKGIpO2UuaGFzT3duUHJvcGVydHkoXCJpbml0XCIpfHwoZS5pbml0PWZ1bmN0aW9uKCl7ZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KTtlLmluaXQucHJvdG90eXBlPWU7ZS4kc3VwZXI9dGhpcztyZXR1cm4gZX0sY3JlYXRlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5leHRlbmQoKTthLmluaXQuYXBwbHkoYSxhcmd1bWVudHMpO3JldHVybiBhfSxpbml0OmZ1bmN0aW9uKCl7fSxtaXhJbjpmdW5jdGlvbihhKXtmb3IodmFyIGIgaW4gYSlhLmhhc093blByb3BlcnR5KGIpJiYodGhpc1tiXT1hW2JdKTthLmhhc093blByb3BlcnR5KFwidG9TdHJpbmdcIikmJih0aGlzLnRvU3RyaW5nPWEudG9TdHJpbmcpfSxcbiAgICAgICAgY2xvbmU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pbml0LnByb3RvdHlwZS5leHRlbmQodGhpcyl9fX0oKSxoPWIuV29yZEFycmF5PWQuZXh0ZW5kKHtpbml0OmZ1bmN0aW9uKGEsYil7YT10aGlzLndvcmRzPWF8fFtdO3RoaXMuc2lnQnl0ZXM9YiE9Zz9iOjQqYS5sZW5ndGh9LHRvU3RyaW5nOmZ1bmN0aW9uKGEpe3JldHVybihhfHxlKS5zdHJpbmdpZnkodGhpcyl9LGNvbmNhdDpmdW5jdGlvbihhKXt2YXIgYj10aGlzLndvcmRzLGU9YS53b3JkcyxkPXRoaXMuc2lnQnl0ZXM7YT1hLnNpZ0J5dGVzO3RoaXMuY2xhbXAoKTtpZihkJTQpZm9yKHZhciBjPTA7YzxhO2MrKyliW2QrYz4+PjJdfD0oZVtjPj4+Ml0+Pj4yNC04KihjJTQpJjI1NSk8PDI0LTgqKChkK2MpJTQpO2Vsc2UgaWYoNjU1MzU8ZS5sZW5ndGgpZm9yKGM9MDtjPGE7Yys9NCliW2QrYz4+PjJdPWVbYz4+PjJdO2Vsc2UgYi5wdXNoLmFwcGx5KGIsZSk7dGhpcy5zaWdCeXRlcys9YTtyZXR1cm4gdGhpc30sY2xhbXA6ZnVuY3Rpb24oKXt2YXIgYT1cbiAgICAgICAgdGhpcy53b3JkcyxiPXRoaXMuc2lnQnl0ZXM7YVtiPj4+Ml0mPTQyOTQ5NjcyOTU8PDMyLTgqKGIlNCk7YS5sZW5ndGg9Yy5jZWlsKGIvNCl9LGNsb25lOmZ1bmN0aW9uKCl7dmFyIGE9ZC5jbG9uZS5jYWxsKHRoaXMpO2Eud29yZHM9dGhpcy53b3Jkcy5zbGljZSgwKTtyZXR1cm4gYX0scmFuZG9tOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1bXSxlPTA7ZTxhO2UrPTQpYi5wdXNoKDQyOTQ5NjcyOTYqYy5yYW5kb20oKXwwKTtyZXR1cm4gbmV3IGguaW5pdChiLGEpfX0pLGY9YS5lbmM9e30sZT1mLkhleD17c3RyaW5naWZ5OmZ1bmN0aW9uKGEpe3ZhciBiPWEud29yZHM7YT1hLnNpZ0J5dGVzO2Zvcih2YXIgZT1bXSxkPTA7ZDxhO2QrKyl7dmFyIGM9YltkPj4+Ml0+Pj4yNC04KihkJTQpJjI1NTtlLnB1c2goKGM+Pj40KS50b1N0cmluZygxNikpO2UucHVzaCgoYyYxNSkudG9TdHJpbmcoMTYpKX1yZXR1cm4gZS5qb2luKFwiXCIpfSxwYXJzZTpmdW5jdGlvbihhKXtmb3IodmFyIGI9YS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZT1bXSxkPTA7ZDxiO2QrPTIpZVtkPj4+M118PXBhcnNlSW50KGEuc3Vic3RyKGQsMiksMTYpPDwyNC00KihkJTgpO3JldHVybiBuZXcgaC5pbml0KGUsYi8yKX19LGw9Zi5MYXRpbjE9e3N0cmluZ2lmeTpmdW5jdGlvbihhKXt2YXIgYj1hLndvcmRzO2E9YS5zaWdCeXRlcztmb3IodmFyIGU9W10sZD0wO2Q8YTtkKyspZS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYltkPj4+Ml0+Pj4yNC04KihkJTQpJjI1NSkpO3JldHVybiBlLmpvaW4oXCJcIil9LHBhcnNlOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1hLmxlbmd0aCxlPVtdLGQ9MDtkPGI7ZCsrKWVbZD4+PjJdfD0oYS5jaGFyQ29kZUF0KGQpJjI1NSk8PDI0LTgqKGQlNCk7cmV0dXJuIG5ldyBoLmluaXQoZSxiKX19LHQ9Zi5VdGY4PXtzdHJpbmdpZnk6ZnVuY3Rpb24oYSl7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGwuc3RyaW5naWZ5KGEpKSl9Y2F0Y2goYil7dGhyb3cgRXJyb3IoXCJNYWxmb3JtZWQgVVRGLTggZGF0YVwiKTtcbiAgICB9fSxwYXJzZTpmdW5jdGlvbihhKXtyZXR1cm4gbC5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYSkpKX19LGs9Yi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtPWQuZXh0ZW5kKHtyZXNldDpmdW5jdGlvbigpe3RoaXMuX2RhdGE9bmV3IGguaW5pdDt0aGlzLl9uRGF0YUJ5dGVzPTB9LF9hcHBlbmQ6ZnVuY3Rpb24oYSl7XCJzdHJpbmdcIj09dHlwZW9mIGEmJihhPXQucGFyc2UoYSkpO3RoaXMuX2RhdGEuY29uY2F0KGEpO3RoaXMuX25EYXRhQnl0ZXMrPWEuc2lnQnl0ZXN9LF9wcm9jZXNzOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuX2RhdGEsZT1iLndvcmRzLGQ9Yi5zaWdCeXRlcyxmPXRoaXMuYmxvY2tTaXplLGw9ZC8oNCpmKSxsPWE/Yy5jZWlsKGwpOmMubWF4KChsfDApLXRoaXMuX21pbkJ1ZmZlclNpemUsMCk7YT1sKmY7ZD1jLm1pbig0KmEsZCk7aWYoYSl7Zm9yKHZhciBrPTA7azxhO2srPWYpdGhpcy5fZG9Qcm9jZXNzQmxvY2soZSxrKTtrPWUuc3BsaWNlKDAsYSk7Yi5zaWdCeXRlcy09XG4gICAgICAgIGR9cmV0dXJuIG5ldyBoLmluaXQoayxkKX0sY2xvbmU6ZnVuY3Rpb24oKXt2YXIgYT1kLmNsb25lLmNhbGwodGhpcyk7YS5fZGF0YT10aGlzLl9kYXRhLmNsb25lKCk7cmV0dXJuIGF9LF9taW5CdWZmZXJTaXplOjB9KTtiLkhhc2hlcj1rLmV4dGVuZCh7Y2ZnOmQuZXh0ZW5kKCksaW5pdDpmdW5jdGlvbihhKXt0aGlzLmNmZz10aGlzLmNmZy5leHRlbmQoYSk7dGhpcy5yZXNldCgpfSxyZXNldDpmdW5jdGlvbigpe2sucmVzZXQuY2FsbCh0aGlzKTt0aGlzLl9kb1Jlc2V0KCl9LHVwZGF0ZTpmdW5jdGlvbihhKXt0aGlzLl9hcHBlbmQoYSk7dGhpcy5fcHJvY2VzcygpO3JldHVybiB0aGlzfSxmaW5hbGl6ZTpmdW5jdGlvbihhKXthJiZ0aGlzLl9hcHBlbmQoYSk7cmV0dXJuIHRoaXMuX2RvRmluYWxpemUoKX0sYmxvY2tTaXplOjE2LF9jcmVhdGVIZWxwZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIsZSl7cmV0dXJuKG5ldyBhLmluaXQoZSkpLmZpbmFsaXplKGIpfX0sX2NyZWF0ZUhtYWNIZWxwZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUpe3JldHVybihuZXcgei5ITUFDLmluaXQoYSxlKSkuZmluYWxpemUoYil9fX0pO3ZhciB6PWEuYWxnbz17fTtyZXR1cm4gYX0oTWF0aCk7KGZ1bmN0aW9uKCl7dmFyIGM9Q3J5cHRvSlMsZz1jLmxpYi5Xb3JkQXJyYXk7Yy5lbmMuQmFzZTY0PXtzdHJpbmdpZnk6ZnVuY3Rpb24oYSl7dmFyIGI9YS53b3JkcyxkPWEuc2lnQnl0ZXMsYz10aGlzLl9tYXA7YS5jbGFtcCgpO2E9W107Zm9yKHZhciBmPTA7ZjxkO2YrPTMpZm9yKHZhciBlPShiW2Y+Pj4yXT4+PjI0LTgqKGYlNCkmMjU1KTw8MTZ8KGJbZisxPj4+Ml0+Pj4yNC04KigoZisxKSU0KSYyNTUpPDw4fGJbZisyPj4+Ml0+Pj4yNC04KigoZisyKSU0KSYyNTUsbD0wOzQ+bCYmZiswLjc1Kmw8ZDtsKyspYS5wdXNoKGMuY2hhckF0KGU+Pj42KigzLWwpJjYzKSk7aWYoYj1jLmNoYXJBdCg2NCkpZm9yKDthLmxlbmd0aCU0OylhLnB1c2goYik7cmV0dXJuIGEuam9pbihcIlwiKX0scGFyc2U6ZnVuY3Rpb24oYSl7dmFyIGI9YS5sZW5ndGgsZD10aGlzLl9tYXAsYz1kLmNoYXJBdCg2NCk7YyYmKGM9YS5pbmRleE9mKGMpLC0xIT1jJiYoYj1jKSk7Zm9yKHZhciBjPVtdLGY9MCxlPTA7ZTxcbmI7ZSsrKWlmKGUlNCl7dmFyIGw9ZC5pbmRleE9mKGEuY2hhckF0KGUtMSkpPDwyKihlJTQpLHQ9ZC5pbmRleE9mKGEuY2hhckF0KGUpKT4+PjYtMiooZSU0KTtjW2Y+Pj4yXXw9KGx8dCk8PDI0LTgqKGYlNCk7ZisrfXJldHVybiBnLmNyZWF0ZShjLGYpfSxfbWFwOlwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIn19KSgpOyhmdW5jdGlvbigpe3ZhciBjPUNyeXB0b0pTLGc9Yy5lbmMuVXRmODtjLmFsZ28uSE1BQz1jLmxpYi5CYXNlLmV4dGVuZCh7aW5pdDpmdW5jdGlvbihhLGIpe2E9dGhpcy5faGFzaGVyPW5ldyBhLmluaXQ7XCJzdHJpbmdcIj09dHlwZW9mIGImJihiPWcucGFyc2UoYikpO3ZhciBkPWEuYmxvY2tTaXplLGM9NCpkO2Iuc2lnQnl0ZXM+YyYmKGI9YS5maW5hbGl6ZShiKSk7Yi5jbGFtcCgpO2Zvcih2YXIgZj10aGlzLl9vS2V5PWIuY2xvbmUoKSxlPXRoaXMuX2lLZXk9Yi5jbG9uZSgpLGw9Zi53b3Jkcyx0PWUud29yZHMsaz0wO2s8ZDtrKyspbFtrXV49MTU0OTU1NjgyOCx0W2tdXj05MDk1MjI0ODY7Zi5zaWdCeXRlcz1lLnNpZ0J5dGVzPWM7dGhpcy5yZXNldCgpfSxyZXNldDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuX2hhc2hlcjthLnJlc2V0KCk7YS51cGRhdGUodGhpcy5faUtleSl9LHVwZGF0ZTpmdW5jdGlvbihhKXt0aGlzLl9oYXNoZXIudXBkYXRlKGEpO3JldHVybiB0aGlzfSxmaW5hbGl6ZTpmdW5jdGlvbihhKXt2YXIgYj1cbiAgICB0aGlzLl9oYXNoZXI7YT1iLmZpbmFsaXplKGEpO2IucmVzZXQoKTtyZXR1cm4gYi5maW5hbGl6ZSh0aGlzLl9vS2V5LmNsb25lKCkuY29uY2F0KGEpKX19KX0pKCk7KGZ1bmN0aW9uKGMpe3ZhciBnPUNyeXB0b0pTLGE9Zy5saWIsYj1hLldvcmRBcnJheSxkPWEuSGFzaGVyLGE9Zy5hbGdvLGg9W10sZj1bXTsoZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGIpe2Zvcih2YXIgZT1jLnNxcnQoYiksZD0yO2Q8PWU7ZCsrKWlmKCEoYiVkKSlyZXR1cm4hMTtyZXR1cm4hMH1mdW5jdGlvbiBiKGEpe3JldHVybiA0Mjk0OTY3Mjk2KihhLShhfDApKXwwfWZvcih2YXIgZT0yLGQ9MDs2ND5kOylhKGUpJiYoOD5kJiYoaFtkXT1iKGMucG93KGUsMC41KSkpLGZbZF09YihjLnBvdyhlLDEvMykpLGQrKyksZSsrfSkoKTt2YXIgZT1bXSxhPWEuU0hBMjU2PWQuZXh0ZW5kKHtfZG9SZXNldDpmdW5jdGlvbigpe3RoaXMuX2hhc2g9bmV3IGIuaW5pdChoLnNsaWNlKDApKX0sX2RvUHJvY2Vzc0Jsb2NrOmZ1bmN0aW9uKGEsYil7Zm9yKHZhciBkPXRoaXMuX2hhc2gud29yZHMsYz1kWzBdLGg9ZFsxXSxnPWRbMl0sbT1kWzNdLG49ZFs0XSx1PWRbNV0seT1kWzZdLHg9ZFs3XSxwPVxuICAgIDA7NjQ+cDtwKyspe2lmKDE2PnApZVtwXT1hW2IrcF18MDtlbHNle3ZhciB2PWVbcC0xNV0scz1lW3AtMl07ZVtwXT0oKHY8PDI1fHY+Pj43KV4odjw8MTR8dj4+PjE4KV52Pj4+MykrZVtwLTddKygoczw8MTV8cz4+PjE3KV4oczw8MTN8cz4+PjE5KV5zPj4+MTApK2VbcC0xNl19dj14Kygobjw8MjZ8bj4+PjYpXihuPDwyMXxuPj4+MTEpXihuPDw3fG4+Pj4yNSkpKyhuJnVefm4meSkrZltwXStlW3BdO3M9KChjPDwzMHxjPj4+MileKGM8PDE5fGM+Pj4xMyleKGM8PDEwfGM+Pj4yMikpKyhjJmheYyZnXmgmZyk7eD15O3k9dTt1PW47bj1tK3Z8MDttPWc7Zz1oO2g9YztjPXYrc3wwfWRbMF09ZFswXStjfDA7ZFsxXT1kWzFdK2h8MDtkWzJdPWRbMl0rZ3wwO2RbM109ZFszXSttfDA7ZFs0XT1kWzRdK258MDtkWzVdPWRbNV0rdXwwO2RbNl09ZFs2XSt5fDA7ZFs3XT1kWzddK3h8MH0sX2RvRmluYWxpemU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLl9kYXRhLGI9YS53b3JkcyxkPTgqdGhpcy5fbkRhdGFCeXRlcyxcbiAgICBlPTgqYS5zaWdCeXRlcztiW2U+Pj41XXw9MTI4PDwyNC1lJTMyO2JbKGUrNjQ+Pj45PDw0KSsxNF09Yy5mbG9vcihkLzQyOTQ5NjcyOTYpO2JbKGUrNjQ+Pj45PDw0KSsxNV09ZDthLnNpZ0J5dGVzPTQqYi5sZW5ndGg7dGhpcy5fcHJvY2VzcygpO3JldHVybiB0aGlzLl9oYXNofSxjbG9uZTpmdW5jdGlvbigpe3ZhciBhPWQuY2xvbmUuY2FsbCh0aGlzKTthLl9oYXNoPXRoaXMuX2hhc2guY2xvbmUoKTtyZXR1cm4gYX19KTtnLlNIQTI1Nj1kLl9jcmVhdGVIZWxwZXIoYSk7Zy5IbWFjU0hBMjU2PWQuX2NyZWF0ZUhtYWNIZWxwZXIoYSl9KShNYXRoKTsoZnVuY3Rpb24oKXt2YXIgYz1DcnlwdG9KUyxnPWMubGliLGE9Zy5CYXNlLGI9Zy5Xb3JkQXJyYXksZz1jLmFsZ28sZD1nLkhNQUMsaD1nLlBCS0RGMj1hLmV4dGVuZCh7Y2ZnOmEuZXh0ZW5kKHtrZXlTaXplOjQsaGFzaGVyOmcuU0hBMSxpdGVyYXRpb25zOjF9KSxpbml0OmZ1bmN0aW9uKGEpe3RoaXMuY2ZnPXRoaXMuY2ZnLmV4dGVuZChhKX0sY29tcHV0ZTpmdW5jdGlvbihhLGUpe2Zvcih2YXIgYz10aGlzLmNmZyxoPWQuY3JlYXRlKGMuaGFzaGVyLGEpLGc9Yi5jcmVhdGUoKSx6PWIuY3JlYXRlKFsxXSksQT1nLndvcmRzLHE9ei53b3JkcyxtPWMua2V5U2l6ZSxjPWMuaXRlcmF0aW9ucztBLmxlbmd0aDxtOyl7dmFyIG49aC51cGRhdGUoZSkuZmluYWxpemUoeik7aC5yZXNldCgpO2Zvcih2YXIgdT1uLndvcmRzLHk9dS5sZW5ndGgseD1uLHA9MTtwPGM7cCsrKXt4PWguZmluYWxpemUoeCk7aC5yZXNldCgpO2Zvcih2YXIgdj14LndvcmRzLHM9MDtzPHk7cysrKXVbc11ePXZbc119Zy5jb25jYXQobik7XG4gICAgcVswXSsrfWcuc2lnQnl0ZXM9NCptO3JldHVybiBnfX0pO2MuUEJLREYyPWZ1bmN0aW9uKGEsYixkKXtyZXR1cm4gaC5jcmVhdGUoZCkuY29tcHV0ZShhLGIpfX0pKCk7LypcbiBNSVQgTGljZW5zZSAoYykgMjAxMS0yMDEzIENvcHlyaWdodCBUYXZlbmRvIEdtYkguICovXG52YXIgQVVUT0JBSE5KU19WRVJTSU9OPVwiMC44LjJcIixnbG9iYWw9dGhpcztcbihmdW5jdGlvbihjLGcpe1wiZnVuY3Rpb25cIj09PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcIndoZW5cIl0sZnVuY3Rpb24oYSl7cmV0dXJuIGMuYWI9ZyhjLGEpfSk6XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBleHBvcnRzP1widW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1nKGMsYy53aGVuKSk6Yy5hYj1nKGMsYy53aGVuKX0pKGdsb2JhbCxmdW5jdGlvbihjLGcpe3ZhciBhPXtfdmVyc2lvbjpBVVRPQkFITkpTX1ZFUlNJT059OyhmdW5jdGlvbigpe0FycmF5LnByb3RvdHlwZS5pbmRleE9mfHwoQXJyYXkucHJvdG90eXBlLmluZGV4T2Y9ZnVuY3Rpb24oYSl7aWYobnVsbD09PXRoaXMpdGhyb3cgbmV3IFR5cGVFcnJvcjt2YXIgZD1PYmplY3QodGhpcyksYz1kLmxlbmd0aD4+PjA7aWYoMD09PWMpcmV0dXJuLTE7dmFyIGY9MDswPGFyZ3VtZW50cy5sZW5ndGgmJihmPU51bWJlcihhcmd1bWVudHNbMV0pLFxuICAgIGYhPT1mP2Y9MDowIT09ZiYmKEluZmluaXR5IT09ZiYmLUluZmluaXR5IT09ZikmJihmPSgwPGZ8fC0xKSpNYXRoLmZsb29yKE1hdGguYWJzKGYpKSkpO2lmKGY+PWMpcmV0dXJuLTE7Zm9yKGY9MDw9Zj9mOk1hdGgubWF4KGMtTWF0aC5hYnMoZiksMCk7ZjxjO2YrKylpZihmIGluIGQmJmRbZl09PT1hKXJldHVybiBmO3JldHVybi0xfSk7QXJyYXkucHJvdG90eXBlLmZvckVhY2h8fChBcnJheS5wcm90b3R5cGUuZm9yRWFjaD1mdW5jdGlvbihhLGQpe3ZhciBjLGY7aWYobnVsbD09PXRoaXMpdGhyb3cgbmV3IFR5cGVFcnJvcihcIiB0aGlzIGlzIG51bGwgb3Igbm90IGRlZmluZWRcIik7dmFyIGU9T2JqZWN0KHRoaXMpLGw9ZS5sZW5ndGg+Pj4wO2lmKFwiW29iamVjdCBGdW5jdGlvbl1cIiE9PXt9LnRvU3RyaW5nLmNhbGwoYSkpdGhyb3cgbmV3IFR5cGVFcnJvcihhK1wiIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO2QmJihjPWQpO2ZvcihmPTA7ZjxsOyl7dmFyIGc7ZiBpbiBlJiYoZz1lW2ZdLGEuY2FsbChjLFxuICAgIGcsZixlKSk7ZisrfX0pfSkoKTthLl9zbGljZVVzZXJBZ2VudD1mdW5jdGlvbihhLGQsYyl7dmFyIGY9W10sZT1uYXZpZ2F0b3IudXNlckFnZW50O2E9ZS5pbmRleE9mKGEpO2Q9ZS5pbmRleE9mKGQsYSk7MD5kJiYoZD1lLmxlbmd0aCk7Yz1lLnNsaWNlKGEsZCkuc3BsaXQoYyk7ZT1jWzFdLnNwbGl0KFwiLlwiKTtmb3IoZD0wO2Q8ZS5sZW5ndGg7KytkKWYucHVzaChwYXJzZUludChlW2RdLDEwKSk7cmV0dXJue25hbWU6Y1swXSx2ZXJzaW9uOmZ9fTthLmdldEJyb3dzZXI9ZnVuY3Rpb24oKXt2YXIgYj1uYXZpZ2F0b3IudXNlckFnZW50O3JldHVybi0xPGIuaW5kZXhPZihcIkNocm9tZVwiKT9hLl9zbGljZVVzZXJBZ2VudChcIkNocm9tZVwiLFwiIFwiLFwiL1wiKTotMTxiLmluZGV4T2YoXCJTYWZhcmlcIik/YS5fc2xpY2VVc2VyQWdlbnQoXCJTYWZhcmlcIixcIiBcIixcIi9cIik6LTE8Yi5pbmRleE9mKFwiRmlyZWZveFwiKT9hLl9zbGljZVVzZXJBZ2VudChcIkZpcmVmb3hcIixcIiBcIixcIi9cIik6LTE8Yi5pbmRleE9mKFwiTVNJRVwiKT9cbiAgICBhLl9zbGljZVVzZXJBZ2VudChcIk1TSUVcIixcIjtcIixcIiBcIik6bnVsbH07YS5nZXRTZXJ2ZXJVcmw9ZnVuY3Rpb24oYSxkKXtyZXR1cm5cImZpbGU6XCI9PT1jLmxvY2F0aW9uLnByb3RvY29sP2Q/ZDpcIndzOi8vMTI3LjAuMC4xL3dzXCI6KFwiaHR0cHM6XCI9PT1jLmxvY2F0aW9uLnByb3RvY29sP1wid3NzOi8vXCI6XCJ3czovL1wiKStjLmxvY2F0aW9uLmhvc3RuYW1lKyhcIlwiIT09Yy5sb2NhdGlvbi5wb3J0P1wiOlwiK2MubG9jYXRpb24ucG9ydDpcIlwiKStcIi9cIisoYT9hOlwid3NcIil9O2EuYnJvd3Nlck5vdFN1cHBvcnRlZE1lc3NhZ2U9XCJCcm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViU29ja2V0cyAoUkZDNjQ1NSlcIjthLmRlcml2ZUtleT1mdW5jdGlvbihhLGQpe3JldHVybiBkJiZkLnNhbHQ/Q3J5cHRvSlMuUEJLREYyKGEsZC5zYWx0LHtrZXlTaXplOihkLmtleWxlbnx8MzIpLzQsaXRlcmF0aW9uczpkLml0ZXJhdGlvbnN8fDFFNCxoYXNoZXI6Q3J5cHRvSlMuYWxnby5TSEEyNTZ9KS50b1N0cmluZyhDcnlwdG9KUy5lbmMuQmFzZTY0KTpcbiAgICBhfTthLl9pZGNoYXJzPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjthLl9pZGxlbj0xNjthLl9zdWJwcm90b2NvbD1cIndhbXBcIjthLl9uZXdpZD1mdW5jdGlvbigpe2Zvcih2YXIgYj1cIlwiLGQ9MDtkPGEuX2lkbGVuO2QrPTEpYis9YS5faWRjaGFycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmEuX2lkY2hhcnMubGVuZ3RoKSk7cmV0dXJuIGJ9O2EuX25ld2lkRmFzdD1mdW5jdGlvbigpe3JldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KX07YS5sb2c9ZnVuY3Rpb24oKXtpZigxPGFyZ3VtZW50cy5sZW5ndGgpe2NvbnNvbGUuZ3JvdXAoXCJMb2cgSXRlbVwiKTtmb3IodmFyIGE9MDthPGFyZ3VtZW50cy5sZW5ndGg7YSs9MSljb25zb2xlLmxvZyhhcmd1bWVudHNbYV0pO2NvbnNvbGUuZ3JvdXBFbmQoKX1lbHNlIGNvbnNvbGUubG9nKGFyZ3VtZW50c1swXSl9O2EuX2RlYnVncnBjPSExO2EuX2RlYnVncHVic3ViPVxuICAgICExO2EuX2RlYnVnd3M9ITE7YS5fZGVidWdjb25uZWN0PSExO2EuZGVidWc9ZnVuY3Rpb24oYixkLGgpe2lmKFwiY29uc29sZVwiaW4gYylhLl9kZWJ1Z3JwYz1iLGEuX2RlYnVncHVic3ViPWIsYS5fZGVidWd3cz1kLGEuX2RlYnVnY29ubmVjdD1oO2Vsc2UgdGhyb3dcImJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBjb25zb2xlIG9iamVjdFwiO307YS52ZXJzaW9uPWZ1bmN0aW9uKCl7cmV0dXJuIGEuX3ZlcnNpb259O2EuUHJlZml4TWFwPWZ1bmN0aW9uKCl7dGhpcy5faW5kZXg9e307dGhpcy5fcmluZGV4PXt9fTthLlByZWZpeE1hcC5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLl9pbmRleFthXX07YS5QcmVmaXhNYXAucHJvdG90eXBlLnNldD1mdW5jdGlvbihhLGQpe3RoaXMuX2luZGV4W2FdPWQ7dGhpcy5fcmluZGV4W2RdPWF9O2EuUHJlZml4TWFwLnByb3RvdHlwZS5zZXREZWZhdWx0PWZ1bmN0aW9uKGEpe3RoaXMuX2luZGV4W1wiXCJdPWE7dGhpcy5fcmluZGV4W2FdPVxuICAgIFwiXCJ9O2EuUHJlZml4TWFwLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oYSl7dmFyIGQ9dGhpcy5faW5kZXhbYV07ZCYmKGRlbGV0ZSB0aGlzLl9pbmRleFthXSxkZWxldGUgdGhpcy5fcmluZGV4W2RdKX07YS5QcmVmaXhNYXAucHJvdG90eXBlLnJlc29sdmU9ZnVuY3Rpb24oYSxkKXt2YXIgYz1hLmluZGV4T2YoXCI6XCIpO2lmKDA8PWMpe3ZhciBmPWEuc3Vic3RyaW5nKDAsYyk7aWYodGhpcy5faW5kZXhbZl0pcmV0dXJuIHRoaXMuX2luZGV4W2ZdK2Euc3Vic3RyaW5nKGMrMSl9cmV0dXJuITA9PT1kP2E6bnVsbH07YS5QcmVmaXhNYXAucHJvdG90eXBlLnNocmluaz1mdW5jdGlvbihhLGQpe2Zvcih2YXIgYz1hLmxlbmd0aDswPGM7Yy09MSl7dmFyIGY9YS5zdWJzdHJpbmcoMCxjKTtpZihmPXRoaXMuX3JpbmRleFtmXSlyZXR1cm4gZitcIjpcIithLnN1YnN0cmluZyhjKX1yZXR1cm4hMD09PWQ/YTpudWxsfTthLl9NRVNTQUdFX1RZUEVJRF9XRUxDT01FPTA7YS5fTUVTU0FHRV9UWVBFSURfUFJFRklYPVxuICAgIDE7YS5fTUVTU0FHRV9UWVBFSURfQ0FMTD0yO2EuX01FU1NBR0VfVFlQRUlEX0NBTExfUkVTVUxUPTM7YS5fTUVTU0FHRV9UWVBFSURfQ0FMTF9FUlJPUj00O2EuX01FU1NBR0VfVFlQRUlEX1NVQlNDUklCRT01O2EuX01FU1NBR0VfVFlQRUlEX1VOU1VCU0NSSUJFPTY7YS5fTUVTU0FHRV9UWVBFSURfUFVCTElTSD03O2EuX01FU1NBR0VfVFlQRUlEX0VWRU5UPTg7YS5DT05ORUNUSU9OX0NMT1NFRD0wO2EuQ09OTkVDVElPTl9MT1NUPTE7YS5DT05ORUNUSU9OX1JFVFJJRVNfRVhDRUVERUQ9MjthLkNPTk5FQ1RJT05fVU5SRUFDSEFCTEU9MzthLkNPTk5FQ1RJT05fVU5TVVBQT1JURUQ9NDthLkNPTk5FQ1RJT05fVU5SRUFDSEFCTEVfU0NIRURVTEVEX1JFQ09OTkVDVD01O2EuQ09OTkVDVElPTl9MT1NUX1NDSEVEVUxFRF9SRUNPTk5FQ1Q9NjthLkRlZmVycmVkPWcuZGVmZXI7YS5fY29uc3RydWN0PWZ1bmN0aW9uKGEsZCl7cmV0dXJuXCJXZWJTb2NrZXRcImluIGM/ZD9uZXcgV2ViU29ja2V0KGEsXG4gICAgZCk6bmV3IFdlYlNvY2tldChhKTpcIk1veldlYlNvY2tldFwiaW4gYz9kP25ldyBNb3pXZWJTb2NrZXQoYSxkKTpuZXcgTW96V2ViU29ja2V0KGEpOm51bGx9O2EuU2Vzc2lvbj1mdW5jdGlvbihiLGQsYyxmKXt2YXIgZT10aGlzO2UuX3dzdXJpPWI7ZS5fb3B0aW9ucz1mO2UuX3dlYnNvY2tldF9vbm9wZW49ZDtlLl93ZWJzb2NrZXRfb25jbG9zZT1jO2UuX3dlYnNvY2tldD1udWxsO2UuX3dlYnNvY2tldF9jb25uZWN0ZWQ9ITE7ZS5fc2Vzc2lvbl9pZD1udWxsO2UuX3dhbXBfdmVyc2lvbj1udWxsO2UuX3NlcnZlcj1udWxsO2UuX2NhbGxzPXt9O2UuX3N1YnNjcmlwdGlvbnM9e307ZS5fcHJlZml4ZXM9bmV3IGEuUHJlZml4TWFwO2UuX3R4Y250PTA7ZS5fcnhjbnQ9MDtlLl93ZWJzb2NrZXQ9ZS5fb3B0aW9ucyYmZS5fb3B0aW9ucy5za2lwU3VicHJvdG9jb2xBbm5vdW5jZT9hLl9jb25zdHJ1Y3QoZS5fd3N1cmkpOmEuX2NvbnN0cnVjdChlLl93c3VyaSxbYS5fc3VicHJvdG9jb2xdKTtcbiAgICBpZighZS5fd2Vic29ja2V0KXtpZih2b2lkIDAhPT1jKXtjKGEuQ09OTkVDVElPTl9VTlNVUFBPUlRFRCk7cmV0dXJufXRocm93IGEuYnJvd3Nlck5vdFN1cHBvcnRlZE1lc3NhZ2U7fWUuX3dlYnNvY2tldC5vbm1lc3NhZ2U9ZnVuY3Rpb24oYil7YS5fZGVidWd3cyYmKGUuX3J4Y250Kz0xLGNvbnNvbGUuZ3JvdXAoXCJXUyBSZWNlaXZlXCIpLGNvbnNvbGUuaW5mbyhlLl93c3VyaStcIiAgW1wiK2UuX3Nlc3Npb25faWQrXCJdXCIpLGNvbnNvbGUubG9nKGUuX3J4Y250KSxjb25zb2xlLmxvZyhiLmRhdGEpLGNvbnNvbGUuZ3JvdXBFbmQoKSk7Yj1KU09OLnBhcnNlKGIuZGF0YSk7aWYoYlsxXWluIGUuX2NhbGxzKXtpZihiWzBdPT09YS5fTUVTU0FHRV9UWVBFSURfQ0FMTF9SRVNVTFQpe3ZhciBkPWUuX2NhbGxzW2JbMV1dLGM9YlsyXTtpZihhLl9kZWJ1Z3JwYyYmdm9pZCAwIT09ZC5fYWJfY2FsbG9iail7Y29uc29sZS5ncm91cChcIldBTVAgQ2FsbFwiLGQuX2FiX2NhbGxvYmpbMl0pO2NvbnNvbGUudGltZUVuZChkLl9hYl90aWQpO1xuICAgICAgICBjb25zb2xlLmdyb3VwKFwiQXJndW1lbnRzXCIpO2Zvcih2YXIgZj0zO2Y8ZC5fYWJfY2FsbG9iai5sZW5ndGg7Zis9MSl7dmFyIGg9ZC5fYWJfY2FsbG9ialtmXTtpZih2b2lkIDAhPT1oKWNvbnNvbGUubG9nKGgpO2Vsc2UgYnJlYWt9Y29uc29sZS5ncm91cEVuZCgpO2NvbnNvbGUuZ3JvdXAoXCJSZXN1bHRcIik7Y29uc29sZS5sb2coYyk7Y29uc29sZS5ncm91cEVuZCgpO2NvbnNvbGUuZ3JvdXBFbmQoKX1kLnJlc29sdmUoYyl9ZWxzZSBpZihiWzBdPT09YS5fTUVTU0FHRV9UWVBFSURfQ0FMTF9FUlJPUil7ZD1lLl9jYWxsc1tiWzFdXTtjPWJbMl07Zj1iWzNdO2g9Yls0XTtpZihhLl9kZWJ1Z3JwYyYmdm9pZCAwIT09ZC5fYWJfY2FsbG9iail7Y29uc29sZS5ncm91cChcIldBTVAgQ2FsbFwiLGQuX2FiX2NhbGxvYmpbMl0pO2NvbnNvbGUudGltZUVuZChkLl9hYl90aWQpO2NvbnNvbGUuZ3JvdXAoXCJBcmd1bWVudHNcIik7Zm9yKHZhciBnPTM7ZzxkLl9hYl9jYWxsb2JqLmxlbmd0aDtnKz0xKXt2YXIgbT1cbiAgICAgICAgZC5fYWJfY2FsbG9ialtnXTtpZih2b2lkIDAhPT1tKWNvbnNvbGUubG9nKG0pO2Vsc2UgYnJlYWt9Y29uc29sZS5ncm91cEVuZCgpO2NvbnNvbGUuZ3JvdXAoXCJFcnJvclwiKTtjb25zb2xlLmxvZyhjKTtjb25zb2xlLmxvZyhmKTt2b2lkIDAhPT1oJiZjb25zb2xlLmxvZyhoKTtjb25zb2xlLmdyb3VwRW5kKCk7Y29uc29sZS5ncm91cEVuZCgpfXZvaWQgMCE9PWg/ZC5yZWplY3Qoe3VyaTpjLGRlc2M6ZixkZXRhaWw6aH0pOmQucmVqZWN0KHt1cmk6YyxkZXNjOmZ9KX1kZWxldGUgZS5fY2FsbHNbYlsxXV19ZWxzZSBpZihiWzBdPT09YS5fTUVTU0FHRV9UWVBFSURfRVZFTlQpe2lmKGQ9ZS5fcHJlZml4ZXMucmVzb2x2ZShiWzFdLCEwKSxkIGluIGUuX3N1YnNjcmlwdGlvbnMpe3ZhciBuPWJbMV0sdT1iWzJdO2EuX2RlYnVncHVic3ViJiYoY29uc29sZS5ncm91cChcIldBTVAgRXZlbnRcIiksY29uc29sZS5pbmZvKGUuX3dzdXJpK1wiICBbXCIrZS5fc2Vzc2lvbl9pZCtcIl1cIiksY29uc29sZS5sb2cobiksXG4gICAgICAgIGNvbnNvbGUubG9nKHUpLGNvbnNvbGUuZ3JvdXBFbmQoKSk7ZS5fc3Vic2NyaXB0aW9uc1tkXS5mb3JFYWNoKGZ1bmN0aW9uKGEpe2Eobix1KX0pfX1lbHNlIGlmKGJbMF09PT1hLl9NRVNTQUdFX1RZUEVJRF9XRUxDT01FKWlmKG51bGw9PT1lLl9zZXNzaW9uX2lkKXtlLl9zZXNzaW9uX2lkPWJbMV07ZS5fd2FtcF92ZXJzaW9uPWJbMl07ZS5fc2VydmVyPWJbM107aWYoYS5fZGVidWdycGN8fGEuX2RlYnVncHVic3ViKWNvbnNvbGUuZ3JvdXAoXCJXQU1QIFdlbGNvbWVcIiksY29uc29sZS5pbmZvKGUuX3dzdXJpK1wiICBbXCIrZS5fc2Vzc2lvbl9pZCtcIl1cIiksY29uc29sZS5sb2coZS5fd2FtcF92ZXJzaW9uKSxjb25zb2xlLmxvZyhlLl9zZXJ2ZXIpLGNvbnNvbGUuZ3JvdXBFbmQoKTtudWxsIT09ZS5fd2Vic29ja2V0X29ub3BlbiYmZS5fd2Vic29ja2V0X29ub3BlbigpfWVsc2UgdGhyb3dcInByb3RvY29sIGVycm9yICh3ZWxjb21lIG1lc3NhZ2UgcmVjZWl2ZWQgbW9yZSB0aGFuIG9uY2UpXCI7XG4gICAgfTtlLl93ZWJzb2NrZXQub25vcGVuPWZ1bmN0aW9uKGIpe2lmKGUuX3dlYnNvY2tldC5wcm90b2NvbCE9PWEuX3N1YnByb3RvY29sKWlmKFwidW5kZWZpbmVkXCI9PT10eXBlb2YgZS5fd2Vic29ja2V0LnByb3RvY29sKWEuX2RlYnVnd3MmJihjb25zb2xlLmdyb3VwKFwiV1MgV2FybmluZ1wiKSxjb25zb2xlLmluZm8oZS5fd3N1cmkpLGNvbnNvbGUubG9nKFwiV2ViU29ja2V0IG9iamVjdCBoYXMgbm8gcHJvdG9jb2wgYXR0cmlidXRlOiBXQU1QIHN1YnByb3RvY29sIGNoZWNrIHNraXBwZWQhXCIpLGNvbnNvbGUuZ3JvdXBFbmQoKSk7ZWxzZSBpZihlLl9vcHRpb25zJiZlLl9vcHRpb25zLnNraXBTdWJwcm90b2NvbENoZWNrKWEuX2RlYnVnd3MmJihjb25zb2xlLmdyb3VwKFwiV1MgV2FybmluZ1wiKSxjb25zb2xlLmluZm8oZS5fd3N1cmkpLGNvbnNvbGUubG9nKFwiU2VydmVyIGRvZXMgbm90IHNwZWFrIFdBTVAsIGJ1dCBzdWJwcm90b2NvbCBjaGVjayBkaXNhYmxlZCBieSBvcHRpb24hXCIpLGNvbnNvbGUubG9nKGUuX3dlYnNvY2tldC5wcm90b2NvbCksXG4gICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKSk7ZWxzZSB0aHJvdyBlLl93ZWJzb2NrZXQuY2xvc2UoMUUzLFwic2VydmVyIGRvZXMgbm90IHNwZWFrIFdBTVBcIiksXCJzZXJ2ZXIgZG9lcyBub3Qgc3BlYWsgV0FNUCAoYnV0ICdcIitlLl93ZWJzb2NrZXQucHJvdG9jb2wrXCInICEpXCI7YS5fZGVidWd3cyYmKGNvbnNvbGUuZ3JvdXAoXCJXQU1QIENvbm5lY3RcIiksY29uc29sZS5pbmZvKGUuX3dzdXJpKSxjb25zb2xlLmxvZyhlLl93ZWJzb2NrZXQucHJvdG9jb2wpLGNvbnNvbGUuZ3JvdXBFbmQoKSk7ZS5fd2Vic29ja2V0X2Nvbm5lY3RlZD0hMH07ZS5fd2Vic29ja2V0Lm9uZXJyb3I9ZnVuY3Rpb24oYSl7fTtlLl93ZWJzb2NrZXQub25jbG9zZT1mdW5jdGlvbihiKXthLl9kZWJ1Z3dzJiYoZS5fd2Vic29ja2V0X2Nvbm5lY3RlZD9jb25zb2xlLmxvZyhcIkF1dG9iYWhuIGNvbm5lY3Rpb24gdG8gXCIrZS5fd3N1cmkrXCIgbG9zdCAoY29kZSBcIitiLmNvZGUrXCIsIHJlYXNvbiAnXCIrYi5yZWFzb24rXCInLCB3YXNDbGVhbiBcIitcbiAgICBiLndhc0NsZWFuK1wiKS5cIik6Y29uc29sZS5sb2coXCJBdXRvYmFobiBjb3VsZCBub3QgY29ubmVjdCB0byBcIitlLl93c3VyaStcIiAoY29kZSBcIitiLmNvZGUrXCIsIHJlYXNvbiAnXCIrYi5yZWFzb24rXCInLCB3YXNDbGVhbiBcIitiLndhc0NsZWFuK1wiKS5cIikpO3ZvaWQgMCE9PWUuX3dlYnNvY2tldF9vbmNsb3NlJiYoZS5fd2Vic29ja2V0X2Nvbm5lY3RlZD9iLndhc0NsZWFuP2UuX3dlYnNvY2tldF9vbmNsb3NlKGEuQ09OTkVDVElPTl9DTE9TRUQsXCJXUy1cIitiLmNvZGUrXCI6IFwiK2IucmVhc29uKTplLl93ZWJzb2NrZXRfb25jbG9zZShhLkNPTk5FQ1RJT05fTE9TVCk6ZS5fd2Vic29ja2V0X29uY2xvc2UoYS5DT05ORUNUSU9OX1VOUkVBQ0hBQkxFKSk7ZS5fd2Vic29ja2V0X2Nvbm5lY3RlZD0hMTtlLl93c3VyaT1udWxsO2UuX3dlYnNvY2tldF9vbm9wZW49bnVsbDtlLl93ZWJzb2NrZXRfb25jbG9zZT1udWxsO2UuX3dlYnNvY2tldD1udWxsfTtlLmxvZz1mdW5jdGlvbigpe2UuX29wdGlvbnMmJlxuICAgIFwic2Vzc2lvbklkZW50XCJpbiBlLl9vcHRpb25zP2NvbnNvbGUuZ3JvdXAoXCJXQU1QIFNlc3Npb24gJ1wiK2UuX29wdGlvbnMuc2Vzc2lvbklkZW50K1wiJyBbXCIrZS5fc2Vzc2lvbl9pZCtcIl1cIik6Y29uc29sZS5ncm91cChcIldBTVAgU2Vzc2lvbiBbXCIrZS5fc2Vzc2lvbl9pZCtcIl1cIik7Zm9yKHZhciBhPTA7YTxhcmd1bWVudHMubGVuZ3RoOysrYSljb25zb2xlLmxvZyhhcmd1bWVudHNbYV0pO2NvbnNvbGUuZ3JvdXBFbmQoKX19O2EuU2Vzc2lvbi5wcm90b3R5cGUuX3NlbmQ9ZnVuY3Rpb24oYil7aWYoIXRoaXMuX3dlYnNvY2tldF9jb25uZWN0ZWQpdGhyb3dcIkF1dG9iYWhuIG5vdCBjb25uZWN0ZWRcIjtzd2l0Y2goITApe2Nhc2UgYy5Qcm90b3R5cGUmJlwidW5kZWZpbmVkXCI9PT10eXBlb2YgdG9wLnJvb3QuX19wcm90b3R5cGVfZGVsZXRlZDpjYXNlIFwiZnVuY3Rpb25cIj09PXR5cGVvZiBiLnRvSlNPTjpiPWIudG9KU09OKCk7YnJlYWs7ZGVmYXVsdDpiPUpTT04uc3RyaW5naWZ5KGIpfXRoaXMuX3dlYnNvY2tldC5zZW5kKGIpO1xuICAgIHRoaXMuX3R4Y250Kz0xO2EuX2RlYnVnd3MmJihjb25zb2xlLmdyb3VwKFwiV1MgU2VuZFwiKSxjb25zb2xlLmluZm8odGhpcy5fd3N1cmkrXCIgIFtcIit0aGlzLl9zZXNzaW9uX2lkK1wiXVwiKSxjb25zb2xlLmxvZyh0aGlzLl90eGNudCksY29uc29sZS5sb2coYiksY29uc29sZS5ncm91cEVuZCgpKX07YS5TZXNzaW9uLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe3RoaXMuX3dlYnNvY2tldF9jb25uZWN0ZWQmJnRoaXMuX3dlYnNvY2tldC5jbG9zZSgpfTthLlNlc3Npb24ucHJvdG90eXBlLnNlc3Npb25pZD1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9zZXNzaW9uX2lkfTthLlNlc3Npb24ucHJvdG90eXBlLndzdXJpPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dzdXJpfTthLlNlc3Npb24ucHJvdG90eXBlLnNocmluaz1mdW5jdGlvbihhLGQpe3ZvaWQgMD09PWQmJihkPSEwKTtyZXR1cm4gdGhpcy5fcHJlZml4ZXMuc2hyaW5rKGEsZCl9O2EuU2Vzc2lvbi5wcm90b3R5cGUucmVzb2x2ZT1cbiAgICBmdW5jdGlvbihhLGQpe3ZvaWQgMD09PWQmJihkPSEwKTtyZXR1cm4gdGhpcy5fcHJlZml4ZXMucmVzb2x2ZShhLGQpfTthLlNlc3Npb24ucHJvdG90eXBlLnByZWZpeD1mdW5jdGlvbihiLGQpe3RoaXMuX3ByZWZpeGVzLnNldChiLGQpO2lmKGEuX2RlYnVncnBjfHxhLl9kZWJ1Z3B1YnN1Yiljb25zb2xlLmdyb3VwKFwiV0FNUCBQcmVmaXhcIiksY29uc29sZS5pbmZvKHRoaXMuX3dzdXJpK1wiICBbXCIrdGhpcy5fc2Vzc2lvbl9pZCtcIl1cIiksY29uc29sZS5sb2coYiksY29uc29sZS5sb2coZCksY29uc29sZS5ncm91cEVuZCgpO3RoaXMuX3NlbmQoW2EuX01FU1NBR0VfVFlQRUlEX1BSRUZJWCxiLGRdKX07YS5TZXNzaW9uLnByb3RvdHlwZS5jYWxsPWZ1bmN0aW9uKCl7Zm9yKHZhciBiPW5ldyBhLkRlZmVycmVkLGQ7IShkPWEuX25ld2lkRmFzdCgpLCEoZCBpbiB0aGlzLl9jYWxscykpOyk7dGhpcy5fY2FsbHNbZF09Yjtmb3IodmFyIGM9dGhpcy5fcHJlZml4ZXMuc2hyaW5rKGFyZ3VtZW50c1swXSxcbiAgICAhMCksYz1bYS5fTUVTU0FHRV9UWVBFSURfQ0FMTCxkLGNdLGY9MTtmPGFyZ3VtZW50cy5sZW5ndGg7Zis9MSljLnB1c2goYXJndW1lbnRzW2ZdKTt0aGlzLl9zZW5kKGMpO2EuX2RlYnVncnBjJiYoYi5fYWJfY2FsbG9iaj1jLGIuX2FiX3RpZD10aGlzLl93c3VyaStcIiAgW1wiK3RoaXMuX3Nlc3Npb25faWQrXCJdW1wiK2QrXCJdXCIsY29uc29sZS50aW1lKGIuX2FiX3RpZCksY29uc29sZS5pbmZvKCkpO3JldHVybiBiLnByb21pc2UudGhlbj9iLnByb21pc2U6Yn07YS5TZXNzaW9uLnByb3RvdHlwZS5zdWJzY3JpYmU9ZnVuY3Rpb24oYixkKXt2YXIgYz10aGlzLl9wcmVmaXhlcy5yZXNvbHZlKGIsITApO2MgaW4gdGhpcy5fc3Vic2NyaXB0aW9uc3x8KGEuX2RlYnVncHVic3ViJiYoY29uc29sZS5ncm91cChcIldBTVAgU3Vic2NyaWJlXCIpLGNvbnNvbGUuaW5mbyh0aGlzLl93c3VyaStcIiAgW1wiK3RoaXMuX3Nlc3Npb25faWQrXCJdXCIpLGNvbnNvbGUubG9nKGIpLGNvbnNvbGUubG9nKGQpLGNvbnNvbGUuZ3JvdXBFbmQoKSksXG4gICAgdGhpcy5fc2VuZChbYS5fTUVTU0FHRV9UWVBFSURfU1VCU0NSSUJFLGJdKSx0aGlzLl9zdWJzY3JpcHRpb25zW2NdPVtdKTtpZigtMT09PXRoaXMuX3N1YnNjcmlwdGlvbnNbY10uaW5kZXhPZihkKSl0aGlzLl9zdWJzY3JpcHRpb25zW2NdLnB1c2goZCk7ZWxzZSB0aHJvd1wiY2FsbGJhY2sgXCIrZCtcIiBhbHJlYWR5IHN1YnNjcmliZWQgZm9yIHRvcGljIFwiK2M7fTthLlNlc3Npb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlPWZ1bmN0aW9uKGIsZCl7dmFyIGM9dGhpcy5fcHJlZml4ZXMucmVzb2x2ZShiLCEwKTtpZihjIGluIHRoaXMuX3N1YnNjcmlwdGlvbnMpe3ZhciBmO2lmKHZvaWQgMCE9PWQpe3ZhciBlPXRoaXMuX3N1YnNjcmlwdGlvbnNbY10uaW5kZXhPZihkKTtpZigtMSE9PWUpZj1kLHRoaXMuX3N1YnNjcmlwdGlvbnNbY10uc3BsaWNlKGUsMSk7ZWxzZSB0aHJvd1wibm8gY2FsbGJhY2sgXCIrZCtcIiBzdWJzY3JpYmVkIG9uIHRvcGljIFwiK2M7fWVsc2UgZj10aGlzLl9zdWJzY3JpcHRpb25zW2NdLnNsaWNlKCksXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uc1tjXT1bXTswPT09dGhpcy5fc3Vic2NyaXB0aW9uc1tjXS5sZW5ndGgmJihkZWxldGUgdGhpcy5fc3Vic2NyaXB0aW9uc1tjXSxhLl9kZWJ1Z3B1YnN1YiYmKGNvbnNvbGUuZ3JvdXAoXCJXQU1QIFVuc3Vic2NyaWJlXCIpLGNvbnNvbGUuaW5mbyh0aGlzLl93c3VyaStcIiAgW1wiK3RoaXMuX3Nlc3Npb25faWQrXCJdXCIpLGNvbnNvbGUubG9nKGIpLGNvbnNvbGUubG9nKGYpLGNvbnNvbGUuZ3JvdXBFbmQoKSksdGhpcy5fc2VuZChbYS5fTUVTU0FHRV9UWVBFSURfVU5TVUJTQ1JJQkUsYl0pKX1lbHNlIHRocm93XCJub3Qgc3Vic2NyaWJlZCB0byB0b3BpYyBcIitjO307YS5TZXNzaW9uLnByb3RvdHlwZS5wdWJsaXNoPWZ1bmN0aW9uKCl7dmFyIGI9YXJndW1lbnRzWzBdLGQ9YXJndW1lbnRzWzFdLGM9bnVsbCxmPW51bGwsZT1udWxsLGc9bnVsbDtpZigzPGFyZ3VtZW50cy5sZW5ndGgpe2lmKCEoYXJndW1lbnRzWzJdaW5zdGFuY2VvZiBBcnJheSkpdGhyb3dcImludmFsaWQgYXJndW1lbnQgdHlwZShzKVwiO1xuICAgIGlmKCEoYXJndW1lbnRzWzNdaW5zdGFuY2VvZiBBcnJheSkpdGhyb3dcImludmFsaWQgYXJndW1lbnQgdHlwZShzKVwiO2Y9YXJndW1lbnRzWzJdO2U9YXJndW1lbnRzWzNdO2c9W2EuX01FU1NBR0VfVFlQRUlEX1BVQkxJU0gsYixkLGYsZV19ZWxzZSBpZigyPGFyZ3VtZW50cy5sZW5ndGgpaWYoXCJib29sZWFuXCI9PT10eXBlb2YgYXJndW1lbnRzWzJdKWM9YXJndW1lbnRzWzJdLGc9W2EuX01FU1NBR0VfVFlQRUlEX1BVQkxJU0gsYixkLGNdO2Vsc2UgaWYoYXJndW1lbnRzWzJdaW5zdGFuY2VvZiBBcnJheSlmPWFyZ3VtZW50c1syXSxnPVthLl9NRVNTQUdFX1RZUEVJRF9QVUJMSVNILGIsZCxmXTtlbHNlIHRocm93XCJpbnZhbGlkIGFyZ3VtZW50IHR5cGUocylcIjtlbHNlIGc9W2EuX01FU1NBR0VfVFlQRUlEX1BVQkxJU0gsYixkXTthLl9kZWJ1Z3B1YnN1YiYmKGNvbnNvbGUuZ3JvdXAoXCJXQU1QIFB1Ymxpc2hcIiksY29uc29sZS5pbmZvKHRoaXMuX3dzdXJpK1wiICBbXCIrdGhpcy5fc2Vzc2lvbl9pZCtcblwiXVwiKSxjb25zb2xlLmxvZyhiKSxjb25zb2xlLmxvZyhkKSxudWxsIT09Yz9jb25zb2xlLmxvZyhjKTpudWxsIT09ZiYmKGNvbnNvbGUubG9nKGYpLG51bGwhPT1lJiZjb25zb2xlLmxvZyhlKSksY29uc29sZS5ncm91cEVuZCgpKTt0aGlzLl9zZW5kKGcpfTthLlNlc3Npb24ucHJvdG90eXBlLmF1dGhyZXE9ZnVuY3Rpb24oYSxkKXtyZXR1cm4gdGhpcy5jYWxsKFwiaHR0cDovL2FwaS53YW1wLndzL3Byb2NlZHVyZSNhdXRocmVxXCIsYSxkKX07YS5TZXNzaW9uLnByb3RvdHlwZS5hdXRoc2lnbj1mdW5jdGlvbihhLGQpe2R8fChkPVwiXCIpO3JldHVybiBDcnlwdG9KUy5IbWFjU0hBMjU2KGEsZCkudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLkJhc2U2NCl9O2EuU2Vzc2lvbi5wcm90b3R5cGUuYXV0aD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5jYWxsKFwiaHR0cDovL2FwaS53YW1wLndzL3Byb2NlZHVyZSNhdXRoXCIsYSl9O2EuX2Nvbm5lY3Q9ZnVuY3Rpb24oYil7dmFyIGQ9bmV3IGEuU2Vzc2lvbihiLndzdXJpLFxuICAgIGZ1bmN0aW9uKCl7Yi5jb25uZWN0cys9MTtiLnJldHJ5Q291bnQ9MDtiLm9uQ29ubmVjdChkKX0sZnVuY3Rpb24oZCxmKXt2YXIgZT1udWxsO3N3aXRjaChkKXtjYXNlIGEuQ09OTkVDVElPTl9DTE9TRUQ6Yi5vbkhhbmd1cChkLFwiQ29ubmVjdGlvbiB3YXMgY2xvc2VkIHByb3Blcmx5IFtcIitmK1wiXVwiKTticmVhaztjYXNlIGEuQ09OTkVDVElPTl9VTlNVUFBPUlRFRDpiLm9uSGFuZ3VwKGQsXCJCcm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViU29ja2V0LlwiKTticmVhaztjYXNlIGEuQ09OTkVDVElPTl9VTlJFQUNIQUJMRTpiLnJldHJ5Q291bnQrPTE7aWYoMD09PWIuY29ubmVjdHMpYi5vbkhhbmd1cChkLFwiQ29ubmVjdGlvbiBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQuXCIpO2Vsc2UgaWYoYi5yZXRyeUNvdW50PD1iLm9wdGlvbnMubWF4UmV0cmllcykoZT1iLm9uSGFuZ3VwKGEuQ09OTkVDVElPTl9VTlJFQUNIQUJMRV9TQ0hFRFVMRURfUkVDT05ORUNULFwiQ29ubmVjdGlvbiB1bnJlYWNoYWJsZSAtIHNjaGVkdWxlZCByZWNvbm5lY3QgdG8gb2NjdXIgaW4gXCIrXG4gICAgYi5vcHRpb25zLnJldHJ5RGVsYXkvMUUzK1wiIHNlY29uZChzKSAtIGF0dGVtcHQgXCIrYi5yZXRyeUNvdW50K1wiIG9mIFwiK2Iub3B0aW9ucy5tYXhSZXRyaWVzK1wiLlwiLHtkZWxheTpiLm9wdGlvbnMucmV0cnlEZWxheSxyZXRyaWVzOmIucmV0cnlDb3VudCxtYXhyZXRyaWVzOmIub3B0aW9ucy5tYXhSZXRyaWVzfSkpPyhhLl9kZWJ1Z2Nvbm5lY3QmJmNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB1bnJlYWNoYWJsZSAtIHJldHJ5aW5nIHN0b3BwZWQgYnkgYXBwXCIpLGIub25IYW5ndXAoYS5DT05ORUNUSU9OX1JFVFJJRVNfRVhDRUVERUQsXCJOdW1iZXIgb2YgY29ubmVjdGlvbiByZXRyaWVzIGV4Y2VlZGVkLlwiKSk6KGEuX2RlYnVnY29ubmVjdCYmY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHVucmVhY2hhYmxlIC0gcmV0cnlpbmcgKFwiK2IucmV0cnlDb3VudCtcIikgLi5cIiksYy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YS5fY29ubmVjdChiKX0sYi5vcHRpb25zLnJldHJ5RGVsYXkpKTtlbHNlIGIub25IYW5ndXAoYS5DT05ORUNUSU9OX1JFVFJJRVNfRVhDRUVERUQsXG4gICAgICAgIFwiTnVtYmVyIG9mIGNvbm5lY3Rpb24gcmV0cmllcyBleGNlZWRlZC5cIik7YnJlYWs7Y2FzZSBhLkNPTk5FQ1RJT05fTE9TVDpiLnJldHJ5Q291bnQrPTE7aWYoYi5yZXRyeUNvdW50PD1iLm9wdGlvbnMubWF4UmV0cmllcykoZT1iLm9uSGFuZ3VwKGEuQ09OTkVDVElPTl9MT1NUX1NDSEVEVUxFRF9SRUNPTk5FQ1QsXCJDb25uZWN0aW9uIGxvc3QgLSBzY2hlZHVsZWQgXCIrYi5yZXRyeUNvdW50K1widGggcmVjb25uZWN0IHRvIG9jY3VyIGluIFwiK2Iub3B0aW9ucy5yZXRyeURlbGF5LzFFMytcIiBzZWNvbmQocykuXCIse2RlbGF5OmIub3B0aW9ucy5yZXRyeURlbGF5LHJldHJpZXM6Yi5yZXRyeUNvdW50LG1heHJldHJpZXM6Yi5vcHRpb25zLm1heFJldHJpZXN9KSk/KGEuX2RlYnVnY29ubmVjdCYmY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGxvc3QgLSByZXRyeWluZyBzdG9wcGVkIGJ5IGFwcFwiKSxiLm9uSGFuZ3VwKGEuQ09OTkVDVElPTl9SRVRSSUVTX0VYQ0VFREVELFwiQ29ubmVjdGlvbiBsb3N0LlwiKSk6XG4gICAgICAgIChhLl9kZWJ1Z2Nvbm5lY3QmJmNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBsb3N0IC0gcmV0cnlpbmcgKFwiK2IucmV0cnlDb3VudCtcIikgLi5cIiksYy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YS5fY29ubmVjdChiKX0sYi5vcHRpb25zLnJldHJ5RGVsYXkpKTtlbHNlIGIub25IYW5ndXAoYS5DT05ORUNUSU9OX1JFVFJJRVNfRVhDRUVERUQsXCJDb25uZWN0aW9uIGxvc3QuXCIpO2JyZWFrO2RlZmF1bHQ6dGhyb3dcInVuaGFuZGxlZCBjbG9zZSBjb2RlIGluIGFiLl9jb25uZWN0XCI7fX0sYi5vcHRpb25zKX07YS5jb25uZWN0PWZ1bmN0aW9uKGIsZCxjLGYpe3ZhciBlPXt9O2Uud3N1cmk9YjtlLm9wdGlvbnM9Zj9mOnt9O3ZvaWQgMD09PWUub3B0aW9ucy5yZXRyeURlbGF5JiYoZS5vcHRpb25zLnJldHJ5RGVsYXk9NUUzKTt2b2lkIDA9PT1lLm9wdGlvbnMubWF4UmV0cmllcyYmKGUub3B0aW9ucy5tYXhSZXRyaWVzPTEwKTt2b2lkIDA9PT1lLm9wdGlvbnMuc2tpcFN1YnByb3RvY29sQ2hlY2smJlxuKGUub3B0aW9ucy5za2lwU3VicHJvdG9jb2xDaGVjaz0hMSk7dm9pZCAwPT09ZS5vcHRpb25zLnNraXBTdWJwcm90b2NvbEFubm91bmNlJiYoZS5vcHRpb25zLnNraXBTdWJwcm90b2NvbEFubm91bmNlPSExKTtpZihkKWUub25Db25uZWN0PWQ7ZWxzZSB0aHJvd1wib25Db25uZWN0IGhhbmRsZXIgcmVxdWlyZWQhXCI7ZS5vbkhhbmd1cD1jP2M6ZnVuY3Rpb24oYixkLGMpe2EuX2RlYnVnY29ubmVjdCYmY29uc29sZS5sb2coYixkLGMpfTtlLmNvbm5lY3RzPTA7ZS5yZXRyeUNvdW50PTA7YS5fY29ubmVjdChlKX07YS5sYXVuY2g9ZnVuY3Rpb24oYixkLGMpe2EuY29ubmVjdChiLndzdXJpLGZ1bmN0aW9uKGMpeyFiLmFwcGtleXx8XCJcIj09PWIuYXBwa2V5P2MuYXV0aHJlcSgpLnRoZW4oZnVuY3Rpb24oKXtjLmF1dGgoKS50aGVuKGZ1bmN0aW9uKGIpe2Q/ZChjKTphLl9kZWJ1Z2Nvbm5lY3QmJmMubG9nKFwiU2Vzc2lvbiBvcGVuZWQuXCIpfSxjLmxvZyl9LGMubG9nKTpjLmF1dGhyZXEoYi5hcHBrZXksXG4gICAgYi5hcHBleHRyYSkudGhlbihmdW5jdGlvbihlKXt2YXIgZz1udWxsO1wiZnVuY3Rpb25cIj09PXR5cGVvZiBiLmFwcHNlY3JldD9nPWIuYXBwc2VjcmV0KGUpOihnPWEuZGVyaXZlS2V5KGIuYXBwc2VjcmV0LEpTT04ucGFyc2UoZSkuYXV0aGV4dHJhKSxnPWMuYXV0aHNpZ24oZSxnKSk7Yy5hdXRoKGcpLnRoZW4oZnVuY3Rpb24oYil7ZD9kKGMpOmEuX2RlYnVnY29ubmVjdCYmYy5sb2coXCJTZXNzaW9uIG9wZW5lZC5cIil9LGMubG9nKX0sYy5sb2cpfSxmdW5jdGlvbihiLGQsZyl7Yz9jKGIsZCxnKTphLl9kZWJ1Z2Nvbm5lY3QmJmEubG9nKFwiU2Vzc2lvbiBjbG9zZWQuXCIsYixkLGcpfSxiLnNlc3Npb25Db25maWcpfTtyZXR1cm4gYX0pO2FiLl9VQV9GSVJFRk9YPS8uKkZpcmVmb3hcXC8oWzAtOStdKikuKi87YWIuX1VBX0NIUk9NRT0vLipDaHJvbWVcXC8oWzAtOStdKikuKi87YWIuX1VBX0NIUk9NRUZSQU1FPS8uKmNocm9tZWZyYW1lXFwvKFswLTldKikuKi87YWIuX1VBX1dFQktJVD0vLipBcHBsZVdlYktpdFxcLyhbMC05Ky5dKil3Ki4qLzthYi5fVUFfV0VCT1M9Ly4qd2ViT1NcXC8oWzAtOSsuXSopdyouKi87YWIuX21hdGNoUmVnZXg9ZnVuY3Rpb24oYyxnKXt2YXIgYT1nLmV4ZWMoYyk7cmV0dXJuIGE/YVsxXTphfTtcbmFiLmxvb2t1cFdzU3VwcG9ydD1mdW5jdGlvbigpe3ZhciBjPW5hdmlnYXRvci51c2VyQWdlbnQ7aWYoLTE8Yy5pbmRleE9mKFwiTVNJRVwiKSl7aWYoLTE8Yy5pbmRleE9mKFwiTVNJRSAxMFwiKSlyZXR1cm5bITAsITAsITBdO2lmKC0xPGMuaW5kZXhPZihcImNocm9tZWZyYW1lXCIpKXt2YXIgZz1wYXJzZUludChhYi5fbWF0Y2hSZWdleChjLGFiLl9VQV9DSFJPTUVGUkFNRSkpO3JldHVybiAxNDw9Zz9bITAsITEsITBdOlshMSwhMSwhMV19aWYoLTE8Yy5pbmRleE9mKFwiTVNJRSA4XCIpfHwtMTxjLmluZGV4T2YoXCJNU0lFIDlcIikpcmV0dXJuWyEwLCEwLCEwXX1lbHNle2lmKC0xPGMuaW5kZXhPZihcIkZpcmVmb3hcIikpe2lmKGc9cGFyc2VJbnQoYWIuX21hdGNoUmVnZXgoYyxhYi5fVUFfRklSRUZPWCkpKXtpZig3PD1nKXJldHVyblshMCwhMSwhMF07aWYoMzw9ZylyZXR1cm5bITAsITAsITBdfXJldHVyblshMSwhMSwhMF19aWYoLTE8Yy5pbmRleE9mKFwiU2FmYXJpXCIpJiYtMT09Yy5pbmRleE9mKFwiQ2hyb21lXCIpKXtpZihnPVxuICAgICAgICBhYi5fbWF0Y2hSZWdleChjLGFiLl9VQV9XRUJLSVQpKXJldHVybi0xPGMuaW5kZXhPZihcIldpbmRvd3NcIikmJlwiNTM0K1wiPT1nfHwtMTxjLmluZGV4T2YoXCJNYWNpbnRvc2hcIikmJihnPWcucmVwbGFjZShcIitcIixcIlwiKS5zcGxpdChcIi5cIiksNTM1PT1wYXJzZUludChnWzBdKSYmMjQ8PXBhcnNlSW50KGdbMV0pfHw1MzU8cGFyc2VJbnQoZ1swXSkpP1shMCwhMSwhMF06LTE8Yy5pbmRleE9mKFwid2ViT1NcIik/KGc9YWIuX21hdGNoUmVnZXgoYyxhYi5fVUFfV0VCT1MpLnNwbGl0KFwiLlwiKSwyPT1wYXJzZUludChnWzBdKT9bITEsITAsITBdOlshMSwhMSwhMV0pOlshMCwhMCwhMF19ZWxzZSBpZigtMTxjLmluZGV4T2YoXCJDaHJvbWVcIikpe2lmKGc9cGFyc2VJbnQoYWIuX21hdGNoUmVnZXgoYyxhYi5fVUFfQ0hST01FKSkpcmV0dXJuIDE0PD1nP1shMCwhMSwhMF06NDw9Zz9bITAsITAsITBdOlshMSwhMSwhMF19ZWxzZSBpZigtMTxjLmluZGV4T2YoXCJBbmRyb2lkXCIpKXtpZigtMTxjLmluZGV4T2YoXCJGaXJlZm94XCIpfHxcbiAgICAtMTxjLmluZGV4T2YoXCJDck1vXCIpKXJldHVyblshMCwhMSwhMF07aWYoLTE8Yy5pbmRleE9mKFwiT3BlcmFcIikpcmV0dXJuWyExLCExLCEwXTtpZigtMTxjLmluZGV4T2YoXCJDck1vXCIpKXJldHVyblshMCwhMCwhMF19ZWxzZSBpZigtMTxjLmluZGV4T2YoXCJpUGhvbmVcIil8fC0xPGMuaW5kZXhPZihcImlQYWRcIil8fC0xPGMuaW5kZXhPZihcImlQb2RcIikpcmV0dXJuWyExLCExLCEwXX1yZXR1cm5bITEsITEsITFdfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92ZW5kb3IvZ29zL3dlYi1zb2NrZXQtYnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvanMvdmVuZG9yL2F1dG9iYWhuLm1pbi5qcyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIHZlcnR4IChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9