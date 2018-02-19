/** Flatten a multi lang choice model to work w/ ChoiceConfiguration  */
export const flatten = (c) => {
  const target = c.label.find(i => i.lang === 'en-US');

  const fb = Object.assign({ type: 'none', text: [] }, c.feedback);
  return {
    label: target.value,
    value: c.value,
    checked: c.correct,
    feedback: {
      type: fb.type,
      value: ((fb.text || []).find(f => f.lang === 'en-US') || {}).value
    }
  }
}

export const expand = (flat) => {
  return {
    label: [{
      lang: 'en-US',
      value: flat.label
    }],
    value: flat.value,
    correct: flat.checked,
    feedback: {
      type: flat.feedback.type,
      text: flat.feedback.type === 'custom' ?
        [{ lang: 'en-US', value: flat.feedback ? flat.feedback.value : '' }] :
        undefined
    }
  }
}