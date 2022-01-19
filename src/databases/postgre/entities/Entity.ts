import Postgres, { Query } from '../index';

export default abstract class Entity<T> {
  constructor(
    protected readonly entityName: string,
    protected readonly schemaName: string = 'public'
  ) {}

  async insertOne(
    inData: Partial<T>,
    outData: (keyof T)[] | '*'
  ): Promise<Partial<T>> {
    const attributes = Object.keys(inData).join(',');
    const values = Object.values(inData) as (string | number)[];
    const refs = values.map((_, i) => `$${i + 1}`);
    const returning = outData === '*' ? '*' : outData.join(',');

    const table = `${this.schemaName}.${this.entityName}`;

    const insertRow: Query = {
      name: `Insert row in ${table}`,
      text: `INSERT INTO ${table}(${attributes}) VALUES (${refs}) RETURNING ${returning}`,
      values,
    };

    const { rows } = (await Postgres.query<T>(insertRow)) as {
      rows: Partial<T>[];
    };

    return rows[0];
  }

  async find(
    filterData: Partial<T>,
    outData: (keyof T)[] | '*'
  ): Promise<Partial<T>[]> {
    const returning = outData === '*' ? '*' : outData.join(' ,');
    const keys = Object.keys(filterData);
    const values = Object.values(filterData) as (string | number)[];
    const filter = keys.map((key, i) => `${key} = $${i + 1}`).join(' AND');

    const table = `${this.schemaName}.${this.entityName}`;

    const select: Query = {
      name: `Select from ${table} with ${keys.join(' ,')}`,
      text: `SELECT ${returning} FROM ${table} WHERE ${filter}`,
      values,
    };

    const { rows } = (await Postgres.query<T>(select)) as {
      rows: Partial<T>[];
    };

    return rows;
  }
}
