import {Component, OnInit} from '@angular/core';
import {DataStorageService} from './services/dataStorageService';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'overtime-frontend';
  isLoading: BehaviorSubject<boolean>;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    this.isLoading = this.dataStorageService.isServiceLoading;
    // this.service.fetchAllRecords();
    // this.service.fetchTotalDays();
    // this.service.fetchTotalHours();
    this.dataStorageService.getAllRecords().pipe(take(1)).subscribe();
    this.dataStorageService.getAllRecordsDates().pipe(take(1)).subscribe();
  }
}
