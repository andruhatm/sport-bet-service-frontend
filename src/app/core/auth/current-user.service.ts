import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Role } from './role.model';
import { Anonymous, CurrentUser, LoggedUser } from './current-user.model';
import { ExistingUser } from '../../features/users/models/existing-user.model';

export class AnonymousUserImpl implements Anonymous {
  readonly authenticated: false = false;

  // @ts-ignore
  hasRole(role: Role): boolean {
    return false;
  }
}

export class CurrentUserImpl implements LoggedUser {
  readonly pictureId = this.profile.pictureId;
  readonly picture = this.profile.picture;
  readonly active = this.profile.active;
  readonly balance = this.profile.balance;
  readonly authenticated: true = true;
  readonly id = this.profile.id;
  readonly username = this.profile.username;
  readonly email = this.profile.email;
  readonly firstName = this.profile.firstName;
  readonly lastName = this.profile.lastName;
  readonly medias = this.profile.medias;
  readonly prem = this.profile.prem;
  readonly lastPremDate = this.profile.lastDatePrem;

  public roles: Set<Role> = new Set(this.profile.roles);

  constructor(readonly profile: ExistingUser) {}

  hasRole(role: Role): boolean {
    return this.roles.has(role);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  readonly user$ = new BehaviorSubject<CurrentUser>(new AnonymousUserImpl());
  private http: HttpClient;

  constructor(private httpClient: HttpBackend, private router: Router) {
    this.http = new HttpClient(httpClient);
    console.log('Current User created');
  }

  login(username: string, password: string): Observable<void> {
    const data = {
      username,
      password
    };
    return this.http.post<void>(`${environment.api}/security/login`, data);
  }

  logout(): Observable<void> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    // this.user$.next(undefined);

    return this.http
      .post<void>(`${environment.api}/security/logout`, undefined)
      .pipe(tap(() => this.user$.next(new AnonymousUserImpl())));
  }

  createUser(password: string, email: string, media: any): Observable<void> {
    const data = {
      password,
      username: email,
      pictureId: media
    };
    return this.http.post<void>(`${environment.api}/security/`, data).pipe(
      catchError((err) => {
        console.log('error caught in service');
        return throwError(err);
      })
    );
  }

  setUser(profile: ExistingUser | undefined): void {
    if (profile == undefined) {
      this.user$.next(new AnonymousUserImpl());
    } else {
      this.user$.next(new CurrentUserImpl(profile));
    }
  }
}
