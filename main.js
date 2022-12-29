import http from 'k6/http'

/**
 * 
 * Request definitions
 * 
 */
import { getEmployees, createDeleteEmployees } from './api/employees.js'
import { getCustomFields } from './api/customFields.js'

/**
 * 
 * Scenario options
 * 
 */
import { getEmployeesScenario } from './scenarios/getEmployees.js'
import { createDeleteEmployeesScenario } from './scenarios/createDeleteEmployees.js'
import { getCustomFieldsScenario } from './scenarios/getCustomFields.js'

/**
 * 
 * We expect all the responses to have a status between 200 and 300, which
 * means the request was successful
 * 
 */
http.setResponseCallback(http.expectedStatuses({ min: 200, max: 300 }))

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000']
  },
  scenarios: {
    getEmployees: getEmployeesScenario,
    getCustomFields: getCustomFieldsScenario,
    createDeleteEmployees: createDeleteEmployeesScenario
  },
}

export {
  getEmployees,
  createDeleteEmployees,
  getCustomFields
}