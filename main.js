import http from 'k6/http'

/**
 *
 * Request definitions
 *
 */
import { getEmployees, createEmployees } from './http/api/employees.js'
import { getCustomFields } from './http/api/customFields.js'
import { i9AndW4Workflow } from './http/app/i9AndW4Workflow.js'
import { i9Workflow } from './http/app/i9Workflow.js'
import { w4Workflow } from './http/app/w4Workflow.js'
import { addStaff } from './http/app/staff.js'
import { homePage } from './http/app/homePage.js'
import { login } from './http/auth/login.js'

/**
 *
 * Scenario options
 *
 */
import { getEmployeesScenario } from './scenarios/getEmployees.js'
import { createEmployeesScenario } from './scenarios/createEmployees.js'
import { getCustomFieldsScenario } from './scenarios/getCustomFields.js'
import { i9AndW4WorkflowScenario } from './scenarios/i9AndW4Workflow.js'
import { i9WorkflowScenario } from './scenarios/i9Workflow.js'
import { w4WorkflowScenario } from './scenarios/w4Workflow.js'
import { addStaffScenario } from './scenarios/addStaff.js'
import { homePageScenario } from './scenarios/homePage.js'

/**
 *
 * We expect all the responses to have a status between 200 and 300, which
 * means the request was successful
 *
 */
http.setResponseCallback(http.expectedStatuses({ min: 200, max: 304 }))

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000']
  },
  scenarios: {
    // getEmployees: getEmployeesScenario,
    // getCustomFields: getCustomFieldsScenario,
    // createEmployees: createEmployeesScenario,
    // addStaff: addStaffScenario,
    // homePage: homePageScenario,
    i9AndW4Workflow: i9AndW4WorkflowScenario,
    // i9Workflow: i9WorkflowScenario,
    // w4Workflow: w4WorkflowScenario,
  },
  cloud: {
    projectId: 3718689,
  },
}

export {
  // getEmployees,
  // createEmployees,
  // getCustomFields,
  // addStaff,
  // homePage,
  i9AndW4Workflow,
  // i9Workflow,
  // w4Workflow,
  // login
}
