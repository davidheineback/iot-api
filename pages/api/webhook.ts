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
    console.log(req.body)

    const { deviceToken, signal, payload } = req.body

    res.status(200).json({ name: 'Webhook' })
  } catch (error: any) {
    if (error.code === 'ENOTFOUND') {
      console.log(404, 'Not Found')
    }
  }
}
