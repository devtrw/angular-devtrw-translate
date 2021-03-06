import angular from 'angular';

/**
 * @name dtrw.translate.dtrwTranslateProvider
 */
function dtrwTranslateProvider() {
  let baseTranslationKey;

  /**
   * @memberOf dtrw.translate.dtrwTranslateProvider
   * @name setBaseTranslationKey
   *
   * @description
   * Sets the base key prefixed to generated translations
   *
   * @param {string} key
   */
  function setBaseTranslationKey(key) {
    baseTranslationKey = key;
  }

  /**
   * @param $filter
   * @param $state
   * @returns {dtrw.translate.DtrwTranslate}
   *
   * @ngInject
   */
  function $get($filter, $state) {
    /**
     * @name dtrw.translate.dtrwTranslate
     * @constructor
     */
    function DtrwTranslate() {
      let dtrwTranslate = this;

      /**
       * @memberOf dtrw.translate.dtrwTranslate
       * @name getStateKey
       *
       * @description
       * Uses the configured base translation key as well as the
       * current state to construct the full translation key for
       * the passed in value
       *
       * @param {string} key
       * @returns {string}
       */
      function getStateKey(key) {
        let parts = baseTranslationKey ? [baseTranslationKey] : [];

        parts.push(...$state.current.name.split('.').map($filter('hyphenatedToCamelCase')));
        parts.push(key);

        return parts.join('.');
      }

      angular.extend(dtrwTranslate, {
        getStateKey
      });
    }

    return new DtrwTranslate();
  }

  angular.extend(this, {
    $get,
    setBaseTranslationKey
  });
}

export default /* @ngInject */ dtrwTranslateProvider;
