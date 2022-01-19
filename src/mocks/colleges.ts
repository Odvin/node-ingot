import fakerStatic from 'faker';

import { CollegeDoc } from '../databases/mongodb/documents/colleges';

function createMockCollege(): Omit<CollegeDoc, '_id' | 'updatedAt'> {
  return {
    mysqlId: fakerStatic.datatype.number(1000),
    ipedsId: fakerStatic.datatype.number(100000),
    title: fakerStatic.company.companyName(),
    shortTitle: fakerStatic.company.companySuffix(),
    address: {
      state: fakerStatic.address.stateAbbr(),
      zip: fakerStatic.address.zipCode(),
      city: fakerStatic.address.cityName(),
      street: fakerStatic.address.streetAddress(),
    },
    location: {
      type: 'Point',
      coordinates: [
        parseFloat(fakerStatic.address.longitude()),
        parseFloat(fakerStatic.address.latitude()),
      ],
    },
    phone: {
      general: fakerStatic.phone.phoneNumberFormat(),
      financial: fakerStatic.phone.phoneNumberFormat(),
      administrative: fakerStatic.phone.phoneNumberFormat(),
    },
    url: {
      school: fakerStatic.internet.url(),
      athletes: fakerStatic.internet.url(),
      logo: fakerStatic.image.imageUrl(),
    },
    student: {
      men: fakerStatic.datatype.number(10000),
      women: fakerStatic.datatype.number(10000),
    },
    hidden: false,
  };
}

export const collegeDocA = createMockCollege();
export const collegeDocB = createMockCollege();
