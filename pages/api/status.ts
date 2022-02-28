import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    success: boolean
    err?: string
    payload: any
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return res.status(200).json({
        success: true,
        payload: {
            user: 20313,
            collections: 4230223
        }
    })
}

export default handler;