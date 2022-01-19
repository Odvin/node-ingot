import { ObjectId } from 'mongodb';

export enum ScholarshipStatus {
  COMMITTED = 'committed',
  UNCOMMITTED = 'uncommitted',
}

export enum ParentRelation {
  MOTHER = 'mother',
  FATHER = 'father',
  STEPMOTHER = 'stepmother',
  STEPFATHER = 'stepfather',
  FRIEND_OF_FAMILY = 'friend of family',
  GUARDIAN = 'guardian',
}

export enum Handed {
  RIGHT = 'R',
  LEFT = 'L',
}

type Parent = {
  relation: ParentRelation;
  name: string;
  email: string;
  phone: string;
};

type AthleteProps = {
  mysqlId: number;
  updatedAt: Date;
  name: string;
  surname: string;
  nick?: string;
  graduation: number;
  birthday: Date;
  contacts?: {
    email?: string;
    altEmail?: string;
    recEmail?: string;
    homePhone?: string;
    cellPhone?: string;
    state?: string;
    address?: string;
    altAddress?: string;
    city?: string;
    zip?: string;
  };
  club?: {
    name?: string;
    director?: string;
    phone?: string;
    email?: string;
    coach?: string;
    coachPhone?: string;
    coachEmail?: string;
    teamAge?: string;
    teamRank?: string;
    uniform?: number;
    position?: string;
    altPosition?: string;
  };
  academics?: {
    gpa?: number;
    act?: number;
    sat?: number;
    scholarshipStatus?: ScholarshipStatus;
  };
  school?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  team?: {
    name?: string;
    uniform?: number;
    position?: string;
    altPosition?: string;
  };
  parents?: Parent[];
  physical?: {
    height?: number;
    weight?: number;
    reach?: number;
    approach?: number;
    block?: number;
    handed?: Handed;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    snapchat?: string;
  };
};

export interface AthleteDocument extends AthleteProps {
  _id: ObjectId;
}

export interface AthleteDoc extends AthleteProps {
  _id: string;
}
