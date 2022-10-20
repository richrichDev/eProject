import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewusermodalComponent } from './addnewusermodal.component';

describe('AddnewusermodalComponent', () => {
  let component: AddnewusermodalComponent;
  let fixture: ComponentFixture<AddnewusermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewusermodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewusermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
