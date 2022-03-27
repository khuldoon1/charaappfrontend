import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { createChart } from 'lightweight-charts';
import * as moment from 'moment';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-multicahrt',
  templateUrl: './multicahrt.component.html',
  styleUrls: ['./multicahrt.component.css']
})
export class MulticahrtComponent implements AfterViewInit {
  @ViewChild('chartdiv', {static: false}) chartdiv: any ;
  // @ViewChild('chartdiv', {static: false}) chartdiv: any ;
  // @ViewChild('chartdiv', {static: false}) chartdiv: any ;
  @ViewChild('height', {static: false}) height: any ;
  @ViewChild('toolTip', {static: false}) toolTip: any ;
  @ViewChild('toolTip0', {static: false}) toolTip0: any ;
  @ViewChild('toolTip1', {static: false}) toolTip1: any ;
  @ViewChild('toolTip2', {static: false}) toolTip2: any ;
  @ViewChild('toolTip3', {static: false}) toolTip3: any ;
  title = 'charproject';
  onemin=false;
  sevenday=true;
  thirtyday=false;
  threemonthdata=false;
  sixmonthdata=false;
   chart :any;
    lineSeries :any; 
    topperformer:any;
    best_market_tracker:any;
    total_market_cap_cg:any;
    real_market_cap_cg:any;
    lineSeriesxpr:any;
    btc=0;
    eth=0;
    xrp=0;
    timeinterval=60000;
    loading=true;
    toolTipWidth :any;
    toolTipHeight :any;
    toolTipMargin :any;
    // toolTip:any;

  constructor(private api:ApiserviceService){
  }
  @HostListener('window:resize')
onResize() {
 this.height.nativeElement.height=window.innerHeight
}

  ngAfterViewInit(): void {

    this.chart= createChart(this.chartdiv.nativeElement,{timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },});
 
    this.lineSeries=this.chart.addAreaSeries({
      topColor: 'rgba(250, 177, 131, 0.8)',
      bottomColor: 'rgba(250, 177, 131, 0)',
      lineColor: 'rgba(250, 177, 131, 1)',
      lineWidth: 2,
     
    });
    this.topperformer=this.chart.addAreaSeries({
      topColor: 'rgba(131, 84, 0, 0.8)',
      bottomColor: 'rgba(131, 84, 0, 0)',
      lineColor: 'rgba(255, 195, 69, 1)',
      lineWidth: 2,
     
    });
    this.best_market_tracker=this.chart.addAreaSeries({
      topColor: 'rgba(255, 195, 69, 0.8)',
      bottomColor: 'rgba(255, 195, 69, 0)',
      lineColor: 'rgba(255, 195, 69, 1)',
      lineWidth: 2,
     
    });
    this.total_market_cap_cg=this.chart.addAreaSeries({
      topColor: 'rgba(0, 120, 12, 0.8)',
      bottomColor: 'rgba(0, 120, 12, 0)',
      lineColor: 'rgba(0, 120, 12, 1)',
      lineWidth: 2,
     
    });
    this.real_market_cap_cg=this.chart.addAreaSeries({
      topColor: 'rgba(255, 127, 159, 0.8)',
      bottomColor: 'rgba(255, 127, 159, 0)',
      lineColor: 'rgba(255, 127, 159, 1)',
      lineWidth: 2,
     
    });
    // this.lineSeriesxpr=this.chart.addAreaSeries({
    //   topColor: 'rgba(0, 32, 135, 0.8)',
    //   bottomColor: 'rgba(0, 32, 135, 0.5)',
    //   lineColor: 'rgba(0, 32, 135, 1)',
    //   lineWidth: 2,
     
    // });
    this.gettingdata();
    this.gettingdataperformance();
    this.getbestmarkettracker();
    this.gettotalmarketcapcg();
    this.realmarketcapcg();
 
    // this.gettingdataeth();
    // this.gettingdataxpr();
    this.toolTipWidth = 10;
    this.toolTipHeight = 10;
    this.toolTipMargin = 25;
   setTimeout(() => {
   this.loading=true;
      this.update();
   }, 120000);

 

// update tooltip
this.chart.subscribeCrosshairMove((param:any) => {

if(this.loading==true){

}else{
  if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > this.chartdiv.nativeElement.clientWidth || param.point.y < 0 || param.point.y > this.chartdiv.nativeElement.clientHeight) {
    this.toolTip.nativeElement.style.display = 'none';
  } else {
  
    this.toolTip.nativeElement.style.display = 'block';
    let price = param.seriesPrices.get(this.lineSeries);
let date;
 if(this.onemin==true||this.sixmonthdata==true||this.threemonthdata==true){
   date=param.time.year+"/"+param.time.month+"/"+param.time.day
 }
 else{
  date= moment(param.time* 1000).format('DD/MM/YYYY,h:mm:ss a');
 }

  
 
    this.toolTip.nativeElement.innerHTML = '<div style="color: rgba(250, 177, 131, 1)">BTC</div><div style="font-size: 16px; color: #21384d">' + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">' +date+ '</div>';
    let coordinate = this.lineSeries.priceToCoordinate(price);
    let shiftedCoordinate = param.point.x - 50;
    if (coordinate === null) {
      return;
    }
    shiftedCoordinate = Math.max(0, Math.min(this.chartdiv.nativeElement.clientWidth - this.toolTipWidth, shiftedCoordinate));
    let coordinateY = coordinate - this.toolTipHeight - this.toolTipMargin > 0 ? coordinate - this.toolTipHeight - this.toolTipMargin : Math.max(0, Math.min(this.chartdiv.nativeElement.clientHeight - this.toolTipHeight - this.toolTipMargin, coordinate + this.toolTipMargin));
    this.toolTip.nativeElement.style.left = shiftedCoordinate + 'px';
    this.toolTip.nativeElement.style.top = coordinateY-80 + 'px';
  }
}

});
this.chart.subscribeCrosshairMove((param:any) => {
if(this.loading==true){

}else{
  
  if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > this.chartdiv.nativeElement.clientWidth || param.point.y < 0 || param.point.y > this.chartdiv.nativeElement.clientHeight) {
    this.toolTip0.nativeElement.style.display = 'none';
  } else {
    // const dateStr = businessDayToString(param.time);
    this.toolTip0.nativeElement.style.display = 'block';
    let price = param.seriesPrices.get(this.topperformer);
    let date;

    if(this.onemin==true||this.sixmonthdata==true||this.threemonthdata==true){
      date=param.time.year+"/"+param.time.month+"/"+param.time.day
    }
    else{
     date= moment(param.time* 1000).format('DD/MM/YYYY,h:mm:ss a');
    }
   
    // let time = param.seriesPrices.get(this.lineSeries);
    // console.log("price",price)
    this.toolTip0.nativeElement.innerHTML = '<div style="color: rgba(131, 84, 0, 1)">Top Performer</div><div style="font-size: 16px; color: #21384d">' + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">' +date+  '</div>';
    let coordinate = this.topperformer.priceToCoordinate(price);
    let shiftedCoordinate = param.point.x - 50;
    if (coordinate === null) {
      return;
    }
    shiftedCoordinate = Math.max(0, Math.min(this.chartdiv.nativeElement.clientWidth - this.toolTipWidth, shiftedCoordinate));
    let coordinateY = coordinate - this.toolTipHeight - this.toolTipMargin > 0 ? coordinate - this.toolTipHeight - this.toolTipMargin : Math.max(0, Math.min(this.chartdiv.nativeElement.clientHeight - this.toolTipHeight - this.toolTipMargin, coordinate + this.toolTipMargin));
    this.toolTip0.nativeElement.style.left = shiftedCoordinate+120 + 'px';
    this.toolTip0.nativeElement.style.top = coordinateY-80 + 'px' ;
  }
}

});
this.chart.subscribeCrosshairMove((param:any) => {
  if(this.loading==true){
  
  }else{
    
    if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > this.chartdiv.nativeElement.clientWidth || param.point.y < 0 || param.point.y > this.chartdiv.nativeElement.clientHeight) {
      this.toolTip1.nativeElement.style.display = 'none';
    } else {
      // const dateStr = businessDayToString(param.time);
      this.toolTip1.nativeElement.style.display = 'block';
      let price = param.seriesPrices.get(this.best_market_tracker);
      let date;
  
      if(this.onemin==true||this.sixmonthdata==true||this.threemonthdata==true){
        date=param.time.year+"/"+param.time.month+"/"+param.time.day
      }
      else{
       date= moment(param.time* 1000).format('DD/MM/YYYY,h:mm:ss a');
      }
     
      // let time = param.seriesPrices.get(this.lineSeries);
      // console.log("price",price)
      this.toolTip1.nativeElement.innerHTML = '<div style="color: rgba(131, 84, 0, 1)">Best Market</div><div style="font-size: 16px; color: #21384d">' + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">' +date+  '</div>';
      let coordinate = this.best_market_tracker.priceToCoordinate(price);
      let shiftedCoordinate = param.point.x - 50;
      if (coordinate === null) {
        return;
      }
      shiftedCoordinate = Math.max(0, Math.min(this.chartdiv.nativeElement.clientWidth - this.toolTipWidth, shiftedCoordinate));
      let coordinateY = coordinate - this.toolTipHeight - this.toolTipMargin > 0 ? coordinate - this.toolTipHeight - this.toolTipMargin : Math.max(0, Math.min(this.chartdiv.nativeElement.clientHeight - this.toolTipHeight - this.toolTipMargin, coordinate + this.toolTipMargin));
      this.toolTip1.nativeElement.style.left = shiftedCoordinate-120 + 'px';
      this.toolTip1.nativeElement.style.top = coordinateY-10 + 'px' ;
    }
  }
  
  });
  this.chart.subscribeCrosshairMove((param:any) => {
    if(this.loading==true){
    
    }else{
      
      if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > this.chartdiv.nativeElement.clientWidth || param.point.y < 0 || param.point.y > this.chartdiv.nativeElement.clientHeight) {
        this.toolTip2.nativeElement.style.display = 'none';
      } else {
        // const dateStr = businessDayToString(param.time);
        this.toolTip2.nativeElement.style.display = 'block';
        let price = param.seriesPrices.get(this.total_market_cap_cg);
        let date;
    
        if(this.onemin==true||this.sixmonthdata==true||this.threemonthdata==true){
          date=param.time.year+"/"+param.time.month+"/"+param.time.day
        }
        else{
         date= moment(param.time* 1000).format('DD/MM/YYYY,h:mm:ss a');
        }
       
        // let time = param.seriesPrices.get(this.lineSeries);
        // console.log("price",price)
        this.toolTip2.nativeElement.innerHTML = '<div style="color: rgba(131, 84, 0, 1)">Market Cap</div><div style="font-size: 16px; color: #21384d">' + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">' +date+  '</div>';
        let coordinate = this.total_market_cap_cg.priceToCoordinate(price);
        let shiftedCoordinate = param.point.x - 50;
        if (coordinate === null) {
          return;
        }
        shiftedCoordinate = Math.max(0, Math.min(this.chartdiv.nativeElement.clientWidth - this.toolTipWidth, shiftedCoordinate));
        let coordinateY = coordinate - this.toolTipHeight - this.toolTipMargin > 0 ? coordinate - this.toolTipHeight - this.toolTipMargin : Math.max(0, Math.min(this.chartdiv.nativeElement.clientHeight - this.toolTipHeight - this.toolTipMargin, coordinate + this.toolTipMargin));
        this.toolTip2.nativeElement.style.left = shiftedCoordinate+120 + 'px';
        this.toolTip2.nativeElement.style.top = coordinateY + 'px' ;
      }
    }
    
    });
    this.chart.subscribeCrosshairMove((param:any) => {
      if(this.loading==true){
      
      }else{
        
        if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > this.chartdiv.nativeElement.clientWidth || param.point.y < 0 || param.point.y > this.chartdiv.nativeElement.clientHeight) {
          this.toolTip3.nativeElement.style.display = 'none';
        } else {
          // const dateStr = businessDayToString(param.time);
          this.toolTip3.nativeElement.style.display = 'block';
          let price = param.seriesPrices.get(this.real_market_cap_cg);
          let date;
      
          if(this.onemin==true||this.sixmonthdata==true||this.threemonthdata==true){
            date=param.time.year+"/"+param.time.month+"/"+param.time.day
          }
          else{
           date= moment(param.time* 1000).format('DD/MM/YYYY,h:mm:ss a');
          }
         
          // let time = param.seriesPrices.get(this.lineSeries);
          // console.log("price",price)
          this.toolTip3.nativeElement.innerHTML = '<div style="color: rgba(131, 84, 0, 1)">Real Market Cap</div><div style="font-size: 16px; color: #21384d">' + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">' +date+  '</div>';
          let coordinate = this.real_market_cap_cg.priceToCoordinate(price);
          let shiftedCoordinate = param.point.x - 50;
          if (coordinate === null) {
            return;
          }
          shiftedCoordinate = Math.max(0, Math.min(this.chartdiv.nativeElement.clientWidth - this.toolTipWidth, shiftedCoordinate));
          let coordinateY = coordinate - this.toolTipHeight - this.toolTipMargin > 0 ? coordinate - this.toolTipHeight - this.toolTipMargin : Math.max(0, Math.min(this.chartdiv.nativeElement.clientHeight - this.toolTipHeight - this.toolTipMargin, coordinate + this.toolTipMargin));
          this.toolTip3.nativeElement.style.left = shiftedCoordinate-120 + 'px';
          this.toolTip3.nativeElement.style.top = coordinateY + 'px' ;
        }
      }
      
      });
  


  }
  gettingdata(){
    this.loading=true;
    if(this.sevenday==true){
      this.api.getsevendaybtc().subscribe((data:any)=>{
       console.log(data);
        data.forEach((data1:any,i:any) => {
         console.log(data1);
          if(data1.open_time==null || data1.close==null){
  
          }
          else{
            this.lineSeries.update({ time:Math.floor(new Date(data1.open_time).getTime() / 1000) , value: data1.close })
            this.btc= data1.close; 
          
          } 
        });
        this.loading=false;
           });

    }else if(this.onemin==true){
      this.api.getdata().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
          if(data1.date==null || data1.price==null){
  
          }
          else{
            this.lineSeries.update({ time:data1.date  , value: data1.price })
            this.btc= data1.price; 
          
          } 
        });
        this.loading=false;
           });
    }else if(this.thirtyday==true){
      this.api.getthirtydaybtc().subscribe((data:any)=>{
       
        data.forEach((data1:any,i:any) => {
         
          if(data1.open_time==null || data1.close==null){
  
          }
          else{
            this.lineSeries.update({ time:Math.floor(new Date(data1.open_time).getTime() / 1000) , value: data1.close })
            this.btc= data1.close; 
          
          } 
        });
        this.loading=false;
           });
    }else if(this.threemonthdata==true){
      this.api.getthreemonthdbtc().subscribe((data:any)=>{
       
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.price==null){
  
          }
          else{
            this.lineSeries.update({ time:data1.date  , value: data1.price })
            this.btc= data1.price; 
          
          } 
        });
        this.loading=false;
           });
    }else if(this.sixmonthdata==true){
      this.api.getsixmonthdbtc().subscribe((data:any)=>{
       
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.price==null){
  
          }
          else{
            this.lineSeries.update({ time:data1.date , value: data1.price })
            this.btc= data1.price; 
          
          } 
        });
        this.loading=false;
           });
    }

  }

  gettingdataperformance(){
    this.loading=true;
    if(this.sevenday==true){
      this.api.gettop_performersevenday().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
       
            this.topperformer.update({ time:Math.floor(new Date(data1.date).getTime() / 1000) , value: data1.cum })
          
          
          } 
        });
     
        this.loading=false;
           });

    }else if(this.onemin==true){
      this.api.gettop_performer().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.topperformer.update({ time:data1.date  , value: data1.cum })
            // this.eth= data1.cum; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.thirtyday==true){
      this.api.gettop_performerthirty().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            console.log(data1)
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.topperformer.update({ time:Math.floor(new Date(data1.date).getTime() / 1000) , value: data1.cum })
          
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.threemonthdata==true){
      this.api.gettop_performerthreemonth().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.topperformer.update({ time:data1.date  , value: data1.cum })
            // this.eth= data1.cum; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.sixmonthdata==true){
      this.api.gettop_performersixmonths().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.topperformer.update({ time:data1.date  , value: data1.cum })
          
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }
   
  }
  getbestmarkettracker(){
    this.loading=true;
    if(this.sevenday==true){
      this.api.getbest_market_trackersevenday().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
       
            this.best_market_tracker.update({ time:Math.floor(new Date(data1.date).getTime() / 1000) , value: data1.cum })
          
          
          } 
        });
     
        this.loading=false;
           });

    }else if(this.onemin==true){
      this.api.getbest_market_tracker().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.best_market_tracker.update({ time:data1.date  , value: data1.cum })
            // this.eth= data1.cum; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.thirtyday==true){
      this.api.getbest_market_trackerthirty().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            console.log(data1)
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.best_market_tracker.update({ time:Math.floor(new Date(data1.date).getTime() / 1000) , value: data1.cum })
          
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.threemonthdata==true){
      this.api.getbest_market_trackerthreemonth().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.best_market_tracker.update({ time:data1.date  , value: data1.cum })
            // this.eth= data1.cum; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.sixmonthdata==true){
      this.api.getbest_market_trackersixmonths().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.best_market_tracker.update({ time:data1.date  , value: data1.cum })
          
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }
   
  }
  gettotalmarketcapcg(){
    this.loading=true;
    if(this.sevenday==true){
      this.api.gettotal_market_cap_cgsevenday().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
       
            this.total_market_cap_cg.update({ time:Math.floor(new Date(data1.date).getTime() / 1000) , value: data1.cum })
          
          
          } 
        });
     
        this.loading=false;
           });

    }else if(this.onemin==true){
      this.api.gettotal_market_cap_cg().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.total_market_cap_cg.update({ time:data1.date  , value: data1.cum })
            // this.eth= data1.cum; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.thirtyday==true){
      this.api.gettotal_market_cap_cgthirty().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            console.log(data1)
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.total_market_cap_cg.update({ time:Math.floor(new Date(data1.date).getTime() / 1000) , value: data1.cum })
          
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.threemonthdata==true){
      this.api.gettotal_market_cap_cgthreemonth().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.total_market_cap_cg.update({ time:data1.date  , value: data1.cum })
            // this.eth= data1.cum; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.sixmonthdata==true){
      this.api.gettotal_market_cap_cgsixmonths().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.total_market_cap_cg.update({ time:data1.date  , value: data1.cum })
          
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }
   
  }
  realmarketcapcg(){
    this.loading=true;
    if(this.sevenday==true){
      this.api.getreal_market_cap_cgsevenday().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
       
            this.real_market_cap_cg.update({ time:Math.floor(new Date(data1.date).getTime() / 1000) , value: data1.cum })
          
          
          } 
        });
     
        this.loading=false;
           });

    }else if(this.onemin==true){
      this.api.getreal_market_cap_cg().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.real_market_cap_cg.update({ time:data1.date  , value: data1.cum })
            // this.eth= data1.cum; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.thirtyday==true){
      this.api.getreal_market_cap_cgthirty().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            console.log(data1)
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.real_market_cap_cg.update({ time:Math.floor(new Date(data1.date).getTime() / 1000) , value: data1.cum })
          
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.threemonthdata==true){
      this.api.getreal_market_cap_cgthreemonth().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.real_market_cap_cg.update({ time:data1.date  , value: data1.cum })
            // this.eth= data1.cum; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.sixmonthdata==true){
      this.api.getreal_market_cap_cgsixmonths().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.cum==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.real_market_cap_cg.update({ time:data1.date  , value: data1.cum })
          
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }
   
  }


  changevalue(value:any){
this.timeinterval=value;
  }
  sevendaydata=()=>{
    this.thirtyday=false
    this.sevenday=true;
    this.onemin=false;
    this.sixmonthdata=false
    this.threemonthdata=false;
      this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart.removeSeries(this.topperformer);
  this.topperformer = null;
    this.chart.removeSeries(this.best_market_tracker);
  this.best_market_tracker = null;
    this.chart.removeSeries(this.total_market_cap_cg);
  this.total_market_cap_cg = null;
   this.chart.removeSeries(this.real_market_cap_cg);
  this.real_market_cap_cg = null;

  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.topperformer=this.chart.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
  this.best_market_tracker=this.chart.addAreaSeries({
    topColor: 'rgba(255, 195, 69, 0.8)',
    bottomColor: 'rgba(255, 195, 69, 0)',
    lineColor: 'rgba(255, 195, 69, 1)',
    lineWidth: 2,
   
  });
   this.total_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(0, 120, 12, 0.8)',
    bottomColor: 'rgba(0, 120, 12, 0)',
    lineColor: 'rgba(0, 120, 12, 1)',
    lineWidth: 2,
   
  });
  this.real_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(255, 127, 159, 0.8)',
    bottomColor: 'rgba(255, 127, 159, 0)',
    lineColor: 'rgba(255, 127, 159, 1)',
    lineWidth: 2,
   
  });

this.gettingdata();
this.gettingdataperformance();
this.getbestmarkettracker();
this.gettotalmarketcapcg();
this.realmarketcapcg();


  }
  thirtydata=()=>{
    this.thirtyday=true
    this.sevenday=false;
    this.sixmonthdata=false
    this.onemin=false;
    this.threemonthdata=false;
      this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart.removeSeries(this.topperformer);
  this.topperformer = null;
    this.chart.removeSeries(this.best_market_tracker);
  this.best_market_tracker = null;
    this.chart.removeSeries(this.total_market_cap_cg);
  this.total_market_cap_cg = null;
   this.chart.removeSeries(this.real_market_cap_cg);
  this.real_market_cap_cg = null;
 
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.topperformer=this.chart.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
    this.best_market_tracker=this.chart.addAreaSeries({
    topColor: 'rgba(255, 195, 69, 0.8)',
    bottomColor: 'rgba(255, 195, 69, 0)',
    lineColor: 'rgba(255, 195, 69, 1)',
    lineWidth: 2,
   
  });
   this.total_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(0, 120, 12, 0.8)',
    bottomColor: 'rgba(0, 120, 12, 0)',
    lineColor: 'rgba(0, 120, 12, 1)',
    lineWidth: 2,
   
  });
  this.real_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(255, 127, 159, 0.8)',
    bottomColor: 'rgba(255, 127, 159, 0)',
    lineColor: 'rgba(255, 127, 159, 1)',
    lineWidth: 2,
   
  });

  

this.gettingdata();
this.gettingdataperformance();
this.getbestmarkettracker();
this.gettotalmarketcapcg();
this.realmarketcapcg();
  }
  threemonthdaydata=()=>{
    this.thirtyday=false
    this.sevenday=false;
    this.onemin=false;
    this.sixmonthdata=false
    this.threemonthdata=true;
      this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart.removeSeries(this.topperformer);
  this.topperformer = null;
    this.chart.removeSeries(this.best_market_tracker);
  this.best_market_tracker = null;
    this.chart.removeSeries(this.total_market_cap_cg);
  this.total_market_cap_cg = null;
   this.chart.removeSeries(this.real_market_cap_cg);
  this.real_market_cap_cg = null;
 
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.topperformer=this.chart.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
    this.best_market_tracker=this.chart.addAreaSeries({
    topColor: 'rgba(255, 195, 69, 0.8)',
    bottomColor: 'rgba(255, 195, 69, 0)',
    lineColor: 'rgba(255, 195, 69, 1)',
    lineWidth: 2,
   
  });
   this.total_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(0, 120, 12, 0.8)',
    bottomColor: 'rgba(0, 120, 12, 0)',
    lineColor: 'rgba(0, 120, 12, 1)',
    lineWidth: 2,
   
  });
  this.real_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(255, 127, 159, 0.8)',
    bottomColor: 'rgba(255, 127, 159, 0)',
    lineColor: 'rgba(255, 127, 159, 1)',
    lineWidth: 2,
   
  });

  

this.gettingdata();
this.gettingdataperformance();
this.getbestmarkettracker();
this.gettotalmarketcapcg();
this.realmarketcapcg();
  }
  sixmonthdaydata=()=>{
    this.thirtyday=false
    this.sevenday=false;
    this.onemin=false;
    this.sixmonthdata=false
    this.threemonthdata=false;
    this.sixmonthdata=true
      this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart.removeSeries(this.topperformer);
  this.topperformer = null;
    this.chart.removeSeries(this.best_market_tracker);
  this.best_market_tracker = null;
    this.chart.removeSeries(this.total_market_cap_cg);
  this.total_market_cap_cg = null;
   this.chart.removeSeries(this.real_market_cap_cg);
  this.real_market_cap_cg = null;
 
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.topperformer=this.chart.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
    this.best_market_tracker=this.chart.addAreaSeries({
    topColor: 'rgba(255, 195, 69, 0.8)',
    bottomColor: 'rgba(255, 195, 69, 0)',
    lineColor: 'rgba(255, 195, 69, 1)',
    lineWidth: 2,
   
  });
   this.total_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(0, 120, 12, 0.8)',
    bottomColor: 'rgba(0, 120, 12, 0)',
    lineColor: 'rgba(0, 120, 12, 1)',
    lineWidth: 2,
   
  });
  this.real_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(255, 127, 159, 0.8)',
    bottomColor: 'rgba(255, 127, 159, 0)',
    lineColor: 'rgba(255, 127, 159, 1)',
    lineWidth: 2,
   
  });

  

this.gettingdata();
this.gettingdataperformance();
this.getbestmarkettracker();
this.gettotalmarketcapcg();
this.realmarketcapcg();
  }
  maxdata=()=>{
    this.thirtyday=false
    this.sevenday=false;
    this.onemin=true;
    this.threemonthdata=false;
    this.sixmonthdata=false
      this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart.removeSeries(this.topperformer);
  this.topperformer = null;
    this.chart.removeSeries(this.best_market_tracker);
  this.best_market_tracker = null;
    this.chart.removeSeries(this.total_market_cap_cg);
  this.total_market_cap_cg = null;
   this.chart.removeSeries(this.real_market_cap_cg);
  this.real_market_cap_cg = null;
 
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.topperformer=this.chart.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
    this.best_market_tracker=this.chart.addAreaSeries({
    topColor: 'rgba(255, 195, 69, 0.8)',
    bottomColor: 'rgba(255, 195, 69, 0)',
    lineColor: 'rgba(255, 195, 69, 1)',
    lineWidth: 2,
   
  });
   this.total_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(0, 120, 12, 0.8)',
    bottomColor: 'rgba(0, 120, 12, 0)',
    lineColor: 'rgba(0, 120, 12, 1)',
    lineWidth: 2,
   
  });
  this.real_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(255, 127, 159, 0.8)',
    bottomColor: 'rgba(255, 127, 159, 0)',
    lineColor: 'rgba(255, 127, 159, 1)',
    lineWidth: 2,
   
  });

  

this.gettingdata();
this.gettingdataperformance();
this.getbestmarkettracker();
this.gettotalmarketcapcg();
this.realmarketcapcg();
  }
  update=()=>{
if(this.loading==true){
  this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart.removeSeries(this.topperformer);
  this.topperformer = null;
    this.chart.removeSeries(this.best_market_tracker);
  this.best_market_tracker = null;
    this.chart.removeSeries(this.total_market_cap_cg);
  this.total_market_cap_cg = null;
   this.chart.removeSeries(this.real_market_cap_cg);
  this.real_market_cap_cg = null;
 
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.topperformer=this.chart.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
    this.best_market_tracker=this.chart.addAreaSeries({
    topColor: 'rgba(255, 195, 69, 0.8)',
    bottomColor: 'rgba(255, 195, 69, 0)',
    lineColor: 'rgba(255, 195, 69, 1)',
    lineWidth: 2,
   
  });
   this.total_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(0, 120, 12, 0.8)',
    bottomColor: 'rgba(0, 120, 12, 0)',
    lineColor: 'rgba(0, 120, 12, 1)',
    lineWidth: 2,
   
  });
  this.real_market_cap_cg=this.chart.addAreaSeries({
    topColor: 'rgba(255, 127, 159, 0.8)',
    bottomColor: 'rgba(255, 127, 159, 0)',
    lineColor: 'rgba(255, 127, 159, 1)',
    lineWidth: 2,
   
  });

  

  this.gettingdata();
  this.gettingdataperformance();
  this.getbestmarkettracker();
  this.gettotalmarketcapcg();

}
setTimeout(() => {
  this.loading=true;
  this.update();
}, 120000);
}

}
