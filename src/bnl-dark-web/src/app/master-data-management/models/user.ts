export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  firstName: string;
  jobDescription: JobDescription;
  passwordResetToken: string;
}

export enum JobDescription
{
  Doctor = 'Doctor',
  Nurse = 'Nurse',
  Administrative = 'Administrative'
}
