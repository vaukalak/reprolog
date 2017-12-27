import consoleGateway from './consoleGateway';

export default () => ({
  out: (operation, consoleName, groups) => {
    consoleGateway.groupCollapsed(`${operation} ${consoleName}`);
    groups.forEach(({ name, value }) => {
      consoleGateway.log(`${name}: `, value);
    });
    consoleGateway.groupEnd();
  },
});
