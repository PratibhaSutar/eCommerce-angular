import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  adminloggedin =  false;
  userloggedin = false;
  categories: any;
  cartcount = 0;
  username = "";
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("usertype") === "admin" )

      this.adminloggedin = true;
      if(localStorage.getItem("usertype") === "user" ){
      
        this.userloggedin = true;
        this.username = localStorage.getItem("name") || "";
      
      }
      this.api.post("productcategory/list",{}).subscribe((result:any)=>{
        this.categories = result.data;
      });

      if(localStorage.getItem("products") != null){
        let products =JSON.parse(localStorage.getItem("products") || "[]");
        this.cartcount = products.length;
      }
    }
    logout(){
      localStorage.clear();
      window.location.replace("/");
    }
}
