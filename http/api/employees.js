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
        email: `loadtest${Math.floor(Math.random() * 1000001)}@example.com`,
        first_name: `Johnny ${Math.floor(Math.random() * 1000001)}`,
        last_name: 'Kaysix',
        ssn: '123-45-6789',
        birthdate: '1985-12-03',
        address: {
          zip: '12345',
          city: 'Loadtestingville',
          state: 'NJ',
          street: '123 Elm St',
          country: 'US',
        },
        employment: {
          start_date: `${year}-${month}-${day}`,
          i9_remote_countersign_authorized: true,
          i9_remote_reverification_authorized: true,
        },
      }
    }),
    {
      headers: {
        'API-key': __ENV.API_KEY,
        'Content-Type': 'application/json'
      },
      tags: {
        name: "apiEmployeesCreate"
      },
    },
  )

  return JSON.parse(response?.body)
}

