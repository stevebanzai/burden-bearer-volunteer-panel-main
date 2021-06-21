import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.AUTH_API;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// const httpOptionspdf = {
//   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data','Accept':'application/json'})
// };
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SelectedJourneyItems: BehaviorSubject<any> = new BehaviorSubject({});
  SelectedStrong: BehaviorSubject<any> = new BehaviorSubject('');
  SelectedCrossRefData: BehaviorSubject<any> = new BehaviorSubject({});
  chatQueueSub: BehaviorSubject<any> = new BehaviorSubject('');
  AddtoworkAreaBibleVerse: BehaviorSubject<any> = new BehaviorSubject('');
  SelectedPesonalFavData: any;
  father = localStorage.getItem("name")
  constructor(private http: HttpClient) { }
  private headerSource = new BehaviorSubject(true);
  headerDisplay = this.headerSource.asObservable();

  headerFlag(message: boolean) {
    this.headerSource.next(message);
  }

  private pdfSource = new BehaviorSubject(false);
  pdfDisplay = this.pdfSource.asObservable();
  
  pdfFlag(message: boolean) {
    this.pdfSource.next(message);
  }

  private journeyDataSource = new BehaviorSubject(false);
  journeyDataDisplay = this.journeyDataSource.asObservable();
  
  journeyDataFlag(message: boolean) {
    this.pdfSource.next(message);
  }
  
  login(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', user, httpOptions);

  }

  getcountry(): Observable<any> {
    return this.http.post(AUTH_API + 'getcountry', {
      // schedule_date: user.schedule_date,
    }, httpOptions)
  }
  getstate(state: any): Observable<any> {
    return this.http.post(AUTH_API + 'getstate', state, httpOptions)
  }
  getcity(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'getcity', {
      state_id: user.state_id,
    }, httpOptions)
  }
  SaveWorkareaNotes(worknotes: any): Observable<any> {
    console.log(worknotes);
    console.log(worknotes.Date_Time);
    return this.http.post(AUTH_API + 'workareanote', {
      Notes: worknotes.Notes,
      UserName: worknotes.UserName,
      Date_Time: worknotes.Date_Time,
      father_id: worknotes.father_id


    }, httpOptions);

  }
  getworkareanotes(): Observable<any> {
    return this.http.post(AUTH_API + 'getworkareanote', {
    }, httpOptions)
  }
  schedule(schedule: any): Observable<any> {
    return this.http.post(AUTH_API + 'schedule', {
      schedule_date: schedule.schedule_date,
      father_id: schedule.father_id,
      comments: schedule.comments,
      schedule_time: schedule.schedule_time,
      schedule_name: schedule.schedule_name,
      schedule_email: schedule.schedule_email,
      SCHEDULED_USERID: schedule.SCHEDULED_USERID
    }, httpOptions);
  }

  search(scheduledate: any, father_id: any): Observable<any> {
    return this.http.post(AUTH_API + 'schedulesearch', {
      schedule_date: scheduledate,
      father_id: father_id
    }, httpOptions)
  }

  fetchBibleData(param: any, book: string, pageCountSchema: any, recordlist: any): Observable<any> {


    return this.http.post(AUTH_API + 'fetchBibleData', {
      query: param,
      bible: book,
      page_count: recordlist
    }, httpOptions);
  }

  fetchStrongData(strong: any, bible: any, page_limit: any): Observable<any> {
    console.log(strong + " " + bible);
    return this.http.post(AUTH_API + 'fetchStrongData', {
      strong: strong,
      bible: bible,
      page_count: page_limit
    }, httpOptions);
  }

  fetchCroessData(version: any, value: any) {
    console.log(version + "  " + value);
    return this.http.post(AUTH_API + 'fetchCroessData', {
      version: version,
      value: value
    }, httpOptions);
  }
  deleteWorkAreaNote(id: any): Observable<any> {
    return this.http.delete(`${AUTH_API + 'deteteworkareanotes'}/${id}`);
  }
  deleteallWorkAreaNote(): Observable<any> {
    return this.http.delete(AUTH_API + 'workdeleteAll');
  }
  // updateWorkAreaNote(id: any, data: any): Observable<any> {
  //   return this.http.put(`${AUTH_API + 'updateworkareanote'}/${id}`, data);
  // }
  updateWorkAreaNote(id: any, data: any): Observable<any> {
    const body = {
      id: id,
      formData: data
    }

    return this.http.post(AUTH_API + 'updateworkareanote', body);
  }
  getBible(testament: any, version: any, book: any, chapter: any, recordlimit: any) {
    const body = {
      // type: version,
      // book: book,
      // chapter: chapter,
      main: version,
      testament: testament,
      division: book,
      chapter_no: chapter
    }
    console.log(body)
    return this.http.post(AUTH_API + 'GetAllBible', body, httpOptions);
  }
  getStrong(body: any) {

    return this.http.post(AUTH_API + 'Strongcode', body, httpOptions);
  }
  //chatdetail
  getLiveChatDetail(room: any) {
    return this.http.post(AUTH_API + 'liveChatDetail', {
      ROOM_ID_FK: room
    }, httpOptions);
  }
  GetAllActiveChats() {
    return this.http.get(AUTH_API + 'GetAllActiveChats', httpOptions);
  }
  GetAllChats() {
    return this.http.get(AUTH_API + 'GetAllChats', httpOptions);
  }
  updateChatStatus(id: any, CHAT_STATUS: any, pastorId: any) {
    return this.http.post(AUTH_API + 'updateChatStatus' + "/" + id + "/" + CHAT_STATUS + "/" + pastorId,
      httpOptions)
  }
  getRoomDetails(): Observable<any> {
    return this.http.get(AUTH_API + 'roomdetails', {
    });
  }

  fetchVerse(version: any, code: any, page_limit: any) {
    return this.http.post(AUTH_API + 'GetAllStrong', {
      code: code,
      version: version,
      page_limit: page_limit
    })
  }
  getstrong(verse: any) {
    return this.http.post(AUTH_API + 'GetAllStrong', {
      verse: verse
    })
  }
  searchbysender(sender_id: any) {
    return this.http.post(AUTH_API + 'searchbysender', {
      sender_id: sender_id
    })
  }
  // allsearchCalender() {
  //   return this.http.post(AUTH_API + 'SeachBycalender', {
  //   })
  // }
  // pafupload(formData: any) {
  //   return this.http.post(AUTH_API + 'upload', {
  //     formData: formData
  //   })
  // }
  workarealist(father_id: any) {
    return this.http.get(AUTH_API + 'getworkareaList/' + father_id, httpOptions)
  }
  workArea(body: any) {

    return this.http.post(AUTH_API + 'saveWorkareaTexts', body, httpOptions)
  }
  WorkAreadelete(id: any): Observable<any> {
    return this.http.delete(`${AUTH_API + 'deleteworkarea'}/${id}`);
  }
  PersonalFav(verse: any, meaning: any, father_id: any) {
    return this.http.post(AUTH_API + 'personalfav', {
      verse: verse,
      meaning: meaning,
      father_id: father_id
    }, httpOptions)
  }
  PersonalFavlist(father_id: any) {
    return this.http.post(AUTH_API + 'getpersonalfav', {
      father_id: father_id
    }, httpOptions)
  }
  PersonalFavdelete(id: any): Observable<any> {
    return this.http.delete(`${AUTH_API + 'deletepersonalfav'}/${id}`);
  }
  Journey(verse: any, meaning: any, father_id: any) {
    return this.http.post(AUTH_API + 'journey', {
      verse: verse,
      meaning: meaning,
      father_id: father_id
    }, httpOptions)
  }
  Journeylist(father_id: any) {
    return this.http.post(AUTH_API + 'journeylist', {
      father_id: father_id
    }, httpOptions)
  }
  Journeydelete(id: any): Observable<any> {
    return this.http.delete(`${AUTH_API + 'deletejourney'}/${id}`);
  }
  closechat(chat: any) {
    console.log(chat)
    return this.http.post(AUTH_API + 'closeChat', chat
      // {
      //   ROOM_ID: chat.ROOM_ID,
      //   CHAT_STATUS: chat.CHAT_STATUS,
      //   CHAT_COMMENT: chat.CHAT_COMMENT,
      //   IS_FLAG: chat.IS_FLAG,
      //   FLAG_COMMENT: chat.FLAG_COMMENTS
      // }
      , httpOptions)
  }

  getSchedule(father_id: any): Observable<any> {
    return this.http.post(AUTH_API + 'getschedule', {
      father_id: father_id
    }, httpOptions)
  }


  getRoomData(roomId: any) {
    return this.http.get(AUTH_API + 'SingleRoomDetail/' + roomId, httpOptions)
  }


  saveJorney(body: any) {
    return this.http.post(AUTH_API + 'saveJourney', body, httpOptions)
  }

  allJourneyData(id: any) {
    return this.http.get(AUTH_API + 'getAllSavedJourneys/' + id)
  }

  postFile(form: any) {
    // const endpoint = 'your-destination-url';
    // console.log(fileToUpload)
    // const body ={
    //   filename :  uploadPdfname,
    //   Testament : uploadTestament,
    //   file: fileToUpload,
    //   book: uploadBook,
    //   chapter : uploadChapter

    // }


    // let file: File = fileToUpload;
    // let formData:FormData = new FormData();
    // formData.append('file', file, file.name);
    // let headers = new Headers();
    // const formData: FormData = new FormData();
    // formData.append('fileKey', fileToUpload, fileToUpload.name);
    // formData.append('testament', uploadTestament);
    // formData.append('book', uploadBook);
    // formData.append('chapter', uploadChapter);
    // formData.append('uploadName', uploadPdfname);
    // console.log(body)
    return this.http
      .post(AUTH_API + 'savePdf', form, {
        reportProgress: true,
        responseType: 'text'
      })
    // .subscribe(data => {
    //   console.log(data)
    // })
  }

  postMP3(form: any) {
    return this.http
      .post(AUTH_API + 'saveMp3', form, {
        reportProgress: true,
        responseType: 'text'
      })
  }

  getBibleBooksChapters(testamentName: any) {
    return this.http.get(AUTH_API + 'BibleBooksChapters/' + testamentName)
  }

  allChatRooms() {
    return this.http.get(AUTH_API + 'getAllChatRooms', httpOptions)
  }


  getPdfQuotes(version: string, testament: string, book: string, chapter: string, vol_id: string) {
    return this.http.get(AUTH_API + 'getPdf/' + version + "/" + testament + "/" + book + "/" + chapter + "/" + vol_id)
  }

  getMp3Clips(version: string, testament: string, book: string, chapter: string, vol_id: string) {
    return this.http.get(AUTH_API + 'getMp3/' + version + "/" + testament + "/" + book + "/" + chapter + "/" + vol_id)
  }


  getDispositionData(chat_id: string) {
    return this.http.get(AUTH_API + 'chatDispositionData/' + chat_id)

  }

  getAllCouncellors() {
    return this.http.get(AUTH_API + 'allCouncellors')
  }

  getcurrentDayAllChatRecords(cD: any, nD: any, vlntrID: any) {
    return this.http.get(AUTH_API + "getTodaysChat/" + cD + "/" + nD + "/" + vlntrID)
  }

  getFaggedchats(cD: any, nD: any) {
    return this.http.get(AUTH_API + 'flaggedChats/' + cD + "/" + nD)
  }


  getSelectedJourneydata(id: any, JRef: any) {
    return this.http.get(AUTH_API + 'selectedJourneyData/' + id + "/" + JRef)
  }

  RenameJourney(body: any) {
    console.log(body)
    // const config = new HttpHeaders().set('Content-Type', 'application/json')
    //                               .set('Accept', 'application/json')
    return this.http.post(AUTH_API + 'RenameJourney', body, httpOptions)
  }

  dublicateJourney(body: any) {
    return this.http.post(AUTH_API + 'duplicateJourney', body, httpOptions)
  }

  getSavedJourneys(father_id: any) {
    return this.http.get(AUTH_API + 'savedJourneyScriptures/' + father_id)

  }
  addToPersonalFav(body: any): Observable<any> {
    return this.http.post(AUTH_API + 'addpersonalfav', body, httpOptions);
  }
  PersonalFavList(father_id: any): Observable<any> {
    return this.http.get(AUTH_API + 'personalfavlist/' + father_id, httpOptions);
  }
  SavePersonalFavList(body: any): Observable<any> {
    console.log(body)
    return this.http.post(AUTH_API + 'SavePersonalFavList', body, httpOptions);
  }
  getPersonalFavList(father_id: any): Observable<any> {
    return this.http.get(AUTH_API + 'getPersonalFavListByFatherId/' + father_id, httpOptions);
  }
  getpersonalfavlistFather(father_id: any, personalFavRefId: any): Observable<any> {
    return this.http.get(AUTH_API + 'getpersonalFavByFather/' + father_id + "/" + personalFavRefId, httpOptions);
  }
  getUserList(): Observable<any> {
    return this.http.get(AUTH_API + 'userList/', httpOptions);
  }
  getTimeZoneList(): Observable<any> {
    return this.http.get(AUTH_API + 'getTimeZone/', httpOptions);
  }
  Search(body: any): Observable<any> {
    console.log(body)
    return this.http.post(AUTH_API + 'UserSearch', {
      body: body
    }, httpOptions);
  }
  getUserListByFatherId(father_id: any): Observable<any> {
    return this.http.get(AUTH_API + 'UserListByFatherId/' + father_id, httpOptions);
  }
  getSingalUserCharRecord(roomID: any): Observable<any> {
    return this.http.get(AUTH_API + 'SingalUserCharRecord/' + roomID, httpOptions);
  }
  getMessageListByRoomId(roomID: any, createdDate: any) {
    return this.http.get(AUTH_API + 'MessageListByRoomID/' + roomID + "/" + createdDate, httpOptions);
  }
  getinitialChat(roomId: any) {
    return this.http.get(AUTH_API + 'SingleRoomDetail/' + roomId)
  }
  getUserListByCountry(country_id: any) {

    return this.http.get(AUTH_API + 'UserListByCountry/' + country_id)
  }
  getUserListByState(state_id: any) {
    return this.http.get(AUTH_API + 'UserListByState/' + state_id)
  }
  updateChatIntialTime(object:any) {
    return this.http.post(AUTH_API + 'updateChatIntialTime',object)
  }
  
}


