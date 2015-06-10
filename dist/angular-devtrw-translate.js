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
	    targetAttrs.forEach(function (targetAttrs) {
	      element.attr(targetAttrs, value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGY3YzZkNmZmMWFmOWQ4MWFkMzgiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1wcm92aWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O3FCQ3RDTyxDQUFtQjs7cUJBQ25CLENBQW1COztxQkFDbkIsQ0FBd0I7O29DQUVYLENBQVM7Ozs7bURBRVcsQ0FBNEI7Ozs7b0RBQzVCLENBQTZCOzs7OzhDQUM3QixDQUFzQjs7OztBQUU5RCxLQUFNLFFBQVEsR0FBRyxxQkFBUSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FDaEQsdUNBQXVDLEVBQ3ZDLHdCQUF3QixFQUN4QixXQUFXLENBQ1osQ0FBQyxDQUFDOztBQUVILFNBQVEsQ0FDTCxTQUFTLENBQUMsZUFBZSxzQ0FBNkIsQ0FDdEQsU0FBUyxDQUFDLGdCQUFnQix1Q0FBOEIsQ0FDeEQsUUFBUSxDQUFDLGVBQWUsaUNBQXdCLENBQUM7O3NCQUVyQyxRQUFROzs7Ozs7O0FDckJ2QiwwQjs7Ozs7Ozs7Ozs7QUNBQSxVQUFTLDBCQUEwQixDQUFDLFVBQVUsRUFBRTtBQUM5QyxVQUFPO0FBQ0wsYUFBUSxFQUFJLEdBQUc7QUFDZixlQUFVLEVBQUUsc0JBQVk7QUFDdEIsV0FBSSxJQUFJLEdB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QUFFRCxZQUFPLElBQUksYUFBYSxFQUFFLENBQUM7SUFDNUI7O0FBRW9CO0FBQ25CLFNBQUksRUFBSixJQUFJO0FBQ0osZ0JBQXFCO0lBQ3RCLENBQUMsQ0FBQztFQUNKOztBQUVtRCIsImZpbGUiOiJhbmd1bGFyLWRldnRydy10cmFuc2xhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDRmN2M2ZDZmZjFhZjlkODFhZDM4XG4gKiovIiwiaW1wb3J0ICdhbmd1bGFyLXRyYW5zbGF0ZSc7XG5pbXBvcnQgJ2FuZ3VsYXItdWktcm91dGVyJztcbmltcG9ydCAnYW5ndWxhci1kZXZ0cnctZmlsdGVycyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5pbXBvcnQgZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmUgIGZyb20gJy4vdHJhbnNsYXRlLWJhc2UtZGlyZWN0aXZlJztcbmltcG9ydCBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUgZnJvbSAnLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlJztcbmltcG9ydCBkdHJ3VHJhbnNsYXRlUHJvdmlkZXIgICAgICAgZnJvbSAnLi90cmFuc2xhdGUtcHJvdmlkZXInO1xuXG5jb25zdCBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdkdHJ3LnRyYW5zbGF0ZScsIFtcbiAgJ2R0cncuZmlsdGVycy5oeXBoZW5hdGVkLXRvLWNhbWVsLWNhc2UnLFxuICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXG4gICd1aS5yb3V0ZXInXG5dKTtcblxubmdNb2R1bGVcbiAgLmRpcmVjdGl2ZSgndHJhbnNsYXRlQmFzZScsIGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCd0cmFuc2xhdGVDaGlsZCcsIGR0cndUcmFuc2xhdGVDaGlsZERpcmVjdGl2ZSlcbiAgLnByb3ZpZGVyKCdkdHJ3VHJhbnNsYXRlJywgZHRyd1RyYW5zbGF0ZVByb3ZpZGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgbmdNb2R1bGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmUoJHRyYW5zbGF0ZSkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAgICdBJyxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY3RybCA9IHRoaXM7XG4gICAgICBsZXQgYmFzZUtleTtcblxuICAgICAgZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb25LZXkoY2hpbGRLZXkpIHtcbiAgICAgICAgcmV0dXJuIFtiYXNlS2V5LCBjaGlsZEtleV0uam9pbignLicpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRCYXNlS2V5KGtleSkge1xuICAgICAgICBiYXNlS2V5ID0ga2V5O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0cmFuc2xhdGUoa2V5LCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuICR0cmFuc2xhdGUuaW5zdGFudChnZXRUcmFuc2xhdGlvbktleShrZXkpLCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBhbmd1bGFyLmV4dGVuZChjdHJsLCB7XG4gICAgICAgIGdldFRyYW5zbGF0aW9uS2V5LFxuICAgICAgICBzZXRCYXNlS2V5LFxuICAgICAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21waWxlOiAgICBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gdXNpbmcgcHJlLWxpbmsgdG8gZW5zdXJlIHRoYXQgdGhlIGJhc2Uga2V5IGlzIHNldFxuICAgICAgICAvLyBiZWZvcmUgdGhlIHRyYW5zbGF0ZS1jaGlsZCBkaXJlY3RpdmUgcmVxdWVzdHMgaXRcbiAgICAgICAgcHJlOiBmdW5jdGlvbiBwcmVMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICAgIGxldCB7dHJhbnNsYXRlQmFzZSwgdHJhbnNsYXRlRXhjbHVkZVBhcmVudEJhc2V9ID0gYXR0cnM7XG4gICAgICAgICAgbGV0IHBhcmVudEJhc2VDb250cm9sbGVyID0gZWxlbWVudC5wYXJlbnQoKS5jb250cm9sbGVyKCd0cmFuc2xhdGVCYXNlJyk7XG5cbiAgICAgICAgICBzY29wZS50cmFuc2xhdGVCYXNlQ3RybCA9IGNvbnRyb2xsZXI7XG5cbiAgICAgICAgICBpZiAocGFyZW50QmFzZUNvbnRyb2xsZXIgJiYgIXRyYW5zbGF0ZUV4Y2x1ZGVQYXJlbnRCYXNlKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVCYXNlID0gcGFyZW50QmFzZUNvbnRyb2xsZXIuZ2V0VHJhbnNsYXRpb25LZXkodHJhbnNsYXRlQmFzZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udHJvbGxlci5zZXRCYXNlS2V5KHRyYW5zbGF0ZUJhc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgLypAbmdJbmplY3QqLyBkdHJ3VHJhbnNsYXRlQmFzZURpcmVjdGl2ZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZS5qc1xuICoqLyIsImZ1bmN0aW9uIGR0cndUcmFuc2xhdGVDaGlsZERpcmVjdGl2ZSgkY29tcGlsZSwgJHRyYW5zbGF0ZSkge1xuXG4gIGZ1bmN0aW9uIHNldFZhbHVlRm9yQXR0cnMoZWxlbWVudCwgdGFyZ2V0QXR0cnMsIHZhbHVlKSB7XG4gICAgdGFyZ2V0QXR0cnMuZm9yRWFjaCgodGFyZ2V0QXR0cnMpID0+IHtcbiAgICAgIGVsZW1lbnQuYXR0cih0YXJnZXRBdHRycywgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VUcmFuc2xhdGVDaGlsZEF0dHJpYnV0ZXMoY29uZmlnU3RyaW5nKSB7XG4gICAgbGV0IGtleUF0dHJpYnV0ZXMgPSBbXTtcbiAgICBsZXQgdmFsdWVBdHRyaWJ1dGVzID0gW107XG4gICAgbGV0IGF0dHJpYnV0ZXMgPSBjb25maWdTdHJpbmdcbiAgICAgIC5yZXBsYWNlKC9bXFxbXFxdXFwoXFwpXFxzXSsvZywgJycpIC8vIHJlbW92ZSBwYXJlbnRoZXNpcywgYnJhY2tldHMsIGFuIHNwYWNlc1xuICAgICAgLnNwbGl0KCcsJyk7XG5cbiAgICBhdHRyaWJ1dGVzLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgIC8vIGF0dHJpYnV0ZSBuYW1lcyBwcmVmaXhlZCB3aXRoICEgc2lnbmlmaWVzIHRoYXQgdGhlIHRyYW5zbGF0aW9uIGtleSBzaG91bGQgYmVcbiAgICAgIC8vIHNldCBpbnN0ZWFkIG9mIHRoZSB0cmFuc2xhdGVkIHZhbHVlXG4gICAgICBpZiAoJyEnID09PSBhdHRyaWJ1dGVOYW1lLmNoYXJBdCgwKSkge1xuICAgICAgICBrZXlBdHRyaWJ1dGVzLnB1c2goYXR0cmlidXRlTmFtZS5zdWJzdHIoMSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVBdHRyaWJ1dGVzLnB1c2goYXR0cmlidXRlTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gW2tleUF0dHJpYnV0ZXMsIHZhbHVlQXR0cmlidXRlc107XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVRyYW5zbGF0ZUNoaWxkQXR0cihhdHRyaWJ1dGUpIHtcbiAgICBsZXQgcGFydHMgPSBhdHRyaWJ1dGUuc3BsaXQoJz0nKTtcblxuICAgIC8vIGJ5IGRlZmF1bHQgd2UganVzdCBzZXQgdGhlIHRyYW5zbGF0aW9uIGtleSBvbiB0aGUgYHRyYW5zbGF0ZWAgYXR0cmlidXRlc1xuICAgIGlmICgxID09PSBwYXJ0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zbGF0ZUtleTogICAgcGFydHNbMF0sXG4gICAgICAgIGtleUF0dHJpYnV0ZXM6ICAgWyd0cmFuc2xhdGUnXSxcbiAgICAgICAgdmFsdWVBdHRyaWJ1dGVzOiBbXVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBsZXQgcGFyc2VkQXR0cmlidXRlcyA9IHBhcnNlVHJhbnNsYXRlQ2hpbGRBdHRyaWJ1dGVzKHBhcnRzWzBdKTtcblxuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2xhdGVLZXk6ICAgIHBhcnRzWzFdLFxuICAgICAga2V5QXR0cmlidXRlczogICBwYXJzZWRBdHRyaWJ1dGVzWzBdLFxuICAgICAgdmFsdWVBdHRyaWJ1dGVzOiBwYXJzZWRBdHRyaWJ1dGVzWzFdXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICByZXBsYWNlOiAgZmFsc2UsXG4gICAgLy8gU3RvcCBvdGhlciBkaXJlY3RpdmVzIGZyb20gcnVubmluZyAodGhleSB3aWxsIGJlIHJ1biB3aXRoICRjb21waWxlIGlzIGNhbGxlZClcbiAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICByZXF1aXJlOiAgJz9eXnRyYW5zbGF0ZUJhc2UnLFxuICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGRpcmVjdGl2ZSBpcyBydW4gZmlyc3RcbiAgICBwcmlvcml0eTogMTAwMCxcbiAgICBsaW5rOiAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIHRyYW5zbGF0ZUJhc2VDdHJsKSB7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgICAgbGV0IHtcbiAgICAgICAgdHJhbnNsYXRlS2V5LFxuICAgICAgICBrZXlBdHRyaWJ1dGVzLFxuICAgICAgICB2YWx1ZUF0dHJpYnV0ZXNcbiAgICAgICAgfSA9IHBhcnNlVHJhbnNsYXRlQ2hpbGRBdHRyKGF0dHJzLnRyYW5zbGF0ZUNoaWxkKTtcblxuICAgICAgdHJhbnNsYXRlS2V5ID0gdHJhbnNsYXRlQmFzZUN0cmwgP1xuICAgICAgICB0cmFuc2xhdGVCYXNlQ3RybC5nZXRUcmFuc2xhdGlvbktleSh0cmFuc2xhdGVLZXkpIDpcbiAgICAgICAgYENPVUxEX05PVF9GSU5EX1RSQU5TTEFURV9CQVNFX0NPTlRST0xMRVJfRk9SX0NISUxELSR7dHJhbnNsYXRlS2V5fWA7XG5cbiAgICAgIGlmICgwIDwga2V5QXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgc2V0VmFsdWVGb3JBdHRycyhlbGVtZW50LCBrZXlBdHRyaWJ1dGVzLCB0cmFuc2xhdGVLZXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoMCA8IHZhbHVlQXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZVZhbHVlcyA9IChhdHRycy50cmFuc2xhdGVWYWx1ZXMpID8gc2NvcGUuJGV2YWwoYXR0cnMudHJhbnNsYXRlVmFsdWVzKSA6IHt9O1xuICAgICAgICBzZXRWYWx1ZUZvckF0dHJzKFxuICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgdmFsdWVBdHRyaWJ1dGVzLFxuICAgICAgICAgICR0cmFuc2xhdGUuaW5zdGFudCh0cmFuc2xhdGVLZXksIHRyYW5zbGF0ZVZhbHVlcylcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyKCd0cmFuc2xhdGUtY2hpbGQnKTsgLy9yZW1vdmUgdGhlIGF0dHJpYnV0ZSB0byBhdm9pZCBpbmRlZmluaXRlIGxvb3BcblxuICAgICAgJGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgLypAbmdJbmplY3QqLyBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbi8qKlxuICogQG5hbWUgZHRydy50cmFuc2xhdGUuZHRyd1RyYW5zbGF0ZVByb3ZpZGVyXG4gKi9cbmZ1bmN0aW9uIGR0cndUcmFuc2xhdGVQcm92aWRlcigpIHtcbiAgbGV0IGJhc2VUcmFuc2xhdGlvbktleTtcblxuICAvKipcbiAgICogQG1lbWJlck9mIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVQcm92aWRlclxuICAgKiBAbmFtZSBzZXRCYXNlVHJhbnNsYXRpb25LZXlcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFNldHMgdGhlIGJhc2Uga2V5IHByZWZpeGVkIHRvIGdlbmVyYXRlZCB0cmFuc2xhdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKi9cbiAgZnVuY3Rpb24gc2V0QmFzZVRyYW5zbGF0aW9uS2V5KGtleSkge1xuICAgIGJhc2VUcmFuc2xhdGlvbktleSA9IGtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gJGZpbHRlclxuICAgKiBAcGFyYW0gJHN0YXRlXG4gICAqIEByZXR1cm5zIHtkdHJ3LnRyYW5zbGF0ZS5EdHJ3VHJhbnNsYXRlfVxuICAgKlxuICAgKiBAbmdJbmplY3RcbiAgICovXG4gIGZ1bmN0aW9uICRnZXQoJGZpbHRlciwgJHN0YXRlKSB7XG4gICAgLyoqXG4gICAgICogQG5hbWUgZHRydy50cmFuc2xhdGUuZHRyd1RyYW5zbGF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIER0cndUcmFuc2xhdGUoKSB7XG4gICAgICBsZXQgZHRyd1RyYW5zbGF0ZSA9IHRoaXM7XG5cbiAgICAgIC8qKlxuICAgICAgICogQG1lbWJlck9mIGR0cncudHJhbnNsYXRlLmR0cndUcmFuc2xhdGVcbiAgICAgICAqIEBuYW1lIGdldFN0YXRlS2V5XG4gICAgICAgKlxuICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgKiBVc2VzIHRoZSBjb25maWd1cmVkIGJhc2UgdHJhbnNsYXRpb24ga2V5IGFzIHdlbGwgYXMgdGhlXG4gICAgICAgKiBjdXJyZW50IHN0YXRlIHRvIGNvbnN0cnVjdCB0aGUgZnVsbCB0cmFuc2xhdGlvbiBrZXkgZm9yXG4gICAgICAgKiB0aGUgcGFzc2VkIGluIHZhbHVlXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gZ2V0U3RhdGVLZXkoa2V5KSB7XG4gICAgICAgIGxldCBwYXJ0cyA9IGJhc2VUcmFuc2xhdGlvbktleSA/IFtiYXNlVHJhbnNsYXRpb25LZXldIDogW107XG5cbiAgICAgICAgcGFydHMucHVzaCguLi4kc3RhdGUuY3VycmVudC5uYW1lLnNwbGl0KCcuJykubWFwKCRmaWx0ZXIoJ2h5cGhlbmF0ZWRUb0NhbWVsQ2FzZScpKSk7XG4gICAgICAgIHBhcnRzLnB1c2goa2V5KTtcblxuICAgICAgICByZXR1cm4gcGFydHMuam9pbignLicpO1xuICAgICAgfVxuXG4gICAgICBhbmd1bGFyLmV4dGVuZChkdHJ3VHJhbnNsYXRlLCB7XG4gICAgICAgIGdldFN0YXRlS2V5XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IER0cndUcmFuc2xhdGUoKTtcbiAgfVxuXG4gIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICAkZ2V0LFxuICAgIHNldEJhc2VUcmFuc2xhdGlvbktleVxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgLyogQG5nSW5qZWN0ICovIGR0cndUcmFuc2xhdGVQcm92aWRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3RyYW5zbGF0ZS1wcm92aWRlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=