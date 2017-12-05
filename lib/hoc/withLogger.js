import React from 'react';
import getDisplayName from 'react-display-name';
import PropTypes from 'prop-types';
import { LoggerProp } from '../proptypes';

const identity = i => i;

const shouldLog = ({ whiteList }, name) =>
  !whiteList || whiteList.indexOf(name) !== -1;

let counter = 0;

const formatNameKey = (name, index) => `${name} [${index}]`;

export default (name) => {
  if (process.env.NODE_ENV === 'production') {
    return identity;
  }
  return (Component) => {
    const getName = () => name || getDisplayName(Component);

    const LogComponent = class extends React.Component {
      constructor(props, { propsLogger, getPropsLoggerConfig }) {
        super();
        this.index = counter;
        counter++;
        const componentName = getName();
        if (shouldLog(getPropsLoggerConfig(), componentName)) {
          propsLogger.logInit(
            componentName,
            formatNameKey(componentName, this.index),
            props,
          );
        }
      }

      componentWillReceiveProps(nextProps) {
        const { propsLogger, getPropsLoggerConfig } = this.context;
        const componentName = getName();
        if (shouldLog(getPropsLoggerConfig(), componentName)) {
          propsLogger.logUpdate(
            componentName,
            formatNameKey(componentName, this.index),
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
      getPropsLoggerConfig: PropTypes.func,
    };

    return LogComponent;
  };
};
