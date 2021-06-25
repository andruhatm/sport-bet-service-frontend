import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ExistingEvent } from '../models/existing-event.model';
import { PaginationRespModel } from '../../other-model/pagination.resp.model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private readonly http: HttpClient, private readonly title: Title) {
    title.setTitle('Лента');
  }

  getFiltered(params): Observable<PaginationRespModel> {
    return this.http.get<PaginationRespModel>(`${environment.api}/user/events/`, { params });
  }

  getEvent(id: string): Observable<ExistingEvent> {
    return this.http.get<ExistingEvent>(`${environment.api}/event/${id}`);
  }
}
