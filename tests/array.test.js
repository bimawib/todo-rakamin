test('Array matching', () => {
  const frameworkPHP = ['Yii', 'Codeigniter', 'Laravel'];
  expect(frameworkPHP).toContain('Codeigniter');
  expect(frameworkPHP).toEqual(['Yii', 'Codeigniter', 'Laravel']);

  const unitTestingLibrary = [{ title: 'jest' }, { title: 'mocha' }];
  expect(unitTestingLibrary).toContainEqual({ title: 'mocha' });
  expect(unitTestingLibrary).toEqual([{ title: 'jest' }, { title: 'mocha' }]);
});