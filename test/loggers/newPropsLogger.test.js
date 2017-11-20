import newPropsLogger from '../../lib/loggers/newPropsLogger';

describe('newPropsLogger', () => {
  it('should output initial props correctly', () => {
    const a = { foo: 1 };
    const b = { bar: 2 };
    newPropsLogger({
      logInit: (name, groups) => {
        expect(name).toEqual('temp');
        expect(groups).toEqual([{ name: 'initial props', value: a }]);
      },
    }).logInit('temp', a);
  });

  it('should output update props correctly', () => {
    const a = { foo: 1 };
    newPropsLogger({
      logUpdate: (name, groups) => {
        expect(name).toEqual('temp');
        expect(groups).toEqual([{ name: 'new props', value: a }]);
      },
    }).logUpdate('temp', a);
  });
});