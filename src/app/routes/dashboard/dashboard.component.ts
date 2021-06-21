import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridsterConfig, GridsterItem, CompactType, GridsterItemComponentInterface } from 'angular-gridster2';
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
import { UserListComponent } from 'src/app/component/user-list/user-list.component';
// import { ReportsmetricsComponent } from 'src/app/component/reportsmetrics/reportsmetrics.component';
import { VolunteerregistrationComponent } from 'src/app/component/volunteerregistration/volunteerregistration.component';

import { PositionsService } from 'src/app/service/positions.service';
import { DashboardService } from 'src/app/service/positionservice/dashboard.service';
// app-user-list
declare var $el: JQuery;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  iscollapsed = false;
  route: any
  positionLs: any
  pickedComponent: any;

  options?: GridsterConfig;
  loaded = false;
  dashboard: Array<GridsterItem> = [];


  component1 = ChatQueueComponent;
  // component2 = ChatComponent;
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
  component18 = UserListComponent;


  Compononent: any = []
  constructor(private positionServc: PositionsService, private router: Router) {
    if (localStorage.getItem('dashBoardComponent') == null || localStorage.getItem('dashBoardComponent') == undefined) {
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
        rows: 4,
        cols: 6,
      },
      {
        widget: "bibleCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 4,
        cols: 6,
      },
      {
        widget: "WorkAreaNotesCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 5,
        cols: 6,
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
        rows: 5.7,
        cols: 6,
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
        rows: 5,
        cols: 5,
      },
      {
        widget: "userListCB",
        is_active: false,
        x: 0,
        y: 0,
        rows: 7,
        cols: 10,
      },
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
    this.positionLs = localStorage.getItem('dashBoardComponent');
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




    
    localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));

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







    localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));

  }

  spliceObjectfromArray(param: any) {
   
    let objtoSlice = this.Compononent.find((x: any) => x.widget === param);
    objtoSlice.is_active = false;
    objtoSlice.x = 0;
    objtoSlice.y = 0;
    localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
  }


  navigate(route: any) {
    this.router.navigateByUrl(route)

  }


  chatQueueOutput = {
    chatcom: (e: any) => {
      console.log(e)
      this.Compononent[0].is_active = e.status;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    }
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
      console.log('manish isbiblecom')
      this.Compononent[2].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    },
    addedToWorkArea: (e: any) => {
      console.log('manish addedToWorkArea')
      this.addedToWorkAreainput = e + this.addedToWorkAreainput;
      console.log(this.addedToWorkAreainput)
    },
    bibleVerseOutput: (e: any) => {
      console.log('manish bibleVerseOutput', e)
      this.Compononent[4].is_active = e;
    },
    openCrossRef: (e: any) => {
      console.log('manish openCrossRef', e)
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
  userlistthis = {
    userListComp: (e: any) => {
      this.Compononent[12].is_active = e;
      localStorage.setItem('dashBoardComponent', JSON.stringify(this.Compononent));
    }
  }


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
