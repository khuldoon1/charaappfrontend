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
  @ViewChild('chartdiv0', {static: false}) chartdiv0: any ;
  @ViewChild('chartdiv1', {static: false}) chartdiv1: any ;
  @ViewChild('height', {static: false}) height: any ;
  title = 'charproject';
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
  constructor(private api:ApiserviceService){
  }
  @HostListener('window:resize')
onResize() {
 this.height.nativeElement.height=window.innerHeight
}

  ngAfterViewInit(): void {
    this.chart= createChart(this.chartdiv.nativeElement);
    this.lineSeries=this.chart.addLineSeries({
  });
    this.lineSerieseth=this.chart.addLineSeries();
    this.lineSeriesxpr=this.chart.addLineSeries();
    this.gettingdata();
    this.gettingdataeth();
    this.gettingdataxpr();
 
  }
  gettingdata(){
    this.api.getdata().subscribe((data:any)=>{
      data.forEach((data1:any,i:any) => {
        console.log(data1);
        if(data1.open_time==null || data1.close==null){

        }
        else{
          this.lineSeries.update({ time:(moment(data1.open_time)).format('YYYY-MMM-DD') , value: data1.close })
          this.btc= data1.close; 
        
        } 
      });
      // this.loading=false
      // for(let i=0; i<data.length ; i++){
      //   console.log(data[i]);
       
      // } 
      // this.updatechart();   
      // this.updatechart();
         });
  }

  gettingdataeth(){
    this.api.getdataeth().subscribe((data:any)=>{
      data.forEach((data1:any,i:any) => {
        console.log(data1);
        if(data1.open_time==null || data1.close==null){

        }
        else{
          this.lineSerieseth.update({ time:(moment(data1.open_time)).format('YYYY-MMM-DD') , value: data1.close })
          this.eth= data1.close; 
        
        } 
      });
      // this.updatecharteth();
         });
  }

  gettingdataxpr(){
    this.api.getdataxpr().subscribe((data:any)=>{
      data.forEach((data1:any,i:any) => {
        console.log(data1);
        if(data1.open_time==null || data1.close==null){

        }
        else{
          this.lineSeriesxpr.update({ time:(moment(data1.open_time)).format('YYYY-MMM-DD') , value: data1.close })
          this.xrp= data1.close; 
          this.loading=false
        
        } 
      });
      this.updatechart();   
      this.updatecharteth();
      this.updatechartxpr();
         });
  }
  updatechart(){
    this.api.getbtcnew().subscribe((data:any)=>{
      for(let i=0; i<data.length ; i++){
        console.log(data[i]);
        if(data[i].open_time==null || data[i].close==null){

        }
        else{
       this.lineSerieseth.update({ time:(moment(data[i].open_time)).format('YYYY-MMM-DD') , value: data[i].close })
       this.eth= data[i].close; 
        }

      }  
      // for(let i=data.length-1; i<data.length ; i++){
      //   console.log(data[i]);
      //   if(data[i].open_time==null || data[i].close==null){

      //   }
      //   else{
      //  this.lineSeries.update({ time:(moment(data[i].open_time)).format('YYYY-MMM-DD') , value: data[i].close })
      //  this.btc= data[i].close; 
      //   }
    
      // }   
      setTimeout(() => {
        this.updatechart();
      }, this.timeinterval);
         });
  }
  updatecharteth(){
    this.api.getdataethnew().subscribe((data:any)=>{
      for(let i=0; i<data.length ; i++){
        console.log(data[i]);
        if(data[i].open_time==null || data[i].close==null){

        }
        else{
       this.lineSerieseth.update({ time:(moment(data[i].open_time)).format('YYYY-MMM-DD') , value: data[i].close })
       this.eth= data[i].close; 
        }

      }   
      setTimeout(() => {
        this.updatecharteth();
      }, this.timeinterval);
         });
  }
  updatechartxpr(){
    this.api.getdataxprnew().subscribe((data:any)=>{
      for(let i=0; i<data.length ; i++){
        console.log(data[i]);
        if(data[i].open_time==null || data[i].close==null){

        }
        else{
       this.lineSeriesxpr.update({ time:(moment(data[i].open_time)).format('YYYY-MMM-DD') , value: data[i].close })
       this.xrp= data[i].close; 
       this.loading=false;
        }
      }   
      setTimeout(() => {
        this.updatechartxpr();
      }, this.timeinterval);
         });
  }

  changevalue(value:any){
this.timeinterval=value;
  }

}
