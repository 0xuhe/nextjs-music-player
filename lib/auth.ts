import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => void
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, "hello") as { id: number };
        user = await prisma.user.findUnique({
          where: {
            id,
          },
        });
        if (!user) {
          throw new Error("Not real user");
        }
      } catch {
        res.status(401);
        res.json({ error: "Not Authorizied" });
        return;
      }
      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorizied" });
    return;
  };
};

export function validateToken(token: string) {
  const user = jwt.verify(token, "hello") as { id: number };
  return user;
}
