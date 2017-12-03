import React from 'react';
import PropTypes from 'prop-types';
import { withLogger } from 'reprolog';

const Button = ({ onClick }) => (
  <button onClick={onClick}>
    Press to increment
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default withLogger()(Button);
