import 'angular-translate';

import angular from 'angular';

import dtrwTranslateBaseDirective  from './translate-base-directive';
import dtrwTranslateChildDirective from './translate-child-directive';

const ngModule = angular.module('dtrw.translate', [
  'pascalprecht.translate'
]);

ngModule
  .directive('translateBase', dtrwTranslateBaseDirective)
  .directive('translateChild', dtrwTranslateChildDirective);

export default ngModule;
