import { sleep } from 'k6'
import http from 'k6/http'

export function login() {
  const vars = {}
  let response

  response = http.get(`${__ENV.BASE_URL}/users/sign_in`)

  vars['utf8'] = response.html().find('input[name=utf8]').first().attr('value')
  vars['authenticity_token'] = response
    .html()
    .find('input[name=authenticity_token]')
    .first()
    .attr('value')
  
  response = http.post(`${__ENV.BASE_URL}/users/sign_in`, {
    authenticity_token: vars['authenticity_token'],
    utf8: vars['utf8'],
    'user[email]': 'tomasdornasperone@wb.test',
    'user[password]': 'helloworld'
  })

  vars['csrf_token'] = response
    .html()
    .find('meta[name=csrf-token]')
    .first()
    .attr('content')

  return vars
}
