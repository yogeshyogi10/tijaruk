import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Servicedetail } from './servicedetail';

describe('Servicedetail', () => {
  let component: Servicedetail;
  let fixture: ComponentFixture<Servicedetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Servicedetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Servicedetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
