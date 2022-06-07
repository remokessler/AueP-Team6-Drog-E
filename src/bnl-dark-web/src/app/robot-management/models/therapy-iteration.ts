import { IUser } from '../../master-data-management/models/user';
import { IRobot } from './robot';
import { ITherapy } from '../../patient-management/models/therapy';
import { IStay } from '../../patient-management/models/stay';

export interface ITherapyIteration {
  id: number;
  user: IUser;
  robot: IRobot;
  therapy: ITherapy;
  stay: IStay;
  timeDone: Date;
}
