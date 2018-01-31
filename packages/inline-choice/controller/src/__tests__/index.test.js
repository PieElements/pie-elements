import { model as getModel } from '../index';

describe('controller', () => {

  let model;

  beforeEach(() => {
    model = {
      choices: [
        {
          correct: true,
          label: [
            { lang: 'en-US', value: 'Sweden' }
          ]
        }
      ]
    }
  });

  it('returns a Promise object', () => getModel(model, {}, {})
    .then(result => {
      expect(result).toMatchObject({});
    }));
});