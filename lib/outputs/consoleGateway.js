/* eslint-disable no-console */
// just a wrapper around console api to prevent environment specific failures

let levels = 0;

const repeat = n => new Array(n + 1).join('\t');

const log = (...rest) => {
  if (levels) {
    console.log(repeat(levels), ...rest);
  } else {
    console.log(...rest);
  }
};

const groupCollapsed = (...rest) => {
  if (console.groupCollapsed) {
    console.groupCollapsed(...rest);
  } else {
    log('OPEN GROUP', ...rest);
    levels++;
  }
};

const groupEnd = (...rest) => {
  if (console.groupCollapsed) {
    console.groupEnd(...rest);
  } else {
    levels--;
    log('END GROUP', ...rest);
  }
};

const table = (...rest) => {
  if (console.table) {
    console.table(...rest);
  } else {
    log(...rest);
  }
};

export default {
  log,
  groupCollapsed,
  groupEnd,
  table,
};
