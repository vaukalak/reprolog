import React from 'react';
import getDisplayName from 'react-display-name';
import LoggerProp from '../proptypes/LoggerProp';

const identity = i => i;

export default (config: {}) => (name) => {
  if (config.whiteList && config.whiteList.indexOf(name) === -1) {
    return identity;
  }
  return (Component) => {
    const LogComponent = class extends React.Component {
      constructor(props, { propsLogger }) {
        super();
        if (propsLogger) {
          propsLogger.logInit(
            name || getDisplayName(Component),
            props,
          );
        }
      }

      componentWillReceiveProps(nextProps) {
        const { propsLogger } = this.context;
        propsLogger.logUpdate(
          `${name || getDisplayName(Component)}`,
          nextProps,
        );
      }

      render() {
        return (
          <Component {...this.props} />
        );
      }
    };

    LogComponent.contextTypes = {
      propsLogger: LoggerProp,
    };

    return LogComponent;
  };
};
