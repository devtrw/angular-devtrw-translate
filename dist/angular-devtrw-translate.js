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
	          var translateBase = attrs.translateBase;
	          var translateExcludeParentBase = attrs.translateExcludeParentBase;
	
	          var parentBaseController = element.parent().controller('translateBase');
	
	          scope.translateBaseCtrl = controller;
	
	          if (parentBaseController && !translateExcludeParentBase) {
	            translateBase = parentBaseController.getTranslationKey(translateBase);
	          }
	
	          controller.setBaseKey(translateBase);
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
	    require: '?^^translateBase',
	    // Make sure this directive is run first
	    priority: 1000,
	    link: function link(scope, element, attrs, translateBaseCtrl) {
	      // jshint ignore:line
	      var translateChildInto = attrs.translateChildInto;
	      var translateChildKeyInto = attrs.translateChildKeyInto;
	      var translateValues = attrs.translateValues;
	
	      var translateKey = translateBaseCtrl ? translateBaseCtrl.getTranslationKey(attrs.translateChild) : 'COULD_NOT_FIND_TRANSLATE_BASE_CONTROLLER_FOR_CHILD-' + attrs.translateChild;
	
	      function setValueForAttrs(targetAttrs, value) {
	        targetAttrs.split(',').forEach(function (targetAttrs) {
	          element.attr(targetAttrs, value);
	        });
	      }
	
	      if (translateChildInto) {
	        translateValues = translateValues ? scope.$eval(translateValues) : {};
	        setValueForAttrs(translateChildInto, $translate.instant(translateKey, translateValues));
	      }
	
	      if (translateChildKeyInto) {
	        setValueForAttrs(translateChildKeyInto, translateKey);
	      }
	
	      if (!translateChildInto && !translateChildKeyInto) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWUwY2VjNzY5NmM5YzEyZjliZGMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1wcm92aWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O3FCQ3RDTyxDQUFtQjs7cUJBQ25CLENBQW1COztxQkFDbkIsQ0FBd0I7O29DQUVYLENBQVM7Ozs7bURBRVcsQ0FBNEI7Ozs7b0RBQzVCLENBQTZCOzs7OzhDQUM3QixDQUFzQjs7OztBQUU5RCxLQUFNLFFBQVEsR0FBRyxxQkFBUSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FDaEQsdUNBQXVDLEVBQ3ZDLHdCQUF3QixFQUN4QixXQUFXLENBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVEsQ0FDTCxTQUFTLENBQUMsZUFBZSxzQ0FBNkIsQ0FDdEQsU0FBUyxDQUFDLGdCQUFnQix1Q0FBOEIsQ0FDeEQsUUFBUSxDQUFDLGVBQWUsaUNBQXdCLENBQUM7O3NCQUVyQyxRQUFROzs7Ozs7O0FDckJ2QiwwQjs7Ozs7Ozs7Ozs7QUNBQSxVQUFTLDBCQUEwQixDQUFDLFVBQVUsRUFBRTtBQUM5QyxVQUFPO0FBQ0wsYUFBUSxFQUFJLEdBQUc7QUFDZixlQUFVLEVBQUUsc0JBQVk7QUFDdEIsV0FBSSxJQUFJLEdB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QkFBVyxFQUFYLFdBQVc7UUFDWixDQUFDLENBQUM7TUFDSjs7QUFFRCxZQUFPLElBQUksYUFBYSxFQUFFLENBQUM7SUFDNUI7O0FBRW9CO0FBQ25CLFNBQUksRUFBSixJQUFJO0FBQ0osZ0JBQXFCO0lBQ3RCLENBQUMsQ0FBQztFQUNKOztBQUVtRCIsImZpbGUiOiJhbmd1bGFyLWRldnRydy10cmFuc2xhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGFlMGNlYzc2OTZjOWMxMmY5YmRjXG4gKiovIiwiaW1wb3J0ICdhbmd1bGFyLXRyYW5zbGF0ZSc7XG5pbXBvcnQgJ2FuZ3VsYXItdWktcm91dGVyJztcbmltcG9ydCAnYW5ndWxhci1kZXZ0cnctZmlsdGVycyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5pbXBvcnQgZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmUgIGZyb20gJy4vdHJhbnNsYXRlLWJhc2UtZGlyZWN0aXZlJztcbmltcG9ydCBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUgZnJvbSAnLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlJztcbmltcG9ydCBkdHJ3VHJhbnNsYXRlUHJvdmlkZXIgICAgICAgZnJvbSAnLi90cmFuc2xhdGUtcHJvdmlkZXInO1xuXG5jb25zdCBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdkdHJ3LnRyYW5zbGF0ZScsIFtcbiAgJ2R0cncuZmlsdGVycy5oeXBoZW5hdGVkLXRvLWNhbWVsLWNhc2UnLFxuICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXG4gICd1aS5yb3V0ZXInXG5dKTtcblxubmdNb2R1bGVcbiAgLmRpcmVjdGl2ZSgndHJhbnNsYXRlQmFzZScsIGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCd0cmFuc2xhdGVDaGlsZCcsIGR0cndUcmFuc2xhdGVDaGlsZERpcmVjdGl2ZSlcbiAgLnByb3ZpZGVyKCdkdHJ3VHJhbnNsYXRlJywgZHRyd1RyYW5zbGF0ZVByb3ZpZGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgbmdNb2R1bGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmUoJHRyYW5zbGF0ZSkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAgICdBJyxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY3RybCA9IHRoaXM7XG4gICAgICBsZXQgYmFzZUtleTtcblxuICAgICAgZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb25LZXkoY2hpbGRLZXkpIHtcbiAgICAgICAgcmV0dXJuIFtiYXNlS2V5LCBjaGlsZEtleV0uam9pbignLicpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRCYXNlS2V5KGtleSkge1xuICAgICAgICBiYXNlS2V5ID0ga2V5O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0cmFuc2xhdGUoa2V5LCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuICR0cmFuc2xhdGUuaW5zdGFudChnZXRUcmFuc2xhdGlvbktleShrZXkpLCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBhbmd1bGFyLmV4dGVuZChjdHJsLCB7XG4gICAgICAgIGdldFRyYW5zbGF0aW9uS2V5LFxuICAgICAgICBzZXRCYXNlS2V5LFxuICAgICAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21waWxlOiAgICBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gdXNpbmcgcHJlLWxpbmsgdG8gZW5zdXJlIHRoYXQgdGhlIGJhc2Uga2V5IGlzIHNldFxuICAgICAgICAvLyBiZWZvcmUgdGhlIHRyYW5zbGF0ZS1jaGlsZCBkaXJlY3RpdmUgcmVxdWVzdHMgaXRcbiAgICAgICAgcHJlOiBmdW5jdGlvbiBwcmVMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICAgIGxldCB7dHJhbnNsYXRlQmFzZSwgdHJhbnNsYXRlRXhjbHVkZVBhcmVudEJhc2V9ID0gYXR0cnM7XG4gICAgICAgICAgbGV0IHBhcmVudEJhc2VDb250cm9sbGVyID0gZWxlbWVudC5wYXJlbnQoKS5jb250cm9sbGVyKCd0cmFuc2xhdGVCYXNlJyk7XG5cbiAgICAgICAgICBzY29wZS50cmFuc2xhdGVCYXNlQ3RybCA9IGNvbnRyb2xsZXI7XG5cbiAgICAgICAgICBpZiAocGFyZW50QmFzZUNvbnRyb2xsZXIgJiYgIXRyYW5zbGF0ZUV4Y2x1ZGVQYXJlbnRCYXNlKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVCYXNlID0gcGFyZW50QmFzZUNvbnRyb2xsZXIuZ2V0VHJhbnNsYXRpb25LZXkodHJhbnNsYXRlQmFzZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udHJvbGxlci5zZXRCYXNlS2V5KHRyYW5zbGF0ZUJhc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgLypAbmdJbmplY3QqLyBkdHJ3VHJhbnNsYXRlQmFzZURpcmVjdGl2ZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZS5qc1xuICoqLyIsImZ1bmN0aW9uIGR0cndUcmFuc2xhdGVDaGlsZERpcmVjdGl2ZSgkY29tcGlsZSwgJHRyYW5zbGF0ZSkge1xuXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICByZXBsYWNlOiAgZmFsc2UsXG4gICAgLy8gU3RvcCBvdGhlciBkaXJlY3RpdmVzIGZyb20gcnVubmluZyAodGhleSB3aWxsIGJlIHJ1biB3aXRoICRjb21waWxlIGlzIGNhbGxlZClcbiAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICByZXF1aXJlOiAgJz9eXnRyYW5zbGF0ZUJhc2UnLFxuICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGRpcmVjdGl2ZSBpcyBydW4gZmlyc3RcbiAgICBwcmlvcml0eTogMTAwMCxcbiAgICBsaW5rOiAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIHRyYW5zbGF0ZUJhc2VDdHJsKSB7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgICAgbGV0IHt0cmFuc2xhdGVDaGlsZEludG8sIHRyYW5zbGF0ZUNoaWxkS2V5SW50bywgdHJhbnNsYXRlVmFsdWVzfSA9IGF0dHJzO1xuICAgICAgbGV0IHRyYW5zbGF0ZUtleSA9IHRyYW5zbGF0ZUJhc2VDdHJsID9cbiAgICAgICAgdHJhbnNsYXRlQmFzZUN0cmwuZ2V0VHJhbnNsYXRpb25LZXkoYXR0cnMudHJhbnNsYXRlQ2hpbGQpIDpcbiAgICAgICAgYENPVUxEX05PVF9GSU5EX1RSQU5TTEFURV9CQVNFX0NPTlRST0xMRVJfRk9SX0NISUxELSR7YXR0cnMudHJhbnNsYXRlQ2hpbGR9YDtcblxuICAgICAgZnVuY3Rpb24gc2V0VmFsdWVGb3JBdHRycyh0YXJnZXRBdHRycywgdmFsdWUpIHtcbiAgICAgICAgdGFyZ2V0QXR0cnNcbiAgICAgICAgICAuc3BsaXQoJywnKVxuICAgICAgICAgIC5mb3JFYWNoKCh0YXJnZXRBdHRycykgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5hdHRyKHRhcmdldEF0dHJzLCB2YWx1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2xhdGVDaGlsZEludG8pIHtcbiAgICAgICAgdHJhbnNsYXRlVmFsdWVzID0gKHRyYW5zbGF0ZVZhbHVlcykgPyBzY29wZS4kZXZhbCh0cmFuc2xhdGVWYWx1ZXMpIDoge307XG4gICAgICAgIHNldFZhbHVlRm9yQXR0cnModHJhbnNsYXRlQ2hpbGRJbnRvLCAkdHJhbnNsYXRlLmluc3RhbnQodHJhbnNsYXRlS2V5LCB0cmFuc2xhdGVWYWx1ZXMpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zbGF0ZUNoaWxkS2V5SW50bykge1xuICAgICAgICBzZXRWYWx1ZUZvckF0dHJzKHRyYW5zbGF0ZUNoaWxkS2V5SW50bywgdHJhbnNsYXRlS2V5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0cmFuc2xhdGVDaGlsZEludG8gJiYgIXRyYW5zbGF0ZUNoaWxkS2V5SW50bykge1xuICAgICAgICBlbGVtZW50LmF0dHIoJ3RyYW5zbGF0ZScsIHRyYW5zbGF0ZUtleSk7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cigndHJhbnNsYXRlLWNoaWxkJyk7IC8vcmVtb3ZlIHRoZSBhdHRyaWJ1dGUgdG8gYXZvaWQgaW5kZWZpbml0ZSBsb29wXG5cbiAgICAgICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IC8qQG5nSW5qZWN0Ki8gZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vdHJhbnNsYXRlLWNoaWxkLWRpcmVjdGl2ZS5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG4vKipcbiAqIEBuYW1lIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVQcm92aWRlclxuICovXG5mdW5jdGlvbiBkdHJ3VHJhbnNsYXRlUHJvdmlkZXIoKSB7XG4gIGxldCBiYXNlVHJhbnNsYXRpb25LZXk7XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJPZiBkdHJ3LnRyYW5zbGF0ZS5kdHJ3VHJhbnNsYXRlUHJvdmlkZXJcbiAgICogQG5hbWUgc2V0QmFzZVRyYW5zbGF0aW9uS2V5XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXRzIHRoZSBiYXNlIGtleSBwcmVmaXhlZCB0byBnZW5lcmF0ZWQgdHJhbnNsYXRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICovXG4gIGZ1bmN0aW9uIHNldEJhc2VUcmFuc2xhdGlvbktleShrZXkpIHtcbiAgICBiYXNlVHJhbnNsYXRpb25LZXkgPSBrZXk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtICRmaWx0ZXJcbiAgICogQHBhcmFtICRzdGF0ZVxuICAgKiBAcmV0dXJucyB7ZHRydy50cmFuc2xhdGUuRHRyd1RyYW5zbGF0ZX1cbiAgICpcbiAgICogQG5nSW5qZWN0XG4gICAqL1xuICBmdW5jdGlvbiAkZ2V0KCRmaWx0ZXIsICRzdGF0ZSkge1xuICAgIC8qKlxuICAgICAqIEBuYW1lIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEdHJ3VHJhbnNsYXRlKCkge1xuICAgICAgbGV0IGR0cndUcmFuc2xhdGUgPSB0aGlzO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJPZiBkdHJ3LnRyYW5zbGF0ZS5kdHJ3VHJhbnNsYXRlXG4gICAgICAgKiBAbmFtZSBnZXRTdGF0ZUtleVxuICAgICAgICpcbiAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICogVXNlcyB0aGUgY29uZmlndXJlZCBiYXNlIHRyYW5zbGF0aW9uIGtleSBhcyB3ZWxsIGFzIHRoZVxuICAgICAgICogY3VycmVudCBzdGF0ZSB0byBjb25zdHJ1Y3QgdGhlIGZ1bGwgdHJhbnNsYXRpb24ga2V5IGZvclxuICAgICAgICogdGhlIHBhc3NlZCBpbiB2YWx1ZVxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGdldFN0YXRlS2V5KGtleSkge1xuICAgICAgICBsZXQgcGFydHMgPSBiYXNlVHJhbnNsYXRpb25LZXkgPyBbYmFzZVRyYW5zbGF0aW9uS2V5XSA6IFtdO1xuXG4gICAgICAgIHBhcnRzLnB1c2goLi4uJHN0YXRlLmN1cnJlbnQubmFtZS5zcGxpdCgnLicpLm1hcCgkZmlsdGVyKCdoeXBoZW5hdGVkVG9DYW1lbENhc2UnKSkpO1xuICAgICAgICBwYXJ0cy5wdXNoKGtleSk7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oJy4nKTtcbiAgICAgIH1cblxuICAgICAgYW5ndWxhci5leHRlbmQoZHRyd1RyYW5zbGF0ZSwge1xuICAgICAgICBnZXRTdGF0ZUtleVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEdHJ3VHJhbnNsYXRlKCk7XG4gIH1cblxuICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgJGdldCxcbiAgICBzZXRCYXNlVHJhbnNsYXRpb25LZXlcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IC8qIEBuZ0luamVjdCAqLyBkdHJ3VHJhbnNsYXRlUHJvdmlkZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi90cmFuc2xhdGUtcHJvdmlkZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9