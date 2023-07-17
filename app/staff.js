import { sleep } from 'k6'
import exec from 'k6/execution'
import http from 'k6/http'
import { login } from '../auth/login.js'

export function addStaff() {
  const vars = login()

  sleep(5)

  const randomUserId = Math.floor(Math.random() * 1000) + 1

  let response = http.post(
    `${__ENV.BASE_URL}/staff`,
    {
      utf8: vars['utf8'],
      authenticity_token: vars['authenticity_token'],
      'employee[employee_type]': 'employee',
      'employee[user_attributes][email]': `joesmith${exec.vu.idInTest}${randomUserId}@gmail.com`,
      'employee[employee_profile_attributes][first_name]': `Joe ${exec.vu.idInTest}${randomUserId}`,
      'employee[employee_profile_attributes][middle_name]': 'C',
      'employee[employee_profile_attributes][last_name]': 'Smith',
      'employee[employee_profile_attributes][address_attributes][street]': '',
      'employee[employee_profile_attributes][address_attributes][apt]': '',
      'employee[employee_profile_attributes][address_attributes][city]': '',
      'employee[employee_profile_attributes][address_attributes][state]': '',
      'employee[employee_profile_attributes][address_attributes][zip]': '',
      'employee[employee_profile_attributes][address_attributes][country]': 'US',
      'employee[employee_profile_attributes][phone]': '',
      'employee[employee_profile_attributes][gender]': '',
      'employee[employee_profile_attributes][birthdate]': '',
      'employee[employee_profile_attributes][ssn]': '',
      'employee[employee_profile_attributes][nickname]': '',
      'employee[custom_fields][udf_1]': '0',
      'employee[employee_group_ids][]': '',
      hire_date: '',
      start_date: '',
      end_date: '',
      'employee[new_employment_attributes][hire_date]': '',
      'employee[new_employment_attributes][start_date]': '',
      'employee[new_employment_attributes][end_date]': '',
      'employee[new_employment_attributes][onboarding_start_date]': '',
      button: '',
    },
    {
      headers: {
        accept:
          '*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-csrf-token': vars['csrf_token'],
        'x-requested-with': 'XMLHttpRequest',
        'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    }
  )
}
