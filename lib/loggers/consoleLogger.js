/* eslint-disable no-console */
export default {
  logInit: (name, initialProps) => {
    console.groupCollapsed(`initializing component ${name}`);
    console.log('initial props: ', initialProps);
    console.groupEnd();
  },

  logUpdate: (name, oldProps, newProps) => {
    console.groupCollapsed(`updating component ${name}`);
    console.log('old props: ', oldProps);
    console.log('new props: ', newProps);
    console.groupEnd();
  },
};
