const w4WorkflowScenario = {
  executor: 'ramping-vus',
  gracefulStop: '30s',
  stages: [
    { target: 5, duration: '1m' },
    { target: 5, duration: '3m30s' },
    { target: 0, duration: '1m' },
  ],
  gracefulRampDown: '30s',
  exec: 'w4Workflow',
  options: {
    browser: {
      type: 'chromium',
    },
  },
}

export { w4WorkflowScenario }