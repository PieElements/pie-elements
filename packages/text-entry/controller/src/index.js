import debug from 'debug';
import every from 'lodash/every';
import some from 'lodash/some';
import isEmpty from 'lodash/isEmpty';
import { convert } from './legacy-model-converter';

const log = debug('pie-elements:text-entry:controller');

/** 
 * For the documentation of pie controllers see
 * https://pielabs.github.io/pie-docs/developing/controller.html
 */

const findLangObjects = (arr, langOpts) => {
  if (!arr || !langOpts) {
    return;
  }

  log('[findLangObjects] langOpts: ', langOpts);
  const filtered = arr.filter(a => a.lang === langOpts.lang);
  if (filtered.length > 0) {
    return filtered;
  } else {
    return arr.filter(a => a.lang === langOpts.fallback);
  }
}

const findResponse = (values, value, langOpts) => {

  if (!values) {
    return;
  }

  const targetLangObjects = findLangObjects(values, langOpts);

  log('[findResponse] targetLangObjects: ', targetLangObjects);

  if (targetLangObjects) {
    return targetLangObjects.find(t => t.value === value);
  }
}

const getMatchingResponse = (correctness, responses, value, langOpts) => {
  const response = findResponse(responses.values, value, langOpts);

  if (response) {
    return Object.assign({ correctness }, response);
  }
}

const getCorrectness = (value, response) => {

  if (!value || isEmpty(value)) {
    return 'empty';
  } else {

    if (!response) {
      return 'incorrect';
    }
    return response.correctness;
  }
}

const DEFAULT_FEEDBACK = {
  correct: 'Correct',
  incorrect: 'Incorrect',
  empty: 'Empty',
  unknown: 'Unkown'
}

const getFeedback = (response, feedbackMap) => {
  if (!response, response.feedback === undefined) {
    //default
    return feedbackMap[response.correctness];
  } else if (response.feedback === null) {
    //none
    return '';
  } else {
    //custom
    return response.feedback;
  }
}

const getIncorrectResponse = (config) => {

  let feedback;

  if (config.type === 'custom') {
    feedback = config.custom;
  } else if (config.type === 'none') {
    feedback = null
  }

  return {
    correctness: 'incorrect',
    feedback
  }
}

export function model(question, session, env) {

  /**
   * TODO: This will be moved to another package that depends on this package, once the pie-cli allows the use of regular npm packages for controllers.
   */
  question = convert(question);
  env = env || {};

  const { model, correctResponses, partialResponses } = question;

  log('question:', question);

  const langOpts = { lang: session.lang, fallback: question.defaultLang || 'en-US' };
  log('langOpts: ', langOpts);

  const feedbackMap = Object.assign(DEFAULT_FEEDBACK, question.defaultFeedback);

  const matchingResponse =
    getMatchingResponse('correct', correctResponses, session.value, langOpts) ||
    getMatchingResponse('parially-correct', partialResponses, session.value, langOpts) ||
    getIncorrectResponse(question.incorrectFeedback)


  return Promise.resolve(

    Object.assign((question.model || {}),
      {
        disabled: env.mode !== 'gather',
        correctness: env.mode === 'evaluate' ? getCorrectness(session.value, matchingResponse) : null,
        feedback: env.mode === 'evaluate' ? getFeedback(matchingResponse, feedbackMap, question.incorrectFeedback) : null
      }));
}

export function outcome(question, session = { value: [] }) {
  log('outcome')
  return Promise.reject('todo');
}
