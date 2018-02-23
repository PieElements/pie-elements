module.exports = {

  elements: {
    'placement-ordering': '..'
  },
  models: [
    {
      id: '1',
      element: 'placement-ordering',
      prompt: 'prompt',
      choices: [
        { value: '1', label: '1', moveOnDrag: true },
        { value: '2', label: '2' }
      ],
      disabled: false,
      config: {
        orientation: 'vertical',
        includeTargets: true,
        showOrdering: true,
        choiceLabel: 'Choices',
        targetLabel: 'Targets'
      }
    }
  ]
}