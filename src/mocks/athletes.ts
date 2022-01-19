import { ObjectId } from 'mongodb';
import fakerStatic from 'faker';
import { chance, getRandomInt } from './utils';

import {
  AthleteDoc,
  ScholarshipStatus,
  Handed,
  ParentRelation,
} from '../databases/mongodb/documents/athletes';

export function createMockAthlete(): AthleteDoc {
  return {
    _id: new ObjectId().toHexString(),
    updatedAt: new Date(),
    mysqlId: fakerStatic.datatype.number(1000),
    name: fakerStatic.name.firstName(),
    surname: fakerStatic.name.lastName(),
    nick: fakerStatic.name.firstName(),
    graduation: getRandomInt(2000, 2010),
    birthday: new Date(),
    contacts: {
      email: fakerStatic.internet.email(),
      altEmail: fakerStatic.internet.email(),
      recEmail: fakerStatic.internet.email(),
      homePhone: fakerStatic.phone.phoneNumberFormat(),
      cellPhone: fakerStatic.phone.phoneNumberFormat(),
      state: fakerStatic.address.stateAbbr(),
      address: fakerStatic.address.streetAddress(),
      altAddress: fakerStatic.address.secondaryAddress(),
      city: fakerStatic.address.cityName(),
      zip: fakerStatic.address.zipCode(),
    },
    club: {
      name: fakerStatic.company.companyName(),
      director: fakerStatic.name.findName(),
      phone: fakerStatic.phone.phoneNumberFormat(),
      email: fakerStatic.internet.email(),
      coach: fakerStatic.name.findName(),
      coachPhone: fakerStatic.phone.phoneNumberFormat(),
      coachEmail: fakerStatic.internet.email(),
      teamAge: getRandomInt(1, 20).toString(),
      teamRank: fakerStatic.company.companySuffix(),
      uniform: getRandomInt(1, 20),
      position: getRandomInt(1, 20).toString(),
      altPosition: getRandomInt(1, 20).toString(),
    },
    academics: {
      gpa: getRandomInt(1, 200),
      act: getRandomInt(1, 100),
      sat: getRandomInt(1, 10),
      scholarshipStatus: chance()
        ? ScholarshipStatus.UNCOMMITTED
        : ScholarshipStatus.COMMITTED,
    },
    school: {
      name: fakerStatic.company.companyName(),
      address: fakerStatic.address.secondaryAddress(),
      city: fakerStatic.address.cityName(),
      state: fakerStatic.address.stateAbbr(),
      zip: fakerStatic.address.zipCode(),
    },
    team: {
      name: fakerStatic.company.companyName(),
      uniform: getRandomInt(1, 20),
      position: getRandomInt(1, 20).toString(),
      altPosition: getRandomInt(1, 20).toString(),
    },
    parents: [
      {
        relation: chance() ? ParentRelation.MOTHER : ParentRelation.FATHER,
        name: fakerStatic.name.findName(),
        email: fakerStatic.internet.email(),
        phone: fakerStatic.phone.phoneNumberFormat(),
      },
      {
        relation: chance() ? ParentRelation.MOTHER : ParentRelation.FATHER,
        name: fakerStatic.name.findName(),
        email: fakerStatic.internet.email(),
        phone: fakerStatic.phone.phoneNumberFormat(),
      },
    ],
    physical: {
      height: getRandomInt(160, 220),
      weight: getRandomInt(70, 100),
      reach: getRandomInt(70, 100),
      approach: getRandomInt(70, 100),
      block: getRandomInt(100, 250),
      handed: chance() ? Handed.RIGHT : Handed.LEFT,
    },
    social: {
      facebook: fakerStatic.internet.userName(),
      instagram: fakerStatic.internet.userName(),
      twitter: fakerStatic.internet.userName(),
      snapchat: fakerStatic.internet.userName(),
    },
  };
}

export const athleteDocA = createMockAthlete();
