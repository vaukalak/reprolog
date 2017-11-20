/* eslint-disable no-console */
export default () => ({
  logInit: (componentName, groups) => {
    console.groupCollapsed(`initializing component ${componentName}`);
    groups.forEach(({ name, value }) => {
      console.groupCollapsed(name);
      console.table(value);
      console.groupEnd();
    });
    console.groupEnd();
  },

  logUpdate: (componentName, groups) => {
    console.groupCollapsed(`updating component ${componentName}`);
    groups.forEach(({ name, value }) => {
      console.groupCollapsed(name);
      console.table(name, value);
      console.groupEnd();
    });
    console.groupEnd();
  },
});
