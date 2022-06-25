import { IRobot } from './robot';
import { ITherapyIteration } from './therapy-iteration';

export interface ITimeTableEntry {
  id: number;
  robotId: number;
  robot: IRobot;
  startTime: Date;
  therapyIterations: ITherapyIteration[];
}
