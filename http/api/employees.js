import { sleep } from 'k6'
import http from 'k6/http'

export function getEmployees() {
  http.get(`${__ENV.BASE_URL}/api/employees`, {
    headers: {
      'API-key': __ENV.API_KEY
    }
  })
}

export function createEmployees() {
  let response

  const startDate = new Date()
  const futureDate = startDate.getDate() + 12

  startDate.setDate(futureDate)

  const year = startDate.getFullYear()
  const month = String(startDate.getMonth() + 1).padStart(2, '0')
  const day = String(startDate.getDate()).padStart(2, '0')

  response = http.post(`${__ENV.BASE_URL}/api/employees`,
    JSON.stringify({
      employee: {
        email: `ldtest${Math.floor(Math.random() * 100001)}@loadtest.com`,
        first_name: `Johnny ${Math.floor(Math.random() * 100001)}`,
        last_name: 'Kaysix',
        ssn: '123-45-6789',
        address: {
          zip: '12345',
          city: 'Loadtestingville',
          state: 'NJ',
          street: '123 Elm St',
          country: 'US',
        },
        employment: {
          start_date: `${year}-${month}-${day}`,
        },
      }
    }),
    {
      headers: {
        'API-key': __ENV.API_KEY,
        'Content-Type': 'application/json'
      }
    }
  )

  return JSON.parse(response?.body)
}

