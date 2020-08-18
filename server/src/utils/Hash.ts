import bcrypt from "bcrypt";

class Hash {
  async encrypt(password: string) {
    const hash_password = await bcrypt.hash(password, 10);
    return hash_password;
  }
}

export default new Hash();
