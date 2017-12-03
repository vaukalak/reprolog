export default output => ({
  logInit: (name, key, value) => {
    output.out(
      'initializing component',
      name,
      [{
        name: 'initial props',
        value,
      }],
    );
  },
  logUpdate: (name, key, value) => {
    output.out(
      'updating component',
      name,
      [{
        name: 'new props',
        value,
      }],
    );
  },
});
