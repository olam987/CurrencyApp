import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CurrencyData} from "../models/currency.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {}

  getCurrencyData(currency: string): Observable<CurrencyData>{
     return this.http.get<CurrencyData>("https://api.nbp.pl/api/exchangerates/rates/a/" + currency + "/?format=json");
  }
}
