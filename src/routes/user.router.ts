import * as express from "express";
import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  return res.send({ users: users });
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserService.getUserById(id);
  return res.send({ users: user });
});

router.post("/", async (req: Request, res: Response) => {
  const { body } = req;
  const user = await UserService.createUser(body);

  return res.send({ user: user });
});

router.put("/:id", async (req: Request, res: Response) => {
  const {
    body,
    params: { id },
  } = req;

  const user = await UserService.updateUser(id, body);
  return res.send({ users: user });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  await UserService.deleteUser(id);
});

export default router;