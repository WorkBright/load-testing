const i9AndW4WorkflowScenario = {
  executor: 'ramping-vus',
  gracefulStop: '30s',
  stages: [
    { target: 300, duration: '1m' },
    { target: 300, duration: '15m' },
    { target: 0, duration: '1m' },
  ],
  gracefulRampDown: '30s',
  exec: 'i9AndW4Workflow',
  options: {
    browser: {
      type: 'chromium',
    },
  },
}

export { i9AndW4WorkflowScenario }