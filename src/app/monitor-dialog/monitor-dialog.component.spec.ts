import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorDialogComponent } from './monitor-dialog.component';

describe('MonitorDialogComponent', () => {
  let component: MonitorDialogComponent;
  let fixture: ComponentFixture<MonitorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
