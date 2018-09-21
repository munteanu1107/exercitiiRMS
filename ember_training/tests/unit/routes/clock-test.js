import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | clock', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:clock');
    assert.ok(route);
  });
});
