// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { deviceToken, signal, payload } = req.body
    const { authorization } = req.headers

    if (authorized(deviceToken, signal, authorization)) {
      console.log(payload)
      res.status(200).json({ name: 'Webhook' })
    } else {
      console.log('Unauthorized')
      res.status(401).json({ name: 'Unauthorized' })
    }
  } catch (error: any) {
    if (error.code === 'ENOTFOUND') {
      console.log(404, 'Not Found')
    }
  }
}

function authorized(deviceToken: string, signal: string, authorization: any) {
  if (!authorization) {
    return false
  }

  const authHeaderSplitArray = Buffer.from(
    authorization.split(' ')[1],
    'base64'
  )
    .toString()
    .split(':')

  const username = authHeaderSplitArray[0]
  const password = authHeaderSplitArray[1]

  console.log(username)
  console.log(password)

  if (
    username !== process.env.WEBHOOK_USERNAME ||
    password !== process.env.WEBHOOK_PASSWORD ||
    deviceToken !== process.env.DEVICE_TOKEN ||
    signal !== process.env.DEVICE_SIGNAL
  ) {
    return false
  }
  return true
}
