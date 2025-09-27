import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDocs } from './carousel-docs';

describe('CarouselDocs', () => {
  let component: CarouselDocs;
  let fixture: ComponentFixture<CarouselDocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselDocs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselDocs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
