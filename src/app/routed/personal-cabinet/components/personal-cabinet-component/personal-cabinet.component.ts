import { AfterViewChecked, AfterViewInit, Component, DoCheck, forwardRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserImpl, CurrentUserService } from '../../../../core/auth/current-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-personal-cabinet-user',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.css']
})
export class PersonalCabinetComponent implements OnInit, DoCheck {
  user: CurrentUserImpl;
  formPersonalCabinet: FormGroup;
  categoryIs = false;

  constructor(
    private http: HttpClient,
    private readonly fb: FormBuilder,
    private readonly currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.currentUserService.user$.subscribe((value: CurrentUserImpl) => {
      this.user = value;
      console.log('value for user set');
    });

    console.log(this.user);

    this.formPersonalCabinet = this.initForm();
  }

  ngDoCheck(): void {}

  getImg(): string {
    return 'data:image/png;base64,' + this.user.picture.data;
  }

  private initForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control(this.user.username),
      balance: this.fb.control(this.user.balance),
      email: this.fb.control(this.user.email)
    });
  }
}
