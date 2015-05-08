/*@ngInject*/
function dtrwTranslateChildDirective($compile, $translate) {

  return {
    restrict: 'A',
    replace:  false,
    // Stop other directives from running (they will be run with $compile is called)
    terminal: true,
    require: '^translateBase',
    // Make sure this directive is run first
    priority: 1000,
    link:     function link(scope, element, attrs, translateBaseCtrl) { // jshint ignore:line
      let {translateChildInto, translateChildKeyInto, translateValues} = attrs;
      let translateKey = translateBaseCtrl.getTranslationKey(attrs.translateChild);

      if (translateChildInto && translateChildKeyInto) {
        throw new Error('translate-child-into and translate-child-key-into are mutually exclusive');
      }

      if (translateChildInto) {
        translateValues = (translateValues) ? scope.$eval(translateValues) : {};
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

export default dtrwTranslateChildDirective;
