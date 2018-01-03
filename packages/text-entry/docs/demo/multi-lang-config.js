module.exports = {
  langs: ['en-US', 'es-ES'],
  elements: {
    'text-entry': '../..'
  },
  models: [
    {
      id: '1',
      //prompt: 
      //what's another name for a dog
      //¿Cuál es un nombre diferente para un perro?
      element: 'text-entry',
      defaultLang: 'en-US',
      correctResponses: {
        award: 100,
        values: [
          { lang: 'en-US', data: ['mutt', 'hound'] },
          { lang: 'es-ES', data: ['chucho', 'sabueso'] }
        ],
        ignoreWhitespace: true,
        ignoreCase: true,
        feedback: {
          type: 'custom',
          value: [
            { lang: 'en-US', data: 'correct!' },
            { lang: 'es-ES', data: 'correcto!' }
          ]
        },
        caseSensitive: true
      },
      incorrectResponses: {
        award: 0,
        feedback: {
          type: 'custom',
          value: '<div>no</div>'
        }
      },
      // partialResponses: {
      //   feedback: {
      //     type: 'custom',
      //     value: '<div>p</div>'
      //   },
      //   values: ['aa'],
      //   caseSensitive: true,
      //   ignoreCase: false,
      //   ignoreWhitespace: true
      // },
      model: {
        answerBlankSize: '5',
        answerAlignment: 'right',
        allowDecimal: false,
        allowIntegersOnly: false
      }
    }
  ]
}