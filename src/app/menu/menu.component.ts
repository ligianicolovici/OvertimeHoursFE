import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UpdateRecordDialogComponent} from '../update-record-dialog/update-record-dialog.component';
import {DataStorageService} from '../services/dataStorageService';
import {ActivatedRoute, Router} from '@angular/router';
import {RecordHours} from '../models/record';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  allOvertimeRecords: RecordHours[];

  constructor(public dialog: MatDialog, public service: DataStorageService, public route: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {


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
