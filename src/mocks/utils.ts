export const chance = (): boolean => Math.random() < 0.5;

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getSubset<T>(obj: T, withoutKeys?: string[]): Partial<T> {
  const systemKeys = ['_id', 'updatedAt'];

  if (withoutKeys?.length) systemKeys.push(...withoutKeys);

  const objKeys = Object.keys(obj).filter((key) => !systemKeys.includes(key));

  const useKeys = objKeys.reduce(
    (keys: string[], key: string) => (chance() ? [...keys, key] : keys),
    []
  ) as (keyof T)[];

  const subset: Partial<T> = {};

  for (const key of useKeys) {
    Object.assign(subset, { [key]: obj[key] });
  }

  return subset;
}
