import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTwoComponent } from './home-two.component';

describe('HomeTwoComponent', () => {
  let component: HomeTwoComponent;
  let fixture: ComponentFixture<HomeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
