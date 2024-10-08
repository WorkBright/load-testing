import { getAuthenticatedPage } from '../../browser/getAuthenticatedPage.js'
import {
  getBaseUrl,
} from '../../util/environment.js'

const PATH_TO_FORM = 'forms/w4/submission/new'
const TEST_EMPLOYEE_ID = 41

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
}

export default async function () {
  const page = await getAuthenticatedPage(TEST_EMPLOYEE_ID)

  try {
    await page.goto(`${getBaseUrl()}${PATH_TO_FORM}`)

    await page.locator('#filing_status-single_or_married_filing_separately').click() // Filing status: single
    await page.locator('#number_of_jobs-1').click() // Select number of jobs
    await page.locator('canvas.form-control').click() // Signature

    console.log(page.locator('div.text-right button.btn-primary'))

    await Promise.all([ // Submit
      page.waitForNavigation(),
      page.locator('div.text-right button.btn-primary').click()
    ])
    
    await page.screenshot({ path: 'screenshots/screenshot.png' })
  } catch (error) {
    console.error(error)
  } finally {
    await page.close()
  }
}
