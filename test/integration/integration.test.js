import React from 'react';
import { mount } from 'enzyme';
import LoggerProvider from '../../lib/LoggerProvider';
import withLogger from '../../lib/hoc/withLogger';

const unitTestLogger = () => {
  const logHistory = [];
  return {
    logInit: (name, props) => {
      logHistory.push({ type: 'init', name, props });
    },
    logUpdate: (name, props) => {
      logHistory.push({ type: 'update', name, props });
    },
    getLog: () => [...logHistory],
  };
};

describe('integration', () => {
  describe('simple flow', () => {
    const logger = unitTestLogger();
    const A = ({ foo }) => null;
    const WrappedA = withLogger()(A);
    const Component = ({ foo }) => (
      <LoggerProvider propsLogger={logger} propsLoggerConfig={{ }}>
        <WrappedA foo={foo} />
      </LoggerProvider>
    );
    const wrapper = mount(<Component foo={1} />);
    it('should log initialization', () => {
      expect(logger.getLog()[0]).toEqual({
        type: 'init',
        name: 'A',
        props: { foo: 1 },
      });
    });

    it('should log update', () => {
      wrapper.setProps({ foo: 2 });
      expect(logger.getLog()[1]).toEqual({
        type: 'update',
        name: 'A',
        props: { foo: 2 },
      });
    });
  });

  describe('display name', () => {
    const logger = unitTestLogger();
    const A = () => null;
    const WrappedA = withLogger('CustomName')(A);
    const Component = ({ foo }) => (
      <LoggerProvider propsLogger={logger} propsLoggerConfig={{ }}>
        <WrappedA foo={foo} />
      </LoggerProvider>
    );
    mount(<Component />);
    it('should log with right display name', () => {
      expect(logger.getLog()[0]).toEqual({
        type: 'init',
        name: 'CustomName',
        props: { },
      });
    });
  });

  describe('whitelist', () => {
    const logger = unitTestLogger();
    const config = {
      whiteList: ['B'],
    };
    const A = () => null;
    const B = () => null;
    const WrappedA = withLogger()(A);
    const WrappedB = withLogger()(B);
    const Component = ({ foo }) => (
      <LoggerProvider
        propsLogger={logger}
        propsLoggerConfig={config}
      >
        <WrappedA foo={foo} />
        <WrappedB foo={foo} />
      </LoggerProvider>
    );
    mount(<Component foo={5} />);
    it('should filter by whiteList', () => {
      expect(logger.getLog()).toEqual([{
        type: 'init',
        name: 'B',
        props: { foo: 5 },
      }]);
    });
  });
});
