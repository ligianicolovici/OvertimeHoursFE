import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../services/dataStorageService';
import {Router} from '@angular/router';
import {UpdateRecordDialogComponent} from '../update-record-dialog/update-record-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  @ViewChild('hrHand', {static: false}) hrHand: ElementRef;
  @ViewChild('minHand', {static: false}) minHand: ElementRef;
  @ViewChild('secHand', {static: false}) secHand: ElementRef;

  constructor(public dialog: MatDialog, public service: DataStorageService, private snackBar: MatSnackBar, private route: Router) {
  }

  ngOnInit(): void {
    setInterval(() => {
      const date = new Date();
      this.updateClock(date);
    }, 1000);
  }

  // tslint:disable-next-line:typedef
  updateClock(date) {
    this.secHand.nativeElement.style.transform = 'rotate(' +
      date.getSeconds() * 6 + 'deg)';
    this.minHand.nativeElement.style.transform = 'rotate(' +
      date.getMinutes() * 6 + 'deg)';
    this.hrHand.nativeElement.style.transform = 'rotate(' +
      (date.getHours() * 30 + date.getMinutes() * 0.5) + 'deg)';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateRecordDialogComponent, {
      width: '250px',
      data: {selectedData: ''}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  checkRecords(userAction: string): void {
    if (this.service.allRecords.length === 0) {
      this.openSnackBar('No records available! Create some :)', 'Okay');
    } else {
      if (userAction === 'update') {
        this.openDialog();
      } else {
        this.route.navigate(['/overview']);
      }
    }
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action);
  }
}
