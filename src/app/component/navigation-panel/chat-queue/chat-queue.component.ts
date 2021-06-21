import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';




@Component({
  selector: 'app-chat-queue',
  templateUrl: './chat-queue.component.html',
  styleUrls: ['./chat-queue.component.css']
})

export class ChatQueueComponent implements OnInit {
  href:any;
  chat = false;
  ischatqueue = true;
  UserRoomList: any;
  InQueue = true
  AllActiveChats = false
  AllActiveChatsData : any; 
  public show2: boolean = false;
  public buttonName2: any = 'Show';
  isShowDiv2 = true;
  AllOnlineUsersTab = false;
  AllOnlineUsersData :any;
  timeNow:any

  showMessageBox = false;
  message:any;
  ActiveChatRefresh = false
  @Output() chatcom = new EventEmitter();
  todayISOString : any 
  constructor(private http: HttpClient, private authservice: AuthService, private chatservice: ChatService,
    private router : Router) {
    this.GetAllActiveChats();
    // this.getUserRoomList();
    // this.GetAllChats();
    this.chatservice.getchat().subscribe((data1:any)=>{
      console.log(data1)
      this.authservice.getRoomDetails().subscribe(data => {
            this.UserRoomList = data
            this.playAudio();
            // console.log(data)
          })
    });
    // setInterval(() => {
    //   this.authservice.getRoomDetails().subscribe(data => {
    //     this.UserRoomList = data
    //     console.log(data)
    //   })
    // }, 10000);

    setInterval(() => {
       this.timeNow = formatDate(new Date(), 'YYYY-MM-dd hh:mm:ss', 'en');
       this.todayISOString= new Date().toISOString();
      //new Date();
    }, 1);

  }

  playAudio(){
    let audio = new Audio();
    console.log("audio")
    audio.src = '../../../assets/sound/bell.wav';
    audio.load();
    audio.play();
  }

  getUserRoomList(){
    this.authservice.getRoomDetails().subscribe(data => {
      this.UserRoomList = data      
      // console.log(data)
    })
  }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.href)
    // this.GetAllActiveChats();
    

    this.getUserRoomList()
    // this.GetAllChats();
    // this.authservice.getRoomDetails().subscribe(data => {
    //   this.UserRoomList = data
    //   console.log(data)
    // })

  }

  toggleclosebtn() {
    this.chatcom.emit({status: false, isclose: 0});
  }


  toggleDisplayDiv2() {
    this.isShowDiv2 = !this.isShowDiv2;
  }


  // onSelect(id: any, prop: any) {
  //   const CN = localStorage.getItem("confessorName");
  //   if (prop == "InQueue") {
  //     this.chatservice.viewOthersChat = false;
  //     // const CN = localStorage.getItem("confessorName");
  //     this.chatcom.emit({status: true, isclose: 0}); //chat box opens
  //     let singleChatData = this.UserRoomList.find((x: { id: any; }) => x.id === id);
  //     console.log(singleChatData)
  //     // console.log(CN)
  //     // localStorage.setItem("roomId", singleChatData.ROOM_ID)
  //     // localStorage.setItem("confessorName", singleChatData.USER_NAME)
  //     // if (CN?.length == 0 || CN?.length == null) {      
  //       localStorage.setItem("roomId", singleChatData.ROOM_ID)
  //      localStorage.setItem("confessorName", singleChatData.USER_NAME)
  //       // this.updateChatStatus(singleChatData);  
  //       // this.updateChatStatus(singleChatData);
      
  //     // }
  //     // else{
  //     //   alert("kindly close the chat before opening new chat")
  //     // }
  //   }
  //   if (prop == "ActiveChats") {
  //      if(CN?.length == 0 || CN?.length == null){
  //       if (confirm("do u want to view this chat")) {
  //         this.chatservice.viewOthersChat = true
  //         this.chatcom.emit({status: true, isclose: 0});
  
  //         // this.viewChat.emit(true)
  //         let singleChatData = this.AllActiveChatsData.find((x: { id: any; }) => x.id === id);
  //         console.log(singleChatData)
  //         localStorage.setItem("roomId", singleChatData.ROOM_ID)
  //         localStorage.setItem("confessorName", singleChatData.USER_NAME)
  //         // localStorage.setItem("liveVolunteerName")
  //       }
  //      }
  //      else{
  //        alert("please close your chat first")
  //      }

     
  //     //  alert("active  ")

  //   }

  // }
@Output() chatQueuePath = new EventEmitter()

  onSelect(id:any, tabName: any){
    let chatStatus = localStorage.getItem('isActiveChat');
    console.log(chatStatus)
    if(tabName == 'InQueue'){
    if(chatStatus == null || chatStatus == undefined ){
      this.chatservice.viewOthersChat = false;
      let singleChatData = this.UserRoomList.find((x: { id: any; }) => x.id == id);
      localStorage.setItem("roomId", singleChatData.ROOM_ID);
      localStorage.setItem("confessorName", singleChatData.USER_NAME);   
      this.router.navigateByUrl('chat')   
      this.authservice.chatQueueSub.next(singleChatData.ROOM_ID);
    } else{
      let msg = "Close the opened chat first to view this chat.";
      this.showAlert(msg,'#fd2626');

    }    
    }
    if(tabName == 'ActiveChats'){
      if(chatStatus == null || chatStatus == undefined ){
      let singleChatData = this.AllActiveChatsData.find((x: { id: any; }) => x.id == id);
      localStorage.setItem("roomId", singleChatData.ROOM_ID);
      localStorage.setItem("confessorName", singleChatData.USER_NAME);
      this.chatservice.viewOthersChat = true;
       this.chatQueuePath.emit(1);
    
        this.router.navigateByUrl('chat');
        
    }
    else{
      let msg = "Close the opened chat first to view this chat.";
      this.showAlert(msg,'#fd2626')
    }
  }
  }
 

  toggleChatTabs(chatArea: any) {
    console.log(chatArea)
    if (chatArea == 'IQ') {
      console.log("iq reached")
      this.InQueue = true;
      this.AllActiveChats = false;
      this.ActiveChatRefresh = false
      // this.AllOnlineUsersTab = false
    }
    if (chatArea == 'AAC') {
      this.InQueue = false;
      this.AllActiveChats = true;
      this.ActiveChatRefresh = true
      // this.AllOnlineUsersTab = false
    }
    // if (chatArea == 'ACL') {
    //   this.InQueue = false;
    //   this.AllActiveChats = false
    //   this.AllOnlineUsersTab = true
    // }
  }

  GetAllActiveChats() {
    this.authservice.GetAllActiveChats().subscribe(data => {
      this.AllActiveChatsData = data
      console.log(this.AllActiveChatsData)
    })
  }

  // GetAllChats() {
  //   this.authservice.GetAllChats().subscribe(allsuers => {
  //     this.AllOnlineUsersData = allsuers
  //     console.log(this.AllOnlineUsersData)
  //   })
  // }

  bgColor:any;
  showAlert(msg:any, bg : any){
    
    this.bgColor = bg
    // set showloader to true to show loading div on view
    this.showMessageBox   = true;
    this.message = msg
    setTimeout(()=> {
      this.showMessageBox = false;
    }, 1500);
  
  }

  refreshActiveChats(){
    this.GetAllActiveChats();
    
  }


}




// mycodeends