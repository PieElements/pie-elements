module.exports = {
  langs: ['en-US', 'es-ES'],
  elements: {
    'text-entry': '../..'
  },
  models: [
    {
      id: '1',
      element: 'text-entry',
      //This is the lang that we'll fall back to if we can't find the desired language.
      defaultLang: 'en-US',
      correctResponses: {
        /**
         * values is an array of lang objects w/ optional feedback 
         */
        values: [
          //set feedback to a string => custom
          { lang: 'en-US', value: 'mutt', feedback: 'M' },
          //DEFAULT - sets feedback to the default
          { lang: 'en-US', value: 'hound', feedback: 'DEFAULT' },
          //not specifying 'feedback' == feedback: 'default'
          { lang: 'es-ES', value: 'chucho' },
          { lang: 'es-ES', value: 'sabueso' }
        ],
        ignoreWhitespace: false,
        ignoreCase: false
      },
      partialResponses: {
        values: [
          { lang: 'en-US', value: 'mutty' },
          { lang: 'es-ES', value: 'sabuesos', feedback: 'Hoy' }
        ],
        ignoreWhitespace: true,
        ignoreCase: true,
      },
      incorrectFeedback: {
        //you can completely disable incorrect feedback if you want.
        disabled: false,
        //An array of possible incorrect responses to match against.
        matches: [
          { lang: 'en-US', value: 'x', feedback: 'no x' }, //aka if they enter x when using en-US feedback is 'no x'
          { lang: 'es-ES', value: 'apple', feedback: 'Uso Espanol' }
        ],
        //Failing that match by lang only
        fallback: {
          values: [
            { lang: 'en-US', feedback: 'fallback feedback for en-US' },
            { lang: 'es-ES', feedback: 'no bueno' }
          ]
        }
        //if matches and fallback are missing the internal default feedback is used.
      },
      model: {
        answerBlankSize: '10',
        answerAlignment: 'left',
        allowDecimal: true,
        allowIntegersOnly: false,
        allowThousandsSeparator: true
      }
    }
  ]
}