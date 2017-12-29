import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import debug from 'debug';

const log = debug('pie-elements:text-entry:controller');

/** 
 * For the documentation of pie controllers see
 * https://pielabs.github.io/pie-docs/developing/controller.html
 */

const hasValue = (responses, value) => {
  return responses.values.indexOf(value) !== -1;
}

export function model(question, session, env) {

  const { model, correctResponses, partialResponses } = question;

  log('model', model);
  const getCorrectness = () => {
    if (hasValue(correctResponses, session.value)) {
      return 'correct';
    } else if (hasValue(partialResponses, session.value)) {
      return 'partially-correct';
    } else {
      return 'incorrect'
    }
  }


  return Promise.resolve({
    disabled: env.mode !== 'gather',
    correctness: env.mode === 'evaluate' ? getCorrectness() : null
  });
}

export function outcome(question, session = { value: [] }) {
  log('outcome')
  return Promise.reject('todo');
}
