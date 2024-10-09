const w4WorkflowScenario = {
  executor: 'ramping-vus',
  // gracefulStop: '30s',
  stages: [
    { target: 1, duration: '5m' },
  ],
  // gracefulRampDown: '30s',
  exec: 'w4Workflow',
  options: {
    browser: {
      type: 'chromium',
    },
  },
}

export { w4WorkflowScenario }