import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import LoggerProvider from '../lib/LoggerProvider';
import isRuntimeConfig from '../lib/config/isRuntimeConfig';
import unitTestLogger from '../lib/loggers/unitTestLogger';

const TestConfig = ({
  addUpdateListener,
  removeUpdateListener,
}) => ({
  [isRuntimeConfig]: true,
  addUpdateListener,
  removeUpdateListener,
  getConfig: () => ({
    whiteList: [],
  }),
});

describe('LoggerProvider', () => {
  it('should subscribe to runtime config', () => {
    const init = {
      addUpdateListener: sinon.spy(),
      removeUpdateListener: sinon.spy(),
    };
    expect(init.addUpdateListener.notCalled).toBeTruthy();
    const config = TestConfig(init);
    const tag = (
      <LoggerProvider
        propsLogger={unitTestLogger}
        propsLoggerConfig={config}
      >
        <div />
      </LoggerProvider>
    );
    const wrapper = mount(tag);
    expect(init.addUpdateListener.called).toBeTruthy();
    expect(init.removeUpdateListener.notCalled).toBeTruthy();
    wrapper.unmount();
    expect(init.removeUpdateListener.called).toBeTruthy();
  });
});
