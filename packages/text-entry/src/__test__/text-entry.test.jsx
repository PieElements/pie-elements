import React from 'react';

import renderer from 'react-test-renderer';
import { TextEntry } from '../text-entry.jsx';

jest.mock('@pie-libs/render-ui', () => ({
  indicators: {
    Correct: jest.fn(),
    Incorrect: jest.fn(),
    PartiallyCorrect: jest.fn(),
    NothingSubmitted: jest.fn()
  }
}));

describe('text-entry', () => {

  it('renders', () => {
    const model = {}
    const session = {}
    const classes = {}

    const tree = renderer.create(<TextEntry
      model={model}
      session={session}
      classes={classes}
    />);
    expect(tree).toMatchSnapshot();

  });
})