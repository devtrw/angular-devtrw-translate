function dtrwTranslateChildDirective($compile, $translate) {

  return {
    restrict: 'A',
    replace:  false,
    // Stop other directives from running (they will be run with $compile is called)
    terminal: true,
    require:  '?^^translateBase',
    // Make sure this directive is run first
    priority: 1000,
    link:     function link(scope, element, attrs, translateBaseCtrl) { // jshint ignore:line
      let {translateChildInto, translateChildKeyInto, translateValues} = attrs;
      let translateKey = translateBaseCtrl ?
        translateBaseCtrl.getTranslationKey(attrs.translateChild) :
        `COULD_NOT_FIND_TRANSLATE_BASE_CONTROLLER_FOR_CHILD-${attrs.translateChild}`;

      function setValueForAttrs(targetAttrs, value) {
        targetAttrs
          .split(',')
          .forEach((targetAttrs) => {
            element.attr(targetAttrs, value);
          });
      }

      if (translateChildInto) {
        translateValues = (translateValues) ? scope.$eval(translateValues) : {};
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

export default /*@ngInject*/ dtrwTranslateChildDirective;
