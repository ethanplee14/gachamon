import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";
import {Session} from "next-auth";


export interface AuthedSession extends Session {
    user: {
        id: string,
        email: string,
        name?: string | null,
        image?: string | null
    }
}

export type AuthHandler<ResType> = (req: NextApiRequest, res: NextApiResponse<ResType>, session: AuthedSession) => Promise<void>

export default function authEndpoint<ResType>(handler: AuthHandler<ResType>) {
    return async function (req: NextApiRequest, res: NextApiResponse<ResType | string>) {
        const session = await getSession({req})
        const email = session?.user?.email
        if (!session || !email) {
            res.status(403).send("Unauthorized")
            return
        }
        await handler(req, res, session as AuthedSession)
    }
}
