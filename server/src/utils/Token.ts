import jwt from 'jsonwebtoken';

class Token {
  create(userId: number) {
    const secret = 'MX9GMY0HoZiGq2dwojQpHhTLf2qJ7KCc';
    const token = jwt.sign({ id: userId }, secret, { expiresIn: '6h' });
    return { authorization: `Bearer ${token}` }
  }

  verify(token: string) {
    try {
      const secret = 'MX9GMY0HoZiGq2dwojQpHhTLf2qJ7KCc';
      const [, tokenSplited] = token.split(' ');
      const isTokenValid = jwt.verify(tokenSplited, secret);
      if (isTokenValid) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}

export default new Token();
