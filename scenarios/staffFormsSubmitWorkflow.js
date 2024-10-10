const staffFormsSubmitWorkflowScenario = {
  executor: 'ramping-vus',
  gracefulStop: '30s',
  stages: [
    { target: 250, duration: '1m' },
    { target: 250, duration: '10m' },
    { target: 0, duration: '1m' },
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