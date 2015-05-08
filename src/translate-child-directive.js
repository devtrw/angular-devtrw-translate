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
    replace:  false,
    // Stop other directives from running (they will be run with $compile is called)
    terminal: true,
    require: '^translateBase',
    // Make sure this directive is run first
    priority: 1000,
    link:     function link(scope, element, attrs, translateBaseCtrl) {
      let translateKey = translateBaseCtrl.getTranslationKey(attrs.translateChild);
      let translateInto = attrs.translateChildInto;
      let translateValues;

      if (translateInto && attrs.translateValues) {
        translateValues = scope.$eval(attrs.translateValues);
      }

      rebuildElement(element, translateKey, translateInto, translateValues);

      $compile(element)(scope);
    }
  };
}

export default dtrwTranslateChildDirective;
