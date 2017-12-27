import consoleGateway from './consoleGateway';

const createTable = value =>
  Object
    .keys(value)
    .reduce(
      (res, k) => {
        const type = typeof value[k];
        res[k] = {
          Value: type === 'object' ? JSON.stringify(value[k]) : value[k],
          Type: type,
        };
        return res;
      },
      {},
    );

export default () => ({
  out: (operation, componentName, groups) => {
    consoleGateway.groupCollapsed(`${operation} ${componentName}`);
    groups.forEach(({ name, value }) => {
      consoleGateway.groupCollapsed(name);
      consoleGateway.table(createTable(value));
      consoleGateway.groupEnd();
    });
    consoleGateway.groupEnd();
  },
});
