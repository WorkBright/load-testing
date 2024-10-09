import { getAuthenticatedPage } from '../../browser/getAuthenticatedPage.js'
import {
  getBaseUrl,
} from '../../util/environment.js'
import { sleep, pause } from 'k6'
import encoding from 'k6/encoding'

const PATH_TO_FORM = 'forms/i9/submission/new'
const IMAGE_BUFFER = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
const EMPLOYEES_TO_TEST = [41, 42]

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      iterations: 2,
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

function getEmployeeId () {
  return EMPLOYEES_TO_TEST[__ITER]
}


export default async function () {
  const employeeId = getEmployeeId()
  const page = await getAuthenticatedPage(employeeId)

  try {
    await page.goto(`${getBaseUrl()}${PATH_TO_FORM}`)

    await page.locator('button.next').click() // Advance from Step 1

    await page.locator('#i9_submission_citizenship_designation_citizen').click() // Select US citizen

    await page.locator('button.next').click() // Advance from Step 2

    sleep(1)

    await page.locator('a[data-key="us_passport"]').click() // Select US Passport

    await page.locator('button.next').click() // Advance from Step 3

    sleep(1)

    await page.setInputFiles('#file-DocumentFront', {
      name: 'file.png',
      mimetype: 'image/png',
      buffer: IMAGE_BUFFER,
    })

    await page.setInputFiles('#file-DocumentBack', {
      name: 'file.png',
      mimetype: 'image/png',
      buffer: IMAGE_BUFFER,
    })
    
    await page.locator('button.next').click() // Hackfix, click it twice to register files
    await page.locator('button.next').click()

    await page.locator('#document_number').type('123456789')
    await page.locator('input[name="expiration_date"]').type('10/16/2999')

    await page.locator('button.next').click() // Advance from Document Upload

    await page.locator('button.next').click() // Advance from Preparer/Translator

    await page.locator('canvas.form-control').click() // Sign 

    await Promise.all([ // Finish
      page.waitForNavigation(),
      page.locator('button.next').click()
    ])

    // await page.screenshot({ path: `screenshots/i9-${employeeId}.png` })
  } catch (error) {
    console.error('Error Completing Staff I9', JSON.stringify(error), error.toString())
  } finally {
    await page.close()
  }
}
