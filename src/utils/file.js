/**
 * Check if a file exists
 * @param {String} url Target URL
 */
export function fileExists(url) {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest()

    /* Check the status code of the request */
    xhttp.onreadystatechange = function () {
      if (!xhttp.status) return
      return xhttp.status !== 404 ? resolve() : reject()
    }

    /* Open and send the request */
    xhttp.open('HEAD', url)
    xhttp.send()
  })
}