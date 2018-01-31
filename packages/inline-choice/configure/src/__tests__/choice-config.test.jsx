import React from 'react';
import renderer from 'react-test-renderer';
import { ChoiceConfig } from '../choice-config';


describe('snapshot', () => {

  it('renders', () => {
    const classes = {}
    const tree = renderer.create(<ChoiceConfig classes={classes} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});