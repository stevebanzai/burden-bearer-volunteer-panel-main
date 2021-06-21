import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  Compononent = {
    chatQueueCB : {
      is_active : false,
      x : 0,
      y : 0,
      rows : 5,
      cols :  5,
        },
    workareaCB :{
      is_active :false,
      x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    bibleCB :{
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    WorkAreaNotesCB:{
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    strongsCB : {
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    crossReferenceCB :{
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    personalFavsCB :{
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    chatHistoryCB:{
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    calendarCB :{
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    mp3TabCB :{
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    pdfQuotesTabCB:{
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
    barnaStatisticsCB :{
        is_active :false,
        x : 0,
      y : 0,
      rows : 5,
      cols : 5,
    },
  } 

  constructor() { }

  getpositions(){
    return this.Compononent
  }

//   savePosition(event : any){
//     console.log(event)
//     if(event.param == 'chatQueueCB' ){
//         this.CompononetStatus.chatQueueCB.is_active = event.status;  
//         console.log(this.CompononetStatus.chatQueueCB.is_active)    
//     }
//     if(event.param == 'workareaCB' ){
//       this.CompononetStatus.workareaCB.is_active = event.status
//   }
//     if(event.param == 'bibleCB' ){
//       this.CompononetStatus.bibleCB.is_active  = event.status
//   }
//   if(event.param == 'WorkAreaNotesCB' ){
//     this.CompononetStatus.WorkAreaNotesCB.is_active  = event.status
// }
//     if(event.param == 'strongsCB' ){
//       this.CompononetStatus.strongsCB.is_active  = event.status
//     }
//     if(event.param == 'crossReferenceCB' ){
//       this.CompononetStatus.crossReferenceCB.is_active  = event.status
//   }
//   if(event.param == 'personalFavsCB' ){
//     this.CompononetStatus.personalFavsCB.is_active  = event.status
// }
// if(event.param == 'chatHistoryCB' ){
//   this.CompononetStatus.chatHistoryCB.is_active  = event.status
// }
// if(event.param == 'calendarCB' ){
//   this.CompononetStatus.calendarCB.is_active  = event.status
// }
// if(event.param == 'mp3TabCB' ){
//   this.CompononetStatus.mp3TabCB.is_active  = event.status
// }
// if(event.param == 'pdfQuotesTabCB' ){
//   this.CompononetStatus.pdfQuotesTabCB.is_active  = event.status
// }
// if(event.param == 'barnaStatisticsCB' ){
//   this.CompononetStatus.barnaStatisticsCB.is_active  = event.status
// }  



//   }
}
