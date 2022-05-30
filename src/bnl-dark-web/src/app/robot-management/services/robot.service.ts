import { IRobot } from '../models/robot';
import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';


@Injectable({
  providedIn: 'root',
})
export class RobotService implements ICrudService<IRobot> {

  public constructor(private readonly _httpClient: HttpClient, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public navigate$(robot: IRobot) {
    return of<void>();
  }

  public get$(odataQueryString: string | undefined = undefined): Observable<IRobot[]> {
    return this._httpClient.get<IRobot[]>(this._baseUrl + 'odata/Robots' + (odataQueryString ?? ''));
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
