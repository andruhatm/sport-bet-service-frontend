import { Component, OnInit } from '@angular/core';
import { CurrentUserImpl, CurrentUserService } from '../../../../core/auth/current-user.service';
import { UserService } from '../../../../features/users/services/users.service';
import { Title } from '@angular/platform-browser';
import { Bet } from '../../../../features/events/models/bet';

export class Bets {
  name: string;
  winner: string;
  amount: number;
  currency: string;
  constructor(name: string, winner: string, amount: number, currency: string) {
    this.name = name;
    this.winner = winner;
    this.amount = amount;
    this.currency = currency;
  }
}

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'winner', 'amount', 'currency'];
  dataSource: Bet[] = [];
  user: CurrentUserImpl;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly title: Title
  ) {
    this.title.setTitle('Ваши ставки');
  }

  ngOnInit(): void {
    this.currentUserService.user$.subscribe((value: CurrentUserImpl) => {
      this.user = value;
    });
    console.log(this.user);
    this.userService.getUserBets(parseInt(this.user.id, 10)).subscribe((value) => {
      // const bets: Bet[] = value;
      // for (const bet in bets) {
      //   this.dataSource.push(new Bets(bet.event().name, bet.winner, bet.amount, bet.currency.name));
      // }
      this.dataSource = value;
    });
  }
}
