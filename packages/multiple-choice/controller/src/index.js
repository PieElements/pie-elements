import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import { score } from './scoring.js';

/** 
 * For the documentation of pie controllers see
 * https://pielabs.github.io/pie-docs/developing/controller.html
 */

const colorMap = {
  black_on_rose: 'black-on-rose',
  white_on_black: 'white-on-black',
  black_on_white: 'default'
};

const getCorrectResponse = (choices) => choices
  .filter(c => c.correct)
  .map(c => c.value)
  .sort();

function isResponseCorrect(question, session) {
  let correctResponse = getCorrectResponse(question.choices);
  return isEqual((session.value || []).sort(), correctResponse);
}

export function outcome(question, session = { value: [] }) {
  session.value = session.value || [];
  return new Promise((resolve, reject) => {

    if (!question || !question.choices || isEmpty(question.choices)) {
      reject(new Error('Question is missing required array: choices'));
    } else {
      const allCorrect = isResponseCorrect(question, session);
      const correct = question.choices.filter(c => c.correct);

      resolve({
        score: score(question, session),
        complete: session.value.length >= correct.length
      });
    }
  });
}

export function model(question, session, env) {

  if (env.mode === 'evaluate') {
    console.log('score', score(question, session));
  }

  function getLabel(arr, lang, fallbackLang) {
    let label = arr.find(l => l.lang === lang);

    if (label && !isEmpty(label.value)) {
      return label.value;
    } else {
      let out = arr.find(l => l.lang === fallbackLang);
      if (!out) {
        console.warn(`can't find translation for: ${fallbackLang} in ${JSON.stringify(arr)}`);
      }
      return out && !isEmpty(out.value) ? out.value : undefined;
    }
  }

  function prepareChoice(responseCorrect, choice) {
    let out = {
      value: choice.value,
      label: getLabel(choice.label, env.locale, question.defaultLang)
    }

    if (env.mode === 'evaluate') {
      out.correct = choice.correct;
      const feedbackType = (choice.feedback && choice.feedback.type) || 'none';
      if (feedbackType !== 'none' && !responseCorrect) {
        let value = choice.feedback[feedbackType];
        out.feedback = typeof value === 'string' ? value : getLabel(value, env.locale, question.defaultLang);
      }
    }
    return out;
  }

  function addColorContrast() {
    if (env.accessibility && env.accessibility.colorContrast && colorMap[env.accessibility.colorContrast]) {
      return colorMap[env.accessibility.colorContrast];
    }
  }

  return new Promise((resolve, reject) => {

    if (isEmpty(question)) {
      reject(new Error('Empty model'));
    }



    let responseCorrect = env.mode === 'evaluate' ? isResponseCorrect(question, session) : undefined;
    let out = cloneDeep(question);

    /** completeness - must have at least the correctResponse.length */
    out.complete = {
      min: out.choices.filter(c => c.correct).length
    }

    out.choices = out.choices.map(prepareChoice.bind(null, responseCorrect));
    out.prompt = getLabel(out.prompt, env.locale, question.defaultLang);
    out.disabled = env.mode !== 'gather';
    out.mode = env.mode;
    out.responseCorrect = responseCorrect;
    out.className = addColorContrast();


    resolve(out);
  });
}
