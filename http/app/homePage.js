import { sleep } from 'k6'
import http from 'k6/http'
import { login } from '../auth/login.js'

export function homePage() {
  login()

  sleep(5)

  http.get(`${__ENV.BASE_URL}/`)
}
