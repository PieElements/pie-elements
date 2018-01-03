import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import debug from 'debug';
import every from 'lodash/every';

const log = debug('pie-elements:text-entry:controller');

/** 
 * For the documentation of pie controllers see
 * https://pielabs.github.io/pie-docs/developing/controller.html
 */

const findLangObject = (arr, locales) => {
  if (!arr || !locales) {
    return;
  }

  const desiredLang = arr.find(a => a.lang === locales.lang);
  if (desiredLang) {
    return desiredLang;
  } else {
    return arr.find(a => a.lang === locales.fallback);
  }
}

const hasValue = (responses, value, locales) => {
  if (!responses) {
    return false;
  }

  log('[hasValue]', responses);
  if (every(responses.values, v => typeof (v) === 'string')) {
    log('[hasValue] - an array of strings')
    //it's just an array of strings so we can't use locale
    return responses.values.indexOf(value) !== -1;
  } else if (every(responses.values, o => !!o.lang)) {
    //it's an array of lang objects
    const targetLangObject = findLangObject(responses.values, locales);
    if (targetLangObject) {
      return targetLangObject.data === value || targetLangObject.data.indexOf(value) !== -1;
    }
  }
}

export function model(question, session, env) {

  const { model, correctResponses, partialResponses } = question;

  log('question:', question);

  const langOpts = { lang: env.lang, fallback: question.defaultLang || 'en-US' };

  const getCorrectness = () => {
    if (hasValue(correctResponses, session.value, langOpts)) {
      return 'correct';
    } else if (hasValue(partialResponses, session.value, langOpts)) {
      return 'partially-correct';
    } else if (!session.value || isEmpty(session.value)) {
      return 'empty';
    } else {
      return 'incorrect';
    }
  }

  return Promise.resolve(

    Object.assign((question.model || {}),
      {
        disabled: env.mode !== 'gather',
        correctness: env.mode === 'evaluate' ? getCorrectness() : null,
      }));
}

export function outcome(question, session = { value: [] }) {
  log('outcome')
  return Promise.reject('todo');
}
