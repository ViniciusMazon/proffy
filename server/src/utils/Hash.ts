import bcrypt from "bcrypt";

class Hash {
  async encrypt(password: string) {
    const hash_password = await bcrypt.hash(password, 10);
    return hash_password;
  }
  async compare(hash_password: string, password: string) {
    const isValid = await bcrypt.compare(password, hash_password);
    return isValid;
  }
}

export default new Hash();
