import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { createChart } from 'lightweight-charts';
import * as moment from 'moment';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit {
  @ViewChild('chartdiv', {static: false}) chartdiv: any ;
  @ViewChild('chartdiv0', {static: false}) chartdiv0: any ;
  @ViewChild('chartdiv1', {static: false}) chartdiv1: any ;
  @ViewChild('height', {static: false}) height: any ;
  @ViewChild('toolTip', {static: false}) toolTip: any ;
  @ViewChild('toolTip0', {static: false}) toolTip0: any ;
  @ViewChild('toolTip1', {static: false}) toolTip1: any ;
  title = 'charproject';
  onemin=false;
  sevenday=true;
  thirtyday=false;
  threemonthdata=false;
  sixmonthdata=false;
  // coingecko_historybtc=false;
  // coingecko_historyeth=false;
  // coingecko_historyxrp=false;
   chart :any;
   chart0 :any;
   chart1 :any;
    lineSeries :any; 
    lineSerieseth:any;
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
    this.chart0= createChart(this.chartdiv0.nativeElement,{timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },});
    this.chart1= createChart(this.chartdiv1.nativeElement,{timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },});
    this.lineSeries=this.chart.addAreaSeries({
      topColor: 'rgba(250, 177, 131, 0.8)',
      bottomColor: 'rgba(250, 177, 131, 0.5)',
      lineColor: 'rgba(250, 177, 131, 1)',
      lineWidth: 2,
     
    });
    this.lineSerieseth=this.chart0.addAreaSeries({
      topColor: 'rgba(131, 84, 0, 0.8)',
      bottomColor: 'rgba(131, 84, 0, 0.5)',
      lineColor: 'rgba(131, 84, 0, 1)',
      lineWidth: 2,
     
    });
    this.lineSeriesxpr=this.chart1.addAreaSeries({
      topColor: 'rgba(0, 32, 135, 0.8)',
      bottomColor: 'rgba(0, 32, 135, 0.5)',
      lineColor: 'rgba(0, 32, 135, 1)',
      lineWidth: 2,
     
    });
    this.gettingdata();
    this.gettingdataeth();
    this.gettingdataxpr();
    this.toolTipWidth = 10;
    this.toolTipHeight = 10;
    this.toolTipMargin = 25;
   setTimeout(() => {
   
      this.update();
   }, 60000);

 

// update tooltip
this.chart.subscribeCrosshairMove((param:any) => {

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

});
this.chart0.subscribeCrosshairMove((param:any) => {

  if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > this.chartdiv0.nativeElement.clientWidth || param.point.y < 0 || param.point.y > this.chartdiv0.nativeElement.clientHeight) {
    this.toolTip0.nativeElement.style.display = 'none';
  } else {
    // const dateStr = businessDayToString(param.time);
    this.toolTip0.nativeElement.style.display = 'block';
    let price = param.seriesPrices.get(this.lineSerieseth);
    let date;

      date= param.time.day+"/"+param.time.month+"/"+param.time.year
    
      date= moment(param.time* 1000).format('DD/MM/YYYY,h:mm:ss a');
   
    // let time = param.seriesPrices.get(this.lineSeries);
    // console.log("price",price)
    this.toolTip0.nativeElement.innerHTML = '<div style="color: rgba(131, 84, 0, 1)">ETH</div><div style="font-size: 16px; color: #21384d">' + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">' +date+  '</div>';
    let coordinate = this.lineSerieseth.priceToCoordinate(price);
    let shiftedCoordinate = param.point.x - 50;
    if (coordinate === null) {
      return;
    }
    shiftedCoordinate = Math.max(0, Math.min(this.chartdiv0.nativeElement.clientWidth - this.toolTipWidth, shiftedCoordinate));
    let coordinateY = coordinate - this.toolTipHeight - this.toolTipMargin > 0 ? coordinate - this.toolTipHeight - this.toolTipMargin : Math.max(0, Math.min(this.chartdiv0.nativeElement.clientHeight - this.toolTipHeight - this.toolTipMargin, coordinate + this.toolTipMargin));
    this.toolTip0.nativeElement.style.left = shiftedCoordinate + 'px';
    this.toolTip0.nativeElement.style.top = coordinateY-80 + 'px' ;
  }

});
this.chart1.subscribeCrosshairMove((param:any) => {
  // console.log("param",param)
  if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > this.chartdiv1.nativeElement.clientWidth || param.point.y < 0 || param.point.y > this.chartdiv1.nativeElement.clientHeight) {
    this.toolTip1.nativeElement.style.display = 'none';
  } else {
    // const dateStr = businessDayToString(param.time);
    this.toolTip1.nativeElement.style.display = 'block';
    let price = param.seriesPrices.get(this.lineSeriesxpr);
    let date;
 

      date= moment(param.time* 1000).format('DD/MM/YYYY,h:mm:ss a');
  
    // let time = param.seriesPrices.get(this.lineSeries);
    // console.log("price",price)
    this.toolTip1.nativeElement.innerHTML = '<div style="color: rgba(0, 32, 135, 1);">XRP</div><div style="font-size: 16px; color: #21384d">' + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">' +date+  '</div>';
    let coordinate = this.lineSeriesxpr.priceToCoordinate(price);
    let shiftedCoordinate = param.point.x - 50;
    if (coordinate === null) {
      return;
    }
    shiftedCoordinate = Math.max(0, Math.min(this.chartdiv1.nativeElement.clientWidth - this.toolTipWidth, shiftedCoordinate));
    let coordinateY = coordinate - this.toolTipHeight - this.toolTipMargin > 0 ? coordinate - this.toolTipHeight - this.toolTipMargin : Math.max(0, Math.min(this.chartdiv1.nativeElement.clientHeight - this.toolTipHeight - this.toolTipMargin, coordinate + this.toolTipMargin));
    this.toolTip1.nativeElement.style.left = shiftedCoordinate + 'px';
    this.toolTip1.nativeElement.style.top = coordinateY-80 + 'px' ;
  }

});

  }
  gettingdata(){
    this.loading=true;
    if(this.sevenday==true){
      this.api.getsevendaybtc().subscribe((data:any)=>{
       
        data.forEach((data1:any,i:any) => {
         
          if(data1.open_time==null || data1.close==null){
  
          }
          else{
            this.lineSeries.update({ time:Math.floor(new Date(data1.open_time).getTime() / 1000) , value: data1.close })
            this.btc= data1.close; 
          
          } 
        });
        this.loading==false;
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
        this.loading==false;
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
        this.loading==false;
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
        this.loading==false;
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
        this.loading==false;
           });
    }

  }

  gettingdataeth(){
    this.loading=true;
    if(this.sevenday==true){
      this.api.getsevendayeth().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.open_time==null || data1.close==null){
  
          }
          else{
       
            this.lineSerieseth.update({ time:Math.floor(new Date(data1.open_time).getTime() / 1000) , value: data1.close })
            this.eth= data1.close; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });

    }else if(this.onemin==true){
      this.api.getdataeth().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.price==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.lineSerieseth.update({ time:data1.date  , value: data1.price })
            this.eth= data1.price; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.thirtyday==true){
      this.api.getthirtydayeth().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.open_time==null || data1.close==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.lineSerieseth.update({ time:Math.floor(new Date(data1.open_time).getTime() / 1000) , value: data1.close })
            this.eth= data1.close; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.threemonthdata==true){
      this.api.getthreemonthdeth().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.price==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.lineSerieseth.update({ time:data1.date  , value: data1.price })
            this.eth= data1.price; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }else if(this.sixmonthdata==true){
      this.api.getsixmonthdeth().subscribe((data:any)=>{
        data.forEach((data1:any,i:any) => {
         
          if(data1.date==null || data1.price==null){
  
          }
          else{
            // console.log(Math.floor(new Date(data1.open_time).getTime() / 1000))
            this.lineSerieseth.update({ time:data1.date  , value: data1.price })
            this.eth= data1.price; 
          
          } 
        });
        // this.updatecharteth();
        this.loading=false;
           });
    }
   
  }

  gettingdataxpr(){
    this.loading=true
if(this.sevenday==true){
  this.api.getsevendayxrp().subscribe((data:any)=>{
    data.forEach((data1:any,i:any) => {
     

      if(data1.open_time==null || data1.close==null){

      }
      else{
    
        this.lineSeriesxpr.update({ time:Math.floor(new Date(data1.open_time).getTime() / 1000) , value: data1.close })
        this.xrp= data1.close; 
      
      
      } 
    });
  this.loading=false;
    // this.updatechart();   
    // this.updatecharteth();
    // this.updatechartxpr();
       });
}else if(this.onemin==true){
  this.api.getdataxpr().subscribe((data:any)=>{
    data.forEach((data1:any,i:any) => {
     

      if(data1.date==null || data1.price==null){

      }
      else{
    
        this.lineSeriesxpr.update({ time:data1.date  , value: data1.price })
        this.xrp= data1.price; 
      
      
      } 
    });
  this.loading=false;
    // this.updatechart();   
    // this.updatecharteth();
    // this.updatechartxpr();
       });
}else if(this.thirtyday==true){
  this.api.getthirtydayxrp().subscribe((data:any)=>{
    data.forEach((data1:any,i:any) => {
     

      if(data1.open_time==null || data1.close==null){

      }
      else{
    
        this.lineSeriesxpr.update({ time:Math.floor(new Date(data1.open_time).getTime() / 1000) , value: data1.close })
        this.xrp= data1.close; 
      
      
      } 
    });
  this.loading=false;
    // this.updatechart();   
    // this.updatecharteth();
    // this.updatechartxpr();
       });
}else if(this.threemonthdata==true){
  this.api.getthreemonthdxrp().subscribe((data:any)=>{
    data.forEach((data1:any,i:any) => {
     

      if(data1.date==null || data1.price==null){

      }
      else{
    
        this.lineSeriesxpr.update({ time:data1.date  , value: data1.price })
        this.xrp= data1.price; 
      
      
      } 
    });
  this.loading=false;
    // this.updatechart();   
    // this.updatecharteth();
    // this.updatechartxpr();
       });
}else if(this.sixmonthdata==true){
  this.api.getsixmonthdxrp().subscribe((data:any)=>{
    data.forEach((data1:any,i:any) => {
     

      if(data1.date==null || data1.price==null){

      }
      else{
    
        this.lineSeriesxpr.update({ time:data1.date  , value: data1.price })
        this.xrp= data1.price; 
      
      
      } 
    });
  this.loading=false;
    // this.updatechart();   
    // this.updatecharteth();
    // this.updatechartxpr();
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
  this.chart0.removeSeries(this.lineSerieseth);
  this.lineSerieseth = null;
  this.chart1.removeSeries(this.lineSeriesxpr);;
  this.lineSeriesxpr = null;
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0.5)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.lineSerieseth=this.chart0.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0.5)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
  this.lineSeriesxpr=this.chart1.addAreaSeries({
    topColor: 'rgba(0, 32, 135, 0.8)',
    bottomColor: 'rgba(0, 32, 135, 0.5)',
    lineColor: 'rgba(0, 32, 135, 1)',
    lineWidth: 2,
   
  });
this.gettingdata();
this.gettingdataeth();
this.gettingdataxpr();
  }
  thirtydata=()=>{
    this.thirtyday=true
    this.sevenday=false;
    this.sixmonthdata=false
    this.onemin=false;
    this.threemonthdata=false;
      this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart0.removeSeries(this.lineSerieseth);
  this.lineSerieseth = null;
  this.chart1.removeSeries(this.lineSeriesxpr);;
  this.lineSeriesxpr = null;
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0.5)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.lineSerieseth=this.chart0.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0.5)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
  this.lineSeriesxpr=this.chart1.addAreaSeries({
    topColor: 'rgba(0, 32, 135, 0.8)',
    bottomColor: 'rgba(0, 32, 135, 0.5)',
    lineColor: 'rgba(0, 32, 135, 1)',
    lineWidth: 2,
   
  });
this.gettingdata();
this.gettingdataeth();
this.gettingdataxpr();
  }
  threemonthdaydata=()=>{
    this.thirtyday=false
    this.sevenday=false;
    this.onemin=false;
    this.sixmonthdata=false
    this.threemonthdata=true;
      this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart0.removeSeries(this.lineSerieseth);
  this.lineSerieseth = null;
  this.chart1.removeSeries(this.lineSeriesxpr);;
  this.lineSeriesxpr = null;
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0.5)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.lineSerieseth=this.chart0.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0.5)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
  this.lineSeriesxpr=this.chart1.addAreaSeries({
    topColor: 'rgba(0, 32, 135, 0.8)',
    bottomColor: 'rgba(0, 32, 135, 0.5)',
    lineColor: 'rgba(0, 32, 135, 1)',
    lineWidth: 2,
   
  });
this.gettingdata();
this.gettingdataeth();
this.gettingdataxpr();
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
  this.chart0.removeSeries(this.lineSerieseth);
  this.lineSerieseth = null;
  this.chart1.removeSeries(this.lineSeriesxpr);;
  this.lineSeriesxpr = null;
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0.5)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.lineSerieseth=this.chart0.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0.5)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
  this.lineSeriesxpr=this.chart1.addAreaSeries({
    topColor: 'rgba(0, 32, 135, 0.8)',
    bottomColor: 'rgba(0, 32, 135, 0.5)',
    lineColor: 'rgba(0, 32, 135, 1)',
    lineWidth: 2,
   
  });
this.gettingdata();
this.gettingdataeth();
this.gettingdataxpr();
  }
  maxdata=()=>{
    this.thirtyday=false
    this.sevenday=false;
    this.onemin=true;
    this.threemonthdata=false;
    this.sixmonthdata=false
      this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart0.removeSeries(this.lineSerieseth);
  this.lineSerieseth = null;
  this.chart1.removeSeries(this.lineSeriesxpr);;
  this.lineSeriesxpr = null;
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0.5)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.lineSerieseth=this.chart0.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0.5)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
  this.lineSeriesxpr=this.chart1.addAreaSeries({
    topColor: 'rgba(0, 32, 135, 0.8)',
    bottomColor: 'rgba(0, 32, 135, 0.5)',
    lineColor: 'rgba(0, 32, 135, 1)',
    lineWidth: 2,
   
  });
this.gettingdata();
this.gettingdataeth();
this.gettingdataxpr();
  }
  update=()=>{
if(this.loading==false){
  this.chart.removeSeries(this.lineSeries);;
  this.lineSeries = null;
  this.chart0.removeSeries(this.lineSerieseth);
  this.lineSerieseth = null;
  this.chart1.removeSeries(this.lineSeriesxpr);;
  this.lineSeriesxpr = null;
  this.lineSeries=this.chart.addAreaSeries({
    topColor: 'rgba(250, 177, 131, 0.8)',
    bottomColor: 'rgba(250, 177, 131, 0.5)',
    lineColor: 'rgba(250, 177, 131, 1)',
    lineWidth: 2,
   
  });
  this.lineSerieseth=this.chart0.addAreaSeries({
    topColor: 'rgba(131, 84, 0, 0.8)',
    bottomColor: 'rgba(131, 84, 0, 0.5)',
    lineColor: 'rgba(131, 84, 0, 1)',
    lineWidth: 2,
   
  });
  this.lineSeriesxpr=this.chart1.addAreaSeries({
    topColor: 'rgba(0, 32, 135, 0.8)',
    bottomColor: 'rgba(0, 32, 135, 0.5)',
    lineColor: 'rgba(0, 32, 135, 1)',
    lineWidth: 2,
   
  });
  this.gettingdata();
  this.gettingdataeth();
  this.gettingdataxpr();
}
setTimeout(() => {
  this.update();
}, 60000);
}

  // this.api.getdataxprnew().subscribe((data:any)=>{
  //   for(let i=0; i<data.length ; i++){
   
  //     if(data[i].open_time==null || data[i].close==null){

  //     }
  //     else{
  //    this.lineSeriesxpr.update({ time:Math.floor(new Date(data[i].open_time).getTime() / 1000) , value: data[i].close })
  //    this.xrp= data[i].close; 
  //    this.loading=false;
  //     }
  //   }   
  //   setTimeout(() => {
  //     this.updatechartxpr();
  //   }, this.timeinterval);
  //      });
}