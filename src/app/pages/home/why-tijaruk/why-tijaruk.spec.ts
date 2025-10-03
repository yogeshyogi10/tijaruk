import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyTijaruk } from './why-tijaruk';

describe('WhyTijaruk', () => {
  let component: WhyTijaruk;
  let fixture: ComponentFixture<WhyTijaruk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyTijaruk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyTijaruk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
