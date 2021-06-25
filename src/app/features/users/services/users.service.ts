import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ExistingUser } from '../models/existing-user.model';
import { AnotherUser } from '../models/another-user.model';
import { LoginFormData } from '../../form/login.form.model';
import { CurrentUserService } from '../../../core/auth/current-user.service';
import { Router } from '@angular/router';
import { ExistingEvent } from '../../events/models/existing-event.model';
import { Currency } from '../../events/models/currency';
import { Bet } from '../../events/models/bet';
import { Picture } from '../../events/models/picture';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly currentUserService: CurrentUserService
  ) {}

  login(value: LoginFormData): void {
    console.log(value);
    this.currentUserService.login(value.email, value.password).subscribe(
      (response: any) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_id', response.id);
        // this.token = response.token;
        console.log(response);
        this.router.navigate(['/feed']).then(() => window.location.reload());
      },
      (error) => {
        console.error('Error', error);
      }
    );
    // switchMap(() => this.getUserService.refreshCurrentUser());
  }

  getUserById(id: number): Observable<ExistingUser> {
    return this.http.get<ExistingUser>(`${environment.api}/user/${id}`);
  }

  getEventById(id: number): Observable<ExistingEvent> {
    return this.http.get<ExistingEvent>(`${environment.api}/bets/${id}/`);
  }

  getUserBets(id: number): Observable<Bet[]> {
    return this.http.get<Bet[]>(`${environment.api}/user/${id}/bets`);
  }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${environment.api}/bets/currency/`);
  }

  getAnotherUserById(id: number): Observable<AnotherUser> {
    return this.http.get<AnotherUser>(`${environment.api}/user/${id}`);
  }

  makeBet(amount: number, winner: string, eventId: string, currencyId: string, userId: string): Observable<void> {
    const event: object = {
      id: eventId
    };
    const currency: object = {
      id: currencyId
    };
    const user: object = {
      id: userId
    };
    const betDto = {
      amount,
      winner,
      event,
      currency,
      user
    };
    console.log(betDto);
    return this.http.post<void>(`${environment.api}/bets/`, betDto).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    );
  }

  uploadFile(file: File): Observable<HttpEvent<Picture>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    console.log('file' + file);

    const req = new HttpRequest('POST', `${environment.api}/picture/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
