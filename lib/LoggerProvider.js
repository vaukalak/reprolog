import React from 'react';
import PropTypes from 'prop-types';
import { LoggerProp, LoggerConfigProp } from './proptypes';

class LoggerProvider extends React.Component {
  getChildContext() {
    const { propsLogger, propsLoggerConfig } = this.props;
    return { propsLogger, propsLoggerConfig };
  }

  render() {
    return this.props.children;
  }
}

LoggerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  propsLogger: LoggerProp.isRequired,
  propsLoggerConfig: LoggerConfigProp.isRequired,
};

LoggerProvider.childContextTypes = {
  propsLogger: LoggerProp,
  propsLoggerConfig: LoggerConfigProp,
};

export default LoggerProvider;
