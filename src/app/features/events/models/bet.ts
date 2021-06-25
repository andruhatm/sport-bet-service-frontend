import { ExistingEvent } from './existing-event.model';
import { Currency } from './currency';

export class Bet {
  amount: number;
  winner: string;
  event: ExistingEvent;
  currency: Currency;

  constructor(amount: number, winner: string, event: ExistingEvent, currency: Currency) {
    this.amount = amount;
    this.winner = winner;
    this.event = event;
    this.currency = currency;
  }


}
