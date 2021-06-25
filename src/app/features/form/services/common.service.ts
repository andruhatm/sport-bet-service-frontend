import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ExistingEvent } from '../../events/models/existing-event.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private readonly http: HttpClient) {}

  getEvents(): Observable<ExistingEvent[]> {
    return this.http.get<ExistingEvent[]>(`${environment.api}/event/`).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    );
  }
}
