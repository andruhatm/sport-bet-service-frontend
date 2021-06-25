import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CurrentUserImpl, CurrentUserService } from './core/auth/current-user.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class AuthGuards implements CanActivate {
  user: CurrentUserImpl;
  private route: ActivatedRouteSnapshot;
  private state: RouterStateSnapshot;
  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {
    this.currentUserService.user$.subscribe((value: CurrentUserImpl) => {
      this.user = value;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.route = route;
    this.state = state;
    if (this.user.email) {
      return true;
    } else {
      console.log("a");
    }
  }

}
