module.exports = {
  langs: ['en-US', 'es-ES'],
  elements: {
    'text-entry': '../..'
  },
  models: [
    {
      id: '1',
      element: 'text-entry',
      defaultLang: 'en-US',
      correctResponses: {
        award: 100,

        //a - should be able to set a single string to values - is attached to defaultLang
        values: '4.37',
        //b - as is use array
        values: ['4.37'],
        //c - explicitly set lang
        values: [
          { lang: 'en-US', data: ['4.37'] }
        ]
      }
    },
    /**
     * localized example
     */
    {
      id: '2',
      element: 'text-entry',
      defaultLang: 'en-US',
      correctResponses: {
        award: 100,
        /**
         * @param values 
         * - string
         * - array of strings
         * - array of lang objects
         */
        values: [
          { lang: 'en-US', data: ['one'] },
          //if locale is running es-ES then correct response is uno
          { lang: 'en-ES', data: ['uno'] }
        ]
      }
    }
  ]
}