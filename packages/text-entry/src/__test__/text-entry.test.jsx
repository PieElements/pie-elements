import React from 'react';

import renderer from 'react-test-renderer';
import { TextEntry } from '../text-entry.jsx';

describe('text-entry', () => {

  it('renders', () => {

    const tree = renderer.create(<TextEntry />)
    expect(tree).toMatchSnapshot();

  });
})