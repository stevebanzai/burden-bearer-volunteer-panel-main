import { Component, EventEmitter, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  data: any =
  [
    {
      "parentName": "Navigation Panel",
    },
  ];
 
  @Output() toggleSideMenu = new EventEmitter



  chatQueueCB = false;
  workareaCB = false;
  bibleCB = false;
  WorkAreaNotesCB = false;
  strongsCB = false;
  crossReferenceCB = false;
  personalFavsCB = false;
  chatHistoryCB = false;
  calendarCB = false;
  pdfQuotesTabCB = false;
  barnaStatisticsCB = false;
  // chat = false;
  // lustdecent = false;
  mp3TabCB = false;


 

constructor(){}

  ngOnInit(): void {
  }

  toggleAccordian(event: any, index: number) {
    var element = event.target;
    element.classList.toggle("active");
    if (this.data[index].isActive) {
      this.data[index].isActive = true;
    } else {
      this.data[index].isActive = false;
    }
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }


  toggleVisibility(pramId: any) {
    console.log(pramId)
    if (pramId == "chatQueueCB") {
      this.chatQueueCB = !this.chatQueueCB
      console.log(this.chatQueueCB)
      this.toggleSideMenu.emit({param : 'chatQueueCB',status : this.chatQueueCB})
    }
    if (pramId == "workareaCB") {
      this.workareaCB = !this.workareaCB;
      this.toggleSideMenu.emit({param : 'workareaCB',status : this.workareaCB})
    }
    if (pramId == "bibleCB") {
      this.bibleCB = !this.bibleCB;
      this.toggleSideMenu.emit({param : 'bibleCB',status : this.bibleCB})
    }
    if (pramId == "WorkAreaNotesCB") {
      this.WorkAreaNotesCB = !this.WorkAreaNotesCB;
      this.toggleSideMenu.emit({param : 'WorkAreaNotesCB',status : this.WorkAreaNotesCB})
    }
    if (pramId == "strongsCB") {
      this.strongsCB = !this.strongsCB;
      this.toggleSideMenu.emit({param : 'strongsCB',status : this.strongsCB})
    }
    // if (pramId == "lustdecent") {
    //   this.lustdecent = !this.lustdecent;
    // }
    if (pramId == "crossReferenceCB") {
      this.crossReferenceCB = !this.crossReferenceCB;
      this.toggleSideMenu.emit({param : 'crossReferenceCB',status : this.crossReferenceCB})
    }
    if (pramId == "personalFavsCB") {
      this.personalFavsCB = !this.personalFavsCB;
      this.toggleSideMenu.emit({param : 'personalFavsCB',status : this.personalFavsCB})
    }
    if (pramId == "chatHistoryCB") {
      this.chatHistoryCB = !this.chatHistoryCB;
      this.toggleSideMenu.emit({param : 'chatHistoryCB',status : this.chatHistoryCB})
    }
    if (pramId == "calendarCB") {
      this.calendarCB = !this.calendarCB;
      this.toggleSideMenu.emit({param : 'calendarCB',status : this.calendarCB})
    }
    if (pramId == "pdfQuotesTabCB") {
      this.pdfQuotesTabCB = !this.pdfQuotesTabCB;
      this.toggleSideMenu.emit({param : 'pdfQuotesTabCB',status : this.pdfQuotesTabCB})
    }
    if (pramId == "barnaStatisticsCB") {
      this.barnaStatisticsCB = !this.barnaStatisticsCB;
      this.toggleSideMenu.emit({param : 'barnaStatisticsCB',status : this.barnaStatisticsCB})
    }
    if (pramId == "mp3TabCB") {
      this.mp3TabCB = !this.mp3TabCB;
      this.toggleSideMenu.emit({param : 'mp3TabCB',status : this.mp3TabCB})
    }

  }

 



}
