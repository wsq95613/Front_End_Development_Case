const isEmpty = require('./formChecker');

test('isEmpty', () => {
    const dest = '';
    expect(isEmpty(dest)).toBe(alert('dest is empty'));
  });