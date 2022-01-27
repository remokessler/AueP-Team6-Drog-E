import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRobot } from './robot.type';
import { Observable } from 'rxjs';

@Injectable()
export class RobotService {
  public constructor(private httpClient: HttpClient) { }

  public getRobots(): Observable<IRobot[]> {
    return this.httpClient.get<IRobot[]>('/odata/robot');
  }
}
