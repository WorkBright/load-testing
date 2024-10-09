import { getAuthenticatedPage } from '../../browser/getAuthenticatedPage.js'
import {
  getBaseUrl,
} from '../../util/environment.js'
import { sleep } from 'k6'
import { createEmployees } from '../api/employees.js'

const PATH_TO_I9_FORM = 'forms/i9/submission/new'
const PATH_TO_W4_FORM = 'forms/w4/submission/new'
const IMAGE_BUFFER = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

export async function i9AndW4Workflow() {
  const employee = createEmployees()

  const page = await getAuthenticatedPage(employee.id)

  try {
    await page.goto(`${getBaseUrl()}/${PATH_TO_I9_FORM}`)

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
      await page.locator('button.next').click() // Advance from Step 1

      await page.locator('#i9_submission_citizenship_designation_citizen').click() // Select US citizen

      await page.locator('button.next').click() // Advance from Step 2

      sleep(1)

      await page.locator('a[data-key="us_passport"]').click() // Select US Passport

      await page.locator('button.next').click() // Advance from Step 3

      sleep(1)

      await page.setInputFiles('.image-upload:first-of-type input[type="file"]', {
        name: 'file.png',
        mimetype: 'image/png',
        buffer: IMAGE_BUFFER,
      })

      await page.setInputFiles('.image-upload:last-of-type input[type="file"]', {
        name: 'file.png',
        mimetype: 'image/png',
        buffer: IMAGE_BUFFER,
      })

      await page.locator('button.next').click() // Hackfix, click it twice to register files

      sleep(7)

      await page.locator('button.next').click()

      await page.locator('#document_number').type('123456789')
      await page.locator('input[name="expiration_date"]').type('10/16/2999')

      sleep(5)

      await page.locator('button.next').click() // Advance from Document Upload

      await page.locator('button.next').click() // Advance from Preparer/Translator

      await page.locator('canvas.form-control').click() // Sign

      await Promise.all([ // Finish
        page.waitForNavigation(),
        page.locator('button.next').click()
      ])

      await page.goto(`${getBaseUrl()}/${PATH_TO_W4_FORM}`)

      await page.locator('#filing_status-single_or_married_filing_separately').click() // Filing status: single
      await page.locator('#number_of_jobs-1').click() // Select number of jobs
      await page.locator('canvas.form-control').click() // Signature

      await page.locator('div.text-right button.btn-primary').click()

      // await page.screenshot({ path: `screenshots/i9-${employeeId}.png` })
    }
  } catch (error) {
    console.error('Error Completing Staff I9', JSON.stringify(error), error.toString())
  } finally {
    await page.close()
  }
}
