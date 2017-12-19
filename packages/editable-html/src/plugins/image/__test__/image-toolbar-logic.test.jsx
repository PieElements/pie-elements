import { assert, stub } from 'sinon';

import Adapter from 'enzyme-adapter-react-15';
import { Data } from 'slate';
import { ImageToolbar } from '../image-toolbar';
import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

function MockChange() {

  var calls = [];

  this.getCalls = function () {
    return calls;
  }

  this.setNodeByKey = function (key, data) {
    calls.push({ name: 'setNodeByKey', key, data });
    return this;
  }
}

test('onChange is called on button click', () => {
  // Render a checkbox with label in the document
  const onChange = stub();
  const node = {
    key: 1,
    data: Data.create({ resizePercent: 100 })
  }

  const change = new MockChange();

  const value = {
    change: stub().returns(change)
  }

  const toolbar = shallow(<ImageToolbar
    node={node}
    value={value}
    classes={{}}
    onChange={onChange} />);

  const tbs = toolbar.find('[percent=25]');

  tbs.simulate('click');
  expect(change.getCalls().length).toEqual(1);
  const c = change.getCalls()[0];
  expect(c.key).toEqual(1);
  expect(c.name).toEqual('setNodeByKey');
});