module.exports = {
  elements: {
    'multiple-choice': '..'
  },
  models: [
    {
      element: 'multiple-choice',
      id: '1',
      mode: 'gather',
      prompt: 'hi there',
      disabled: false,
      choiceMode: 'radio',
      keyMode: 'letters',
      choices: [
        { label: 'apple', value: 'a' },
        { label: 'banana', value: 'b' }
      ]
    }
  ]
}