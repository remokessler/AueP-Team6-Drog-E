import { RobotState } from "./robot-state";

export interface IRobot {
  name: string;
  id: number;
  location: string;
  state: RobotState;
}
