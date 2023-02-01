import http from 'k6/http'
import { login } from '../auth/login.js'

export function getCustomFields() {
  http.get(`${__ENV.BASE_URL}/api/custom_fields`, {
    headers: {
      'API-key': __ENV.API_KEY
    }
  })
}
