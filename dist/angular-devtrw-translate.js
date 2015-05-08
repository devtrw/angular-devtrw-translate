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
	
	  function rebuildElement(element, translateKey, translateInto, translateValues) {
	    if (translateInto) {
	      element.attr(translateInto, $translate.instant(translateKey, translateValues));
	      element.removeAttr('translate-child-into'); //remove the attribute to avoid indefinite loop
	    } else {
	      element.attr('translate', translateKey);
	    }
	
	    element.removeAttr('translate-child'); //remove the attribute to avoid indefinite loop
	  }
	
	  return {
	    restrict: 'A',
	    replace: false,
	    // Stop other directives from running (they will be run with $compile is called)
	    terminal: true,
	    require: '^translateBase',
	    // Make sure this directive is run first
	    priority: 1000,
	    link: function link(scope, element, attrs, translateBaseCtrl) {
	      var translateKey = translateBaseCtrl.getTranslationKey(attrs.translateChild);
	      var translateInto = attrs.translateChildInto;
	      var translateValues = undefined;
	
	      if (translateInto && attrs.translateValues) {
	        translateValues = scope.$eval(attrs.translateValues);
	      }
	
	      rebuildElement(element, translateKey, translateInto, translateValues);
	
	      $compile(element)(scope);
	    }
	  };
	}
	dtrwTranslateChildDirective.$inject = ["$compile", "$translate"];
	
	exports['default'] = dtrwTranslateChildDirective;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDdhMTdkYzU5ODcxZDcxMGMxYTQiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7cUJDdENPLENBQW1COztvQ0FFTixDQUFTOzs7O21EQUVXLENBQTRCOzs7O29EQUM1QixDQUE2Qjs7OztBQUVyRSxLQUFNLFFBQVEsR0FBRyxxQkFBUSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FDaEQsd0JBQXdCLENBQ3pCLENBQUMsQ0FBQzs7QUFFSCxTQUFRLENBQ0wsU0FBUyxDQUFDLGVBQWUsc0NBQTZCLENBQ3RELFNBQVMsQ0FBQyxnQkFBZ0IsdUNBQThCLENBQUM7O3NCQUU3QyxRQUFROzs7Ozs7O0FDZnZCLDBCOzs7Ozs7Ozs7Ozs7QUNDQSxVQUFTLDBCQUEwQixDQUFDLFVBQVUsRUFBRTtBQUM5QyxVQUFPO0FBQ0wsYUFBUSxFQUFJLEdBQUc7QUFDZixlQUFVLEVBQUUsc0JBQVk7QUFDdEIsV0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFdBQUksT0FBTyxhQUFDOztBQUVaLGdCQUFTLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtBQUNuQyxnQkFBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEM7O0FBRUQsZ0JBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixnQkFBTyxHQUFHLEdBQUcsQ0FBQztRQUNmOztBQUVELGdCQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQzlCLGdCQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0Q7O0FBRUQsY0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDbkIsMEJBQWlCLEVBQWpCLGlCQUFpQjtBQUNqQixtQkFBVSxFQUFWLFVBQVU7QUFDVixrQkFBUyxFQUFFLFNBQVM7UUFDckIsQ0FBQyxDQUFDO01BQ0o7QUFDRCxZQUFPLEVBQUssU0FBUyxPQUFPLEdBQUc7QUFDN0IsY0FBTzs7O0FBR0wsWUFBRyxFQUFFLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtBQUN2RCxlQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO0FBQ2xDLGVBQUksb0JBQW9CLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFeEUsZ0JBQUssQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7O0FBRXJDLGVBQUksb0JBQW9CLEVBQUU7QUFDeEIsb0JBQU8sR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRDs7QUFFRCxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztVQUNoQztRQUNGLENBQUM7TUFDSDtJQUNGLENBQUM7RUFDSDs7QUFFd0M7Ozs7Ozs7Ozs7Ozs7O0FDOUN6QyxVQUFTLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUU7O0FBRXpELFlBQVMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRTtBQUM3RSxTQUFJLGFBQWEsRUFBRTtBQUNqQixjQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQy9FLGNBQU8sQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztNQUM1QyxNQUFNO0FBQ0wsY0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7TUFDekM7O0FBRUQsWUFBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDOztBQUVELFVBQU87QUFDTCxhQUFRLEVBQUUsR0FBRztBQUNiLFlBQU8sRUFBRyxLQUFLOztBQUVmLGFBQVEsRUFBRSxJQUFJO0FBQ2QsWUFBTyxFQUFFLGdCQUFnQjs7QUFFekIsYUFBUSxFQUFFLElBQUk7QUFDZCxTQUFJLEVBQU0sU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7QUFDaEUsV0FBSSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzdFLFdBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztBQUM3QyxXQUFJLGVBQWUsYUFBQzs7QUFFcEIsV0FBSSxhQUFhLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtBQUMxQyx3QkFBZSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3REOztBQUVELHFCQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRXRFLGVBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUMxQjtJQUNGLENBQUM7RUFDSDs7QUFFeUMiLCJmaWxlIjoiYW5ndWxhci1kZXZ0cnctdHJhbnNsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkN2ExN2RjNTk4NzFkNzEwYzFhNFxuICoqLyIsImltcG9ydCAnYW5ndWxhci10cmFuc2xhdGUnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxuaW1wb3J0IGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlICBmcm9tICcuL3RyYW5zbGF0ZS1iYXNlLWRpcmVjdGl2ZSc7XG5pbXBvcnQgZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlIGZyb20gJy4vdHJhbnNsYXRlLWNoaWxkLWRpcmVjdGl2ZSc7XG5cbmNvbnN0IG5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2R0cncudHJhbnNsYXRlJywgW1xuICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZSdcbl0pO1xuXG5uZ01vZHVsZVxuICAuZGlyZWN0aXZlKCd0cmFuc2xhdGVCYXNlJywgZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmUpXG4gIC5kaXJlY3RpdmUoJ3RyYW5zbGF0ZUNoaWxkJywgZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlKTtcblxuZXhwb3J0IGRlZmF1bHQgbmdNb2R1bGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypAbmdJbmplY3QqL1xuZnVuY3Rpb24gZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmUoJHRyYW5zbGF0ZSkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAgICdBJyxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY3RybCA9IHRoaXM7XG4gICAgICBsZXQgYmFzZUtleTtcblxuICAgICAgZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb25LZXkoY2hpbGRLZXkpIHtcbiAgICAgICAgcmV0dXJuIFtiYXNlS2V5LCBjaGlsZEtleV0uam9pbignLicpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRCYXNlS2V5KGtleSkge1xuICAgICAgICBiYXNlS2V5ID0ga2V5O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0cmFuc2xhdGUoa2V5LCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuICR0cmFuc2xhdGUuaW5zdGFudChnZXRUcmFuc2xhdGlvbktleShrZXkpLCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBhbmd1bGFyLmV4dGVuZChjdHJsLCB7XG4gICAgICAgIGdldFRyYW5zbGF0aW9uS2V5LFxuICAgICAgICBzZXRCYXNlS2V5LFxuICAgICAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21waWxlOiAgICBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gdXNpbmcgcHJlLWxpbmsgdG8gZW5zdXJlIHRoYXQgdGhlIGJhc2Uga2V5IGlzIHNldFxuICAgICAgICAvLyBiZWZvcmUgdGhlIHRyYW5zbGF0ZS1jaGlsZCBkaXJlY3RpdmUgcmVxdWVzdHMgaXRcbiAgICAgICAgcHJlOiBmdW5jdGlvbiBwcmVMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICAgIGxldCBiYXNlS2V5ID0gYXR0cnMudHJhbnNsYXRlQmFzZTtcbiAgICAgICAgICBsZXQgcGFyZW50QmFzZUNvbnRyb2xsZXIgPSBlbGVtZW50LnBhcmVudCgpLmNvbnRyb2xsZXIoJ3RyYW5zbGF0ZUJhc2UnKTtcblxuICAgICAgICAgIHNjb3BlLnRyYW5zbGF0ZUJhc2VDdHJsID0gY29udHJvbGxlcjtcblxuICAgICAgICAgIGlmIChwYXJlbnRCYXNlQ29udHJvbGxlcikge1xuICAgICAgICAgICAgYmFzZUtleSA9IHBhcmVudEJhc2VDb250cm9sbGVyLmdldFRyYW5zbGF0aW9uS2V5KGJhc2VLZXkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRyb2xsZXIuc2V0QmFzZUtleShiYXNlS2V5KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vdHJhbnNsYXRlLWJhc2UtZGlyZWN0aXZlLmpzXG4gKiovIiwiLypAbmdJbmplY3QqL1xuZnVuY3Rpb24gZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlKCRjb21waWxlLCAkdHJhbnNsYXRlKSB7XG5cbiAgZnVuY3Rpb24gcmVidWlsZEVsZW1lbnQoZWxlbWVudCwgdHJhbnNsYXRlS2V5LCB0cmFuc2xhdGVJbnRvLCB0cmFuc2xhdGVWYWx1ZXMpIHtcbiAgICBpZiAodHJhbnNsYXRlSW50bykge1xuICAgICAgZWxlbWVudC5hdHRyKHRyYW5zbGF0ZUludG8sICR0cmFuc2xhdGUuaW5zdGFudCh0cmFuc2xhdGVLZXksIHRyYW5zbGF0ZVZhbHVlcykpO1xuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyKCd0cmFuc2xhdGUtY2hpbGQtaW50bycpOyAvL3JlbW92ZSB0aGUgYXR0cmlidXRlIHRvIGF2b2lkIGluZGVmaW5pdGUgbG9vcFxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmF0dHIoJ3RyYW5zbGF0ZScsIHRyYW5zbGF0ZUtleSk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5yZW1vdmVBdHRyKCd0cmFuc2xhdGUtY2hpbGQnKTsgLy9yZW1vdmUgdGhlIGF0dHJpYnV0ZSB0byBhdm9pZCBpbmRlZmluaXRlIGxvb3BcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICByZXBsYWNlOiAgZmFsc2UsXG4gICAgLy8gU3RvcCBvdGhlciBkaXJlY3RpdmVzIGZyb20gcnVubmluZyAodGhleSB3aWxsIGJlIHJ1biB3aXRoICRjb21waWxlIGlzIGNhbGxlZClcbiAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICByZXF1aXJlOiAnXnRyYW5zbGF0ZUJhc2UnLFxuICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGRpcmVjdGl2ZSBpcyBydW4gZmlyc3RcbiAgICBwcmlvcml0eTogMTAwMCxcbiAgICBsaW5rOiAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIHRyYW5zbGF0ZUJhc2VDdHJsKSB7XG4gICAgICBsZXQgdHJhbnNsYXRlS2V5ID0gdHJhbnNsYXRlQmFzZUN0cmwuZ2V0VHJhbnNsYXRpb25LZXkoYXR0cnMudHJhbnNsYXRlQ2hpbGQpO1xuICAgICAgbGV0IHRyYW5zbGF0ZUludG8gPSBhdHRycy50cmFuc2xhdGVDaGlsZEludG87XG4gICAgICBsZXQgdHJhbnNsYXRlVmFsdWVzO1xuXG4gICAgICBpZiAodHJhbnNsYXRlSW50byAmJiBhdHRycy50cmFuc2xhdGVWYWx1ZXMpIHtcbiAgICAgICAgdHJhbnNsYXRlVmFsdWVzID0gc2NvcGUuJGV2YWwoYXR0cnMudHJhbnNsYXRlVmFsdWVzKTtcbiAgICAgIH1cblxuICAgICAgcmVidWlsZEVsZW1lbnQoZWxlbWVudCwgdHJhbnNsYXRlS2V5LCB0cmFuc2xhdGVJbnRvLCB0cmFuc2xhdGVWYWx1ZXMpO1xuXG4gICAgICAkY29tcGlsZShlbGVtZW50KShzY29wZSk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkdHJ3VHJhbnNsYXRlQ2hpbGREaXJlY3RpdmU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi90cmFuc2xhdGUtY2hpbGQtZGlyZWN0aXZlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==