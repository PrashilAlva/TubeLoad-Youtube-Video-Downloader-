import { TubeServiceService } from './../tube-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {map} from 'rxjs/operators';

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

  constructor(private tubeService:TubeServiceService,
    private socket:Socket) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("We are here!")
    this.content=false
        var re1="https://m.youtube.com/watch?v="
        var re2="https://www.youtube.com/watch?v="
        var re3="https://youtu.be/"
        var isValid:boolean;
        if(this.link.startsWith(re1)||this.link.startsWith(re2)||this.link.startsWith(re3)){
          this.invalidURL=false;
          this.isVideoPresent();
        }
        else{
          this.invalidURL=true
          return;
        }
  }

  isVideoPresent(){
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
    this.tubeService.isVideoPresent(this.data).subscribe((res)=>
    {
      if(res['message']=="Video is present"){
        if(this.link.startsWith("https://youtu.be")){
        this.embedLink=`https://www.youtube.com/embed/${this.link.substring(17)}`
      }
      else if(this.link.startsWith("https://m.youtube")){
        this.embedLink=`https://www.youtube.com/embed/${this.link.substring(30)}`
      }
      else{
        this.embedLink=`https://www.youtube.com/embed/${this.link.substring(32)}`
      }
      // console.log(this.embedLink)
      this.link=""
      this.loading=false
      this.content=true
      }
      else{
        console.log("ERROR!")
      this.link=""
      this.loading=false
      }
    },
    err=>{
      console.log(err)
    })
  }

  getMessage() {
    return this.socket.fromEvent('download').pipe(map((data) => console.log(data)));
  }

  downloadVideo(){
  //   const dlink: HTMLAnchorElement = document.createElement('a');
  // dlink.download = 'myfile.txt'; 
  // console.log(dlink)
  // const myFileContent: string = 'I am a text file! 😂';
  // dlink.href = 'data:text/plain;charset=utf-16,' + myFileContent;
  // dlink.click(); 
  // dlink.remove();
    this.tubeService.getDownloadLink(this.data).subscribe(
      res=>{
        console.log(res)

      },
      err=>{
        console.log(err )
      }
    )
    
  }



}
