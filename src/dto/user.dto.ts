export class UserDTO {
    name: string;
    email: string;
    createdAt: Date;
  
    constructor(name: string, email: string, createdAt: Date) {
      this.name = name;
      this.email = email;
      this.createdAt = createdAt;
    }
  }