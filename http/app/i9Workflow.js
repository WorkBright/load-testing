import { sleep } from 'k6'
import http from 'k6/http'
import { addStaff } from '../app/staff.js'

export function i9Workflow() {
  const response = addStaff()

  sleep(5)

  http.post(
    `${__ENV.BASE_URL}/users/sign_out`,
    {
      _method: 'delete',
      authenticity_token: response.vars['authenticity_token']
    },
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'upgrade-insecure-requests': '1'
      },
    }
  )

  http.get(
    `${__ENV.BASE_URL}/users/password/new`,
    {
      headers: {
        accept: 'text/html, application/xhtml+xml, application/xml'
      }
    }
  )

  const resetPasswordRequest = http.post(
    'https://illuminati.wb.test/users/password',
    {
      authenticity_token: response.vars['authenticity_token'],
      'user[email]': response.email,
      button: '',
    },
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'upgrade-insecure-requests': '1'
      },
    }
  )

  console.log(resetPasswordRequest)
}
