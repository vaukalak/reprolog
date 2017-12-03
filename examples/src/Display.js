import React from 'react';
import PropTypes from 'prop-types';
import { withLogger } from 'reprolog';

const Display = ({ count }) => (
  <div>Clicked: {count} times.</div>
);

Display.propTypes = {
  count: PropTypes.number.isRequired,
};

export default withLogger()(Display);
