import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { 

  }
  getdata1(){
    return this.http.get("http://65.108.218.104:3000/users");
  }
  getdataeth1(){
    return this.http.get("http://65.108.218.104:3000/eth");
  }
  getdataxpr1(){
    return this.http.get("http://65.108.218.104:3000/xpr");
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
  gettop_performer(){
    return this.http.get("http://65.108.218.104:3000/top_performer");
  }
  gettop_performersevenday(){
    return this.http.get("http://65.108.218.104:3000/top_performersevenday");
  }
  gettop_performerthirty(){
    return this.http.get("http://65.108.218.104:3000/top_performeerthirty");
  }
  gettop_performerthreemonth(){
    return this.http.get("http://65.108.218.104:3000/top_performeerthreemonth");
  }
  gettop_performersixmonths(){
    return this.http.get("http://65.108.218.104:3000/top_performeersixmonth");
  }
  


  getbest_market_tracker(){
    return this.http.get("http://65.108.218.104:3000/best_market_tracker");
  }
  getbest_market_trackersevenday(){
    return this.http.get("http://65.108.218.104:3000/best_market_trackersevenday");
  }
  getbest_market_trackerthirty(){
    return this.http.get("http://65.108.218.104:3000/best_market_trackerthirty");
  }
  getbest_market_trackerthreemonth(){
    return this.http.get("http://65.108.218.104:3000/best_market_trackerthreemonth");
  }
  getbest_market_trackersixmonths(){
    return this.http.get("http://65.108.218.104:3000/best_market_trackersixmonth");
  }




  gettotal_market_cap_cg(){
    return this.http.get("http://65.108.218.104:3000/total_market_cap_cg");
  }
  gettotal_market_cap_cgsevenday(){
    return this.http.get("http://65.108.218.104:3000/total_market_cap_cgsevenday");
  }
  gettotal_market_cap_cgthirty(){
    return this.http.get("http://65.108.218.104:3000/total_market_cap_cgthirty");
  }
  gettotal_market_cap_cgthreemonth(){
    return this.http.get("http://65.108.218.104:3000/total_market_cap_cgthreemonth");
  }
  gettotal_market_cap_cgsixmonths(){
    return this.http.get("http://65.108.218.104:3000/total_market_cap_cgsixmonth");
  }




  getreal_market_cap_cg(){
    return this.http.get("http://65.108.218.104:3000/real_market_cap_cg");
  }
  getreal_market_cap_cgsevenday(){
    return this.http.get("http://65.108.218.104:3000/real_market_cap_cgsevenday");
  }
  getreal_market_cap_cgthirty(){
    return this.http.get("http://65.108.218.104:3000/real_market_cap_cgthirty");
  }
  getreal_market_cap_cgthreemonth(){
    return this.http.get("http://65.108.218.104:3000/real_market_cap_cgthreemonth");
  }
  getreal_market_cap_cgsixmonths(){
    return this.http.get("http://65.108.218.104:3000/real_market_cap_cgsixmonth");
  }
}
