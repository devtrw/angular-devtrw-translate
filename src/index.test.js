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

    beforeEach(() => {
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

  describe('dtrwTranslate service without configuration', () => {
    beforeEach(window.module(ngModule.name));

    beforeEach(() => {
      inject($injector => {
        $state = $injector.get('$state');
        dtrwTranslate = $injector.get('dtrwTranslate');
      });
    });

    beforeEach(() => {
      $state.current = {name: 'app.states.some-state-name'};
    });

    it('should combine the state name, and the passed in key', () => {
      assert.equal(
        dtrwTranslate.getStateKey('CHILD.TRANSLATION.KEY'),
        'app.states.someStateName.CHILD.TRANSLATION.KEY'
      );
    });
  });
});
