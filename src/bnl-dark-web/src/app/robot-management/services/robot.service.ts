import { IRobot } from '../models/robot';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';
import { IPatient } from '../../patient-management/models/patient';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class RobotService implements ICrudService<IRobot> {

  public constructor(private readonly _httpClient: HttpClient, private readonly _router: Router, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public async navigate(robot: IRobot) {
    await this._router.navigate([ `/robots/${ robot.id }` ]);
  }

  public get$(odataQueryString: string | undefined = undefined): Observable<IRobot[]> {
    return this._httpClient.get<IRobot[]>(this._baseUrl + 'odata/Robots' + (odataQueryString ?? ''));
  }

  public getDetail$(id: number): Observable<IRobot> {
    return this._httpClient.get<IRobot>(`${ this._baseUrl }odata/Robots/${ id }`);
  }

  public create$(robot: IRobot): Observable<IRobot> {
    return this._httpClient.post<IRobot>(this._baseUrl + 'odata/Robots',
      robot,
    );
  }

  public patch$(robot: IRobot): Observable<IRobot> {
    return this._httpClient.put<IRobot>(this._baseUrl + 'odata/Robots/' + robot.id,
      robot,
    );
  }

  public delete$(robot: IRobot): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/Robots/' + robot.id);
  }
}
