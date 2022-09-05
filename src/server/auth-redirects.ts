import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../pages/api/auth/[...nextauth]";
import {prisma} from "./db/client";
import {IncomingMessage, ServerResponse} from "http";


export async function authRedirects(
  req: IncomingMessage & {cookies: Partial<{[p: string]: string}>},
  res: ServerResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/signin"
      }
    }
  } else if (!await prisma.gachamon.findUnique({where: {userId: session.user?.id}})) {
    return {
      redirect: {
        destination: "/create-profile"
      }
    }
  } else {
    return {}
  }
}

