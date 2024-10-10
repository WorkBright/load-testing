import { getAuthenticatedPage } from '../../browser/getAuthenticatedPage.js'
import {
  getBaseUrl,
  getEnvironment,
} from '../../util/environment.js'
import { sleep } from 'k6'
import { createEmployees } from '../api/employees.js'

const PATH_TO_I9_FORM = 'forms/i9/submission/new'
const PATH_TO_W4_FORM = 'forms/w4/submission/new'
const IMAGE_BUFFER = open('../../util/image.txt')

export async function staffFormsSubmitWorkflow() {
  const employee = createEmployees()

  const page = await getAuthenticatedPage(employee.id)

  await page.context().grantPermissions(['geolocation'], {
    origin: `${getBaseUrl()}/`
  }) // Make sure we allow geolocation sharing

  await page.context().setGeolocation({ latitude: 59.95, longitude: 30.31667 })

  try {
    await page.goto(`${getBaseUrl()}/${PATH_TO_W4_FORM}`)

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

      // await page.screenshot({ path: `screenshots/screenshot${employee.id}.png` })
    }

    await page.goto(`${getBaseUrl()}/${PATH_TO_I9_FORM}`)

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

    sleep(5)

    await page.locator('button.next').click()

    if(getEnvironment() !== 'production') {
      await page.locator('#document_number').type('123456789')
      await page.locator('input[name="expiration_date"]').type('10/16/2999')
    }

    sleep(3)

    await page.locator('button.next').click() // Advance from Document Upload

    await page.locator('button.next').click() // Advance from Preparer/Translator

    await page.locator('canvas.form-control').click() // Sign

    await Promise.all([ // Finish
      page.waitForNavigation(),
      page.locator('button.next').click()
    ])

    await page.goto(`${getBaseUrl()}/`)

    await page.locator('.alert-danger a').click() // Click initiate Section 2 Auth Rep

    await page.waitForNavigation() // Wait

    await page.locator('.btn-primary').click() // Click share location

    await page.waitForSelector('#auth_rep_phone', {
      timeout: 100000
    })

    await page.locator('#auth_rep_phone').type('7205552428') // Fill in auth rep phone number

    await page.locator('.btn-primary').click() // Send SMS message

    sleep(5)

    const remoteCountersignId = await page.evaluate(() => {
      return window.gon.i9RemoteCountersign.id
    })

    await page.goto(`${getBaseUrl()}/rc/${remoteCountersignId}`)

    sleep(5)

    const qrSecret = await page.evaluate(() => {
      return window.gon.i9RemoteCountersign.qrSecret
    })

    sleep(5)

    await page.goto(`${__ENV.BASE_URL}/rc/${remoteCountersignId}/${qrSecret}/authrep`)

    sleep(5)

    await page.locator('input[name="auth_rep_name"]').type('Michael Jackson')
    await page.locator('input[name="auth_rep_certification"]').check()

    await page.locator('.btn-primary').click() // Auth rep certify identity continue

    await page.waitForSelector('#ri9_document_set_container', {
      timeout: 5000
    }) // Wait until Ajax is finished before looking for the next button

    await page.locator('.btn-primary').click() // Start review

    await page.evaluate(() => {
      document.querySelectorAll('#Yes').forEach((item) => item.dispatchEvent(new Event('click')))
    }) // Click all Yes buttons

    await page.locator('.btn-primary').click() // Finish review

    sleep(3)

    await page.locator('canvas.form-control').click() // Sign

    await page.locator('.btn-primary').click() // Complete Verification

    // await page.screenshot({ path: `screenshots/authi9-${employee.id}.png` })
  } catch (error) {
    console.error('Error Completing Staff Forms Submit', JSON.stringify(error), error.toString())
  } finally {
    await page.close()
  }
}
