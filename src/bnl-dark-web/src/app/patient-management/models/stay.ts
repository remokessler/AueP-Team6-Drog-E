import { IRoom } from '../../master-data-management/models/room';
import { IPatient } from './patient';

export interface IStay {
  id: number;
  enter: Date;
  leave: Date;
  reason: string;
  room: IRoom;
  roomId: number;
  patient: IPatient;
}
