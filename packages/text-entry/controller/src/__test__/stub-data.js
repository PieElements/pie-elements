export const env = (locale) => ({ mode: 'evaluate', locale: locale || 'en-US' });

export const getQuestion = () => ({
  correctResponses: {
    values: [
      { lang: 'en-US', value: 'apple', feedback: 'Custom One' },
      { lang: 'en-US', value: 'pear', feedback: 'DEFAULT' },
      { lang: 'es-ES', value: 'manzana', feedback: 'Custom Two' }
    ]
  },
  partialResponses: {
    award: 52,
    values: [
      { lang: 'en-US', value: 'apples' },
      { lang: 'es-ES', value: 'manzanan' }
    ]
  },
  incorrectFeedback: {
    disabled: false,
    matches: [
      { lang: 'en-US', value: 'appler', feedback: 'Typo?' },
      { lang: 'es-ES', value: 'apples', feedback: 'Uso Espanol' },
      { lang: 'es-ES', value: 'mmanzana', feedback: 'Typo??' }
    ],
    fallback: {
    }
  }
});