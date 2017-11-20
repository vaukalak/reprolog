import newPropsLogger from '../../lib/loggers/newDiffPropsLogger';

describe('newDiffPropsLogger', () => {
  beforeEach(() => {
    const a = { foo: 1, baz: 2 };

    newPropsLogger({
      logInit: (name, groups) => {
        expect(name).toEqual('temp');
        expect(groups).toEqual([{ name: 'initial props', value: a }]);
      },
    }).logInit('temp', a);
  });

  it('should output all diffs correctly', () => {
    const a = { foo: 2, bar: 1 };
    newPropsLogger({
      logUpdate: (name, groups) => {
        expect(name).toEqual('temp');
        expect(groups).toEqual([
          { name: 'new props', value: a },
          { name: 'additions', value: { bar: 1 } },
          { name: 'deletions', value: { baz: 2 } },
          { name: 'changes', value: { foo: 2 } },
        ]);
      },
    }).logUpdate('temp', a);
  });
});
