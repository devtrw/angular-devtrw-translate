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
	    if (!baseTranslationKey) {
	      throw new Error('Expected base translation key is not set. ' + 'This can be set by calling dtrwTranslateProvider#setBaseTranslationKey()');
	    }
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
	        var parts = [baseTranslationKey];
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2E3MDIyZWRkNWI1NmQyZjg4OWYiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1wcm92aWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O3FCQ3RDTyxDQUFtQjs7cUJBQ25CLENBQW1COztxQkFDbkIsQ0FBd0I7O29DQUVYLENBQVM7Ozs7bURBRVcsQ0FBNEI7Ozs7b0RBQzVCLENBQTZCOzs7OzhDQUM3QixDQUFzQjs7OztBQUU5RCxLQUFNLFFBQVEsR0FBRyxxQkFBUSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FDaEQsdUNBQXVDLEVBQ3ZDLHdCQUF3QixFQUN4QixXQUFXLENBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVEsQ0FDTCxTQUFTLENBQUMsZUFBZSxzQ0FBNkIsQ0FDdEQsU0FBUyxDQUFDLGdCQUFnQix1Q0FBOEIsQ0FDeEQsUUFBUSxDQUFDLGVBQWUsaUNBQXdCLENBQUM7O3NCQUVyQyxRQUFROzs7Ozs7O0FDckJ2QiwwQjs7Ozs7Ozs7Ozs7QUNBQSxVQUFTLDBCQUEwQixDQUFDLFVBQVUsRUFBRTtBQUM5QyxVQUFPO0FBQ0wsYUFBUSxFQUFJLEdBQUc7QUFDZixlQUFVLEVBQUUsc0JBQVk7QUFDdEIsV0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFdBQUksT0FBTyxhQUFDOztBQUVaLGdCQUFTLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtBQUNuQyxnQkFBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEM7O0FBRUQsZ0JBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixnQkFBTyxHQUFHLEdBQUcsQ0FBQztRQUNmOztBQUVELGdCQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQzlCLGdCQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0Q7O0FBRUQsY0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDbkIsMEJBQWlCLEVBQWpCLGlCQUFpQjtBQUNqQixtQkFBVSxFQUFWLFVBQVU7QUFDVixrQkFBUyxFQUFFLFNBQVM7UUFDckIsQ0FBQyxDQUFDO01BQ0o7QUFDRCxZQUFPLEVBQUssU0FBUyxPQUFPLEdBQUc7QUFDN0IsY0FBTzs7O0FBR0wsWUFBRyxFQUFFLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtBQUN2RCxlQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO0FBQ2xDLGVBQUksb0JBQW9CLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFeEUsZ0JBQUssQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7O0FBRXJDLGVBQUksb0JBQW9CLEVBQUU7QUFDeEIsb0JBQU8sR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRDs7QUFFRCxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztVQUNoQztRQUNGLENBQUM7TUFDSDtJQUNGLENBQUM7RUFDSDs7QUFFc0Q7Ozs7Ozs7Ozs7Ozs7QUM5Q3ZELFVBQVMsMkJBQTJCLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRTs7QUFFekQsVUFBTztBQUNMLGFBQVEsRUFBRSxHQUFHO0FBQ2IsWUFBTyxFQUFHLEtBQUs7O0FBRWYsYUFBUSxFQUFFLElBQUk7QUFDZCxZQUFPLEVBQUUsZ0JBQWdCOztBQUV6QixhQUFRLEVBQUUsSUFBSTtBQUNkLFNBQUksRUFBTSxTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRTs7V0FDM0Qsa0JBQWtCLEdBQTRDLEtBQUssQ0FBbkUsa0JBQWtCO1dBQUUscUJBQXFCLEdBQXFCLEtBQUssQ0FBL0MscUJBQXFCO1dBQUUsZUFBZSxHQUFJLEtBQUssQ0FBeEIsZUFBZTs7QUFDL0QsV0FBSSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUU3RSxXQUFJLGtCQUFrQixJQUFJLHFCQUFxQixFQUFFO0FBQy9DLGVBQU0sSUFBSSxLQUFLLENBQUMsMEVBQTBFLENBQUMsQ0FBQztRQUM3Rjs7QUFFRCxXQUFJLGtCQUFrQixFQUFFO0FBQ3RCLHdCQUFlLEdBQUksZUFBZSxHQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3hFLGdCQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDckYsTUFBTSxJQUFJLHFCQUFxQixFQUFFO0FBQ2hDLGdCQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ25ELE1BQU07QUFDTCxnQkFBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekM7O0FBRUQsY0FBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUV0QyxlQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDMUI7SUFDRixDQUFDO0VBQ0g7O0FBRXVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NDbENwQyxDQUFTOzs7Ozs7O0FBSzdCLFVBQVMscUJBQXFCLEdBQUc7QUFDL0IsT0FBSSxrQkFBa0IsYUFBQzs7Ozs7Ozs7Ozs7QUFXdkIsWUFBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7QUFDbEMsdUJBQWtCLEdBQUcsR0FBRyxDQUFDO0lBQzFCOzs7Ozs7Ozs7QUFTRCxZQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQzdCLFNBQUksQ0FBQyxrQkFBa0IsRUFBRTtBQUN2QixhQUFNLElBQUksS0FBSyxDQUNiLDRDQUE0QyxHQUM1QywwRUFBMEUsQ0FDM0UsQ0FBQztNQUNIOzs7OztBQUtELGNBQVMsYUFBYSxHQUFHO0FBQ3ZCLFdBQUksYUFBYSxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFjekIsZ0JBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRTtBQUN4QixhQUFJLEtBQUssR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7O0FBRWpDLGNBQUssQ0FBQyxJQUFJLE9BQVYsS0FBSyxxQkFBUyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUMsQ0FBQztBQUNwRixjQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVoQixnQkFBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCOztBQUVELDRCQUFRLE1BQU0sQ0FBQyxhQUFhLEVBQUU7QUFDNUIsb0JBQVcsRUFBWCxXQUFXO1FBQ1osQ0FBQyxDQUFDO01BQ0o7O0FBRUQsWUFBTyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQzVCOztBQUVvQjtBQUNuQixTQUFJLEVBQUosSUFBSTtBQUNKLGdCQUFxQjtJQUN0QixDQUFDLENBQUM7RUFDSjs7QUFFbUQiLCJmaWxlIjoiYW5ndWxhci1kZXZ0cnctdHJhbnNsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjYTcwMjJlZGQ1YjU2ZDJmODg5ZlxuICoqLyIsImltcG9ydCAnYW5ndWxhci10cmFuc2xhdGUnO1xuaW1wb3J0ICdhbmd1bGFyLXVpLXJvdXRlcic7XG5pbXBvcnQgJ2FuZ3VsYXItZGV2dHJ3LWZpbHRlcnMnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxuaW1wb3J0IGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlICBmcm9tICcuL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZSc7XG5pbXBvcnQgZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlIGZyb20gJy4vdHJhbnNsYXRlLWNoaWxkLWRpcmVjdGl2ZSc7XG5pbXBvcnQgZHRyd1RyYW5zbGF0ZVByb3ZpZGVyICAgICAgIGZyb20gJy4vdHJhbnNsYXRlLXByb3ZpZGVyJztcblxuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZHRydy50cmFuc2xhdGUnLCBbXG4gICdkdHJ3LmZpbHRlcnMuaHlwaGVuYXRlZC10by1jYW1lbC1jYXNlJyxcbiAgJ3Bhc2NhbHByZWNodC50cmFuc2xhdGUnLFxuICAndWkucm91dGVyJ1xuXSk7XG5cbm5nTW9kdWxlXG4gIC5kaXJlY3RpdmUoJ3RyYW5zbGF0ZUJhc2UnLCBkdHJ3VHJhbnNsYXRlQmFzZURpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgndHJhbnNsYXRlQ2hpbGQnLCBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUpXG4gIC5wcm92aWRlcignZHRyd1RyYW5zbGF0ZScsIGR0cndUcmFuc2xhdGVQcm92aWRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IG5nTW9kdWxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlKCR0cmFuc2xhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogICAnQScsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGN0cmwgPSB0aGlzO1xuICAgICAgbGV0IGJhc2VLZXk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldFRyYW5zbGF0aW9uS2V5KGNoaWxkS2V5KSB7XG4gICAgICAgIHJldHVybiBbYmFzZUtleSwgY2hpbGRLZXldLmpvaW4oJy4nKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0QmFzZUtleShrZXkpIHtcbiAgICAgICAgYmFzZUtleSA9IGtleTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdHJhbnNsYXRlKGtleSwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiAkdHJhbnNsYXRlLmluc3RhbnQoZ2V0VHJhbnNsYXRpb25LZXkoa2V5KSwgcGFyYW1zKTtcbiAgICAgIH1cblxuICAgICAgYW5ndWxhci5leHRlbmQoY3RybCwge1xuICAgICAgICBnZXRUcmFuc2xhdGlvbktleSxcbiAgICAgICAgc2V0QmFzZUtleSxcbiAgICAgICAgdHJhbnNsYXRlOiB0cmFuc2xhdGVcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcGlsZTogICAgZnVuY3Rpb24gY29tcGlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC8vIHVzaW5nIHByZS1saW5rIHRvIGVuc3VyZSB0aGF0IHRoZSBiYXNlIGtleSBpcyBzZXRcbiAgICAgICAgLy8gYmVmb3JlIHRoZSB0cmFuc2xhdGUtY2hpbGQgZGlyZWN0aXZlIHJlcXVlc3RzIGl0XG4gICAgICAgIHByZTogZnVuY3Rpb24gcHJlTGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICBsZXQgYmFzZUtleSA9IGF0dHJzLnRyYW5zbGF0ZUJhc2U7XG4gICAgICAgICAgbGV0IHBhcmVudEJhc2VDb250cm9sbGVyID0gZWxlbWVudC5wYXJlbnQoKS5jb250cm9sbGVyKCd0cmFuc2xhdGVCYXNlJyk7XG5cbiAgICAgICAgICBzY29wZS50cmFuc2xhdGVCYXNlQ3RybCA9IGNvbnRyb2xsZXI7XG5cbiAgICAgICAgICBpZiAocGFyZW50QmFzZUNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGJhc2VLZXkgPSBwYXJlbnRCYXNlQ29udHJvbGxlci5nZXRUcmFuc2xhdGlvbktleShiYXNlS2V5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250cm9sbGVyLnNldEJhc2VLZXkoYmFzZUtleSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCAvKkBuZ0luamVjdCovIGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vdHJhbnNsYXRlLWJhc2UtZGlyZWN0aXZlLmpzXG4gKiovIiwiZnVuY3Rpb24gZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlKCRjb21waWxlLCAkdHJhbnNsYXRlKSB7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcGxhY2U6ICBmYWxzZSxcbiAgICAvLyBTdG9wIG90aGVyIGRpcmVjdGl2ZXMgZnJvbSBydW5uaW5nICh0aGV5IHdpbGwgYmUgcnVuIHdpdGggJGNvbXBpbGUgaXMgY2FsbGVkKVxuICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgIHJlcXVpcmU6ICdedHJhbnNsYXRlQmFzZScsXG4gICAgLy8gTWFrZSBzdXJlIHRoaXMgZGlyZWN0aXZlIGlzIHJ1biBmaXJzdFxuICAgIHByaW9yaXR5OiAxMDAwLFxuICAgIGxpbms6ICAgICBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgdHJhbnNsYXRlQmFzZUN0cmwpIHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgICBsZXQge3RyYW5zbGF0ZUNoaWxkSW50bywgdHJhbnNsYXRlQ2hpbGRLZXlJbnRvLCB0cmFuc2xhdGVWYWx1ZXN9ID0gYXR0cnM7XG4gICAgICBsZXQgdHJhbnNsYXRlS2V5ID0gdHJhbnNsYXRlQmFzZUN0cmwuZ2V0VHJhbnNsYXRpb25LZXkoYXR0cnMudHJhbnNsYXRlQ2hpbGQpO1xuXG4gICAgICBpZiAodHJhbnNsYXRlQ2hpbGRJbnRvICYmIHRyYW5zbGF0ZUNoaWxkS2V5SW50bykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RyYW5zbGF0ZS1jaGlsZC1pbnRvIGFuZCB0cmFuc2xhdGUtY2hpbGQta2V5LWludG8gYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHJhbnNsYXRlQ2hpbGRJbnRvKSB7XG4gICAgICAgIHRyYW5zbGF0ZVZhbHVlcyA9ICh0cmFuc2xhdGVWYWx1ZXMpID8gc2NvcGUuJGV2YWwodHJhbnNsYXRlVmFsdWVzKSA6IHt9O1xuICAgICAgICBlbGVtZW50LmF0dHIodHJhbnNsYXRlQ2hpbGRJbnRvLCAkdHJhbnNsYXRlLmluc3RhbnQodHJhbnNsYXRlS2V5LCB0cmFuc2xhdGVWYWx1ZXMpKTtcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNsYXRlQ2hpbGRLZXlJbnRvKSB7XG4gICAgICAgIGVsZW1lbnQuYXR0cih0cmFuc2xhdGVDaGlsZEtleUludG8sIHRyYW5zbGF0ZUtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LmF0dHIoJ3RyYW5zbGF0ZScsIHRyYW5zbGF0ZUtleSk7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cigndHJhbnNsYXRlLWNoaWxkJyk7IC8vcmVtb3ZlIHRoZSBhdHRyaWJ1dGUgdG8gYXZvaWQgaW5kZWZpbml0ZSBsb29wXG5cbiAgICAgICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IC8qQG5nSW5qZWN0Ki8gZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vdHJhbnNsYXRlLWNoaWxkLWRpcmVjdGl2ZS5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG4vKipcbiAqIEBuYW1lIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVQcm92aWRlclxuICovXG5mdW5jdGlvbiBkdHJ3VHJhbnNsYXRlUHJvdmlkZXIoKSB7XG4gIGxldCBiYXNlVHJhbnNsYXRpb25LZXk7XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJPZiBkdHJ3LnRyYW5zbGF0ZS5kdHJ3VHJhbnNsYXRlUHJvdmlkZXJcbiAgICogQG5hbWUgc2V0QmFzZVRyYW5zbGF0aW9uS2V5XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXRzIHRoZSBiYXNlIGtleSBwcmVmaXhlZCB0byBnZW5lcmF0ZWQgdHJhbnNsYXRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICovXG4gIGZ1bmN0aW9uIHNldEJhc2VUcmFuc2xhdGlvbktleShrZXkpIHtcbiAgICBiYXNlVHJhbnNsYXRpb25LZXkgPSBrZXk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtICRmaWx0ZXJcbiAgICogQHBhcmFtICRzdGF0ZVxuICAgKiBAcmV0dXJucyB7ZHRydy50cmFuc2xhdGUuRHRyd1RyYW5zbGF0ZX1cbiAgICpcbiAgICogQG5nSW5qZWN0XG4gICAqL1xuICBmdW5jdGlvbiAkZ2V0KCRmaWx0ZXIsICRzdGF0ZSkge1xuICAgIGlmICghYmFzZVRyYW5zbGF0aW9uS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdFeHBlY3RlZCBiYXNlIHRyYW5zbGF0aW9uIGtleSBpcyBub3Qgc2V0LiAnICtcbiAgICAgICAgJ1RoaXMgY2FuIGJlIHNldCBieSBjYWxsaW5nIGR0cndUcmFuc2xhdGVQcm92aWRlciNzZXRCYXNlVHJhbnNsYXRpb25LZXkoKSdcbiAgICAgICk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBuYW1lIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEdHJ3VHJhbnNsYXRlKCkge1xuICAgICAgbGV0IGR0cndUcmFuc2xhdGUgPSB0aGlzO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJPZiBkdHJ3LnRyYW5zbGF0ZS5kdHJ3VHJhbnNsYXRlXG4gICAgICAgKiBAbmFtZSBnZXRTdGF0ZUtleVxuICAgICAgICpcbiAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICogVXNlcyB0aGUgY29uZmlndXJlZCBiYXNlIHRyYW5zbGF0aW9uIGtleSBhcyB3ZWxsIGFzIHRoZVxuICAgICAgICogY3VycmVudCBzdGF0ZSB0byBjb25zdHJ1Y3QgdGhlIGZ1bGwgdHJhbnNsYXRpb24ga2V5IGZvclxuICAgICAgICogdGhlIHBhc3NlZCBpbiB2YWx1ZVxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGdldFN0YXRlS2V5KGtleSkge1xuICAgICAgICBsZXQgcGFydHMgPSBbYmFzZVRyYW5zbGF0aW9uS2V5XTtcblxuICAgICAgICBwYXJ0cy5wdXNoKC4uLiRzdGF0ZS5jdXJyZW50Lm5hbWUuc3BsaXQoJy4nKS5tYXAoJGZpbHRlcignaHlwaGVuYXRlZFRvQ2FtZWxDYXNlJykpKTtcbiAgICAgICAgcGFydHMucHVzaChrZXkpO1xuXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKCcuJyk7XG4gICAgICB9XG5cbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKGR0cndUcmFuc2xhdGUsIHtcbiAgICAgICAgZ2V0U3RhdGVLZXlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRHRyd1RyYW5zbGF0ZSgpO1xuICB9XG5cbiAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICRnZXQsXG4gICAgc2V0QmFzZVRyYW5zbGF0aW9uS2V5XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCAvKiBAbmdJbmplY3QgKi8gZHRyd1RyYW5zbGF0ZVByb3ZpZGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vdHJhbnNsYXRlLXByb3ZpZGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==