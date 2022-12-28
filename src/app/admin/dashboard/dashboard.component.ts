import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orders:any;
  users:any;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    //console.log(localStorage.getItem("id"));
  this.api.post("admin/orders", {data:{userid:""}}).subscribe((result:any)=>{
this.orders = result.data;
this.orders = this.orders.filter((order:any)=>{
  if(order.status == "paid")
  return true;
  else
  return false;
});
//console.log(this.orders);
   });
  


  this.api.post("admin/users", {data:{userid:""}}).subscribe((result:any)=>{
    this.users = result.data;
    
    //console.log(this.orders);
       });
      }
    }