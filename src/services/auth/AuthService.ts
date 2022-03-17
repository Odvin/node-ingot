import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { jwtConfig } from '../../config';

import { UserCredentials, UserTokenPayload } from '../contracts';

const { secret, expiresIn } = jwtConfig;

export class AuthService {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string
  ) {}

  async validateToken(token: string): Promise<UserTokenPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload as UserTokenPayload);
      });
    });
  }

  async createToken(payload: UserTokenPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.secret,
        { expiresIn: this.expiresIn },
        (err, token) => {
          if (err) reject(err);
          resolve(token as string);
        }
      );
    });
  }

  async createPasswordHash(password: string): Promise<string> {
    const SALT_ROUNDS = 10;

    return bcrypt.hash(password, SALT_ROUNDS);
  }
}

export default new AuthService(secret, expiresIn);
