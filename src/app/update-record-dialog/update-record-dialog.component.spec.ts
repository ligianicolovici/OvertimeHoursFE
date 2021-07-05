import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecordDialogComponent } from './update-record-dialog.component';

describe('UpdateRecordDialogComponent', () => {
  let component: UpdateRecordDialogComponent;
  let fixture: ComponentFixture<UpdateRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
