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
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _translateBaseDirective = __webpack_require__(2);
	
	var _translateBaseDirective2 = _interopRequireDefault(_translateBaseDirective);
	
	var _translateChildDirective = __webpack_require__(3);
	
	var _translateChildDirective2 = _interopRequireDefault(_translateChildDirective);
	
	var ngModule = _angular2['default'].module('dtrw.translate', ['pascalprecht.translate']);
	
	ngModule.directive('translateBase', _translateBaseDirective2['default']).directive('translateChild', _translateChildDirective2['default']);
	
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
	/*@ngInject*/
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
	
	exports['default'] = dtrwTranslateBaseDirective;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	/*@ngInject*/
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
	
	exports['default'] = dtrwTranslateChildDirective;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjI5MjIzODU5YzNmZGI3OTBkMmIiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7cUJDdENPLENBQW1COztvQ0FFTixDQUFTOzs7O21EQUVXLENBQTRCOzs7O29EQUM1QixDQUE2Qjs7OztBQUVyRSxLQUFNLFFBQVEsR0FBRyxxQkFBUSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FDaEQsd0JBQXdCLENBQ3pCLENBQUMsQ0FBQzs7QUFFSCxTQUFRLENBQ0wsU0FBUyxDQUFDLGVBQWUsc0NBQTZCLENBQ3RELFNBQVMsQ0FBQyxnQkFBZ0IsdUNBQThCLENBQUM7O3NCQUU3QyxRQUFROzs7Ozs7O0FDZnZCLDBCOzs7Ozs7Ozs7Ozs7QUNDQSxVQUFTLDBCQUEwQixDQUFDLFVBQVUsRUFBRTtBQUM5QyxVQUFPO0FBQ0wsYUFBUSxFQUFJLEdBQUc7QUFDZixlQUFVLEVBQUUsc0JBQVk7QUFDdEIsV0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFdBQUksT0FBTyxhQUFDOztBQUVaLGdCQUFTLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtBQUNuQyxnQkFBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEM7O0FBRUQsZ0JBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixnQkFBTyxHQUFHLEdBQUcsQ0FBQztRQUNmOztBQUVELGdCQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQzlCLGdCQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0Q7O0FBRUQsY0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDbkIsMEJBQWlCLEVBQWpCLGlCQUFpQjtBQUNqQixtQkFBVSxFQUFWLFVBQVU7QUFDVixrQkFBUyxFQUFFLFNBQVM7UUFDckIsQ0FBQyxDQUFDO01BQ0o7QUFDRCxZQUFPLEVBQUssU0FBUyxPQUFPLEdBQUc7QUFDN0IsY0FBTzs7O0FBR0wsWUFBRyxFQUFFLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtBQUN2RCxlQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO0FBQ2xDLGVBQUksb0JBQW9CLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFeEUsZ0JBQUssQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7O0FBRXJDLGVBQUksb0JBQW9CLEVBQUU7QUFDeEIsb0JBQU8sR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRDs7QUFFRCxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztVQUNoQztRQUNGLENBQUM7TUFDSDtJQUNGLENBQUM7RUFDSDs7QUFFd0M7Ozs7Ozs7Ozs7Ozs7O0FDOUN6QyxVQUFTLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUU7O0FBRXpELFVBQU87QUFDTCxhQUFRLEVBQUUsR0FBRztBQUNiLFlBQU8sRUFBRyxLQUFLOztBQUVmLGFBQVEsRUFBRSxJQUFJO0FBQ2QsWUFBTyxFQUFFLGdCQUFnQjs7QUFFekIsYUFBUSxFQUFFLElBQUk7QUFDZCxTQUFJLEVBQU0sU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7O1dBQzNELGtCQUFrQixHQUE0QyxLQUFLLENBQW5FLGtCQUFrQjtXQUFFLHFCQUFxQixHQUFxQixLQUFLLENBQS9DLHFCQUFxQjtXQUFFLGVBQWUsR0FBSSxLQUFLLENBQXhCLGVBQWU7O0FBQy9ELFdBQUksWUFBWSxHQUFHLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFN0UsV0FBSSxrQkFBa0IsSUFBSSxxQkFBcUIsRUFBRTtBQUMvQyxlQUFNLElBQUksS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUM7UUFDN0Y7O0FBRUQsV0FBSSxrQkFBa0IsRUFBRTtBQUN0Qix3QkFBZSxHQUFJLGVBQWUsR0FBSSxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN4RSxnQkFBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sSUFBSSxxQkFBcUIsRUFBRTtBQUNoQyxnQkFBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNuRCxNQUFNO0FBQ0wsZ0JBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pDOztBQUVELGNBQU8sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7QUFFdEMsZUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQzFCO0lBQ0YsQ0FBQztFQUNIOztBQUV5QyIsImZpbGUiOiJhbmd1bGFyLWRldnRydy10cmFuc2xhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDYyOTIyMzg1OWMzZmRiNzkwZDJiXG4gKiovIiwiaW1wb3J0ICdhbmd1bGFyLXRyYW5zbGF0ZSc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5pbXBvcnQgZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmUgIGZyb20gJy4vdHJhbnNsYXRlLWJhc2UtZGlyZWN0aXZlJztcbmltcG9ydCBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUgZnJvbSAnLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlJztcblxuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZHRydy50cmFuc2xhdGUnLCBbXG4gICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJ1xuXSk7XG5cbm5nTW9kdWxlXG4gIC5kaXJlY3RpdmUoJ3RyYW5zbGF0ZUJhc2UnLCBkdHJ3VHJhbnNsYXRlQmFzZURpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgndHJhbnNsYXRlQ2hpbGQnLCBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUpO1xuXG5leHBvcnQgZGVmYXVsdCBuZ01vZHVsZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKkBuZ0luamVjdCovXG5mdW5jdGlvbiBkdHJ3VHJhbnNsYXRlQmFzZURpcmVjdGl2ZSgkdHJhbnNsYXRlKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICAgJ0EnLFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjdHJsID0gdGhpcztcbiAgICAgIGxldCBiYXNlS2V5O1xuXG4gICAgICBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbktleShjaGlsZEtleSkge1xuICAgICAgICByZXR1cm4gW2Jhc2VLZXksIGNoaWxkS2V5XS5qb2luKCcuJyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldEJhc2VLZXkoa2V5KSB7XG4gICAgICAgIGJhc2VLZXkgPSBrZXk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZShrZXksIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gJHRyYW5zbGF0ZS5pbnN0YW50KGdldFRyYW5zbGF0aW9uS2V5KGtleSksIHBhcmFtcyk7XG4gICAgICB9XG5cbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKGN0cmwsIHtcbiAgICAgICAgZ2V0VHJhbnNsYXRpb25LZXksXG4gICAgICAgIHNldEJhc2VLZXksXG4gICAgICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXBpbGU6ICAgIGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAvLyB1c2luZyBwcmUtbGluayB0byBlbnN1cmUgdGhhdCB0aGUgYmFzZSBrZXkgaXMgc2V0XG4gICAgICAgIC8vIGJlZm9yZSB0aGUgdHJhbnNsYXRlLWNoaWxkIGRpcmVjdGl2ZSByZXF1ZXN0cyBpdFxuICAgICAgICBwcmU6IGZ1bmN0aW9uIHByZUxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgbGV0IGJhc2VLZXkgPSBhdHRycy50cmFuc2xhdGVCYXNlO1xuICAgICAgICAgIGxldCBwYXJlbnRCYXNlQ29udHJvbGxlciA9IGVsZW1lbnQucGFyZW50KCkuY29udHJvbGxlcigndHJhbnNsYXRlQmFzZScpO1xuXG4gICAgICAgICAgc2NvcGUudHJhbnNsYXRlQmFzZUN0cmwgPSBjb250cm9sbGVyO1xuXG4gICAgICAgICAgaWYgKHBhcmVudEJhc2VDb250cm9sbGVyKSB7XG4gICAgICAgICAgICBiYXNlS2V5ID0gcGFyZW50QmFzZUNvbnRyb2xsZXIuZ2V0VHJhbnNsYXRpb25LZXkoYmFzZUtleSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udHJvbGxlci5zZXRCYXNlS2V5KGJhc2VLZXkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi90cmFuc2xhdGUtYmFzZS1kaXJlY3RpdmUuanNcbiAqKi8iLCIvKkBuZ0luamVjdCovXG5mdW5jdGlvbiBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmUoJGNvbXBpbGUsICR0cmFuc2xhdGUpIHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgcmVwbGFjZTogIGZhbHNlLFxuICAgIC8vIFN0b3Agb3RoZXIgZGlyZWN0aXZlcyBmcm9tIHJ1bm5pbmcgKHRoZXkgd2lsbCBiZSBydW4gd2l0aCAkY29tcGlsZSBpcyBjYWxsZWQpXG4gICAgdGVybWluYWw6IHRydWUsXG4gICAgcmVxdWlyZTogJ150cmFuc2xhdGVCYXNlJyxcbiAgICAvLyBNYWtlIHN1cmUgdGhpcyBkaXJlY3RpdmUgaXMgcnVuIGZpcnN0XG4gICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgbGluazogICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB0cmFuc2xhdGVCYXNlQ3RybCkgeyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICAgIGxldCB7dHJhbnNsYXRlQ2hpbGRJbnRvLCB0cmFuc2xhdGVDaGlsZEtleUludG8sIHRyYW5zbGF0ZVZhbHVlc30gPSBhdHRycztcbiAgICAgIGxldCB0cmFuc2xhdGVLZXkgPSB0cmFuc2xhdGVCYXNlQ3RybC5nZXRUcmFuc2xhdGlvbktleShhdHRycy50cmFuc2xhdGVDaGlsZCk7XG5cbiAgICAgIGlmICh0cmFuc2xhdGVDaGlsZEludG8gJiYgdHJhbnNsYXRlQ2hpbGRLZXlJbnRvKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndHJhbnNsYXRlLWNoaWxkLWludG8gYW5kIHRyYW5zbGF0ZS1jaGlsZC1rZXktaW50byBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2xhdGVDaGlsZEludG8pIHtcbiAgICAgICAgdHJhbnNsYXRlVmFsdWVzID0gKHRyYW5zbGF0ZVZhbHVlcykgPyBzY29wZS4kZXZhbCh0cmFuc2xhdGVWYWx1ZXMpIDoge307XG4gICAgICAgIGVsZW1lbnQuYXR0cih0cmFuc2xhdGVDaGlsZEludG8sICR0cmFuc2xhdGUuaW5zdGFudCh0cmFuc2xhdGVLZXksIHRyYW5zbGF0ZVZhbHVlcykpO1xuICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGVDaGlsZEtleUludG8pIHtcbiAgICAgICAgZWxlbWVudC5hdHRyKHRyYW5zbGF0ZUNoaWxkS2V5SW50bywgdHJhbnNsYXRlS2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuYXR0cigndHJhbnNsYXRlJywgdHJhbnNsYXRlS2V5KTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyKCd0cmFuc2xhdGUtY2hpbGQnKTsgLy9yZW1vdmUgdGhlIGF0dHJpYnV0ZSB0byBhdm9pZCBpbmRlZmluaXRlIGxvb3BcblxuICAgICAgJGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vdHJhbnNsYXRlLWNoaWxkLWRpcmVjdGl2ZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=