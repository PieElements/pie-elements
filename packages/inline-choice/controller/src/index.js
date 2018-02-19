
export function outcome(model, session) {

  return new Promise((resolve) => {
    resolve({});
  });

}

export function model(model, session, env) {

  const colorMap = {
    black_on_rose: 'black-on-rose',
    white_on_black: 'white-on-black',
    black_on_white: 'default'
  };

  const activeLocale = env.locale ? env.locale : model.defaultLang;

  function filterItemsArrByLocale(locale, items) {
    if (!items) {
      return [];
    }
    return items.filter(item => locale === item.lang);
  }

  const findLabel = (locale, langs) => (langs || []).find(l => l.lang === locale);

  function prepChoices(locale, choicesArr, addCorrect) {

    return choicesArr.map(choice => {
      const out = {
        value: choice.value,
        label: (findLabel(locale, choice.label) || {}).value,
      };

      if (addCorrect) {
        out.correct = choice.correct || false;
        out.feedback = filterItemsArrByLocale(locale, choice.feedback.text);
      }
      return out;
    });
  }

  const prepPrompt = (locale, prompt) => (prompt.find(p => p.lang === locale) || {}).value;


  let activeColor = ((env.accessibility) && (env.accessibility.colorContrast) && colorMap[env.accessibility.colorContrast]) ? colorMap[env.accessibility.colorContrast] : "default";
  // let activeMode = env.mode;

  // let quesLabelByLocale = filterItemsArrByLocale(activeLocale, model.prompt);

  return new Promise((resolve, reject) => {

    const response = {
      disabled: env.mode !== 'gather',
      prompt: prepPrompt(activeLocale, model.prompt),
      classNames: activeColor,
      choices: prepChoices(activeLocale, model.choices),
      activeMode: env.mode
    }

    if (env.mode === "evaluate" && session.selectedChoice) {
      response.result = evaluateAnswer(model.choices, session.selectedChoice, activeLocale);
    }

    response.disabled = env.mode !== 'gather';
    // response.mode = activeMode;
    // response.classNames = activeColor;
    // response.prompt = quesLabelByLocale;

    resolve(response);
  });

}

const evaluateAnswer = (choices, selectedChoice, locale) => {
  const c = choices.find(c => c.value === selectedChoice);
  console.log('c: ', c);
  return {
    correct: c ? c.correct : false,
    feedback: c && c.feedback && (c.feedback.text.find(f => f.lang === locale) || {})
  }
}
