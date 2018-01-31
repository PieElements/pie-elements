import every from 'lodash/every';
import debug from 'debug';
const log = debug('pie-elements:text-entry:controller:legacy-model-converter');
/**
 * We support the old model (from corespring),
 * Until this support is no longer needed we need to convert the model.
 * 
 * NOTE: This module will be moved to another package once 
 * pie supports re-usable controller packages.
 */


const valuesArray = (values, lang) => {
  log('values: ', values);
  if (!values) {
    return [];
  } else if (typeof (values) === 'string') {
    return [{ lang, value: values }];
  } else if (every(values, v => typeof (v) === 'string')) {
    return values.map(value => ({ lang, value }));
  } else if (every(values, v => !!v.lang)) {
    return values;
  } else {
    throw new Error('values must be a string, an array of strings or an array of {lang,value}');
  }
}

const normalizeValues = (values, lang, feedback) => {


  const arr = valuesArray(values, lang);

  log('feedback: ', feedback);

  if (feedback && feedback.type === 'custom') {
    return arr.map(v => {
      log('v.value: ', v.value, 'feedback.value: ', feedback.value);
      if (v.value === feedback.value || `<div>${v.value}</div>` === feedback.value) {
        v.feedback = feedback.custom;
        return v;
      } else {
        return v;
      }
    });
  } else if (feedback && feedback.type === 'none') {
    return arr.map(v => {
      v.feedback = null;
      return v;
    });
  } else {
    return arr;
  }
}

const normalizeIncorrectResponses = incorrect => {
  if (!incorrect) {

    return {
      feedback: {
        type: 'default'
      }
    }
  }

  const out = Object.assign({}, incorrect);

  log('out.feedback: ', out.feedback);
  out.feedback = out.feedback || { type: 'default' };
  log('out.feedback: ', out.feedback);
  if (out.feedback.type === 'custom') {
    out.feedback.values = [{ lang, value: out.feedback.custom }];
    delete out.feedback.custom;
  }
}

const normalizeIncorrectFeedback = (incorrectFeedback, incorrectResponses, opts) => {

  incorrectResponses = incorrectResponses || {};

  if (incorrectFeedback) {
    return incorrectFeedback;
  } else {


    const out = {
      disabled: false,
      matches: [],
      fallback: {
        type: 'default',
        values: []
      }
    }

    const fb = incorrectResponses.feedback || {};

    if (fb.type === 'custom') {
      out.matches.push({
        lang: opts.lang,
        value: fb.value,
        feedback: fb.custom
      });
    } else if (fb.type === 'none') {
      out.disabled = true;
    }
    return out;
  }
}

const normalizeResponses = (responses, opts) => {

  const out = Object.assign({
    ignoreWhitespace: false,
    ignoreCase: false
  }, responses);


  //this is cruft from the old model.
  delete out.caseSensitive;

  if (opts.deleteAward) {
    delete out.award;
  }

  out.values = normalizeValues(out.values, opts.lang, out.feedback);
  return out;
}

export function convert(legacy) {

  const out = Object.assign({
    defaultLang: 'en-US'
  }, legacy);


  out.correctResponses = normalizeResponses(out.correctResponses, { deleteAward: true, lang: out.defaultLang });
  out.partialResponses = normalizeResponses(out.partialResponses, { deleteAward: false, lang: out.defaultLang });

  out.incorrectFeedback = normalizeIncorrectFeedback(out.incorrectFeedback, out.incorrectResponses, { lang: out.defaultLang });
  return out;
}
