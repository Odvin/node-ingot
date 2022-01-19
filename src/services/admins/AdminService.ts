import colleges, {
  Colleges,
} from '../../databases/mongodb/repositories/CollegesRep';

import sports, { Sports } from '../../databases/mongodb/repositories/SportsRep';

import athletes, {
  Athletes,
} from '../../databases/mongodb/repositories/AthletesRep';

import authService, { AuthService } from '../auth/AuthService';

import { adminCredentials } from '../../config';

import {
  SeedingOptions,
  UserCredentials,
  AdminAttributes,
  UserRole,
  UserTokenPayload,
} from '../contracts';

export class AdminService {
  private adminAttributes: AdminAttributes = {
    id: adminCredentials.id,
    collegeId: adminCredentials.id,
    name: adminCredentials.name,
    surname: adminCredentials.surname,
    email: adminCredentials.email,
    password: adminCredentials.password,
    role: UserRole.ADMIN,
  };

  constructor(
    private authService: AuthService,
    private colleges: Colleges,
    private sports: Sports,
    private athletes: Athletes
  ) {}

  async getToken(credentials: UserCredentials) {
    const { email, password } = credentials;

    if (
      email !== this.adminAttributes.email ||
      password !== this.adminAttributes.password
    ) {
      return null;
    }

    const tokenPayload: UserTokenPayload = {
      id: this.adminAttributes.id,
      collegeId: this.adminAttributes.collegeId,
      role: this.adminAttributes.role,
    };

    const adminToken = await this.authService.createToken(tokenPayload);

    return adminToken;
  }

  async startSeeding(seedingOptions: SeedingOptions) {
    const results = {
      sports: {
        ok: 0,
        n: 0,
      },
      colleges: {
        ok: 0,
        n: 0,
      },
      athletes: {
        ok: 0,
        n: 0,
      },
    };

    if (seedingOptions.sports) {
      results.sports = await this.sports.seed();
    }

    if (seedingOptions.colleges) {
      results.colleges = await this.colleges.seed();
    }

    if (seedingOptions.athletes) {
      results.athletes = await this.athletes.seed();
    }

    return results;
  }
}

export default new AdminService(authService, colleges, sports, athletes);
