import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-flagchat-box',
  templateUrl: './flagchat-box.component.html',
  styleUrls: ['./flagchat-box.component.css']
})
export class FlagchatBoxComponent implements OnInit {

  @Input() flagchatInput :any
  @Output() flagChatBoxOp : any = new EventEmitter(); 
  chatmessages:any
  constructor( private authSrvc : AuthService) { }

  ngOnInit(): void {
    if(this.flagchatInput != undefined){
      this.getChat();
    }

  }

  getChat(){
    this.authSrvc.getLiveChatDetail(this.flagchatInput.ROOM_ID).subscribe(data=>{
      console.log(data)
      this.chatmessages = data
      })
  }

  closebtn(){
    this.flagChatBoxOp.emit(false)
  }



ngOnChanges(){
this.ngOnInit();
console.log(this.flagchatInput)
}

}
