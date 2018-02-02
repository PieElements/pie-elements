import * as controller from '../index';
import _ from 'lodash';

describe('Controller', () => {

  let baseModel = {"choices":[{
      "correct":true,
      "value":"a",
      "label":[{"lang":"en-US","value":"A"}],
      "feedback":{"type":"default","text":[{"lang":"en-US","value":"Iceland is not an EU member state"}]}
    }]
  };

  let correctChoice = [{
    "correct":true,
    "value":"a",
    "label":[{"lang":"en-US","value":"A"}],
    "feedback":[{"lang":"en-US","value":"Iceland is not an EU member state"}]
  }];

  let baseEnv = {locale: "en-US"};

  let mergeObj = (mergeTo, obj) => _.merge(mergeTo, obj);

  beforeEach(() => {baseModel, baseEnv});

  describe('Promise Object', () => {

    describe('result', () => {
      it('should return result mode => evaluate', () => {
        controller.model(baseModel, {selectedChoice: "a"}, mergeObj(baseEnv, {mode: "evaluate"}))
          .then(result => {
            expect(result.result).toMatchObject(correctChoice);
          })
      });

      it('should not return result mode => gather', () => {
        controller.model(baseModel, {selectedChoice: "a"}, mergeObj(baseEnv, {mode: "gather"}))
          .then(result => {
            expect(result.result).toBeUndefined();
          })
      });

      it('should not return result mode => view', () => {
        controller.model(baseModel, {selectedChoice: "a"}, mergeObj(baseEnv, {mode: "view"}))
          .then(result => {
            expect(result.result).toBeUndefined();
          })
      });
    });

    describe('disabled', () => {
      it('should TRUE when mode => evaluate', () => {
        controller.model(baseModel, {}, mergeObj(baseEnv, {mode: "evaluate"}))
          .then(result => {
            expect(result).toHaveProperty('disabled', true);
          })
      });

      it('should TRUE when mode => view', () => {
        controller.model(baseModel, {}, mergeObj(baseEnv, {mode: "view"}))
          .then(result => {
            expect(result).toHaveProperty('disabled', true);
          })
      });

      it('should FALSE when mode => gather', () => {
        controller.model(baseModel, {}, mergeObj(baseEnv, {mode: "gather"}))
          .then(result => {
            expect(result).toHaveProperty('disabled', false);
          })
      });
    });


    describe('choices', () => {
      it('should return en-US choices', () => {
        controller.model(baseModel, {}, mergeObj(baseEnv, {locale: "en-US"}))
          .then(result => {
            expect(result.choices).toMatchObject(baseModel.choices);
          })
      });

      it('should not return en-ES choices', () => {
        controller.model(baseModel, {}, mergeObj(baseEnv, {locale: "en-ES"}))
          .then(result => {
            console.log("result", result);
            expect(result.choices).toMatchObject(baseModel.choices);
          })
      });
    });

    describe('mode', () => {
      it('should return env mode', () => {
        controller.model(baseModel, {}, mergeObj(baseEnv, {mode: "view"}))
          .then(result => {
            expect(result.mode).toMatchObject('view');
          })
      });
    });

    describe('prompt', () => {

    });

  });

});