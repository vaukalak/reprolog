import newDiffPropsLogger from '../../lib/loggers/newDiffPropsLogger';

describe('newDiffPropsLogger', () => {
  beforeEach(() => {
    const a = { foo: 1, baz: 2 };

    newDiffPropsLogger({
      out: (operation, name, groups) => {
        expect(name).toEqual('temp');
        expect(groups).toEqual([{ name: 'initial props', value: a }]);
      },
    }).logInit('temp', 'key', a);
  });

  it('should output all diffs correctly', () => {
    const a = { foo: 2, bar: 1 };
    newDiffPropsLogger({
      out: (operation, name, groups) => {
        expect(name).toEqual('temp');
        expect(groups).toEqual([
          { name: 'new props', value: a },
          { name: 'additions', value: { bar: 1 } },
          { name: 'deletions', value: { baz: 2 } },
          { name: 'changes', value: { foo: 2 } },
        ]);
      },
    }).logUpdate('temp', 'key', a);
  });

  it('should not consider `undefined` as deletion', () => {
    const a = { baz: undefined };
    newDiffPropsLogger({
      out: (operation, name, groups) => {
        expect(name).toEqual('temp');
        expect(groups).toEqual([
          { name: 'new props', value: a },
          { name: 'additions', value: { } },
          { name: 'deletions', value: { foo: 1 } },
          { name: 'changes', value: { baz: undefined } },
        ]);
      },
    }).logUpdate('temp', 'key', a);
  });
});
