import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-personal-favs',
  templateUrl: './personal-favs.component.html',
  styleUrls: ['./personal-favs.component.css']
})
export class PersonalFavsComponent implements OnInit {
  isparsonalfav = true;
  @Output() personalFavs = new EventEmitter();
  father_id: any;
  list: any;
  message: any;
  saveNewTopic: boolean = false;
  saveinPreviousTopic: boolean = false;
  personalfavFrom: FormGroup | undefined;
  favlist: any;
  selectedTerm:any;
  step =0;
  constructor(private authservice: AuthService, private formBuilder: FormBuilder,) {
    this.personalfavFrom = this.formBuilder.group({
      term: ['', Validators.required],
      relatedTerm: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.personalfavlist()
    this.PersonalFavList()
  }

  public show: boolean = false;
  public buttonName: any = 'Show';
  isShowDiv = false;
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;

  }
  toggleclose() {
    //  this.isparsonalfav = !this.isparsonalfav;
    this.personalFavs.emit(false);
  }
  personalfavlist() {
    this.father_id = localStorage.getItem("father_id")
    this.authservice.PersonalFavList(this.father_id).subscribe((data) => {
      console.log(data)
      this.list = data;
    })
  }

  // this.authservice.SelectedPesonalFavData=list.id
  personalfavdelete(id: any): void {
    this.authservice.PersonalFavdelete(id).subscribe(
      response => {
        console.log(response);
        this.message = 'The work area notes was delete successfully!';
      },
      error => {
        this.message = 'NO Record Found!';
        console.log(error);
      });
  }
  isShown: boolean = false;
  toggleShow() {
    this.isShown = !this.isShown;
  }
  isShownbox: boolean = false;
  toggleShowbtn() {
    this.isShowDiv = !this.isShowDiv;
  }


  toggleSaveButton(param: any) {
    if (param == "new Save") {
      this.saveNewTopic = true
      this.saveinPreviousTopic = false;
    } else {
      this.saveNewTopic = false
      this.saveinPreviousTopic = true
    }

  }

  showSavingOptions: boolean = false
  toggleSaveOptions() {
    this.showSavingOptions = !this.showSavingOptions
  }

  onsubmit() {
    const body = {
      FATHER_ID: localStorage.getItem('father_id'),
      TERM: this.personalfavFrom?.value.term,
      RELATEDTERM: this.personalfavFrom?.value.relatedTerm,
      VERSE_COUNT: this.list.length,
    }
    this.authservice.SavePersonalFavList(body).subscribe(data => {
      console.log(data)
      if(data.status==1){
       
        this.message="Record Insert sccuccefully"
      }
      else if(data.status==2){
        this.message="Already Exits"
      }
      console.log(data)
      console.log(data);
    })
  }
  PersonalFavList() {
    const father_id = localStorage.getItem('father_id');
    this.authservice.getPersonalFavList(father_id).subscribe(data => {
      this.favlist = data;
      console.log(this.favlist);
    this.selectedTerm = this.favlist[this.step];
    })
  }
  onSelect(id: any) {
    localStorage.setItem('favid', id);
    const father_id = localStorage.getItem('father_id')
    this.authservice.getpersonalfavlistFather(father_id, id).subscribe(data => {
      this.list = data;
      console.log(data);
    })
  }
 

  changeTerm(step:any,id:any){
    const father_id = localStorage.getItem('father_id')
    this.authservice.getpersonalfavlistFather(father_id, id).subscribe(data => {
      this.list = data;
      console.log(data);
    })
    if(step==0){
 
      this.step--;
   
    } else   if(step==1){
      this.step++;
          }

          
    this.selectedTerm = this.favlist[this.step];
  }
}
