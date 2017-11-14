import React from 'react';
import PropTypes from 'prop-types';
import LoggerProp from './proptypes/LoggerProp';

class LoggerProvider extends React.Component {
  getChildContext() {
    const { propsLogger } = this.props;
    return { propsLogger };
  }

  render() {
    return this.props.children;
  }
}

LoggerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  propsLogger: LoggerProp.isRequired,
};

LoggerProvider.childContextTypes = {
  propsLogger: LoggerProp,
};

export default LoggerProvider;
