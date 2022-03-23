import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { 

  }
  getdata(){
    return this.http.get("http://65.108.218.104:3000/getcoingecko");
  }
  getdataeth(){
    return this.http.get("http://65.108.218.104:3000/getcoingeckoeth");
  }
  getdataxpr(){
    return this.http.get("http://65.108.218.104:3000/getcoingeckoxrp");
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
  getcoingecko(){
    return this.http.get("http://65.108.218.104:3000/getcoingecko");

  }
  getcoingeckoeth(){
    return this.http.get("http://65.108.218.104:3000/getcoingeckoeth");

  }
  getcoingeckoxrp(){
    return this.http.get("http://65.108.218.104:3000/getcoingeckoxrp");

  }
  getsevendaybtc(){
    return this.http.get("http://65.108.218.104:3000/getsevendaybtc");

  }
  getsevendayeth(){
    return this.http.get("http://65.108.218.104:3000/getsevendayeth");

  }
  getsevendayxrp(){
    return this.http.get("http://65.108.218.104:3000/getsevendayxrp");
  }
  getthirtydaybtc(){
    return this.http.get("http://65.108.218.104:3000/getthirtydaybtc");
  }
  getthirtydayeth(){
    return this.http.get("http://65.108.218.104:3000/getthirtydayeth");
  }
  getthirtydayxrp(){
    return this.http.get("http://65.108.218.104:3000/getthirtydayxrp");
  }
  getthreemonthdbtc(){
    return this.http.get("http://65.108.218.104:3000/getthreemonthdbtc");
  }
  getthreemonthdeth(){
    return this.http.get("http://65.108.218.104:3000/getthreemonthdeth");
  }
  getthreemonthdxrp(){
    return this.http.get("http://65.108.218.104:3000/getthreemonthdxrp");
  }
  getsixmonthdbtc(){
    return this.http.get("http://65.108.218.104:3000/getsixmonthdbtc");
  }
  getsixmonthdeth(){
    return this.http.get("http://65.108.218.104:3000/getsixmonthdeth");
  }
  getsixmonthdxrp(){
    return this.http.get("http://65.108.218.104:3000/getsixmonthdxrp");
  }
  
}
