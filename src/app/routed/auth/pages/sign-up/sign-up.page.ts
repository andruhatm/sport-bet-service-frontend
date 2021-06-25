import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../core/auth/current-user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Picture } from '../../../../features/events/models/picture';
import { UserService } from '../../../../features/users/services/users.service';

interface SignUpFormData {
  password: string;
  email: string;
  photo: string;
}
@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.sass']
})
export class SignUpPage implements OnInit {
  error = false;
  errorEmail = false;
  selectedFiles?: FileList;
  currentFile?: File;
  pic: Picture;
  errorUsername = false;
  errorMsg: string;
  form: FormGroup;
  color = '#f9bc64';
  emailPattern = '^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$';
  namePattern = '^[a-zA-ZA-Яa-я]{1,}';

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly title: Title
  ) {
    this.title.setTitle('Регистрация');
  }

  private initForm(): FormGroup {
    return this.fb.group({
      password: this.fb.control('', [Validators.required, this.noWhitespaceValidator, Validators.min(5)]),
      email: this.fb.control('', [
        Validators.required,
        this.noWhitespaceValidator,
        Validators.pattern(this.emailPattern)
      ]),
      photo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  handleFormSubmit(value: SignUpFormData): void {
    console.log(value);
    this.currentFile = this.selectedFiles.item(0);
    this.userService.uploadFile(this.currentFile).subscribe(
      (event: any) => {
        if (event.body != undefined) {
          console.log(value);
          this.error = false;
          this.currentUserService.createUser(value.password, value.email, event.body.id).subscribe(
            () => {
              this.currentUserService
                .login(value.email, value.password)
                // .pipe(switchMap(() => this.getUserService.refreshCurrentUser()))
                .subscribe(
                  (response: any) => {
                    localStorage.setItem('auth_token', response.token);
                    localStorage.setItem('user_id', response.id);
                    // this.token = response.token;
                    this.router.navigate(['/feed']).then(() => window.location.reload());
                  },
                  (error) => {
                    console.error('Error', error);
                    this.error = true;
                  }
                );
            },
            (error) => {
              console.log('error');
              console.log(error.debugMessage);
              if (error.error.message === 'username already in use') {
                this.errorUsername = true;
                console.log('this.errorUsername');
              }
              if (error.error.message === 'email already in use') {
                this.errorEmail = true;
                console.log('this.errorEmail');
              }
              this.error = true;
            }
          );
        }
        this.router.navigate(['login']);
      },
      (err: any) => {
        console.log(err);
        this.currentFile = undefined;
      }
    );
    this.selectedFiles = undefined;

    console.log(this.pic);
  }
  // =======

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
