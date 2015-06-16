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
	
	  function setValueForAttrs(element, targetAttrs, value) {
	    targetAttrs.forEach(function (targetAttr) {
	      // allow directly setting the content of an element, essentially the same as using
	      // the translate filter within the element
	      if ('content' === targetAttr) {
	        element.html(value);
	      } else {
	        element.attr(targetAttr, value);
	      }
	    });
	  }
	
	  function parseTranslateChildAttributes(configString) {
	    var keyAttributes = [];
	    var valueAttributes = [];
	    var attributes = configString.replace(/[\[\]\(\)\s]+/g, '') // remove parenthesis, brackets, an spaces
	    .split(',');
	
	    attributes.forEach(function (attributeName) {
	      // attribute names prefixed with ! signifies that the translation key should be
	      // set instead of the translated value
	      if ('!' === attributeName.charAt(0)) {
	        keyAttributes.push(attributeName.substr(1));
	      } else {
	        valueAttributes.push(attributeName);
	      }
	    });
	
	    return [keyAttributes, valueAttributes];
	  }
	
	  function parseTranslateChildAttr(attribute) {
	    var parts = attribute.split('=');
	
	    // by default we just set the translation key on the `translate` attributes
	    if (1 === parts.length) {
	      return {
	        translateKey: parts[0],
	        keyAttributes: ['translate'],
	        valueAttributes: []
	      };
	    }
	
	    var parsedAttributes = parseTranslateChildAttributes(parts[0]);
	
	    return {
	      translateKey: parts[1],
	      keyAttributes: parsedAttributes[0],
	      valueAttributes: parsedAttributes[1]
	    };
	  }
	
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
	
	      var _parseTranslateChildAttr = parseTranslateChildAttr(attrs.translateChild);
	
	      var translateKey = _parseTranslateChildAttr.translateKey;
	      var keyAttributes = _parseTranslateChildAttr.keyAttributes;
	      var valueAttributes = _parseTranslateChildAttr.valueAttributes;
	
	      translateKey = translateBaseCtrl ? translateBaseCtrl.getTranslationKey(translateKey) : 'COULD_NOT_FIND_TRANSLATE_BASE_CONTROLLER_FOR_CHILD-' + translateKey;
	
	      if (0 < keyAttributes.length) {
	        setValueForAttrs(element, keyAttributes, translateKey);
	      }
	
	      if (0 < valueAttributes.length) {
	        var translateValues = attrs.translateValues ? scope.$eval(attrs.translateValues) : {};
	        setValueForAttrs(element, valueAttributes, $translate.instant(translateKey, translateValues));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2RiYTM5YjdlOTM0YjA0NzExNjEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1wcm92aWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O3FCQ3RDTyxDQUFtQjs7cUJBQ25CLENBQW1COztxQkFDbkIsQ0FBd0I7O29DQUVYLENBQVM7Ozs7bURBRVcsQ0FBNEI7Ozs7b0RBQzVCLENBQTZCOzs7OzhDQUM3QixDQUFzQjs7OztBQUU5RCxLQUFNLFFBQVEsR0FBRyxxQkFBUSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FDaEQsdUNBQXVDLEVBQ3ZDLHdCQUF3QixFQUN4QixXQUFXLENBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVEsQ0FDTCxTQUFTLENBQUMsZUFBZSxzQ0FBNkIsQ0FDdEQsU0FBUyxDQUFDLGdCQUFnQix1Q0FBOEIsQ0FDeEQsUUFBUSxDQUFDLGVBQWUsaUNBQXdCLENBQUM7O3NCQUVyQyxRQUFROzs7Ozs7O0FDckJ2QiwwQjs7Ozs7Ozs7Ozs7QUNBQSxVQUFTLDBCQUEwQixDQUFDLFVBQVUsRUFBRTtBQUM5QyxVQUFPO0FBQ0wsYUFBUSxFQUFJLEdBQUc7QUFDZixlQUFVLEVBQUUsc0JBQVk7QUFDdEIsV0FBSSxJQUFJLEdB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Q0FBQyxDQUFDO1FBQ3hCOztBQUVELDRCQUFRLE1BQU0sQ0FBQyxhQUFhLEVBQUU7QUFDNUIsb0JBQVcsRUFBWCxXQUFXO1FBQ1osQ0FBQyxDQUFDO01BQ0o7O0FBRUQsWUFBTyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQzVCOztBQUVvQjtBQUNuQixTQUFJLEVBQUosSUFBSTtBQUNKLGdCQUFxQjtJQUN0QixDQUFDLENBQUM7RUFDSjs7QUFFbUQiLCJmaWxlIjoiYW5ndWxhci1kZXZ0cnctdHJhbnNsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZGJhMzliN2U5MzRiMDQ3MTE2MVxuICoqLyIsImltcG9ydCAnYW5ndWxhci10cmFuc2xhdGUnO1xuaW1wb3J0ICdhbmd1bGFyLXVpLXJvdXRlcic7XG5pbXBvcnQgJ2FuZ3VsYXItZGV2dHJ3LWZpbHRlcnMnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxuaW1wb3J0IGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlICBmcm9tICcuL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZSc7XG5pbXBvcnQgZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlIGZyb20gJy4vdHJhbnNsYXRlLWNoaWxkLWRpcmVjdGl2ZSc7XG5pbXBvcnQgZHRyd1RyYW5zbGF0ZVByb3ZpZGVyICAgICAgIGZyb20gJy4vdHJhbnNsYXRlLXByb3ZpZGVyJztcblxuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZHRydy50cmFuc2xhdGUnLCBbXG4gICdkdHJ3LmZpbHRlcnMuaHlwaGVuYXRlZC10by1jYW1lbC1jYXNlJyxcbiAgJ3Bhc2NhbHByZWNodC50cmFuc2xhdGUnLFxuICAndWkucm91dGVyJ1xuXSk7XG5cbm5nTW9kdWxlXG4gIC5kaXJlY3RpdmUoJ3RyYW5zbGF0ZUJhc2UnLCBkdHJ3VHJhbnNsYXRlQmFzZURpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgndHJhbnNsYXRlQ2hpbGQnLCBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUpXG4gIC5wcm92aWRlcignZHRyd1RyYW5zbGF0ZScsIGR0cndUcmFuc2xhdGVQcm92aWRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IG5nTW9kdWxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlKCR0cmFuc2xhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogICAnQScsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGN0cmwgPSB0aGlzO1xuICAgICAgbGV0IGJhc2VLZXk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldFRyYW5zbGF0aW9uS2V5KGNoaWxkS2V5KSB7XG4gICAgICAgIHJldHVybiBbYmFzZUtleSwgY2hpbGRLZXldLmpvaW4oJy4nKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0QmFzZUtleShrZXkpIHtcbiAgICAgICAgYmFzZUtleSA9IGtleTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdHJhbnNsYXRlKGtleSwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiAkdHJhbnNsYXRlLmluc3RhbnQoZ2V0VHJhbnNsYXRpb25LZXkoa2V5KSwgcGFyYW1zKTtcbiAgICAgIH1cblxuICAgICAgYW5ndWxhci5leHRlbmQoY3RybCwge1xuICAgICAgICBnZXRUcmFuc2xhdGlvbktleSxcbiAgICAgICAgc2V0QmFzZUtleSxcbiAgICAgICAgdHJhbnNsYXRlOiB0cmFuc2xhdGVcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcGlsZTogICAgZnVuY3Rpb24gY29tcGlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC8vIHVzaW5nIHByZS1saW5rIHRvIGVuc3VyZSB0aGF0IHRoZSBiYXNlIGtleSBpcyBzZXRcbiAgICAgICAgLy8gYmVmb3JlIHRoZSB0cmFuc2xhdGUtY2hpbGQgZGlyZWN0aXZlIHJlcXVlc3RzIGl0XG4gICAgICAgIHByZTogZnVuY3Rpb24gcHJlTGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICBsZXQge3RyYW5zbGF0ZUJhc2UsIHRyYW5zbGF0ZUV4Y2x1ZGVQYXJlbnRCYXNlfSA9IGF0dHJzO1xuICAgICAgICAgIGxldCBwYXJlbnRCYXNlQ29udHJvbGxlciA9IGVsZW1lbnQucGFyZW50KCkuY29udHJvbGxlcigndHJhbnNsYXRlQmFzZScpO1xuXG4gICAgICAgICAgc2NvcGUudHJhbnNsYXRlQmFzZUN0cmwgPSBjb250cm9sbGVyO1xuXG4gICAgICAgICAgaWYgKHBhcmVudEJhc2VDb250cm9sbGVyICYmICF0cmFuc2xhdGVFeGNsdWRlUGFyZW50QmFzZSkge1xuICAgICAgICAgICAgdHJhbnNsYXRlQmFzZSA9IHBhcmVudEJhc2VDb250cm9sbGVyLmdldFRyYW5zbGF0aW9uS2V5KHRyYW5zbGF0ZUJhc2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRyb2xsZXIuc2V0QmFzZUtleSh0cmFuc2xhdGVCYXNlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IC8qQG5nSW5qZWN0Ki8gZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi90cmFuc2xhdGUtYmFzZS1kaXJlY3RpdmUuanNcbiAqKi8iLCJmdW5jdGlvbiBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUoJGNvbXBpbGUsICR0cmFuc2xhdGUpIHtcblxuICBmdW5jdGlvbiBzZXRWYWx1ZUZvckF0dHJzKGVsZW1lbnQsIHRhcmdldEF0dHJzLCB2YWx1ZSkge1xuICAgIHRhcmdldEF0dHJzLmZvckVhY2goKHRhcmdldEF0dHIpID0+IHtcbiAgICAgIC8vIGFsbG93IGRpcmVjdGx5IHNldHRpbmcgdGhlIGNvbnRlbnQgb2YgYW4gZWxlbWVudCwgZXNzZW50aWFsbHkgdGhlIHNhbWUgYXMgdXNpbmdcbiAgICAgIC8vIHRoZSB0cmFuc2xhdGUgZmlsdGVyIHdpdGhpbiB0aGUgZWxlbWVudFxuICAgICAgaWYgKCdjb250ZW50JyA9PT0gdGFyZ2V0QXR0cikge1xuICAgICAgICBlbGVtZW50Lmh0bWwodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5hdHRyKHRhcmdldEF0dHIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlVHJhbnNsYXRlQ2hpbGRBdHRyaWJ1dGVzKGNvbmZpZ1N0cmluZykge1xuICAgIGxldCBrZXlBdHRyaWJ1dGVzID0gW107XG4gICAgbGV0IHZhbHVlQXR0cmlidXRlcyA9IFtdO1xuICAgIGxldCBhdHRyaWJ1dGVzID0gY29uZmlnU3RyaW5nXG4gICAgICAucmVwbGFjZSgvW1xcW1xcXVxcKFxcKVxcc10rL2csICcnKSAvLyByZW1vdmUgcGFyZW50aGVzaXMsIGJyYWNrZXRzLCBhbiBzcGFjZXNcbiAgICAgIC5zcGxpdCgnLCcpO1xuXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAvLyBhdHRyaWJ1dGUgbmFtZXMgcHJlZml4ZWQgd2l0aCAhIHNpZ25pZmllcyB0aGF0IHRoZSB0cmFuc2xhdGlvbiBrZXkgc2hvdWxkIGJlXG4gICAgICAvLyBzZXQgaW5zdGVhZCBvZiB0aGUgdHJhbnNsYXRlZCB2YWx1ZVxuICAgICAgaWYgKCchJyA9PT0gYXR0cmlidXRlTmFtZS5jaGFyQXQoMCkpIHtcbiAgICAgICAga2V5QXR0cmlidXRlcy5wdXNoKGF0dHJpYnV0ZU5hbWUuc3Vic3RyKDEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlQXR0cmlidXRlcy5wdXNoKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFtrZXlBdHRyaWJ1dGVzLCB2YWx1ZUF0dHJpYnV0ZXNdO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VUcmFuc2xhdGVDaGlsZEF0dHIoYXR0cmlidXRlKSB7XG4gICAgbGV0IHBhcnRzID0gYXR0cmlidXRlLnNwbGl0KCc9Jyk7XG5cbiAgICAvLyBieSBkZWZhdWx0IHdlIGp1c3Qgc2V0IHRoZSB0cmFuc2xhdGlvbiBrZXkgb24gdGhlIGB0cmFuc2xhdGVgIGF0dHJpYnV0ZXNcbiAgICBpZiAoMSA9PT0gcGFydHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2xhdGVLZXk6ICAgIHBhcnRzWzBdLFxuICAgICAgICBrZXlBdHRyaWJ1dGVzOiAgIFsndHJhbnNsYXRlJ10sXG4gICAgICAgIHZhbHVlQXR0cmlidXRlczogW11cbiAgICAgIH07XG4gICAgfVxuXG4gICAgbGV0IHBhcnNlZEF0dHJpYnV0ZXMgPSBwYXJzZVRyYW5zbGF0ZUNoaWxkQXR0cmlidXRlcyhwYXJ0c1swXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHJhbnNsYXRlS2V5OiAgICBwYXJ0c1sxXSxcbiAgICAgIGtleUF0dHJpYnV0ZXM6ICAgcGFyc2VkQXR0cmlidXRlc1swXSxcbiAgICAgIHZhbHVlQXR0cmlidXRlczogcGFyc2VkQXR0cmlidXRlc1sxXVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgcmVwbGFjZTogIGZhbHNlLFxuICAgIC8vIFN0b3Agb3RoZXIgZGlyZWN0aXZlcyBmcm9tIHJ1bm5pbmcgKHRoZXkgd2lsbCBiZSBydW4gd2l0aCAkY29tcGlsZSBpcyBjYWxsZWQpXG4gICAgdGVybWluYWw6IHRydWUsXG4gICAgcmVxdWlyZTogICc/Xl50cmFuc2xhdGVCYXNlJyxcbiAgICAvLyBNYWtlIHN1cmUgdGhpcyBkaXJlY3RpdmUgaXMgcnVuIGZpcnN0XG4gICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgbGluazogICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB0cmFuc2xhdGVCYXNlQ3RybCkgeyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICAgIGxldCB7XG4gICAgICAgIHRyYW5zbGF0ZUtleSxcbiAgICAgICAga2V5QXR0cmlidXRlcyxcbiAgICAgICAgdmFsdWVBdHRyaWJ1dGVzXG4gICAgICAgIH0gPSBwYXJzZVRyYW5zbGF0ZUNoaWxkQXR0cihhdHRycy50cmFuc2xhdGVDaGlsZCk7XG5cbiAgICAgIHRyYW5zbGF0ZUtleSA9IHRyYW5zbGF0ZUJhc2VDdHJsID9cbiAgICAgICAgdHJhbnNsYXRlQmFzZUN0cmwuZ2V0VHJhbnNsYXRpb25LZXkodHJhbnNsYXRlS2V5KSA6XG4gICAgICAgIGBDT1VMRF9OT1RfRklORF9UUkFOU0xBVEVfQkFTRV9DT05UUk9MTEVSX0ZPUl9DSElMRC0ke3RyYW5zbGF0ZUtleX1gO1xuXG4gICAgICBpZiAoMCA8IGtleUF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIHNldFZhbHVlRm9yQXR0cnMoZWxlbWVudCwga2V5QXR0cmlidXRlcywgdHJhbnNsYXRlS2V5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKDAgPCB2YWx1ZUF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGVWYWx1ZXMgPSAoYXR0cnMudHJhbnNsYXRlVmFsdWVzKSA/IHNjb3BlLiRldmFsKGF0dHJzLnRyYW5zbGF0ZVZhbHVlcykgOiB7fTtcbiAgICAgICAgc2V0VmFsdWVGb3JBdHRycyhcbiAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgIHZhbHVlQXR0cmlidXRlcyxcbiAgICAgICAgICAkdHJhbnNsYXRlLmluc3RhbnQodHJhbnNsYXRlS2V5LCB0cmFuc2xhdGVWYWx1ZXMpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cigndHJhbnNsYXRlLWNoaWxkJyk7IC8vcmVtb3ZlIHRoZSBhdHRyaWJ1dGUgdG8gYXZvaWQgaW5kZWZpbml0ZSBsb29wXG5cbiAgICAgICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IC8qQG5nSW5qZWN0Ki8gZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vdHJhbnNsYXRlLWNoaWxkLWRpcmVjdGl2ZS5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG4vKipcbiAqIEBuYW1lIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVQcm92aWRlclxuICovXG5mdW5jdGlvbiBkdHJ3VHJhbnNsYXRlUHJvdmlkZXIoKSB7XG4gIGxldCBiYXNlVHJhbnNsYXRpb25LZXk7XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJPZiBkdHJ3LnRyYW5zbGF0ZS5kdHJ3VHJhbnNsYXRlUHJvdmlkZXJcbiAgICogQG5hbWUgc2V0QmFzZVRyYW5zbGF0aW9uS2V5XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXRzIHRoZSBiYXNlIGtleSBwcmVmaXhlZCB0byBnZW5lcmF0ZWQgdHJhbnNsYXRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICovXG4gIGZ1bmN0aW9uIHNldEJhc2VUcmFuc2xhdGlvbktleShrZXkpIHtcbiAgICBiYXNlVHJhbnNsYXRpb25LZXkgPSBrZXk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtICRmaWx0ZXJcbiAgICogQHBhcmFtICRzdGF0ZVxuICAgKiBAcmV0dXJucyB7ZHRydy50cmFuc2xhdGUuRHRyd1RyYW5zbGF0ZX1cbiAgICpcbiAgICogQG5nSW5qZWN0XG4gICAqL1xuICBmdW5jdGlvbiAkZ2V0KCRmaWx0ZXIsICRzdGF0ZSkge1xuICAgIC8qKlxuICAgICAqIEBuYW1lIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEdHJ3VHJhbnNsYXRlKCkge1xuICAgICAgbGV0IGR0cndUcmFuc2xhdGUgPSB0aGlzO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBtZW1iZXJPZiBkdHJ3LnRyYW5zbGF0ZS5kdHJ3VHJhbnNsYXRlXG4gICAgICAgKiBAbmFtZSBnZXRTdGF0ZUtleVxuICAgICAgICpcbiAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICogVXNlcyB0aGUgY29uZmlndXJlZCBiYXNlIHRyYW5zbGF0aW9uIGtleSBhcyB3ZWxsIGFzIHRoZVxuICAgICAgICogY3VycmVudCBzdGF0ZSB0byBjb25zdHJ1Y3QgdGhlIGZ1bGwgdHJhbnNsYXRpb24ga2V5IGZvclxuICAgICAgICogdGhlIHBhc3NlZCBpbiB2YWx1ZVxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGdldFN0YXRlS2V5KGtleSkge1xuICAgICAgICBsZXQgcGFydHMgPSBiYXNlVHJhbnNsYXRpb25LZXkgPyBbYmFzZVRyYW5zbGF0aW9uS2V5XSA6IFtdO1xuXG4gICAgICAgIHBhcnRzLnB1c2goLi4uJHN0YXRlLmN1cnJlbnQubmFtZS5zcGxpdCgnLicpLm1hcCgkZmlsdGVyKCdoeXBoZW5hdGVkVG9DYW1lbENhc2UnKSkpO1xuICAgICAgICBwYXJ0cy5wdXNoKGtleSk7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oJy4nKTtcbiAgICAgIH1cblxuICAgICAgYW5ndWxhci5leHRlbmQoZHRyd1RyYW5zbGF0ZSwge1xuICAgICAgICBnZXRTdGF0ZUtleVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEdHJ3VHJhbnNsYXRlKCk7XG4gIH1cblxuICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgJGdldCxcbiAgICBzZXRCYXNlVHJhbnNsYXRpb25LZXlcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IC8qIEBuZ0luamVjdCAqLyBkdHJ3VHJhbnNsYXRlUHJvdmlkZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi90cmFuc2xhdGUtcHJvdmlkZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9