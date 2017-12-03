const handlerByName = {};

const getAdditions = (value, oldValues) =>
  Object.keys(value).reduce(
    (acc, k) => {
      if (!oldValues.hasOwnProperty(k)) {
        acc[k] = value[k];
      }
      return acc;
    },
    {},
  );

const getDeletions = (value, oldValues) =>
  Object.keys(oldValues).reduce(
    (acc, k) => {
      if (!value.hasOwnProperty(k)) {
        acc[k] = oldValues[k];
      }
      return acc;
    },
    {},
  );

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
  logInit: (name, key, value) => {
    output.out(
      'initializing component',
      name,
      [{
        name: 'initial props',
        value,
      }],
    );
    handlerByName[key] = value;
  },
  logUpdate: (name, key, value) => {
    const oldValue = handlerByName[key];
    const diffs = oldValue ? [{
      name: 'additions',
      value: getAdditions(value, oldValue),
    }, {
      name: 'deletions',
      value: getDeletions(value, oldValue),
    }, {
      name: 'changes',
      value: getDifference(value, oldValue),
    }] : [];
    output.out(
      'updating component',
      name,
      [{
        name: 'new props',
        value,
      }, ...diffs],
    );
    handlerByName[name] = value;
  },
});
