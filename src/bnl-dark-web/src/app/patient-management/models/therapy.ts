import { IMedicine } from '../../master-data-management/models/medicine';

export interface ITherapy {
  id: number;
  timesDone: number;
  totalTimesToBeHealed: number;
  medicineAmountPerIteration: number;
  medicine: IMedicine;
}
