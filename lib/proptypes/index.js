import PropTypes from 'prop-types';

export const LoggerProp = PropTypes.shape({
  logInit: PropTypes.func.isRequired,
  logUpdate: PropTypes.func.isRequired,
});

export const LoggerConfigProp = PropTypes.shape({
  whiteList: PropTypes.arrayOf(PropTypes.string),
});
