import Entity from './Entity';

export type Athlete = {
  athlete_id: number;
  name: string;
  surname: string;
  email: string;
};

export class Athletes extends Entity<Athlete> {
  constructor(entityName: string, schemaName: string) {
    super(entityName, schemaName);
  }

  async create(athlete: Omit<Athlete, 'athlete_id'>) {
    return this.insertOne(athlete, ['athlete_id']);
  }

  async getByPK(athlete_id: Athlete['athlete_id']): Promise<Athlete> {
    const [athlete] = await this.find({ athlete_id }, '*');
    return athlete as Athlete;
  }
}

export default new Athletes('athletes', 'master');
