import * as bcrypt from "bcrypt";
import { UserService } from "../services/user.service";

export class SecurityClass {
  static async encryptUserPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async isValidLogin(email: string, password: string): Promise<boolean> {
    const user = await UserService.getUserByEmail(email);

    const res = await bcrypt.compare(password, user.password);

    console.log(res);

    return res;
  }
}