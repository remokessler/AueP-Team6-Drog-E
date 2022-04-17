import { RobotState } from '../models/robot-state';
import { IRobot } from '../models/robot';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  public constructor() {
  }

  public get(): Observable<IRobot[]> {
    return of([
      { id: 1, state: RobotState.Running, location: 'ZbW', name: 'Drog-E' } as IRobot
    ]);
  }

}
