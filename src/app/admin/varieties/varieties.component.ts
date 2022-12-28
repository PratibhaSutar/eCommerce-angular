import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-varieties',
  templateUrl: './varieties.component.html',
  styleUrls: ['./varieties.component.css']
})
export class VarietiesComponent implements OnInit {
 id:any;// id of product
  product:any;
  formdata:any;
  constructor(private api: ApiService, private route:ActivatedRoute) { } 

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");// for read id - create object(route) of ActivateRoute
    this.bind();

  }
  bind(){
    this.api.post("product/get", {data:{id:this.id}}).subscribe((result:any)=>{
      this.product = result.data;
      //console.log(this.product);
      console.log(result);
    });
    this.formdata = new FormGroup(
      {
        id:new FormControl(this.id),
        color:new FormControl("",Validators.required),
        size:new FormControl("",Validators.required),
        mrp:new FormControl(0,Validators.required),
        price:new FormControl(0, Validators.required)
      }
    )
  }
  onClickSubmit(data:any){
    let object = {id:this.id, variety:{color:data.color, size:data.size, mrp:data.mrp, price:data.price}};
    this.api.post("product/savevariety", {data:object}).subscribe((result:any)=>{
      //console.log(result);
      this.bind();
    })

  }
  deleteVariety(variety:any){
    if(confirm("Sure to Delete?")){
      let object = {id:this.id, variety:variety}};
      this.api.post("product/deletevariety", {data:Object}).subscribe((result:any)=>{
        this.bind();
      });
        }
    }

