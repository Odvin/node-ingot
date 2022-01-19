import {
  OptionalId,
  WithId,
  FilterQuery,
  UpdateQuery,
  FindOneOptions,
  WithoutProjection,
  Cursor,
} from 'mongodb';
import { getCollection } from '../../mongodb';

export default class Repository<T> {
  constructor(private readonly collectionName: string) {}

  async create(createDto: OptionalId<T>): Promise<WithId<T>['_id']> {
    const collection = getCollection<T>(this.collectionName);

    const { insertedId } = await collection.insertOne(createDto);

    return insertedId;
  }

  async createMany(
    CreatesDto: OptionalId<T>[]
  ): Promise<{ ok: number; n: number }> {
    const collection = getCollection<T>(this.collectionName);

    const {
      result: { n, ok },
    } = await collection.insertMany(CreatesDto, {
      ordered: true,
    });

    return { ok, n };
  }

  async update(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>
  ): Promise<T | undefined> {
    const collection = getCollection<T>(this.collectionName);

    const { value } = await collection.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {
        returnDocument: 'after',
      }
    );

    return value;
  }

  async findOne(
    filterQuery: FilterQuery<T>,
    options?: FindOneOptions<T>
  ): Promise<T | null> {
    const collection = getCollection<T>(this.collectionName);

    return collection.findOne(filterQuery, options);
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<number | undefined> {
    const collection = getCollection<T>(this.collectionName);

    const { deletedCount } = await collection.deleteOne(filterQuery);

    return deletedCount;
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<number | undefined> {
    const collection = getCollection<T>(this.collectionName);

    const { deletedCount } = await collection.deleteMany(filterQuery);

    return deletedCount;
  }

  find(
    filterQuery: FilterQuery<T>,
    options?: WithoutProjection<FindOneOptions<T>>
  ): Cursor<T> {
    const collection = getCollection<T>(this.collectionName);

    return collection.find(filterQuery, options);
  }
}
