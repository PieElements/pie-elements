import InsertImageHandler from '../insert-image-handler';
import { stub } from 'sinon';

describe('insert image handler', () => {


  const value = {};
  const block = {}
  const onChange = stub();

  const handler = new InsertImageHandler(
    block,
    () => value,
    onChange);

  test('it constructs', () => {
    expect(handler).not.toEqual(undefined);
  });


  describe('cancel', () => {

  });
});