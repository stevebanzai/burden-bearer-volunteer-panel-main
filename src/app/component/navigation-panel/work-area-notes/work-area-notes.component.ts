import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/app/service/auth.service';

import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-work-area-notes',
  templateUrl: './work-area-notes.component.html',
  styleUrls: ['./work-area-notes.component.css']
})
export class WorkAreaNotesComponent implements OnInit {

  father_id: any;
  isworkareanotes = true;
  registerForm: any;
  form: any = {};
  isSuccessful = false;
  WANArea = false
  // isSignUpFailed = false;
  errorMessage = '';
  @Output() wrokAreaNotes = new EventEmitter();
  timeNow: Date = new Date();
  today = new Date();
  todaysDataTime: any;
  min_date: any;
  worklist: any;
  ActiveEdit: any;
  submitted = false;
  showMessageBox = false
  updatingWorkNote = false
  selectedNoteForUpdate: any

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private dom: DomSanitizer) {
    setInterval(() => {
      this.timeNow = new Date();
      this.form.Date_Time = formatDate(this.today, 'dd/MM hh:mm:ss a', 'en-US', '+0530');
    }, 1);

  }

  ngOnInit() {
    this.father_id = localStorage.getItem("father_id");
    console.log(this.father_id);
    this.getWorkAreaNotes();
  }

  getWorkAreaNotes() {
    this.authService.getworkareanotes().subscribe(
      data => {
        this.worklist = data
        console.log(this.form);
        console.log(data)
      },
      err => {
      });
  }


  config: AngularEditorConfig = {

    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

    toolbarHiddenButtons: [[
      'undo',
      'redo',
      'text-color',
      'background-color',
      'underline',
      'subscript',
      'superscript',
      'indent',
      'video',
      'outdent',
      'heading',
      'fontName',
      'block'
    ], [
      'fontSize',
      'textColor',
      'backgroundColor',
      'customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
      'toggleEditorMode'
    ]
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],

  };


  get f() { return this.registerForm.controls; }


  onSubmit() {

    //  const displayString= this.dom.bypassSecurityTrustHtml(this.form.Notes);
    //  console.log(displayString)
    this.submitted = true
    this.form.father_id = this.father_id;
    this.form.Date_Time = this.todaysDataTime;

    console.log(this.father_id);

    this.authService.SaveWorkareaNotes(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.form.UserName = "";
        this.form.Notes = "";
        let msg = "Note added successfully..!!"
        this.showAlert(msg, '#87dc34')
        this.getWorkAreaNotes()
        //  this.isSignUpFailed = false;

      },
      err => {
        this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }
  toggleclose() {
    this.wrokAreaNotes.emit(false);
  }
  message: any;

  deleteworknote(id: any): void {
    // alert(id);
    this.updatingWorkNote = false
    this.authService.deleteWorkAreaNote(id)
      .subscribe(
        response => {
          console.log(response);
          this.getWorkAreaNotes();
          let msg = 'The work area notes was delete successfully!';
          this.showAlert(msg, '#fd2626')

        },
        error => {
          console.log(error);
        });
  }

  updateWorkAreaNotes(workid: any, index: any): void {
    console.log(workid)
    this.ActiveEdit = index;
    this.selectedNoteForUpdate = this.worklist.find((x: any) => x.id == workid);
    this.updatingWorkNote = true;
    this.message = "updating " + this.selectedNoteForUpdate.UserName
    this.bgColor = "yellow";
    this.form.Notes = this.selectedNoteForUpdate.Notes;
    this.form.UserName = this.selectedNoteForUpdate.UserName
    this.form.Date_Time = this.todaysDataTime
    console.log(this.selectedNoteForUpdate)

  }

  saveUpdatedWorkAreaNote() {
    console.log(this.form)
    this.authService.updateWorkAreaNote(this.selectedNoteForUpdate.id, this.form)
      .subscribe(
        response => {
          if (response == 1) {
            console.log(response);
            let msg = 'The work area was updated successfully!';
            this.showAlert(msg, 'yellow');
            this.updatingWorkNote = false;
            this.form.Notes = "";
            this.getWorkAreaNotes()
          }


        },
        error => {
          console.log(error);
        });
  }

  toggleWAN() {
    this.WANArea = !this.WANArea
  }

  bgColor: any;
  showAlert(msg: any, bg: any) {

    this.bgColor = bg
    // set showloader to true to show loading div on view
    this.showMessageBox = true;
    this.message = msg
    setTimeout(() => {
      this.showMessageBox = false;
    }, 1500);

  }

  cancelUpdate() {
    this.ActiveEdit = null;
    this.updatingWorkNote = false;
    this.form.Notes = ""
    this.form.UserName = ""
  }

}
