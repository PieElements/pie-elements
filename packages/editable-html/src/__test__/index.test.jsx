import React from 'react';
import EditableHtml, { htmlToValue, valueToHtml } from '../index';
import { shallow, configure } from 'enzyme';
import debug from 'debug';


import { mockComponents } from './utils';
import Adapter from 'enzyme-adapter-react-15';

const log = debug('editable-html:test');
beforeAll(() => {
  configure({ adapter: new Adapter() });
});

jest.mock('@pie-libs/math-input', () => {
  return {
    EditableMathInput: jest.fn()
  }
});

expect.extend({
  toEqualHtml(value, html) {
    const v = valueToHtml(value);
    const pass = v === html;
    return {
      pass,
      message: () => `expected ${html} to match ${v}`
    }
  }
});

test('onFocus/onBlur resets the value', () => {

  const value = {
    document: {
    }
  }

  const wrapper = shallow(<EditableHtml
    markup={'hi'}
    onChange={jest.fn()}
    value={value} />);

  wrapper.instance().onFocus();

  const v = htmlToValue('hi');
  expect(wrapper.state('stashedValue')).toEqualHtml('<div>hi</div>');
  wrapper.instance().onChange({ value: htmlToValue('new value') });
  expect(wrapper.state('value')).toEqualHtml('<div>new value</div>');
  return wrapper.instance()
    .onBlur({})
    .then(() => {
      expect(wrapper.state('value')).toEqualHtml('<div>hi</div>');
    });
});

test('onFocus stashes the value', () => {

  const value = {
    document: {
    }
  }

  const wrapper = shallow(<EditableHtml
    markup={'hi'}
    onChange={jest.fn()}
    value={value} />);

  wrapper.instance().onFocus();

  expect(wrapper.state('stashedValue')).toEqualHtml('<div>hi</div>');

});
