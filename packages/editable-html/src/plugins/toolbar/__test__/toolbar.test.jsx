import { Data } from 'slate';
import { RawToolbar } from '../toolbar';
import React from 'react';
import renderer from 'react-test-renderer';
import { stub } from 'sinon';

jest.mock('material-ui/IconButton', () => {
  return (props) => <div className={props.className} style={props.style} ariaLabel={props['aria-label']}></div>
})

const simpleObject = function () {
  const out = {}
  for (var a in arguments) {
    const value = arguments[a];
    out[value] = value;
  }
  return out;
}

describe('toolbar', () => {

  it('renders custom toolbar', () => {

    const node = {}

    const value = {
      isCollapsed: true,
      startKey: 1,
      document: {
        getClosestInline: stub().returns(node)
      }
    }

    const plugins = [
      {

      }
    ];
  });

  it('renders default toolbar', () => {
    const onDelete = stub();

    const classes = simpleObject('inline', 'toolbar', 'focused', 'shared', 'inline')

    const plugins = [
      {
        toolbar: {}
      }
    ];

    const tree = renderer
      .create(<RawToolbar
        plugins={plugins}
        classes={classes}
        value={{}}
        onDone={() => ({})} />, {
        createNodeMock: el => {
          if (el.type === 'img') {
            return {
              naturalWidth: 100,
              naturalHeight: 100
            }
          }
        }
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
