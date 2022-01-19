import athletes, {
  Athlete,
  Athletes,
} from '../../databases/postgre/entities/AthletesEnt';

export class AthleteService {
  constructor(public athletes: Athletes) {}

  async createAthlete(athlete: Omit<Athlete, 'athlete_id'>) {
    const { athlete_id } = await this.athletes.create(athlete);
    return athlete_id;
  }

  async getAthlete(athleteId: Athlete['athlete_id']) {
    return this.athletes.getByPK(athleteId);
  }
}

export default new AthleteService(athletes);
