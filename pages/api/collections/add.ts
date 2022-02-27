import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../services/firebase/db';
import requestIp from 'request-ip'
import { getRandomNumber } from '../../../services/firebase/utils/getRandomNumber';
import { withSentry } from '@sentry/nextjs';

type Data = {
    success?: true
    err?: string
    msg?: string
    payload?: any
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Prevent GET method
    if (req.method === 'GET') return res.status(405).json({ err: 'method not allowed' })

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
    const stats = db.collection("stats").doc("collections")
    const statsData = await stats.get()

    // Increase Total Generated Assets
    const newCount = statsData.exists ? statsData.data()?.count || 0 : 0
    db.collection("stats").doc("collections").set({ count: newCount + size })

    res.status(200).json({
        success: true
    })
}
export default withSentry(handler);