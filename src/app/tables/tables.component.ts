import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  financiald:any;
  crypto_meter:any;
  loading=true;
  @ViewChild('height', {static: false}) height: any ;
  constructor(private api:ApiserviceService) { }

  @HostListener('window:resize')
onResize() {
 this.height.nativeElement.height=window.innerHeight
}
  ngOnInit(): void {
    this.financialsdata();
    this.crypto_meterdata();
  }
  financialsdata=()=>{
    this.loading=true;
    this.api.getfinancials().subscribe((data:any)=>{
      console.log("finacial data",data);
      this.financiald=data[0];
      setTimeout(() => {
        this.financialsdata();
      }, 60000);
    })
  }
  crypto_meterdata=()=>{
    this.api.getcrypto_meter().subscribe((data:any)=>{
      console.log("crypto meter data",data[0]);
this.crypto_meter=data[0];
this.loading=false;
setTimeout(() => {
  this.crypto_meterdata();
}, 60000);

    })
  }

}
