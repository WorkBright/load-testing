import http from 'k6/http'

/**
 *
 * Request definitions
 *
 */
import { getEmployees, createEmployees } from './http/api/employees.js'
import { getCustomFields } from './http/api/customFields.js'
import { staffFormsSubmitWorkflow } from './http/app/staffFormsSubmitWorkflow.js'
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
import { staffFormsSubmitWorkflowScenario } from './scenarios/staffFormsSubmitWorkflow.js'
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
  },
  scenarios: {
    // getEmployees: getEmployeesScenario,
    // getCustomFields: getCustomFieldsScenario,
    // createEmployees: createEmployeesScenario,
    // addStaff: addStaffScenario,
    // homePage: homePageScenario,
    // i9AndW4Workflow: i9AndW4WorkflowScenario,
    staffFormsSubmitWorkflow: staffFormsSubmitWorkflowScenario,
    // i9Workflow: i9WorkflowScenario,
    // w4Workflow: w4WorkflowScenario,
  },
  cloud: {
    metrics: {
    },
    projectId: 3718689,
//     drop_metrics: ['http_req_duration','http_req_blocked',
//     'http_req_connecting',
//     'http_req_tls_handshaking',
//     'http_req_sending',
//     'http_req_waiting',
//     'http_req_receiving',
//     'http_req_failed',   
//     'http_req_failed_rate',
//     'http_reqs', 'data_received',
//      'data_sent',
//     'iterations',
//       'iteration_duration'                               ,
//     'checks',
//     'checks_failed',
//      'checks_failed_rate',
//     'vus',
//     'vus_max',
//     'vus_running','dropped_iterations',
//   "browser_dom_content_loaded",
// "browser_first_contentful_paint",
// "browser_largest_contentful_paint",
// "browser_load","browser_web_vital_cls",
// "browser_web_vital_fid",
// "browser_web_vital_lcp",]
  },
}

export {
  // getEmployees,
  // createEmployees,
  // getCustomFields,
  // addStaff,
  // homePage,
  staffFormsSubmitWorkflow,
  // i9AndW4Workflow,
  // i9Workflow,
  // w4Workflow,
  // login
}
