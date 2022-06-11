import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';
import { Router } from '@angular/router';
import { IRobotHealthMessage } from '../models/robot-health-message';

@Injectable({
  providedIn: 'root',
})
export class RobotHealthService implements ICrudService<IRobotHealthMessage> {

  public constructor(private readonly _httpClient: HttpClient, private readonly _router: Router, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public async navigate(robot: IRobotHealthMessage) {
    await this._router.navigate([ `/robots/${ robot.id }` ]);
  }

  public get$(odataQueryString: string | undefined = undefined): Observable<IRobotHealthMessage[]> {
    return this._httpClient.get<IRobotHealthMessage[]>(this._baseUrl + 'odata/robots/health' + (odataQueryString ?? ''));
  }

  public create$(robot: IRobotHealthMessage): Observable<IRobotHealthMessage> {
    return this._httpClient.post<IRobotHealthMessage>(this._baseUrl + 'odata/Robots',
      robot,
    );
  }

  public patch$(robot: IRobotHealthMessage): Observable<IRobotHealthMessage> {
    return this._httpClient.put<IRobotHealthMessage>(this._baseUrl + 'odata/robots/health/' + robot.id,
      robot,
    );
  }

  public delete$(robot: IRobotHealthMessage): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/robots/health/' + robot.id);
  }
}
