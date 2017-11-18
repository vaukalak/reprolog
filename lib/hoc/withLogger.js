import React from 'react';
import getDisplayName from 'react-display-name';
import { LoggerProp, LoggerConfigProp } from '../proptypes';

const identity = i => i;

const shouldLog = ({ whiteList }, name) =>
  !whiteList || whiteList.indexOf(name) !== -1;

export default (name) => {
  if (process.env.NODE_ENV === 'production') {
    return identity;
  }
  return (Component) => {
    const LogComponent = class extends React.Component {
      constructor(props, { propsLogger, propsLoggerConfig }) {
        super();
        const componentName = name || getDisplayName(Component);
        if (shouldLog(propsLoggerConfig, componentName)) {
          propsLogger.logInit(
            componentName,
            props,
          );
        }
      }

      componentWillReceiveProps(nextProps) {
        const { propsLogger, propsLoggerConfig } = this.context;
        const componentName = name || getDisplayName(Component);
        if (shouldLog(propsLoggerConfig, componentName)) {
          propsLogger.logUpdate(
            componentName,
            nextProps,
          );
        }
      }

      render() {
        return (
          <Component {...this.props} />
        );
      }
    };

    LogComponent.contextTypes = {
      propsLogger: LoggerProp,
      propsLoggerConfig: LoggerConfigProp,
    };

    return LogComponent;
  };
};
