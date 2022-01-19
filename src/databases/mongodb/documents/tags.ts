import { ObjectId } from 'mongodb';

export enum TagKind {
  PRIMARY = 'primary',
  REGULAR = 'regular',
}

type TagProps = {
  updatedAt: Date;
  title: string;
  description?: string;
  archived: boolean;
  color: string;
  icon: string;
  kind: TagKind;
  position: number;
  private: boolean;
};

export interface TagDocument extends TagProps {
  _id: ObjectId;
  collegeId: ObjectId;
  sportId: ObjectId;
  coachId: ObjectId;
}

export interface TagDoc extends TagProps {
  _id: string;
  collegeId: string;
  sportId: string;
  coachId: string;
}
