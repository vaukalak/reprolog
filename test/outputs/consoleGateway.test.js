import sinon from 'sinon';
import consoleOutput from '../../lib/outputs/consoleOutput';

describe('gateway', () => {

  let sandbox;
  let oldConsoleGroupCollapsed;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    oldConsoleGroupCollapsed = console.groupCollapsed;
    console.groupCollapsed = undefined;
  });

  afterEach(() => {
    sandbox.restore();
    console.groupCollapsed = oldConsoleGroupCollapsed;
  });

  it('should not fail when there no specific console api', () => {
    const spy = sandbox.stub(console, 'log');
    consoleOutput().out('update', 'test', [{ name: 'name', value: '1'}]);
    expect(spy.getCall(0).args).toEqual(['OPEN GROUP', 'update test']);
    expect(spy.getCall(1).args).toEqual(['\t', 'name: ', '1']);
    expect(spy.getCall(2).args).toEqual(['END GROUP']);
  });
});