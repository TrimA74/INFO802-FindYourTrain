import { Component, OnInit } from '@angular/core';

import { SoapService} from '../../services/soap.service';
@Component({
  selector: 'app-currency-convertor',
  templateUrl: './currency-convertor.component.html',
  styleUrls: ['./currency-convertor.component.css']
})
export class CurrencyConvertorComponent implements OnInit {

  private currencies: string[];
  private currencyFrom: string;
  private currencyTo: string;
  private amount: number;

  constructor(private soapService: SoapService) {
    this.getCurrencies();
  }

  getAmount () {
    this.soapService.getConvertedAmount(this.currencyFrom, this.currencyTo, this.amount).subscribe( data => {
      this.amount = data;
    });
  }

  getCurrencies () {
    this.soapService.getCurrenciesList().subscribe( data => {
      this.currencies = data;
    });
  }

  ngOnInit() {

  }

}
