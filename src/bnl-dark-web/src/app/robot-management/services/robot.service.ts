import { IRobot, RobotState } from '../models/robot';
import { Observable, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RobotService {

  public constructor(private readonly _httpClient: HttpClient, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public get(odataQueryString: string | undefined = undefined): Observable<IRobot[]> {
      return this._httpClient.get<IRobot[]>(this._baseUrl + 'odata/Robots' + (odataQueryString ?? ''));
  }

  public post(robot: IRobot): Observable<IRobot> {
    robot = {
      ...robot,
      location: 'New',
      state: RobotState.Idle
    }
    return this._httpClient.post<IRobot>(this._baseUrl + 'odata/Robots',
      robot
    );
  }
}
