import { ObjectId } from 'mongodb';

import fakerStatic from 'faker';

import { TagDoc, TagKind } from '../databases/mongodb/documents/tags';

import { chance, getRandomInt } from './utils';

function createMockTag(): Omit<TagDoc, '_id' | 'updatedAt'> {
  return {
    collegeId: new ObjectId().toHexString(),
    sportId: new ObjectId().toHexString(),
    coachId: new ObjectId().toHexString(),
    title: fakerStatic.name.jobDescriptor(),
    description: fakerStatic.name.jobTitle(),
    archived: chance(),
    color: fakerStatic.internet.color(),
    icon: fakerStatic.lorem.word(),
    kind: chance() ? TagKind.PRIMARY : TagKind.REGULAR,
    position: getRandomInt(1, 100),
    private: false,
  };
}

export const tagDocA = createMockTag();
export const tagDocB = createMockTag();
