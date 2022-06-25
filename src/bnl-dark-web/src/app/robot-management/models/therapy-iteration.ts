import { ITherapy } from '../../patient-management/models/therapy';
import { ITimeTableEntry } from './time-table-entry';

export interface ITherapyIteration {
  id: number;
  therapy: ITherapy;
  therapyId: number;
  timeTableEntry: ITimeTableEntry;
  timeTableEntryId: number;
  timeDone: Date;
}
