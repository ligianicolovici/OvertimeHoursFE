import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {DataStorageService} from '../services/dataStorageService';
import {RecordHours} from '../models/record';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit, OnDestroy {

  isEdit: boolean;
  subscriptions = new Subscription();
  recordForm = new FormGroup({
    overtime: new FormControl('', [Validators.max(13), Validators.min(9), Validators.pattern('^(?!0$)\\d+(?:[,.][05])?$'), Validators.required]),
    break: new FormControl('', [Validators.required, Validators.max(2)]),
    date: new FormControl(null, Validators.required)
  });
  formTitle: string;
  recordToUpdate: RecordHours;

  constructor(private route: ActivatedRoute, private service: DataStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe(params => {
      if (params['mode'] === 'edit') {
        this.isEdit = true;
        this.formTitle = 'Update Record';
        this.recordToUpdate = this.service.existingRecord;
        const entryDate = this.recordToUpdate.date.split('.');
        this.recordForm.setValue({
          overtime: this.recordToUpdate.dailyHours,
          break: this.recordToUpdate.daybreak,
          date: new Date(entryDate[1] + '/' + entryDate[0] + '/' + entryDate[2])
        });
      } else {
        this.isEdit = false;
        this.formTitle = 'Create Record';
        this.onClear();
      }
    }));
    this.recordForm.get('break').valueChanges.subscribe(() => {
      console.log(this.recordForm.get('overtime'));
    });
  }


  onSubmit(form: FormGroup): void {
    const recordFromForm: RecordHours = {
      date: formatDate(form.value.date, 'dd.MM.yyyy', 'en-US'),
      dailyHours: form.value.overtime,
      daybreak: form.value.break,
    };
    if (this.isEdit) {
      this.service.updateRecord(recordFromForm).subscribe(() =>
        forkJoin({
          records: this.service.getAllRecords(),
          data: this.service.getAllRecordsDates()
        }).subscribe(() => {
          this.router.navigate(['/overview']);
        }));
    } else {
      this.service.addRecord(recordFromForm).subscribe(() =>
        this.service.getAllRecords().pipe(take(1)).subscribe(() => forkJoin({
          records: this.service.getAllRecords(),
          data: this.service.getAllRecordsDates()
        }).subscribe(() => {
          this.router.navigate(['/overview']);
        })));
    }
  }

  onClear(): void {
    if (this.isEdit) {
      this.recordForm.get('overtime').reset();
      this.recordForm.get('break').reset();
    } else {
      this.recordForm.reset();
    }
    this.recordForm.get('overtime').markAsUntouched();
    this.recordForm.get('break').markAsUntouched();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
