import { DatePipe, formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { AuthService } from 'src/app/service/auth.service';
import { PositionsService } from 'src/app/service/positions.service';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.css']
})
export class FlagsComponent implements OnInit {
  isflag = true;
  @Output() thisflag = new EventEmitter<boolean>();
  userlist: any;
  countryList: any;
  ChatFlagFrom: FormGroup | undefined;
  stateList: any;
  zoneList: any;
  options: any;
  country = '';
  state = '';
  dashboard: Array<GridsterItem> = []
  loaded = false;

  @Input('width') public width: number | undefined;
  @Input('height') public height: number | undefined;
  @Input('left') public left: number | undefined;
  @Input('top') public top: number | undefined;
  currentDateTime: any;
  chatEndDate?: string;
  toggleclosebtn() {
    this.isflag = !this.isflag;
    this.thisflag.emit(this.isflag);
  }
  countryId = '';
  constructor(private datePipe: DatePipe, private posServ: PositionsService, private authService: AuthService, private formBuilder: FormBuilder) {
    this.ChatFlagFrom = this.formBuilder.group({
      username: ['', Validators.required],
      status: ['', Validators.required],
      country: [this.countryId, Validators.required],
      state: ['', Validators.required],
      startMonth: ['', Validators.required],
      endMonth: ['', Validators.required],
      TimeZone: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required],
    });
    // setInterval(() => {
    //   this.timeNow = new Date();
    // }, 1);
  }
  ngOnInit() {
    this.getAllChatRooms();
    this.getuserList(this.ChatFlagFrom?.value.country);
    this.getCountryList();
    // this.seletCounty();
    this.chatEndDate = '';
    this.options = {
      setGridSize: true,
      gridType: 'verticalFixed',
      fixedRowHeight: 100,
      minRows: 1,
      maxRows: 100,
      minItemRows: 1,
      maxItemRows: 10,
      defaultItemRows: 2,
      minCols: 1,
      maxCols: 12,
      maxItemCols: 12,
      minItemCols: 2,
      defaultItemCols: 2,
      maxItemArea: 250,
      minItemArea: 1,
      swap: true,
      displayGrid: 'onDrag&Resize',
      compactType: 'compactUp', 
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
  isShown: boolean = false; // hidden by default

  toggleShow() {
    this.isShown = !this.isShown;
  }
  

  allChatRooms: any
  getAllChatRooms() {
    this.authService.allChatRooms().subscribe(data => {
      console.log(data)
      this.allChatRooms = data;

    })
  }

  @Output() roomDetails: any = new EventEmitter()

  getchat(room: number) {
    console.log(room)
    this.roomDetails.emit(room)
  }

  //shanu
  getuserList(id = '') {
    if(id == ''){
      this.authService.getUserList().subscribe(data => {
        this.userlist = data;
        console.log(this.userlist)
      })
      }else {
        this.authService.getUserListByCountry(id).subscribe(data => {
          this.userlist = data;
        })
      }
  }
  getCountryList() {
    this.authService.getcountry().subscribe(data => {
      let obj = data.find(function (element: any) {
        if(element.country_name == 'United States') {
          return  element.id;
        }
      });
      console.log('manish getCountryList', obj.id);
      this.countryId = obj.id;
      this.ChatFlagFrom?.controls['country'].setValue(this.countryId);
      this.countryList = data;
      this.getuserList(this.ChatFlagFrom?.value.country);
      this.seletCounty();
    });
  }
  seletCounty() {
    console.log('manish data seletCounty',this.countryId)
    const body = {
      country_id: parseInt(this.ChatFlagFrom?.value.country)
    }
    this.authService.getstate(body).subscribe(data => {
      this.stateList = data;
      this.getuserList(this.ChatFlagFrom?.value.country);
    });
  }
  //get statte by 
  seletedState() {
    this.authService.getUserListByState(this.ChatFlagFrom?.value.state).subscribe(data => {
      this.userlist = data;
    })
  }
  reset() {
    this.ChatFlagFrom?.patchValue({
      username: '',
      startMonth: '',
      endMonth: '',
      fromTime: '',
      toTime: '',
      status: ''
    })
  }
  onSubmit() {
    const body = {
      PASTOR_ID: this.ChatFlagFrom?.value.username,
      CHAT_INIT_DATE:this.ChatFlagFrom?.value.startMonth,
      updatedAt: this.ChatFlagFrom?.value.endMonth,
      FIRST_CHAT_TIME: this.ChatFlagFrom?.value.fromTime,
      LAST_MESSAGE_TIME: this.ChatFlagFrom?.value.toTime,
      CHAT_STATUS: this.ChatFlagFrom?.value.status,
      country:this.ChatFlagFrom?.value.country
    }
    this.authService.Search(body).subscribe(data => {
      this.allChatRooms = data;

      console.log(data);
    })
  }
  getTime(room:any) {
    return 1;
  }
}


