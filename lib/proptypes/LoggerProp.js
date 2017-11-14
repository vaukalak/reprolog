import PropTypes from 'prop-types';

export default PropTypes.shape({
  logInit: PropTypes.func.isRequired,
  logUpdate: PropTypes.func.isRequired,
});
