import { NextApiRequest, NextApiResponse } from "next";
import db from "../../services/firebase/db";

type Data = {
    err?: string
    payload?: any
}

/**
 * Get Count From All Stats
 * */
const getCount = async (statsDoc: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>, docName: string) => {
    const collectionsDoc = statsDoc.doc(docName)
    const statsData = await collectionsDoc.get()

    return statsData.data()?.count || 0
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Only GET method Allowed
    if (req.method !== 'GET') return res.status(405).json({ err: 'method not allowed' })

    const statsDoc = db.collection("stats")
    const collectionsCount = await getCount(statsDoc, 'collections');
    const usersCount = await getCount(statsDoc, 'users');


    return res.status(200).json({
        payload: {
            users: usersCount,
            collections: collectionsCount
        }
    })
}

export default handler;