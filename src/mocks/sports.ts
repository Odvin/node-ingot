import fakerStatic from 'faker';

import { chance, getRandomInt } from './utils';

import { SportDoc, Gender } from '../databases/mongodb/documents/sports';

function createMockPositions(
  n: number
): { label: string; shortLabel: string }[] {
  const res = [];

  for (let i = 0; i < n; i++) {
    res.push({
      label: fakerStatic.commerce.productName(),
      shortLabel: fakerStatic.commerce.product(),
    });
  }

  return res;
}

function createMockSport(): Omit<SportDoc, '_id' | 'updatedAt'> {
  return {
    ncsaId: fakerStatic.datatype.number(1000),
    title: fakerStatic.company.companyName(),
    shortTitle: fakerStatic.company.companySuffix(),
    gender: chance() ? Gender.male : Gender.female,
    published: true,
    positions: createMockPositions(getRandomInt(1, 10)),
  };
}

export const sportDocA = createMockSport();
export const sportDocB = createMockSport();
