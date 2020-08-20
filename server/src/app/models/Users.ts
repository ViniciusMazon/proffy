import db from '../../database/connections';
import hash from '../../utils/Hash';

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

  async updatePasswordResetTokenAndExpires(id: number, token: string) {
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await db('users')
      .where('id', id)
      .update({
        'password_reset_token': token,
        'password_reset_expires': now.toLocaleString(),
      });
  }

  async updatePassword(id: number, password: string) {
    const hash_password = await hash.encrypt(password);

    await db('users')
      .where('id', id)
      .update({
        hash_password
      });
  }
}

export default new Users();
