import { buildState, reducer } from '../src/ordering';

import { expect } from 'chai';

const defaultChoices = [
  { id: 0, moveOnDrag: true },
  { id: 1, moveOnDrag: true }
];

describe('ordering', () => {


  describe('reducer, includeTargets: false', () => {
    describe('swap', () => {
      let initialState, to, from, state;
      beforeEach(() => {
        initialState = buildState(defaultChoices, [0, 1], { includeTargets: false });
        from = initialState.tiles[0];
        to = initialState.tiles[1];
        state = reducer({ type: 'move', from, to }, initialState);
      });
      it.only('swaps', () => {
        expect(state.response).to.eql([1, 0]);
      });
    });
  });

  describe('reducer, includeTargets: true', () => {


    let initialState;

    describe('target -> choice', () => {

      beforeEach(() => {
        initialState = buildState(defaultChoices, [undefined, 1], { includeTargets: true });
      });

      describe('moves target back to choice', () => {
        let from, to, state;

        beforeEach(() => {
          from = initialState.tiles[3];
          to = initialState.tiles[1];
          state = reducer({ type: 'move', from, to }, initialState);
        });

        it('updates the response', () => {
          expect(state.response).to.eql([undefined, undefined]);
        });

        it('updates the tiles', () => {
          expect(state.tiles).to.eql([
            { type: 'choice', id: 0, moveOnDrag: true, draggable: true, droppable: false },
            { type: 'choice', id: 1, moveOnDrag: true, draggable: true, droppable: false },
            { type: 'target', index: 0 },
            { type: 'target', index: 1 }
          ]);
        });
      });
    });

    describe('choice -> target', () => {

      beforeEach(() => {
        initialState = buildState(defaultChoices, [], { includeTargets: true });
      });

      describe('moves choice to target', () => {
        let from, to, state;
        beforeEach(() => {
          from = initialState.tiles[0];
          to = initialState.tiles[2];
          state = reducer({ type: 'move', from, to }, initialState);
        });

        it('updates the response', () => {
          expect(state.response).to.eql([0, undefined]);
        });

        it('updates the tiles', () => {
          expect(state.tiles).to.eql([
            { type: 'choice', empty: true, draggable: false, droppable: true },
            { type: 'choice', id: 1, moveOnDrag: true, draggable: true, droppable: false },
            { type: 'target', index: 0, id: 0, draggable: true },
            { type: 'target', index: 1 }
          ])
        });
      });

      it('moves choice to last target', () => {
        const from = initialState.tiles[0];
        const to = initialState.tiles[3];
        const state = reducer({ type: 'move', from, to }, initialState);
        expect(state.response).to.eql([undefined, 0]);
      });
    });

  });

});