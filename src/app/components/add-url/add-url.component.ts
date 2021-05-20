import { Component, OnInit } from '@angular/core';
import { SaveUrl } from 'src/app/models/save-url.model';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddUrlComponent implements OnInit {

  saveUrl : SaveUrl = {
    longUrl:''
  }
  submitted = false;
  isError= false;

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
  }

  /**
   * Save url 
   */
   saveUrlFun(): void {
    const saveUrlData = {
      longUrl : this.saveUrl.longUrl
    }

    this.urlService.saveUrl(saveUrlData)
      .subscribe( response => {
        console.log(response);
        this.submitted = true;
        this.isError = false;
      }, 
      error =>{
        this.submitted = false;
        this.isError = true;
        console.log(error);
      });
  }

  newSaveurlFun(): void {
    this.submitted = false;
    this.saveUrl = {
      longUrl: '',
    };
  }

  

}
