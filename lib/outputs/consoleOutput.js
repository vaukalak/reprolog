/* eslint-disable no-console */
export default () => ({
  out: (operation, consoleName, groups) => {
    console.groupCollapsed(`${operation} ${consoleName}`);
    groups.forEach(({ name, value }) => {
      console.log(`${name}: `, value);
    });
    console.groupEnd();
  },
});
