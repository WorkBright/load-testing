const i9WorkflowScenario = {
  executor: 'ramping-vus',
  // gracefulStop: '30s',
  stages: [
    { target: 1, duration: '5m' },
  ],
  // gracefulRampDown: '30s',
  exec: 'i9Workflow',
  options: {
    browser: {
      type: 'chromium',
    },
  },
}

export { i9WorkflowScenario }