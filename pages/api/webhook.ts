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

    if (
      deviceToken === process.env.DEVICE_TOKEN &&
      signal === process.env.SIGNAL
    ) {
      console.log(payload)
      res.status(200).json({ name: 'Webhook' })
    }

    res.status(400).json({ name: 'Bad request' })
  } catch (error: any) {
    if (error.code === 'ENOTFOUND') {
      console.log(404, 'Not Found')
    }
  }
}
