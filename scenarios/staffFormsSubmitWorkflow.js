const staffFormsSubmitWorkflowScenario = {
  executor: 'ramping-vus',
  gracefulStop: '30s',
  stages: [
    { target: 500, duration: '5m' },
    { target: 750, duration: '5m' },
    { target: 1000, duration: '10m' },
    { target: 0, duration: '5m' },
  ],
  gracefulRampDown: '30s',
  exec: 'staffFormsSubmitWorkflow',
  options: {
    browser: {
      type: 'chromium',
    },
  },
}

export { staffFormsSubmitWorkflowScenario }
