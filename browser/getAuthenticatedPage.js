import { browser } from 'k6/browser'
import {
  getBaseUrl,
} from '../util/environment.js'
import { getUserAccessToken } from '../http/auth/getUserAccessToken.js'

export async function getAuthenticatedPage(employeeId) {
  const context = await browser.newContext()
  const page = await context.newPage()

  const accessToken = getUserAccessToken(employeeId)
  try {
    await page.goto(`${getBaseUrl()}sign_in_with_token?token=${accessToken}`)
  } catch (e) {
    console.error('Something went wrong at getAuthenticatedPage:', e)
  }

  return page
}
