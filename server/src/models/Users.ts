import db from '../database/connections';
import hash from '../utils/Hash';

class Users {
  async store(name: string, surname: string, email: string, password: string) {
    const hash_password = await hash.encrypt(password);
    await db('users').insert({ name, surname, email, hash_password });
  }

  async getUserByEmail(email: string) {
    const user = await db.select('*')
      .from('users')
      .where('email', email)
      .first();
    return user;
  }
}

export default new Users();
