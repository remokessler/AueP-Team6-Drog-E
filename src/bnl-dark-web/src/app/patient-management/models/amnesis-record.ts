import { IStay } from './stay';
import { ITherapy } from './therapy';

export interface IAmnesisRecord {
  id: number;
  stay: IStay;
  therapies: ITherapy[];
}
