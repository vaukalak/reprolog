import React from 'react';
import PropTypes from 'prop-types';
import { LoggerProp, LoggerConfigProp } from './proptypes';
import isRuntimeConfig from './config/isRuntimeConfig';

const getConfig = config => (
  config[isRuntimeConfig] ?
    config.getConfig() :
    config
);

class LoggerProvider extends React.Component {
  constructor(props) {
    super();
    const { propsLoggerConfig } = props;
    this.config = getConfig(propsLoggerConfig);
  }

  getChildContext() {
    const { propsLogger } = this.props;
    return {
      propsLogger,
      getPropsLoggerConfig: () => this.config,
    };
  }

  componentDidMount() {
    const { propsLoggerConfig } = this.props;
    if (propsLoggerConfig[isRuntimeConfig]) {
      propsLoggerConfig.addUpdateListener(this.updateConfig);
    }
  }

  componentWillUnmount() {
    const { propsLoggerConfig } = this.props;
    if (propsLoggerConfig[isRuntimeConfig]) {
      propsLoggerConfig.removeUpdateListener(this.updateConfig);
    }
  }

  updateConfig = (config) => {
    this.config = config;
  };

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
  getPropsLoggerConfig: PropTypes.func.isRequired,
};

export default LoggerProvider;
