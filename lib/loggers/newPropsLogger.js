export default output => ({
  logInit: (name, value) => {
    output.logInit(
      name,
      [{
        name: 'initial props',
        value,
      }],
    );
  },
  logUpdate: (name, value) => {
    output.logUpdate(
      name,
      [{
        name: 'new props',
        value,
      }],
    );
  },
});
