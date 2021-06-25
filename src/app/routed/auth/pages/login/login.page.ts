import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../core/auth/current-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RefreshUserService } from '../../../../core/auth/refresh-user.service';
import { UserMenuComponent } from '../../../../features/current-user/user-menu/user-menu.component';
import { Title } from '@angular/platform-browser';
import { LoginFormData } from '../../../../features/form/login.form.model';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass']
})
export class LoginPage implements OnInit {
  error = false;
  color: '#f9bc64';

  content: string | undefined;
  url: string | undefined;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly getUserService: RefreshUserService,
    private readonly title: Title,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {
    this.title.setTitle('Вход');
  }

  ngOnInit(): void {
  }

  handleFormSubmit(value: LoginFormData): void {
    console.log(value);
    this.error = false;
    this.currentUserService
      .login(value.email, value.password)
      // .pipe(switchMap(() => this.getUserService.refreshCurrentUser()))
      .subscribe(
        (response: any) => {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_id', response.id);
          // this.token = response.token;
          console.log(response);
          this.router.navigate(['/feed']).then(() => window.location.reload());
        },
        (error) => {
          console.error('Error', error);
          this.error = true;
        }
      );
    // switchMap(() => this.getUserService.refreshCurrentUser());
  }
}
