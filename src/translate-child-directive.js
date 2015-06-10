function dtrwTranslateChildDirective($compile, $translate) {

  function setValueForAttrs(element, targetAttrs, value) {
    targetAttrs.forEach((targetAttrs) => {
      element.attr(targetAttrs, value);
    });
  }

  function parseTranslateChildAttributes(configString) {
    let keyAttributes = [];
    let valueAttributes = [];
    let attributes = configString
      .replace(/[\[\]\(\)\s]+/g, '') // remove parenthesis, brackets, an spaces
      .split(',');

    attributes.forEach((attributeName) => {
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
    console.log('parsing: ', attribute);
    let parts = attribute.split('=');

    // by default we just set the translation key on the `translate` attributes
    if (1 === parts.length) {
      return {
        translateKey:    parts[0],
        keyAttributes:   ['translate'],
        valueAttributes: []
      };
    }

    let parsedAttributes = parseTranslateChildAttributes(parts[0]);

    let parsed = {
      translateKey:    parts[1],
      keyAttributes:   parsedAttributes[0],
      valueAttributes: parsedAttributes[1]
    };
    console.log('parsed: ', parsed);

    return parsed;
  }

  return {
    restrict: 'A',
    replace:  false,
    // Stop other directives from running (they will be run with $compile is called)
    terminal: true,
    require:  '?^^translateBase',
    // Make sure this directive is run first
    priority: 1000,
    link:     function link(scope, element, attrs, translateBaseCtrl) { // jshint ignore:line
      let {
        translateKey,
        keyAttributes,
        valueAttributes
        } = parseTranslateChildAttr(attrs.translateChild);

      translateKey = translateBaseCtrl ?
        translateBaseCtrl.getTranslationKey(translateKey) :
        `COULD_NOT_FIND_TRANSLATE_BASE_CONTROLLER_FOR_CHILD-${translateKey}`;

      if (0 < keyAttributes.length) {
        setValueForAttrs(element, keyAttributes, translateKey);
      }

      if (0 < valueAttributes.length) {
        let translateValues = (attrs.translateValues) ? scope.$eval(attrs.translateValues) : {};
        setValueForAttrs(
          element,
          valueAttributes,
          $translate.instant(translateKey, translateValues)
        );
      }

      element.removeAttr('translate-child'); //remove the attribute to avoid indefinite loop

      $compile(element)(scope);
    }
  };
}

export default /*@ngInject*/ dtrwTranslateChildDirective;
