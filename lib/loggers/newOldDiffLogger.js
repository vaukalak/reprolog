const handlerByName = {};

const getDifference = (value, oldValues) =>
  Object.keys(oldValues).reduce(
    (acc, k) => {
      if (value[k] !== undefined && value[k] !== oldValues[k]) {
        acc[k] = value[k];
      }
      return acc;
    },
    {},
  );

export default output => ({
  logInit: (name, value) => {
    output.out(
      'initializing component',
      name,
      [{
        name: 'initial props',
        value,
      }],
    );
    handlerByName[name] = value;
  },
  logUpdate: (name, value) => {
    const oldValues = handlerByName[name];
    output.out(
      'updating component',
      name,
      oldValues ? [{
        name: 'old props',
        value: oldValues,
      }, {
        name: 'new props',
        value,
      }, {
        name: 'changes',
        value: getDifference(value, oldValues),
      }] : [{
        name: 'new props',
        value,
      }],
    );
    handlerByName[name] = value;
  },
});
