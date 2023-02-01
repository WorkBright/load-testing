const loginScenario = {
  executor: 'ramping-vus',
  gracefulStop: '30s',
  stages: [
    { target: 5, duration: '5s' },
    { target: 5, duration: '10s' },
    { target: 0, duration: '5s' },
  ],
  gracefulRampDown: '30s',
  exec: 'login'
}

export { loginScenario }