import { IRoom } from 'src/app/master-data-management/models/room';
import { ITherapyIteration } from './therapy-iteration';

export interface IRobotHealthMessage {
  id: number;
  roomId: number;
  room: IRoom;
  therapyIterationId: number;
  therapyIteration: ITherapyIteration;
  skipped: boolean;
  robotState: RobotState;
  received: Date;
}

enum RobotState {
  Unknown,
  Stopped,
  Idle,
  Running
}
