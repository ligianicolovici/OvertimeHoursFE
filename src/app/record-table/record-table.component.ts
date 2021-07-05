import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {PopUpComponent} from './pop-up/pop-up.component';
import {MatSort} from '@angular/material/sort';
import {formatDate} from '@angular/common';
import {DataStorageService} from '../services/dataStorageService';
import {take} from 'rxjs/operators';
import {RecordHours} from '../models/record';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'daybreak', 'dailyHours', 'deleteButton'];
  dataSource: MatTableDataSource<RecordHours>;
  records: RecordHours[];
  totalHours: number;
  totalDays: number;
  subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bottomSheet: MatBottomSheet, private dataStorageService: DataStorageService, private snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
    this.dataStorageService.getAllRecords().pipe(take(1)).subscribe(records => {
        this.dataSource = new MatTableDataSource(records);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onDeleteRecord(recordToDelete: RecordHours): void {
    this.dataStorageService.removeRecord(recordToDelete.date).subscribe(() =>
      this.dataStorageService.getAllRecords().subscribe(records => {
        this.fillTableDataSource(records);
      })
    );
    this.openSnackBar('Record deleted successfully!', 'Okay :)');
  }

  openBottomSheet(type: string): void {
    if (type === 'hours') {
      this.dataStorageService.getTotalHours().subscribe(hours => this.bottomSheet.open(PopUpComponent, {
        data: hours
      }));
    } else if (type === 'days') {
      this.dataStorageService.getTotalDays().subscribe(days => this.bottomSheet.open(PopUpComponent, {
        data: days
      }));
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fillTableDataSource(records: RecordHours[]): void {
    this.dataSource = new MatTableDataSource(records);

  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action);
  }
}

