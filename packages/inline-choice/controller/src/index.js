
export function outcome(model, session) {

  return new Promise((resolve) => {
    resolve({});
  });

}

const colorMap = {
  black_on_rose: 'black-on-rose',
  white_on_black: 'white-on-black',
  black_on_white: 'default'
};

const findLabel = (locale, langs) => (langs || []).find(l => l.lang === locale);

function prepChoices(locale, choicesArr) {

  return choicesArr.map(choice => {
    const out = {
      value: choice.value,
      label: (findLabel(locale, choice.label) || {}).value,
    };
    return out;
  });
}

const prepPrompt = (locale, prompt) => (prompt.find(p => p.lang === locale) || {}).value;

const result = (choices, selectedChoice, locale) => {

  if (!selectedChoice) {
    return { correct: false, nothingSubmitted: true }
  }

  const c = choices.find(c => c.value === selectedChoice);

  const correct = c ? !!c.correct : false;
  const type = c && c.feedback && c.feedback.type;
  let feedback = undefined;

  if (type === 'custom') {
    const fbText = c && c.feedback && (c.feedback.text || []);
    feedback = (fbText.find(f => f.lang === locale) || {}).value;
  } else if (type === 'default') {
    feedback = correct ? 'Correct' : 'Incorrect';
  }

  return { correct, feedback }
}

export function model(model, session, env) {

  const activeLocale = env.locale ? env.locale : model.defaultLang;
  const contrast = (env && env.accessibility && env.accessibility.colorContrast) || 'default';

  const classNames = colorMap[contrast];

  return new Promise((resolve, reject) => {

    const response = {
      disabled: env.mode !== 'gather',
      prompt: prepPrompt(activeLocale, model.prompt),
      classNames,
      choices: prepChoices(activeLocale, model.choices),
      activeMode: env.mode
    }

    if (env.mode === 'evaluate') {
      response.result = result(model.choices, session.selectedChoice, activeLocale);
    }

    resolve(response);
  });
}
