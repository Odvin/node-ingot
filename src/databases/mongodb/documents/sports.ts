import { ObjectId } from 'mongodb';

type PositionAttributes = {
  label: string;
  shortLabel: string;
};

export enum Gender {
  male = 'M',
  female = 'F',
}

type SportProps = {
  updatedAt: Date;
  ncsaId: number;
  title: string;
  shortTitle: string;
  published: boolean;
  positions: PositionAttributes[];
  gender: Gender;
};

export interface SportDocument extends SportProps {
  _id: ObjectId;
}

export interface SportDoc extends SportProps {
  _id: string;
}
