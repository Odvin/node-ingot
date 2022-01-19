import axios from 'axios';
import { GraphQLClient, gql } from 'graphql-request';

import logger from '../../../logger';

import { ncsaApiUrl } from '../../../config';

type NcsaSport = {
  id: number;
  ncsaId: number;
  name: string;
  canonicalSportId: number;
};

type NcsaUser = {
  id: number;
  firstName: string;
  lastName: string;
  ncsaCoachId: number;
  sports: NcsaSport[];
  college: {
    id: number;
    ipedsId: number;
    ncsaCollegeId: number;
    name: string;
  };
  position: string;
  contact: {
    email: string;
    twitter?: string;
    telephone?: string;
  };
  brAuthToken: string;
};

type NcsaCognitoUser = {
  username: string;
  attributes: [
    { name: 'sub'; value: string },
    { name: 'email_verified'; value: string },
    { name: 'custom:is_verified'; value: string },
    { name: 'custom:coach_id'; value: string },
    { name: 'email'; value: string }
  ];
  user_create_date: string;
  user_last_modified_date: string;
  enabled: boolean;
  user_status: string;
};

export class NcsaAuthenticator {
  private readonly ncsaUserQuery = gql`
    {
      user {
        id
        firstName
        lastName
        ncsaCoachId
        sports {
          id
          ncsaId
          name
          canonicalSportId
        }
        college {
          id
          ipedsId
          ncsaCollegeId
          name
        }
        position
        contact {
          email
          twitter
          telephone
        }
        brAuthToken
      }
    }
  `;

  constructor(private readonly ncsaApiUrl: string) {}

  async fetchNcsaToken(cognitoToken: string): Promise<string | undefined> {
    try {
      const {
        data: { token: ncsaToken },
      }: { data: { token: string } } = await axios.post(
        `${this.ncsaApiUrl}/auth/login`,
        null,
        {
          headers: {
            Authorization: cognitoToken,
          },
        }
      );
      return ncsaToken;
    } catch (error) {
      logger.error('AuthNcsaCoachService::getNcsaToken', error);
    }
  }

  async fetchNcsaUser(ncsaToken: string): Promise<NcsaUser> {
    const graphQLClient = new GraphQLClient(`${this.ncsaApiUrl}/graphql`, {
      headers: {
        authorization: ncsaToken,
      },
    });

    const { user } = await graphQLClient.request(this.ncsaUserQuery);

    return user;
  }

  async fetchNcsaCognitoUser(email: string): Promise<NcsaCognitoUser> {
    const { data } = await axios.get(`${this.ncsaApiUrl}/cognito_coach`, {
      params: {
        username: email,
      },
    });
    return data;
  }
}

export default new NcsaAuthenticator(ncsaApiUrl);
