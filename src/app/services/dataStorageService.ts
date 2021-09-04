import {HttpClient} from '@angular/common/http';
import {RecordHours} from '../models/record';
import {take, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
   //private rootURL = 'http://localhost:5000/';
  private rootURL = 'https://overtimehoursbe.eu-gb.mybluemix.net/';
  allRecords: RecordHours[] = [];
  totalHours: number;
  totalDays: number;
  allAvailableDates: string[] = [];
  existingRecord: RecordHours;
  isServiceLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  public addRecord(recordToBeAdded: RecordHours): Observable<any> {
    this.isServiceLoading.next(true);
    return this.http.post(this.rootURL + 'records/create', recordToBeAdded).pipe(tap(() => {
      this.isServiceLoading.next(false);
      }
    ));
  }

  public updateRecord(updatedRecord: RecordHours): Observable<any> {
    this.isServiceLoading.next(true);
    return this.http.post(this.rootURL + 'records/update', updatedRecord).pipe(tap(() => {
        this.isServiceLoading.next(false);
      }
    ));
  }

  public removeRecord(dateOfRecordToBeDeleted: string): Observable<any> {
    return this.http.delete(this.rootURL + 'records/delete/' + dateOfRecordToBeDeleted);
  }

  getAllRecords(): Observable<RecordHours[]> {
    this.isServiceLoading.next(true);
    return this.http.get<RecordHours[]>(this.rootURL + 'records/all').pipe(tap(records => {
      this.allRecords = records;
      this.isServiceLoading.next(false);
    }));
  }

  getTotalHours(): Observable<number> {
    this.isServiceLoading.next(true);
    return this.http.get<number>(this.rootURL + 'records/hours').pipe(tap(totalHours => {
        this.totalHours = totalHours;
        this.isServiceLoading.next(false);
      }
    ));
  }

  getTotalDays(): Observable<number> {
    this.isServiceLoading.next(true);
    return this.http.get<number>(this.rootURL + 'records/days').pipe(tap(totalDays => {
        this.totalDays = totalDays;
        this.isServiceLoading.next(false);
      }
    ));
  }

  getAllRecordsDates(): Observable<any>  {
    this.isServiceLoading.next(true);

    return this.http.get<string[]>(this.rootURL + 'records/dates').pipe(tap(dates => {
      this.allAvailableDates = dates;
      this.isServiceLoading.next(false);
    }));
  }

  public fetchRecordByDate(date: string): any {
    return this.http.get<RecordHours>(this.rootURL + 'records/date/' + date).pipe(take(4)).subscribe(returnedRecord => {
      if (returnedRecord != null) {
        this.existingRecord = returnedRecord;
      }
    });
  }
}

