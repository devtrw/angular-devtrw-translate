/*@ngInject*/
function dtrwTranslateBaseDirective($translate) {
  return {
    restrict:   'A',
    controller: function () {
      let ctrl = this;
      let baseKey;

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
        getTranslationKey,
        setBaseKey,
        translate: translate
      });
    },
    compile:    function compile() {
      return {
        // using pre-link to ensure that the base key is set
        // before the translate-child directive requests it
        pre: function preLink(scope, element, attrs, controller) {
          let baseKey = attrs.translateBase;
          let parentBaseController = element.parent().controller('translateBase');

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

export default dtrwTranslateBaseDirective;
