/* global window */
import isRuntimeConfig from './isRuntimeConfig';

const listeners = [];
let instance;
let config;

export default (initialConfig = { whiteList: [] }) => {
  config = initialConfig;
  if (instance) {
    throw new Error('instance already exists!');
  }
  window.updateWhiteList = (whiteList = []) => {
    config = {
      ...config,
      whiteList,
    };
    listeners.forEach((v) => { v(config); });
  };
  instance = {
    [isRuntimeConfig]: true,
    getConfig: () => config,
    addUpdateListener: (cb) => {
      const index = listeners.indexOf(cb);
      if (index === -1) {
        listeners.push(cb);
      }
    },
    removeUpdateListener: (cb) => {
      const index = listeners.indexOf(cb);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    },
  };
  return instance;
};
