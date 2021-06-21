import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-mp3pdfetc',
  templateUrl: './mp3pdfetc.component.html',
  styleUrls: ['./mp3pdfetc.component.css']
})
export class Mp3pdfetcComponent implements OnInit {
  @Output() thismp3pdfetc = new EventEmitter();
  toggleclosebtn() {
    this.thismp3pdfetc.emit(false);
  }
  isDisplay = false;
  showDelete = false
  SelectedJorney: any
  JourneyData: any
  JourneyMp3Pdf: any

  constructor(private auth: AuthService) {
    this.auth.pdfDisplay.subscribe(message => {
      console.log('isDisplay dpf', message);
      this.isDisplay = message;
    });
    this.auth.SelectedJourneyItems.subscribe(data => {
      this.SelectedJorney = data;
      this.JourneyMp3PdfData(this.SelectedJorney);
    })
  }

  ngOnInit(): void {
  }
  toggleDelete() {
    this.showDelete = !this.showDelete
  }

  JourneyMp3PdfData(journey: any) {
    this.auth.getSelectedJourneydata(journey.FATHER_ID, journey.id).subscribe(jD => {
      this.JourneyData = jD
      this.JourneyMp3Pdf = this.JourneyData.filter((x: any) => x.CONTENT_TYPE == 'mp3' || x.CONTENT_TYPE == 'pdf')
      // this.Journeypdf = this.JourneyData.filter((x:any) => x.CONTENT_TYPE == 'pdf' ) 

      console.log(this.JourneyMp3Pdf)
    })
  }

  deleteJourneyItem(script: any) {
    console.log(script)
    this.auth.WorkAreadelete(script.id).subscribe(data => {
      if (data.message == "Work area note  was deleted successfully!") {
        this.JourneyMp3PdfData(this.SelectedJorney)
      }

    })
  }


}
