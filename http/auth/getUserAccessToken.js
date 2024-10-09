import {
  getApiKey,
  getBaseUrl,
} from '../../util/environment.js'
import http from 'k6/http'

export function getUserAccessToken (employeeId) {
  const path = `${getBaseUrl()}/api/employees/${employeeId}/sign_in_token`

  const response = http.post(path, null, {
    headers: {
      'API-Key': getApiKey()
    }
  })
  const responseBody = JSON.parse(response?.body)

  return responseBody.token
}