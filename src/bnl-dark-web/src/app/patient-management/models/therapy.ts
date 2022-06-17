import { IMedicine } from '../../master-data-management/models/medicine';
import { IStay } from './stay';

export interface ITherapy {
  id: number;
  timesDone: number;
  totalTimesToBeHealed: number;
  medicineAmountPerIteration: number;
  medicine: IMedicine;
  medicineId: number;
  stay: IStay;
  stayId: number;
}
