const handlerByName = {};

const getAdditions = (value, oldValues) =>
  Object.keys(value).reduce(
    (acc, k) => {
      if (oldValues[k] === undefined) {
        acc[k] = value[k];
      }
      return acc;
    },
    {},
  );

const getDeletions = (value, oldValues) =>
  Object.keys(oldValues).reduce(
    (acc, k) => {
      if (value[k] === undefined) {
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
  logInit: (name, value) => {
    output.logInit(
      name,
      [{
        name: 'initial props',
        value,
      }],
    );
    handlerByName[name] = value;
  },
  logUpdate: (name, value) => {
    output.logUpdate(
      name,
      [{
        name: 'new props',
        value,
      }, {
        name: 'additions',
        value: getAdditions(value, handlerByName[name]),
      }, {
        name: 'deletions',
        value: getDeletions(value, handlerByName[name]),
      }, {
        name: 'changes',
        value: getDifference(value, handlerByName[name]),
      }],
    );
    handlerByName[name] = value;
  },
});
