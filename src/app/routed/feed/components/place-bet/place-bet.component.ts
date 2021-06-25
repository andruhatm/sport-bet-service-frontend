import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentUserImpl, CurrentUserService } from '../../../../core/auth/current-user.service';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../../../features/users/services/users.service';
import { ExistingEvent } from '../../../../features/events/models/existing-event.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Currency } from '../../../../features/events/models/currency';
import { Command } from '../../../../features/events/models/command';

interface FormData {
  money: number;
  command: string;
  currency: string;
}

@Component({
  selector: 'app-place-bet',
  templateUrl: './place-bet.component.html',
  styleUrls: ['./place-bet.component.sass']
})
export class PlaceBetComponent implements OnInit {
  form: FormGroup;
  selected: any;

  event: ExistingEvent;
  eventId: number;
  currency: Currency[] = [];
  commands: Command[] = [];
  user: CurrentUserImpl;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.title.setTitle('Новая ставка');
  }

  ngOnInit(): void {
    this.currentUserService.user$.subscribe((value: CurrentUserImpl) => {
      this.user = value;
    });
    console.log(this.user);
    this.route.params.subscribe((params: Params) => {
      this.eventId = params.id;
    });
    this.userService.getEventById(this.eventId).subscribe((value: ExistingEvent) => {
      this.event = value;
      this.commands.push(new Command(this.event.away));
      this.commands.push(new Command(this.event.home));
    });
    this.userService.getCurrencies().subscribe((value) => {
      this.currency = value;
    });

    this.form = this.initForm();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      moneyControl: this.fb.control('', Validators.pattern('^[0-9]*$')),
      commandControl: this.fb.control(''),
      currencyControl: this.fb.control('')
    });
  }

  handleFormSubmit(value): void {
    console.log(value);

    this.userService
      .makeBet(
        parseInt(value.moneyControl, 10),
        value.commandControl.name,
        String(this.eventId),
        value.currencyControl.id,
        this.user.id
      )
      .subscribe(
        () => {
          console.log('bet completed');
          this.router.navigate(['/feed']).then(() => window.location.reload());
        },
        () => {
          console.log('error');
        }
      );
  }
}
