import debug from 'debug';
import every from 'lodash/every';
import some from 'lodash/some';
import isEmpty from 'lodash/isEmpty';

const log = debug('pie-elements:text-entry:controller');
const DEFAULT = 'DEFAULT';

export const Correctness = {
  partial: 'partially-correct',
  correct: 'correct',
  incorect: 'incorrect',
  empty: 'empty'
}
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

export const DEFAULT_FEEDBACK = {
  correct: 'Correct',
  incorrect: 'Incorrect',
  empty: 'Empty',
  unknown: 'Unkown'
}

const getFeedback = (response, feedbackMap) => {
  if (!response, response.feedback === DEFAULT) {
    //default
    return feedbackMap[response.correctness];
  } else if (!response.feedback) {
    //none
    return '';
  } else {
    //custom
    return response.feedback;
  }
}

const getIncorrectResponse = (incorrectFeedback, value, langOpts) => {

  //let feedback;
  const out = { correctness: Correctness.incorrect, feedback: DEFAULT };

  incorrectFeedback = incorrectFeedback || {};
  if (incorrectFeedback.disabled) {
    delete out.feedback;
    return out;
  }

  if (Array.isArray(incorrectFeedback.matches)) {
    const match = incorrectFeedback.matches.find(m => {
      return (m.value === value || m.value === `<div>${value}</div>`) && m.lang === langOpts.lang;
    });

    if (match) {
      out.feedback = match.feedback;
      return out;
    }
  }

  if (incorrectFeedback.fallback && Array.isArray(incorrectFeedback.fallback.values)) {
    const m = incorrectFeedback.fallback.values.find(fb => {
      return fb.lang === langOpts.lang;
    });

    if (m) {
      out.feedback = m.feedback;
      return out;
    } else {
      const fallback = incorrectFeedback.fallback.values.find(fb => {
        return fb.lang === langOpts.fallback;
      });
      if (fallback) {
        out.feedback = fallback.feedback;
        return out;
      }
    }
  }
  return out;
}

export function model(question, session, env) {

  /**
   * TODO: This will be moved to another package that depends on this package, once the pie-cli allows the use of regular npm packages for controllers.
   */
  env = env || {};

  const { model, correctResponses, partialResponses } = question;

  log('question:', question);
  session.lang = session.lang || (question.defaultLang || 'en-US');

  const langOpts = { lang: session.lang, fallback: question.defaultLang || 'en-US' };
  log('langOpts: ', langOpts);

  const feedbackMap = Object.assign(DEFAULT_FEEDBACK, question.defaultFeedback);

  const matchingResponse =
    getMatchingResponse(Correctness.correct, correctResponses, session.value, langOpts) ||
    getMatchingResponse(Correctness.partial, partialResponses, session.value, langOpts) ||
    getIncorrectResponse(question.incorrectFeedback, session.value, langOpts)


  return Promise.resolve(

    Object.assign((question.model || {}),
      {
        disabled: env.mode !== 'gather',
        lang: env.locale || 'en-US',
        correctness: env.mode === 'evaluate' ? getCorrectness(session.value, matchingResponse) : null,
        feedback: env.mode === 'evaluate' ? getFeedback(matchingResponse, feedbackMap, question.incorrectFeedback) : null
      }));
}

export function outcome(question, session = { value: [] }) {
  log('outcome')
  return Promise.reject('todo');
}
