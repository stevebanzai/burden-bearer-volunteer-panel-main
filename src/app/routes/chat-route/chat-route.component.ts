import { Component, Input, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { GridsterConfig, GridsterItem, CompactType, GridsterItemComponentInterface } from 'angular-gridster2';
import { ChatComponent } from 'src/app/component/chat/chat.component';
import { FlagsComponent } from 'src/app/component/flags/flags.component';
import { JourneyComponent } from 'src/app/component/journey/journey.component';
import { BarnaStatisticsComponent } from 'src/app/component/navigation-panel/barna-statistics/barna-statistics.component';
import { BibleComponent } from 'src/app/component/navigation-panel/bible/bible.component';
import { CalendercomComponent } from 'src/app/component/navigation-panel/calendercom/calendercom.component';
import { ChatHistoryComponent } from 'src/app/component/navigation-panel/chat-history/chat-history.component';
import { ChatQueueComponent } from 'src/app/component/navigation-panel/chat-queue/chat-queue.component';
import { CrossReferenceComponent } from 'src/app/component/navigation-panel/cross-reference/cross-reference.component';
import { Mp3ClipsComponent } from 'src/app/component/navigation-panel/mp3-clips/mp3-clips.component';
import { PdfQuotesComponent } from 'src/app/component/navigation-panel/pdf-quotes/pdf-quotes.component';
import { PersonalFavsComponent } from 'src/app/component/navigation-panel/personal-favs/personal-favs.component';
import { StrongsComponent } from 'src/app/component/navigation-panel/strongs/strongs.component';
import { WorkAreaNotesComponent } from 'src/app/component/navigation-panel/work-area-notes/work-area-notes.component';
import { WorkAreaComponent } from 'src/app/component/navigation-panel/work-area/work-area.component';
import { ReportsmetricsComponent } from 'src/app/component/reportsmetrics/reportsmetrics.component';
import { VolunteerregistrationComponent } from 'src/app/component/volunteerregistration/volunteerregistration.component';

import { PositionsService } from 'src/app/service/positions.service';
import { DashboardService } from 'src/app/service/positionservice/dashboard.service';

declare var $el: JQuery;
@Component({
  selector: 'app-chat-route',
  templateUrl: './chat-route.component.html',
  styleUrls: ['./chat-route.component.css']
})

export class ChatRouteComponent implements OnInit {
  // chat = true;
  iscollapsed = false;
  route: any
  positionLs: any
  pickedComponent: any;

  options?: GridsterConfig;
  loaded = false;
  dashboard: Array<GridsterItem> = [];


  component1 = ChatQueueComponent;
  component2 = ChatComponent;
  component3 = ChatHistoryComponent
  component4 = BibleComponent;
  component5 = CrossReferenceComponent;
  component6 = StrongsComponent;
  component7 = Mp3ClipsComponent;
  component8 = WorkAreaComponent;
  component9 = WorkAreaNotesComponent;
  component10 = BarnaStatisticsComponent;
  component11 = CalendercomComponent;
  component12 = PdfQuotesComponent;
  component13 = PersonalFavsComponent;
  component14 = JourneyComponent;
  // component15 = ReportsmetricsComponent;
  component16 = FlagsComponent;
  component17 = VolunteerregistrationComponent;

  // chatQueueCB = false;
  // workareaCB = false;
  // bibleCB = false;
  // WorkAreaNotesCB = false;
  // strongsCB = false;
  // crossReferenceCB = false;
  // personalFavsCB = false;
  // chatHistoryCB = false;
  // calendarCB = false;
  // mp3TabCB = false
  // pdfQuotesTabCB = false;
  // barnaStatisticsCB = false;
  // chat = false;
  // lustdecent = false;
  // c :any[]=[
  //   { chatQueueCB :  true },
  // {bibleCB : true}]

  Compononent: any = []

  //  Compononent = {
  //     chatQueueCB : {
  //       is_active : false,
  //       x : 0,
  //       y : 0,
  //       rows : 3,
  //       cols :  4,
  //         },
  //     workareaCB :{
  //       is_active :false,
  //       x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     bibleCB :{
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     WorkAreaNotesCB:{
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     strongsCB : {
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     crossReferenceCB :{
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     personalFavsCB :{
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     chatHistoryCB:{
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     calendarCB :{
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     mp3TabCB :{
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     pdfQuotesTabCB:{
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //     barnaStatisticsCB :{
  //         is_active :false,
  //         x : 0,
  //       y : 0,
  //       rows : 5,
  //       cols : 5,
  //     },
  //   } 

  // comp = [
  //   {name : this.component1, is_active: true, id : "chatQueue" , rows : 5 , cols : 3, x:0, y :0 },

  //   {name : this.component4,  is_active: false,id : "bible" , rows : 5 , cols : 3, x:3, y :0 }
  // ]

  // dashboardCounter = 0 
  // dashboardCounterLs :any

  constructor(private positionServc: PositionsService, private router: Router) {
    //   this.positionLs=localStorage.getItem('dashBoardComponent');
    //   let posobj = JSON.parse(this.positionLs);
    // console.log(posobj);

    if (localStorage.getItem('chatComponent') == null || localStorage.getItem('chatComponent') == undefined) {
      this.Compononent = [{
        widget: "chatQueueCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 4,
        cols: 6,
      },
      {
        widget: "workareaCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 5,
        cols: 5,
      },
      {
        widget: "bibleCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 5,
        cols: 6,
      },
      {
        widget: "WorkAreaNotesCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 5,
        cols: 5,
      },
      {
        widget: "strongsCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 5,
        cols: 5,
      },
      {
        widget: "crossReferenceCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 3.7,
        cols: 5,
      },
      {
        widget: "personalFavsCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 6.5,
        cols: 7,
      },
      {
        widget: "chatHistoryCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 5,
        cols: 7,
      },
      {
        widget: "calendarCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 4.6,
        cols: 9,
      },
      {
        widget: "mp3TabCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 5,
        cols: 5,
      },
      {
        widget: "pdfQuotesTabCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 5,
        cols: 5,
      },
      {
        widget: "barnaStatisticsCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 3,
        cols: 5,
      },
      {
        widget: "chatBoxCB",
        is_active: true,
        x: 0,
        y: 0,
        rows: 5,
        cols: 7,
      }
      ]

   
    }
    else {
      this.Compononent = this.getPositionsFromLS();
      console.log(this.Compononent)
    }

    this.gridsterInit();


  }

  ngOnInit(): void {

  }


  getPositionsFromLS() {
    this.positionLs = localStorage.getItem('chatComponent');
    let posobj = JSON.parse(this.positionLs);
    console.log(posobj);
    return posobj;

  }
  gridsterInit() {
    this.options = {
      fixedRowHeight: 90,
      gridType: 'fixed',
      compactType: CompactType.None,
      margin: 10,
      outerMargin: false,
      minRows: 1,
      maxRows: 100,
      minItemRows: 1,
      maxItemRows: 50,
      defaultItemRows: 3,
      minCols: 3,
      maxCols: 90,
      maxItemCols: 100,
      fixedColWidth: 50,
      enableEmptyCellClick: false,
      minItemCols: 1,
      defaultItemCols: 1,
      maxItemArea: 250,
      minItemArea: 1,
      swap: false,
      displayGrid: 'onDrag&Resize',
      // compactType: 'none', // 'compactUp&Left',compactLeft&Up'
      pushItems: false,
      resizable: { enabled: true },
      draggable: {
        enabled: true
      },
      itemChangeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemChange(item, itemComponent),
      itemResizeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemResize(item, itemComponent),
    };

    this.dashboard = [
      { x: 0, y: 0, cols: 3, rows: 5 }
    ]

    // hiding the gridster untill positions are loaded
    this.loaded = false;

    this.positionServc.getPositions().subscribe((positions) => {
      //this.dashboard = positions;
      console.log(positions)
      this.loaded = true
    })
    // this.getPositionsFromLS();
  }


  itemChange(item: any, itemComponent: any) {
    console.info(`state: ${JSON.stringify(this.dashboard, null, 5)}`);
    if (this.options?.api && this.options.api.optionsChanged) {
      this.positionServc.savePositions(this.dashboard)
      console.log(item);
      console.log(itemComponent)
      this.saveCoordinatesLS(item);
      //this.getPositionsFromLS()

    }

  };
  itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);

    this.saveCoordinatesLS(item);
    // this.dashboardCounter ++



    // this.getPositionsFromLS()
  }

  saveCoordinatesLS(item: any) {

    for (let i = 0; i < this.Compononent.length; i++) {
      if (this.Compononent[i].widget == this.pickedComponent) {
        this.Compononent[i].rows = item.rows
        this.Compononent[i].cols = item.cols
        this.Compononent[i].x = item.x
        this.Compononent[i].y = item.y
      }
    }




    //  if( this.pickedComponent == "chatQueue" ){
    //     this.Compononent.chatQueueCB.cols = item.cols;
    //     this.Compononent.chatQueueCB.rows = item.rows;
    //     this.Compononent.chatQueueCB.x = item.x;
    //     this.Compononent.chatQueueCB.y = item.y;        
    //  }
    // if( this.pickedComponent === "bible" ){
    //   this.Compononent.bibleCB.cols = item.cols;
    //   this.Compononent.bibleCB.rows = item.rows;
    //   this.Compononent.bibleCB.x = item.x;
    //   this.Compononent.bibleCB.y = item.y;      
    // }
    // if( this.pickedComponent === "workArea" ){
    //   this.Compononent.workareaCB.cols = item.cols;
    //   this.Compononent.workareaCB.rows = item.rows;
    //   this.Compononent.workareaCB.x = item.x;
    //   this.Compononent.workareaCB.y = item.y;      
    // }
    // if( this.pickedComponent == "workAreaNotes" ){
    //   this.Compononent.WorkAreaNotesCB.cols = item.cols;
    //   this.Compononent.WorkAreaNotesCB.rows = item.rows;
    //   this.Compononent.WorkAreaNotesCB.x = item.x;
    //   this.Compononent.WorkAreaNotesCB.y = item.y;      
    // }
    // if( this.pickedComponent == "strongs" ){
    //   this.Compononent.strongsCB.cols = item.cols;
    //   this.Compononent.strongsCB.rows = item.rows;
    //   this.Compononent.strongsCB.x = item.x;
    //   this.Compononent.strongsCB.y = item.y;      
    // }
    // if( this.pickedComponent == "crossRef" ){
    //   this.Compononent.crossReferenceCB.cols = item.cols;
    //   this.Compononent.crossReferenceCB.rows = item.rows;
    //   this.Compononent.crossReferenceCB.x = item.x;
    //   this.Compononent.crossReferenceCB.y = item.y;      
    // }
    // if( this.pickedComponent == "personalFavs" ){
    //   this.Compononent.personalFavsCB.cols = item.cols;
    //   this.Compononent.personalFavsCB.rows = item.rows;
    //   this.Compononent.personalFavsCB.x = item.x;
    //   this.Compononent.personalFavsCB.y = item.y;      
    // }
    // if( this.pickedComponent == "chatHistory" ){
    //   this.Compononent.chatHistoryCB.cols = item.cols;
    //   this.Compononent.chatHistoryCB.rows = item.rows;
    //   this.Compononent.chatHistoryCB.x = item.x;
    //   this.Compononent.chatHistoryCB.y = item.y;      
    // }
    // if( this.pickedComponent == "calendar" ){
    //   this.Compononent.calendarCB.cols = item.cols;
    //   this.Compononent.calendarCB.rows = item.rows;
    //   this.Compononent.calendarCB.x = item.x;
    //   this.Compononent.calendarCB.y = item.y;      
    // }
    // if( this.pickedComponent == "mp3" ){
    //   this.Compononent.mp3TabCB.cols = item.cols;
    //   this.Compononent.mp3TabCB.rows = item.rows;
    //   this.Compononent.mp3TabCB.x = item.x;
    //   this.Compononent.mp3TabCB.y = item.y;      
    // }
    // if( this.pickedComponent == "Pdf" ){
    //   this.Compononent.pdfQuotesTabCB.cols = item.cols;
    //   this.Compononent.pdfQuotesTabCB.rows = item.rows;
    //   this.Compononent.pdfQuotesTabCB.x = item.x;
    //   this.Compononent.pdfQuotesTabCB.y = item.y;      
    // }
    // if( this.pickedComponent == "barnaStats" ){
    //   this.Compononent.barnaStatisticsCB.cols = item.cols;
    //   this.Compononent.barnaStatisticsCB.rows = item.rows;
    //   this.Compononent.barnaStatisticsCB.x = item.x;
    //   this.Compononent.barnaStatisticsCB.y = item.y;      
    // }
    localStorage.setItem('chatComponent', JSON.stringify(this.Compononent));

  }








  componentPicked(e: any) {
    // console.log(e.target.outerText)
    console.log(e)
    // console.log(e.target.id)
    this.pickedComponent = e
  }

  data: any =
    [
      {
        "parentName": "Navigation Panel",
      },
    ];
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

  movetoLs: any = []

  toggleVisibility(pramId: any) {
    console.log(pramId)
    // let fias = this.Compononent.find((x :any)=> x.widget === pramId)
    // console.log(fias);
    let selectedComp = this.Compononent.find((obj: any) => obj.widget === pramId).is_active = !this.Compononent.find((obj: any) => obj.widget === pramId).is_active
    let ObjinArray = this.Compononent.find((x: any) => x.widget === pramId)
    console.log(ObjinArray);
    console.log(selectedComp)
    if (selectedComp == false) {
      this.spliceObjectfromArray(pramId)
      // this.movetoLs.push(ObjinArray)
      // console.log(this.movetoLs)
    }

    // this.Compononent[]











    // oldcode starts
    //     if (pramId == "chatQueueCB") {
    //       this.Compononent.chatQueueCB.is_active = !this.Compononent.chatQueueCB.is_active
    //       // console.log(this.chatQueueCB)
    //       // this.toggleSideMenu.emit({param : 'chatQueueCB',status : this.chatQueueCB})
    //     }
    //     if (pramId == "workareaCB") {
    //       this.Compononent.workareaCB.is_active = !this.Compononent.workareaCB.is_active;
    //       // this.toggleSideMenu.emit({param : 'workareaCB',status : this.workareaCB})
    //     }
    //     if (pramId == "bibleCB") {
    //       this.Compononent.bibleCB.is_active = !this.Compononent.bibleCB.is_active;

    //       // this.bibleCB = !this.bibleCB;
    //       // this.toggleSideMenu.emit({param : 'bibleCB',status : this.bibleCB})
    //     }
    //     if (pramId == "WorkAreaNotesCB") {
    //       this.Compononent.WorkAreaNotesCB.is_active = !this.Compononent.WorkAreaNotesCB.is_active;

    //       // this.WorkAreaNotesCB = !this.WorkAreaNotesCB;
    //       // this.toggleSideMenu.emit({param : 'WorkAreaNotesCB',status : this.WorkAreaNotesCB})
    //     }
    //     if (pramId == "strongsCB") {
    //       this.Compononent.strongsCB.is_active = !this.Compononent.strongsCB.is_active;
    //       // this.strongsCB = !this.strongsCB;
    //       // this.toggleSideMenu.emit({param : 'strongsCB',status : this.strongsCB})
    //     }
    //     // // if (pramId == "lustdecent") {
    //     // //   this.lustdecent = !this.lustdecent;
    //     // // }
    //     if (pramId == "crossReferenceCB") {
    //       this.Compononent.crossReferenceCB.is_active = !this.Compononent.crossReferenceCB.is_active;
    //       // this.crossReferenceCB = !this.crossReferenceCB;
    //       // this.toggleSideMenu.emit({param : 'crossReferenceCB',status : this.crossReferenceCB})
    //     }
    //     if (pramId == "personalFavsCB") {
    //       this.Compononent.personalFavsCB.is_active = !this.Compononent.personalFavsCB.is_active;

    //       // this.personalFavsCB = !this.personalFavsCB;
    //       // this.toggleSideMenu.emit({param : 'personalFavsCB',status : this.personalFavsCB})
    //     }
    //     if (pramId == "chatHistoryCB") {
    //       this.Compononent.chatHistoryCB.is_active = !this.Compononent.chatHistoryCB.is_active;

    //       // this.chatHistoryCB = !this.chatHistoryCB;
    //       // this.toggleSideMenu.emit({param : 'chatHistoryCB',status : this.chatHistoryCB})
    //     }
    //     if (pramId == "calendarCB") {
    //       this.Compononent.calendarCB.is_active = !this.Compononent.calendarCB.is_active;

    //       // this.calendarCB = !this.calendarCB;
    //       // this.toggleSideMenu.emit({param : 'calendarCB',status : this.calendarCB})
    //     }
    //     if (pramId == "pdfQuotesTabCB") {
    //       this.Compononent.pdfQuotesTabCB.is_active = !this.Compononent.pdfQuotesTabCB.is_active;

    //       // this.pdfQuotesTabCB = !this.pdfQuotesTabCB;
    //       // this.toggleSideMenu.emit({param : 'pdfQuotesTabCB',status : this.pdfQuotesTabCB})
    //     }
    //     if (pramId == "barnaStatisticsCB") {
    //       this.Compononent.barnaStatisticsCB.is_active = !this.Compononent.barnaStatisticsCB.is_active;

    //       // this.barnaStatisticsCB = !this.barnaStatisticsCB;
    //       // this.toggleSideMenu.emit({param : 'barnaStatisticsCB',status : this.barnaStatisticsCB})
    //     }
    //     if (pramId == "mp3TabCB") {
    //       this.Compononent.mp3TabCB.is_active = !this.Compononent.mp3TabCB.is_active;

    //       // this.mp3TabCB = !this.mp3TabCB;
    //       // this.toggleSideMenu.emit({param : 'mp3TabCB',status : this.mp3TabCB})
    //     }


    //     oldcode ends
    localStorage.setItem('chatComponent', JSON.stringify(this.Compononent));

  }

  spliceObjectfromArray(param: any) {
    //  let objtoSlice = this.movetoLs.find((x:any)=> x.widget === param.widget);
    //  console.log(objtoSlice)
    //  if(objtoSlice != undefined){
    //   const index: number = this.movetoLs.indexOf(param);
    //   if (index !== -1) {
    //        this.movetoLs.splice(index, 1);
    //       // console.log(index)
    //   }
    //  }
    let objtoSlice = this.Compononent.find((x: any) => x.widget === param);
    objtoSlice.is_active = false;
    objtoSlice.x = 0;
    objtoSlice.y = 0;
    localStorage.setItem('chatComponent', JSON.stringify(this.Compononent));
  }


  navigate(route: any) {
    this.router.navigateByUrl(route)

  }


  // chatqueueInputForrefresh : number = 0;

  //   chatQueueOutput = {
  //     chatcom: (e: any) => {
  //       console.log(e)
  //       this.Compononent[0].is_active = e.status;
  //      localStorage.setItem('chatComponent' , JSON.stringify(this.Compononent));
  //     },
  //     chatQueuePath:(e:any) => {

  //       this.chatqueueInputForrefresh = e + this.chatqueueInputForrefresh;
  //       console.log(this.chatqueueInputForrefresh)
  //     }
  //   }
  //   workAreaOutput(e:any){
  //     this.Compononent[1].is_active = e;
  //      localStorage.setItem('dashBoardComponent' , JSON.stringify(this.Compononent));
  //  }
  //   // workAreaOutput ={
  //   //   workAreaoutput:(e:any) => {
  //   //     this.Compononent[1].is_active = e;
  //   //     localStorage.setItem('chatComponent' , JSON.stringify(this.Compononent));
  //   //   }
  //   // }

  //   workAreaNotesOutput = {
  //     wrokAreaNotes : (e:any) => {
  //       this.Compononent[3].is_active = e;      
  //       localStorage.setItem('chatComponent' , JSON.stringify(this.Compononent));
  //     }
  //    }

  //    addedToWorkAreainput:number=0;

  //    bibleOutput = {
  //     isbiblecom : (e:any) => {
  //       this.Compononent[2].is_active = e;      
  //       localStorage.setItem('chatComponent' , JSON.stringify(this.Compononent));
  //     },
  //     addedToWorkArea:(e:any) => {

  //       this.addedToWorkAreainput = e + this.addedToWorkAreainput ;
  //       console.log(this.addedToWorkAreainput)

  //     }
  //    }


 

  chatQueueOutput = {
    chatcom: (e: any) => {
      console.log(e)
      this.Compononent[0].is_active = e.status;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    },

    // chatQueuePath:(e : any) => {

    // }
  }

  
  workAreaOutput(e: any) {
    this.Compononent[1].is_active = e;
    localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
  }

  workAreaNotesOutput = {
    wrokAreaNotes: (e: any) => {
      this.Compononent[3].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    }
  }


  addedToWorkAreainput: number = 0;


  bibleOutput = {
    isbiblecom: (e: any) => {
      this.Compononent[2].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    },
    addedToWorkArea: (e: any) => {
      this.addedToWorkAreainput = e + this.addedToWorkAreainput;
      console.log(this.addedToWorkAreainput)
    },
    bibleVerseOutput: (e: any) => {
      this.Compononent[4].is_active = e;
    },
    openCrossRef: (e: any) => {
      this.Compononent[5].is_active = e
    }
  }

  strongsOutput = {
    thistrong: (e: any) => {
      this.Compononent[4].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    }
  }

  crossCompOutput = {
    crossComp: (e: any) => {
      this.Compononent[5].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    },
    addedToWorkArea: (e: any) => {
      this.addedToWorkAreainput = e + this.addedToWorkAreainput;
      console.log(this.addedToWorkAreainput)
    },
  }

  personalFavsOutput = {
    personalFavs: (e: any) => {
      this.Compononent[6].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    }
  }

  chatHistoryOutput = {
    chathistory: (e: any) => {
      this.Compononent[7].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    }
  }

  calendarOutput = {
    thiscalandercom: (e: any) => {
      this.Compononent[8].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    }
  }

  mp3Output = {
    mp3Comp: (e: any) => {
      this.Compononent[9].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    },
    mp3ClipsOutput: (e: any) => {
      this.addedToWorkAreainput = e + this.addedToWorkAreainput;
      console.log(this.addedToWorkAreainput)
    }

  }

  pdfOutput = {
    pdfComp: (e: any) => {
      this.Compononent[10].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    },
    pdfQutoesOutput: (e: any) => {
      console.log("pdfoutput")
      this.addedToWorkAreainput = e + this.addedToWorkAreainput;
    }
  }

  barnastaticsthis = {
    barnaComp: (e: any) => {
      this.Compononent[11].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    }
  }

  // barnaOutput = {
  //   barnaComp: (e: any) => {
  //     this.Compononent[11].is_active = e;
  //     localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
  //   }
  // }

  //  chatoutput(e:any){
  //   this.Compononent[12].is_active = e.status;
  //   localStorage.setItem('chatComponent' , JSON.stringify(this.Compononent));

  //  }

  
  collapsetoggle() {
    this.iscollapsed = !this.iscollapsed
  }

  changeLocation(e: Event) {
    console.log(e)
  }

  toggleSidebar() {
    this.iscollapsed = !this.iscollapsed
  }

}

