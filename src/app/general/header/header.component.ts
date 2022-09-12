import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  adminloggedin =  false;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("usertype") === "admin" )
    {
      this.adminloggedin = true;
    }
  }

}
