import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState } from 'recompose';
import { withLogger } from 'reprolog';
import Display from './Display';
import Button from './Button';

const Counter = ({ count, setCount }) => (
  <div>
    <Display count={count} />
    <Button onClick={() => { setCount(count + 1); }} />
  </div>
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
