export default output => ({
  logInit: (name, value) => {
    output.out(
      'initializing component',
      name,
      [{
        name: 'initial props',
        value,
      }],
    );
  },
  logUpdate: (name, value) => {
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
