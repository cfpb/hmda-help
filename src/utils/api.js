const defaults = { method: 'GET' }

/**
 * @param {String} url Target URL
 * @param {Object} options fetch options
 */
export const fetchData = (url, options) => {
  const fetchOpts = { ...defaults, ...options }
  return fetch(url, fetchOpts)
    .then((response) => checkError(response))
    .catch(error => ({ error: true, message: error }))
}

/**
 * @param {Response} response
 * @return {Object} {error, message, response}
 */
const checkError = response => {
  const result = { error: false, response}
  if(response.status >= 400) {
    result.error = true
    result.message = "Unable to fetch data"
  }
  return result 
}