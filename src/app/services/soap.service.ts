import { Injectable } from '@angular/core';
declare var require: any;
const XML = require('pixl-xml');
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class SoapService {

  //private ccUrl = 'https://c62a3b01.ngrok.io/TD1_war_exploded/services/Distance';
  private ccUrl = 'http://localhost:8080/TD1_war_exploded/services/Distance';

  constructor() { }

  private envelopeBuilder(currencyFrom: string, currencyTo: string, amount: number ): string {
    return '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">' +
      '   <soap:Header/>' +
      '   <soap:Body>' +
      '      <tem:GetConversionAmount>' +
      '         <tem:CurrencyFrom>' + currencyFrom + '</tem:CurrencyFrom>' +
      '         <tem:CurrencyTo>' + currencyTo + '</tem:CurrencyTo>' +
      '         <tem:RateDate>2018-01-19</tem:RateDate>' +
      '         <tem:Amount>' + amount + '</tem:Amount>' +
      '      </tem:GetConversionAmount>' +
      '   </soap:Body>' +
      '</soap:Envelope>';
  }

  private envelopeBuilderCurrenciesList(): string {
    return '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">' +
      '   <soap:Header/>' +
      '   <soap:Body>' +
      '      <tem:GetCurrencies/>' +
      '   </soap:Body>' +
      '</soap:Envelope>';
  }

  private envelopeBuilderPrice(latA: number, lonA: number, latB: number, lonB: number): string {
    return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:exam="http://example/">' +
      '   <soapenv:Header/>' +
      '   <soapenv:Body>' +
      '      <exam:price>' +
      '         <LatitudeA>' + latA + '</LatitudeA>' +
      '         <LongitudeA>' + lonA + '</LongitudeA>' +
      '         <LatitudeB>' + latB + '</LatitudeB>' +
      '         <LongitudeB>' + lonB + '</LongitudeB>' +
      '      </exam:price>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
  }

  private envelopeBuilderDistance(latA: number, lonA: number, latB: number, lonB: number): string {
    return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:exam="http://example/">' +
      '   <soapenv:Header/>' +
      '   <soapenv:Body>' +
      '      <exam:distance>' +
      '         <LatitudeA>' + latA + '</LatitudeA>' +
      '         <LongitudeA>' + lonA + '</LongitudeA>' +
      '         <LatitudeB>' + latB + '</LatitudeB>' +
      '         <LongitudeB>' + lonB + '</LongitudeB>' +
      '      </exam:distance>' +
      '   </soapenv:Body>' +
      '</soapenv:Envelope>';
  }

  public  getConvertedAmount(currencyFrom: string, currencyTo: string, amount: number ): Observable<number> {
    return Observable.fromPromise(new Promise( (resolve, reject) => {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://currencyconverter.kowabunga.net/converter.asmx', true);
      const vm = this;
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            let res = XML.parse( xmlhttp.response );
            res  = vm.precisionRound(res['soap:Body'].GetConversionAmountResponse.GetConversionAmountResult, 5);
            resolve(res);
            reject(res);
          }
        }
      }
      // Send the POST request
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
      xmlhttp.send(this.envelopeBuilder(currencyFrom, currencyTo, amount));
      // send request
      // ...
    }));

  }

  public  getPrice(latA: number, lonA: number, latB: number, lonB: number): Observable<number> {
    return Observable.fromPromise(new Promise( (resolve, reject) => {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', this.ccUrl, true);
      const vm = this;
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            const res = XML.parse( xmlhttp.response )['S:Body']['ns2:priceResponse'].return;
            resolve(res);
            reject(res);
          }
        }
      }
      // Send the POST request
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(this.envelopeBuilderPrice(latA, lonA, latB, lonB));
      // send request
      // ...
    }));

  }

  public  getDistance(latA: number, lonA: number, latB: number, lonB: number): Observable<number> {
    return Observable.fromPromise(new Promise( (resolve, reject) => {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', this.ccUrl, true);
      const vm = this;
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            const res = XML.parse( xmlhttp.response )['S:Body']['ns2:distanceResponse'].return;
            resolve(res);
            reject(res);
          }
        }
      }
      // Send the POST request
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(this.envelopeBuilderDistance(latA, lonA, latB, lonB));
      // send request
      // ...
    }));

  }

  public getCurrenciesList(): Observable<string[]> {
    return Observable.fromPromise(new Promise( (resolve, reject) => {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://currencyconverter.kowabunga.net/converter.asmx', true);
      const vm = this;
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            const res = XML.parse( xmlhttp.response )['soap:Body'].GetCurrenciesResponse.GetCurrenciesResult.string;
            resolve(res);
            reject(res);
          }
        }
      }
      // Send the POST request
      xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
      xmlhttp.send(this.envelopeBuilderCurrenciesList());
      // send request
      // ...
    }));
  }
  precisionRound (number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

}
