const unitTestLogger = () => {
  const logHistory = [];
  return {
    logInit: (name, key, props) => {
      logHistory.push({ type: 'init', name, props });
    },
    logUpdate: (name, key, props) => {
      logHistory.push({ type: 'update', name, props });
    },
    getLog: () => [...logHistory],
  };
};

export default unitTestLogger;
