import React from 'react';
import InlineChoice from "./../src/inline-choice.jsx";
import { expect } from 'chai';
import { shallow, mount, render, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

const props = {
  session: {},
  onChoiceChanged: () => {},
};

const model = {
  choices : [],
  classes : {},
  disabled : false
}

const wrapper = shallow(<InlineChoice {...model} session={props.session}  onChoiceChanged={props.onChoiceChanged()} />);

describe('InlineChoice Component', () => {
  it('should render component', function() {
    expect(wrapper.find('.InlineChoice-container-1').first().length).to.equal(1);
  });

  console.log(wrapper.html());
  // it('should render component', function() {
  //   expect(wrapper.find('.InlineChoice-container-1').first().length).to.equal(1);
  // });
});