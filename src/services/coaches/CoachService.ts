import coaches, {
  Coaches,
} from '../../databases/mongodb/repositories/CoachesRep';

import sports, { Sports } from '../../databases/mongodb/repositories/SportsRep';

import colleges, {
  Colleges,
} from '../../databases/mongodb/repositories/CollegesRep';

import { CoachRole } from '../../databases/mongodb/documents/coaches';

import ncsaAuth, { NcsaAuthenticator } from './components/NcsaAuthenticator';
import authService, { AuthService } from '../auth/AuthService';

import { UserTokenPayload } from '../contracts';

export class CoachService {
  constructor(
    private authService: AuthService,
    private ncsaAuth: NcsaAuthenticator,
    private coaches: Coaches,
    private colleges: Colleges,
    private sports: Sports
  ) {}

  async authorizeNcsaCoach(cognitoToken: string) {
    const ncsaToken = await this.ncsaAuth.fetchNcsaToken(cognitoToken);

    if (!ncsaToken) return null;

    const ncsaUser = await this.ncsaAuth.fetchNcsaUser(ncsaToken);

    if (!ncsaUser.contact.email) return null;

    let coachDoc = await this.coaches.getByEmail(ncsaUser.contact.email);

    if (!coachDoc) {
      const newCoachDoc = {
        email: ncsaUser.contact.email,
        role: CoachRole.COACH,
        pinnedTags: [],
        updatedAt: new Date(),
      };

      const _id = await this.coaches.createCoach(newCoachDoc);

      coachDoc = { _id, ...newCoachDoc };
    }

    const ncsaUserSportIds = ncsaUser.sports.map((sport) => sport.ncsaId);
    const sports = await this.sports.getByNcsaIds(ncsaUserSportIds);

    const college = await this.colleges.getByIpedsId(ncsaUser.college.ipedsId);

    const attributes = {
      ...coachDoc,
      name: ncsaUser.firstName,
      surname: ncsaUser.lastName,
      sports,
      college: {
        _id: college?._id ? college._id : undefined,
        ipedsId: ncsaUser.college.ipedsId,
        title: college?.title ? college.title : ncsaUser.college?.name,
        shortTitle: college?.shortTitle
          ? college.shortTitle
          : ncsaUser.college?.name,
      },
      contacts: {
        ...ncsaUser.contact,
      },
    };

    const tokenPayload: UserTokenPayload = {
      id: attributes._id,
      collegeId: `${attributes.college._id}`,
      role: attributes.role,
    };

    const token = await this.authService.createToken(tokenPayload);

    return { attributes, token };
  }

  async setPinnedTags(coachId: string, pinTags: string[]): Promise<string[]> {
    return this.coaches.setPinnedTags(coachId, pinTags);
  }
}

export default new CoachService(
  authService,
  ncsaAuth,
  coaches,
  colleges,
  sports
);
