import { ObjectId } from 'mongodb';

export enum CoachRole {
  MANAGE = 'manager',
  COACH = 'coach',
}

type CoachProps = {
  updatedAt: Date;
  email: string;
  role: CoachRole;
};

export interface CoachDocument extends CoachProps {
  _id: ObjectId;
  pinnedTags: ObjectId[];
}

export interface CoachDoc extends CoachProps {
  _id: string;
  pinnedTags: string[];
}
