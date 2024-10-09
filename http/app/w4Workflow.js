import { getAuthenticatedPage } from '../../browser/getAuthenticatedPage.js'
import {
  getBaseUrl,
} from '../../util/environment.js'
import { createEmployees } from '../api/employees.js'

const PATH_TO_FORM = 'forms/w4/submission/new'

export async function w4Workflow() {
  const employee = createEmployees()

  const page = await getAuthenticatedPage(employee.id)

  try {
    await page.goto(`${getBaseUrl()}/${PATH_TO_FORM}`)

    /**
     *
     * The EULA agreement modal may or may not appear, not sure what's the rule
     * behind that, so I'm wrapping that in a try-catch, since locator seems to
     * just throw an exception if the element doesn't exist.
     *
     */
    try {
      await page.waitForSelector('button[data-bb-handler="confirm"]', {
        timeout: 3000
      })

      const eulaButton = await page.locator('button[data-bb-handler="confirm"]').click()

      await eulaButton.click()
    } catch {
    } finally {
      await page.locator('#filing_status-single_or_married_filing_separately').click() // Filing status: single
      await page.locator('#number_of_jobs-1').click() // Select number of jobs
      await page.locator('canvas.form-control').click() // Signature

      await page.locator('div.text-right button.btn-primary').click()

      await page.screenshot({ path: `screenshots/screenshot${employee.id}.png` })
    }
  } catch {
  } finally {
    await page.close()
  }
}
