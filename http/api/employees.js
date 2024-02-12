import { sleep } from 'k6'
import http from 'k6/http'

export function getEmployees() {
  http.get(`${__ENV.BASE_URL}/api/employees`, {
    headers: {
      'API-key': __ENV.API_KEY
    }
  })
}

export function createDeleteEmployees() {
  let response

  sleep(5)

  response = http.post(`${__ENV.BASE_URL}/api/employees`,
    JSON.stringify({
      employee: {
        email: `ldtest${Math.floor(Math.random() * 100001)}@gmail.com`,
        first_name: `Johnny ${Math.floor(Math.random() * 100001)}`,
        last_name: 'Kaysix'
      }
    }),
    {
      headers: {
        'API-key': __ENV.API_KEY,
        'Content-Type': 'application/json'
      }
    }
  )

  if(response.status === 200) {
    sleep(5)

    response = http.del(`${__ENV.BASE_URL}/api/employees/${JSON.parse(response.body).id}`,
      null,
      {
        headers: {
          'API-key': __ENV.API_KEY
        }
      }
    )
  }
}

