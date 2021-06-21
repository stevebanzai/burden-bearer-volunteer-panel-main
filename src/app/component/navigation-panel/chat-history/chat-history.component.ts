import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {
  uniqueDates: any = [];



  name: string = "";
  typingUser: any;
  typing = false;
  sentTime: string = "";
  room: any;
  father_id: any;
  load = true;
  newMessage: string = '';
  messageList: string[] = [];
  @Output() chathistory = new EventEmitter();
  worklist: any;
  singleChatData: any;
  form: any = {};
  HiddenChat: any;
  sender_id: any;
  searchlist: any;
  sender_name: any;
  time: any;
  userList: any;

  userMessageList: any;
  adminName: any;
  constructor(private http: HttpClient, private authservice: AuthService, private chatService: ChatService,
    private datePipe: DatePipe) {
    this.room = localStorage.getItem("roomId");
    this.father_id = localStorage.getItem("father_id")
  }

  ngOnInit() {
    this.adminName = localStorage.getItem("adminname");
    this.father_id = localStorage.getItem("father_id");
    this.room = localStorage.getItem("roomId");
    //this.getLiveChatByFatherId();
    this.getMessageByRoomId();
    //this.getUserList();
    // this.getuniquedates()
    // this.authservice.getworkareanotes().subscribe(
    //   data => {
    //     this.worklist = data
    //     console.log(this.form);
    //     console.log(data)
    //   },
    //   err => {
    //   });
  }


  getSelectDateByRecord(RoomId: any, date: any) {
    const createdDate = date.substring(0, [10]);
    this.authservice.getMessageListByRoomId(RoomId, createdDate).subscribe(data => {
      this.userMessageList = data;

      this.HiddenChat = this.HiddenChat;
    })
  }
  getMessageByRoomId() {
    this.authservice.getSingalUserCharRecord(this.room).subscribe(data => {
      this.userList = data;
      console.log(data)
    })
  }

  getLiveChatByFatherId() {
    this.HiddenChat = !this.HiddenChat;
  }

  getuniquedates() {
    for (let i = 0; i < this.singleChatData.length; i++) {
      let myDate = this.datePipe.transform(this.singleChatData[i].createdAt, 'yyyy-MM-dd');
      console.log(myDate)
      for (let j = 0; j < this.uniqueDates.length; j++) {
        if (myDate != this.uniqueDates[i]) {
          this.uniqueDates.push(myDate)
        }
      }
    }
    console.log(this.uniqueDates)
  }

  //today
  searchbysender() {
    this.sender_id = this.form.sender_id;
    this.authservice.searchbysender(this.sender_id).subscribe(data => {
      console.log(this.searchlist)
      this.searchlist = data;
      this.sender_name = this.searchlist.sender_id;
    })

  }
  initiate() {
    this.name = localStorage.getItem("adminname") || "father";
    this.chatService.initiateChat(this.name, this.room);
    this.load = false;
  }
  toggleclosebtn() {
    this.chathistory.emit(false);
  }


}
