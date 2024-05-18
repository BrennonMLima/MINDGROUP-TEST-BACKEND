import * as express from "express";
import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import protectedRoute from "../security/guard";
import { UserDTO } from "../dto/user.dto";

const router = express.Router();

router.get("/", protectedRoute, async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    const usersDTO = users.map((user) => {
      return {
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        id: user.id,
      };
    }) as UserDTO[];

    return res.send({ users: usersDTO });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao consultar tabela de usuários." });
  }
});

router.get("/:id", protectedRoute, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserService.getUserById(id);
    const userDTO = {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      id: user.id,
    } as UserDTO;

    return res.send({ users: userDTO });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao consultar tabela de usuários." });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const user = await UserService.createUser(body);
    const userDTO = {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      id: user.id,
    } as UserDTO;

    return res.status(201).send({ user: userDTO });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar usuário." });
  }
});

router.put("/:id", protectedRoute, async (req: Request, res: Response) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const user = await UserService.updateUser(id, body);
    const userDTO = {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      id: user.id,
    } as UserDTO;
    return res.status(201).send({ users: userDTO });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao editar usuário." });
  }
});

router.patch(
  "/change-password/:id",
  protectedRoute,
  async (req: Request, res: Response) => {
    const {
      body: { password, newPassword },
      params: { id },
    } = req;

    try {
      await UserService.changeUserPassword(id, password, newPassword);
      return res.status(201).send({ message: "Senha alterada com sucesso." });
    } catch (error) {
      return res.status(500).send({ message: "Erro ao alterar senha." });
    }
  }
);

router.delete("/:id", protectedRoute, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await UserService.deleteUser(id);
    res.status(202).send({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao excluir usuário." });
  }
});

export default router;
