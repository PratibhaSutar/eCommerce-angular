import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  isLoading = false;
  formdata: any;
  products: any;
  categories:any;

  totalLength:any;
  page:number = 1;
 
  imagestring = "";

  baseurl = this.api.baseurl;
  constructor(private api: ApiService) { }
  ngOnInit(): void {
   this.bind();

  }

  bind() {
    this.api.post("product/list", {data:{pcid:""}}).subscribe((result: any) => {
      //console.log(result);
      this.products = result.data;
      this.totalLength = result.length;
    });
    /*this.formdata = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("",Validators.required),
      pcid: new FormControl("",Validators.required),
      description: new FormControl("",Validators.required),
      specification: new FormControl("",Validators.required),
      mrp: new FormControl("",Validators.required),
      price: new FormControl("",Validators.required),
      instock : new FormControl("",Validators.required),
      isactive : new FormControl("",Validators.required),
      image: new FormControl("")

    })*/
  }

 

  /*imageChanged(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      if (reader.result != null) {
        this.imagestring = reader.result.toString();
      }
    }
  }*/

  /*editproduct(id: string) {
    this.api.post("product/get", { data: { id: id } }).subscribe((result: any) => {
      let product = result.data;
      this.formdata = new FormGroup({
        id: new FormControl(product._id),
        name: new FormControl(product.name, Validators.required),
        pcid: new FormControl(product.pcid, Validators.required),
        description: new FormControl(product.description),
        specification: new FormControl(product.specification),
        mrp: new FormControl(product.mrp),
        price: new FormControl(product.price),
        instock : new FormControl(product.instock),
        isactive : new FormControl(product.isactive),
        image: new FormControl() }
      )
this.bind();
    });
  }*/
  deleteproduct(id: string) {
    if (confirm("Sure to Delete?")) {
      this.api.post("product/delete", { data: { id: id } }).subscribe((result: any) => {
        this.bind();
      });
    }
  }
  
}
