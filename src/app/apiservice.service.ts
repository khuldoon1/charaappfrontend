import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { 

  }
  getdata(){
    return this.http.get("http://65.108.218.104:3000/users");
  }
  getdataeth(){
    return this.http.get("http://65.108.218.104:3000/eth");
  }
  getdataxpr(){
    return this.http.get("http://65.108.218.104:3000/xpr");
  }
  getbtcnew(){
    return this.http.get("http://65.108.218.104:3000/btcnew");
  }
  getdataethnew(){
    return this.http.get("http://65.108.218.104:3000/ethnew");
  }
  getdataxprnew(){
    return this.http.get("http://65.108.218.104:3000/xprnew");
  }
  getfinancials(){
    return this.http.get("http://65.108.218.104:3000/financials");
  }
  getcrypto_meter(){
    return this.http.get("http://65.108.218.104:3000/crypto_meter");
  }
 
}
