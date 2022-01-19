import { ObjectId } from 'mongodb';

type NoteProps = {
  updatedAt: Date;
  mysqlId?: number;
  pinned: boolean;
  text: string;
};

export interface NoteDocument extends NoteProps {
  _id: ObjectId;
  athleteId: ObjectId;
  coachId: ObjectId;
}

export interface NoteDoc extends NoteProps {
  _id: string;
  athleteId: string;
  coachId: string;
}
