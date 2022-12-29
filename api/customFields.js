import http from 'k6/http'

export function getCustomFields() {
  http.get(`${__ENV.BASE_URL}/api/custom_fields`, {
    headers: {
      'API-key': '45323b537ad21c61e47da8aab4d65ffbd1345aa7807260fc93046378012c560b'
    }
  })
}
