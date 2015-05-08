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
	
	// fixme: how should imports be handled for distributed software?
	//import 'angular-translate';
	//
	//import angular from 'angular';
	
	var _translateBaseDirective = __webpack_require__(1);
	
	var _translateBaseDirective2 = _interopRequireDefault(_translateBaseDirective);
	
	var _translateChildDirective = __webpack_require__(2);
	
	var _translateChildDirective2 = _interopRequireDefault(_translateChildDirective);
	
	var ngModule = angular.module('dtrw.translate', ['pascalprecht.translate']);
	
	ngModule.directive('translateBase', _translateBaseDirective2['default']).directive('translateChild', _translateChildDirective2['default']);
	
	exports['default'] = ngModule;
	module.exports = exports['default'];

/***/ },
/* 1 */
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
/* 2 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWYwZWQ1MjRlOWFlZjVkYmM3ZjEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdHJhbnNsYXRlLWJhc2UtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3RyYW5zbGF0ZS1jaGlsZC1kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21EQ2pDd0MsQ0FBNEI7Ozs7b0RBQzVCLENBQTZCOzs7O0FBRXJFLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FDaEQsd0JBQXdCLENBQ3pCLENBQUMsQ0FBQzs7QUFFSCxTQUFRLENBQ0wsU0FBUyxDQUFDLGVBQWUsc0NBQTZCLENBQ3RELFNBQVMsQ0FBQyxnQkFBZ0IsdUNBQThCLENBQUM7O3NCQUU3QyxRQUFROzs7Ozs7Ozs7Ozs7O0FDZnZCLFVBQVMsMEJBQTBCLENBQUMsVUFBVSxFQUFFO0FBQzlDLFVBQU87QUFDTCxhQUFRLEVBQUksR0FBRztBQUNmLGVBQVUsRUFBRSxzQkFBWTtBQUN0QixXQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsV0FBSSxPQUFPLGFBQUM7O0FBRVosZ0JBQVMsaUJBQWlCLENBQUMsUUFBUSxFQUFFO0FBQ25DLGdCQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0Qzs7QUFFRCxnQkFBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQ3ZCLGdCQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ2Y7O0FBRUQsZ0JBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDOUIsZ0JBQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRDs7QUFFRCxjQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtBQUNuQiwwQkFBaUIsRUFBakIsaUJBQWlCO0FBQ2pCLG1CQUFVLEVBQVYsVUFBVTtBQUNWLGtCQUFTLEVBQUUsU0FBUztRQUNyQixDQUFDLENBQUM7TUFDSjtBQUNELFlBQU8sRUFBSyxTQUFTLE9BQU8sR0FBRztBQUM3QixjQUFPOzs7QUFHTCxZQUFHLEVBQUUsU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO0FBQ3ZELGVBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFDbEMsZUFBSSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUV4RSxnQkFBSyxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQzs7QUFFckMsZUFBSSxvQkFBb0IsRUFBRTtBQUN4QixvQkFBTyxHQUFHLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNEOztBQUVELHFCQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1VBQ2hDO1FBQ0YsQ0FBQztNQUNIO0lBQ0YsQ0FBQztFQUNIOztBQUV3Qzs7Ozs7Ozs7Ozs7Ozs7O0FDN0N6QyxVQUFTLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUU7O0FBRXpELFlBQVMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRTtBQUM3RSxTQUFJLGFBQWEsRUFBRTtBQUNqQixjQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQy9FLGNBQU8sQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztNQUM1QyxNQUFNO0FBQ0wsY0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7TUFDekM7O0FBRUQsWUFBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDOztBQUVELFVBQU87QUFDTCxhQUFRLEVBQUUsR0FBRztBQUNiLFlBQU8sRUFBRyxLQUFLOztBQUVmLGFBQVEsRUFBRSxJQUFJO0FBQ2QsWUFBTyxFQUFFLGdCQUFnQjs7QUFFekIsYUFBUSxFQUFFLElBQUk7QUFDZCxTQUFJLEVBQU0sU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7QUFDaEUsV0FBSSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzdFLFdBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztBQUM3QyxXQUFJLGVBQWUsYUFBQzs7QUFFcEIsV0FBSSxhQUFhLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtBQUMxQyx3QkFBZSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3REOztBQUVELHFCQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRXRFLGVBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUMxQjtJQUNGLENBQUM7RUFDSDs7QUFFeUMiLCJmaWxlIjoiYW5ndWxhci1kZXZ0cnctdHJhbnNsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5ZjBlZDUyNGU5YWVmNWRiYzdmMVxuICoqLyIsIi8vIGZpeG1lOiBob3cgc2hvdWxkIGltcG9ydHMgYmUgaGFuZGxlZCBmb3IgZGlzdHJpYnV0ZWQgc29mdHdhcmU/XG4vL2ltcG9ydCAnYW5ndWxhci10cmFuc2xhdGUnO1xuLy9cbi8vaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbmltcG9ydCBkdHJ3VHJhbnNsYXRlQmFzZURpcmVjdGl2ZSAgZnJvbSAnLi90cmFuc2xhdGUtYmFzZS1kaXJlY3RpdmUnO1xuaW1wb3J0IGR0cndUcmFuc2xhdGVDaGlsZERpcmVjdGl2ZSBmcm9tICcuL3RyYW5zbGF0ZS1jaGlsZC1kaXJlY3RpdmUnO1xuXG5jb25zdCBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdkdHJ3LnRyYW5zbGF0ZScsIFtcbiAgJ3Bhc2NhbHByZWNodC50cmFuc2xhdGUnXG5dKTtcblxubmdNb2R1bGVcbiAgLmRpcmVjdGl2ZSgndHJhbnNsYXRlQmFzZScsIGR0cndUcmFuc2xhdGVCYXNlRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCd0cmFuc2xhdGVDaGlsZCcsIGR0cndUcmFuc2xhdGVDaGlsZERpcmVjdGl2ZSk7XG5cbmV4cG9ydCBkZWZhdWx0IG5nTW9kdWxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCIvKkBuZ0luamVjdCovXG5mdW5jdGlvbiBkdHJ3VHJhbnNsYXRlQmFzZURpcmVjdGl2ZSgkdHJhbnNsYXRlKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICAgJ0EnLFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjdHJsID0gdGhpcztcbiAgICAgIGxldCBiYXNlS2V5O1xuXG4gICAgICBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbktleShjaGlsZEtleSkge1xuICAgICAgICByZXR1cm4gW2Jhc2VLZXksIGNoaWxkS2V5XS5qb2luKCcuJyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldEJhc2VLZXkoa2V5KSB7XG4gICAgICAgIGJhc2VLZXkgPSBrZXk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZShrZXksIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gJHRyYW5zbGF0ZS5pbnN0YW50KGdldFRyYW5zbGF0aW9uS2V5KGtleSksIHBhcmFtcyk7XG4gICAgICB9XG5cbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKGN0cmwsIHtcbiAgICAgICAgZ2V0VHJhbnNsYXRpb25LZXksXG4gICAgICAgIHNldEJhc2VLZXksXG4gICAgICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXBpbGU6ICAgIGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAvLyB1c2luZyBwcmUtbGluayB0byBlbnN1cmUgdGhhdCB0aGUgYmFzZSBrZXkgaXMgc2V0XG4gICAgICAgIC8vIGJlZm9yZSB0aGUgdHJhbnNsYXRlLWNoaWxkIGRpcmVjdGl2ZSByZXF1ZXN0cyBpdFxuICAgICAgICBwcmU6IGZ1bmN0aW9uIHByZUxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgbGV0IGJhc2VLZXkgPSBhdHRycy50cmFuc2xhdGVCYXNlO1xuICAgICAgICAgIGxldCBwYXJlbnRCYXNlQ29udHJvbGxlciA9IGVsZW1lbnQucGFyZW50KCkuY29udHJvbGxlcigndHJhbnNsYXRlQmFzZScpO1xuXG4gICAgICAgICAgc2NvcGUudHJhbnNsYXRlQmFzZUN0cmwgPSBjb250cm9sbGVyO1xuXG4gICAgICAgICAgaWYgKHBhcmVudEJhc2VDb250cm9sbGVyKSB7XG4gICAgICAgICAgICBiYXNlS2V5ID0gcGFyZW50QmFzZUNvbnRyb2xsZXIuZ2V0VHJhbnNsYXRpb25LZXkoYmFzZUtleSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udHJvbGxlci5zZXRCYXNlS2V5KGJhc2VLZXkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZHRyd1RyYW5zbGF0ZUJhc2VEaXJlY3RpdmU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi90cmFuc2xhdGUtYmFzZS1kaXJlY3RpdmUuanNcbiAqKi8iLCJcbi8qQG5nSW5qZWN0Ki9cbmZ1bmN0aW9uIGR0cndUcmFuc2xhdGVDaGlsZERpcmVjdGl2ZSgkY29tcGlsZSwgJHRyYW5zbGF0ZSkge1xuXG4gIGZ1bmN0aW9uIHJlYnVpbGRFbGVtZW50KGVsZW1lbnQsIHRyYW5zbGF0ZUtleSwgdHJhbnNsYXRlSW50bywgdHJhbnNsYXRlVmFsdWVzKSB7XG4gICAgaWYgKHRyYW5zbGF0ZUludG8pIHtcbiAgICAgIGVsZW1lbnQuYXR0cih0cmFuc2xhdGVJbnRvLCAkdHJhbnNsYXRlLmluc3RhbnQodHJhbnNsYXRlS2V5LCB0cmFuc2xhdGVWYWx1ZXMpKTtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cigndHJhbnNsYXRlLWNoaWxkLWludG8nKTsgLy9yZW1vdmUgdGhlIGF0dHJpYnV0ZSB0byBhdm9pZCBpbmRlZmluaXRlIGxvb3BcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5hdHRyKCd0cmFuc2xhdGUnLCB0cmFuc2xhdGVLZXkpO1xuICAgIH1cblxuICAgIGVsZW1lbnQucmVtb3ZlQXR0cigndHJhbnNsYXRlLWNoaWxkJyk7IC8vcmVtb3ZlIHRoZSBhdHRyaWJ1dGUgdG8gYXZvaWQgaW5kZWZpbml0ZSBsb29wXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgcmVwbGFjZTogIGZhbHNlLFxuICAgIC8vIFN0b3Agb3RoZXIgZGlyZWN0aXZlcyBmcm9tIHJ1bm5pbmcgKHRoZXkgd2lsbCBiZSBydW4gd2l0aCAkY29tcGlsZSBpcyBjYWxsZWQpXG4gICAgdGVybWluYWw6IHRydWUsXG4gICAgcmVxdWlyZTogJ150cmFuc2xhdGVCYXNlJyxcbiAgICAvLyBNYWtlIHN1cmUgdGhpcyBkaXJlY3RpdmUgaXMgcnVuIGZpcnN0XG4gICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgbGluazogICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB0cmFuc2xhdGVCYXNlQ3RybCkge1xuICAgICAgbGV0IHRyYW5zbGF0ZUtleSA9IHRyYW5zbGF0ZUJhc2VDdHJsLmdldFRyYW5zbGF0aW9uS2V5KGF0dHJzLnRyYW5zbGF0ZUNoaWxkKTtcbiAgICAgIGxldCB0cmFuc2xhdGVJbnRvID0gYXR0cnMudHJhbnNsYXRlQ2hpbGRJbnRvO1xuICAgICAgbGV0IHRyYW5zbGF0ZVZhbHVlcztcblxuICAgICAgaWYgKHRyYW5zbGF0ZUludG8gJiYgYXR0cnMudHJhbnNsYXRlVmFsdWVzKSB7XG4gICAgICAgIHRyYW5zbGF0ZVZhbHVlcyA9IHNjb3BlLiRldmFsKGF0dHJzLnRyYW5zbGF0ZVZhbHVlcyk7XG4gICAgICB9XG5cbiAgICAgIHJlYnVpbGRFbGVtZW50KGVsZW1lbnQsIHRyYW5zbGF0ZUtleSwgdHJhbnNsYXRlSW50bywgdHJhbnNsYXRlVmFsdWVzKTtcblxuICAgICAgJGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZHRyd1RyYW5zbGF0ZUNoaWxkRGlyZWN0aXZlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vdHJhbnNsYXRlLWNoaWxkLWRpcmVjdGl2ZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=