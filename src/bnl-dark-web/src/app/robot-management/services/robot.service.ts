import { IRobot } from '../models/robot';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RobotService {

  public constructor(private readonly _httpClient: HttpClient, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public get(): Observable<IRobot[]> {
    return this._httpClient.get<IRobot[]>(this._baseUrl +'data/Robots');

    // return of([
    //   { id: 1, state: RobotState.Running, location: 'ZbW', name: 'Drog-E' } as IRobot
    // ]);
  }

}
