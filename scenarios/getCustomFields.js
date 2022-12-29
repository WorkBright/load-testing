const getCustomFieldsScenario = {
  executor: 'ramping-vus',
  gracefulStop: '30s',
  stages: [
    { target: 20, duration: '1m' },
    { target: 20, duration: '3m30s' },
    { target: 0, duration: '1m' },
  ],
  gracefulRampDown: '30s',
  exec: 'getCustomFields'
}

export { getCustomFieldsScenario }