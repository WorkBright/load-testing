const homePageScenario = {
  executor: 'ramping-vus',
  gracefulStop: '30s',
  stages: [
    { target: 50, duration: '1m' },
    { target: 50, duration: '3m30s' },
    { target: 0, duration: '1m' },
  ],
  gracefulRampDown: '30s',
  exec: 'homePage'
}

export { homePageScenario }