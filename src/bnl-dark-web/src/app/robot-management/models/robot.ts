export interface IRobot {
  name: string;
  id: number;
  location: string;
  state: RobotState;
}

export enum RobotState {
  Stopped,
  Idle,
  Running
}
