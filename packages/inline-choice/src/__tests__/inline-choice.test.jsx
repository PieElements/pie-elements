import React from 'react';
import InlineChoice from '../inline-choice';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

const props = {
  session: {},
  onChoiceChanged: () => { },
};

const model = {
  choices: [],
  classes: {},
  disabled: false
}

const wrapper = shallow(<InlineChoice
  {...model}
  session={props.session}
  onChoiceChanged={props.onChoiceChanged()} />);

describe('InlineChoice Component', () => {
  it('should render component', () => {
    expect(wrapper.find(InlineChoice).first().length).toEqual(1);
  });
});