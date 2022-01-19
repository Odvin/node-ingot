import notes, { Notes } from '../../databases/mongodb/repositories/NotesRep';
import { NoteDoc } from '../../databases/mongodb/documents/note';
import { AthleteDoc } from '../../databases/mongodb/documents/athletes';

export class NoteService {
  constructor(public notes: Notes) {}

  async createNote(noteDoc: Omit<NoteDoc, '_id' | 'updatedAt'>) {
    const updatedAt = new Date();

    const _id = await this.notes.createNote({ ...noteDoc, updatedAt });

    const doc: NoteDoc = { ...noteDoc, _id, updatedAt };

    return doc;
  }

  async getAthleteNotes(_id: AthleteDoc['_id']) {
    return this.notes.getByAthleteId(_id);
  }

  async updateNote(
    noteDoc: Pick<NoteDoc, '_id' | 'athleteId' | 'coachId'> & Partial<NoteDoc>
  ) {
    const doc = await this.notes.getById(noteDoc._id);

    if (!doc) {
      return null;
    }

    const { athleteId, coachId, ...updates } = noteDoc;

    // Coach has to update only their own notes?
    if (coachId !== doc.coachId || athleteId !== doc.athleteId) {
      return null;
    }

    const updatedAt = new Date();

    return this.notes.updateNote({ ...updates, updatedAt });
  }
}

export default new NoteService(notes);
