import { ObjectId } from 'mongodb';

type CollegeProps = {
  updatedAt: Date;
  mysqlId: number;
  ipedsId: number;
  title: string;
  shortTitle: string;
  address: {
    state: string;
    zip: string;
    city: string;
    street: string;
  };
  location: {
    type: string;
    coordinates: [number, number];
  };
  phone: {
    general: string;
    financial: string;
    administrative: string;
  };
  url: {
    school: string;
    athletes: string;
    logo: string;
  };
  student: {
    men: number;
    women: number;
  };
  hidden: boolean;
};

export interface CollegeDocument extends CollegeProps {
  _id: ObjectId;
}

export interface CollegeDoc extends CollegeProps {
  _id: string;
}
