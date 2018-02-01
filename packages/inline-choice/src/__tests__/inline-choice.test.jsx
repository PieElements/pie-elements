import React from 'react';
import InlineChoice from '../inline-choice';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

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


describe('InlineChoice Component', () => {
  it('should render component', () => {
    const tree = renderer.create(<InlineChoice
      {...model}
      session={props.session}
      onChoiceChanged={props.onChoiceChanged()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});