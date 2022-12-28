import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  

  formdata: any;
  message="";

  
  
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.formdata = new FormGroup(
      {
        username: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)


      }
    )
    
  }

  onClickSubmit(data:any){
//console.log(data);

this.api.post("admin/login",{data:data}).subscribe(
  (result:any)=>
  {
    console.log(result);
    if(result.data.status == "success"){
      localStorage.setItem("usertype","admin");
      window.location.replace("/admin/dashboard/");
      //alert("Success");
      
    }
    
    else{
      this.message = "User and Password is Wrong";
     // alert("User and Password is Wrong");
    }
  },
  (error)=>
  {
console.log(error);


  }
)


  }

}
