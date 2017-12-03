/* global window */
/* eslint-disable no-console */
import isRuntimeConfig from './isRuntimeConfig';

const STORAGE_ITEM_NAME = 'reprolog.config';
const listeners = [];
let instance;
let config;

export default (initialConfig = { whiteList: [] }) => {
  const storedConfig = window.localStorage.getItem(STORAGE_ITEM_NAME);
  config = initialConfig;
  if (storedConfig) {
    try {
      config = JSON.parse(storedConfig);
    } catch (err) {
      console.warn('could not parse json');
    }
  }
  if (instance) {
    throw new Error('instance already exists!');
  }
  window.reprolog = {
    dropCache: () => {
      window.localStorage.setItem(STORAGE_ITEM_NAME, undefined);
    },
    updateWhiteList: (whiteList = [], save) => {
      config = {
        ...config,
        whiteList,
      };
      if (save) {
        window.localStorage.setItem(
          STORAGE_ITEM_NAME,
          JSON.stringify(config),
        );
      }
      listeners.forEach((v) => { v(config); });
    },
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
