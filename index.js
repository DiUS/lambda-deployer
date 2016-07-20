'use strict'
/* eslint-disable no-console */
console.log('Loading function')
/* eslint-enable no-console */


const aws = require('aws-sdk')

const l = new aws.Lambda({ apiVersion: 'latest' })


const errorHandler = (err, context) => {
  /* eslint-disable no-console */
  console.error(err, err.stack)
  /* eslint-enable no-console */
  context.fail('Internal Error.')
}


exports.handler = (event, context) => {
  const bucket = event.Records[ 0 ].s3.bucket.name
  const key = decodeURIComponent(event.Records[ 0 ].s3.object.key.replace(/\+/g, ' '))

  const functionName = key.substring(key.lastIndexOf('.'), 0)
  const extension = key.substring(key.lastIndexOf('.'))

  if (!extension.match(/^\.zip$/i))
    return errorHandler(new Error(`Invalid file extension: ${extension}`), context)

  const params = {
    FunctionName: functionName,
    Publish: true,
    S3Bucket: bucket,
    S3Key: key
  }

  l.updateFunctionCode(params, (err, result) => {
    (err)
      ? errorHandler(err, context)
      : context.succeed(`Function has been successfully updated: ${result}`)
  })
}
