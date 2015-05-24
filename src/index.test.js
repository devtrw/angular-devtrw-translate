import 'angular-mocks/angular-mocks';

// fixme: write tests one api is frozen

import ngModule from '.';

describe(ngModule.name, () => {
  let $state;
  let dtrwTranslate;

  describe('dtrwTranslate service', () => {
    beforeEach(window.module(ngModule.name, function (dtrwTranslateProvider) {
      dtrwTranslateProvider.setBaseTranslationKey('dtrw');
    }));

    beforeEach(function () {
      inject($injector => {
        $state = $injector.get('$state');
        dtrwTranslate = $injector.get('dtrwTranslate');
      });
    });

    beforeEach(() => {
      $state.current = {name: 'app.states.some-state-name'};
    });

    it('should combine the base translation key, the state name, and the passed in key', () => {
      assert.equal(
        dtrwTranslate.getStateKey('CHILD.TRANSLATION.KEY'),
        'dtrw.app.states.someStateName.CHILD.TRANSLATION.KEY'
      );
    });
  });

  describe('dtrwTranslate service missing configuration', () => {
    beforeEach(window.module(ngModule.name));

    it('should throw an error when the base translation key is not configured', () => {
      assert.throws(() => {
        inject($injector => $injector.get('dtrwTranslate'));
      });
    });
  });
});
