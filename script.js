import { check, sleep } from 'k6'
import http from 'k6/http'

http.setResponseCallback(http.expectedStatuses({ min: 200, max: 300 }))

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000']
  },
  scenarios: {
    getEmployees: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'getEmployees',
    },
    // getCustomFields: {
    //   executor: 'ramping-vus',
    //   gracefulStop: '30s',
    //   stages: [
    //     { target: 20, duration: '1m' },
    //     { target: 20, duration: '3m30s' },
    //     { target: 0, duration: '1m' },
    //   ],
    //   gracefulRampDown: '30s',
    //   exec: 'getCustomFields',
    // },
    createDeleteEmployees: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '1m' },
        { target: 5, duration: '2m' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'createDeleteEmployees',
    }
  },
}

const BASE_URL = 'https://tomasdornasperone.wb.test'

export function getEmployees() {
  let response

  response = http.get(`${BASE_URL}/api/employees`, {
    headers: {
      'API-key': '45323b537ad21c61e47da8aab4d65ffbd1345aa7807260fc93046378012c560b'
    }
  })
}

// export function getCustomFields() {
//   let response = http.get(`${BASE_URL}/api/custom_fields`, {
//     headers: {
//       'API-key': '45323b537ad21c61e47da8aab4d65ffbd1345aa7807260fc93046378012c560b'
//     }
//   })
// }

export function createDeleteEmployees() {
  let response

  sleep(5)

  response = http.post(`${BASE_URL}/api/employees`, 
    JSON.stringify({
      employee: {
        email: `ldtest${Math.floor(Math.random() * 1001)}@gmail.com`,
        first_name: `Johnny ${Math.floor(Math.random() * 1001)}`,
        last_name: 'Kaysix'
      }
    }),
    {
      headers: {
        'API-key': '45323b537ad21c61e47da8aab4d65ffbd1345aa7807260fc93046378012c560b',
        'Content-Type': 'application/json'
      }
    }
  )

  if(response.status === 200) {
    sleep(5)

    response = http.del(`${BASE_URL}/api/employees/${JSON.parse(response.body).id}`,
      null,
      {
        headers: {
          'API-key': '45323b537ad21c61e47da8aab4d65ffbd1345aa7807260fc93046378012c560b'
        }
      }
    )
  }

}

