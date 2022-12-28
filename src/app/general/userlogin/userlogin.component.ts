import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {


  formdata: any;
  message = "";
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.formdata = new FormGroup(
      {
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
      }
    )

  }

  onClickSubmit(data: any) {
    this.api.post("user/login", { data: data }).subscribe(
      (result: any) => {
        console.log(result);
        if (result.status == "success") {
          localStorage.setItem("usertype", "user");
          localStorage.setItem("name", result.data.name);
          localStorage.setItem("email", result.data.email);
          localStorage.setItem("id", result.data._id);

          window.location.replace("/checkout");
        }

        else {
          this.message = "User and Password is Wrong";
        
        }
      });


  }

}