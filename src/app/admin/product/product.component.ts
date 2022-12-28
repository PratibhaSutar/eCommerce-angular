import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: any;
  
  formdata: any;
  product: any;
  categories: any;

  //totalLength:any;
  //page:number = 1;

  imagestring = "";

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.paramMap.get("id");
    //alert(this.id);
    this.api.post("productcategory/list", {}).subscribe((result: any) => {
      this.categories = result.data;
    });

    if(this.id != null) {
      this.api.post("product/get", {data:{id:this.id}}).subscribe((result: any) => {
        this.product = result.data;
        //console.log(result);
        this.bind();
      });

    } else {
      this.bind();
    }
  }

  onClickSubmit(data: any) {
    data.image = this.imagestring;
    this.api.post("product/save", { data:data }).subscribe((result: any) => {
      this.product = result.data;
      console.log(result);
      this.router.navigate(['/admin/products']);
    
    })
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(this.product != null ? this.id : ""),
      name: new FormControl(this.product != null ? this.product.name : "", Validators.required),
      pcid: new FormControl(this.product != null ? this.product.pcid : "", Validators.required),
      description: new FormControl(this.product != null ? this.product.description : "", Validators.required),
      specification: new FormControl(this.product != null ? this.product.specification : "", Validators.required),
      mrp: new FormControl(this.product != null ? this.product.mrp : "", Validators.required),
      price: new FormControl(this.product != null ? this.product.price : "", Validators.required),
      instock: new FormControl(this.product != null ? this.product.instock : "", Validators.required),
      isactive: new FormControl(this.product != null ? this.product.isactive : "", Validators.required),
      image: new FormControl("")

    })
  }
  

  imageChanged(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      if (reader.result != null) {
        this.imagestring = reader.result.toString();
      }
    }
  }
}
