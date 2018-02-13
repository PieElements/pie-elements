
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

  function filterItemsArrByLocale(locale, items) {
    if (!items) {
      return [];
    }
    return items.filter(item => locale === item.lang);
  }

  function filterQuestionChoicesByLocale(locale, choicesArr) {

    return choicesArr.map((choice) => {
      var choiceObj = {};
      let filterLabelByLocale = filterItemsArrByLocale(locale, choice.label);
      if(filterLabelByLocale.length > 0) {
        choiceObj["value"] = choice.value;
        choiceObj["correct"] = choice.correct || false;
        choiceObj["label"] = filterLabelByLocale
        if (choice.feedback && choice.feedback.text) {
          choiceObj["feedback"] = filterItemsArrByLocale(locale, choice.feedback.text);
        }
      }

      return choiceObj;
    });
  }

  let activeLocale = env.locale ? env.locale : model.defaultLang;
  let activeColor = ((env.accessibility) && (env.accessibility.colorContrast) && colorMap[env.accessibility.colorContrast]) ? colorMap[env.accessibility.colorContrast] : "default";
  let activeMode = env.mode;

  let quesLabelByLocale = filterItemsArrByLocale(activeLocale, model.prompt);
  let quesChoicesByLocale = filterQuestionChoicesByLocale(activeLocale, model.choices);

  return new Promise((resolve, reject) => {

    let response = {}

    if (env.mode === "evaluate" && session.selectedChoice) {
      response.result = evaluateAnswer(quesChoicesByLocale, session.selectedChoice);
    }

    response.choices = quesChoicesByLocale;
    response.disabled = activeMode !== 'gather';
    response.mode = activeMode;
    response.classNames = activeColor;
    response.prompt = quesLabelByLocale;

    resolve(response);
  });

}

function evaluateAnswer(choices, selectedChoice) {
  return choices.filter(choice => selectedChoice === choice.value);
}