/* eslint-disable no-console */
export default () => ({
  logInit: (consoleName, groups) => {
    console.groupCollapsed(`initializing component ${consoleName}`);
    groups.forEach(({ name, value }) => {
      console.log(`${name}: `, value);
    });
    console.groupEnd();
  },

  logUpdate: (consoleName, groups) => {
    console.groupCollapsed(`updating component ${consoleName}`);
    groups.forEach(({ name, value }) => {
      console.log(`${name}: `, value);
    });
    console.groupEnd();
  },
});
