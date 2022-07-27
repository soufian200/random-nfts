import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../services/firebase/db';
import requestIp from 'request-ip'
import { getRandomNumber } from '../../../services/firebase/utils/getRandomNumber';

type Data = {
    success: boolean
    err?: string
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Prevent GET method
    if (req.method === 'GET') return res.status(405).json({ success: false, err: 'method not allowed' })

    const { collectionName, size, description } = req.body;
    // Detected user IP
    const ip = requestIp.getClientIp(req)

    // Attach collections to ip (users)
    // Get User Doc
    let userDoc = db.collection("users").doc(ip || "noip");

    const userData = await userDoc.get();
    // if exists push collection
    if (!userData.exists)
        userDoc.set({ createdAt: Date.now() })

    // Get Collection Doc
    let collectionDoc = userDoc.collection("collections").doc(collectionName)
    // Get Collection Data
    const collectionData = await collectionDoc.get();
    // Prevent Overide Collection Doc
    const newCollectionName = collectionData.exists
        ? (collectionData.data()?.collectionName || '') + " " + getRandomNumber()
        : collectionName
    // Prepare data to be saved in firestore
    const data = {
        collectionName,
        size,
        description,
        createdAt: Date.now(),
    }
    collectionDoc = userDoc.collection("collections").doc(newCollectionName)
    // Save collection to firestore
    collectionDoc.set(data)
    // Add user count collections
    const count = userData.data()?.count;
    userDoc.set({ count: typeof count === 'number' ? count + 1 : 1 })

    // Get Collection Stats
    const statsCol = db.collection("stats").doc("collections")
    const statsData = await statsCol.get()

    // Increase Total Generated Assets
    const newCount = statsData.exists ? statsData.data()?.count || 0 : 0
    statsCol.set({ count: newCount + size })

    if (!userData.exists) {
        const statsCol = db.collection("stats").doc("users")
        const statsData = await statsCol.get()
        const newCount = statsData.exists ? statsData.data()?.count || 0 : 0
        statsCol.set({ count: newCount + 1 })
    }

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.status(200).json({
        success: true
    })
}
export default handler;