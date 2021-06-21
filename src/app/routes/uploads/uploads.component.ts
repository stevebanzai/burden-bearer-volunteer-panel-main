import { Component, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  SelectedVersion:any;
  SelectedTestament: any ;
  book:any
  chapter:any
  chaptersInBook:any= [];
  pdfLabel : any
  volunteerId : any

  uploadPdfTab: boolean = false
  uploadMP3Tab :boolean = false;

  constructor(private router : Router, private apiService : AuthService) {
    this.volunteerId = localStorage.getItem("father_id")

   }

  ngOnInit(): void {
  }

  navigate(route:any){
    this.router.navigateByUrl(route)

  }


  
  openCity(Tab:any) {
    if(Tab == 'uploadPdf' ){
      this.uploadPdfTab = true
      this.uploadMP3Tab = false;
    }else{
      this.uploadMP3Tab = true;
      this.uploadPdfTab = false;
    }

  }


  allbibleBooks:any
  getbiblebooks(){
    this.apiService.getBibleBooksChapters(this.SelectedTestament).subscribe(data=>{
    this.allbibleBooks = data  
    console.log(this.allbibleBooks)
    })
  }


  SelectedBookChapters(){
        console.log(this.book)
        this.chaptersInBook =[]
        this.chapter = undefined
       let selectedBook = this.allbibleBooks.find((x: any) => x.BOOK_ABBR == this.book );
        

        for(let i = 0 ; i < selectedBook.CHAPTER_COUNT ; i ++){
            this.chaptersInBook.push(i+1)
        }

  }

  fileToUpload :any

  fileChange(event:any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.fileToUpload = file
      


        // let headers = new Headers();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        // headers.append('Content-Type', 'multipart/form-data');
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(`${this.apiEndPoint}`, formData, options)
        //     .map(res => res.json())
        //     .catch(error => Observable.throw(error))
        //     .subscribe(
        //         data => console.log('success'),
        //         error => console.log(error)
        //     )
    }
}


Save(filetype : string){
if(this.fileToUpload != undefined && this.SelectedTestament != undefined && this.book != undefined && 
  this.chapter != undefined && this.volunteerId != undefined && this.pdfLabel != undefined
   && this.SelectedVersion != undefined ){

    let formData= new FormData();
  
   
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('BIBLE_VERSION', this.SelectedVersion);
    formData.append('TESTAMENT', this.SelectedTestament);
    formData.append('BOOK', this.book);
    formData.append('CHAPTER', this.chapter);
    formData.append('FATHER_ID', this.volunteerId);
    if(filetype == 'pdf'){
      console.log("pdfreached")
      formData.append('PDF_LABEL',this.pdfLabel);
       
     this.apiService.postFile(formData).subscribe(data=>{
      console.log(data)
      if(data=="1"){
        this.SelectedTestament = undefined,
        this.book = undefined
        this.chapter = undefined
        this.pdfLabel = undefined
        this.fileToUpload = undefined

        let msg = "uploaded";
        this.showAlert(msg, "green")
      }
    })
    }
    if(filetype == 'mp3'){
      console.log("mp3reached")
      formData.append('MP3_LABEL',this.pdfLabel);
       
     this.apiService.postMP3(formData).subscribe(data=>{
      console.log(data)
      if(data=="1"){
        this.SelectedTestament = undefined,
        this.book = undefined
        this.chapter = undefined
        this.pdfLabel = undefined
        this.fileToUpload = undefined

        let msg = "uploaded";
        this.showAlert(msg, "green")
      }
    })
    }
    
    // const body ={
    //   file : this.fileToUpload,
    //   TESTAMENT : this.SelectedTestament
    // }
  
    console.log(formData)
 
}


}


bgColor:any;
showMessageBox :boolean = false
message:any
showAlert(msg:any, bg : any){
  
  this.bgColor = bg
  // set showloader to true to show loading div on view
  this.showMessageBox   = true;
  this.message = msg
  setTimeout(()=> {
    this.showMessageBox = false;
  }, 1500);

}

iscollapsed = false
toggleSidebar(){
  this.iscollapsed = !this.iscollapsed
}
}
