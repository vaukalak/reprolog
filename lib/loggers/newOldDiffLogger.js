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
    output.out(
      'updating component',
      name,
      [{
        name: 'old props',
        value: handlerByName[name],
      }, {
        name: 'new props',
        value,
      }, {
        name: 'changes',
        value: getDifference(value, handlerByName[name]),
      }],
    );
    handlerByName[name] = value;
  },
});
