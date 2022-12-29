const createDeleteEmployeesScenario = {
  executor: 'ramping-vus',
  gracefulStop: '30s',
  stages: [
    { target: 5, duration: '1m' },
    { target: 5, duration: '2m' },
    { target: 0, duration: '1m' },
  ],
  gracefulRampDown: '30s',
  exec: 'createDeleteEmployees'
}

export { createDeleteEmployeesScenario }