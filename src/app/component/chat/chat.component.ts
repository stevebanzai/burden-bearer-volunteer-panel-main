import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GridsterItem, GridsterItemComponentInterface, GridType } from 'angular-gridster2';
import { Callbacks } from 'jquery';
import * as moment from 'moment';
import { observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import { PositionsService } from 'src/app/service/positions.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  ischatpanel = true;
  isClose = true;
  roomDataApi: any;
  chatRoomDetail: any;
  chatOverView: any;
  chatMessageCounter = 0
  showMessageBox = false;
  message: any
  bgColor: any;
  comfirmCloseStatus = false
  CloseChatOptions = false
  showConfirmClose = false;
  lastUsermessage: any;
  loadinitialMessage = false;
  showSubmitBtn = true
  @Output() thischat = new EventEmitter();
  //@Output() thischat1 = new EventEmitter();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  viewOthersChat = false
  options: any;
  dashboard: Array<GridsterItem> = [{ cols: 5, rows: 5, x: 0, y: 0 }]
  loaded = true;
  singleChatData: any;
  // ngOnDestroy() {
  //   this.roomDataApi.unsubscribe();
  //   console.log('Items destroyed');
  // }
  ngOnInit() {
    this.confessorName = localStorage.getItem("confessorName");
    this.room = localStorage.getItem("roomId");
    this.Father_Id = localStorage.getItem("father_id");
    this.chatOverView = localStorage.getItem("overView")
    this.GetSingleRoomDetails();
    this.getlastUsermessage();
    this.initiate();
    console.log(this.room)
    this.authservice.getLiveChatDetail(this.room).subscribe(data => {
      this.singleChatData = data;
      console.log(data);
      console.log('siglechatdata', this.singleChatData);
      if (this.singleChatData.length != 0) {
        //this.updateInitialChatTime();
      }
    });
    this.viewOthersChat = this.chatService.viewchat();
    this.options = {
      setGridSize: true,
      gridType: GridType.Fit,
      //compactType: CompactType.None,
      fixedRowHeight: 100,
      minRows: 1,
      maxRows: 100,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      minItemRows: 1,
      maxItemRows: 100,
      defaultItemRows: 1,
      minCols: 1,
      maxCols: 100,
      maxItemCols: 100,
      fixedColWidth: 105,
      scrollToNewItems: false,
      minItemCols: 1,
      defaultItemCols: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      swap: true,
      displayGrid: 'onDrag&Resize',
      compactType: 'none', // 'compactUp&Left',compactLeft&Up'
      pushItems: true,
      resizable: { enabled: true },
      draggable: {
        enabled: true
      },

      itemChangeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemChange(item, itemComponent),
      itemResizeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemResize(item, itemComponent),
    };

    this.dashboard = [
      { "x": 0, "y": 0, "cols": 3, "rows": 3 },
    ]

    // hiding the gridster untill positions are loaded
    this.loaded = false;

    this.posServ.getPositions().subscribe((positions) => {
      this.dashboard = positions;
      this.loaded = true;
    })

  }

  updateInitialChatTime() {
    this.authservice.updateChatIntialTime({
      Room: localStorage.getItem("roomId"),
    }).subscribe(data => {
      console.log('update time', data);
    })
  }

  toggleclosebtn() {
    if (this.viewOthersChat == true) {
      localStorage.removeItem("confessorName");
      localStorage.removeItem("roomId");
    }
    else {
      if (localStorage.getItem('isActiveChat') == undefined || localStorage.getItem('isActiveChat') == null) {
        localStorage.removeItem("confessorName");
        localStorage.removeItem("roomId");
      }
    }
    this.isClose = false;
    this.router.navigateByUrl('/dashboard');
    this.chatService.viewOthersChat = false;
    this.thischat.emit({ status: false, isclose: 1 });
  }

  // toggleclosebtn() {
  //   // this.ischatpanel = !this.ischatpanel;
  //   if(this.viewOthersChat == true){
  //     console.log("reached")

  //   }
  //   if( this.chatRoomDetail != null){
  //     console.log(this.chatRoomDetail)
  //     if(this.chatRoomDetail.CHAT_STATUS == 0 ){
  //       localStorage.removeItem("confessorName");
  //       localStorage.removeItem("roomId");
  //     }
  //     else{
  //       alert("kindly close the last openend chat first")
  //     }
  //   }

  //   this.chatService.viewOthersChat = false;
  //   console.log(this.chatService.viewOthersChat)
  //   this.thischat.emit({ status: false, isclose: 1 });

  // }

  time: any
  newMessage: string = '';
  messageList: string[] = [];
  load = true;
  name: any;
  typingUser: any;
  typing = false;
  sentTime: string = "";
  confessorName: any;
  room: any;
  status: any;
  Father_Id: any
    ;
  constructor(private router: Router, private datePipe: DatePipe, private chatService: ChatService, private posServ: PositionsService, private http: HttpClient, private authservice: AuthService) {

    this.getChatbehavior()

    // this.initiate();
    this.getTyping();
    this.stopTyping();

    this.getMessages();
    setInterval(() => {
      this.timeNow = new Date();
    }, 1);
  }

  getChatbehavior() {
    this.authservice.chatQueueSub.subscribe(data => {
      this.ngOnInit()
    })
  }

  public show: boolean = false;
  public buttonName: any = 'Show';
  isShowDiv = true;
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
  public todayString = new Date();
  ScheeduleDate(e: any) {
    console.log(e)
    this.todayString = e.value
  }

  initiate() {
    this.name = localStorage.getItem("adminname");
    this.chatService.initiateChat(this.name, this.room);
    this.load = false;
  }

  sendMessage() {
    const date = new Date();
    // replace(/T/, '').
    // replace(/\..+/, '');

    this.chatService.sendMessage({ sender: this.name, msg: this.newMessage, time: date, sender_id: 1, room: this.room, status: 0 });
    this.newMessage = '';


    if (this.chatService.initchatStatus() == 0) {
      this.updateChatStatus(this.chatRoomDetail);
      this.chatService.increaseChatcounter();
    }
    localStorage.setItem('isActiveChat', "1");

    // this.chatMessageCounter ++;
  }

  update() {
    this.chatService.updateStatus(this.name);
  }

  getMessages() {
    console.log("getmessa")
    this.chatService
      .getMessages()
      .subscribe((message: any) => {
        console.log(message);
        //mycode
        this.time = message.data.time
        let momentVariable = moment(message.data.time, 'MM-DD-YYYY');
        let stringvalue = momentVariable.format('YYYY-MM-DD');
        console.log(stringvalue)
        // ends
        console.log(this.time)
        this.messageList.push(message);
      });

  }

  stopTyping() {
    this.chatService.stopTyping(this.name).subscribe((name: any) => {

      if (this.name !== name.username) {

        this.typingUser = name;
        this.typing = false;
      } else {
        this.typing = false;
      }
    });
  }

  getTyping() {
    this.chatService.getTypingStatus().subscribe((name: any) => {

      if (this.name !== name.username) {

        this.typingUser = name;
        this.typing = true;
      }
      setTimeout(() => {
        this.typing = false;
      }, 3000);

    });

  }



  static itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
    throw new Error('Method not implemented.');
  }
  static itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
    throw new Error('Method not implemented.');
  }
  timeNow: Date = new Date();
  itemChange(item: any, itemComponent: any) {
    console.info(`state: ${JSON.stringify(this.dashboard, null, 5)}`);
    this.posServ.savePositions(this.dashboard)
  }

  itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }
  onSelect() {
    this.thischat.emit({ status: true, isclose: 0 });
  }


  // mycodestarts

  chat_Comment: any;
  Is_flagged: boolean = false;
  flag_Comment: any;

  chatComment(status: any) {
    this.chat_Comment = status;
    this.showMessageBox = false;
    console.log(this.Is_flagged, this.chat_Comment)
  }

  onsubmit() {
    console.log(this.chat_Comment)
    if (this.chat_Comment == undefined || this.chat_Comment == null) {
      let msg = "Kindly select a status before closing the chat. Thanks"
      this.showAlert(msg, '#fd2626');
    } else {
      this.showSubmitBtn = false
      this.showConfirmClose = true;
    }

  };

  closeChat(closestatus: boolean) {
    console.log(this.chat_Comment)
    // if (this.chat_Comment = " ") {
    //   let msg ="Kindly select a status before closing the chat. Thanks"
    //   this.showAlert(msg,'#fd2626');
    //  }
    //  else{
    if (closestatus == true) {

      const body = {
        ROOM_ID: this.room,
        CHAT_STATUS: 2,
        CHAT_COMMENT: this.chat_Comment,
        IS_FLAG: this.Is_flagged,
        CHAT_OVERVIEW: this.chatOverView,
        FLAG_COMMENT: this.flag_Comment,
        LAST_MESSAGE_TIME: this.datePipe.transform(new Date(), "yyy-MM-dd hh:mm:ss")
      }
      // let status: any;
      this.authservice.closechat(body).subscribe(data => {
        // status = data
        console.log(data);

        if (data == 1) {
          this.chatService.disconnectRoom();
          localStorage.removeItem("overView")
          localStorage.removeItem("confessorName");
          localStorage.removeItem("roomId");
          localStorage.removeItem('isActiveChat');
          this.chatService.isInitialChat = 0
          this.toggleclosebtn();

          this.toggleCloseChatOptions();
          this.ngOnInit()
        }
        else {
          alert("kindly submit again")
        }
      });
    }
    else {
      this.CloseChatOptions = false
    }
    // }

  }


  // closeChat() {
  //   if (this.chat_Comment?.length == undefined || this.chat_Comment?.length == null) {
  //    let msg ="Kindly select a status before closing the chat. Thanks"
  //    this.showAlert(msg,'#fd2626');
  //   }
  //   else {
  //     this.showConfirmClose = true;
  //     if (this.comfirmCloseStatus == true) {

  //     // if (confirm('do u want to close this chat ..?')) {
  //       const body = {
  //         ROOM_ID: this.room,
  //         CHAT_STATUS: 2,
  //         CHAT_COMMENT: this.chat_Comment,
  //         IS_FLAG: this.Is_flagged,
  //         CHAT_OVERVIEW : this.chatOverView,
  //         FLAG_COMMENT: this.flag_Comment
  //       }
  //       // let status: any;
  //       this.authservice.closechat(body).subscribe(data => {
  //         // status = data
  //          console.log(data);
  //         if(data == 1){
  //           localStorage.removeItem("overView")
  //           localStorage.removeItem("confessorName");
  //           localStorage.removeItem("roomId");
  //           localStorage.removeItem('isActiveChat');
  //           this.chatService.isInitialChat = 0
  //           this.toggleclosebtn();
  //         }
  //         else {
  //           alert("kindly submit again")
  //         }
  //       });
  //       // if (status = 1) {
  //       //   localStorage.removeItem("confessorName");
  //       //   localStorage.removeItem("roomId");
  //       //   localStorage.removeItem('isActiveChat');
  //       //   this.toggleclosebtn();

  //       // }
  //       // else {
  //       //   alert("kindly submit again")
  //       // }
  //     }
  //     else{
  //       this.CloseChatOptions = false
  //     }


  //   }





  // }

  GetSingleRoomDetails() {

    this.roomDataApi = this.authservice.getRoomData(this.room).subscribe(rD => {
      this.chatRoomDetail = rD
      console.log(this.chatRoomDetail);
    });
  }

  updateChatStatus(chatRoomDetail: any) {
    this.authservice.updateChatStatus(chatRoomDetail.id, chatRoomDetail.CHAT_STATUS, this.Father_Id).subscribe((data: any) => {
      if (!data.status) {
        this.viewOthersChat = true;
        this.newMessage='';
        alert(data.message)
      }
      console.log(data)
    })
  }

  Overview() {
    localStorage.setItem("overView", this.chatOverView)
  }

  showAlert(msg: any, bg: any) {

    this.bgColor = bg
    // set showloader to true to show loading div on view
    this.showMessageBox = true;
    this.message = msg
    setTimeout(() => {
      this.showMessageBox = false;
    }, 1500);

  }

  toggleCloseChatOptions() {
    this.CloseChatOptions = !this.CloseChatOptions;
    this.chat_Comment = null
    this.showConfirmClose = false;
    this.showSubmitBtn = true;
  }

  //   confirnCloseChat(closeStatus:any){
  //     console.log(closeStatus)
  // this.comfirmCloseStatus = closeStatus

  //   }

  @Input() chatQueuueInput: number = 0
  ngOnChanges() {
    console.log(this.chatQueuueInput)
    this.ngOnInit()
    //  window.location.reload()  
  }
  lastUsermessage: any;
  loadinitialMessage = false;
  async getlastUsermessage() {
    await this.authservice.getinitialChat(this.room)
      .subscribe(data => {
        console.log(data)
        if (data == null) {
          this.getlastUsermessage()
        }
        else {
          this.loadinitialMessage = true;
          this.lastUsermessage = data
        }
      })
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}