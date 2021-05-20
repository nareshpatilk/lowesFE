import { Component, OnInit } from '@angular/core';
import { StandardResponseUrl, StandardResponseUrlPagination} from 'src/app/models/standard-response-url.model';
import { UrlService} from 'src/app/services/url.service';
import { URL } from 'src/app/models/url.model';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit {

  standardResponseUrl?: StandardResponseUrl;
  standardResponseUrlPagination?: StandardResponseUrlPagination;
  
  urls?: URL[] =[];
  
  currentUrl?: URL;
  currentIndex = -1;
  title = '';

  page = 1;
  count? = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private urlService: UrlService) { 
  }

  ngOnInit(): void {
    this.reteriveUrls();
  }

  getUrlRequestParams( page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};


    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  /**
   * fetches all url by pagination
   */
  reteriveUrls(): void {
    //const params = this.getUrlRequestParams(this.page, this.pageSize);

    this.urlService.pagination(this.page,this.pageSize)
    .subscribe(
      response => {
        console.log(response);
        this.standardResponseUrlPagination = response;

        this.urls =  this.standardResponseUrlPagination ? 
         this.standardResponseUrlPagination.data ? 
        this.standardResponseUrlPagination.data.urlList:
        []:[];
        
        this.count =  this.standardResponseUrlPagination.data ?
         this.standardResponseUrlPagination.data.size:0;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  /**
   * 
   * @param url 
   * @param index 
   */
  setActiveUrl(url: URL, index: number): void {
    this.currentUrl = url;
    this.currentIndex = index;
  }

   /**
   * 
   * @param url 
   * @param index 
   */
    setActopenOriginaliveUrl(url: URL): void {
      this.currentUrl = url;
      this.updateCount();
      console.log(`clicked :: ${ this.currentIndex}`);
      window.open(this.currentUrl.longUrl, '_blank');
    }

  handleUrlPageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.reteriveUrls();
  }

  handleUrlPageChange(event: number): void {
    this.page = event;
    this.currentUrl = undefined;
    this.reteriveUrls();
  }

  openOriginal(): void {
      let longUrl = this.currentUrl? this.currentUrl.longUrl:"";
      this.updateCount();
      console.log(`clicked :: ${ this.currentIndex}`);
      window.open(longUrl, '_blank');
  }

  /**
   * update Count
   */
  updateCount(): void {
   
  let urlCode  = this.currentUrl ? this.currentUrl.urlCode:"";
    console.log(`shortUrl :: ${urlCode}`);
    if(urlCode !== ""){

      this.urlService.updateCount(urlCode)
      .subscribe(
        response => {
          this.currentUrl = response.data;
         this.reteriveUrls();
        },
        error => {
          console.log(error);
        });
    }
    
  }

}
