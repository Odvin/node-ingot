import { ObjectId } from 'mongodb';

import Repository from './Repository';
import { NoteDocument, NoteDoc } from '../documents/note';

export class Notes extends Repository<NoteDocument> {
  constructor(collectionName: string) {
    super(collectionName);
  }

  private getNoteDoc(noteDocument: NoteDocument): NoteDoc {
    return {
      ...noteDocument,
      _id: noteDocument._id.toHexString(),
      athleteId: noteDocument.athleteId.toHexString(),
      coachId: noteDocument.coachId.toHexString(),
    };
  }

  async createNote(noteDoc: Omit<NoteDoc, '_id'>): Promise<NoteDoc['_id']> {
    const athleteId = new ObjectId(noteDoc.athleteId);
    const coachId = new ObjectId(noteDoc.coachId);
    const noteId = await this.create({ ...noteDoc, athleteId, coachId });
    return noteId.toHexString();
  }

  async getById(noteId: NoteDoc['_id']) {
    const doc = await this.findOne({ _id: new ObjectId(noteId) });
    return doc ? this.getNoteDoc(doc) : null;
  }

  async updateNote(noteDoc: Pick<NoteDoc, '_id'> & Partial<NoteDoc>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, athleteId, coachId, ...updates } = noteDoc;
    const doc = await this.update(
      { _id: new ObjectId(_id) },
      { $set: updates }
    );
    return doc ? this.getNoteDoc(doc) : null;
  }

  async getByAthleteId(athleteId: string) {
    const cursor = this.find({ athleteId: new ObjectId(athleteId) });
    const notes: NoteDocument[] = await cursor.toArray();
    await cursor.close();
    return notes.map((note) => this.getNoteDoc(note));
  }
}

export default new Notes('notes');
