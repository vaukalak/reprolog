import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState } from 'recompose';
import { withLogger } from 'reprolog';

const Counter = ({ count, setCount }) => (
  <button
    onClick={() => { setCount(count + 1); }}
  >
    Count: {count}
  </button>
);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
};

const enhancer = compose(
  withState('count', 'setCount', 0),
  withLogger(),
);

export default enhancer(Counter);
