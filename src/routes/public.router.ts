import * as express from "express";
import { Request, Response } from "express";
import { SecurityClass } from "../security/security";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const {
    body: { email, password },
  } = req;
  if (await SecurityClass.isValidLogin(email, password))
    return res.status(200).send("Bem vindo");

  return res.status(401).send("Não autorizado");
});

export default router;