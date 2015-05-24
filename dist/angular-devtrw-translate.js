/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(1);
	
	__webpack_require__(1);
	
	__webpack_require__(1);
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _translateBaseDirective = __webpack_require__(2);
	
	var _translateBaseDirective2 = _interopRequireDefault(_translateBaseDirective);
	
	var _translateChildDirective = __webpack_require__(3);
	
	var _translateChildDirective2 = _interopRequireDefault(_translateChildDirective);
	
	var _translateProvider = __webpack_require__(4);
	
	var _translateProvider2 = _interopRequireDefault(_translateProvider);
	
	var ngModule = _angular2['default'].module('dtrw.translate', ['dtrw.filters.hyphenated-to-camel-case', 'pascalprecht.translate', 'ui.router']);
	
	ngModule.directive('translateBase', _translateBaseDirective2['default']).directive('translateChild', _translateChildDirective2['default']).provider('dtrwTranslate', _translateProvider2['default']);
	
	exports['default'] = ngModule;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function dtrwTranslateBaseDirective($translate) {
	  return {
	    restrict: 'A',
	    controller: function controller() {
	      var ctrl = this;
	      var baseKey = undefined;
	
	      function getTranslationKey(childKey) {
	        return [baseKey, childKey].join('.');
	      }
	
	      function setBaseKey(key) {
	        baseKey = key;
	      }
	
	      function translate(key, params) {
	        return $translate.instant(getTranslationKey(key), params);
	      }
	
	      angular.extend(ctrl, {
	        getTranslationKey: getTranslationKey,
	        setBaseKey: setBaseKey,
	        translate: translate
	      });
	    },
	    compile: function compile() {
	      return {
	        // using pre-link to ensure that the base key is set
	        // before the translate-child directive requests it
	        pre: function preLink(scope, element, attrs, controller) {
	          var baseKey = attrs.translateBase;
	          var parentBaseController = element.parent().controller('translateBase');
	
	          scope.translateBaseCtrl = controller;
	
	          if (parentBaseController) {
	            baseKey = parentBaseController.getTranslationKey(baseKey);
	          }
	
	          controller.setBaseKey(baseKey);
	        }
	      };
	    }
	  };
	}
	dtrwTranslateBaseDirective.$inject = ["$translate"];
	
	exports['default'] = /*@ngInject*/dtrwTranslateBaseDirective;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function dtrwTranslateChildDirective($compile, $translate) {
	
	  return {
	    restrict: 'A',
	    replace: false,
	    // Stop other directives from running (they will be run with $compile is called)
	    terminal: true,
	    require: '^translateBase',
	    // Make sure this directive is run first
	    priority: 1000,
	    link: function link(scope, element, attrs, translateBaseCtrl) {
	      // jshint ignore:line
	      var translateChildInto = attrs.translateChildInto;
	      var translateChildKeyInto = attrs.translateChildKeyInto;
	      var translateValues = attrs.translateValues;
	
	      var translateKey = translateBaseCtrl.getTranslationKey(attrs.translateChild);
	
	      if (translateChildInto && translateChildKeyInto) {
	        throw new Error('translate-child-into and translate-child-key-into are mutually exclusive');
	      }
	
	      if (translateChildInto) {
	        translateValues = translateValues ? scope.$eval(translateValues) : {};
	        element.attr(translateChildInto, $translate.instant(translateKey, translateValues));
	      } else if (translateChildKeyInto) {
	        element.attr(translateChildKeyInto, translateKey);
	      } else {
	        element.attr('translate', translateKey);
	      }
	
	      element.removeAttr('translate-child'); //remove the attribute to avoid indefinite loop
	
	      $compile(element)(scope);
	    }
	  };
	}
	dtrwTranslateChildDirective.$inject = ["$compile", "$translate"];
	
	exports['default'] = /*@ngInject*/dtrwTranslateChildDirective;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	/**
	 * @name dtrw.translate.dtrwTranslateProvider
	 */
	function dtrwTranslateProvider() {
	  var baseTranslationKey = undefined;
	
	  /**
	   * @memberOf dtrw.translate.dtrwTranslateProvider
	   * @name setBaseTranslationKey
	   *
	   * @description
	   * Sets the base key prefixed to generated translations
	   *
	   * @param {string} key
	   */
	  function setBaseTranslationKey(key) {
	    baseTranslationKey = key;
	  }
	
	  /**
	   * @param $filter
	   * @param $state
	   * @returns {dtrw.translate.DtrwTranslate}
	   *
	   * @ngInject
	   */
	  function $get($filter, $state) {
	    /**
	     * @name dtrw.translate.dtrwTranslate
	     * @constructor
	     */
	    function DtrwTranslate() {
	      var dtrwTranslate = this;
	
	      /**
	       * @memberOf dtrw.translate.dtrwTranslate
	       * @name getStateKey
	       *
	       * @description
	       * Uses the configured base translation key as well as the
	       * current state to construct the full translation key for
	       * the passed in value
	       *
	       * @param {string} key
	       * @returns {string}
	       */
	      function getStateKey(key) {
	        var parts = baseTranslationKey ? [baseTranslationKey] : [];
	
	        parts.push.apply(parts, _toConsumableArray($state.current.name.split('.').map($filter('hyphenatedToCamelCase'))));
	        parts.push(key);
	
	        return parts.join('.');
	      }
	
	      _angular2['default'].extend(dtrwTranslate, {
	        getStateKey: getStateKey
	      });
	    }
	
	    return new DtrwTranslate();
	  }
	  $get.$inject = ["$filter", "$state"];
	
	  _angular2['default'].extend(this, {
	    $get: $get,
	    setBaseTranslationKey: setBaseTranslationKey
	  });
	}
	
	exports['default'] = /* @ngInject */dtrwTranslateProvider;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWYxYTlmM2FkMTk0NzI0YzU2NzEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1wcm92aWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O3FCQ3RDTyxDQUFtQjs7cUJBQ25CLENBQW1COztxQkFDbkIsQ0FBd0I7O29DQUVYLENBQVM7Ozs7bURBRVcsQ0FBNEI7Ozs7b0RBQzVCLENBQTZCOzs7OzhDQUM3QixDQUFzQjs7OztBQUU5RCxLQUFNLFFBQVEsR0FBRyxxQkFBUSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FDaEQsdUNBQXVDLEVBQ3ZDLHdCQUF3QixFQUN4QixXQUFXLENBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVEsQ0FDTCxTQUFTLENBQUMsZUFBZSxzQ0FBNkIsQ0FDdEQsU0FBUyxDQUFDLGdCQUFnQix1Q0FBOEIsQ0FDeEQsUUFBUSxDQUFDLGVBQWUsaUNBQXdCLENBQUM7O3NCQUVyQyxRQUFROzs7Ozs7O0FDckJ2QiwwQjs7Ozs7Ozs7Ozs7QUNBQSxVQUFTLDBCQUEwQixDQUFDLFVBQVUsRUFBRTtBQUM5QyxVQUFPO0FBQ0wsYUFBUSxFQUFJLEdBQUc7QUFDZixlQUFVLEVBQUUsc0JBQVk7QUFDdEIsV0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFdBQUksT0FBTyxhQUFDOztBQUVaLGdCQUFTLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtBQUNuQyxnQkFBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEM7O0FBRUQsZ0JBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixnQkFBTyxHQUFHLEdBQUcsQ0FBQztRQUNmOztBQUVELGdCQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQzlCLGdCQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0Q7O0FBRUQsY0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDbkIsMEJBQWlCLEVBQWpCLGlCQUFpQjtBQUNqQixtQkFBVSxFQUFWLFVBQVU7QUFDVixrQkFBUyxFQUFFLFNBQVM7UUFDckIsQ0FBQyxDQUFDO01BQ0o7QUFDRCxZQUFPLEVBQUssU0FBUyxPQUFPLEdBQUc7QUFDN0IsY0FBTzs7O0FBR0wsWUFBRyxFQUFFLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtBQUN2RCxlQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO0FBQ2xDLGVBQUksb0JBQW9CLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFeEUsZ0JBQUssQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7O0FBRXJDLGVBQUksb0JBQW9CLEVBQUU7QUFDeEIsb0JBQU8sR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRDs7QUFFRCxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztVQUNoQztRQUNGLENBQUM7TUFDSDtJQUNGLENBQUM7RUFDSDs7QUFFc0Q7Ozs7Ozs7Ozs7Ozs7QUM5Q3ZELFVBQVMsMkJBQTJCLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTs7QUFFekQsVUFBTztBQUNMLGFBQVEsRUFBRSxHQUFHO0FBQ2IsWUFBTyxFQUFHLEtBQUs7O0FBRWYsYUFBUSxFQUFFLElBQUk7QUFDZCxZQUFPLEVBQUUsZ0JBQWdCOztBQUV6QixhQUFRLEVBQUUsSUFBSTtBQUNkLFNBQUksRUFBTSxTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRTs7V0FDM0Qsa0JBQWtCLEdBQTRDLEtBQUssQ0FBbkUsa0JBQWtCO1dBQUUscUJBQXFCLEdBQXFCLEtBQUssQ0FBL0MscUJBQXFCO1dBQUUsZUFBZSxHQUFJLEtBQUssQ0FBeEIsZUFBZTs7QUFDL0QsV0FBSSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUU3RSxXQUFJLGtCQUFrQixJQUFJLHFCQUFxQixFQUFFO0FBQy9DLGVBQU0sSUFBSSxLQUFLLENBQUMsMEVBQTBFLENBQUMsQ0FBQztRQUM3Rjs7QUFFRCxXQUFJLGtCQUFrQixFQUFFO0FBQ3RCLHdCQUFlLEdBQUksZUFBZSxHQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3hFLGdCQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDckYsTUFBTSxJQUFJLHFCQUFxQixFQUFFO0FBQ2hDLGdCQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ25ELE1BQU07QUFDTCxnQkFBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekM7O0FBRUQsY0FBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUV0QyxlQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDMUI7SUFDRixDQUFDO0VBQ0g7O0FBRXVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NDbENwQyxDQUFTOzs7Ozs7O0FBSzdCLFVBQVMscUJBQXFCLEdBQUc7QUFDL0IsT0FBSSxrQkFBa0IsYUFBQzs7Ozs7Ozs7Ozs7QUFXdkIsWUFBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7QUFDbEMsdUJBQWtCLEdBQUcsR0FBRyxDQUFDO0lBQzFCOzs7Ozs7Ozs7QUFTRCxZQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFOzs7OztBQUs3QixjQUFTLGFBQWEsR0FBRztBQUN2QixXQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBY3pCLGdCQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7QUFDeEIsYUFBSSxLQUFLLEdBQUcsa0JBQWtCLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFM0QsY0FBSyxDQUFDLElBQUksT0FBVixLQUFLLHFCQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBQyxDQUFDO0FBQ3BGLGNBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWhCLGdCQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEI7O0FBRUQsNEJBQVEsTUFBTSxDQUFDLGFBQWEsRUFBRTtBQUM1QixvQkFBVyxFQUFYLFdBQVc7UUFDWixDQUFDLENBQUM7TUFDSjs7QUFFRCxZQUFPLElBQUksYUFBYSxFQUFFLENBQUM7SUFDNUI7O0FBRW9CO0FBQ25CLFNBQUksRUFBSixJQUFJO0FBQ0osZ0JBQXFCO0lBQ3RCLENBQUMsQ0FBQztFQUNKOztBQUVtRCIsImZpbGUiOiJhbmd1bGFyLWRldnRydy10cmFuc2xhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDVmMWE5ZjNhZDE5NDcyNGM1NjcxXG4gKiovIiwiaW1wb3J0ICdhbmd1bGFyLXRyYW5zbGF0ZSc7XG5pbXBvcnQgJ2FuZ3VsYXItdWktcm91dGVyJztcbmltcG9ydCAnYW5ndWxhci1kZXZ0cnctZmlsdGVycyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5pbXBvcnQgZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmUgIGZyb20gJy4vdHJhbnNsYXRlLWJhc2UtZGlyZWN0aXZlJztcbmltcG9ydCBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUgZnJvbSAnLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlJztcbmltcG9ydCBkdHJ3VHJhbnNsYXRlUHJvdmlkZXIgICAgICAgZnJvbSAnLi90cmFuc2xhdGUtcHJvdmlkZXInO1xuXG5jb25zdCBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdkdHJ3LnRyYW5zbGF0ZScsIFtcbiAgJ2R0cncuZmlsdGVycy5oeXBoZW5hdGVkLXRvLWNhbWVsLWNhc2UnLFxuICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXG4gICd1aS5yb3V0ZXInXG5dKTtcblxubmdNb2R1bGVcbiAgLmRpcmVjdGl2ZSgndHJhbnNsYXRlQmFzZScsIGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCd0cmFuc2xhdGVDaGlsZCcsIGR0cndUcmFuc2xhdGVDaGlsZERpcmVjdGl2ZSlcbiAgLnByb3ZpZGVyKCdkdHJ3VHJhbnNsYXRlJywgZHRyd1RyYW5zbGF0ZVByb3ZpZGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgbmdNb2R1bGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmUoJHRyYW5zbGF0ZSkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAgICdBJyxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY3RybCA9IHRoaXM7XG4gICAgICBsZXQgYmFzZUtleTtcblxuICAgICAgZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb25LZXkoY2hpbGRLZXkpIHtcbiAgICAgICAgcmV0dXJuIFtiYXNlS2V5LCBjaGlsZEtleV0uam9pbignLicpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRCYXNlS2V5KGtleSkge1xuICAgICAgICBiYXNlS2V5ID0ga2V5O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0cmFuc2xhdGUoa2V5LCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuICR0cmFuc2xhdGUuaW5zdGFudChnZXRUcmFuc2xhdGlvbktleShrZXkpLCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBhbmd1bGFyLmV4dGVuZChjdHJsLCB7XG4gICAgICAgIGdldFRyYW5zbGF0aW9uS2V5LFxuICAgICAgICBzZXRCYXNlS2V5LFxuICAgICAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21waWxlOiAgICBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gdXNpbmcgcHJlLWxpbmsgdG8gZW5zdXJlIHRoYXQgdGhlIGJhc2Uga2V5IGlzIHNldFxuICAgICAgICAvLyBiZWZvcmUgdGhlIHRyYW5zbGF0ZS1jaGlsZCBkaXJlY3RpdmUgcmVxdWVzdHMgaXRcbiAgICAgICAgcHJlOiBmdW5jdGlvbiBwcmVMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICAgIGxldCBiYXNlS2V5ID0gYXR0cnMudHJhbnNsYXRlQmFzZTtcbiAgICAgICAgICBsZXQgcGFyZW50QmFzZUNvbnRyb2xsZXIgPSBlbGVtZW50LnBhcmVudCgpLmNvbnRyb2xsZXIoJ3RyYW5zbGF0ZUJhc2UnKTtcblxuICAgICAgICAgIHNjb3BlLnRyYW5zbGF0ZUJhc2VDdHJsID0gY29udHJvbGxlcjtcblxuICAgICAgICAgIGlmIChwYXJlbnRCYXNlQ29udHJvbGxlcikge1xuICAgICAgICAgICAgYmFzZUtleSA9IHBhcmVudEJhc2VDb250cm9sbGVyLmdldFRyYW5zbGF0aW9uS2V5KGJhc2VLZXkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRyb2xsZXIuc2V0QmFzZUtleShiYXNlS2V5KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IC8qQG5nSW5qZWN0Ki8gZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi90cmFuc2xhdGUtYmFzZS1kaXJlY3RpdmUuanNcbiAqKi8iLCJmdW5jdGlvbiBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUoJGNvbXBpbGUsICR0cmFuc2xhdGUpIHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgcmVwbGFjZTogIGZhbHNlLFxuICAgIC8vIFN0b3Agb3RoZXIgZGlyZWN0aXZlcyBmcm9tIHJ1bm5pbmcgKHRoZXkgd2lsbCBiZSBydW4gd2l0aCAkY29tcGlsZSBpcyBjYWxsZWQpXG4gICAgdGVybWluYWw6IHRydWUsXG4gICAgcmVxdWlyZTogJ150cmFuc2xhdGVCYXNlJyxcbiAgICAvLyBNYWtlIHN1cmUgdGhpcyBkaXJlY3RpdmUgaXMgcnVuIGZpcnN0XG4gICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgbGluazogICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB0cmFuc2xhdGVCYXNlQ3RybCkgeyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICAgIGxldCB7dHJhbnNsYXRlQ2hpbGRJbnRvLCB0cmFuc2xhdGVDaGlsZEtleUludG8sIHRyYW5zbGF0ZVZhbHVlc30gPSBhdHRycztcbiAgICAgIGxldCB0cmFuc2xhdGVLZXkgPSB0cmFuc2xhdGVCYXNlQ3RybC5nZXRUcmFuc2xhdGlvbktleShhdHRycy50cmFuc2xhdGVDaGlsZCk7XG5cbiAgICAgIGlmICh0cmFuc2xhdGVDaGlsZEludG8gJiYgdHJhbnNsYXRlQ2hpbGRLZXlJbnRvKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndHJhbnNsYXRlLWNoaWxkLWludG8gYW5kIHRyYW5zbGF0ZS1jaGlsZC1rZXktaW50byBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2xhdGVDaGlsZEludG8pIHtcbiAgICAgICAgdHJhbnNsYXRlVmFsdWVzID0gKHRyYW5zbGF0ZVZhbHVlcykgPyBzY29wZS4kZXZhbCh0cmFuc2xhdGVWYWx1ZXMpIDoge307XG4gICAgICAgIGVsZW1lbnQuYXR0cih0cmFuc2xhdGVDaGlsZEludG8sICR0cmFuc2xhdGUuaW5zdGFudCh0cmFuc2xhdGVLZXksIHRyYW5zbGF0ZVZhbHVlcykpO1xuICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGVDaGlsZEtleUludG8pIHtcbiAgICAgICAgZWxlbWVudC5hdHRyKHRyYW5zbGF0ZUNoaWxkS2V5SW50bywgdHJhbnNsYXRlS2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuYXR0cigndHJhbnNsYXRlJywgdHJhbnNsYXRlS2V5KTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyKCd0cmFuc2xhdGUtY2hpbGQnKTsgLy9yZW1vdmUgdGhlIGF0dHJpYnV0ZSB0byBhdm9pZCBpbmRlZmluaXRlIGxvb3BcblxuICAgICAgJGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgLypAbmdJbmplY3QqLyBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbi8qKlxuICogQG5hbWUgZHRydy50cmFuc2xhdGUuZHRyd1RyYW5zbGF0ZVByb3ZpZGVyXG4gKi9cbmZ1bmN0aW9uIGR0cndUcmFuc2xhdGVQcm92aWRlcigpIHtcbiAgbGV0IGJhc2VUcmFuc2xhdGlvbktleTtcblxuICAvKipcbiAgICogQG1lbWJlck9mIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVQcm92aWRlclxuICAgKiBAbmFtZSBzZXRCYXNlVHJhbnNsYXRpb25LZXlcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFNldHMgdGhlIGJhc2Uga2V5IHByZWZpeGVkIHRvIGdlbmVyYXRlZCB0cmFuc2xhdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKi9cbiAgZnVuY3Rpb24gc2V0QmFzZVRyYW5zbGF0aW9uS2V5KGtleSkge1xuICAgIGJhc2VUcmFuc2xhdGlvbktleSA9IGtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gJGZpbHRlclxuICAgKiBAcGFyYW0gJHN0YXRlXG4gICAqIEByZXR1cm5zIHtkdHJ3LnRyYW5zbGF0ZS5EdHJ3VHJhbnNsYXRlfVxuICAgKlxuICAgKiBAbmdJbmplY3RcbiAgICovXG4gIGZ1bmN0aW9uICRnZXQoJGZpbHRlciwgJHN0YXRlKSB7XG4gICAgLyoqXG4gICAgICogQG5hbWUgZHRydy50cmFuc2xhdGUuZHRyd1RyYW5zbGF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIER0cndUcmFuc2xhdGUoKSB7XG4gICAgICBsZXQgZHRyd1RyYW5zbGF0ZSA9IHRoaXM7XG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlck9mIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVcbiAgICAgICAqIEBuYW1lIGdldFN0YXRlS2V5XG4gICAgICAgKlxuICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgKiBVc2VzIHRoZSBjb25maWd1cmVkIGJhc2UgdHJhbnNsYXRpb24ga2V5IGFzIHdlbGwgYXMgdGhlXG4gICAgICAgKiBjdXJyZW50IHN0YXRlIHRvIGNvbnN0cnVjdCB0aGUgZnVsbCB0cmFuc2xhdGlvbiBrZXkgZm9yXG4gICAgICAgKiB0aGUgcGFzc2VkIGluIHZhbHVlXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gZ2V0U3RhdGVLZXkoa2V5KSB7XG4gICAgICAgIGxldCBwYXJ0cyA9IGJhc2VUcmFuc2xhdGlvbktleSA/IFtiYXNlVHJhbnNsYXRpb25LZXldIDogW107XG5cbiAgICAgICAgcGFydHMucHVzaCguLi4kc3RhdGUuY3VycmVudC5uYW1lLnNwbGl0KCcuJykubWFwKCRmaWx0ZXIoJ2h5cGhlbmF0ZWRUb0NhbWVsQ2FzZScpKSk7XG4gICAgICAgIHBhcnRzLnB1c2goa2V5KTtcblxuICAgICAgICByZXR1cm4gcGFydHMuam9pbignLicpO1xuICAgICAgfVxuXG4gICAgICBhbmd1bGFyLmV4dGVuZChkdHJ3VHJhbnNsYXRlLCB7XG4gICAgICAgIGdldFN0YXRlS2V5XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IER0cndUcmFuc2xhdGUoKTtcbiAgfVxuXG4gIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICAkZ2V0LFxuICAgIHNldEJhc2VUcmFuc2xhdGlvbktleVxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgLyogQG5nSW5qZWN0ICovIGR0cndUcmFuc2xhdGVQcm92aWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3RyYW5zbGF0ZS1wcm92aWRlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=