import { UserDTO } from "../dto/user.dto";
import { InternalException, NotFoundException } from "../exceptions";
import { Users } from "../models/users.model";
import { SecurityClass } from "../security/security";

export class UserService {
  static async getAllUsers(): Promise<Users[]> {
    try {
      const users = await Users.find();

      if (users.length === 0)
        throw new NotFoundException("Usuário não encontrado.");

      return users;
    } catch (error) {
      console.error(error);
      throw new InternalException("Erro ao consultar tabela de usuários.");
    }
  }

  static async getUserById(userId: string): Promise<Users> {
    try {
      const user = await Users.findOneBy({ id: userId });
      if (!user) throw new NotFoundException("Usuário não encontrado.");

      return user;
    } catch (error) {
      console.error(error);
      throw new InternalException("Erro ao consultar tabela de usuários.");
    }
  }

  static async getUserByEmail(userEmail: string): Promise<Users> {
    try {
      const user = await Users.findOneBy({ email: userEmail });
      if (!user) throw new NotFoundException("Usuário não encontrado.");

      return user;
    } catch (error) {
      console.error(error);
      throw new InternalException("Erro ao consultar tabela de usuários.");
    }
  }

  static async createUser(userData: Users): Promise<UserDTO> {
    try {
      const userHashPassword = await SecurityClass.encryptUserPassword(
        userData.password
      );

      const user = Users.create({
        name: userData.name,
        email: userData.email,
        password: userHashPassword,
      });

      const newUser = await Users.save(user);

      return new UserDTO(newUser.name, newUser.email, newUser.createdAt);
    } catch (error) {
      throw new InternalException(`Erro ao criar usuário: ${error.message}`);
    }
  }

  static async updateUser(userId: string, userData: Users): Promise<UserDTO> {
    try {
      const user = await Users.findOneBy({ id: userId });
      if (!user) throw new NotFoundException("Usuário não encontrado.");

      const updatedUser = Users.merge(user, userData);
      await Users.save(updatedUser);

      return new UserDTO(
        updatedUser.name,
        updatedUser.email,
        updatedUser.createdAt
      );
    } catch (error) {
      throw new InternalException(`Erro ao criar usuário: ${error.message}`);
    }
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      await Users.delete({ id: userId });
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}