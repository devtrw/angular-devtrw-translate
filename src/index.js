import 'angular-translate';
import 'angular-ui-router';
import 'angular-devtrw-filters';

import angular from 'angular';

import dtrwTranslateBaseDirective  from './translate-base-directive';
import dtrwTranslateChildDirective from './translate-child-directive';
import dtrwTranslateProvider       from './translate-provider';

const ngModule = angular.module('dtrw.translate', [
  'dtrw.filters.hyphenated-to-camel-case',
  'pascalprecht.translate',
  'ui.router'
]);

ngModule
  .directive('translateBase', dtrwTranslateBaseDirective)
  .directive('translateChild', dtrwTranslateChildDirective)
  .provider('dtrwTranslate', dtrwTranslateProvider);

export default ngModule;
