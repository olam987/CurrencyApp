import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "./services/currency.service";
import {CurrencyData} from "./models/currency.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription = new Subscription;

  constructor(private currencyServices: CurrencyService) {}

  finalValue?: string;

  currencyDataFrom!: CurrencyData;
  currencyDataTo!: CurrencyData;

  currencyTypeFrom = 'USD';
  currencyTypeTo = 'THB';

  ngOnInit(): void {
    this.getCurrencyDataFrom();
    this.getCurrencyDataTo();
  }

  getCurrencyDataTo() {
    this.subscription.add(this.currencyServices.getCurrencyData(this.currencyTypeTo)
      .subscribe(currencyTo => {
          this.currencyDataTo = currencyTo;
          console.log(currencyTo);
        }
      ));
  }

  getCurrencyDataFrom() {
    this.subscription.add(this.currencyServices.getCurrencyData(this.currencyTypeFrom)
      .subscribe(currencyFrom => {
          this.currencyDataFrom = currencyFrom;
          console.log(currencyFrom);
        }
      ));
  }

  onSubmit(form: NgForm) {
    const amountFrom = +form?.controls?.['amountMoney']?.value;
    const amountTo = amountFrom * this.currencyDataFrom.rates[0].mid / this.currencyDataTo.rates[0].mid;
    this.finalValue = amountFrom + " " + this.currencyTypeFrom + " = " + amountTo.toFixed(2) + " " + this.currencyTypeTo;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
