import { TubeServiceService } from './../tube-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  link:string;
  downloadLink:string;
  loading:boolean;
  content:boolean;
  embedLink:string;
  invalidURL:boolean;
  data;
  @ViewChild('result', { static: true }) result: ElementRef;

  constructor(private tubeService:TubeServiceService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.content=false
        var re1="https://m.youtube.com/watch?v="
        var re2="https://www.youtube.com/watch?v="
        var re3="https://youtu.be/"
        var isValid:boolean;
        if(this.link.startsWith(re1)||this.link.startsWith(re2)||this.link.startsWith(re3)){
          this.invalidURL=false
            this.getDownloadLink();
        }
        else{
          this.invalidURL=true
          return;
        }
  }

  getDownloadLink(){
    this.result.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" }); 
    this.loading=true
    this.content=false
    if(this.link.startsWith("https://m.youtube")){
        let mLink=`https://www.youtube.com/watch?v=${this.link.substring(30)}`
        this.data={
          "url":mLink
        }
      }
    else{
      this.data={
        "url":this.link
      }
    }
    this.tubeService.getDownloadLink(this.data).subscribe((res)=>
    {
      this.downloadLink=res['url'];
      if(this.link.startsWith("https://youtu.be")){
        this.embedLink=`https://www.youtube.com/embed/${this.link.substring(17)}`
      }
      else if(this.link.startsWith("https://m.youtube")){
        this.embedLink=`https://www.youtube.com/embed/${this.link.substring(30)}`
      }
      else{
        this.embedLink=`https://www.youtube.com/embed/${this.link.substring(32)}`
      }
      this.link=""
      this.loading=false
      this.content=true
    })
  }



}
