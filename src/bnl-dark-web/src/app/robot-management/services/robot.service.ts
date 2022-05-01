import { IRobot } from '../models/robot';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RobotState } from '../models/robot';


@Injectable({
  providedIn: 'root'
})
export class RobotService {

  public constructor(private readonly _httpClient: HttpClient, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public get(odataQueryString: string | undefined = undefined): Observable<IRobot[]> {
    console.log(odataQueryString);
    if (odataQueryString) {
      return this._httpClient.get<IRobot[]>(this._baseUrl +'odata/Robots' + odataQueryString);
    }
    return this._httpClient.get<IRobot[]>(this._baseUrl +'odata/Robots');
  }

  public post(robot: IRobot): Observable<IRobot> {
    robot = {
      ...robot,
      location: 'New',
      state: RobotState.Idle
    }
    return this._httpClient.post<IRobot>(this._baseUrl +'odata/Robots',
      robot
    );
  }
}
