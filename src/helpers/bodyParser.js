function bodyParser(request, callback) {
  let body = []

  request.on('data', chunk => {
    body.push(chunk)
  })

  request.on('end', () => {
    request.body = JSON.parse(body)

    callback()
  })
}

module.exports = bodyParser
